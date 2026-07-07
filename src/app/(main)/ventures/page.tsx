import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FieldImage } from "@/components/marketing/field-image";
import { ventures, startupsCofounded } from "@/lib/site-data";

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
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Ventures</p>
        <h1 className="text-balance text-5xl md:text-7xl font-serif font-normal tracking-heading leading-[1.0]">
          <span className="text-foreground">Companies we</span>{" "}
          <span className="text-primary">build</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground max-w-2xl mx-auto mt-7">
          As an institutional cofounder, we don&apos;t just write cheques. We build alongside founders, investing time, expertise, and capital from day one.
        </p>
      </ScrollReveal>

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
                  width={1536}
                  height={2048}
                  className="h-80 md:h-[480px]"
                />
              </div>
            </div>
          </Card>
        </SpotlightCard>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal className="text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-heading mb-4">
          Back Africa&apos;s boldest founders
        </h2>
        <p className="text-muted-foreground text-lg text-pretty max-w-xl mx-auto mb-8">
          We partner early and build hands-on. Join us in backing the startups shaping Africa&apos;s next chapter.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="brand" size="pill-lg">
            <Link href="/contact">
              Invest
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="pill-lg">
            <Link href="/contact">Pitch Your Startup</Link>
          </Button>
        </div>
      </ScrollReveal>
    </div>
  );
}
