/**
 * Verifies the Notion "Venture Pipeline" database still matches what the pitch
 * form expects. Read-only — it never changes the schema.
 *
 *   npm run notion:check
 *
 * The expectations come from PITCH_PROPERTIES in src/lib/notion.ts, the same
 * table the writer builds its payload from, so this can't pass while the form
 * is quietly writing something else.
 *
 * A mismatch is no longer fatal at runtime — the writer drops unmatched
 * properties into the page body rather than failing the submission — but it
 * does mean answers are landing as loose text instead of queryable fields, so
 * everything here should stay green.
 */

import { config } from "dotenv";
import { PITCH_PROPERTIES } from "../src/lib/notion";

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

  const specs = Object.values(PITCH_PROPERTIES);
  const problems: string[] = [];
  // Called out separately below: unlike select options, these can't be created
  // by the API, so this one needs a human in the Notion UI.
  let missingStatusOption = false;

  for (const spec of specs) {
    const actual = db.properties[spec.name];
    const by = "writtenBy" in spec && spec.writtenBy === "agent" ? "  (agent)" : "";

    if (!actual) {
      problems.push(`MISSING         "${spec.name}" — expected ${spec.type}`);
      console.log(`  ✗   ${spec.name} — missing`);
      continue;
    }
    if (actual.type !== spec.type) {
      problems.push(`WRONG TYPE      "${spec.name}" is ${actual.type}, expected ${spec.type}`);
      console.log(`  ✗   ${spec.name} — is ${actual.type}, expected ${spec.type}`);
      continue;
    }

    const wanted = "options" in spec ? spec.options : undefined;
    if (wanted) {
      const have = (actual.select ?? actual.multi_select ?? actual.status)?.options ?? [];
      const missing = wanted.filter((o) => !have.some((h) => h.name === o));
      if (missing.length > 0) {
        if (actual.type === "status") missingStatusOption = true;
        problems.push(
          `MISSING OPTIONS "${spec.name}": ${missing.map((m) => `"${m}"`).join(", ")}`
        );
        console.log(`  ✗   ${spec.name} — missing options: ${missing.join(", ")}`);
        continue;
      }
    }
    console.log(`  ok  ${spec.name} (${actual.type})${by}`);
  }

  // Not a failure — just worth knowing the pipeline carries more than the form
  // fills, since those are the team's own columns.
  const extra = Object.keys(db.properties).filter(
    (name) => !specs.some((s) => s.name === name)
  );
  if (extra.length > 0) {
    console.log(`\nTeam-owned properties the form never writes (${extra.length}):`);
    console.log(`  ${extra.join(" · ")}`);
  }

  if (problems.length > 0) {
    console.log(`\n${problems.length} problem(s):`);
    for (const p of problems) console.log(`  ✗ ${p}`);
    console.log(
      "\nSubmissions still succeed — unmatched answers are written to the page\n" +
        "body instead — but they won't be queryable until this is fixed.\n"
    );
    if (missingStatusOption) {
      console.log(
        'A missing "Status" option is the one thing this list can\'t fix itself:\n' +
          "Notion creates select options on demand but never status options, so\n" +
          "add it by hand in the board's Status column (or point PITCH_PROPERTIES\n" +
          "at the option that's already there).\n"
      );
    }
    process.exit(1);
  }

  console.log(`\nAll ${specs.length} properties aligned — Notion matches the pitch form.\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
