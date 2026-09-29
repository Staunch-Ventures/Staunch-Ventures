import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Quote,
  Sprout,
  BookOpen,
  Mountain,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Linkedin,
  Mail,
  Rocket,
  Coins,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Marquee } from "@/components/ui/marquee";
import { FieldImage } from "@/components/marketing/field-image";
import { FieldVideo } from "@/components/marketing/field-video";
import { VideoCard } from "@/components/marketing/video-card";
import { fieldPhotos, growthPartners, initiatives, markets, team, videos } from "@/lib/site-data";
import { INVEST_EMAIL, PITCH_URL } from "@/lib/intake";

export const metadata: Metadata = {
  title: "About",
  description:
    "Staunch is a cross-border venture platform connecting Africa with the US, Europe and Asia. Our mission, markets, team and ecosystem.",
};

/*
 * The context page for the whole Staunch ecosystem. Mission, markets, team,
 * partners and contact live here once; Staunch Capital and any future arm
 * link here instead of repeating them. It absorbed /team, /ecosystem, /media
 * and /contact (redirected in next.config.ts), so each keeps an anchor.
 */

const coreValues = [
  {
    icon: Sprout,
    title: "Enable",
    description: "We provide startups with the tools, networks, and resources they need to launch, grow, and scale.",
  },
  {
    icon: BookOpen,
    title: "Educate",
    description: "Through mentorship and real-world expertise, we turn lessons into action and knowledge into results.",
  },
  {
    icon: Mountain,
    title: "Encourage",
    description: "We encourage resilience, creativity, and ambition. Pushing founders to take bold steps and embrace challenges.",
  },
];

const marketRoles: Record<(typeof markets)[number], string> = {
  Africa: "Where our founders build, and where Staunch Capital invests.",
  "United States": "Capital, customers and co-investors for companies ready to cross over.",
  Europe: "Partners, investors and expansion routes for African technology.",
  Asia: "New sources of capital and markets for the founders we back.",
};

const sections = [
  { id: "mission", label: "Mission" },
  { id: "team", label: "Team" },
  { id: "ecosystem", label: "Ecosystem" },
  { id: "media", label: "Media" },
  { id: "contact", label: "Contact" },
];

function SectionHead({ eyebrow, title, aside }: { eyebrow: string; title: string; aside?: string }) {
  return (
    <ScrollReveal className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">{eyebrow}</p>
        <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-heading text-balance">{title}</h2>
      </div>
      {aside && <p className="text-sm text-muted-foreground max-w-xs sm:text-right">{aside}</p>}
    </ScrollReveal>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-9xl py-24 md:py-32 px-4 lg:px-8 space-y-24 md:space-y-32">
      <div>
        <ScrollReveal className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">About Staunch</p>
          <h1 className="text-balance text-5xl md:text-7xl font-serif font-normal tracking-heading leading-[1.0]">
            <span className="text-foreground">Africa&apos;s</span>{" "}
            <span className="text-primary">network of networks</span>
          </h1>
          <p className="text-pretty text-xl text-muted-foreground max-w-3xl mx-auto mt-7">
            A cross-border venture platform connecting Africa with the United States, Europe and
            Asia, giving high-growth founders and investors capital, execution and global market
            access.
          </p>
        </ScrollReveal>
        {/* One long page, so it gets its own table of contents. */}
        <ScrollReveal delay={0.05}>
          <nav aria-label="On this page" className="mt-10 flex flex-wrap justify-center gap-2">
            {sections.map((s) => (
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
      </div>

      {/* Mission & philosophy */}
      <section id="mission" className="scroll-mt-24 space-y-4">
        <ScrollReveal>
          <SpotlightCard>
            <Card className="p-8 md:p-12">
              {/* Copy takes the slack — the clip is vertical, so its column sizes to the footage */}
              <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
                <div className="space-y-6">
                  <Quote className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Our Mission</p>
                  <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-heading text-balance">
                    Connect Africa&apos;s boldest founders with the capital, execution and markets
                    to build globally.
                  </h2>
                  <p className="text-muted-foreground text-lg text-pretty">
                    We believe in trust, transparency, and a shared passion for solving Africa&apos;s
                    most pressing challenges. We don&apos;t just invest capital. We invest time,
                    expertise, and a network that spans four markets, so the companies we back can
                    win at home and abroad.
                  </p>
                </div>
                <div className="flex justify-center">
                  <FieldVideo
                    src="/staunch-ventures.mp4"
                    poster="/staunch-ventures-poster.jpg"
                    title="Staunch on founder-first collaboration"
                    width={608}
                    height={1080}
                    className="h-[420px] md:h-[520px]"
                  />
                </div>
              </div>
            </Card>
          </SpotlightCard>
        </ScrollReveal>

        {/* Four markets */}
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {markets.map((m) => (
            <StaggerItem key={m} className="flex">
              <Card className="w-full p-5 md:p-8">
                <p className="text-[10px] sm:text-xs uppercase tracking-wider text-primary mb-2 sm:mb-3">
                  {m === "Africa" ? "Home market" : "Connected market"}
                </p>
                <h3 className="text-xl sm:text-2xl font-serif font-normal tracking-heading mb-2">{m}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{marketRoles[m]}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Values */}
      <section>
        <SectionHead eyebrow="Our Values" title="Tools, knowledge, and confidence." />
        <div className="grid lg:grid-cols-[auto_1fr] gap-4 items-stretch">
          <ScrollReveal className="flex justify-center lg:justify-start">
            <FieldImage
              src="/bag-trust-summit.jpg"
              alt="The Staunch team at the Bag Trust Summit"
              width={1067}
              height={1600}
              className="h-80 w-auto lg:h-full lg:max-h-[560px]"
              sizes="(max-width: 1024px) 100vw, 380px"
            />
          </ScrollReveal>
          <Stagger className="flex flex-col gap-4">
            {coreValues.map((value) => (
              <StaggerItem key={value.title} className="flex">
                <SpotlightCard className="w-full flex">
                  <Card className="p-8 w-full">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-6">
                      <value.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-pretty">{value.description}</p>
                  </Card>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="scroll-mt-24 space-y-16">
        <div>
          <SectionHead
            eyebrow="Team"
            title="The people behind Staunch"
            aside="One team across every arm of the platform."
          />
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {team.map((member) => (
              <StaggerItem key={member.name} className="flex">
                <SpotlightCard className="w-full flex group">
                  <Card variant="interactive" className="p-0 overflow-hidden flex flex-col w-full">
                    <div className="relative">
                      <div className="relative aspect-[4/5] w-full bg-muted overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-card via-card/60 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                        <h3 className="text-base sm:text-2xl font-semibold leading-tight tracking-tight text-foreground">{member.name}</h3>
                        <p className="text-xs sm:text-sm font-medium text-primary mt-1">{member.role}</p>
                      </div>
                    </div>
                    {/* Quotes from sm up: on a phone they turn four cards into four screens. */}
                    <div className="hidden sm:block p-6 border-t border-border">
                      <p className="text-sm text-muted-foreground italic leading-relaxed text-pretty">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    </div>
                  </Card>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {fieldPhotos.length > 0 && (
          <div>
            <ScrollReveal className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <h3 className="text-2xl md:text-3xl font-serif font-normal tracking-heading">In the field</h3>
              <p className="text-sm text-muted-foreground max-w-xs sm:text-right">
                On the ground at events, inside ventures, alongside founders.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Marquee speed={70} className="py-2">
                {fieldPhotos.map((photo) => (
                  <FieldImage key={photo.src ?? photo.alt} {...photo} className="mx-3 h-64 shrink-0 md:h-80" />
                ))}
              </Marquee>
            </ScrollReveal>
          </div>
        )}
      </section>

      {/* Ecosystem: initiatives + partners */}
      <section id="ecosystem" className="scroll-mt-24 space-y-16">
        <div>
          <SectionHead eyebrow="Ecosystem" title="Initiatives" aside="Programs we run and partnerships we lead." />
          <Stagger className="grid md:grid-cols-2 gap-4">
            {initiatives.map((initiative) => {
              const href = initiative.slug ? `/ecosystem/${initiative.slug}` : initiative.href ?? "#";
              return (
                <StaggerItem key={initiative.title} className="flex">
                  <Link href={href} className="flex group w-full">
                    <SpotlightCard className="w-full flex">
                      <Card variant="interactive" className="w-full flex flex-col overflow-hidden p-0">
                        {initiative.photo && (
                          <FieldImage
                            {...initiative.photo}
                            className="aspect-[3/2] w-full rounded-none border-0 border-b border-border"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        )}
                        <div className="flex flex-grow flex-col p-8 md:p-10">
                          <div className="flex items-start justify-between gap-4 mb-6">
                            {initiative.tag && (
                              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                {initiative.tag}
                              </Badge>
                            )}
                            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-serif font-normal tracking-heading text-foreground mb-3">
                            {initiative.title}
                          </h3>
                          <p className="text-muted-foreground text-pretty flex-grow">{initiative.description}</p>
                          {initiative.meta && (
                            <div className="mt-6 flex flex-wrap gap-2">
                              {initiative.meta.map((m) => (
                                <span
                                  key={m}
                                  className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground"
                                >
                                  {m}
                                </span>
                              ))}
                            </div>
                          )}
                          {initiative.ctaLabel && (
                            <div className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                              {initiative.ctaLabel}
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </div>
                          )}
                        </div>
                      </Card>
                    </SpotlightCard>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <div id="partners" className="scroll-mt-24">
          <SectionHead eyebrow="Ecosystem" title="Growth Partners" aside={`${growthPartners.length} partners`} />
          <Stagger className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {growthPartners.map((partner) => (
              <StaggerItem key={partner.name} className="flex">
                <Link href={partner.website} target="_blank" rel="noopener noreferrer" className="flex group w-full">
                  <SpotlightCard className="w-full flex">
                    <Card variant="interactive" className="w-full flex flex-col p-4 sm:p-6">
                      <CardHeader className="p-0">
                        <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
                          <div className="relative h-10 sm:h-14 w-full max-w-[180px]">
                            <Image
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              fill
                              sizes="180px"
                              className="object-contain object-left opacity-80 group-hover:opacity-100 transition-opacity"
                              data-ai-hint={partner.logoHint}
                            />
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <CardTitle className="text-sm sm:text-xl leading-snug">{partner.name}</CardTitle>
                        <div className="pt-2">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            {partner.tag}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="hidden sm:block p-0 mt-4 flex-grow">
                        <p className="text-muted-foreground text-sm text-pretty">{partner.description}</p>
                      </CardContent>
                    </Card>
                  </SpotlightCard>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Media */}
      {videos.length > 0 && (
        <section id="media" className="scroll-mt-24">
          <SectionHead
            eyebrow="Media"
            title="Stories from the ecosystem"
            aside="Interviews, founder stories, and moments from the events and ventures we build."
          />
          <Stagger
            className={cn(
              "grid gap-6",
              // Columns track the video count so they always fill the row evenly.
              { 1: "max-w-2xl mx-auto", 2: "sm:grid-cols-2" }[videos.length] ?? "sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {videos.map((video, i) => (
              <StaggerItem key={`${video.youtubeId}-${i}`} className="flex">
                <VideoCard video={video} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="scroll-mt-24">
        <SectionHead eyebrow="Contact" title="Pick your door" />
        <div className="grid lg:grid-cols-[auto_1fr] gap-4">
          <ScrollReveal className="flex justify-center lg:justify-start">
            <FieldImage
              src="/ollie-laughing.jpg"
              alt="Oliver Christodoulou, founder of Staunch"
              sizes="(max-width: 1024px) 240px, 280px"
              className="aspect-[2/3] h-72 w-auto lg:h-full lg:min-h-[240px]"
            />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/invest" className="flex group">
              <SpotlightCard className="w-full flex">
                <Card variant="interactive" className="w-full flex flex-col p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-5">
                    <Coins className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight mb-2">Investors</h3>
                  <p className="text-muted-foreground text-sm text-pretty flex-grow">
                    Invest in the fund, or co-invest deal by deal through our network.
                  </p>
                  <div className="mt-6 font-medium text-foreground flex items-center text-sm transition-colors group-hover:text-primary">
                    Ways to invest
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Card>
              </SpotlightCard>
            </Link>
            <Link href={PITCH_URL} className="flex group">
              <SpotlightCard className="w-full flex">
                <Card variant="interactive" className="w-full flex flex-col p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-5">
                    <Rocket className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight mb-2">Founders</h3>
                  <p className="text-muted-foreground text-sm text-pretty flex-grow">
                    Raising for an early-stage startup? Submit your deck through our application form.
                  </p>
                  <div className="mt-6 font-medium text-foreground flex items-center text-sm transition-colors group-hover:text-primary">
                    Pitch your startup
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Card>
              </SpotlightCard>
            </Link>
            <Card className="sm:col-span-2 p-6 md:p-8">
              <div className="grid gap-6 sm:grid-cols-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Office</p>
                    <p className="mt-1 font-medium text-foreground">Hilton, South Africa</p>
                  </div>
                </div>
                <a href={`mailto:${INVEST_EMAIL}`} className="flex items-start gap-3 group">
                  <Mail className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                    <p className="mt-1 font-medium text-foreground group-hover:text-primary transition-colors">{INVEST_EMAIL}</p>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/company/staunchventures"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <Linkedin className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</p>
                    <p className="mt-1 font-medium text-foreground group-hover:text-primary transition-colors">/staunchventures</p>
                  </div>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
