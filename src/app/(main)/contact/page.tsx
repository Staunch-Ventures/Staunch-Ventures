import { Mail, MapPin, Linkedin, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ContactForm } from "./contact-form";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export default function ContactPage() {
  return (
    <div className="container max-w-6xl mx-auto py-28 md:py-36 px-4">
      <ScrollReveal className="text-center mb-16 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Contact</p>
        <h1 className="text-balance text-5xl md:text-7xl font-bold tracking-display leading-[0.98]">
          <span className="text-gradient-brand">Get in</span>{" "}
          <span className="text-gradient-ember">touch</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground mt-7">
          Building something bold? We&apos;d love to hear from you. Reach out and let&apos;s build the future together.
        </p>
      </ScrollReveal>

      <div className="grid lg:grid-cols-5 gap-6">
        <ScrollReveal className="lg:col-span-3 flex">
          <Card className="p-8 w-full">
            <h2 className="text-2xl font-semibold tracking-tight mb-1">Send us a message</h2>
            <p className="text-sm text-muted-foreground mb-8">We&apos;ll respond within two business days.</p>
            <ContactForm />
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="lg:col-span-2 space-y-4">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                <Mail className="h-4 w-4 text-primary" />
              </span>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                <a
                  href="mailto:oliver@staunchventures.com"
                  className="block mt-1 font-medium text-foreground hover:text-primary transition-colors break-all"
                >
                  oliver@staunchventures.com
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                <MapPin className="h-4 w-4 text-primary" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Office</p>
                <p className="mt-1 font-medium text-foreground">Hilton, South Africa</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Follow us</p>
            <div className="space-y-3">
              <a
                href="https://www.linkedin.com/company/staunchventures"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn / staunchventures
              </a>
              <a
                href="https://staunchventures.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="h-4 w-4" />
                staunchventures.com
              </a>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}
