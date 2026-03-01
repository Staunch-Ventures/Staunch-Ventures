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
  },
  {
    name: "Adam Lamprecht",
    role: "Venture Associate",
    image: PlaceHolderImages.find(img => img.id === 'team-adam')?.imageUrl || "",
    fallback: "AL",
    quote: "You cannot simply throw money at founders and expect a thriving business. I want to help African startups fulfil their potential as global players by working directly with founders, providing hands-on support to achieve their vision.",
  },
  {
    name: "William Raw",
    role: "Venture Associate",
    image: PlaceHolderImages.find(img => img.id === 'team-will')?.imageUrl || "",
    fallback: "WR",
  },
];

export default function TeamPage() {
  return (
    <div className="container max-w-6xl mx-auto py-24 md:py-32 px-4 space-y-24">
      <section className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
          Meet the Team
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
          The driving force behind Staunch Ventures, dedicated to your success.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
                <Card key={member.name} className="p-8 transition-all duration-300 hover:border-primary/50 hover:bg-glass-gradient-primary flex flex-col items-center">
                    <div className="text-center flex flex-col items-center h-full">
                        <Avatar className="w-32 h-32 mb-6 border-4 border-primary/20 shadow-lg">
                            <AvatarImage src={member.image} alt={member.name} data-ai-hint="person face" className="object-cover" />
                            <AvatarFallback>{member.fallback}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-2xl font-bold tracking-tight text-foreground">{member.name}</h3>
                        <p className="text-lg font-medium text-primary mt-1">{member.role}</p>
                        {member.quote && (
                            <p className="mt-6 text-sm text-muted-foreground italic leading-relaxed">
                            "{member.quote}"
                            </p>
                        )}
                    </div>
                </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
