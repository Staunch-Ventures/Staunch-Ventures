import { NextResponse } from "next/server";
import { pitchSchema, screenPitch, type PitchPayload, type Disqualification } from "@/lib/intake";
import { createPitchPage } from "@/lib/notion";

/**
 * Inbound pitch intake.
 *
 * Order matters here. Mandate screening runs *before* the Notion write so a
 * disqualified application never becomes a Venture Pipeline row — which is
 * what keeps the screening agent from spending tokens on companies we could
 * never invest in.
 *
 * Notion is the only store this route touches. Nothing here depends on Neon.
 */

/**
 * Records an auto-declined application to the server log, and nowhere else.
 *
 * Declines deliberately do not go into the Venture Pipeline: that database is
 * the agent's work queue, and putting rejects in it would re-introduce exactly
 * the cost this gate exists to avoid. They aren't worth a database of their
 * own either — the log answers "are we turning away more than we expected?"
 * without another system to maintain.
 *
 * If decline analytics ever matter more than that, this is the one function to
 * change: give it a separate store (its own Notion database, say) and nothing
 * else in the route moves.
 */
function logDecline(p: PitchPayload, dq: Disqualification): void {
  console.info(
    "[pitch] declined",
    JSON.stringify({
      reason: dq.code,
      company: p.companyName,
      email: p.email,
      companyType: p.companyType,
      techProfile: p.techProfile,
      stage: p.stage,
      primaryMarket: p.primaryMarket,
      saConnection: p.saConnection,
      at: new Date().toISOString(),
    })
  );
}

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
    const fieldErrors = parsed.error.flatten().fieldErrors;
    // Logged because the founder only ever sees a tidy message: without this,
    // a rejected submission is invisible and unexplainable after the fact.
    // Keys that aren't questions on the current form mean the browser is
    // running a stale bundle against a newer schema.
    console.warn("[pitch] validation failed", JSON.stringify(fieldErrors));
    return NextResponse.json(
      {
        error: "Please check the highlighted fields",
        fields: Object.keys(fieldErrors),
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }
  const p = parsed.data;

  // The authoritative mandate gate. The form runs the same check for instant
  // feedback, but that is a courtesy — this is the one that counts.
  const disqualified = screenPitch(p);
  if (disqualified) {
    logDecline(p, disqualified);
    // 200, not an error status: the request succeeded, the answer is just no.
    return NextResponse.json({ ok: true, declined: true, reason: disqualified.reason });
  }

  try {
    const page = await createPitchPage(p);
    return NextResponse.json({ ok: true, id: page.id });
  } catch (err) {
    // Surface nothing internal to the founder, but keep the detail in logs —
    // a failure here is almost always a Notion token/sharing misconfiguration.
    console.error("[pitch] notion write failed", err);
    return NextResponse.json(
      { error: "We couldn't submit your application just now. Please try again shortly." },
      { status: 502 }
    );
  }
}
