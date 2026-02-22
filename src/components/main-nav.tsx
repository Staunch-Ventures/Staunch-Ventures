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
            <Link href="/" className="flex-shrink-0">
              <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={140} height={35} />
            </Link>
            <div className="h-8 w-8" />
          </>
        )}

        {mounted && (
          <>
            {/* --- Desktop View --- */}
            <div className="hidden min-[1140px]:flex w-full items-center">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0">
                  <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={140} height={35} />
                </Link>
              </div>

              <nav className="flex flex-1 justify-center items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <Button asChild variant="outline">
                  <Link href="/startup">Startup Login</Link>
                </Button>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity shadow-md shadow-primary-glow">
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
                  <Button variant="ghost" size="icon">
                    <Menu />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-background/80 backdrop-blur-xl p-0">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Main Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b">
                      <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <Image src="/Transparent%20Logo.png" alt="Staunch Ventures" width={140} height={35} />
                      </Link>
                    </div>
                    <nav className="flex flex-col gap-4 p-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "text-lg font-medium transition-colors hover:text-primary",
                            pathname === item.href
                              ? "text-primary"
                              : "text-foreground"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                    <div className="mt-auto p-4 space-y-2">
                      <Button asChild variant="outline" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/startup">Startup Login</Link>
                      </Button>
                      <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-opacity shadow-lg shadow-primary-glow" onClick={() => setIsMobileMenuOpen(false)}>
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
