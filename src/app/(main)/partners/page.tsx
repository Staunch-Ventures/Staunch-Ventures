import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { growthPartners } from "@/lib/site-data";
import Link from "next/link";

export default function EcosystemPage() {
  return (
    <div className="container max-w-6xl mx-auto py-24 md:py-32 px-4 space-y-24">
      <section className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Our Ecosystem
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
          We collaborate with a network of strategic partners to build a thriving ecosystem for our founders, providing them with the resources they need to succeed.
        </p>
      </section>

      <section>
        <h2 className="text-4xl text-center md:text-5xl/tight font-bold tracking-tighter mb-12">
          Growth Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {growthPartners.map((partner) => (
            <Link key={partner.name} href={partner.website} target="_blank" rel="noopener noreferrer" className="flex group">
              <Card className="w-full flex flex-col text-center items-center p-8 transition-all duration-300 group-hover:border-primary/50 group-hover:scale-105 group-hover:bg-glass-gradient-primary">
                <CardHeader className="p-0 items-center">
                    <div className="relative w-24 h-24 mb-6 bg-foreground/20 rounded-md flex items-center justify-center p-2">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      width={80}
                      height={80}
                      className="object-contain"
                      data-ai-hint={partner.logoHint}
                    />
                    </div>
                  <CardTitle className="text-2xl">{partner.name}</CardTitle>
                  <div className="pt-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{partner.tag}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0 mt-4 flex-grow">
                  <p className="text-muted-foreground text-sm">{partner.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
