"use client";

import * as React from "react";
import { upload } from "@vercel/blob/client";
import { ArrowRight, ArrowLeft, FileText, Paperclip, X, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  SECTORS,
  STAGES,
  COMPANY_TYPES,
  CUSTOMER_TYPES,
  TECH_PROFILES,
  PRIMARY_MARKETS,
  SA_CONNECTIONS,
  CAPS,
  MAX_FILE_MB,
  MAX_SUPPORTING_DOCS,
  screenPitch,
  advisePitch,
  impliedRound,
  committedShare,
  formatZar,
  formatPercent,
  type PitchInput,
} from "@/lib/intake";
import { FieldLabel, ChipGroup, CharCount, CheckRow, NumberField, Stepper } from "./form-bits";

type Sector = (typeof SECTORS)[number];
type Stage = (typeof STAGES)[number];
type CompanyType = (typeof COMPANY_TYPES)[number];
type CustomerType = (typeof CUSTOMER_TYPES)[number];
type TechProfile = (typeof TECH_PROFILES)[number];
type PrimaryMarket = (typeof PRIMARY_MARKETS)[number];
type SaConnection = (typeof SA_CONNECTIONS)[number];

/** Numeric inputs are held as strings so a half-typed value stays editable. */
const toNumber = (value: string): number | null => {
  const n = Number(value.replace(/[\s,]/g, ""));
  return value.trim() && Number.isFinite(n) ? n : null;
};

/**
 * The form, in four steps.
 *
 * The fit check leads for the reason it always has: a founder outside the
 * mandate should learn that before writing a word of prose or picking a file.
 * Splitting the rest is what makes room for the traction questions — the same
 * field count on a single page measurably loses applications, and these are
 * applications we want.
 */
const STEPS = ["Fit check", "The company", "Traction & raise", "You & the team"] as const;

/**
 * Payload keys → the question as it's worded on screen, and the step it lives
 * on. The label lets a server-side rejection name a field the founder
 * recognises; the step lets us take them back to it, which in a four-step form
 * is the difference between an actionable error and a riddle.
 */
const FIELDS: Record<string, { label: string; step: number }> = {
  companyType: { label: "What kind of organisation are you?", step: 0 },
  customerType: { label: "Who are your customers?", step: 0 },
  techProfile: { label: "How central is technology to the business?", step: 0 },
  stage: { label: "Which round are you raising?", step: 0 },
  primaryMarket: { label: "Where do you mainly operate today?", step: 0 },
  saConnection: { label: "Your connection to South Africa", step: 0 },

  companyName: { label: "Company name", step: 1 },
  website: { label: "Website", step: 1 },
  registrationNumber: { label: "Company registration number", step: 1 },
  sectors: { label: "Sectors", step: 1 },
  problem: { label: "What problem are you solving?", step: 1 },
  solution: { label: "How are you solving it?", step: 1 },
  whyNow: { label: "Why now?", step: 1 },

  revenueLast12m: { label: "Revenue in the last 12 months", step: 2 },
  payingCustomers: { label: "Paying customers today", step: 2 },
  activeUsers: { label: "Active users today", step: 2 },
  traction: { label: "The three numbers that best show your traction", step: 2 },
  monthlyExpenses: { label: "Average monthly expenses", step: 2 },
  runwayMonths: { label: "Runway", step: 2 },
  raiseAmount: { label: "How much are you raising?", step: 2 },
  preMoneyValuation: { label: "At what pre-money valuation?", step: 2 },
  committedAmount: { label: "How much of the round is already committed?", step: 2 },
  founderMajority: { label: "Do the founders still hold a majority?", step: 2 },

  founderName: { label: "Your name", step: 3 },
  email: { label: "Email", step: 3 },
  linkedin: { label: "LinkedIn", step: 3 },
  teamDescription: { label: "Who's building this?", step: 3 },
  whyThisTeam: { label: "Why are you the right people to solve it?", step: 3 },
  deck: { label: "Pitch deck", step: 3 },
  supportingDocs: { label: "Supporting documents", step: 3 },
};

/**
 * Turns the API's list of rejected fields into something actionable: what to
 * fix, and which step to fix it on.
 *
 * If the server rejects a field this page never sent, the page is older than
 * the API — a question was added after the tab was loaded. Telling someone to
 * check a field that isn't on their screen is worse than useless, so that case
 * asks for a reload instead.
 */
function describeRejectedFields(
  fields: unknown,
  sent: Record<string, unknown>
): { message: string; step: number | null } | null {
  if (!Array.isArray(fields) || fields.length === 0) return null;
  const keys = fields.filter((f): f is string => typeof f === "string");
  if (keys.length === 0) return null;

  const notOnThisPage = keys.some((k) => !(k in sent));
  if (notOnThisPage) {
    return { message: "This page is out of date — please refresh and submit again.", step: null };
  }

  const known = keys.filter((k) => k in FIELDS);
  const labels = keys.map((k) => FIELDS[k]?.label ?? k);
  const step = known.length > 0 ? Math.min(...known.map((k) => FIELDS[k]!.step)) : null;
  return { message: `Please check: ${labels.join(", ")}.`, step };
}

export function PitchForm() {
  const [step, setStep] = React.useState(0);

  const [companyName, setCompanyName] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [registrationNumber, setRegistrationNumber] = React.useState("");
  const [companyType, setCompanyType] = React.useState<CompanyType[]>([]);
  const [customerType, setCustomerType] = React.useState<CustomerType[]>([]);
  const [techProfile, setTechProfile] = React.useState<TechProfile[]>([]);
  const [stage, setStage] = React.useState<Stage[]>([]);
  const [primaryMarket, setPrimaryMarket] = React.useState<PrimaryMarket[]>([]);
  const [saConnection, setSaConnection] = React.useState<SaConnection[]>([]);
  const [sectors, setSectors] = React.useState<Sector[]>([]);
  const [problem, setProblem] = React.useState("");
  const [solution, setSolution] = React.useState("");
  const [whyNow, setWhyNow] = React.useState("");
  const [revenueInput, setRevenueInput] = React.useState("");
  const [customersInput, setCustomersInput] = React.useState("");
  const [usersInput, setUsersInput] = React.useState("");
  const [traction, setTraction] = React.useState("");
  const [expensesInput, setExpensesInput] = React.useState("");
  const [runwayInput, setRunwayInput] = React.useState("");
  const [raiseInput, setRaiseInput] = React.useState("");
  const [preMoneyInput, setPreMoneyInput] = React.useState("");
  const [committedInput, setCommittedInput] = React.useState("");
  const [founderMajority, setFounderMajority] = React.useState(false);
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
  const cardRef = React.useRef<HTMLDivElement>(null);
  const deckInputRef = React.useRef<HTMLInputElement>(null);
  const docsInputRef = React.useRef<HTMLInputElement>(null);

  const busy = phase === "uploading" || phase === "saving";

  /**
   * Live mandate check, from the same rules the API enforces. Runs on every
   * render against whatever has been answered so far, so a founder learns
   * they're out of mandate on step one — before writing a pitch or picking a
   * deck, neither of which they'd ever get to submit.
   */
  const screenInput = {
    companyType: companyType[0],
    customerType: customerType[0],
    techProfile: techProfile[0],
    stage: stage[0],
    primaryMarket: primaryMarket[0],
    saConnection: saConnection[0],
  };
  const blocker = screenPitch(screenInput);
  /** In mandate, but worth flagging. Never prevents submission. */
  const advisory = blocker ? null : advisePitch(screenInput);

  const revenue = toNumber(revenueInput);
  const customers = toNumber(customersInput);
  const users = toNumber(usersInput);
  const expenses = toNumber(expensesInput);
  const runway = toNumber(runwayInput);
  const raise = toNumber(raiseInput);
  const preMoney = toNumber(preMoneyInput);
  const committed = toNumber(committedInput);
  const round = impliedRound(raise, preMoney);
  const committedPct = committedShare(raise, committed);

  /**
   * One validator per step. `Continue` runs the current step's; submitting
   * runs all four, because a founder can walk back and blank an answer that an
   * earlier `Continue` already waved through.
   */
  const validators: Array<() => string | null> = [
    () => {
      if (companyType.length === 0) return "Pick your company type.";
      if (customerType.length === 0) return "Tell us who your customers are.";
      if (techProfile.length === 0) return "Tell us how technology fits in.";
      if (stage.length === 0) return "Pick the round you're raising.";
      if (primaryMarket.length === 0) return "Pick your primary market.";
      if (saConnection.length === 0) return "Tell us your connection to South Africa.";
      return null;
    },
    () => {
      if (!companyName.trim()) return "Company name is required.";
      if (sectors.length === 0) return "Pick at least one sector.";
      if (!problem.trim()) return "Tell us what problem you're solving.";
      if (problem.length > CAPS.problem) return "The problem description is over the character limit.";
      if (!solution.trim()) return "Tell us how you're solving it.";
      if (solution.length > CAPS.solution) return "The solution description is over the character limit.";
      if (!whyNow.trim()) return "Tell us why this is the right moment.";
      if (whyNow.length > CAPS.whyNow) return "The “why now” answer is over the character limit.";
      return null;
    },
    () => {
      // 0 is a real answer here, so these check for "unanswered", not "empty".
      if (revenue === null) return "Enter your revenue over the last 12 months — 0 if you're pre-revenue.";
      if (revenue < 0) return "Revenue can't be negative.";
      if (customers === null) return "Enter how many paying customers you have — 0 is a fine answer.";
      if (customers < 0) return "Paying customers can't be negative.";
      if (users !== null && users < 0) return "Active users can't be negative.";
      if (!traction.trim()) return "Give us the three numbers that best show your traction.";
      if (traction.length > CAPS.traction) return "The traction answer is over the character limit.";
      if (expenses !== null && expenses < 0) return "Monthly expenses can't be negative.";
      if (runway !== null && runway < 0) return "Runway can't be negative.";
      if (raise === null || raise <= 0) return "Tell us how much you're raising.";
      if (preMoney !== null && preMoney <= 0) return "The pre-money valuation must be more than zero.";
      if (committed !== null && committed < 0) return "Committed capital can't be negative.";
      if (committed !== null && raise !== null && committed > raise)
        return "The committed amount is more than the round you're raising.";
      return null;
    },
    () => {
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
    },
  ];

  /** Puts the top of the card just below the nav, rather than the page hero. */
  const scrollToForm = () => {
    const top = cardRef.current?.getBoundingClientRect().top;
    if (top === undefined) return;
    window.scrollTo({ top: window.scrollY + top - 96, behavior: "smooth" });
  };

  const goTo = (next: number) => {
    setStep(next);
    scrollToForm();
  };

  const onContinue = () => {
    const invalid = validators[step]!();
    if (invalid) {
      setError(invalid);
      return;
    }
    setError(null);
    goTo(step + 1);
  };

  const onBack = () => {
    setError(null);
    goTo(step - 1);
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

    // Every step, not just the last one. Named `invalid`, not `problem` — the
    // form has a `problem` answer, and shadowing it here once sent null to the
    // API in place of the founder's text.
    for (let i = 0; i < validators.length; i++) {
      const invalid = validators[i]!();
      if (invalid) {
        if (i !== step) goTo(i);
        setError(invalid);
        return;
      }
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
      // Typed against the schema: a missing or wrongly-typed answer fails the
      // build instead of reaching a founder as a validation error. The `!`s are
      // safe because the validators above have established each one.
      const payload: PitchInput & { companyUrl2: string } = {
          companyName,
          website,
          registrationNumber,
          founderName,
          email,
          linkedin,
          companyType: companyType[0]!,
          customerType: customerType[0]!,
          techProfile: techProfile[0]!,
          primaryMarket: primaryMarket[0]!,
          saConnection: saConnection[0]!,
          sectors,
          stage: stage[0]!,
          problem,
          solution,
          whyNow,
          revenueLast12m: revenue!,
          payingCustomers: customers!,
          activeUsers: users,
          traction,
          monthlyExpenses: expenses,
          runwayMonths: runway,
          raiseAmount: raise!,
          preMoneyValuation: preMoney,
          committedAmount: committed,
          founderMajority,
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
        const rejected = describeRejectedFields(body.fields, payload);
        if (rejected?.step !== null && rejected?.step !== undefined) goTo(rejected.step);
        throw new Error(
          rejected?.message || body.error || "Something went wrong saving your application."
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

  const isLastStep = step === STEPS.length - 1;

  return (
    <form onSubmit={onSubmit} noValidate>
      <Card ref={cardRef} className="p-6 md:p-10 space-y-8">
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

        <Stepper
          steps={STEPS}
          current={step}
          onSelect={(i) => {
            setError(null);
            goTo(i);
          }}
        />

        {/* Step 1 — the mandate questions. Six taps that decide whether it's
            worth either side's time, before anyone writes prose or picks a file. */}
        {step === 0 && (
          <section className="space-y-5 border-t border-border pt-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Fit check</p>
              <p className="text-sm text-muted-foreground mt-2 text-pretty">
                Six quick questions. We ask them up front so neither of us spends
                time on something that was never going to fit.
              </p>
            </div>
            <div className="space-y-2">
              <FieldLabel>What kind of organisation are you?</FieldLabel>
              <ChipGroup options={COMPANY_TYPES} value={companyType} onChange={setCompanyType} />
            </div>
            {/* Who pays — distinct from what kind of organisation they are. */}
            <div className="space-y-2">
              <FieldLabel>Who are your customers?</FieldLabel>
              <ChipGroup options={CUSTOMER_TYPES} value={customerType} onChange={setCustomerType} />
              <p className="text-xs text-muted-foreground/70">
                Whoever actually pays you — businesses, consumers, both, or government.
              </p>
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
        )}

        {/* Step 2 — the company and what it's for. */}
        {step === 1 && (
          <section className="space-y-5 border-t border-border pt-8">
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
              <div className="space-y-2">
                <FieldLabel htmlFor="registrationNumber" optional>Company registration number</FieldLabel>
                <Input
                  id="registrationNumber"
                  placeholder="2024/123456/07"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground/70">Leave blank if you haven&apos;t registered yet.</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-border pt-8">
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
                placeholder="An offline-first records app that syncs when signal returns, so nothing depends on connectivity at the point of care."
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                maxLength={CAPS.solution}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="whyNow">Why now?</FieldLabel>
                <CharCount value={whyNow} max={CAPS.whyNow} />
              </div>
              <Textarea
                id="whyNow"
                rows={3}
                placeholder="NHI accreditation started requiring digital records in 2025, and smartphone penetration in our districts passed 70% last year. Neither was true three years ago."
                value={whyNow}
                onChange={(e) => setWhyNow(e.target.value)}
                maxLength={CAPS.whyNow}
                required
              />
              <p className="text-xs text-muted-foreground/70">
                What&apos;s changed — in the market, the technology, the regulation —
                that makes this the right moment?
              </p>
            </div>
          </section>
        )}

        {/* Step 3 — the evidence, and the ask. */}
        {step === 2 && (
          <>
            <section className="space-y-5 border-t border-border pt-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary">Traction</p>
                <p className="text-sm text-muted-foreground mt-2 text-pretty">
                  Numbers as they stand today. If you&apos;re pre-revenue or
                  pre-launch, say so with a 0 — it&apos;s an answer, not a gap.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <NumberField
                  id="revenue"
                  label="Revenue in the last 12 months (ZAR)"
                  value={revenueInput}
                  onChange={setRevenueInput}
                  placeholder="1400000"
                  step={1000}
                  echo={revenue !== null ? formatZar(revenue) : undefined}
                  hint="Revenue you earned — not GMV, and not funding raised."
                />
                <NumberField
                  id="payingCustomers"
                  label="Paying customers today"
                  value={customersInput}
                  onChange={setCustomersInput}
                  placeholder="40"
                  step={1}
                />
                <NumberField
                  id="activeUsers"
                  label="Active users today"
                  optional
                  value={usersInput}
                  onChange={setUsersInput}
                  placeholder="3200"
                  step={1}
                  hint="If that's a different number from your paying customers."
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="traction">The three numbers that best show your traction</FieldLabel>
                  <CharCount value={traction} max={CAPS.traction} />
                </div>
                <Textarea
                  id="traction"
                  rows={3}
                  placeholder="R120k MRR, up 4x in nine months · 3,200 monthly active users, 68% retained at 90 days · 2 signed pilots with provincial health departments"
                  value={traction}
                  onChange={(e) => setTraction(e.target.value)}
                  maxLength={CAPS.traction}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <NumberField
                  id="monthlyExpenses"
                  label="Average monthly expenses (ZAR)"
                  optional
                  value={expensesInput}
                  onChange={setExpensesInput}
                  placeholder="180000"
                  step={1000}
                  echo={expenses !== null ? formatZar(expenses) : undefined}
                  hint="Your fixed monthly burn."
                />
                <NumberField
                  id="runway"
                  label="Runway (months)"
                  optional
                  value={runwayInput}
                  onChange={setRunwayInput}
                  placeholder="9"
                  step={1}
                  hint="Months of cash left at today's burn."
                />
              </div>
            </section>

            <section className="space-y-5 border-t border-border pt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">The raise</p>
              <div className="grid sm:grid-cols-2 gap-5">
                <NumberField
                  id="raiseAmount"
                  label="How much are you raising? (ZAR)"
                  value={raiseInput}
                  onChange={setRaiseInput}
                  placeholder="5000000"
                  min={1}
                  step={1000}
                  echo={raise !== null && raise > 0 ? formatZar(raise) : undefined}
                  hint="The total round you're raising — not just our portion of it."
                />
                <NumberField
                  id="preMoney"
                  label="At what pre-money valuation? (ZAR)"
                  optional
                  value={preMoneyInput}
                  onChange={setPreMoneyInput}
                  placeholder="20000000"
                  min={1}
                  step={1000}
                  echo={preMoney !== null && preMoney > 0 ? formatZar(preMoney) : undefined}
                  hint="Leave blank if it's still open."
                />
                <NumberField
                  id="committed"
                  label="How much of the round is already committed? (ZAR)"
                  optional
                  value={committedInput}
                  onChange={setCommittedInput}
                  placeholder="1500000"
                  step={1000}
                  echo={committed !== null && committed > 0 ? formatZar(committed) : undefined}
                  hint="Including soft commitments. Leave blank if none yet."
                />
              </div>

              {/* Cap-table health, which this round's price doesn't tell us:
                  a keen valuation says nothing about what earlier rounds took. */}
              <div className="space-y-2">
                <CheckRow checked={founderMajority} onChange={setFounderMajority}>
                  The founders still hold a majority of the company
                </CheckRow>
              </div>

              {/* Arithmetic on what they just told us — shown so a founder can
                  sanity-check what their ask implies before submitting. */}
              {(round || committedPct !== null) && (
                <div className="flex gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3.5">
                  <Info className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                  <p className="text-sm text-muted-foreground text-pretty">
                    {round && (
                      <>
                        That implies a post-money valuation of{" "}
                        <span className="font-medium text-foreground tabular-nums">
                          {formatZar(round.postMoney)}
                        </span>
                        , with this round&apos;s investors taking{" "}
                        <span className="font-medium text-foreground tabular-nums">
                          {formatPercent(round.newInvestorPct)}
                        </span>{" "}
                        of the company.{" "}
                      </>
                    )}
                    {committedPct !== null && (
                      <>
                        <span className="font-medium text-foreground tabular-nums">
                          {formatPercent(committedPct)}
                        </span>{" "}
                        of the round is already committed.{" "}
                      </>
                    )}
                    {round && "If that isn't what you meant, adjust the numbers above."}
                  </p>
                </div>
              )}
            </section>
          </>
        )}

        {/* Step 4 — who's behind it, and the documents. */}
        {step === 3 && (
          <>
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
          </>
        )}

        {/* Mandate blocker — shown the moment an answer puts them out of scope,
            so nobody fills in a deck they can't submit. Both callouts belong to
            the fit check, which is the only place their answers live. */}
        {step === 0 && blocker && (
          <div role="status" className="flex gap-3 rounded-xl border border-border-strong bg-muted/40 px-4 py-3.5">
            <Info className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" strokeWidth={1.75} />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-pretty">{blocker.reason}</p>
              {/* The decline card carried this; the gate now fires here instead,
                  and a dead Continue button is no way to end a conversation. */}
              <p className="text-sm text-muted-foreground/80 text-pretty">
                We&apos;d rather tell you now than leave you waiting. If your
                circumstances change — or you think we&apos;ve read this wrong —
                you&apos;re welcome to reach us at{" "}
                <a
                  href="mailto:hello@staunchventures.com"
                  className="text-foreground transition-colors hover:text-primary"
                >
                  hello@staunchventures.com
                </a>
                .
              </p>
            </div>
          </div>
        )}

        {/* In-mandate, but we'd rather say where they stand than stay quiet.
            Purely informational — submission carries on as normal. */}
        {step === 0 && advisory && (
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

        <div className="space-y-4 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground text-pretty">
            Your deck is kept confidential and reviewed only by the Staunch team.
          </p>
          <div className="flex items-center justify-between gap-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={onBack}
              disabled={busy}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              Back
            </button>
          ) : (
            <span aria-hidden />
          )}

          {isLastStep ? (
            <Button type="submit" variant="brand" size="pill-lg" disabled={busy || Boolean(blocker)}>
              {phase === "uploading" ? "Uploading deck…" : phase === "saving" ? "Submitting…" : "Submit application"}
              {!busy && !blocker && <ArrowRight className="ml-1 h-4 w-4" />}
            </Button>
          ) : (
            <Button
              type="button"
              variant="brand"
              size="pill-lg"
              onClick={onContinue}
              disabled={Boolean(blocker)}
            >
              Continue
              {!blocker && <ArrowRight className="ml-1 h-4 w-4" />}
            </Button>
          )}
          </div>
        </div>
      </Card>
    </form>
  );
}
