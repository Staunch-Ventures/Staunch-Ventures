"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

export type FieldVideoProps = {
  src: string;
  /** Still frame shown before playback — carries the whole visual cost of the slot. */
  poster: string;
  /** Accessible name for the player. */
  title: string;
  /** Natural pixel dimensions, so the frame holds its space before metadata loads. */
  width: number;
  height: number;
  className?: string;
};

/**
 * FieldVideo — the moving-image counterpart to FieldImage. Same frame (rounded,
 * hairline border) so footage and photography read as one system. Sized by
 * height (className supplies it) and left at its native aspect ratio, since the
 * clips are shot vertical. No img-grade here — a CSS filter over a playing video
 * re-composites every frame.
 *
 * Autoplays muted (the only kind any browser permits) once scrolled into view,
 * and pauses on the way out. Driving that from an effect rather than the
 * `autoPlay` attribute is what keeps `preload="none"` honest: a visitor who
 * never reaches the card never fetches the file, which matters at 11MB. Clips
 * carry burned-in captions, so muted playback still reads; `controls` is how
 * anyone unmutes, and doubles as the pause mechanism WCAG 2.2.2 wants for
 * motion that runs past five seconds.
 */
export function FieldVideo({ src, poster, title, width, height, className }: FieldVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [inViewRef, inView] = useInView({ threshold: 0.35 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView && !reduce) {
      // The attribute is in the markup already; this just means a viewer who
      // unmuted and scrolled off doesn't hit a blocked play() on the way back.
      video.muted = true;
      // Rejects when the browser declines anyway (iOS Low Power Mode, say) —
      // the poster and controls are already the fallback, so let it be.
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, reduce]);

  return (
    <figure
      ref={inViewRef}
      className={cn(
        "relative inline-block w-auto overflow-hidden rounded-2xl border border-border bg-muted/40",
        className
      )}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        title={title}
        aria-label={title}
        width={width}
        height={height}
        controls
        muted
        playsInline
        preload="none"
        className="block h-full w-auto"
      />
    </figure>
  );
}
