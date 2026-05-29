"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * SpotlightCard — wraps content with a cursor-following radial highlight
 * (the Linear/Stripe card effect). Tracks pointer position into CSS vars.
 */
export function SpotlightCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const ref = React.useRef<HTMLDivElement>(null);

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
      onMouseMove={handleMove}
      className={cn("spotlight", className)}
      {...props}
    >
      {children}
    </div>
  );
}
