import { Quote, Sprout, BookOpen, Mountain, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

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
    <div className="container max-w-5xl mx-auto py-28 md:py-36 px-4 space-y-28">
      <ScrollReveal className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">About</p>
        <h1 className="text-balance text-5xl md:text-7xl font-bold tracking-display leading-[0.98]">
          <span className="text-gradient-brand">Creating Africa&apos;s</span>
          <br />
          <span className="text-gradient-ember">Network of Networks</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground max-w-3xl mx-auto mt-7">
          We are more than just a venture capital firm — a venture studio of venture builders, dedicated to forging a prosperous, innovative, and interconnected Africa.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <SpotlightCard>
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
              <div className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden bg-navy border border-border">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 30% 20%, hsl(16 88% 56% / 0.32), transparent), radial-gradient(ellipse 70% 60% at 85% 90%, hsl(38 90% 58% / 0.18), transparent), hsl(var(--navy))",
                  }}
                />
                <div className="absolute inset-0 bg-topo opacity-70" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Built for Africa</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">Operators who&apos;ve scaled before.</p>
                </div>
              </div>
            </div>
          </Card>
        </SpotlightCard>
      </ScrollReveal>

      <section>
        <ScrollReveal className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Our Values</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-display text-balance">
            Tools, knowledge, and confidence.
          </h2>
          <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Three principles that guide how we partner with every founder.
          </p>
        </ScrollReveal>
        <Stagger className="grid md:grid-cols-3 gap-4">
          {coreValues.map((value) => (
            <StaggerItem key={value.title} className="flex">
              <SpotlightCard className="w-full flex">
                <Card className="p-8 w-full">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-6">
                    <value.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-pretty">{value.description}</p>
                </Card>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <Stagger className="grid lg:grid-cols-2 gap-4">
        <StaggerItem className="flex">
          <SpotlightCard className="w-full flex">
            <Card variant="brand" className="p-8 md:p-12 flex flex-col justify-center w-full">
              <Quote className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-pretty">
                To accelerate African innovation by connecting startups with the right resources, expertise, and networks needed to drive sustainable growth across the continent.
              </p>
            </Card>
          </SpotlightCard>
        </StaggerItem>
        <StaggerItem className="flex">
          <SpotlightCard className="w-full flex">
            <Card className="p-8 md:p-12 flex flex-col justify-center w-full">
              <Briefcase className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                Cofounding as a Service
              </h2>
              <p className="text-muted-foreground text-pretty">
                Staunch acts as an institutional cofounder — an execution partner helping founders build and scale faster. Tech-stack architecture, MVP planning, go-to-market, business development, core strategy frameworks, and more.
              </p>
            </Card>
          </SpotlightCard>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
