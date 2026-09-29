import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { BarMark } from "@/components/capital/marks";
import { platformArms, type PlatformArm } from "@/lib/site-data";

/*
 * The platform's arms, side by side. Each card is a summary and a door: the
 * detail lives at the arm's own home, never here.
 *
 * Staunch Capital's card is drawn in the fund's own language (near-black
 * ground, gold hairline, serif, the gold bar mark): a preview of the theme
 * the whole site switches to on /capital.
 */
const CAPITAL = {
  ground: "#0f0e0c",
  gold: "#c5a572",
  text: "#f2efe9",
  muted: "#a49f96",
};

function CapitalCard({ arm }: { arm: PlatformArm }) {
  return (
    <Link href={arm.href} className="group flex w-full">
      <div
        className="relative flex w-full flex-col overflow-hidden rounded-[var(--radius)] border p-8 transition-colors duration-500 md:p-12"
        style={{ background: CAPITAL.ground, borderColor: "rgba(197,165,114,0.22)", color: CAPITAL.text }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: "radial-gradient(70% 60% at 85% 10%, rgba(197,165,114,0.10), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative flex items-center gap-3 mb-8">
          <BarMark className="h-6 w-auto" fill={CAPITAL.gold} />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: CAPITAL.gold }}>
            {arm.kind}
          </p>
        </div>
        <h3 className="relative font-serif text-4xl font-light tracking-heading md:text-5xl">{arm.name}</h3>
        <p className="relative mt-4 max-w-md text-pretty text-base md:text-lg" style={{ color: CAPITAL.muted }}>
          {arm.summary}
        </p>
        <ul className="relative mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.16em]" style={{ color: CAPITAL.muted }}>
          {arm.facts.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full" style={{ background: CAPITAL.gold }} aria-hidden />
              {f}
            </li>
          ))}
        </ul>
        <div className="relative mt-auto pt-10">
          <span className="inline-flex items-center gap-2 border border-[#c5a572] px-6 py-3 font-serif text-lg italic text-[#c5a572] transition-colors duration-500 group-hover:bg-[#c5a572] group-hover:text-[#0f0e0c]">
            {arm.cta}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ArmCard({ arm }: { arm: PlatformArm }) {
  return (
    <Link href={arm.href} className="group flex w-full">
      <SpotlightCard className="w-full flex">
        <Card variant="interactive" className="w-full flex flex-col p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Rocket className="h-5 w-5 text-primary" strokeWidth={1.75} />
            </span>
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary">{arm.kind}</p>
          </div>
          <h3 className="font-serif text-4xl font-normal tracking-heading text-foreground md:text-5xl">{arm.name}</h3>
          <p className="mt-4 max-w-md text-pretty text-base text-muted-foreground md:text-lg">{arm.summary}</p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {arm.facts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10 flex items-center text-sm font-medium text-foreground transition-colors group-hover:text-primary">
            {arm.cta}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </Card>
      </SpotlightCard>
    </Link>
  );
}

export function PlatformArms() {
  return (
    <Stagger className="grid gap-4 lg:grid-cols-2">
      {platformArms.map((arm) => (
        <StaggerItem key={arm.name} className="flex">
          {arm.capitalTheme ? <CapitalCard arm={arm} /> : <ArmCard arm={arm} />}
        </StaggerItem>
      ))}
    </Stagger>
  );
}
