"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { PITCH_URL } from "@/lib/intake";
import { CAPITAL_URL } from "@/lib/sites";
import { StaunchLockup } from "./brand-lockup";
import { Button } from "@/components/ui/button";
import { MobileMenu, MobileMenuToggle, type MenuItem } from "./mobile-menu";

/**
 * Three pages, named for what's there rather than for Staunch's internal arm
 * names: Home (Staunch Ventures: the studio and co-investment network),
 * About (mission, team, ecosystem), and Fund (Staunch Capital). Home gets its
 * own link because on the fund page the logo reads "Staunch Capital", and
 * clicking that shouldn't be the only way back. Fund sits last, beside the
 * Invest button. Visiting it re-themes the whole site (see SiteShell).
 */
const navItems: MenuItem[] = [
  { href: "/", label: "Home", note: "Studio & co-investment" },
  { href: "/about", label: "About", note: "Mission, team, contact" },
  { href: CAPITAL_URL, label: "Fund", note: "Staunch Capital" },
]

export function MainNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const closeMobileMenu = React.useCallback(() => setIsMobileMenuOpen(false), []);
  const [scrolled, setScrolled] = React.useState(false);

  const navRef = React.useRef<HTMLElement>(null);
  const itemRefs = React.useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 });

  // Measure the active link's offset *within the nav* so the indicator slides
  // inside the bar — never projected against document scroll position.
  React.useLayoutEffect(() => {
    const nav = navRef.current;
    const active = itemRefs.current[pathname];
    if (!nav || !active) {
      setIndicator((prev) => ({ ...prev, width: 0 }));
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const rect = active.getBoundingClientRect();
    setIndicator({ left: rect.left - navRect.left, width: rect.width });
  }, [pathname]);

  React.useEffect(() => {
    const onResize = () => {
      const nav = navRef.current;
      const active = itemRefs.current[pathname];
      if (!nav || !active) return;
      const navRect = nav.getBoundingClientRect();
      const rect = active.getBoundingClientRect();
      setIndicator({ left: rect.left - navRect.left, width: rect.width });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "site-header sticky top-0 z-50 w-full transition-[background,border-color,backdrop-filter] duration-300",
        // While the mobile menu is open the bar goes clear: the menu is the
        // surface, and the logo and toggle simply sit on top of it.
        scrolled && !isMobileMenuOpen
          ? "is-scrolled divider-fade-b bg-background/85 backdrop-blur-md"
          : ""
      )}
    >
      <div className="mx-auto max-w-9xl flex h-16 items-center justify-between px-4 lg:px-8">
        {/* --- Desktop View --- */}
        <div className="hidden min-[1140px]:flex w-full items-center">
          {/* Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" aria-label="Staunch, home" className="flex-shrink-0 transition-opacity hover:opacity-80">
              <StaunchLockup />
            </Link>
          </div>

          {/* Center nav — restrained glass pill with a measured sliding indicator.
              The indicator is positioned relative to <nav> (not the document),
              so it slides within the bar and never jumps on scroll/navigation. */}
          <nav
            ref={navRef}
            className="relative flex items-center gap-0.5 bg-card/60 p-1 rounded-full border border-border backdrop-blur-md"
          >
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-muted border border-border-strong"
              initial={false}
              animate={{ left: indicator.left, width: indicator.width, opacity: indicator.width ? 1 : 0 }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              aria-hidden
            />
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  ref={(el) => {
                    itemRefs.current[item.href] = el;
                  }}
                  href={item.href}
                  className={cn(
                    "relative z-10 px-4 py-1.5 text-sm font-medium transition-colors rounded-full outline-none",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex-1 flex items-center justify-end gap-2">
            <Button asChild variant="ghost" size="pill">
              <Link href={PITCH_URL}>Pitch</Link>
            </Button>
            <Button asChild variant="brand" size="pill">
              <Link href="/invest">Invest</Link>
            </Button>
          </div>
        </div>

        {/* --- Mobile View --- */}
        <div className="flex w-full items-center justify-between min-[1140px]:hidden">
          <Link href="/" aria-label="Staunch, home" className="-my-3 flex items-center gap-2 py-3">
            <StaunchLockup />
          </Link>
          <MobileMenuToggle open={isMobileMenuOpen} onToggle={() => setIsMobileMenuOpen((o) => !o)} />
        </div>
      </div>
      <MobileMenu open={isMobileMenuOpen} onClose={closeMobileMenu} items={navItems} />
    </header>
  );
}
