import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FieldImageProps = {
  /** Omit while the real photo is pending — renders a styled placeholder slot. */
  src?: string;
  alt: string;
  /** Small uppercase label above the caption, e.g. "Founder House". */
  eyebrow?: string;
  /** Documentary one-liner: place + event + date, e.g. "Cape Town — March 2026". */
  caption?: string;
  /** Note shown inside the placeholder describing the shot that belongs here. */
  hint?: string;
  sizes?: string;
  className?: string;
  /**
   * Natural pixel dimensions of the source photo. When set, the image renders
   * at its native aspect ratio (auto width) instead of filling a fixed box —
   * used wherever the photo IS the card, so a narrower photo yields a
   * narrower card rather than empty letterbox space. className must supply
   * the height (e.g. "h-full" in a stretched grid/flex cell, or "h-72").
   */
  width?: number;
  height?: number;
};

/**
 * FieldImage — the one way photographs render on the site. Every photo gets
 * the same frame (rounded, hairline border), the same unifying grade (slight
 * desaturation + navy tint so shots from different phones/events read as one
 * shoot), and a documentary caption. Images are always shown in full via
 * object-contain — the surrounding box should be sized close to the photo's
 * native aspect ratio (see usage sites) so letterboxing stays minimal.
 */
export function FieldImage({
  src,
  alt,
  eyebrow,
  caption,
  hint,
  sizes,
  className,
  width,
  height,
}: FieldImageProps) {
  const intrinsic = Boolean(src && width && height);

  return (
    <figure
      className={cn(
        "group/photo relative overflow-hidden rounded-2xl border border-border bg-muted/40",
        intrinsic && "inline-block w-auto",
        className
      )}
    >
      {src ? (
        intrinsic ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            className="img-grade block h-full w-auto transition-transform duration-700 ease-out group-hover/photo:scale-[1.03]"
          />
        ) : (
          <>
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              className="img-grade object-contain transition-transform duration-700 ease-out group-hover/photo:scale-[1.03]"
            />
            {/* Navy wash pulls every photo toward the site palette */}
            <div className="pointer-events-none absolute inset-0 bg-navy/10 mix-blend-multiply" aria-hidden />
          </>
        )
      ) : (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linework opacity-30" aria-hidden />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong/50 bg-card/60">
              <ImageIcon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
            </span>
            {hint && (
              <p className="max-w-[26ch] text-xs leading-relaxed text-muted-foreground">{hint}</p>
            )}
          </div>
        </div>
      )}

      {(eyebrow || caption) && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/85 via-navy-deep/35 to-transparent"
            aria-hidden
          />
          <figcaption className="absolute inset-x-0 bottom-0 p-5">
            {eyebrow && (
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">{eyebrow}</p>
            )}
            {caption && <p className="mt-1 text-sm font-medium text-white">{caption}</p>}
          </figcaption>
        </>
      )}
    </figure>
  );
}
