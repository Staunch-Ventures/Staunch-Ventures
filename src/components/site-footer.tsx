import Link from "next/link";
import { Linkedin } from "lucide-react";
import { PITCH_URL } from "@/lib/intake";
import { CAPITAL_URL } from "@/lib/sites";
import { StaunchLockup } from "./brand-lockup";

export function SiteFooter() {
  return (
    // blur-sm is the ceiling here: the linework behind the footer is ~1px
    // strokes, so anything heavier erases the pattern the translucency exists
    // to reveal. Matches the scrolled header.
    <footer className="relative z-10 border-t border-border bg-background/60 backdrop-blur-sm mt-20">
      <div className="mx-auto max-w-9xl py-16 px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5 flex flex-col gap-5">
            <Link href="/" aria-label="Staunch, home" className="flex items-center gap-2">
              <StaunchLockup />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs text-pretty">
              A cross-border venture platform connecting Africa with the US, Europe and Asia. Capital, execution and global market access for high-growth founders and investors.
            </p>
            <div className="flex gap-4 mt-1">
              <Link
                href="https://www.linkedin.com/company/staunchventures"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 md:col-start-7 flex flex-col gap-3 text-sm">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Staunch</h4>
            <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">Home</Link>
            <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors">About</Link>
            <Link href="/about#team" className="text-foreground/80 hover:text-foreground transition-colors">Team</Link>
            <Link href="/about#contact" className="text-foreground/80 hover:text-foreground transition-colors">Contact</Link>
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3 text-sm">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Investors</h4>
            <Link href={CAPITAL_URL} className="text-foreground/80 hover:text-foreground transition-colors">The fund</Link>
            <Link href="/#network" className="text-foreground/80 hover:text-foreground transition-colors">Co-investment</Link>
            <Link href="/invest" className="text-foreground/80 hover:text-foreground transition-colors">Ways to invest</Link>
          </div>
          <div className="col-span-2 md:col-span-2 flex flex-col gap-3 text-sm">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Founders</h4>
            <Link href="/#studio" className="text-foreground/80 hover:text-foreground transition-colors">Venture studio</Link>
            <Link href={PITCH_URL} className="text-foreground/80 hover:text-foreground transition-colors">Pitch your startup</Link>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Staunch Ventures. All rights reserved.</span>
          <span>Hilton, South Africa</span>
        </div>
      </div>
    </footer>
  );
}
