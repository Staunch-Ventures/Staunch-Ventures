import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { growthPartners, initiatives } from "@/lib/site-data";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FieldImage } from "@/components/marketing/field-image";

export default function EcosystemPage() {
  return (
    <div className="container max-w-6xl mx-auto py-24 md:py-32 px-4 space-y-20 md:space-y-24">
      <ScrollReveal className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Ecosystem</p>
        <h1 className="text-balance text-5xl md:text-7xl font-serif font-normal tracking-heading leading-[1.0]">
          <span className="text-foreground">Our</span>{" "}
          <span className="text-primary">ecosystem</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground max-w-2xl mx-auto mt-7">
          Beyond capital — the programs we run and the partners we build with, giving founders a network that spans the continent.
        </p>
      </ScrollReveal>

      <section id="initiatives" className="scroll-mt-24">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-heading">Initiatives</h2>
          <p className="hidden sm:block text-sm text-muted-foreground">
            Programs we run and partnerships we lead.
          </p>
        </ScrollReveal>
        <Stagger className="grid md:grid-cols-2 gap-4">
          {initiatives.map((initiative) => {
            const href = initiative.slug
              ? `/ecosystem/${initiative.slug}`
              : initiative.href ?? "#";
            return (
              <StaggerItem key={initiative.title} className="flex">
                <Link href={href} className="flex group w-full">
                  <SpotlightCard className="w-full flex">
                    <Card variant="interactive" className="w-full flex flex-col overflow-hidden p-0">
                      {initiative.photo && (
                        <FieldImage
                          {...initiative.photo}
                          className="aspect-[16/8] w-full rounded-none border-0 border-b border-border"
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
      </section>

      <section id="partners" className="scroll-mt-24">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-heading">Growth Partners</h2>
          <p className="hidden sm:block text-sm text-muted-foreground tabular-nums">
            {growthPartners.length} partners
          </p>
        </ScrollReveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {growthPartners.map((partner) => (
            <StaggerItem key={partner.name} className="flex">
              <Link
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex group w-full"
              >
                <SpotlightCard className="w-full flex">
                  <Card variant="interactive" className="w-full flex flex-col p-6">
                    <CardHeader className="p-0">
                      <div className="flex items-start justify-between gap-3 mb-5">
                        <div className="relative h-14 w-full max-w-[180px]">
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
                      <CardTitle className="text-xl">{partner.name}</CardTitle>
                      <div className="pt-2">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {partner.tag}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 mt-4 flex-grow">
                      <p className="text-muted-foreground text-sm text-pretty">{partner.description}</p>
                    </CardContent>
                  </Card>
                </SpotlightCard>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
