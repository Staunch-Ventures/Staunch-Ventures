"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { usePointerFine } from "@/hooks/use-pointer-fine";

/**
 * SpotlightCard — wraps content with a cursor-following radial highlight
 * (the Linear/Stripe card effect). Tracks pointer position into CSS vars.
 *
 * The highlight is `:hover`-only, so on touch devices it never shows — there
 * we skip the pointer listener entirely.
 */
export function SpotlightCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const fine = usePointerFine();

  const handleMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={fine ? handleMove : undefined}
      className={cn("spotlight rounded-2xl", className)}
      {...props}
    >
      {children}
    </div>
  );
}
