import { NextResponse } from "next/server";
import { getSql, isDatabaseConfigured } from "@/lib/db";
import { investSchema, INVEST_EMAIL } from "@/lib/intake";

/**
 * Investor inquiries. Dormant: /invest is unlinked from the site (investors
 * are pointed at Oliver's inbox) and the Neon database behind it is gone. The
 * route and its form are kept whole so the channel can be reopened by setting
 * DATABASE_URL — until then it says so rather than failing opaquely.
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: `This form is currently closed — please email ${INVEST_EMAIL} and we'll pick it up from there.` },
      { status: 503 }
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — same trick as the pitch form.
  if (typeof json === "object" && json !== null && (json as Record<string, unknown>).firmUrl2) {
    return NextResponse.json({ ok: true });
  }

  const parsed = investSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const p = parsed.data;

  const sql = getSql();
  const rows = await sql`
    INSERT INTO investor_inquiries (
      name, firm, email, linkedin, location, investor_type, sectors, message
    ) VALUES (
      ${p.name}, ${p.firm || null}, ${p.email}, ${p.linkedin || null},
      ${p.location || null}, ${p.investorType}, ${p.sectors}, ${p.message || null}
    ) RETURNING id`;

  return NextResponse.json({ ok: true, id: rows[0].id });
}
