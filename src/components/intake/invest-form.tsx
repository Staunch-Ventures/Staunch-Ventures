"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { SECTORS, INVESTOR_TYPES, TICKET_SIZES, CAPS } from "@/lib/intake";
import { FieldLabel, ChipGroup, CharCount } from "./form-bits";

type Sector = (typeof SECTORS)[number];
type InvestorType = (typeof INVESTOR_TYPES)[number];
type TicketSize = (typeof TICKET_SIZES)[number];

export function InvestForm() {
  const [name, setName] = React.useState("");
  const [firm, setFirm] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [investorType, setInvestorType] = React.useState<InvestorType[]>([]);
  const [ticketSize, setTicketSize] = React.useState<TicketSize[]>([]);
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
          investorType: investorType[0],
          ticketSize: ticketSize[0],
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
          We&apos;ve received your details and will be in touch to set up a
          conversation.
        </p>
      </Card>
    );
  }

  return (
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
          <p className="text-xs uppercase tracking-[0.2em] text-primary">About you</p>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <FieldLabel htmlFor="invName">Name</FieldLabel>
              <Input id="invName" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} required />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="invFirm" optional>Firm / organisation</FieldLabel>
              <Input id="invFirm" value={firm} onChange={(e) => setFirm(e.target.value)} maxLength={160} />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="invEmail">Email</FieldLabel>
              <Input id="invEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} required />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="invLinkedin" optional>LinkedIn / website</FieldLabel>
              <Input id="invLinkedin" type="url" placeholder="https://" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} maxLength={300} />
            </div>
          </div>
          <div className="space-y-2">
            <FieldLabel>Investor type</FieldLabel>
            <ChipGroup options={INVESTOR_TYPES} value={investorType} onChange={setInvestorType} />
          </div>
        </section>

        <section className="space-y-5 border-t border-border pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Your interest</p>
          <div className="space-y-2">
            <FieldLabel optional>Typical ticket size</FieldLabel>
            <ChipGroup options={TICKET_SIZES} value={ticketSize} onChange={setTicketSize} />
          </div>
          <div className="space-y-2">
            <FieldLabel optional>Sectors of interest</FieldLabel>
            <ChipGroup options={SECTORS} value={sectors} onChange={setSectors} multi />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="invMessage" optional>Message</FieldLabel>
              <CharCount value={message} max={CAPS.investorMessage} />
            </div>
            <Textarea id="invMessage" rows={4} placeholder="What are you looking for, and how would you like to work with us?" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={CAPS.investorMessage} />
          </div>
        </section>

        {error && (
          <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
            {error}
          </p>
        )}

        <div className="flex items-center justify-end border-t border-border pt-6">
          <Button type="submit" variant="brand" size="pill-lg" disabled={busy}>
            {busy ? "Sending…" : "Start the conversation"}
            {!busy && <ArrowRight className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      </Card>
    </form>
  );
}
