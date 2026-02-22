import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeamPage() {
  return (
    <div className="container max-w-5xl mx-auto py-24 md:py-32 px-4 space-y-16">
      <section className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Meet the Team
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
          The driving force behind Staunch Ventures, dedicated to your success.
        </p>
      </section>

      <section className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 justify-center">
        <Card className="lg:col-start-2 p-8 md:p-12 transition-all duration-300 hover:border-primary/50 hover:bg-glass-gradient-primary flex flex-col justify-center">
          <div className="text-center max-w-3xl mx-auto">
              <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-primary/20 shadow-lg">
                  <AvatarImage src="/Oliver headshot.png" alt="Oliver Christodoulou" data-ai-hint="person face" className="object-cover" />
                  <AvatarFallback>OC</AvatarFallback>
              </Avatar>
              <h3 className="text-3xl font-bold tracking-tight text-foreground">Oliver Christodoulou</h3>
              <p className="text-lg font-medium text-primary mt-1">Founder & Managing Partner</p>
              <blockquote className="mt-6 text-lg text-muted-foreground italic">
              "African startups are uniquely positioned to solve local challenges with global applications. My vision is to create an ecosystem where innovation thrives and impact scales."
              </blockquote>
          </div>
        </Card>
      </section>
    </div>
  );
}
