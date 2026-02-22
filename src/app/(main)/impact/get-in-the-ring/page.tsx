import { initiatives } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const keyOutcomes = [
  {
    value: "500+",
    label: "startups engaged across 12 countries",
  },
  {
    value: "$50M+",
    label: "in funding facilitated for participants",
  },
  {
    value: "200+",
    label: "cross-border partnerships formed",
  },
  {
    value: "95%",
    label: "participant satisfaction rate",
  },
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
  const initiative = initiatives.find(i => i.slug === 'get-in-the-ring');

  if (!initiative) {
    return (
      <div className="container max-w-5xl mx-auto py-12 md:py-20 px-4 text-center">
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
    <div className="container max-w-5xl mx-auto py-12 md:py-20 px-4">
      <div className="mb-8">
        <Button asChild variant="ghost" className="pl-0 text-muted-foreground hover:text-primary">
          <Link href="/impact">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Impact
          </Link>
        </Button>
      </div>
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {initiative.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {initiative.description}
        </p>
      </section>

      <section className="bg-card rounded-xl overflow-hidden shadow-2xl border border-border p-2">
        <div className="aspect-video">
          <iframe 
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/NzS-yGdlIh8" 
            title="Get in the Ring Global Conference 2017" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>
          </iframe>
        </div>
      </section>

      <section className="mt-16">
        <div className="p-8 rounded-xl border border-border bg-card/50 shadow-lg">
          <h2 className="text-center text-3xl font-bold mb-10">Key Outcomes</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-12">
            {keyOutcomes.map((outcome) => (
              <div key={outcome.label} className="flex flex-col gap-2">
                <p className="text-4xl lg:text-5xl font-bold text-foreground">{outcome.value}</p>
                <p className="text-muted-foreground text-sm">{outcome.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
              <Link href="/contact">Apply to Pitch</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Become a Partner</Link>
            </Button>
          </div>
          
          <div className="text-center">
            <h3 className="flex items-center justify-center text-xl font-bold mb-6">
              <MapPin className="mr-2 h-5 w-5 text-accent" />
              Countries Covered
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {countries.map((country) => (
                <Badge key={country} variant="secondary" className="px-3 py-1 text-sm">{country}</Badge>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
