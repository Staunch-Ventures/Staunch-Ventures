"use client";

import { useEffect, useRef } from "react";

/**
 * A pool of light that follows the pointer and reveals the gold Staunch
 * linework beneath the page (styles: .pattern-light in capital.css).
 *
 * Mouse: the light trails the cursor slightly, like a lamp being carried, and
 * fades when the pointer leaves the window. Touch: there is no hover, so the
 * light follows the finger while it touches or scrolls, then fades shortly
 * after it lifts. Reduced motion: no trailing, the light sits exactly under
 * the pointer.
 *
 * The frame loop only runs while the light is visible.
 */
export default function PatternLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = document.documentElement.classList.contains("reduced");
    const follow = reduced ? 1 : 0.14;

    let tx = 0, ty = 0; // where the pointer is
    let cx = 0, cy = 0; // where the light is
    let placed = false;
    let lit = false;
    let raf = 0;
    let fadeTimer: ReturnType<typeof setTimeout> | null = null;
    let stopTimer: ReturnType<typeof setTimeout> | null = null;

    function frame() {
      cx += (tx - cx) * follow;
      cy += (ty - cy) * follow;
      const half = el!.offsetWidth / 2;
      el!.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      // Keep the weave pinned to the page, not to the light or the viewport.
      el!.style.backgroundPosition = `${half - cx}px ${half - cy - window.scrollY}px`;
      raf = requestAnimationFrame(frame);
    }

    function light(x: number, y: number) {
      tx = x;
      ty = y;
      if (!placed) {
        cx = x;
        cy = y;
        placed = true;
      }
      if (stopTimer) clearTimeout(stopTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (!raf) raf = requestAnimationFrame(frame);
      if (!lit) {
        lit = true;
        el!.classList.add("is-lit");
      }
    }

    function dim(after = 0) {
      if (fadeTimer) clearTimeout(fadeTimer);
      fadeTimer = setTimeout(() => {
        lit = false;
        el!.classList.remove("is-lit");
        // Let the opacity transition finish before parking the loop.
        stopTimer = setTimeout(() => {
          cancelAnimationFrame(raf);
          raf = 0;
        }, 1000);
      }, after);
    }

    const onMouseMove = (e: MouseEvent) => light(e.clientX, e.clientY);
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) dim();
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) light(t.clientX, t.clientY);
    };
    const onTouchEnd = () => dim(700);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (stopTimer) clearTimeout(stopTimer);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return <div ref={ref} className="pattern-light" aria-hidden="true" />;
}
