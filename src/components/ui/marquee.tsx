"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Marquee — seamless infinite horizontal scroll. Duplicates children once and
 * translates -50% so the loop is gapless. Pauses on hover. CSS-driven.
 */
export function Marquee({
  children,
  speed = 40,
  className,
  fade = true,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  fade?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className="flex w-max animate-[marquee_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
