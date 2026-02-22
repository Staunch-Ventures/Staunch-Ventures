import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { initiatives, ventures } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ImpactPage() {
  return (
    <div className="container max-w-6xl mx-auto py-24 md:py-32 px-4 space-y-24">
      <section className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Our Impact
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
          We go beyond funding. We are dedicated to building a robust ecosystem, providing founders with the resources, mentorship, and network they need to thrive.
        </p>
      </section>

      <section id="initiatives">
        <h2 className="text-4xl text-center md:text-5xl/tight font-bold tracking-tighter mb-12">
          Initiatives
        </h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 justify-center">
            {initiatives.map((initiative) => (
            <Card
                key={initiative.title}
                className="flex flex-col p-6 transition-all duration-300 hover:border-primary/50 group hover:bg-glass-gradient-primary"
            >
                <CardHeader className="p-0">
                    {initiative.logo && (
                        <div className="relative h-20 bg-foreground/20 rounded-md p-2 mb-4">
                            <Image
                                src={initiative.logo}
                                alt={`${initiative.title} logo`}
                                fill
                                className="object-contain"
                                data-ai-hint={initiative.logoHint}
                            />
                        </div>
                    )}
                    <CardTitle className="text-2xl">{initiative.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow p-0 mt-4">
                  <p className="text-muted-foreground">{initiative.description}</p>
                </CardContent>
                <CardFooter className="p-0 mt-auto pt-6">
                  {initiative.slug ? (
                      <Button asChild variant="link" className="p-0 h-auto self-start text-primary font-semibold">
                        <Link href={`/impact/${initiative.slug}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                  ) : (
                      <Button variant="link" className="p-0 h-auto self-start text-primary font-semibold" disabled>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                  )}
                </CardFooter>
            </Card>
            ))}
        </div>
      </section>

      <section id="ventures">
        <h2 className="text-4xl text-center md:text-5xl/tight font-bold tracking-tighter mb-12">
          Ventures
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {ventures.map((venture) => (
                <Card key={venture.companyName} className="flex flex-col p-6 transition-all duration-300 hover:border-primary/50 hover:bg-glass-gradient-primary">
                    <CardHeader className="p-0">
                        <div className="relative h-20 bg-foreground/20 rounded-md p-2 mb-4">
                            <Image
                                src={venture.logo}
                                alt={`${venture.companyName} logo`}
                                fill
                                className="object-contain"
                                data-ai-hint={venture.logoHint}
                            />
                        </div>
                        <CardTitle className="text-2xl">{venture.companyName}</CardTitle>
                        <p className="text-sm font-bold text-primary/80">{venture.sector}</p>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4 p-0 mt-4">
                        <p className="text-muted-foreground">{venture.description}</p>
                    </CardContent>
                    <CardFooter className="p-0 mt-6">
                        <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity shadow-md shadow-primary-glow">
                            {venture.slug ? (
                              <Link href={`/impact/${venture.slug}`}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            ) : (
                              <Link href="#">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
