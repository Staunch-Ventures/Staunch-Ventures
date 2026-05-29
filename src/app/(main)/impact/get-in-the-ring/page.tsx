import { initiatives } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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
    <div className="container max-w-6xl mx-auto py-12 md:py-20 px-4">
      <div className="mb-8">
        <Button asChild variant="ghost" size="sm" className="pl-2 text-muted-foreground hover:text-foreground">
          <Link href="/impact">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Impact
          </Link>
        </Button>
      </div>

      <section className="max-w-3xl mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Initiative</p>
        <h1 className="text-balance text-4xl md:text-5xl font-bold tracking-display mb-6">
          {initiative.title}
        </h1>
        <p className="text-pretty text-lg text-muted-foreground">
          {initiative.description}
        </p>
      </section>

      <Card className="overflow-hidden p-2">
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/NzS-yGdlIh8"
            title="Get in the Ring Global Conference 2017"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </Card>

      <section className="mt-12">
        <Card className="p-8 md:p-12">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Outcomes</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">
            What this program has delivered
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {keyOutcomes.map((outcome) => (
              <div key={outcome.label}>
                <p className="text-4xl lg:text-5xl font-semibold tabular-nums tracking-display text-foreground">
                  {outcome.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">{outcome.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Button asChild variant="brand" size="pill-lg">
              <Link href="/contact">Apply to pitch</Link>
            </Button>
            <Button asChild variant="outline" size="pill-lg">
              <Link href="/contact">Become a partner</Link>
            </Button>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-primary" strokeWidth={1.75} />
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Countries covered</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <Badge key={country} variant="secondary" className="px-3 py-1 text-xs">
                  {country}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
