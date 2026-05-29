import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { initiatives, ventures } from "@/lib/site-data";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ImpactPage() {
  return (
    <div className="container max-w-6xl mx-auto py-24 md:py-32 px-4 space-y-24">
      <section className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Impact</p>
        <h1 className="text-balance text-5xl md:text-6xl font-bold tracking-display">
          Our Impact
        </h1>
        <p className="text-pretty text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
          We go beyond funding — building a robust ecosystem of resources, mentorship, and network for the founders we back.
        </p>
      </section>

      <section id="initiatives">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-display">Initiatives</h2>
          <p className="hidden sm:block text-sm text-muted-foreground">
            Programs we run and partnerships we lead.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {initiatives.map((initiative) => {
            const isLinked = !!initiative.slug;
            const Wrapper: React.ElementType = isLinked ? Link : "div";
            const wrapperProps = isLinked ? { href: `/impact/${initiative.slug}` } : {};
            return (
              <Wrapper key={initiative.title} {...wrapperProps} className="flex group">
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
                    <CardTitle className="text-xl">{initiative.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow p-0 mt-3">
                    <p className="text-muted-foreground text-sm text-pretty">{initiative.description}</p>
                  </CardContent>
                  {isLinked && (
                    <CardFooter className="p-0 mt-6">
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                        Learn more
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </CardFooter>
                  )}
                </Card>
              </Wrapper>
            );
          })}
        </div>
      </section>

      <section id="ventures">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-display">Ventures</h2>
          <p className="hidden sm:block text-sm text-muted-foreground">
            The companies we&apos;ve backed.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ventures.map((venture) => {
            const slug = venture.slug;
            const Wrapper: React.ElementType = slug ? Link : "div";
            const wrapperProps = slug ? { href: `/impact/${slug}` } : {};
            return (
              <Wrapper key={venture.companyName} {...wrapperProps} className="flex group">
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
                    <div className="flex items-baseline justify-between gap-2">
                      <CardTitle className="text-xl">{venture.companyName}</CardTitle>
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">
                        {venture.sector}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-0 mt-3">
                    <p className="text-muted-foreground text-sm text-pretty">{venture.description}</p>
                  </CardContent>
                  {slug && (
                    <CardFooter className="p-0 mt-6">
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                        View venture
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </CardFooter>
                  )}
                </Card>
              </Wrapper>
            );
          })}
        </div>
      </section>
    </div>
  );
}
