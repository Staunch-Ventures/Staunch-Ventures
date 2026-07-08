"use client";

import * as React from "react";
import { upload } from "@vercel/blob/client";
import { ArrowRight, FileText, Paperclip, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { SECTORS, STAGES, CAPS, MAX_FILE_MB, MAX_SUPPORTING_DOCS } from "@/lib/intake";
import { FieldLabel, ChipGroup, CharCount, CheckRow } from "./form-bits";

type Sector = (typeof SECTORS)[number];
type Stage = (typeof STAGES)[number];

export function PitchForm() {
  const [companyName, setCompanyName] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [founderName, setFounderName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [hqCountry, setHqCountry] = React.useState("");
  const [africaHq, setAfricaHq] = React.useState(false);
  const [africaCustomers, setAfricaCustomers] = React.useState(false);
  const [africaExpansion, setAfricaExpansion] = React.useState(false);
  const [sectors, setSectors] = React.useState<Sector[]>([]);
  const [stage, setStage] = React.useState<Stage[]>([]);
  const [raiseAmount, setRaiseAmount] = React.useState("");
  const [traction, setTraction] = React.useState("");
  const [teamDescription, setTeamDescription] = React.useState("");
  const [founderMessage, setFounderMessage] = React.useState("");
  const [deck, setDeck] = React.useState<File | null>(null);
  const [docs, setDocs] = React.useState<File[]>([]);
  const [honeypot, setHoneypot] = React.useState("");

  const [phase, setPhase] = React.useState<"idle" | "uploading" | "saving" | "done">("idle");
  const [error, setError] = React.useState<string | null>(null);
  const deckInputRef = React.useRef<HTMLInputElement>(null);
  const docsInputRef = React.useRef<HTMLInputElement>(null);

  const busy = phase === "uploading" || phase === "saving";

  const validate = (): string | null => {
    if (!companyName.trim()) return "Company name is required.";
    if (!founderName.trim()) return "Founder name is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return "A valid email is required.";
    if (!hqCountry.trim()) return "HQ country is required.";
    if (sectors.length === 0) return "Pick at least one sector.";
    if (stage.length === 0) return "Pick your stage.";
    if (!teamDescription.trim()) return "Tell us about the team.";
    if (teamDescription.length > CAPS.teamDescription) return "Team description is over the character limit.";
    if (!founderMessage.trim()) return "Add a short message about what you're building.";
    if (founderMessage.length > CAPS.founderMessage) return "Founder message is over the character limit.";
    if (traction.length > CAPS.traction) return "Traction is over the character limit.";
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
      const res = await fetch("/api/pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          website,
          founderName,
          email,
          linkedin,
          hqCountry,
          africaHq,
          africaCustomers,
          africaExpansion,
          sectors,
          stage: stage[0],
          raiseAmount,
          traction,
          teamDescription,
          founderMessage,
          deck: { url: deckBlob.url, filename: deck!.name },
          supportingDocs: docBlobs,
          companyUrl2: honeypot,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong saving your application.");
      }
      setPhase("done");
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
              <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} maxLength={120} required />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="website" optional>Website</FieldLabel>
              <Input id="website" type="url" placeholder="https://" value={website} onChange={(e) => setWebsite(e.target.value)} maxLength={200} />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="hqCountry">HQ country</FieldLabel>
              <Input id="hqCountry" value={hqCountry} onChange={(e) => setHqCountry(e.target.value)} maxLength={80} required />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="raiseAmount" optional>Raise amount</FieldLabel>
              <Input id="raiseAmount" placeholder="e.g. $250K" value={raiseAmount} onChange={(e) => setRaiseAmount(e.target.value)} maxLength={120} />
            </div>
          </div>

          <div className="space-y-2">
            <FieldLabel>Sectors</FieldLabel>
            <ChipGroup options={SECTORS} value={sectors} onChange={setSectors} multi />
          </div>
          <div className="space-y-2">
            <FieldLabel>Stage</FieldLabel>
            <ChipGroup options={STAGES} value={stage} onChange={setStage} />
          </div>

          <div className="space-y-2">
            <FieldLabel>Africa</FieldLabel>
            <div className="grid sm:grid-cols-3 gap-2">
              <CheckRow checked={africaHq} onChange={setAfricaHq}>Headquartered in Africa</CheckRow>
              <CheckRow checked={africaCustomers} onChange={setAfricaCustomers}>Active customers in Africa</CheckRow>
              <CheckRow checked={africaExpansion} onChange={setAfricaExpansion}>Planning African expansion</CheckRow>
            </div>
          </div>
        </section>

        <section className="space-y-5 border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">The people</p>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <FieldLabel htmlFor="founderName">Founder name</FieldLabel>
              <Input id="founderName" value={founderName} onChange={(e) => setFounderName(e.target.value)} maxLength={120} required />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} required />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <FieldLabel htmlFor="linkedin" optional>Founder LinkedIn</FieldLabel>
              <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/…" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} maxLength={300} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="teamDescription">The team</FieldLabel>
              <CharCount value={teamDescription} max={CAPS.teamDescription} />
            </div>
            <Textarea id="teamDescription" rows={4} placeholder="Who's building this, and what have they built before?" value={teamDescription} onChange={(e) => setTeamDescription(e.target.value)} maxLength={CAPS.teamDescription} required />
          </div>
        </section>

        <section className="space-y-5 border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">The pitch</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="founderMessage">Message from the founder</FieldLabel>
              <CharCount value={founderMessage} max={CAPS.founderMessage} />
            </div>
            <Textarea id="founderMessage" rows={4} placeholder="What are you building, and why now?" value={founderMessage} onChange={(e) => setFounderMessage(e.target.value)} maxLength={CAPS.founderMessage} required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="traction" optional>Traction</FieldLabel>
              <CharCount value={traction} max={CAPS.traction} />
            </div>
            <Textarea id="traction" rows={2} placeholder="Revenue, users, pilots — one or two lines." value={traction} onChange={(e) => setTraction(e.target.value)} maxLength={CAPS.traction} />
          </div>

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
            <FieldLabel optional>Supporting documents (up to {MAX_SUPPORTING_DOCS})</FieldLabel>
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

        {error && (
          <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground max-w-xs text-pretty">
            Your deck is kept confidential and reviewed only by the Staunch team.
          </p>
          <Button type="submit" variant="brand" size="pill-lg" disabled={busy}>
            {phase === "uploading" ? "Uploading deck…" : phase === "saving" ? "Submitting…" : "Submit application"}
            {!busy && <ArrowRight className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      </Card>
    </form>
  );
}
