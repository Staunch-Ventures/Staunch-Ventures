import type { Metadata } from "next";
import { Eye, Users2, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { InvestForm } from "@/components/intake/invest-form";

export const metadata: Metadata = {
  title: "Invest | Staunch Ventures",
  description:
    "Back Africa's boldest founders alongside Staunch Ventures. Leave your card and a partner will reach out personally.",
};

const reasons = [
  {
    icon: Eye,
    title: "First look",
    body: "See our pipeline of vetted African startups before anyone else.",
  },
  {
    icon: Users2,
    title: "Operator diligence",
    body: "We work inside our ventures — you hear how they're really doing.",
  },
  {
    icon: MessageCircle,
    title: "A personal reply",
    body: "A partner answers you directly. No funnels, no gatekeeping.",
  },
];

export default function InvestPage() {
  return (
    <div className="mx-auto max-w-9xl py-24 md:py-32 px-4 lg:px-8">
      <ScrollReveal className="text-center mb-12 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Invest</p>
        <h1 className="text-balance text-5xl md:text-7xl font-serif font-normal tracking-heading leading-[1.0]">
          <span className="text-foreground">Back Africa&apos;s</span>{" "}
          <span className="text-primary">next chapter</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground mt-7 max-w-2xl mx-auto">
          Leave your card — thirty seconds, no pitch required — and we&apos;ll
          open the conversation.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.05} className="max-w-3xl mx-auto mb-10">
        <div className="grid sm:grid-cols-3 gap-4">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-2xl border border-border bg-card/40 p-5">
              <r.icon className="h-4 w-4 text-primary mb-3" strokeWidth={1.75} />
              <p className="text-sm font-semibold tracking-tight mb-1">{r.title}</p>
              <p className="text-xs text-muted-foreground text-pretty">{r.body}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="max-w-3xl mx-auto">
        <InvestForm />
      </ScrollReveal>
    </div>
  );
}
