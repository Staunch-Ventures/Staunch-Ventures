import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { initiatives, ventures } from "@/lib/site-data";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export default function ImpactPage() {
  return (
    <div className="container max-w-6xl mx-auto py-28 md:py-36 px-4 space-y-28">
      <ScrollReveal className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Impact</p>
        <h1 className="text-balance text-5xl md:text-7xl font-bold tracking-display leading-[0.98]">
          <span className="text-gradient-brand">Our</span>{" "}
          <span className="text-gradient-ember">Impact</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground max-w-2xl mx-auto mt-7">
          We go beyond funding — building a robust ecosystem that gives founders the resources, mentorship, and network they need to thrive.
        </p>
      </ScrollReveal>

      <section id="initiatives" className="scroll-mt-24">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-display">Initiatives</h2>
          <p className="hidden sm:block text-sm text-muted-foreground">
            Programs we run and partnerships we lead.
          </p>
        </ScrollReveal>
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {initiatives.map((initiative) => {
            const isLinked = !!initiative.slug;
            const Wrapper: React.ElementType = isLinked ? Link : "div";
            const wrapperProps = isLinked ? { href: `/impact/${initiative.slug}` } : {};
            return (
              <StaggerItem key={initiative.title} className="flex">
                <Wrapper {...wrapperProps} className="flex group w-full">
                  <SpotlightCard className="w-full flex">
                    <Card variant={isLinked ? "interactive" : "default"} className="w-full flex flex-col p-6">
                      <CardHeader className="p-0">
                        {initiative.logo && (
                          <div className="relative h-16 w-full mb-5">
                            <Image
                              src={initiative.logo}
                              alt={`${initiative.title} logo`}
                              fill
                              className="object-contain object-left opacity-80 group-hover:opacity-100 transition-opacity"
                              data-ai-hint={initiative.logoHint}
                            />
                          </div>
                        )}
                        <CardTitle className="text-2xl">{initiative.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow p-0 mt-4">
                        <p className="text-muted-foreground text-pretty">{initiative.description}</p>
                      </CardContent>
                      <CardFooter className="p-0 mt-6">
                        {isLinked ? (
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                            Learn more
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Coming soon</span>
                        )}
                      </CardFooter>
                    </Card>
                  </SpotlightCard>
                </Wrapper>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section id="ventures" className="scroll-mt-24">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-display">Ventures</h2>
          <p className="hidden sm:block text-sm text-muted-foreground">
            The companies we&apos;ve backed.
          </p>
        </ScrollReveal>
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ventures.map((venture) => {
            const slug = venture.slug;
            const Wrapper: React.ElementType = slug ? Link : "div";
            const wrapperProps = slug ? { href: `/impact/${slug}` } : {};
            return (
              <StaggerItem key={venture.companyName} className="flex">
                <Wrapper {...wrapperProps} className="flex group w-full">
                  <SpotlightCard className="w-full flex">
                    <Card variant={slug ? "interactive" : "default"} className="w-full flex flex-col p-6">
                      <CardHeader className="p-0">
                        <div className="relative h-14 w-full mb-5">
                          <Image
                            src={venture.logo}
                            alt={`${venture.companyName} logo`}
                            fill
                            className="object-contain object-left opacity-80 group-hover:opacity-100 transition-opacity"
                            data-ai-hint={venture.logoHint}
                          />
                        </div>
                        <CardTitle className="text-2xl">{venture.companyName}</CardTitle>
                        <p className="text-sm font-medium text-primary mt-1">{venture.sector}</p>
                      </CardHeader>
                      <CardContent className="flex-grow p-0 mt-4">
                        <p className="text-muted-foreground text-pretty">{venture.description}</p>
                      </CardContent>
                      <CardFooter className="p-0 mt-6">
                        {slug ? (
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                            View venture
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Details soon</span>
                        )}
                      </CardFooter>
                    </Card>
                  </SpotlightCard>
                </Wrapper>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>
    </div>
  );
}
