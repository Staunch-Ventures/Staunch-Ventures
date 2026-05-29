import { initiatives } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const keyOutcomes = [
  { value: "500+", label: "startups engaged across 12 countries" },
  { value: "$50M+", label: "in funding facilitated for participants" },
  { value: "200+", label: "cross-border partnerships formed" },
  { value: "95%", label: "participant satisfaction rate" },
];

const countries = [
  "South Africa",
  "Kenya",
  "Nigeria",
  "Ghana",
  "Tanzania",
  "Uganda",
  "Rwanda",
  "Botswana",
  "Zambia",
  "Zimbabwe",
  "Namibia",
  "Malawi",
];

export default function GetInTheRingPage() {
  const initiative = initiatives.find((i) => i.slug === "get-in-the-ring");

  if (!initiative) {
    return (
      <div className="container max-w-5xl mx-auto py-24 px-4 text-center">
        <h1 className="text-4xl font-bold">Initiative not found</h1>
        <p className="text-muted-foreground mt-4">This initiative could not be found.</p>
        <Button asChild variant="outline" className="mt-8">
          <Link href="/impact">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Impact
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 md:py-20 px-4 space-y-12">
      <div>
        <Button asChild variant="ghost" size="sm" className="pl-2 text-muted-foreground hover:text-foreground">
          <Link href="/impact">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Impact
          </Link>
        </Button>
      </div>

      <ScrollReveal className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Initiative</p>
        <h1 className="text-balance text-4xl md:text-6xl font-bold tracking-display mb-6 leading-[0.98]">
          <span className="text-gradient-brand">{initiative.title}</span>
        </h1>
        <p className="text-pretty text-lg text-muted-foreground">
          {initiative.description}
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <SpotlightCard>
          <Card className="overflow-hidden p-2">
            <div className="aspect-video rounded-xl overflow-hidden bg-muted">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/NzS-yGdlIh8"
                title={`${initiative.title} highlight reel`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Card>
        </SpotlightCard>
      </ScrollReveal>

      <section>
        <ScrollReveal className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-display">Key outcomes</h2>
        </ScrollReveal>
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {keyOutcomes.map((o) => (
            <StaggerItem key={o.label} className="flex">
              <SpotlightCard className="w-full flex">
                <Card className="p-6 w-full">
                  <p className="text-4xl font-bold tracking-display tabular-nums text-gradient-ember">
                    {o.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground text-pretty">{o.label}</p>
                </Card>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <ScrollReveal>
        <Card className="p-8 md:p-10">
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="h-4 w-4 text-primary" strokeWidth={1.75} />
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground">Countries reached</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <Badge key={c} variant="secondary" className="bg-muted/60">
                {c}
              </Badge>
            ))}
          </div>
        </Card>
      </ScrollReveal>

      <section className="flex justify-center pt-2">
        <Button asChild variant="brand" size="pill-lg">
          <Link href="/contact">
            Apply to pitch
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
