"use client";

import * as React from "react";
import { upload } from "@vercel/blob/client";
import { ArrowRight, FileText, Paperclip, X, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  SECTORS,
  STAGES,
  COMPANY_TYPES,
  TECH_PROFILES,
  PRIMARY_MARKETS,
  SA_CONNECTIONS,
  CAPS,
  MAX_FILE_MB,
  MAX_SUPPORTING_DOCS,
  screenPitch,
  advisePitch,
  impliedValuation,
  formatZar,
} from "@/lib/intake";
import { FieldLabel, ChipGroup, CharCount } from "./form-bits";

type Sector = (typeof SECTORS)[number];
type Stage = (typeof STAGES)[number];
type CompanyType = (typeof COMPANY_TYPES)[number];
type TechProfile = (typeof TECH_PROFILES)[number];
type PrimaryMarket = (typeof PRIMARY_MARKETS)[number];
type SaConnection = (typeof SA_CONNECTIONS)[number];

/** Numeric inputs are held as strings so a half-typed value stays editable. */
const toNumber = (value: string): number | null => {
  const n = Number(value.replace(/[\s,]/g, ""));
  return value.trim() && Number.isFinite(n) ? n : null;
};

/**
 * Payload keys → the question as it's worded on screen, so a server-side
 * rejection can name the field a founder actually recognises.
 */
const FIELD_LABELS: Record<string, string> = {
  companyName: "Company name",
  website: "Website",
  companyType: "What kind of organisation are you?",
  techProfile: "How central is technology to the business?",
  stage: "Which round are you raising?",
  primaryMarket: "Where do you mainly operate today?",
  saConnection: "Your connection to South Africa",
  sectors: "Sectors",
  problem: "What problem are you solving?",
  solution: "How are you solving it?",
  traction: "Traction so far",
  raiseAmount: "How much are you raising?",
  equityOffered: "For how much equity?",
  founderName: "Your name",
  email: "Email",
  linkedin: "LinkedIn",
  teamDescription: "Who's building this?",
  whyThisTeam: "Why are you the right people to solve it?",
  deck: "Pitch deck",
  supportingDocs: "Supporting documents",
};

/**
 * Turns the API's list of rejected fields into something actionable.
 *
 * If the server rejects a field this page never sent, the page is older than
 * the API — a question was added after the tab was loaded. Telling someone to
 * check a field that isn't on their screen is worse than useless, so that case
 * asks for a reload instead.
 */
function describeRejectedFields(fields: unknown, sent: Record<string, unknown>): string | null {
  if (!Array.isArray(fields) || fields.length === 0) return null;
  const keys = fields.filter((f): f is string => typeof f === "string");
  if (keys.length === 0) return null;

  const notOnThisPage = keys.some((k) => !(k in sent));
  if (notOnThisPage) {
    return "This page is out of date — please refresh and submit again.";
  }

  const labels = keys.map((k) => FIELD_LABELS[k] ?? k);
  return `Please check: ${labels.join(", ")}.`;
}

export function PitchForm() {
  const [companyName, setCompanyName] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [companyType, setCompanyType] = React.useState<CompanyType[]>([]);
  const [techProfile, setTechProfile] = React.useState<TechProfile[]>([]);
  const [stage, setStage] = React.useState<Stage[]>([]);
  const [primaryMarket, setPrimaryMarket] = React.useState<PrimaryMarket[]>([]);
  const [saConnection, setSaConnection] = React.useState<SaConnection[]>([]);
  const [sectors, setSectors] = React.useState<Sector[]>([]);
  const [problem, setProblem] = React.useState("");
  const [solution, setSolution] = React.useState("");
  const [traction, setTraction] = React.useState("");
  const [raiseAmount, setRaiseAmount] = React.useState("");
  const [equityOffered, setEquityOffered] = React.useState("");
  const [founderName, setFounderName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [teamDescription, setTeamDescription] = React.useState("");
  const [whyThisTeam, setWhyThisTeam] = React.useState("");
  const [deck, setDeck] = React.useState<File | null>(null);
  const [docs, setDocs] = React.useState<File[]>([]);
  const [honeypot, setHoneypot] = React.useState("");

  const [phase, setPhase] = React.useState<"idle" | "uploading" | "saving" | "done" | "declined">("idle");
  const [declineReason, setDeclineReason] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const deckInputRef = React.useRef<HTMLInputElement>(null);
  const docsInputRef = React.useRef<HTMLInputElement>(null);

  const busy = phase === "uploading" || phase === "saving";

  /**
   * Live mandate check, from the same rules the API enforces. Runs on every
   * render against whatever has been answered so far, so a founder learns
   * they're out of mandate before writing a pitch or uploading a deck.
   */
  const screenInput = {
    companyType: companyType[0],
    techProfile: techProfile[0],
    stage: stage[0],
    primaryMarket: primaryMarket[0],
    saConnection: saConnection[0],
  };
  const blocker = screenPitch(screenInput);
  /** In mandate, but worth flagging. Never prevents submission. */
  const advisory = blocker ? null : advisePitch(screenInput);

  const raise = toNumber(raiseAmount);
  const equity = toNumber(equityOffered);
  const valuation = impliedValuation(raise, equity);

  const validate = (): string | null => {
    if (!companyName.trim()) return "Company name is required.";
    if (companyType.length === 0) return "Pick your company type.";
    if (techProfile.length === 0) return "Tell us how technology fits in.";
    if (stage.length === 0) return "Pick the round you're raising.";
    if (primaryMarket.length === 0) return "Pick your primary market.";
    if (saConnection.length === 0) return "Tell us your connection to South Africa.";
    if (sectors.length === 0) return "Pick at least one sector.";
    if (!problem.trim()) return "Tell us what problem you're solving.";
    if (problem.length > CAPS.problem) return "The problem description is over the character limit.";
    if (!solution.trim()) return "Tell us how you're solving it.";
    if (solution.length > CAPS.solution) return "The solution description is over the character limit.";
    if (traction.length > CAPS.traction) return "Traction is over the character limit.";
    if (raise === null || raise <= 0) return "Tell us how much you're raising.";
    if (equity !== null && (equity <= 0 || equity >= 100)) return "Equity offered must be between 0 and 100%.";
    if (!founderName.trim()) return "Founder name is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return "A valid email is required.";
    if (!teamDescription.trim()) return "Tell us about the team.";
    if (teamDescription.length > CAPS.teamDescription) return "Team description is over the character limit.";
    if (!whyThisTeam.trim()) return "Tell us why you're the right team to solve this.";
    if (whyThisTeam.length > CAPS.whyThisTeam) return "That answer is over the character limit.";
    if (!deck) return "Your pitch deck (PDF) is required.";
    if (deck.type !== "application/pdf") return "The pitch deck must be a PDF.";
    if (deck.size > MAX_FILE_MB * 1024 * 1024) return `The deck is over ${MAX_FILE_MB}MB.`;
    for (const d of docs) {
      if (d.size > MAX_FILE_MB * 1024 * 1024) return `"${d.name}" is over ${MAX_FILE_MB}MB.`;
    }
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Out-of-mandate answers never reach the network — no upload, no write.
    if (blocker) {
      setDeclineReason(blocker.reason);
      setPhase("declined");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }

    try {
      setPhase("uploading");
      const deckBlob = await upload(`intake/decks/${deck!.name}`, deck!, {
        access: "public",
        handleUploadUrl: "/api/upload",
        clientPayload: "deck",
      });
      const docBlobs = [];
      for (const d of docs) {
        const b = await upload(`intake/docs/${d.name}`, d, {
          access: "public",
          handleUploadUrl: "/api/upload",
          clientPayload: "doc",
        });
        docBlobs.push({ url: b.url, filename: d.name });
      }

      setPhase("saving");
      const payload = {
          companyName,
          website,
          founderName,
          email,
          linkedin,
          companyType: companyType[0],
          techProfile: techProfile[0],
          primaryMarket: primaryMarket[0],
          saConnection: saConnection[0],
          sectors,
          stage: stage[0],
          raiseAmount: raise,
          equityOffered: equity,
          problem,
          solution,
          traction,
          teamDescription,
          whyThisTeam,
          deck: { url: deckBlob.url, filename: deck!.name },
          supportingDocs: docBlobs,
          companyUrl2: honeypot,
      };
      const res = await fetch("/api/pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          describeRejectedFields(body.fields, payload) ||
            body.error ||
            "Something went wrong saving your application."
        );
      }
      // The server runs the same mandate check and has the final say.
      if (body.declined) {
        setDeclineReason(body.reason ?? null);
        setPhase("declined");
      } else {
        setPhase("done");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setPhase("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (phase === "done") {
    return (
      <Card className="p-8 md:p-12 text-center">
        <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-5" strokeWidth={1.5} />
        <h2 className="text-2xl md:text-3xl font-serif font-normal tracking-heading mb-3">
          Application received
        </h2>
        <p className="text-muted-foreground text-pretty max-w-md mx-auto">
          Thank you — your deck is with the team. We read every application and
          will reach out if there&apos;s a fit with our mandate.
        </p>
      </Card>
    );
  }

  if (phase === "declined") {
    return (
      <Card className="p-8 md:p-12 text-center">
        <Info className="h-10 w-10 text-muted-foreground mx-auto mb-5" strokeWidth={1.5} />
        <h2 className="text-2xl md:text-3xl font-serif font-normal tracking-heading mb-3">
          Not a fit right now
        </h2>
        <p className="text-muted-foreground text-pretty max-w-md mx-auto">
          {declineReason ?? "This one falls outside our current investment mandate."}
        </p>
        <p className="text-sm text-muted-foreground/80 text-pretty max-w-md mx-auto mt-4">
          We&apos;d rather tell you now than leave you waiting. If your circumstances
          change — or you think we&apos;ve read this wrong — you&apos;re welcome to reach
          us at{" "}
          <a href="mailto:hello@staunchventures.com" className="text-foreground hover:text-primary transition-colors">
            hello@staunchventures.com
          </a>
          .
        </p>
      </Card>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <Card className="p-6 md:p-10 space-y-8">
        {/* Honeypot — invisible to people, irresistible to bots */}
        <input
          type="text"
          name="companyUrl2"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <section className="space-y-5">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">The company</p>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <FieldLabel htmlFor="companyName">Company name</FieldLabel>
              <Input id="companyName" placeholder="Acme Health" value={companyName} onChange={(e) => setCompanyName(e.target.value)} maxLength={120} required />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="website" optional>Website</FieldLabel>
              <Input id="website" type="url" placeholder="https://acme.co.za" value={website} onChange={(e) => setWebsite(e.target.value)} maxLength={200} />
            </div>
          </div>
        </section>

        {/* Mandate questions first: five taps that decide whether it's worth
            either side's time, before anyone writes prose or uploads a deck. */}
        <section className="space-y-5 border-t border-border pt-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Fit check</p>
            <p className="text-sm text-muted-foreground mt-2 text-pretty">
              Five quick questions. We ask them up front so neither of us spends
              time on something that was never going to fit.
            </p>
          </div>
          <div className="space-y-2">
            <FieldLabel>What kind of organisation are you?</FieldLabel>
            <ChipGroup options={COMPANY_TYPES} value={companyType} onChange={setCompanyType} />
          </div>
          <div className="space-y-2">
            <FieldLabel>How central is technology to the business?</FieldLabel>
            <ChipGroup options={TECH_PROFILES} value={techProfile} onChange={setTechProfile} />
          </div>
          <div className="space-y-2">
            <FieldLabel>Which round are you raising?</FieldLabel>
            <ChipGroup options={STAGES} value={stage} onChange={setStage} />
          </div>
          <div className="space-y-2">
            <FieldLabel>Where do you mainly operate today?</FieldLabel>
            <ChipGroup options={PRIMARY_MARKETS} value={primaryMarket} onChange={setPrimaryMarket} />
          </div>
          <div className="space-y-2">
            <FieldLabel>Your connection to South Africa</FieldLabel>
            <ChipGroup options={SA_CONNECTIONS} value={saConnection} onChange={setSaConnection} />
          </div>
        </section>

        <section className="space-y-5 border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">What you&apos;re building</p>
          <div className="space-y-2">
            <FieldLabel>Sectors — pick any that apply</FieldLabel>
            <ChipGroup options={SECTORS} value={sectors} onChange={setSectors} multi />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="problem">What problem are you solving?</FieldLabel>
              <CharCount value={problem} max={CAPS.problem} />
            </div>
            <Textarea
              id="problem"
              rows={3}
              placeholder="Rural clinics still keep patient records on paper, so notes go missing between visits and follow-up care breaks down."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              maxLength={CAPS.problem}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="solution">How are you solving it?</FieldLabel>
              <CharCount value={solution} max={CAPS.solution} />
            </div>
            <Textarea
              id="solution"
              rows={3}
              placeholder="An offline-first records app that syncs when signal returns, so nothing depends on connectivity at the point of care. 40 clinics across KZN use it today."
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              maxLength={CAPS.solution}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="traction" optional>Traction so far</FieldLabel>
              <CharCount value={traction} max={CAPS.traction} />
            </div>
            <Textarea
              id="traction"
              rows={2}
              placeholder="R120k MRR · 3,200 active users · 2 signed pilots"
              value={traction}
              onChange={(e) => setTraction(e.target.value)}
              maxLength={CAPS.traction}
            />
          </div>
        </section>

        <section className="space-y-5 border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">The raise</p>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <FieldLabel htmlFor="raiseAmount">How much are you raising? (ZAR)</FieldLabel>
              <Input
                id="raiseAmount"
                type="number"
                inputMode="numeric"
                min={1}
                step={1000}
                placeholder="5000000"
                value={raiseAmount}
                onChange={(e) => setRaiseAmount(e.target.value)}
              />
              {raise !== null && raise > 0 && (
                <p className="text-xs text-muted-foreground tabular-nums">{formatZar(raise)}</p>
              )}
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="equityOffered" optional>For how much equity? (%)</FieldLabel>
              <Input
                id="equityOffered"
                type="number"
                inputMode="decimal"
                min={0}
                max={99.9}
                step={0.5}
                placeholder="10"
                value={equityOffered}
                onChange={(e) => setEquityOffered(e.target.value)}
              />
              <p className="text-xs text-muted-foreground/70">Leave blank if it&apos;s still open.</p>
            </div>
          </div>

          {/* Arithmetic on what they just told us — shown so a founder can
              sanity-check the number their ask implies before submitting. */}
          {valuation && (
            <div className="flex gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3.5">
              <Info className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
              <p className="text-sm text-muted-foreground text-pretty">
                That implies a pre-money valuation of{" "}
                <span className="font-medium text-foreground tabular-nums">{formatZar(valuation.preMoney)}</span>{" "}
                <span className="text-muted-foreground/70 tabular-nums">
                  ({formatZar(valuation.postMoney)} post-money)
                </span>
                . If that isn&apos;t what you meant, adjust the numbers above.
              </p>
            </div>
          )}
        </section>

        <section className="space-y-5 border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">You and the team</p>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <FieldLabel htmlFor="founderName">Your name</FieldLabel>
              <Input id="founderName" placeholder="Thandi Mokoena" value={founderName} onChange={(e) => setFounderName(e.target.value)} maxLength={120} required />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="thandi@acme.co.za" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} required />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <FieldLabel htmlFor="linkedin" optional>LinkedIn</FieldLabel>
              <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/thandimokoena" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} maxLength={300} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="teamDescription">Who&apos;s building this?</FieldLabel>
              <CharCount value={teamDescription} max={CAPS.teamDescription} />
            </div>
            <Textarea
              id="teamDescription"
              rows={3}
              placeholder="Two co-founders. Thandi led engineering at Discovery for five years; Sipho ran clinic operations at Netcare."
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              maxLength={CAPS.teamDescription}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="whyThisTeam">Why are you the right people to solve it?</FieldLabel>
              <CharCount value={whyThisTeam} max={CAPS.whyThisTeam} />
            </div>
            <Textarea
              id="whyThisTeam"
              rows={3}
              placeholder="Thandi spent five years building clinical systems at Discovery; Sipho ran operations across 12 rural clinics and lived this problem daily."
              value={whyThisTeam}
              onChange={(e) => setWhyThisTeam(e.target.value)}
              maxLength={CAPS.whyThisTeam}
              required
            />
          </div>
        </section>

        <section className="space-y-5 border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Documents</p>

          {/* Deck upload */}
          <div className="space-y-2">
            <FieldLabel>Pitch deck (PDF, up to {MAX_FILE_MB}MB)</FieldLabel>
            <input
              ref={deckInputRef}
              type="file"
              accept="application/pdf"
              className="sr-only"
              onChange={(e) => setDeck(e.target.files?.[0] ?? null)}
            />
            {deck ? (
              <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
                <FileText className="h-5 w-5 text-primary shrink-0" strokeWidth={1.75} />
                <span className="flex-1 truncate text-sm font-medium">{deck.name}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{(deck.size / 1024 / 1024).toFixed(1)}MB</span>
                <button type="button" onClick={() => setDeck(null)} aria-label="Remove deck" className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => deckInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border-strong bg-background/40 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <FileText className="h-4 w-4" strokeWidth={1.75} />
                Upload your deck
              </button>
            )}
          </div>

          {/* Supporting docs */}
          <div className="space-y-2">
            <FieldLabel optional>Anything else? (up to {MAX_SUPPORTING_DOCS} files)</FieldLabel>
            <input
              ref={docsInputRef}
              type="file"
              multiple
              accept=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              className="sr-only"
              onChange={(e) => {
                const picked = Array.from(e.target.files ?? []);
                setDocs((prev) => [...prev, ...picked].slice(0, MAX_SUPPORTING_DOCS));
                e.target.value = "";
              }}
            />
            {docs.length > 0 && (
              <ul className="space-y-2">
                {docs.map((d, i) => (
                  <li key={`${d.name}-${i}`} className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-4 py-2.5">
                    <Paperclip className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.75} />
                    <span className="flex-1 truncate text-sm">{d.name}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">{(d.size / 1024 / 1024).toFixed(1)}MB</span>
                    <button type="button" onClick={() => setDocs(docs.filter((_, j) => j !== i))} aria-label={`Remove ${d.name}`} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {docs.length < MAX_SUPPORTING_DOCS && (
              <button
                type="button"
                onClick={() => docsInputRef.current?.click()}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Paperclip className="h-4 w-4" strokeWidth={1.75} />
                Add a document
              </button>
            )}
          </div>
        </section>

        {/* Mandate blocker — shown the moment an answer puts them out of scope,
            so nobody fills in a deck they can't submit. */}
        {blocker && (
          <div role="status" className="flex gap-3 rounded-xl border border-border-strong bg-muted/40 px-4 py-3.5">
            <Info className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
            <p className="text-sm text-muted-foreground text-pretty">
              {blocker.reason}
            </p>
          </div>
        )}

        {/* In-mandate, but we'd rather say where they stand than stay quiet.
            Purely informational — submission carries on as normal. */}
        {advisory && (
          <div role="status" className="flex gap-3 rounded-xl border border-primary/25 bg-primary/5 px-4 py-3.5">
            <Info className="h-4 w-4 mt-0.5 shrink-0 text-primary" strokeWidth={1.75} />
            <p className="text-sm text-muted-foreground text-pretty">
              {advisory.message}
            </p>
          </div>
        )}

        {error && (
          <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground max-w-xs text-pretty">
            Your deck is kept confidential and reviewed only by the Staunch team.
          </p>
          <Button type="submit" variant="brand" size="pill-lg" disabled={busy || Boolean(blocker)}>
            {phase === "uploading" ? "Uploading deck…" : phase === "saving" ? "Submitting…" : "Submit application"}
            {!busy && !blocker && <ArrowRight className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      </Card>
    </form>
  );
}
