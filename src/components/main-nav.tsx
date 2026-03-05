"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/50 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {!mounted && (
          <>
            <div className="flex-shrink-0">
              <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={140} height={35} />
            </div>
            <div className="h-8 w-8" />
          </>
        )}

        {mounted && (
          <>
            {/* --- Desktop View --- */}
            <div className="hidden min-[1140px]:flex w-full items-center">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-80">
                  <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={140} height={35} />
                </Link>
              </div>

              <nav className="flex flex-1 justify-center items-center gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full border",
                      pathname === item.href
                        ? "bg-primary/20 text-primary border-primary/30 backdrop-blur-md shadow-glass"
                        : "text-muted-foreground border-transparent hover:bg-white/5 hover:text-foreground hover:border-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" className="rounded-full px-6 text-sm font-medium hover:bg-white/10 border border-transparent hover:border-white/10 transition-all backdrop-blur-sm">
                  <Link href="/startup">Startup Login</Link>
                </Button>
                <Button asChild className="rounded-full px-6 bg-primary/90 text-primary-foreground hover:bg-primary transition-all shadow-lg shadow-primary-glow border border-primary/50 backdrop-blur-md font-semibold">
                  <Link href="/dashboard">Investor Login</Link>
                </Button>
              </div>
            </div>

            {/* --- Mobile View --- */}
            <div className="flex w-full items-center justify-between min-[1140px]:hidden">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={140} height={35} />
              </Link>
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                    <Menu />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-background/80 backdrop-blur-xl p-0 border-r border-white/10">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Main Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                      <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={140} height={35} />
                      </Link>
                    </div>
                    <nav className="flex flex-col gap-2 p-6">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "px-4 py-3 text-lg font-medium transition-all rounded-xl border",
                            pathname === item.href
                              ? "bg-primary/20 text-primary border-primary/30"
                              : "text-foreground border-transparent hover:bg-white/5"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                    <div className="mt-auto p-6 space-y-3">
                      <Button asChild variant="outline" className="w-full rounded-full py-6" onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/startup">Startup Login</Link>
                      </Button>
                      <Button asChild className="w-full rounded-full py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity shadow-lg shadow-primary-glow" onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/dashboard">Investor Login</Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
