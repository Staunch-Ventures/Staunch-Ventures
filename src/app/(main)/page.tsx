import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Network, Coins, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { growthPartners, markets, startupsCofounded, team } from "@/lib/site-data";
import { PITCH_URL } from "@/lib/intake";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { PlatformArms } from "@/components/marketing/platform-arms";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TiltCard } from "@/components/ui/tilt-card";
import { Marquee } from "@/components/ui/marquee";
import { Magnetic } from "@/components/ui/magnetic";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      {/* overflow-x-clip: the floating chip on HeroVisual pokes 20px past the
          card edge, which is wider than the 16px mobile gutter — without the
          clip it drags a few px of horizontal page scroll on small phones. */}
      <section className="relative w-full overflow-x-clip pt-28 md:pt-36 lg:pt-44 pb-20 lg:pb-28">
        <div className="mx-auto max-w-9xl px-4 lg:px-8 relative">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12 items-center">
            <ScrollReveal className="lg:col-span-6 flex flex-col justify-center space-y-7">
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
              <dl className="mt-2 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Markets</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums">{markets.length}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Cofounded</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums">{startupsCofounded}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Partners</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums">{growthPartners.length}</dd>
                </div>
              </dl>
            </ScrollReveal>

            {/* Desktop only: on a phone it costs a full screen between the hero
                and the platform's two doors. */}
            <div className="hidden lg:col-span-6 relative lg:flex items-center justify-center lg:pl-8">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* The platform — the home page's main job is routing. Each arm gets a
          summary and a door; its detail lives at its own home. */}
      <section id="platform" className="w-full py-20 lg:py-28 scroll-mt-24">
        <div className="mx-auto max-w-9xl px-4 lg:px-8">
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">The platform</p>
              <h2 className="text-4xl lg:text-5xl font-serif font-normal tracking-heading text-balance">
                One platform. Two ways we put capital to work.
              </h2>
              <p className="text-muted-foreground text-lg text-pretty mt-4 max-w-prose">
                Staunch Capital invests in Africa&apos;s boldest founders. Staunch Ventures builds
                companies and opens global deals to our investor network. Both run on the same
                team, network and four-market reach.
              </p>
            </div>
          </ScrollReveal>
          <PlatformArms />
        </div>
      </section>

      {/* The Staunch Edge — reactive tilt cards */}
      <section className="w-full py-20 lg:py-28">
        <div className="mx-auto max-w-9xl px-4 lg:px-8">
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Why founders choose Staunch</p>
            <h2 className="text-4xl lg:text-5xl font-serif font-normal tracking-heading text-balance">
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
                body: "Active partners, not passive money. Strategy, growth, hiring, infra. We step in where it matters.",
              },
              {
                icon: Network,
                eyebrow: "Network",
                title: "Cross-border by design.",
                body: "Routes to customers and capital in the US, Europe and Asia, through investors, advisors and partners in all four markets.",
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

      {/* Team — the context every arm shares. Kept on the parent site only; the
          sub-sites link here rather than repeating it. */}
      <section className="w-full pb-20 lg:pb-28">
        <div className="mx-auto max-w-9xl px-4 lg:px-8">
          <ScrollReveal className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">The team</p>
              <h2 className="text-4xl lg:text-5xl font-serif font-normal tracking-heading text-balance">
                Operators behind every arm.
              </h2>
            </div>
            <Button asChild variant="ghost" size="pill" className="self-start sm:self-auto">
              <Link href="/about#team">
                Meet the team
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <Link href="/about#team" className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] border border-border bg-muted">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 font-semibold tracking-tight text-foreground">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </Link>
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
