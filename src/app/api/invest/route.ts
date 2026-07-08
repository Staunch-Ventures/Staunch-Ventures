import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { investSchema } from "@/lib/intake";

export async function POST(request: Request): Promise<NextResponse> {
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
