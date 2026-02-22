import { ventures } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ourImpact = [
  "Improving University students results by 5%",
  "Reducing stress and increasing confidence by up to 10%",
  "Reducing cognitive offloading and promoting productive struggle",
];

const focusAreas = [
  "Time Management",
  "Less stress, more confidence",
  "Better results",
  "Pedagogical alignment",
];

export default function BagLearningPage() {
  const venture = ventures.find(v => v.slug === 'bag-learning');

  if (!venture) {
    return (
      <div className="container max-w-5xl mx-auto py-12 md:py-20 px-4 text-center">
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
        <Button asChild variant="ghost" className="pl-0 text-muted-foreground hover:text-primary">
          <Link href="/impact">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Impact
          </Link>
        </Button>
      </div>

      <Card className="p-8 md:p-12">
        <section className="text-center mb-12">
            <div className="relative h-20 w-auto mx-auto mb-4 bg-foreground/20 rounded-lg p-2 inline-block">
            <Image
                src={venture.logo}
                alt={`${venture.companyName} logo`}
                width={160}
                height={80}
                className="object-contain"
                data-ai-hint={venture.logoHint}
            />
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {venture.description}
            </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            {/* Top-Left: Text content */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Our Impact</h3>
              <ul className="space-y-3">
                {ourImpact.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-3 mt-1.5 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0"></span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-xl font-bold mt-8 mb-4 text-foreground">Focus Areas</h3>
              <div className="flex flex-wrap gap-3">
                {focusAreas.map(area => (
                  <Badge key={area} variant="secondary">{area}</Badge>
                ))}
              </div>
            </div>

            {/* Bottom-Left: Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
              <Image
                src="/bag-learning-notes.png"
                alt="Personalised Smart Notes feature"
                width={400}
                height={300}
                className="rounded-lg object-contain w-full h-auto shadow-md border border-border"
                data-ai-hint="app screenshot notes"
              />
              <Image
                src="/bag-learning-assessment.png"
                alt="Assessment & Practice Toolkit feature"
                width={400}
                height={300}
                className="rounded-lg object-contain w-full h-auto shadow-md border border-border"
                data-ai-hint="app screenshot assessment"
              />
            </div>
          </div>

          {/* Right Column: Video */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-center text-foreground">See Bag Learning in Action</h3>
            <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
            <div className="relative w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg border-4 border-border">
              <video
                src="/nation-wide.mp4"
                className="w-full h-full object-cover"
                controls
                playsInline
                poster="https://picsum.photos/seed/bag-learning-video/400/711"
                data-ai-hint="person talking"
              />
            </div>
          </div>
        </div>
      </Card>

      {venture.website && (
        <section className="text-center mt-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity">
                <Link href={venture.website} target="_blank" rel="noopener noreferrer">
                    Visit Website <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </section>
      )}
    </div>
  );
}
