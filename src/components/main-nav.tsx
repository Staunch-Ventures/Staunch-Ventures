"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/impact", label: "Impact" },
  { href: "/partners", label: "Ecosystem" },
  { href: "/contact", label: "Contact" },
];

export function MainNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
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
        "sticky top-0 z-50 w-full transition-[background,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* --- Desktop View --- */}
        <div className="hidden min-[1140px]:flex w-full items-center">
          {/* Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-80">
              <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={132} height={33} priority />
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

          {/* Auth */}
          <div className="flex-1 flex items-center justify-end gap-2">
            <Button asChild variant="ghost" size="pill">
              <Link href="/startup">Startup Login</Link>
            </Button>
            <Button asChild variant="brand" size="pill">
              <Link href="/dashboard">Investor Login</Link>
            </Button>
          </div>
        </div>

        {/* --- Mobile View --- */}
        <div className="flex w-full items-center justify-between min-[1140px]:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={132} height={33} priority />
          </Link>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background/90 backdrop-blur-xl p-0 border-r border-border">
              <SheetHeader className="sr-only">
                <SheetTitle>Main Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={132} height={33} />
                  </Link>
                </div>
                <nav className="flex flex-col gap-1 p-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "px-4 py-3 text-base font-medium transition-colors rounded-lg",
                        pathname === item.href
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto p-6 space-y-3">
                  <Button asChild variant="outline" size="pill-lg" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/startup">Startup Login</Link>
                  </Button>
                  <Button asChild variant="brand" size="pill-lg" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/dashboard">Investor Login</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
