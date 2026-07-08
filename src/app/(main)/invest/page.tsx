import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { InvestForm } from "@/components/intake/invest-form";

export const metadata: Metadata = {
  title: "Invest | Staunch Ventures",
  description:
    "Back Africa's boldest founders alongside Staunch Ventures. Tell us about yourself and we'll set up a conversation.",
};

export default function InvestPage() {
  return (
    <div className="mx-auto max-w-9xl py-24 md:py-32 px-4 lg:px-8">
      <ScrollReveal className="text-center mb-14 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Invest</p>
        <h1 className="text-balance text-5xl md:text-7xl font-serif font-normal tracking-heading leading-[1.0]">
          <span className="text-foreground">Back Africa&apos;s</span>{" "}
          <span className="text-primary">next chapter</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground mt-7 max-w-2xl mx-auto">
          Join the investors, operators and partners backing our portfolio.
          Leave your details and we&apos;ll set up a conversation.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.05} className="max-w-3xl mx-auto">
        <InvestForm />
      </ScrollReveal>
    </div>
  );
}
