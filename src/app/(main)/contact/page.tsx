import Link from "next/link";
import { MapPin, Linkedin, Rocket, Coins, ArrowRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FieldImage } from "@/components/marketing/field-image";
import { PITCH_URL, INVEST_MAILTO } from "@/lib/intake";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-9xl py-24 md:py-32 px-4 lg:px-8">
      <ScrollReveal className="text-center mb-16 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">Contact</p>
        <h1 className="text-balance text-5xl md:text-7xl font-serif font-normal tracking-heading leading-[1.0]">
          <span className="text-foreground">Get in</span>{" "}
          <span className="text-primary">touch</span>
        </h1>
        <p className="text-pretty text-xl text-muted-foreground mt-7">
          Building something bold, or looking to back those who are? Pick your
          door and we&apos;ll take it from there.
        </p>
      </ScrollReveal>

      {/* The two doors */}
      <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-6">
        <ScrollReveal className="flex">
          <Link href={PITCH_URL} target="_blank" rel="noopener noreferrer" className="flex group w-full">
            <SpotlightCard className="w-full flex">
              <Card variant="interactive" className="w-full flex flex-col p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-5">
                  <Rocket className="h-5 w-5 text-primary" strokeWidth={1.75} />
                </span>
                <h2 className="text-xl font-semibold tracking-tight mb-2">Founders</h2>
                <p className="text-muted-foreground text-sm text-pretty flex-grow">
                  Raising for an early-stage startup? Submit your deck through
                  our application form.
                </p>
                <div className="mt-6 font-medium text-foreground flex items-center text-sm transition-colors group-hover:text-primary">
                  Pitch your startup
                  <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Card>
            </SpotlightCard>
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={0.05} className="flex">
          <Link href={INVEST_MAILTO} className="flex group w-full">
            <SpotlightCard className="w-full flex">
              <Card variant="interactive" className="w-full flex flex-col p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-5">
                  <Coins className="h-5 w-5 text-primary" strokeWidth={1.75} />
                </span>
                <h2 className="text-xl font-semibold tracking-tight mb-2">Investors</h2>
                <p className="text-muted-foreground text-sm text-pretty flex-grow">
                  Interested in backing Africa&apos;s next chapter alongside us?
                  Email Oliver directly.
                </p>
                <div className="mt-6 font-medium text-foreground flex items-center text-sm transition-colors group-hover:text-primary">
                  Invest with us
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Card>
            </SpotlightCard>
          </Link>
        </ScrollReveal>
      </div>

      <div className="grid sm:grid-cols-[auto_1fr] gap-6 max-w-3xl mx-auto">
        {/* The person you'll actually be talking to */}
        <ScrollReveal className="flex justify-center sm:justify-start">
          <FieldImage
            src="/ollie-laughing.jpg"
            alt="Oliver Christodoulou, founder of Staunch Ventures"
            sizes="(max-width: 640px) 240px, 280px"
            className="aspect-[2/3] h-72 w-auto sm:h-full sm:min-h-[240px]"
          />
        </ScrollReveal>

        <div className="flex flex-col gap-6">
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
    </div>
  );
}
