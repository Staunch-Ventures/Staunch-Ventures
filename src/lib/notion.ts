import {
  COMPANY_TYPES,
  PRIMARY_MARKETS,
  SA_CONNECTIONS,
  SECTORS,
  STAGES,
  TECH_PROFILES,
  formatAsking,
  formatZar,
  impliedValuation,
  type PitchPayload,
} from "@/lib/intake";

/**
 * Notion write path for inbound pitches.
 *
 * This talks to Notion's public REST API with an internal integration token
 * (the "Pitch Form" integration) — unrelated to any Notion MCP/AI connector.
 * The integration must be connected to the Venture Pipeline database, since
 * Notion integrations only see pages explicitly shared with them; otherwise
 * every call 404s.
 *
 * Uploaded files stay in Vercel Blob and are attached to the Notion page as
 * *external* file references, so nothing large moves through this function
 * and the deck keeps living where the browser already put it.
 *
 * The write is deliberately tolerant of schema drift — see `createPitchPage`.
 */

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

/**
 * The single source of truth for what this app expects of the Venture
 * Pipeline schema: the Notion property name, the type it must be, and any
 * option values that have to exist.
 *
 * Both consumers read this one table — `createPitchPage` below when it writes,
 * and `npm run notion:check` when it verifies — so the writer and the checker
 * cannot drift apart and report a false "all good". Adding a field here is the
 * only edit needed to cover both.
 *
 * Two names are easy to confuse: `Stage` is the round being raised, while
 * `Status` is our pipeline position. They are different properties.
 */
export const PITCH_PROPERTIES = {
  company: { name: "Company", type: "title" },
  founders: { name: "Founder(s)", type: "rich_text" },
  email: { name: "Email", type: "email" },
  linkedin: { name: "LinkedIn", type: "url" },
  website: { name: "Website", type: "url" },
  companyType: { name: "Company Type", type: "select", options: COMPANY_TYPES },
  techProfile: { name: "Tech Profile", type: "select", options: TECH_PROFILES },
  primaryMarket: { name: "Primary Market", type: "select", options: PRIMARY_MARKETS },
  saConnection: { name: "SA Connection", type: "select", options: SA_CONNECTIONS },
  sector: { name: "Sector", type: "multi_select", options: SECTORS },
  stage: { name: "Stage", type: "select", options: STAGES },
  asking: { name: "Asking", type: "rich_text" },
  preMoney: { name: "Pre-money (ZAR)", type: "number" },
  problem: { name: "Problem", type: "rich_text" },
  solution: { name: "Solution", type: "rich_text" },
  traction: { name: "Traction", type: "rich_text" },
  team: { name: "Team", type: "rich_text" },
  /**
   * Founder-market fit, in the founder's own words — the answer to "why are
   * you the right people to solve it?". There is deliberately no separate
   * scored verdict beside it: the case the founder makes is the record, and
   * the screening agent's read of it lives in its uploaded analysis.
   */
  whyThisTeam: { name: "Founder-Market Fit", type: "rich_text" },
  source: { name: "Source", type: "select", options: ["Form"] },
  status: { name: "Status", type: "status", options: ["Sourced"] },
  deck: { name: "Pitch Deck", type: "files" },
  supportingDocs: { name: "Supporting Docs", type: "files" },
  /**
   * Written by the external screening agent, never by the form — but it still
   * has to exist, so the agent has somewhere to put its PDF.
   */
  agentAnalysis: { name: "Agent Analysis", type: "files", writtenBy: "agent" },
} as const satisfies Record<
  string,
  { name: string; type: string; options?: readonly string[]; writtenBy?: "agent" }
>;

/** Convenience view of the same table: key → Notion property name. */
export const NOTION_PROPS = Object.fromEntries(
  Object.entries(PITCH_PROPERTIES).map(([key, spec]) => [key, spec.name])
) as { [K in keyof typeof PITCH_PROPERTIES]: (typeof PITCH_PROPERTIES)[K]["name"] };

/** Where applications from the public form land before anyone looks at them. */
const FORM_DEFAULTS = { source: "Form", status: "Sourced" } as const;

function notionEnv() {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_PITCH_DATABASE_ID;
  if (!token) throw new Error("NOTION_TOKEN is not set");
  if (!databaseId) throw new Error("NOTION_PITCH_DATABASE_ID is not set");
  return { token, databaseId };
}

/**
 * Notion rejects anything that isn't a well-formed URL, while the form lets
 * founders type "acme.co". Normalise to https:// and drop values that still
 * don't parse rather than failing the whole submission over a typo.
 */
function toUrl(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    new URL(candidate);
    return candidate;
  } catch {
    return null;
  }
}

const richText = (value: string) => ({ rich_text: [{ text: { content: value } }] });

/** Notion caps attachment names at 100 characters. */
const fileEntry = (f: { url: string; filename: string }) => ({
  type: "external" as const,
  name: f.filename.slice(0, 100),
  external: { url: f.url },
});

/**
 * One answer, ready to write: the Notion property it belongs in, the type that
 * property must be, the API payload, and a plain-text rendering used if the
 * property turns out to be missing.
 */
type Field = { name: string; type: string; value: unknown; text: string };

type PitchPropertyKey = keyof typeof PITCH_PROPERTIES;

type Schema = Record<string, string>;

/**
 * The live property name → type map, cached briefly. Notion schemas change by
 * hand, so this is re-read periodically rather than trusted forever; the cache
 * just stops every submission paying for the lookup.
 */
let schemaCache: { at: number; schema: Schema } | null = null;
const SCHEMA_TTL_MS = 5 * 60 * 1000;

async function fetchSchema(token: string, databaseId: string): Promise<Schema | null> {
  if (schemaCache && Date.now() - schemaCache.at < SCHEMA_TTL_MS) return schemaCache.schema;
  try {
    const res = await fetch(`${NOTION_API}/databases/${databaseId}`, {
      headers: { Authorization: `Bearer ${token}`, "Notion-Version": NOTION_VERSION },
    });
    if (!res.ok) return null;
    const db = (await res.json()) as { properties: Record<string, { type: string }> };
    const schema = Object.fromEntries(
      Object.entries(db.properties).map(([name, p]) => [name, p.type])
    );
    schemaCache = { at: Date.now(), schema };
    return schema;
  } catch {
    // Fall back to writing everything — a failed lookup must not cost us a
    // submission that would otherwise have been fine.
    return null;
  }
}

/**
 * Creates the pipeline row.
 *
 * **Tolerant of schema drift by design.** Notion is edited by hand, and a
 * renamed or deleted property would otherwise make the API reject the entire
 * request — losing a real founder's application over a column rename. So the
 * live schema is read first and each answer is written only if its property
 * still exists with the expected type. Anything that doesn't match is dropped
 * from the properties payload and appended to the page body instead, so the
 * founder's words are never lost, the row is still created, and the mismatch
 * is visible both in the logs and on the page itself.
 *
 * `npm run notion:check` reports the same drift ahead of time.
 *
 * Every judgment field — Conviction, Track, Founder-Market Fit, Company Stage,
 * Geography, Owner, Notes, and the Agent Analysis file — is deliberately left
 * empty. Those belong to the team and the screening agent, never to the
 * applicant. The only derived value written here is the implied pre-money
 * valuation, which is arithmetic on what the founder stated, not a judgment.
 */
export async function createPitchPage(p: PitchPayload): Promise<{ id: string; url: string }> {
  const { token, databaseId } = notionEnv();

  /** Name and type always come from PITCH_PROPERTIES, never typed by hand. */
  const field = (key: PitchPropertyKey, value: unknown, text: string): Field => ({
    name: PITCH_PROPERTIES[key].name,
    type: PITCH_PROPERTIES[key].type,
    value,
    text,
  });

  const asking = formatAsking(p.raiseAmount, p.equityOffered);

  const fields: Field[] = [
    field("founders", richText(p.founderName), p.founderName),
    field("email", { email: p.email }, p.email),
    field("companyType", { select: { name: p.companyType } }, p.companyType),
    field("techProfile", { select: { name: p.techProfile } }, p.techProfile),
    field("primaryMarket", { select: { name: p.primaryMarket } }, p.primaryMarket),
    field("saConnection", { select: { name: p.saConnection } }, p.saConnection),
    field("stage", { select: { name: p.stage } }, p.stage),
    field("sector", { multi_select: p.sectors.map((name) => ({ name })) }, p.sectors.join(", ")),
    field("asking", richText(asking), asking),
    field("problem", richText(p.problem), p.problem),
    field("solution", richText(p.solution), p.solution),
    field("team", richText(p.teamDescription), p.teamDescription),
    field("whyThisTeam", richText(p.whyThisTeam), p.whyThisTeam),
    field("source", { select: { name: FORM_DEFAULTS.source } }, FORM_DEFAULTS.source),
    field("status", { status: { name: FORM_DEFAULTS.status } }, FORM_DEFAULTS.status),
    field("deck", { files: [fileEntry(p.deck)] }, p.deck.url),
  ];

  if (p.traction?.trim()) {
    fields.push(field("traction", richText(p.traction.trim()), p.traction.trim()));
  }

  // Only meaningful when the founder named an equity percentage.
  const valuation = impliedValuation(p.raiseAmount, p.equityOffered);
  if (valuation) {
    const pre = Math.round(valuation.preMoney);
    fields.push(field("preMoney", { number: pre }, formatZar(pre)));
  }

  // Notion errors on a null url value, so only send these when they parse.
  const website = toUrl(p.website);
  if (website) fields.push(field("website", { url: website }, website));
  const linkedin = toUrl(p.linkedin);
  if (linkedin) fields.push(field("linkedin", { url: linkedin }, linkedin));

  if (p.supportingDocs.length > 0) {
    fields.push(
      field(
        "supportingDocs",
        { files: p.supportingDocs.map(fileEntry) },
        p.supportingDocs.map((d) => d.url).join("\n")
      )
    );
  }

  const schema = await fetchSchema(token, databaseId);
  const keep = schema ? fields.filter((f) => schema[f.name] === f.type) : fields;
  const dropped = schema ? fields.filter((f) => schema[f.name] !== f.type) : [];

  const properties: Record<string, unknown> = Object.fromEntries(keep.map((f) => [f.name, f.value]));

  // The title is the one property that can't be skipped — a row with no name
  // is unusable. If it's been renamed, write to whatever the title is now.
  const titleName =
    schema && schema[NOTION_PROPS.company] === "title"
      ? NOTION_PROPS.company
      : (schema && Object.keys(schema).find((n) => schema[n] === "title")) ?? NOTION_PROPS.company;
  properties[titleName] = { title: [{ text: { content: p.companyName } }] };

  const children: unknown[] = [];
  if (dropped.length > 0) {
    console.warn(
      "[notion] schema drift — these answers had no matching property and were written to the page body:",
      dropped.map((f) => `${f.name} (expected ${f.type}, found ${schema?.[f.name] ?? "nothing"})`).join("; ")
    );
    children.push(
      {
        object: "block",
        type: "callout",
        callout: {
          icon: { emoji: "⚠️" },
          rich_text: [
            {
              text: {
                content:
                  "These answers couldn't be filed into properties — the pitch form expects a Notion property that no longer matches. Run `npm run notion:check` to see the mismatch.",
              },
            },
          ],
        },
      },
      ...dropped.flatMap((f) => [
        {
          object: "block",
          type: "heading_3",
          heading_3: { rich_text: [{ text: { content: f.name } }] },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: { rich_text: [{ text: { content: f.text.slice(0, 1900) || "—" } }] },
        },
      ])
    );
  }

  const res = await fetch(`${NOTION_API}/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties,
      ...(children.length > 0 ? { children } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Notion create failed (${res.status}): ${detail.slice(0, 500)}`);
  }

  const page = (await res.json()) as { id: string; url: string };
  return { id: page.id, url: page.url };
}
