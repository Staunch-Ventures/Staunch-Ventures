/**
 * Verifies the Notion "Venture Pipeline" database still matches what the pitch
 * form expects. Read-only — it never changes the schema.
 *
 *   npm run notion:check
 *
 * The Notion schema is hand-curated and deliberately lean, so this script's job
 * is to catch drift, not to impose structure: rename a property or delete an
 * option in Notion and submissions start failing silently at the API boundary.
 * Run this after any schema edit, and it will name the exact mismatch.
 */

import { config } from "dotenv";
import {
  SECTORS,
  STAGES,
  COMPANY_TYPES,
  TECH_PROFILES,
  PRIMARY_MARKETS,
  SA_CONNECTIONS,
} from "../src/lib/intake";
import { NOTION_PROPS } from "../src/lib/notion";

config({ path: ".env.local" });

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

type NotionOption = { name: string };
type NotionProperty = {
  type: string;
  select?: { options: NotionOption[] };
  multi_select?: { options: NotionOption[] };
  status?: { options: NotionOption[] };
};
type NotionDatabase = {
  title?: { plain_text: string }[];
  properties: Record<string, NotionProperty>;
};

/** Property name → the Notion type the writer assumes, and required options. */
const EXPECTED: { name: string; type: string; options?: readonly string[] }[] = [
  { name: NOTION_PROPS.company, type: "title" },
  { name: NOTION_PROPS.founders, type: "rich_text" },
  { name: NOTION_PROPS.email, type: "email" },
  { name: NOTION_PROPS.linkedin, type: "url" },
  { name: NOTION_PROPS.website, type: "url" },
  { name: NOTION_PROPS.companyType, type: "select", options: COMPANY_TYPES },
  { name: NOTION_PROPS.techProfile, type: "select", options: TECH_PROFILES },
  { name: NOTION_PROPS.primaryMarket, type: "select", options: PRIMARY_MARKETS },
  { name: NOTION_PROPS.saConnection, type: "select", options: SA_CONNECTIONS },
  { name: NOTION_PROPS.sector, type: "multi_select", options: SECTORS },
  { name: NOTION_PROPS.stage, type: "select", options: STAGES },
  { name: NOTION_PROPS.asking, type: "rich_text" },
  { name: NOTION_PROPS.preMoney, type: "number" },
  { name: NOTION_PROPS.problem, type: "rich_text" },
  { name: NOTION_PROPS.solution, type: "rich_text" },
  { name: NOTION_PROPS.traction, type: "rich_text" },
  { name: NOTION_PROPS.team, type: "rich_text" },
  { name: NOTION_PROPS.whyThisTeam, type: "rich_text" },
  { name: NOTION_PROPS.source, type: "select", options: ["Form"] },
  { name: NOTION_PROPS.status, type: "status", options: ["Sourced"] },
  { name: NOTION_PROPS.deck, type: "files" },
  { name: NOTION_PROPS.supportingDocs, type: "files" },
  { name: NOTION_PROPS.agentAnalysis, type: "files" },
];

async function main() {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_PITCH_DATABASE_ID;
  if (!token || !databaseId) {
    console.error("Missing NOTION_TOKEN and/or NOTION_PITCH_DATABASE_ID in .env.local.");
    process.exit(1);
  }

  const res = await fetch(`${NOTION_API}/databases/${databaseId}`, {
    headers: { Authorization: `Bearer ${token}`, "Notion-Version": NOTION_VERSION },
  });
  const body = await res.json();
  if (!res.ok) {
    console.error(`Notion API error (${res.status}):`, JSON.stringify(body, null, 2));
    if (res.status === 404) {
      console.error(
        "\nA 404 almost always means the integration isn't connected to the database.\n" +
          "Open it in Notion → ••• → Connections → add the 'Pitch Form' integration."
      );
    }
    process.exit(1);
  }

  const db = body as NotionDatabase;
  const title = db.title?.map((t) => t.plain_text).join("") || "(untitled)";
  console.log(`\nDatabase: ${title}\n`);

  const problems: string[] = [];

  for (const want of EXPECTED) {
    const actual = db.properties[want.name];
    if (!actual) {
      problems.push(`MISSING   "${want.name}" (expected ${want.type})`);
      continue;
    }
    if (actual.type !== want.type) {
      problems.push(`WRONG TYPE "${want.name}" is ${actual.type}, the form writes ${want.type}`);
      continue;
    }
    if (want.options) {
      const have = (actual.select ?? actual.multi_select ?? actual.status)?.options ?? [];
      const missing = want.options.filter((o) => !have.some((h) => h.name === o));
      if (missing.length > 0) {
        problems.push(`MISSING OPTIONS "${want.name}": ${missing.map((m) => `"${m}"`).join(", ")}`);
      }
    }
    console.log(`  ok  ${want.name} (${actual.type})`);
  }

  // Not a failure — just worth knowing the pipeline carries more than the form
  // fills, since those are the team's and the agent's columns.
  const extra = Object.keys(db.properties).filter(
    (name) => !EXPECTED.some((e) => e.name === name)
  );
  if (extra.length > 0) {
    console.log(`\nTeam-owned properties the form never writes (${extra.length}):`);
    console.log(`  ${extra.join(" · ")}`);
  }

  if (problems.length > 0) {
    console.log("\nProblems:");
    for (const p of problems) console.log(`  ✗ ${p}`);
    console.log("");
    process.exit(1);
  }

  console.log("\nAll good — Notion matches the pitch form.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
