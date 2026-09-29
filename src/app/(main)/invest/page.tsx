import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { BarMark } from "@/components/capital/marks";
import { INVEST_EMAIL, PITCH_URL } from "@/lib/intake";
import { CAPITAL_URL } from "@/lib/sites";

export const metadata: Metadata = {
  title: "Invest",
  description:
    "Two ways to invest with Staunch: long-term exposure through Staunch Capital, or deal-by-deal co-investment through the Staunch Ventures network.",
};

/*
 * Every "Invest" button on the main site lands here. It's a fork, not a
 * form: there are two investor products, and sending a deal-by-deal angel to
 * a fund page (or a family office to a deal list) loses both. A fund investor
 * is still one click from Staunch Capital, and anyone with the subdomain link
 * skips this page entirely.
 *
 * The old "leave your card" form (components/intake/invest-form.tsx) and its
 * /api/invest route stay in the codebase, unrendered, as before.
 */
const mail = (subject: string) => `mailto:${INVEST_EMAIL}?subject=${encodeURIComponent(subject)}`;

const fund = ["Pre-Seed to Series A", "$100k–$400k per company", "Permanent capital vehicle"];
const network = ["Choose deal by deal", "Seed to Pre-IPO", "Shared privately with members"];

export default function InvestPage() {
  return (
    <div className="mx-auto max-w-9xl py-24 md:py-32 px-4 lg:px-8">
      <ScrollReveal className="text-center mb-14 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Invest</p>
        <h1 className="text-balance text-5xl md:text-7xl font-serif font-normal tracking-heading leading-[1.0]">
          <span className="text-foreground">Two ways</span> <span className="text-primary">in</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground mt-7 max-w-2xl mx-auto">
          Back a portfolio of Africa&apos;s boldest founders through our fund, or choose
          individual deals through our co-investment network.
        </p>
      </ScrollReveal>

      <Stagger className="grid gap-4 lg:grid-cols-2 max-w-6xl mx-auto">
        {/* The fund — drawn in Staunch Capital's own language */}
        <StaggerItem className="flex">
          <div
            id="fund"
            className="scroll-mt-24 relative flex w-full flex-col overflow-hidden rounded-[var(--radius)] border p-8 md:p-12"
            style={{ background: "#0f0e0c", borderColor: "rgba(197,165,114,0.22)", color: "#f2efe9" }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(70% 60% at 85% 10%, rgba(197,165,114,0.10), transparent 70%)" }}
              aria-hidden
            />
            <div className="relative flex items-center gap-3 mb-8">
              <BarMark className="h-6 w-auto" fill="#c5a572" />
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#c5a572]">Staunch Capital</p>
            </div>
            <h2 className="relative font-serif text-4xl font-light tracking-heading md:text-5xl">Invest in the fund</h2>
            <p className="relative mt-4 text-pretty text-base md:text-lg text-[#a49f96]">
              For family offices, institutions and high-net-worth investors who want long-term,
              diversified exposure to disruptive African technology, bringing foreign and domestic
              capital to the founders building it.
            </p>
            <ul className="relative mt-8 space-y-3 text-sm text-[#a49f96]">
              {fund.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-[#c5a572]" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <div className="relative mt-auto pt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              {/* Plain <a>: its own site, its own intro. */}
              <a
                href={CAPITAL_URL}
                className="inline-flex items-center gap-2 border border-[#c5a572] px-6 py-3 font-serif text-lg italic text-[#c5a572] transition-colors duration-500 hover:bg-[#c5a572] hover:text-[#0f0e0c]"
              >
                Visit Staunch Capital
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={mail("Staunch Capital: investor brief")}
                className="text-sm text-[#a49f96] transition-colors hover:text-[#f2efe9]"
              >
                or request the investor brief
              </a>
            </div>
          </div>
        </StaggerItem>

        {/* The network */}
        <StaggerItem className="flex">
          <SpotlightCard className="w-full flex">
            <Card id="network" className="scroll-mt-24 w-full flex flex-col p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <Layers className="h-5 w-5 text-primary" strokeWidth={1.75} />
                </span>
                <p className="text-[11px] uppercase tracking-[0.2em] text-primary">Staunch Ventures network</p>
              </div>
              <h2 className="font-serif text-4xl font-normal tracking-heading text-foreground md:text-5xl">
                Co-invest deal by deal
              </h2>
              <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
                For angels and investors who want to pick individual opportunities: the African
                companies we build and back, and global deals we source in the US, Europe and Asia.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                {network.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button asChild variant="brand" size="pill-lg">
                  <a href={mail("Staunch co-investment network")}>
                    Join the network
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Link href="/ventures#network" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How the network works
                </Link>
              </div>
            </Card>
          </SpotlightCard>
        </StaggerItem>
      </Stagger>

      {/* The context a serious investor wants before either door. */}
      <ScrollReveal className="mt-14 max-w-6xl mx-auto grid gap-4 sm:grid-cols-3 text-sm">
        <Link href="/about#team" className="group rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-border-strong">
          <p className="font-semibold text-foreground">Who&apos;s behind it</p>
          <p className="mt-1 text-muted-foreground">One team runs every arm of Staunch. Meet them &rarr;</p>
        </Link>
        <a href={`mailto:${INVEST_EMAIL}`} className="group rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-border-strong">
          <p className="font-semibold text-foreground">Not sure which fits?</p>
          <p className="mt-1 text-muted-foreground">Email Oliver and we&apos;ll talk it through &rarr;</p>
        </a>
        <Link href={PITCH_URL} className="group rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-border-strong">
          <p className="font-semibold text-foreground">Raising, not investing?</p>
          <p className="mt-1 text-muted-foreground">Founders apply through our pitch form &rarr;</p>
        </Link>
      </ScrollReveal>

      <p className="mt-10 max-w-3xl mx-auto text-center text-xs text-muted-foreground/70 text-pretty">
        Nothing on this page is an offer to sell, or a solicitation of an offer to buy, any security.
        Opportunities are made available privately, to eligible investors only.
      </p>
    </div>
  );
}
