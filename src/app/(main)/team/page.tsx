import Image from "next/image";
import { Card } from "@/components/ui/card";

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
      "Innovation in Africa is a marathon, not a sprint — the finish line is a transformed continent with infinite potential and infinite scalability. To pioneer this change with leading innovators is what it's about for me.",
  },
];

export default function TeamPage() {
  return (
    <div className="container max-w-6xl mx-auto py-24 md:py-32 px-4 space-y-20">
      <section className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Team</p>
        <h1 className="text-balance text-5xl md:text-6xl font-bold tracking-display">
          Meet the team
        </h1>
        <p className="text-pretty text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
          The driving force behind Staunch Ventures — dedicated to your success.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="p-0 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/5] w-full bg-muted">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card via-card/40 to-transparent" />
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
          ))}
        </div>
      </section>
    </div>
  );
}
