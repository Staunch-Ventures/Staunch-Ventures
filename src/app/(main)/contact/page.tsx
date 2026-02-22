import { Mail, MapPin, Linkedin, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="container max-w-6xl mx-auto py-24 md:py-32 px-4">
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Get In Touch
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
          Have a revolutionary idea? We'd love to hear from you. Reach out and let's build the future together.
        </p>
      </section>

      <div className="flex justify-center">
        <div className="space-y-8 max-w-md w-full">
            <Card className="p-8 hover:bg-glass-gradient-primary hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Email</h3>
                        <a href="mailto:oliver@staunchventures.com" className="text-primary hover:underline">oliver@staunchventures.com</a>
                        <p className="text-sm text-muted-foreground mt-1">Send us an email anytime</p>
                    </div>
                </div>
            </Card>
            <Card className="p-8 hover:bg-glass-gradient-primary hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-6">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Office</h3>
                        <p className="font-medium text-primary">Hilton, South Africa</p>
                        <p className="text-sm text-muted-foreground mt-1">Backing Africa's Boldest</p>
                    </div>
                </div>
            </Card>
            <Card className="p-8 hover:bg-glass-gradient-primary hover:border-primary/50 transition-all duration-300">
                <h3 className="font-semibold text-lg mb-6">Follow Us</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Linkedin className="h-5 w-5 text-muted-foreground" />
                        <a href="https://www.linkedin.com/company/staunchventures" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn (@staunchventures)</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <a href="https://staunchventures.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Website (staunchventures.com)</a>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
