import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { growthPartners } from "@/lib/site-data";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export default function EcosystemPage() {
  return (
    <div className="container max-w-6xl mx-auto py-28 md:py-36 px-4 space-y-20">
      <ScrollReveal className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Ecosystem</p>
        <h1 className="text-balance text-5xl md:text-7xl font-bold tracking-display leading-[0.98]">
          <span className="text-gradient-brand">Our</span>{" "}
          <span className="text-gradient-ember">Ecosystem</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground max-w-2xl mx-auto mt-7">
          We collaborate with a network of strategic partners to build a thriving ecosystem for our founders.
        </p>
      </ScrollReveal>

      <section>
        <ScrollReveal className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-display">Growth Partners</h2>
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
