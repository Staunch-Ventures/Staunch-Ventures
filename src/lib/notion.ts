import { formatAsking, impliedValuation, type PitchPayload } from "@/lib/intake";

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
 */

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

/**
 * Notion property names, exactly as they appear in the Venture Pipeline
 * database. These strings are the contract between this file and the
 * workspace — rename a property in Notion and you must change it here too.
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
  summary: "Summary",
  traction: "Traction",
  team: "Team",
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

const text = (value: string | undefined | null) =>
  value?.trim() ? { rich_text: [{ text: { content: value.trim() } }] } : { rich_text: [] };

/** Notion caps attachment names at 100 characters. */
const fileEntry = (f: { url: string; filename: string }) => ({
  type: "external" as const,
  name: f.filename.slice(0, 100),
  external: { url: f.url },
});

/**
 * Creates the pipeline row.
 *
 * Every judgment field — Conviction, Track, Founder-Market Fit, Company Stage,
 * Geography, Owner, Notes, and the Agent Analysis file — is deliberately left
 * empty. Those belong to the team and the screening agent, never to the
 * applicant. The only derived value written here is the implied pre-money
 * valuation, which is arithmetic on what the founder stated, not a judgment.
 */
export async function createPitchPage(p: PitchPayload): Promise<{ id: string; url: string }> {
  const { token, databaseId } = notionEnv();

  const properties: Record<string, unknown> = {
    [NOTION_PROPS.company]: { title: [{ text: { content: p.companyName } }] },
    [NOTION_PROPS.founders]: text(p.founderName),
    [NOTION_PROPS.email]: { email: p.email },
    [NOTION_PROPS.companyType]: { select: { name: p.companyType } },
    [NOTION_PROPS.techProfile]: { select: { name: p.techProfile } },
    [NOTION_PROPS.primaryMarket]: { select: { name: p.primaryMarket } },
    [NOTION_PROPS.saConnection]: { select: { name: p.saConnection } },
    [NOTION_PROPS.stage]: { select: { name: p.stage } },
    [NOTION_PROPS.sector]: { multi_select: p.sectors.map((name) => ({ name })) },
    [NOTION_PROPS.asking]: text(formatAsking(p.raiseAmount, p.equityOffered)),
    [NOTION_PROPS.summary]: text(p.summary),
    [NOTION_PROPS.traction]: text(p.traction),
    [NOTION_PROPS.team]: text(p.teamDescription),
    [NOTION_PROPS.source]: { select: { name: FORM_DEFAULTS.source } },
    [NOTION_PROPS.status]: { status: { name: FORM_DEFAULTS.status } },
    [NOTION_PROPS.deck]: { files: [fileEntry(p.deck)] },
  };

  // Only meaningful when the founder named an equity percentage.
  const valuation = impliedValuation(p.raiseAmount, p.equityOffered);
  if (valuation) {
    properties[NOTION_PROPS.preMoney] = { number: Math.round(valuation.preMoney) };
  }

  // Notion errors on a null url value, so only send these when they parse.
  const website = toUrl(p.website);
  if (website) properties[NOTION_PROPS.website] = { url: website };
  const linkedin = toUrl(p.linkedin);
  if (linkedin) properties[NOTION_PROPS.linkedin] = { url: linkedin };

  if (p.supportingDocs.length > 0) {
    properties[NOTION_PROPS.supportingDocs] = { files: p.supportingDocs.map(fileEntry) };
  }

  const res = await fetch(`${NOTION_API}/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ parent: { database_id: databaseId }, properties }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Notion create failed (${res.status}): ${detail.slice(0, 500)}`);
  }

  const page = (await res.json()) as { id: string; url: string };
  return { id: page.id, url: page.url };
}
