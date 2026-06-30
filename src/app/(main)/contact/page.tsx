import { Mail, MapPin, Linkedin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function ContactPage() {
  return (
    <div className="container max-w-6xl mx-auto py-24 md:py-32 px-4">
      <ScrollReveal className="text-center mb-16 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Contact</p>
        <h1 className="text-balance text-5xl md:text-7xl font-serif font-normal tracking-heading leading-[1.0]">
          <span className="text-foreground">Get in</span>{" "}
          <span className="text-primary">touch</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground mt-7">
          Building something bold? We&apos;d love to hear from you. Reach out and let&apos;s build the future together.
        </p>
      </ScrollReveal>

      <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <ScrollReveal>
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
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
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
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
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
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}
