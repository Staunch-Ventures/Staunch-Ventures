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

          {/* Center nav — restrained glass pill */}
          <nav className="flex items-center gap-0.5 bg-card/60 p-1 rounded-full border border-border backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full outline-none",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-item"
                      className="absolute inset-0 bg-muted border border-border-strong rounded-full"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
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
