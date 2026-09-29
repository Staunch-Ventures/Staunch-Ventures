"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { INVEST_EMAIL, PITCH_URL } from "@/lib/intake";

/**
 * Full-screen mobile menu. The header bar stays where it is and the menu
 * opens beneath it, expanding as a circle from the toggle, so opening it
 * reads as the page changing state rather than a drawer arriving from
 * elsewhere. Links rise in one by one; the toggle's two lines fold into an X.
 *
 * Closes on link tap, route change and Escape; locks page scroll while open.
 * Colours come from the site tokens, so it follows the Capital theme too.
 *
 * Rendered into <body> (a portal), not inside the header: the scrolled header
 * has a backdrop-filter, which would make it the containing block for this
 * fixed layer and clip it to the 64px bar. The header sits at z-50, above it.
 */

export type MenuItem = { href: string; label: string; note: string };

const EASE = [0.76, 0, 0.24, 1] as const;
// The toggle sits at the header's right edge: 16px gutter + half a 44px button,
// vertically centred in the 64px bar.
const ORIGIN = "calc(100% - 38px) 32px";

export function MobileMenuToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      className="relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full text-foreground"
    >
      <span className="relative block h-3 w-6">
        <span
          className={cn(
            "absolute left-0 block h-[1.5px] w-6 rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
            open ? "top-[5px] rotate-45" : "top-0"
          )}
        />
        <span
          className={cn(
            "absolute left-0 block h-[1.5px] rounded-full bg-current transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
            open ? "top-[5px] w-6 -rotate-45" : "top-[10px] w-4"
          )}
        />
      </span>
    </button>
  );
}

export function MobileMenu({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: MenuItem[];
}) {
  const pathname = usePathname();
  const firstLink = React.useRef<HTMLAnchorElement>(null);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Close whenever the route changes (covers back/forward too).
  React.useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  React.useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 350);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background"
          initial={{ clipPath: `circle(0px at ${ORIGIN})` }}
          animate={{ clipPath: `circle(150% at ${ORIGIN})`, transition: { duration: 0.7, ease: EASE } }}
          exit={{ clipPath: `circle(0px at ${ORIGIN})`, transition: { duration: 0.55, ease: EASE, delay: 0.1 } }}
        >
          {/* The brand weave and a warm pool of light, as on the pages. */}
          <div className="pointer-events-none absolute inset-0 bg-linework opacity-[0.07]" aria-hidden />
          <div
            className="pointer-events-none absolute -right-1/3 -top-1/4 h-[80vh] w-[80vh]"
            style={{ background: "radial-gradient(closest-side, hsl(var(--primary) / 0.18), transparent)" }}
            aria-hidden
          />

          <nav aria-label="Main" className="relative flex flex-1 flex-col px-6 pb-8 pt-28">
            <ul className="space-y-1">
              {items.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 + i * 0.07 } }}
                      exit={{ y: "110%", transition: { duration: 0.35, ease: EASE, delay: (items.length - 1 - i) * 0.04 } }}
                    >
                      <Link
                        ref={i === 0 ? firstLink : undefined}
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className="group flex items-baseline justify-between gap-4 py-3 outline-none"
                      >
                        <span
                          className={cn(
                            "font-serif text-5xl font-normal tracking-heading transition-colors",
                            active ? "text-primary" : "text-foreground group-hover:text-primary group-focus-visible:text-primary"
                          )}
                        >
                          {item.label}
                        </span>
                        <span className="text-right text-xs text-muted-foreground">{item.note}</span>
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>

            <motion.div
              className="mt-10 grid grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <Link
                href="/invest"
                onClick={onClose}
                className="flex h-12 items-center justify-center gap-1.5 rounded-full bg-primary text-base font-medium text-primary-foreground shadow-primary-glow"
              >
                Invest
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={PITCH_URL}
                onClick={onClose}
                className="flex h-12 items-center justify-center rounded-full border border-border-strong text-base font-medium text-foreground"
              >
                Pitch
              </Link>
            </motion.div>

            <motion.div
              className="mt-auto flex items-end justify-between gap-4 pt-12 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <div className="space-y-1">
                <a href={`mailto:${INVEST_EMAIL}`} className="block text-foreground/80">
                  {INVEST_EMAIL}
                </a>
                <p>Hilton, South Africa</p>
              </div>
              <a
                href="https://www.linkedin.com/company/staunchventures"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80"
              >
                LinkedIn
              </a>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
