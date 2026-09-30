"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin } from "lucide-react";
import { INVEST_EMAIL, PITCH_URL } from "@/lib/intake";
import { CAPITAL_URL } from "@/lib/sites";
import { StaunchLockup } from "./brand-lockup";

type Column = { title: string; links: { href: string; label: string }[] };

const BRIEF_MAILTO = `mailto:${INVEST_EMAIL}?subject=${encodeURIComponent("Staunch Capital: investor brief")}`;

/*
 * One footer, two readings. Across Staunch it maps the platform by audience;
 * on the fund page it's about the fund: its sections, how an investor gets
 * in touch, and the fund's legal line. The shared chrome (logo, layout,
 * LinkedIn) stays put, so moving between them is a change of content, not
 * of place.
 */
const VENTURES = {
  blurb:
    "A cross-border venture platform connecting Africa with the US, Europe and Asia. Capital, execution and global market access for high-growth founders and investors.",
  columns: [
    {
      title: "Staunch",
      links: [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/about#team", label: "Team" },
        { href: "/about#contact", label: "Contact" },
      ],
    },
    {
      title: "Investors",
      links: [
        { href: CAPITAL_URL, label: "The fund" },
        { href: "/#network", label: "Co-investment" },
        { href: "/invest", label: "Ways to invest" },
      ],
    },
    {
      title: "Founders",
      links: [
        { href: "/#studio", label: "Venture studio" },
        { href: PITCH_URL, label: "Pitch your startup" },
      ],
    },
  ] satisfies Column[],
  legal: null as string | null,
};

const CAPITAL = {
  blurb:
    "Staunch Capital is a permanent capital vehicle backing Africa's boldest founders, from Pre-Seed to Series A. The fund of Staunch, connecting Africa to the world.",
  columns: [
    {
      title: "The fund",
      links: [
        { href: `${CAPITAL_URL}#thesis`, label: "Thesis" },
        { href: `${CAPITAL_URL}#fund`, label: "Terms" },
        { href: `${CAPITAL_URL}#structure`, label: "Why permanent capital" },
        { href: `${CAPITAL_URL}#platform`, label: "The platform" },
      ],
    },
    {
      title: "Investors",
      links: [
        { href: BRIEF_MAILTO, label: "Request the investor brief" },
        { href: `mailto:${INVEST_EMAIL}`, label: "Email the team" },
        { href: "/invest", label: "Ways to invest" },
      ],
    },
    {
      title: "Staunch",
      links: [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/about#team", label: "Team" },
      ],
    },
  ] satisfies Column[],
  legal:
    "Nothing on this site is an offer to sell, or a solicitation of an offer to buy, any security. Fund documentation is shared privately with prospective investors.",
};

export function SiteFooter() {
  const pathname = usePathname();
  const onFund = pathname === CAPITAL_URL || pathname.startsWith(`${CAPITAL_URL}/`);
  const content = onFund ? CAPITAL : VENTURES;
  const linkClass = "-my-1.5 py-1.5 text-foreground/80 hover:text-foreground transition-colors";

  return (
    // blur-sm is the ceiling here: the linework behind the footer is ~1px
    // strokes, so anything heavier erases the pattern the translucency exists
    // to reveal. Matches the scrolled header.
    <footer className="relative z-10 border-t border-border bg-background/60 backdrop-blur-sm mt-20">
      <div className="mx-auto max-w-9xl py-16 px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5 flex flex-col gap-5">
            <Link href="/" aria-label="Staunch, home" className="-my-3 flex w-fit items-center gap-2 py-3">
              <StaunchLockup />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs text-pretty">{content.blurb}</p>
            <div className="flex gap-4 mt-1">
              <Link
                href="https://www.linkedin.com/company/staunchventures"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          {content.columns.map((col, i) => (
            <div
              key={col.title}
              className={
                i === 0
                  ? "col-span-1 md:col-span-2 md:col-start-7 flex flex-col gap-3 text-sm"
                  : i === content.columns.length - 1
                    ? "col-span-2 md:col-span-2 flex flex-col gap-3 text-sm"
                    : "col-span-1 md:col-span-2 flex flex-col gap-3 text-sm"
              }
            >
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{col.title}</h4>
              {col.links.map((l) =>
                l.href.startsWith("mailto:") ? (
                  <a key={l.label} href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.label} href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Staunch Ventures. All rights reserved.
            {onFund && " Staunch Capital is a fund of Staunch Ventures."}
          </span>
          <span>Hilton, South Africa</span>
        </div>
        {content.legal && <p className="mt-4 max-w-3xl text-xs text-muted-foreground/70 text-pretty">{content.legal}</p>}
      </div>
    </footer>
  );
}
