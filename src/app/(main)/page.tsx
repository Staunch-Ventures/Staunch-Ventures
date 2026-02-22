"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Network, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { growthPartners, initiatives, ventures } from "@/lib/site-data";
import { Area, AreaChart, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const impactData = [
    { name: '2020', value: 200 },
    { name: '2021', value: 1890 },
    { name: '2022', value: 2680 },
    { name: '2023', value: 4150 },
    { name: '2024', value: 7000 },
    { name: '2025', value: 9800 },
];

export default function HomePage() {
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: chartRef, inView: chartInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="flex flex-col min-h-[100dvh] w-full">
      {/* Hero Section */}
      <section className="w-full pt-24 md:pt-32 lg:pt-40">
        <div className="mx-auto max-w-9xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <ScrollReveal className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl text-foreground">
                  Backing Africa's
                  <br />
                  Boldest Founders
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-xl md:text-2xl">
                  A cross-border network for Africa's Tech Startups.
                </p>
              </div>
              <div className="w-fit">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity shadow-lg shadow-primary-glow px-8 py-6 text-base font-semibold">
                  <Link href="/contact">Pitch Your Startup</Link>
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal className="relative mt-12 flex items-center justify-center lg:mt-0" delay={0.2}>
              {/* Optional subtle glow behind the art to make the transition feel intentional */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-40"
                style={{
                  background:
                    "radial-gradient(circle at 60% 45%, rgba(255,128,40,0.35), transparent 55%)",
                }}
              />

              {/* Feather edges on ALL sides using two linear masks (Y + X) */}
              <div
                className="
                  relative
                  w-fit
                  mx-auto
                  overflow-hidden
                  [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%),linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%),radial-gradient(ellipse_at_center,black_60%,transparent_100%)]
                  [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%),linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%),radial-gradient(ellipse_at_center,black_60%,transparent_100%)]
                  [mask-composite:intersect]
                  [-webkit-mask-composite:source-in]
                "
              >
                <Image
                  src="/Africa Graphic.jpg"
                  alt="Abstract graphic of the African continent"
                  width={600}
                  height={600}
                  className="object-contain mix-blend-lighten"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* What We Do Section */}
      <section className="w-full py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-9xl px-4">
          <ScrollReveal>
            <h2 className="text-4xl text-center font-bold tracking-tighter mb-12">
              What We Do
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ScrollReveal className="lg:col-span-2">
              <Link href="/impact#ventures" className="flex group h-full">
                <Card className="w-full flex flex-col p-8 md:p-12 transition-all duration-300 group-hover:border-primary/80 group-hover:bg-glass-gradient-primary">
                  <div className="flex items-center gap-4">
                    <Rocket className="h-10 w-10 text-primary" />
                    <h3 className="text-4xl font-bold tracking-tighter text-foreground">
                      Supporting Startups
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-6 flex-grow text-lg">
                    We invest our time, expertise, and capital in early-stage startups with a core focus on EdTech and HealthTech/MedTech, while also exploring opportunities in Clean Energy and AgriTech.
                  </p>
                  <div className="mt-6 font-semibold text-primary flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
            
            <ScrollReveal>
              <Card ref={statsRef} className="flex flex-col justify-center p-8 transition-all duration-300 hover:border-primary/80 hover:bg-glass-gradient-primary h-full">
                <div className="space-y-8 text-center">
                  <div>
                    <p className="text-5xl font-bold text-primary">
                       {statsInView ? <CountUp end={ventures.length} duration={2.5} /> : "0"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Startups supported</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-primary">
                      {statsInView ? <CountUp end={initiatives.length} duration={2.5} /> : "0"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">events</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-primary">
                      {statsInView ? <CountUp end={growthPartners.length} duration={2.5} /> : "0"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">growth partners</p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal>
              <Card ref={chartRef} className="flex flex-col transition-all duration-300 hover:border-primary/80 hover:bg-glass-gradient-primary h-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl tracking-tighter text-center">Impact</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow flex h-full min-h-[350px]">
                  {chartInView && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart 
                        data={impactData}
                        margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
                      >
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                         <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" horizontal={true} vertical={false} />
                        <Tooltip
                            contentStyle={{ display: 'none' }}
                            cursor={{fill: 'hsl(var(--primary) / 0.1)'}}
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
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-2">
              <Link href="/impact#initiatives" className="flex group h-full">
                <Card className="w-full flex flex-col p-8 md:p-12 transition-all duration-300 group-hover:border-primary/80 group-hover:bg-glass-gradient-primary">
                  <div className="flex items-center gap-4">
                    <Network className="h-10 w-10 text-primary" />
                    <h3 className="text-4xl font-bold tracking-tighter text-foreground">
                      Building Networks
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-6 flex-grow text-lg">
                    We go beyond funding, building a robust ecosystem through pitch competitions and collaborative think tanks to provide founders with resources, mentorship, and networks to thrive.
                  </p>
                  <div className="mt-6 font-semibold text-primary flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Engine of Innovation Section */}
      <section className="w-full py-28">
        <div className="mx-auto max-w-9xl px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div
                className="
                  relative
                  overflow-hidden
                  w-fit
                  mx-auto
                  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%),linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%),radial-gradient(ellipse_at_center,black_60%,transparent_100%)]
                  [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%),linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%),radial-gradient(ellipse_at_center,black_60%,transparent_100%)]
                  [mask-composite:intersect]
                  [-webkit-mask-composite:source-in]
                "
              >
                <Image
                  src="/Engine of Innovation.jpg"
                  alt="Engine of Innovation"
                  width={600}
                  height={600}
                  className="object-contain mix-blend-lighten"
                  data-ai-hint="abstract technology"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <Card className="hover:border-primary/80 hover:bg-glass-gradient-primary transition-all duration-300">
                <div className="space-y-4 p-8 md:p-12">
                  <h2 className="text-3xl font-bold tracking-tighter text-foreground">
                    The Engine of Innovation
                  </h2>
                  <p className="text-muted-foreground">
                    Staunch Ventures is more than capital. We provide strategic partnership, operational expertise, and access to a global network, enabling founders to scale with impact.
                  </p>
                  <Button
                    asChild
                    variant="link"
                    className="p-0 text-primary h-auto font-semibold"
                  >
                    <Link href="/about">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full pb-28">
        <div className="mx-auto max-w-9xl px-4">
          <ScrollReveal>
            <h2 className="text-4xl text-center font-bold tracking-tighter mb-12">
              Partners
            </h2>
          </ScrollReveal>
          <div className="mx-auto grid max-w-5xl grid-cols-2 items-center justify-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {growthPartners.map((partner, i) => (
              <ScrollReveal key={partner.name} delay={i * 0.1}>
                <div className="flex justify-center">
                  <Card className="flex h-36 w-36 items-center justify-center p-4 transition-all duration-300 hover:border-primary/50 hover:scale-105 hover:bg-glass-gradient-primary">
                    <div className="relative w-24 h-24 bg-foreground/20 rounded-md flex items-center justify-center p-2">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        width={80}
                        height={80}
                        className="object-contain"
                        data-ai-hint={partner.logoHint}
                      />
                    </div>
                  </Card>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
