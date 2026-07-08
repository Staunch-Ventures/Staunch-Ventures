import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { pitchSchema } from "@/lib/intake";

export async function POST(request: Request): Promise<NextResponse> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: hidden field real founders never see. Bots that fill it get a
  // fake success and nothing is stored.
  if (typeof json === "object" && json !== null && (json as Record<string, unknown>).companyUrl2) {
    return NextResponse.json({ ok: true });
  }

  const parsed = pitchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const p = parsed.data;

  const sql = getSql();
  const rows = await sql`
    INSERT INTO startup_applications (
      company_name, website, founder_name, email, linkedin,
      hq_country, africa_hq, africa_customers, africa_expansion,
      sectors, stage, raise_amount, traction,
      team_description, founder_message,
      deck_url, deck_filename, supporting_docs
    ) VALUES (
      ${p.companyName}, ${p.website || null}, ${p.founderName}, ${p.email}, ${p.linkedin || null},
      ${p.hqCountry}, ${p.africaHq}, ${p.africaCustomers}, ${p.africaExpansion},
      ${p.sectors}, ${p.stage}, ${p.raiseAmount || null}, ${p.traction || null},
      ${p.teamDescription}, ${p.founderMessage},
      ${p.deck.url}, ${p.deck.filename}, ${JSON.stringify(p.supportingDocs)}
    ) RETURNING id`;

  return NextResponse.json({ ok: true, id: rows[0].id });
}
