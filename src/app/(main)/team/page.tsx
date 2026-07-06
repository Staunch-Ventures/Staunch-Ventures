import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FieldImage } from "@/components/marketing/field-image";
import { Marquee } from "@/components/ui/marquee";
import { fieldPhotos } from "@/lib/site-data";

const teamMembers = [
  {
    name: "Oliver Christodoulou",
    role: "Founder & Managing Partner",
    image: "/Oliver headshot.png",
    fallback: "OC",
    quote:
      "African startups are uniquely positioned to solve local challenges with global applications. My vision is to create an ecosystem where innovation thrives and impact scales.",
  },
  {
    name: "Adam Lamprecht",
    role: "Venture Associate",
    image: "/Adam headshot.png",
    fallback: "AL",
    quote:
      "You cannot simply throw money at founders and expect thriving businesses. I want to provide African startups with the resource they actually need: hands-on operational support, working inside companies to help founders achieve their vision.",
  },
  {
    name: "William Raw",
    role: "Venture Associate",
    image: "/Will headshot.png",
    fallback: "WR",
    quote:
      "Innovation in Africa is a marathon, not a sprint. The finish line is a transformed continent with infinite potential and infinite scalability. To pioneer this change with leading innovators is what it's about for me.",
  },
  {
    name: "Timo van de Koevering",
    role: "Executive Partner",
    image: "/Timo.jpeg",
    fallback: "TK",
    quote:
      "While good ideas and talent is everywhere, the capacity for execution is what drives change. I am committed to build systemic innovation designed to tackle the world's most critical problems.",
  },
];

export default function TeamPage() {
  return (
    <div className="container max-w-6xl mx-auto py-24 md:py-32 px-4 space-y-20">
      <ScrollReveal className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Team</p>
        <h1 className="text-balance text-5xl md:text-7xl font-serif font-normal tracking-heading leading-[1.0]">
          <span className="text-foreground">Meet the</span>{" "}
          <span className="text-primary">team</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground max-w-2xl mx-auto mt-7">
          The driving force behind Staunch Ventures, dedicated to your success.
        </p>
      </ScrollReveal>

      <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMembers.map((member) => (
          <StaggerItem key={member.name} className="flex">
            <SpotlightCard className="w-full flex group">
              <Card variant="interactive" className="p-0 overflow-hidden flex flex-col w-full">
                {/* Wrapper: image + overlay siblings so gradient paints above any scale bleed */}
                <div className="relative">
                  <div className="relative aspect-[4/5] w-full bg-muted overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-card via-card/60 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">{member.name}</h3>
                    <p className="text-sm font-medium text-primary mt-1">{member.role}</p>
                  </div>
                </div>
                {member.quote && (
                  <div className="p-6 border-t border-border">
                    <p className="text-sm text-muted-foreground italic leading-relaxed text-pretty">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  </div>
                )}
              </Card>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>

      {/* In the field — candid filmstrip proving the hands-on claim */}
      {fieldPhotos.length > 0 && (
        <section>
          <ScrollReveal className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">In the field</p>
              <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-heading text-balance">
                Where the work happens
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs sm:text-right">
              On the ground at events, inside ventures, alongside founders.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Marquee speed={70} className="py-2">
              {fieldPhotos.map((photo) => (
                <FieldImage
                  key={photo.src ?? photo.alt}
                  {...photo}
                  className="mx-3 h-64 shrink-0 md:h-80"
                />
              ))}
            </Marquee>
          </ScrollReveal>
        </section>
      )}
    </div>
  );
}
