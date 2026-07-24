"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { SECTORS, INVESTOR_TYPES, CAPS, PITCH_URL } from "@/lib/intake";
import { FieldLabel, ChipGroup, CharCount } from "./form-bits";

type Sector = (typeof SECTORS)[number];
type InvestorType = (typeof INVESTOR_TYPES)[number];

/**
 * Deliberately near-zero friction: two text fields and one chip row are all
 * that's required. The form's real job is routing — founders belong at
 * PITCH_URL (the banner sends them there), while investors should feel like
 * they're leaving a card, not filing an application.
 *
 * Note: /invest is no longer linked from the site (see PITCH_URL/INVEST_MAILTO
 * in lib/intake.ts) — startup pitches now route to a third-party CRM intake
 * tool, and investor inquiries route to Oliver's inbox directly. This page
 * and its backing DB/blob infra stay live, unlinked, in case either process
 * comes back in-house.
 */
export function InvestForm() {
  const [name, setName] = React.useState("");
  const [firm, setFirm] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [investorType, setInvestorType] = React.useState<InvestorType[]>([]);
  const [sectors, setSectors] = React.useState<Sector[]>([]);
  const [message, setMessage] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");

  const [busy, setBusy] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError("Your name is required.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setError("A valid email is required.");
    if (investorType.length === 0) return setError("Pick the option that best describes you.");
    if (message.length > CAPS.investorMessage) return setError("Message is over the character limit.");

    try {
      setBusy(true);
      const res = await fetch("/api/invest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          firm,
          email,
          linkedin,
          location,
          investorType: investorType[0],
          sectors,
          message,
          firmUrl2: honeypot,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <Card className="p-8 md:p-12 text-center">
        <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-5" strokeWidth={1.5} />
        <h2 className="text-2xl md:text-3xl font-serif font-normal tracking-heading mb-3">
          Thank you
        </h2>
        <p className="text-muted-foreground text-pretty max-w-md mx-auto">
          Your details are with the partners. Expect a personal reply — this
          inbox isn&apos;t a funnel.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Founder deflection — the polite bouncer */}
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/50 px-5 py-3.5 text-sm">
        <Rocket className="h-4 w-4 text-primary shrink-0" strokeWidth={1.75} />
        <p className="text-muted-foreground">
          Raising for a startup? This route is for investors —{" "}
          <Link href={PITCH_URL} className="font-medium text-foreground hover:text-primary transition-colors">
            pitch us here instead
          </Link>
          .
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <Card className="p-6 md:p-10 space-y-8">
          <input
            type="text"
            name="firmUrl2"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <section className="space-y-5">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Leave your card</p>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <FieldLabel htmlFor="invName">Name</FieldLabel>
                <Input id="invName" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} required />
              </div>
              <div className="space-y-2">
                <FieldLabel htmlFor="invEmail">Email</FieldLabel>
                <Input id="invEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} required />
              </div>
              <div className="space-y-2">
                <FieldLabel htmlFor="invFirm" optional>Firm / organisation</FieldLabel>
                <Input id="invFirm" value={firm} onChange={(e) => setFirm(e.target.value)} maxLength={160} />
              </div>
              <div className="space-y-2">
                <FieldLabel htmlFor="invLocation" optional>Based in</FieldLabel>
                <Input id="invLocation" placeholder="City, country" value={location} onChange={(e) => setLocation(e.target.value)} maxLength={120} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <FieldLabel htmlFor="invLinkedin" optional>LinkedIn / website</FieldLabel>
                <Input id="invLinkedin" type="url" placeholder="https://" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} maxLength={300} />
              </div>
            </div>
            <div className="space-y-2">
              <FieldLabel>Which best describes you?</FieldLabel>
              <ChipGroup options={INVESTOR_TYPES} value={investorType} onChange={setInvestorType} />
            </div>
          </section>

          <section className="space-y-5 border-t border-border pt-8">
            <div className="space-y-2">
              <FieldLabel optional>Sectors of interest</FieldLabel>
              <ChipGroup options={SECTORS} value={sectors} onChange={setSectors} multi />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="invMessage" optional>Anything you&apos;d like us to know</FieldLabel>
                <CharCount value={message} max={CAPS.investorMessage} />
              </div>
              <Textarea id="invMessage" rows={3} placeholder="Totally optional — we'll reach out either way." value={message} onChange={(e) => setMessage(e.target.value)} maxLength={CAPS.investorMessage} />
            </div>
          </section>

          {error && (
            <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between gap-4 border-t border-border pt-6">
            <p className="text-xs text-muted-foreground max-w-xs text-pretty">
              30 seconds, no pitch required. A partner replies personally.
            </p>
            <Button type="submit" variant="brand" size="pill-lg" disabled={busy}>
              {busy ? "Sending…" : "Start the conversation"}
              {!busy && <ArrowRight className="ml-1 h-4 w-4" />}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
