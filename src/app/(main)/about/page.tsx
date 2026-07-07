import { Quote, Sprout, BookOpen, Mountain, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FieldImage } from "@/components/marketing/field-image";

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
    <div className="mx-auto max-w-9xl py-24 md:py-32 px-4 lg:px-8 space-y-20 md:space-y-24">
      <ScrollReveal className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">About</p>
        <h1 className="text-balance text-5xl md:text-7xl font-serif font-normal tracking-heading leading-[1.0]">
          <span className="text-foreground">Creating Africa&apos;s</span>
          <br />
          <span className="text-primary">Network of Networks</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground max-w-3xl mx-auto mt-7">
          More than a venture firm — a studio of venture builders working to forge a prosperous, innovative and interconnected Africa.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <SpotlightCard>
          <Card className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Our Philosophy</p>
                <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-heading">
                  Founder-first collaboration
                </h2>
                <p className="text-muted-foreground text-lg text-pretty">
                  We believe in trust, transparency, and a shared passion for solving Africa&apos;s most pressing challenges. We don&apos;t just invest capital. We invest time, expertise, and our global network to ensure our portfolio companies succeed.
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
              <FieldImage
                src="/Philosophy.jpg"
                alt="The Staunch team at work"
                eyebrow="Built for Africa"
                caption="Operators who've scaled before."
                className="h-80 md:h-96 w-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Card>
        </SpotlightCard>
      </ScrollReveal>

      <section>
        <ScrollReveal className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Our Values</p>
          <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-heading text-balance">
            Tools, knowledge, and confidence.
          </h2>
          <p className="text-pretty text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Three principles that guide how we partner with every founder.
          </p>
        </ScrollReveal>
        <div className="grid lg:grid-cols-[auto_1fr] gap-4 items-stretch">
          {/* The values, embodied */}
          <ScrollReveal className="flex justify-center lg:justify-start">
            <FieldImage
              src="/bag-trust-summit.jpg"
              alt="The Staunch team at the Bag Trust Summit"
              width={1600}
              height={2400}
              className="h-80 w-auto lg:h-full lg:max-h-[560px]"
              sizes="(max-width: 1024px) 100vw, 380px"
            />
          </ScrollReveal>

          <Stagger className="flex flex-col gap-4">
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
        </div>
      </section>

      <Stagger className="grid lg:grid-cols-2 gap-4">
        <StaggerItem className="flex">
          <SpotlightCard className="w-full flex">
            <Card variant="brand" className="p-8 md:p-12 flex flex-col justify-center w-full">
              <Quote className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
              <h2 className="text-2xl md:text-3xl font-serif font-normal tracking-heading mb-4">
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
              <h2 className="text-2xl md:text-3xl font-serif font-normal tracking-heading mb-4">
                Cofounding as a Service
              </h2>
              <p className="text-muted-foreground text-pretty">
                Staunch acts as an institutional cofounder: an execution partner helping founders build and scale faster. Tech-stack architecture, MVP planning, go-to-market, business development, core strategy frameworks, and more.
              </p>
            </Card>
          </SpotlightCard>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
