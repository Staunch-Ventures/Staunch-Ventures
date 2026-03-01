import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const teamMembers = [
  {
    name: "Oliver Christodoulou",
    role: "Founder & Managing Partner",
    image: "/Oliver headshot.png",
    fallback: "OC",
    quote: "African startups are uniquely positioned to solve local challenges with global applications. My vision is to create an ecosystem where innovation thrives and impact scales.",
    prominent: true,
  },
  {
    name: "Adam Lamprecht",
    role: "Venture Associate",
    image: PlaceHolderImages.find(img => img.id === 'team-adam')?.imageUrl || "",
    fallback: "AL",
  },
  {
    name: "Will Raw",
    role: "Venture Associate",
    image: PlaceHolderImages.find(img => img.id === 'team-will')?.imageUrl || "",
    fallback: "WR",
  },
];

export default function TeamPage() {
  const prominentMember = teamMembers.find(m => m.prominent);
  const otherMembers = teamMembers.filter(m => !m.prominent);

  return (
    <div className="container max-w-5xl mx-auto py-24 md:py-32 px-4 space-y-24">
      <section className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Meet the Team
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
          The driving force behind Staunch Ventures, dedicated to your success.
        </p>
      </section>

      {prominentMember && (
        <section className="flex justify-center">
            <Card className="max-w-2xl w-full p-8 md:p-12 transition-all duration-300 hover:border-primary/50 hover:bg-glass-gradient-primary flex flex-col justify-center">
                <div className="text-center">
                    <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-primary/20 shadow-lg">
                        <AvatarImage src={prominentMember.image} alt={prominentMember.name} data-ai-hint="person face" className="object-cover" />
                        <AvatarFallback>{prominentMember.fallback}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-3xl font-bold tracking-tight text-foreground">{prominentMember.name}</h3>
                    <p className="text-lg font-medium text-primary mt-1">{prominentMember.role}</p>
                    {prominentMember.quote && (
                        <blockquote className="mt-6 text-lg text-muted-foreground italic">
                        "{prominentMember.quote}"
                        </blockquote>
                    )}
                </div>
            </Card>
        </section>
      )}

      <section>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {otherMembers.map((member) => (
                <Card key={member.name} className="p-8 transition-all duration-300 hover:border-primary/50 hover:bg-glass-gradient-primary">
                    <div className="text-center">
                        <Avatar className="w-24 h-24 mx-auto mb-6 border-4 border-primary/20 shadow-md">
                            <AvatarImage src={member.image} alt={member.name} data-ai-hint="person face" className="object-cover" />
                            <AvatarFallback>{member.fallback}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold tracking-tight text-foreground">{member.name}</h3>
                        <p className="text-md font-medium text-primary mt-1">{member.role}</p>
                    </div>
                </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
