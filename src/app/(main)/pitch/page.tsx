import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { PitchForm } from "@/components/intake/pitch-form";

export const metadata: Metadata = {
  title: "Pitch Your Startup | Staunch Ventures",
  description:
    "Send us your deck. We back early-stage African startups with capital, expertise, and operators who've scaled before.",
};

export default function PitchPage() {
  return (
    <div className="mx-auto max-w-9xl py-24 md:py-32 px-4 lg:px-8">
      <ScrollReveal className="text-center mb-14 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Pitch us</p>
        <h1 className="text-balance text-5xl md:text-7xl font-serif font-normal tracking-heading leading-[1.0]">
          <span className="text-foreground">Send us</span>{" "}
          <span className="text-primary">your deck</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground mt-7 max-w-2xl mx-auto">
          We read every application. Tell us what you&apos;re building, attach your
          deck, and we&apos;ll take it from there.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.05} className="max-w-3xl mx-auto">
        <PitchForm />
      </ScrollReveal>
    </div>
  );
}
