"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Network, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { growthPartners, initiatives, ventures } from "@/lib/site-data";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Marquee } from "@/components/ui/marquee";

const impactData = [
  { name: "2020", value: 200 },
  { name: "2021", value: 1890 },
  { name: "2022", value: 2680 },
  { name: "2023", value: 4150 },
  { name: "2024", value: 7000 },
  { name: "2025", value: 9800 },
];

export default function HomePage() {
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });
  const { ref: chartRef, inView: chartInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
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
                <Button asChild variant="brand" size="pill-lg">
                  <Link href="/contact">
                    Pitch Your Startup
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="pill-lg">
                  <Link href="/impact">See our portfolio</Link>
                </Button>
              </div>

              {/* Proof strip */}
              <dl className="mt-2 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Startups</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums">{ventures.length}</dd>
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
                Capital, expertise, and a network — under one roof.
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
            <Card ref={chartRef} className="flex flex-col w-full">
              <CardHeader className="pb-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Trajectory</p>
                <CardTitle className="text-2xl tracking-tight">Founders reached</CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow flex h-full min-h-[260px]">
                {chartInView && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={impactData} margin={{ top: 12, right: 16, left: 16, bottom: 8 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        dy={4}
                      />
                      <Tooltip
                        cursor={{ stroke: "hsl(var(--primary) / 0.4)", strokeWidth: 1 }}
                        contentStyle={{
                          background: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                        formatter={(value: number) => [value.toLocaleString(), "Founders"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        isAnimationActive={true}
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
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

      {/* Engine of Innovation */}
      <section className="w-full py-20 lg:py-28">
        <div className="mx-auto max-w-9xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div
                  className="pointer-events-none absolute inset-0 blur-3xl opacity-50"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 48%, hsl(16 88% 56% / 0.28), transparent 60%)",
                  }}
                  aria-hidden
                />
                <div
                  className="
                    relative h-full w-full
                    [mask-image:radial-gradient(ellipse_62%_68%_at_center,black_52%,transparent_92%)]
                    [-webkit-mask-image:radial-gradient(ellipse_62%_68%_at_center,black_52%,transparent_92%)]
                  "
                >
                  <Image
                    src="/Engine of Innovation.jpg"
                    alt="Engine of Innovation"
                    fill
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-contain img-fuse"
                    data-ai-hint="abstract technology"
                  />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.2em] text-primary">More than capital</p>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-display text-balance">
                  The engine of innovation
                </h2>
                <p className="text-muted-foreground text-lg text-pretty max-w-prose">
                  Staunch Ventures provides strategic partnership, operational expertise, and access to a global network — enabling founders to scale with impact.
                </p>
                <Button asChild variant="outline" size="pill">
                  <Link href="/about">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
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
                  <span className="text-gradient-brand">Ready to build</span>{" "}
                  <span className="text-gradient-ember">the future of Africa?</span>
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
