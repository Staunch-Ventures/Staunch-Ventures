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
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">About</p>
        <h1 className="text-balance text-5xl md:text-6xl font-bold tracking-display">
          Creating Africa&apos;s{" "}
          <span className="italic font-light text-primary">Network of Networks</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
          We are more than just a venture capital firm — a venture studio of venture builders, dedicated to forging a prosperous, innovative, and interconnected Africa.
        </p>
      </section>

      <section>
        <Card className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Our Philosophy</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-display">
                Founder-first collaboration
              </h2>
              <p className="text-muted-foreground text-lg text-pretty">
                We believe in trust, transparency, and a shared passion for solving Africa&apos;s most pressing challenges. We don&apos;t just invest capital — we invest time, expertise, and our global network to ensure our portfolio companies succeed.
              </p>
              <ul className="space-y-3 text-base">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="font-semibold text-foreground">Core focus:</strong> EdTech, HealthTech / MedTech
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="font-semibold text-foreground">Exploring:</strong> Clean Energy, AgriTech
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden bg-muted border border-border">
              {/* Bespoke gradient placeholder — replace with real photography pre-launch */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 30% 20%, hsl(16 85% 56% / 0.35), transparent), radial-gradient(ellipse 60% 60% at 80% 80%, hsl(220 90% 60% / 0.2), transparent), hsl(220 18% 8%)",
                }}
              />
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Built for Africa</p>
                <p className="mt-1 text-lg font-semibold text-foreground">Operators who&apos;ve scaled before.</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Our Values</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-display">
            Tools, knowledge, and confidence.
          </h2>
          <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Three principles that guide how we partner with every founder.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {coreValues.map((value) => (
            <Card key={value.title} className="p-8">
              <value.icon className="h-6 w-6 text-primary mb-6" strokeWidth={1.75} />
              <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-pretty">{value.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-4">
        <Card className="p-8 md:p-12 flex flex-col justify-center">
          <Quote className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Our Mission
          </h2>
          <p className="text-muted-foreground text-pretty">
            To accelerate African innovation by connecting startups with the right resources, expertise, and networks needed to drive sustainable growth across the continent.
          </p>
        </Card>
        <Card className="p-8 md:p-12 flex flex-col justify-center">
          <Briefcase className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Cofounding as a Service
          </h2>
          <p className="text-muted-foreground text-pretty">
            Staunch acts as an institutional cofounder — an execution partner helping founders build and scale faster. Tech-stack architecture, MVP planning, go-to-market, business development, core strategy frameworks, and more.
          </p>
        </Card>
      </section>
    </div>
  );
}
