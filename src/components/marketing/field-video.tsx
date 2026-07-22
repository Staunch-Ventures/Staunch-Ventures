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
 * clips are shot vertical. Deliberately inert until played: the poster plus
 * preload="metadata" means the slot costs a still, not the video. No img-grade
 * here — a CSS filter over a playing video re-composites every frame.
 */
export function FieldVideo({ src, poster, title, width, height, className }: FieldVideoProps) {
  return (
    <figure
      className={cn(
        "relative inline-block w-auto overflow-hidden rounded-2xl border border-border bg-muted/40",
        className
      )}
    >
      <video
        src={src}
        poster={poster}
        title={title}
        aria-label={title}
        width={width}
        height={height}
        controls
        playsInline
        preload="metadata"
        className="block h-full w-auto"
      />
    </figure>
  );
}
