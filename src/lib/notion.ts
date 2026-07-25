import { formatAsking, formatZar, impliedValuation, type PitchPayload } from "@/lib/intake";

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
 * Notion property names, exactly as they appear in the Venture Pipeline
 * database. Renaming a property in Notion should be matched here — but if it
 * isn't, the submission still goes through (see `createPitchPage`).
 *
 * Two names are easy to confuse: `Stage` is the round being raised, while
 * `Status` is our pipeline position. They are different properties.
 */
export const NOTION_PROPS = {
  company: "Company",
  founders: "Founder(s)",
  email: "Email",
  linkedin: "LinkedIn",
  website: "Website",
  companyType: "Company Type",
  techProfile: "Tech Profile",
  primaryMarket: "Primary Market",
  saConnection: "SA Connection",
  sector: "Sector",
  stage: "Stage",
  asking: "Asking",
  preMoney: "Pre-money (ZAR)",
  problem: "Problem",
  solution: "Solution",
  traction: "Traction",
  team: "Team",
  /** The founder's own case for founder-market fit. Distinct from the
   *  `Founder-Market Fit` select, which is the team's verdict on that case. */
  whyThisTeam: "Why This Team",
  source: "Source",
  status: "Status",
  deck: "Pitch Deck",
  supportingDocs: "Supporting Docs",
  /** Files property — the external screening agent uploads its PDF here. */
  agentAnalysis: "Agent Analysis",
} as const;

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

  const fields: Field[] = [
    { name: NOTION_PROPS.founders, type: "rich_text", value: richText(p.founderName), text: p.founderName },
    { name: NOTION_PROPS.email, type: "email", value: { email: p.email }, text: p.email },
    { name: NOTION_PROPS.companyType, type: "select", value: { select: { name: p.companyType } }, text: p.companyType },
    { name: NOTION_PROPS.techProfile, type: "select", value: { select: { name: p.techProfile } }, text: p.techProfile },
    { name: NOTION_PROPS.primaryMarket, type: "select", value: { select: { name: p.primaryMarket } }, text: p.primaryMarket },
    { name: NOTION_PROPS.saConnection, type: "select", value: { select: { name: p.saConnection } }, text: p.saConnection },
    { name: NOTION_PROPS.stage, type: "select", value: { select: { name: p.stage } }, text: p.stage },
    { name: NOTION_PROPS.sector, type: "multi_select", value: { multi_select: p.sectors.map((name) => ({ name })) }, text: p.sectors.join(", ") },
    { name: NOTION_PROPS.asking, type: "rich_text", value: richText(formatAsking(p.raiseAmount, p.equityOffered)), text: formatAsking(p.raiseAmount, p.equityOffered) },
    { name: NOTION_PROPS.problem, type: "rich_text", value: richText(p.problem), text: p.problem },
    { name: NOTION_PROPS.solution, type: "rich_text", value: richText(p.solution), text: p.solution },
    { name: NOTION_PROPS.team, type: "rich_text", value: richText(p.teamDescription), text: p.teamDescription },
    { name: NOTION_PROPS.whyThisTeam, type: "rich_text", value: richText(p.whyThisTeam), text: p.whyThisTeam },
    { name: NOTION_PROPS.source, type: "select", value: { select: { name: FORM_DEFAULTS.source } }, text: FORM_DEFAULTS.source },
    { name: NOTION_PROPS.status, type: "status", value: { status: { name: FORM_DEFAULTS.status } }, text: FORM_DEFAULTS.status },
    { name: NOTION_PROPS.deck, type: "files", value: { files: [fileEntry(p.deck)] }, text: p.deck.url },
  ];

  if (p.traction?.trim()) {
    fields.push({ name: NOTION_PROPS.traction, type: "rich_text", value: richText(p.traction.trim()), text: p.traction.trim() });
  }

  // Only meaningful when the founder named an equity percentage.
  const valuation = impliedValuation(p.raiseAmount, p.equityOffered);
  if (valuation) {
    const pre = Math.round(valuation.preMoney);
    fields.push({ name: NOTION_PROPS.preMoney, type: "number", value: { number: pre }, text: formatZar(pre) });
  }

  // Notion errors on a null url value, so only send these when they parse.
  const website = toUrl(p.website);
  if (website) fields.push({ name: NOTION_PROPS.website, type: "url", value: { url: website }, text: website });
  const linkedin = toUrl(p.linkedin);
  if (linkedin) fields.push({ name: NOTION_PROPS.linkedin, type: "url", value: { url: linkedin }, text: linkedin });

  if (p.supportingDocs.length > 0) {
    fields.push({
      name: NOTION_PROPS.supportingDocs,
      type: "files",
      value: { files: p.supportingDocs.map(fileEntry) },
      text: p.supportingDocs.map((d) => d.url).join("\n"),
    });
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
