import { Quote, Sprout, BookOpen, Mountain, Briefcase } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const coreValues = [
  {
    icon: Sprout,
    title: "Enable",
    description: "We provide startups with the tools, networks, and resources they need to launch, grow, and scale.",
  },
  {
    icon: BookOpen,
    title: "Educate",
    description: "Through mentorship and real-world expertise, we turn lessons into action and knowledge into results.",
  },
  {
    icon: Mountain,
    title: "Encourage",
    description: "We encourage resilience, creativity, and ambition. Pushing founders to take bold steps and embrace challenges.",
  },
];

export default function AboutPage() {
  return (
    <div className="container max-w-5xl mx-auto py-24 md:py-32 px-4 space-y-24">
      <section className="text-center">
        <h1 className="text-5xl md:text-5xl font-bold tracking-tighter">
          Creating Africa's<br /><em className="font-light text-primary">Network of Networks</em>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
          We are more than just a Venture Capital firm; we are a Venture Studio of Venture builders, dedicated to forging a prosperous, innovative, and interconnected Africa
        </p>
      </section>

      <section>
        <Card className="p-8 md:p-12 transition-all duration-300 hover:border-primary/50 hover:bg-glass-gradient-primary">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-4xl font-bold tracking-tighter">Our Philosophy</h2>
                    <p className="text-muted-foreground text-lg">
                        We believe in founder-first collaboration. Our approach is built on a foundation of trust, transparency, and a shared passion for solving Africa's most pressing challenges. We don't just invest capital; we invest our time, expertise, and our global network to ensure our portfolio companies succeed.
                    </p>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start">
                          <span className="mr-4 mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                          <span className="text-muted-foreground">
                              <strong className="font-semibold text-foreground">Core focus:</strong> EdTech, HealthTech/MedTech
                          </span>
                      </li>
                      <li className="flex items-start">
                          <span className="mr-4 mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                          <span className="text-muted-foreground">
                              <strong className="font-semibold text-foreground">Exploring:</strong> Clean Energy, AgriTech
                          </span>
                      </li>
                    </ul>
                </div>
                <div className="relative h-96 w-full rounded-lg overflow-hidden">
                    <Image 
                        src="https://picsum.photos/seed/about-us/800/600"
                        alt="Team collaborating"
                        fill
                        className="object-cover"
                        data-ai-hint="team collaboration"
                    />
                </div>
            </div>
        </Card>
      </section>

      <section>
        <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground mb-4">
                The Staunch Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                Tools to grow. Knowledge to act. Confidence to thrive.
            </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value) => (
                <Card key={value.title} className="p-8 text-center transition-all duration-300 hover:border-primary/50 hover:bg-glass-gradient-primary">
                    <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
                        <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                </Card>
            ))}
        </div>
      </section>
      
      <section className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8 md:p-12 transition-all duration-300 hover:border-primary/50 hover:bg-glass-gradient-primary flex flex-col justify-center">
            <div className="text-center max-w-3xl mx-auto">
                <Quote className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground mb-6">
                Our Mission
                </h2>
                <p className="text-lg text-muted-foreground">
                To accelerate African innovation by connecting startups with the right resources, expertise, and networks needed to drive sustainable growth across the continent.
                </p>
            </div>
        </Card>
        <Card className="p-8 md:p-12 transition-all duration-300 hover:border-primary/50 hover:bg-glass-gradient-primary flex flex-col justify-center">
            <div className="text-center max-w-3xl mx-auto">
                <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground mb-6">
                Cofounding as a Service
                </h2>
                <p className="text-lg text-muted-foreground">
                Staunch acts as an institutional cofounder—an execution partner that helps founders build and scale faster. We help develop your tech-stack architecture, MVP planning, go-to-market strategy, business development (funnels + outreach), core strategy frameworks (Business Model Canvas, Customer Empathy Map, Value Proposition Canvas), and much more.
                </p>
            </div>
        </Card>
      </section>
    </div>
  );
}