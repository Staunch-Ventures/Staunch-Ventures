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
};

/**
 * FieldImage — the one way photographs render on the site. Every photo gets
 * the same frame (rounded, hairline border), the same unifying grade (slight
 * desaturation + navy tint so shots from different phones/events read as one
 * shoot), the same bottom scrim, and a documentary caption. Consistency is
 * what keeps photography feeling premium instead of scrapbooky — so pages
 * compose this rather than styling <Image> directly.
 */
export function FieldImage({
  src,
  alt,
  eyebrow,
  caption,
  hint,
  sizes,
  className,
}: FieldImageProps) {
  return (
    <figure
      className={cn(
        "group/photo relative overflow-hidden rounded-2xl border border-border bg-muted/40",
        className
      )}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="img-grade object-cover transition-transform duration-700 ease-out group-hover/photo:scale-[1.03]"
          />
          {/* Navy wash pulls every photo toward the site palette */}
          <div className="pointer-events-none absolute inset-0 bg-navy/25 mix-blend-multiply" aria-hidden />
        </>
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
