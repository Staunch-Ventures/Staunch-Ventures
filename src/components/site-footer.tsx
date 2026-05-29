import Link from "next/link";
import Image from "next/image";
import { Linkedin, ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="mx-auto max-w-9xl py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={140} height={35} />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs text-pretty">
              A cross-border network for Africa&apos;s tech startups. Backing bold founders with capital, expertise, and operators who&apos;ve scaled before.
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
          <div className="col-span-1 md:col-span-3 md:col-start-7 flex flex-col gap-3 text-sm">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Company</h4>
            <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors">About</Link>
            <Link href="/team" className="text-foreground/80 hover:text-foreground transition-colors">Team</Link>
            <Link href="/impact" className="text-foreground/80 hover:text-foreground transition-colors">Impact</Link>
            <Link href="/partners" className="text-foreground/80 hover:text-foreground transition-colors">Ecosystem</Link>
            <Link href="/contact" className="text-foreground/80 hover:text-foreground transition-colors">Contact</Link>
          </div>
          <div className="col-span-1 md:col-span-3 flex flex-col gap-3 text-sm">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Platform</h4>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors"
            >
              Investor Login <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/startup"
              className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors"
            >
              Startup Login <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
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
