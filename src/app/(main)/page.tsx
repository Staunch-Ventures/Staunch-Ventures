"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Network, Rocket, Coins, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { growthPartners, initiatives, startupsCofounded, ventures } from "@/lib/site-data";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { ImpactChart } from "@/components/marketing/impact-chart";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TiltCard } from "@/components/ui/tilt-card";
import { Marquee } from "@/components/ui/marquee";
import { Magnetic } from "@/components/ui/magnetic";

export default function HomePage() {
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative w-full pt-28 md:pt-36 lg:pt-44 pb-20 lg:pb-28">
        {/* Organic African topography — cartographic contour rings */}
        <div className="pointer-events-none absolute inset-0 bg-topo opacity-80" aria-hidden />

        <div className="mx-auto max-w-9xl px-4 lg:px-8 relative">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12 items-center">
            <ScrollReveal className="lg:col-span-6 flex flex-col justify-center space-y-7">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur-md px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Now investing across Africa
              </div>
              <h1 className="text-balance text-5xl font-bold tracking-display sm:text-6xl lg:text-[5rem] lg:leading-[0.95]">
                <span className="text-gradient-brand">Backing Africa&apos;s</span>
                <br />
                <span className="text-gradient-ember">Boldest Founders</span>
              </h1>
              <p className="max-w-[560px] text-pretty text-muted-foreground text-lg md:text-xl">
                A cross-border network for Africa&apos;s tech startups — capital, expertise, and the operators who&apos;ve scaled before.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Button asChild variant="brand" size="pill-lg">
                    <Link href="/contact">
                      Pitch Your Startup
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </Magnetic>
                <Button asChild variant="outline" size="pill-lg">
                  <Link href="/impact">See our portfolio</Link>
                </Button>
              </div>

              {/* Proof strip */}
              <dl className="mt-2 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Cofounded</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums">{startupsCofounded}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Initiatives</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums">{initiatives.length}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Partners</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums">{growthPartners.length}</dd>
                </div>
              </dl>
            </ScrollReveal>

            <div className="lg:col-span-6 relative flex items-center justify-center lg:pl-8">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="w-full py-20 lg:py-28">
        <div className="mx-auto max-w-9xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">What we do</p>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-display text-balance">
                Backing founders. Building the ecosystem.
              </h2>
            </div>
          </ScrollReveal>

          <Stagger className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <StaggerItem className="flex lg:col-span-2">
              <Link href="/impact#ventures" className="flex group w-full">
                <SpotlightCard className="w-full flex">
                  <Card variant="interactive" className="w-full flex flex-col p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                        <Rocket className="h-5 w-5 text-primary" />
                      </span>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Capital + Operators</p>
                    </div>
                    <h3 className="text-3xl font-semibold tracking-tight text-foreground mb-4">
                      Supporting startups
                    </h3>
                    <p className="text-muted-foreground text-base flex-grow text-pretty">
                      Investing time, expertise, and capital in early-stage startups — with a focus on EdTech and HealthTech, and emerging plays in Clean Energy and AgriTech.
                    </p>
                    <div className="mt-8 font-medium text-foreground flex items-center text-sm transition-colors group-hover:text-primary">
                      Explore ventures
                      <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Card>
                </SpotlightCard>
              </Link>
            </StaggerItem>

            <StaggerItem className="flex">
            <Card ref={statsRef} className="flex flex-col justify-center p-8 w-full">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-6">Since 2020</p>
              <div className="space-y-6">
                <div>
                  <p className="text-5xl font-semibold tracking-display tabular-nums text-foreground">
                    {statsInView ? <CountUp end={ventures.length} duration={2.2} /> : "0"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Startups supported</p>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <p className="text-5xl font-semibold tracking-display tabular-nums text-foreground">
                    {statsInView ? <CountUp end={initiatives.length} duration={2.2} /> : "0"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Initiatives run</p>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <p className="text-5xl font-semibold tracking-display tabular-nums text-foreground">
                    {statsInView ? <CountUp end={growthPartners.length} duration={2.2} /> : "0"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Growth partners</p>
                </div>
              </div>
            </Card>
            </StaggerItem>

            <StaggerItem className="flex">
              <Card className="flex flex-col w-full p-8">
                <ImpactChart />
              </Card>
            </StaggerItem>

            <StaggerItem className="flex lg:col-span-2">
              <Link href="/impact#initiatives" className="flex group w-full">
                <SpotlightCard className="w-full flex">
                  <Card variant="interactive" className="w-full flex flex-col p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                        <Network className="h-5 w-5 text-primary" />
                      </span>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Ecosystem</p>
                    </div>
                    <h3 className="text-3xl font-semibold tracking-tight text-foreground mb-4">
                      Building networks
                    </h3>
                    <p className="text-muted-foreground text-base flex-grow text-pretty">
                      Going beyond funding — pitch competitions, collaborative think tanks, mentor circles. The connective tissue founders actually need.
                    </p>
                    <div className="mt-8 font-medium text-foreground flex items-center text-sm transition-colors group-hover:text-primary">
                      See initiatives
                      <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Card>
                </SpotlightCard>
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* The Staunch Edge — reactive tilt cards */}
      <section className="w-full py-20 lg:py-28">
        <div className="mx-auto max-w-9xl px-4 lg:px-8">
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Why founders choose Staunch</p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-display text-balance">
              Capital is just the beginning.
            </h2>
            <p className="text-muted-foreground text-lg text-pretty mt-4 max-w-prose">
              Founders work with us because we bring three things money alone can&apos;t buy.
            </p>
          </ScrollReveal>

          <Stagger className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Coins,
                eyebrow: "Capital",
                title: "Patient & founder-aligned.",
                body: "Cheques sized to your milestones, structured to keep you in control of the journey you set out on.",
              },
              {
                icon: Users2,
                eyebrow: "Operators",
                title: "We've scaled before.",
                body: "Active partners — not passive money. Strategy, growth, hiring, infra — we step in where it matters.",
              },
              {
                icon: Network,
                eyebrow: "Network",
                title: "Cross-border by design.",
                body: "A web of investors, advisors, founders and partners spanning the continent and beyond.",
              },
            ].map((p) => (
              <StaggerItem key={p.eyebrow} className="flex">
                <TiltCard className="w-full flex" intensity={7}>
                  <Card variant="interactive" className="w-full flex flex-col p-8 md:p-10">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                      <p.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                    </span>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-primary mb-2">{p.eyebrow}</p>
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-4">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground text-pretty flex-grow">{p.body}</p>
                  </Card>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Partners */}
      <section className="relative w-full pb-28 pt-8 overflow-hidden">
        {/* Top hairline + ambient glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" aria-hidden />
        <div className="mx-auto max-w-9xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Partners</p>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-display text-balance">
                  Trusted by leaders across the continent
                </h2>
              </div>
              <Button asChild variant="ghost" size="pill" className="self-start sm:self-auto">
                <Link href="/partners">
                  View ecosystem
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Marquee speed={45} className="py-2">
              {growthPartners.map((partner) => (
                <div
                  key={partner.name}
                  className="mx-3 flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-border bg-card/60 backdrop-blur-md px-6 transition-colors hover:bg-card"
                >
                  <div className="relative h-12 w-full opacity-60 transition-opacity hover:opacity-100">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      sizes="160px"
                      className="object-contain"
                      data-ai-hint={partner.logoHint}
                    />
                  </div>
                </div>
              ))}
            </Marquee>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full pb-28">
        <div className="mx-auto max-w-9xl px-4 lg:px-8">
          <ScrollReveal>
            <SpotlightCard className="relative overflow-hidden rounded-3xl border-lit bg-card/70 backdrop-blur-xl shadow-float">
              {/* Ember wash + topo */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(80% 120% at 80% 0%, hsl(16 90% 56% / 0.22), transparent 55%), radial-gradient(60% 100% at 0% 100%, hsl(38 92% 58% / 0.12), transparent 55%)",
                }}
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-0 bg-topo opacity-60" aria-hidden />
              <div className="relative z-[2] flex flex-col items-center gap-6 px-6 py-16 text-center md:py-20">
                <h2 className="text-balance text-4xl lg:text-6xl font-bold tracking-display max-w-3xl">
                  <span className="text-gradient-brand">Ready to build the</span>
                  <br />
                  <span className="text-gradient-ember">future of Africa?</span>
                </h2>
                <p className="text-pretty text-lg text-muted-foreground max-w-xl">
                  Whether you&apos;re a founder with a bold idea or an investor backing the continent&apos;s next chapter — let&apos;s talk.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button asChild variant="brand" size="pill-lg">
                    <Link href="/contact">
                      Pitch Your Startup
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="pill-lg">
                    <Link href="/dashboard">Investor Login</Link>
                  </Button>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
