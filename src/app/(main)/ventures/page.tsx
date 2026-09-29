import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Globe2, Layers, Lock, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FieldImage } from "@/components/marketing/field-image";
import { ventures, startupsCofounded } from "@/lib/site-data";
import { PITCH_URL } from "@/lib/intake";
import { CAPITAL_URL } from "@/lib/sites";

export const metadata: Metadata = {
  // Absolute: the root template would otherwise append "· Staunch Ventures".
  title: { absolute: "Staunch Ventures: venture studio & co-investment network" },
  description:
    "A 0-to-1 venture studio and co-investment network, opening routes to international markets and syndicating global deals from Seed through Pre-IPO.",
};

/*
 * Staunch Ventures, one of the platform's two arms (Staunch Capital is the
 * other, on its own subdomain). Two halves: the studio, which builds
 * companies, and the co-investment network, which brings investors deal flow
 * they choose from one opportunity at a time.
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

const focusAreas = [
  { label: "EdTech", state: "Core focus" },
  { label: "HealthTech / MedTech", state: "Core focus" },
  { label: "Clean Energy", state: "Exploring" },
  { label: "AgriTech", state: "Exploring" },
];

export default function VenturesPage() {
  const featured = ventures[0];

  return (
    <div className="mx-auto max-w-9xl py-24 md:py-32 px-4 lg:px-8 space-y-20 md:space-y-24">
      <ScrollReveal className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Staunch Ventures</p>
        <h1 className="text-balance text-5xl md:text-7xl font-serif font-normal tracking-heading leading-[1.0]">
          <span className="text-foreground">We build companies.</span>{" "}
          <span className="text-primary">We open deals.</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground max-w-2xl mx-auto mt-7">
          A 0-to-1 venture studio and co-investment network, opening routes to international
          markets and syndicating global deals from Seed through Pre-IPO.
        </p>
        <nav aria-label="On this page" className="mt-10 flex flex-wrap justify-center gap-2">
          {[
            { id: "studio", label: "The studio" },
            { id: "network", label: "The co-investment network" },
          ].map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-border bg-card/40 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </ScrollReveal>

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

      {/* How we build */}
      <section>
        <ScrollReveal className="mb-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-heading mb-4">How we build</h2>
          <p className="text-muted-foreground text-lg text-pretty">
            We back early-stage founders solving local challenges with global applications, leading with the sectors where Africa&apos;s next decade of growth is being written.
          </p>
        </ScrollReveal>
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {focusAreas.map((area) => (
            <StaggerItem key={area.label} className="flex">
              <SpotlightCard className="w-full flex">
                <Card className="w-full p-6 flex flex-col">
                  <p className="text-xs uppercase tracking-wider text-primary mb-2">{area.state}</p>
                  <p className="text-lg font-semibold tracking-tight text-foreground">{area.label}</p>
                </Card>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Team track record */}
      <ScrollReveal>
        <SpotlightCard>
          <Card variant="brand" className="overflow-hidden p-0">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-7xl md:text-8xl font-serif font-normal tracking-heading tabular-nums text-primary leading-none mb-6">
                  {startupsCofounded}
                </p>
                <h2 className="text-2xl md:text-3xl font-serif font-normal tracking-heading mb-3">
                  Startups cofounded across the team
                </h2>
                <p className="text-muted-foreground text-pretty">
                  Our portfolio is young, but our team isn&apos;t. Between us we&apos;ve started and scaled revenue-generating companies before. The operator experience we bring inside every venture we build.
                </p>
              </div>
              <div className="flex items-center justify-center p-8 pt-0 md:p-10 md:pl-0">
                <FieldImage
                  src="/cofound-workshop.jpg"
                  alt="The Staunch team in a cofounding workshop session"
                  width={1200}
                  height={1600}
                  className="h-80 md:h-[480px]"
                />
              </div>
            </div>
          </Card>
        </SpotlightCard>
      </ScrollReveal>

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
          <a href={CAPITAL_URL} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Prefer diversified fund exposure? Staunch Capital &rarr;
          </a>
        </ScrollReveal>
      </section>

      {/* Founders */}
      <ScrollReveal className="text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-heading mb-4">
          Building something bold?
        </h2>
        <p className="text-muted-foreground text-lg text-pretty max-w-xl mx-auto mb-8">
          We partner early and build hands-on. Tell us what you&apos;re working on.
        </p>
        <Button asChild variant="outline" size="pill-lg">
          <Link href={PITCH_URL}>Pitch Your Startup</Link>
        </Button>
      </ScrollReveal>
    </div>
  );
}
