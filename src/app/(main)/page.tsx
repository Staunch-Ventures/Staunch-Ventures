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
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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
      <section className="relative w-full pt-28 md:pt-36 lg:pt-44 pb-16">
        {/* Faint grid backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />
        {/* One restrained primary glow, top-right */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 80% 15%, hsl(16 85% 56% / 0.18), transparent 60%)",
          }}
        />

        <div className="mx-auto max-w-9xl px-4 lg:px-8 relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur-md px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Now investing across Africa
              </div>
              <h1 className="text-balance text-5xl font-bold tracking-display sm:text-6xl lg:text-7xl text-gradient-brand">
                Backing Africa&apos;s<br />Boldest Founders
              </h1>
              <p className="max-w-[600px] text-pretty text-muted-foreground text-lg md:text-xl">
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
              <dl className="mt-4 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
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
            </div>

            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Soft glow under the art */}
                <div
                  className="pointer-events-none absolute inset-0 blur-3xl opacity-50"
                  style={{
                    background:
                      "radial-gradient(circle at 60% 45%, hsl(16 85% 56% / 0.32), transparent 60%)",
                  }}
                  aria-hidden
                />
                <div
                  className="
                    relative
                    h-full w-full
                    [mask-image:radial-gradient(ellipse_60%_70%_at_center,black_55%,transparent_100%)]
                    [-webkit-mask-image:radial-gradient(ellipse_60%_70%_at_center,black_55%,transparent_100%)]
                  "
                >
                  <Image
                    src="/Africa Graphic.jpg"
                    alt="Abstract graphic of the African continent"
                    fill
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-contain mix-blend-screen"
                    priority
                  />
                </div>
              </div>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Link href="/impact#ventures" className="flex group lg:col-span-2">
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
            </Link>

            <Card ref={statsRef} className="flex flex-col justify-center p-8">
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

            <Card ref={chartRef} className="flex flex-col">
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

            <Link href="/impact#initiatives" className="flex group lg:col-span-2">
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
            </Link>
          </div>
        </div>
      </section>

      {/* Engine of Innovation */}
      <section className="w-full py-20 lg:py-28">
        <div className="mx-auto max-w-9xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <div
                className="
                  relative w-full aspect-square max-w-lg mx-auto
                  [mask-image:radial-gradient(ellipse_60%_70%_at_center,black_55%,transparent_100%)]
                  [-webkit-mask-image:radial-gradient(ellipse_60%_70%_at_center,black_55%,transparent_100%)]
                "
              >
                <Image
                  src="/Engine of Innovation.jpg"
                  alt="Engine of Innovation"
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-contain mix-blend-screen"
                  data-ai-hint="abstract technology"
                />
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
      <section className="w-full pb-28 pt-8">
        <div className="mx-auto max-w-9xl px-4 lg:px-8">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Partners</p>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-display">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border rounded-xl overflow-hidden border border-border">
            {growthPartners.map((partner) => (
              <div
                key={partner.name}
                className="aspect-[5/3] bg-card flex items-center justify-center p-6 transition-colors hover:bg-muted"
              >
                <div className="relative w-full h-full opacity-70 hover:opacity-100 transition-opacity">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    sizes="(max-width: 768px) 33vw, 16vw"
                    className="object-contain"
                    data-ai-hint={partner.logoHint}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
