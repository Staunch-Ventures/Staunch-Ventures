"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Reveal vocabulary. Sections opt into a variant via `data-reveal="…"`; anything
 * unrecognised (or a bare attribute) falls back to "up", which is the original
 * behaviour. Distances, durations, and eases deliberately differ per variant —
 * "fade" is the slowest and moves not at all, which is what makes the About
 * section read as the rest beat.
 */
const REVEALS: Record<
  string,
  { from: gsap.TweenVars; to: gsap.TweenVars; duration: number; ease: string }
> = {
  up: { from: { opacity: 0, y: 28 }, to: { opacity: 1, y: 0 }, duration: 1.1, ease: "power3.out" },
  fade: { from: { opacity: 0 }, to: { opacity: 1 }, duration: 1.6, ease: "power1.out" },
  left: {
    from: { opacity: 0, x: -30, y: 14 },
    to: { opacity: 1, x: 0, y: 0 },
    duration: 1.25,
    ease: "power3.out",
  },
  right: {
    from: { opacity: 0, x: 30, y: 14 },
    to: { opacity: 1, x: 0, y: 0 },
    duration: 1.25,
    ease: "power3.out",
  },
};

/** Split a plain-text element into masked lines. Returns .line-inner nodes. */
function splitToLines(el: HTMLElement) {
  if (!el.dataset.original) el.dataset.original = (el.textContent || "").replace(/\s+/g, " ").trim();
  const words = el.dataset.original.split(" ");
  el.innerHTML = words
    .map((w) => `<span class="w" style="display:inline-block">${escapeHtml(w)}</span>`)
    .join(" ");
  const spans = Array.from(el.querySelectorAll<HTMLElement>(".w"));
  const lines: string[] = [];
  let current: string[] = [];
  let top: number | null = null;
  spans.forEach((s) => {
    const t = s.offsetTop;
    if (top === null || Math.abs(t - top) < 4) {
      current.push(s.textContent || "");
      if (top === null) top = t;
    } else {
      lines.push(current.join(" "));
      current = [s.textContent || ""];
      top = t;
    }
  });
  if (current.length) lines.push(current.join(" "));
  el.innerHTML = lines
    .map((l) => `<span class="line"><span class="line-inner">${escapeHtml(l)}</span></span>`)
    .join("");
  return el.querySelectorAll<HTMLElement>(".line-inner");
}

/** Wrap every word (inside nested markup too) in a .word span. */
function wrapWords(el: HTMLElement) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  const nodes: Node[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) nodes.push(n);
  nodes.forEach((node) => {
    const parts = (node.nodeValue || "").split(/(\s+)/);
    const frag = document.createDocumentFragment();
    parts.forEach((p) => {
      if (!p) return;
      if (/^\s+$/.test(p)) {
        frag.appendChild(document.createTextNode(p));
        return;
      }
      const s = document.createElement("span");
      s.className = "word";
      s.style.display = "inline-block";
      s.textContent = p;
      frag.appendChild(s);
    });
    node.parentNode?.replaceChild(frag, node);
  });
  return el.querySelectorAll<HTMLElement>(".word");
}

/**
 * Motion for the Staunch Capital page: masked heading reveals, the scrubbed
 * thesis, grouped reveals with drawn hairlines, and magnetic CTAs. Scrolling,
 * the nav and the mobile menu belong to the shared site shell. Everything is
 * reverted on unmount, so navigating away leaves nothing behind.
 */
export default function CapitalFX() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = root.classList.contains("reduced");
    const cleanups: Array<() => void> = [];

    /* Scroll cue → glide to the first section */
    const scrollCue = document.getElementById("scrollCue");
    function onScrollCue() {
      const target = document.getElementById("thesis");
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth" });
    }
    scrollCue?.addEventListener("click", onScrollCue);
    cleanups.push(() => scrollCue?.removeEventListener("click", onScrollCue));

    if (reduced) return () => cleanups.forEach((fn) => fn());

    gsap.registerPlugin(ScrollTrigger);
    /* iOS: don't refresh (and jump scrubbed tweens) when the URL bar resizes the viewport */
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      /* Heading reveals (masked lines) */
      const headings = gsap.utils.toArray<HTMLElement>("[data-lines]");
      const heroHeadline = document.querySelector<HTMLElement>(".hero-headline");

      function buildHeadingReveal(el: HTMLElement) {
        const inners = splitToLines(el);
        gsap.set(el, { opacity: 1 });
        if (el.dataset.done === "1") {
          gsap.set(inners, { yPercent: 0 });
          return;
        }
        gsap.set(inners, { yPercent: 115 });
        gsap.to(inners, {
          yPercent: 0,
          duration: 1.25,
          ease: "power4.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
          onComplete: () => {
            el.dataset.done = "1";
          },
        });
      }

      /* Hero intro. The page is usually reached by client-side navigation
         while the shell crossfades to Capital's palette, so the headline
         writes itself in as the colours settle. */
      function heroIntro(fast: boolean) {
        if (!heroHeadline) return;
        const inners = splitToLines(heroHeadline);
        gsap.set(heroHeadline, { opacity: 1 });
        gsap.set(inners, { yPercent: 115 });
        heroHeadline.dataset.done = "1";
        const tl = gsap.timeline({ delay: fast ? 0.1 : 0 });
        tl.to(inners, { yPercent: 0, duration: 1.35, ease: "power4.out", stagger: 0.1 }, 0)
          .fromTo(
            ".hero [data-hero]",
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.14 },
            0.4,
          );
      }

      const fontsReady = new Promise<void>((resolve) => {
        let done = false;
        function finish() {
          if (!done) {
            done = true;
            resolve();
          }
        }
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(finish);
        setTimeout(finish, 900);
      });

      fontsReady.then(() => {
        headings.forEach((el) => {
          if (el === heroHeadline) return;
          buildHeadingReveal(el);
        });

        heroIntro(window.scrollY > 60);

        ScrollTrigger.refresh();
      });

      /* Hero parallax on scroll-away — fine pointers only. Touch scroll events
         arrive in bursts (iOS momentum), so scrubbed transforms visibly jump. */
      if (!matchMedia("(pointer: coarse)").matches) {
        gsap.to(".hero-content", {
          y: -64,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });
      }

      /* Scroll reveals. Each variant gets its own distance, duration, and ease —
         when everything moves identically the eye groups it as one mass (common
         fate), which is precisely what reads as flat. */
      /* Below 860px the paired grids stack, so a left/right entrance no longer
         says anything about their relationship — and an in-flight x offset on a
         full-width column briefly widens the document. Fall back to "up". */
      const stacked = matchMedia("(max-width: 860px)").matches;

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        let kind = el.getAttribute("data-reveal") || "up";
        if (stacked && (kind === "left" || kind === "right")) kind = "up";
        const spec = REVEALS[kind] ?? REVEALS.up;
        gsap.fromTo(el, spec.from, {
          ...spec.to,
          duration: spec.duration,
          ease: spec.ease,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      /* Grouped reveals (rows, points, FAQ items). Where a group declares
         data-rules, the hairlines draw first so the structure exists before the
         content lands in it. */
      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const sel = group.getAttribute("data-reveal-group") || ".row";
        const children = group.querySelectorAll(sel);
        const ruleSel = group.getAttribute("data-rules");
        const rules = ruleSel ? group.querySelectorAll(ruleSel) : null;
        const vertical = ruleSel === ".rule--y";

        const tl = gsap.timeline({
          scrollTrigger: { trigger: group, start: "top 84%", once: true },
        });

        if (rules && rules.length) {
          tl.fromTo(
            rules,
            vertical ? { scaleY: 0 } : { scaleX: 0 },
            {
              ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
              duration: vertical ? 0.9 : 0.8,
              ease: "power2.inOut",
              stagger: 0.06,
            },
            0,
          );
        }

        tl.fromTo(
          children,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
          rules && rules.length ? 0.18 : 0,
        );
      });

      /* Manifesto: scrubbed word-by-word reveal */
      const manifesto = document.querySelector<HTMLElement>("[data-scrub-words]");
      if (manifesto) {
        const words = wrapWords(manifesto);
        gsap.to(words, {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: manifesto, start: "top 80%", end: "top 30%", scrub: 0.5 },
        });
      }

      /* Magnetic CTAs (fine pointers only). The cursor itself stays native:
         the light on the pattern (PatternLight) is the page's pointer response. */
      if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const magneticEls = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
        const magneticHandlers: Array<() => void> = [];
        magneticEls.forEach((el) => {
          const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            gsap.to(el, { x: dx * 0.22, y: dy * 0.28, duration: 0.5, ease: "power3.out" });
          };
          const onLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.45)" });
          };
          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseleave", onLeave);
          magneticHandlers.push(() => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
          });
        });

        cleanups.push(() => magneticHandlers.forEach((fn) => fn()));
      }

      /* Re-split headings on real width changes */
      let lastW = window.innerWidth;
      let resizeTimer: ReturnType<typeof setTimeout> | null = null;
      function onResize() {
        if (Math.abs(window.innerWidth - lastW) < 60) return;
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          lastW = window.innerWidth;
          headings.forEach((el) => {
            if (el === heroHeadline) {
              const inners = splitToLines(el);
              gsap.set(el, { opacity: 1 });
              gsap.set(inners, { yPercent: 0 });
            } else {
              buildHeadingReveal(el);
            }
          });
          ScrollTrigger.refresh();
        }, 250);
      }
      window.addEventListener("resize", onResize);
      cleanups.push(() => {
        window.removeEventListener("resize", onResize);
        if (resizeTimer) clearTimeout(resizeTimer);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return null;
}
