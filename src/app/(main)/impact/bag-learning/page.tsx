import { ventures } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const ourImpact = [
  "Improving university students' results by 5%",
  "Reducing stress and increasing confidence by up to 10%",
  "Reducing cognitive offloading and promoting productive struggle",
];

const focusAreas = [
  "Time management",
  "Less stress, more confidence",
  "Better results",
  "Pedagogical alignment",
];

export default function BagLearningPage() {
  const venture = ventures.find((v) => v.slug === "bag-learning");

  if (!venture) {
    return (
      <div className="container max-w-5xl mx-auto py-24 px-4 text-center">
        <h1 className="text-4xl font-bold">Venture not found</h1>
        <p className="text-muted-foreground mt-4">This venture could not be found.</p>
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

      <ScrollReveal>
      <SpotlightCard>
      <Card className="p-8 md:p-12">
        <section className="mb-12 max-w-3xl">
          <div className="relative h-16 w-auto max-w-[200px] mb-6">
            <Image
              src={venture.logo}
              alt={`${venture.companyName} logo`}
              width={200}
              height={64}
              className="object-contain object-left h-full w-auto"
              data-ai-hint={venture.logoHint}
            />
          </div>
          <p className="text-xs uppercase tracking-wider text-primary mb-3">{venture.sector}</p>
          <h1 className="text-balance text-4xl md:text-6xl font-bold tracking-display mb-6 leading-[0.98]">
            <span className="text-gradient-brand">{venture.companyName}</span>
          </h1>
          <p className="text-pretty text-lg text-muted-foreground">
            {venture.description}
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Our Impact</p>
              <ul className="space-y-3">
                {ourImpact.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-8 mb-4">Focus Areas</p>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <Badge key={area} variant="secondary">{area}</Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border bg-muted">
                <Image
                  src="/bag-learning-notes.png"
                  alt="Personalised Smart Notes feature"
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-contain"
                  data-ai-hint="app screenshot notes"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border bg-muted">
                <Image
                  src="/bag-learning-assessment.png"
                  alt="Assessment & Practice Toolkit feature"
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-contain"
                  data-ai-hint="app screenshot assessment"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">In action</p>
            <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-border bg-muted">
              <video
                src="/nation-wide.mp4"
                className="w-full h-full object-cover"
                controls
                playsInline
                data-ai-hint="person talking"
              />
            </div>
          </div>
        </div>
      </Card>
      </SpotlightCard>
      </ScrollReveal>

      {venture.website && (
        <section className="mt-8 flex justify-center">
          <Button asChild variant="brand" size="pill-lg">
            <Link href={venture.website} target="_blank" rel="noopener noreferrer">
              Visit website
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </section>
      )}
    </div>
  );
}
