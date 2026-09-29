import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Briefcase, Globe2, Layers, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { growthPartners, markets, ventures } from "@/lib/site-data";
import { PITCH_URL } from "@/lib/intake";
import { CAPITAL_URL } from "@/lib/sites";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { PlatformArms } from "@/components/marketing/platform-arms";
import { HeroMap } from "@/components/marketing/hero-map";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Marquee } from "@/components/ui/marquee";
import { Magnetic } from "@/components/ui/magnetic";

/*
 * Home is Staunch Ventures: what Staunch is, what it does (the studio, the
 * co-investment network and the fund), and the detail on the first two. The
 * fund has its own page; team, mission and ecosystem live on /about.
 */
const networkPoints = [
  {
    icon: Globe2,
    title: "Sourced across four markets",
    body: "African companies we build and back, and international opportunities we source in the US, Europe and Asia, from Seed through Pre-IPO.",
  },
  {
    icon: Layers,
    title: "Deal by deal",
    body: "We facilitate the deal flow; you choose exactly what you back, one opportunity at a time. Onboard once and every future deal reaches you.",
  },
  {
    icon: Lock,
    title: "By invitation",
    body: "Opportunities are shared privately with network members, never listed publicly.",
  },
];

export default function HomePage() {
  const featured = ventures[0];

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative w-full overflow-x-clip pt-28 md:pt-36 lg:pt-44 pb-20 lg:pb-28">
        <div className="mx-auto max-w-9xl px-4 lg:px-8 relative">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <ScrollReveal className="flex flex-col justify-center space-y-7 lg:col-span-6">
              <h1 className="text-balance text-5xl font-serif font-normal tracking-heading sm:text-6xl lg:text-[5.25rem] lg:leading-[1.0]">
                <span className="text-gradient-brand">Backing the</span>
                <br />
                <span className="text-gradient-ember">boldest founders</span>
              </h1>
              <p className="max-w-[580px] text-muted-foreground text-lg md:text-xl text-pretty">
                Staunch is a cross-border venture platform linking Africa with the US, Europe and
                Asia. Capital, execution and global market access for high-growth founders and
                investors.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Button asChild variant="brand" size="pill-lg">
                    <Link href="/invest">
                      Invest
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </Magnetic>
                <Button asChild variant="outline" size="pill-lg">
                  <Link href={PITCH_URL}>Pitch Your Startup</Link>
                </Button>
              </div>

              {/* Proof strip */}
              <dl className="mt-2 grid max-w-xs grid-cols-2 gap-6 border-t border-border pt-6">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Markets</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums">{markets.length}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Partners</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums">{growthPartners.length}</dd>
                </div>
              </dl>
            </ScrollReveal>
            <div className="relative lg:col-span-6 lg:pl-6">
              <HeroMap />
            </div>
          </div>
        </div>
      </section>

      {/* What we do — the overview. A visitor who only came for one thing sees
          its door within a scroll of the hero. */}
      <section id="platform" className="w-full py-20 lg:py-28 scroll-mt-24">
        <div className="mx-auto max-w-9xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">What we do</p>
              <h2 className="text-4xl lg:text-5xl font-serif font-normal tracking-heading text-balance">
                We build companies, open deals, and invest.
              </h2>
              <p className="text-muted-foreground text-lg text-pretty mt-4 max-w-prose">
                Staunch Ventures runs the venture studio and the co-investment network. Staunch
                Capital is our fund.
              </p>
            </div>
          </ScrollReveal>
          <PlatformArms />
        </div>
      </section>

      {/* The studio and the co-investment network, in detail. */}
      <div className="mx-auto max-w-9xl px-4 lg:px-8 w-full space-y-20 md:space-y-24 pb-20 lg:pb-28">
      {/* The studio */}
      <section id="studio" className="scroll-mt-24 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">The studio</p>
          <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-heading text-balance">
            Cofounding as a service.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.05} className="flex gap-4">
          <Briefcase className="h-6 w-6 shrink-0 text-primary mt-1" strokeWidth={1.5} />
          <p className="text-muted-foreground text-lg text-pretty">
            Staunch acts as an institutional cofounder: an execution partner helping founders build
            and scale faster. Tech-stack architecture, MVP planning, go-to-market, business
            development, core strategy frameworks, and more.
          </p>
        </ScrollReveal>
      </section>

      {/* Featured venture — full-width case study */}
      <section>
        <ScrollReveal className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-heading">Featured venture</h2>
          <p className="hidden sm:block text-sm text-muted-foreground">Where we&apos;re building now.</p>
        </ScrollReveal>
        <ScrollReveal>
          <SpotlightCard>
            <Card variant="interactive" className="overflow-hidden p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col">
                  <div className="relative h-12 w-auto max-w-[180px] mb-6">
                    <Image
                      src={featured.logo}
                      alt={`${featured.companyName} logo`}
                      fill
                      sizes="180px"
                      className="object-contain object-left"
                      data-ai-hint={featured.logoHint}
                    />
                  </div>
                  <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border-primary/20 mb-5">
                    {featured.sector}
                  </Badge>
                  <h3 className="text-3xl md:text-4xl font-serif font-normal tracking-heading mb-4">
                    {featured.companyName}
                  </h3>
                  <p className="text-muted-foreground text-lg text-pretty flex-grow">
                    {featured.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {featured.slug && (
                      <Button asChild variant="brand" size="pill">
                        <Link href={`/ventures/${featured.slug}`}>
                          View venture
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {featured.website && (
                      <Button asChild variant="outline" size="pill">
                        <Link href={featured.website} target="_blank" rel="noopener noreferrer">
                          Visit website
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="relative min-h-[280px] md:min-h-full bg-muted border-t md:border-t-0 md:border-l border-border">
                  <Image
                    src="/bag-learning-notes.png"
                    alt={`${featured.companyName} product`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-8"
                    data-ai-hint="app screenshot"
                  />
                </div>
              </div>
            </Card>
          </SpotlightCard>
        </ScrollReveal>
      </section>

      {/* The co-investment network */}
      <section id="network" className="scroll-mt-24">
        <ScrollReveal className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">The co-investment network</p>
          <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-heading text-balance mb-4">
            Global deals, Seed to Pre-IPO.
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Members co-invest deal by deal alongside us. You see the opportunities we source and
            back, and invest only in the ones you choose.
          </p>
        </ScrollReveal>
        <Stagger className="grid md:grid-cols-3 gap-4">
          {networkPoints.map((p) => (
            <StaggerItem key={p.title} className="flex">
              <SpotlightCard className="w-full flex">
                <Card className="w-full p-8 flex flex-col">
                  <p.icon className="h-5 w-5 text-primary mb-6" strokeWidth={1.75} />
                  <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-pretty">{p.body}</p>
                </Card>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
        <ScrollReveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button asChild variant="brand" size="pill-lg">
            <Link href="/invest#network">
              Join the network
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Link href={CAPITAL_URL} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Prefer a diversified portfolio? See the fund &rarr;
          </Link>
        </ScrollReveal>
      </section>

      </div>

      {/* Partners */}
      <section className="relative w-full pb-28 pt-8 overflow-hidden">
        {/* Top hairline + ambient glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" aria-hidden />
        <div className="mx-auto max-w-9xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Partners</p>
                <h2 className="text-4xl lg:text-5xl font-serif font-normal tracking-heading text-balance">
                  Trusted by leaders across the globe
                </h2>
              </div>
              <Button asChild variant="ghost" size="pill" className="self-start sm:self-auto">
                <Link href="/about#ecosystem">
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
                  className="mx-3 flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-border bg-card/90 px-6 transition-colors hover:bg-card"
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
                <h2 className="text-balance text-4xl lg:text-6xl font-serif font-normal tracking-heading max-w-3xl">
                  <span className="text-gradient-brand">Ready to build the</span>
                  <br />
                  <span className="text-gradient-ember">future of Africa?</span>
                </h2>
                <p className="text-pretty text-lg text-muted-foreground max-w-xl">
                  Whether you&apos;re backing Africa&apos;s next chapter or building it. Let&apos;s talk.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button asChild variant="brand" size="pill-lg">
                    <Link href="/invest">
                      Invest
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="pill-lg">
                    <Link href={PITCH_URL}>Pitch Your Startup</Link>
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
