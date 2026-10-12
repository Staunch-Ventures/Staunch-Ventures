import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SitePreview } from "@/components/marketing/site-preview";
import { portfolio, portfolioBackers, type PortfolioCompany } from "@/lib/site-data";

/*
 * The other investors behind our founders, then the companies we've backed
 * through the network. The backers sit apart, as a quiet ticker above the
 * section, never next to a company. Nothing here says which round, when, or
 * on what terms.
 */
const domain = (url: string) => new URL(url).hostname.replace(/^www\./, "");

function PortfolioCard({ company }: { company: PortfolioCompany }) {
  const host = domain(company.website);
  return (
    <SpotlightCard className="w-full flex">
      <Card variant="interactive" className="w-full flex flex-col overflow-hidden">
        {/* The site, in a frame with its address */}
        <div className="p-2 pb-0">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
            <div className="flex h-9 items-center justify-center border-b border-white/[0.06]">
              <span className="rounded-md bg-white/[0.06] px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground">
                {host}
              </span>
            </div>
            <SitePreview url={company.website} poster={company.preview} title={`${company.name} website`} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-7 md:p-9">
          <div className="flex h-7 items-center">
            <Image
              src={company.logo.src}
              alt={company.name}
              width={company.logo.width}
              height={company.logo.height}
              className="h-auto max-w-full"
            />
          </div>
          <p className="mt-5 max-w-lg text-pretty text-muted-foreground md:text-lg">{company.description}</p>
          {/* Stretched link: the whole card opens the company's site */}
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex w-fit items-center pt-8 text-sm font-medium text-foreground transition-colors after:absolute after:inset-0 after:z-10 after:content-[''] group-hover:text-primary"
          >
            Visit {host}
            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Card>
    </SpotlightCard>
  );
}

function BackersTicker() {
  return (
    <div>
      <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Our founders are backed by
      </p>
      <div className="relative mt-5 py-5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" aria-hidden />
        <Marquee
          speed={90}
          fade={false}
          className="[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
        >
          {portfolioBackers.map((name) => (
            <span key={name} className="flex items-center whitespace-nowrap">
              <span className="px-8 text-sm uppercase tracking-[0.18em] text-muted-foreground">{name}</span>
              <span className="h-1 w-1 rounded-full bg-primary/50" aria-hidden />
            </span>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" aria-hidden />
      </div>
    </div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-24">
      <ScrollReveal>
        <BackersTicker />
      </ScrollReveal>
      <ScrollReveal className="mt-20 md:mt-24 mb-10 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-heading text-balance">
          Our recent investments
        </h2>
      </ScrollReveal>
      <Stagger className="grid gap-4 lg:grid-cols-2">
        {portfolio.map((company) => (
          <StaggerItem key={company.name} className="flex">
            <PortfolioCard company={company} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
