"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePointerFine } from "@/hooks/use-pointer-fine";

/*
 * A window onto a portfolio company's live site. The capture paints first,
 * and it's all that touch devices, reduced-motion and data-saver visitors
 * ever load. On a desktop, once the card nears the viewport, the real site
 * loads underneath at desktop size, scaled to fit, and fades in over the
 * capture.
 *
 * It's a picture, not a browser: the frame is inert (no pointer, focus or
 * screen reader), so clicks fall through to the card's link, and it's
 * sandboxed so it can't navigate this page, open popups or submit forms.
 */
const VIEWPORT = { width: 1440, height: 900 };
// Their intro or loading splash plays out behind the capture before the live
// site is shown. Erring long costs nothing: the capture looks the same.
const SETTLE_MS = 2500;

export function SitePreview({ url, poster, title }: { url: string; poster: string; title: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const fine = usePointerFine();
  const [live, setLive] = React.useState(false);
  const [shown, setShown] = React.useState(false);
  const [scale, setScale] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!fine || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLive(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [fine]);

  React.useEffect(() => {
    const el = ref.current;
    if (!live || !el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / VIEWPORT.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [live]);

  return (
    <div ref={ref} className="relative aspect-[16/10] overflow-hidden bg-black">
      <Image
        src={poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="object-cover object-top"
      />
      {live && (
        <iframe
          src={url}
          title={title}
          inert
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => window.setTimeout(() => setShown(true), SETTLE_MS)}
          className={cn(
            "pointer-events-none absolute left-0 top-0 origin-top-left border-0 bg-black transition-opacity duration-1000",
            shown ? "opacity-100" : "opacity-0"
          )}
          style={{ width: VIEWPORT.width, height: VIEWPORT.height, transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}
