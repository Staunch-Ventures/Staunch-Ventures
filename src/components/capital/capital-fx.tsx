"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

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
 * The bars draw on the way Kanso's ensō did: every bar grows out from the
 * wordmark gap, left to right, the upper row upward and the lower row down.
 */
function drawBars(svg: SVGElement, opts: { duration: number; stagger: number }) {
  const tl = gsap.timeline();
  svg.querySelectorAll<SVGGElement>("[data-grow]").forEach((row) => {
    const origin = row.dataset.grow === "up" ? "50% 100%" : "50% 0%";
    tl.fromTo(
      row.querySelectorAll("rect"),
      { scaleY: 0, transformOrigin: origin },
      { scaleY: 1, duration: opts.duration, ease: "power3.inOut", stagger: opts.stagger },
      0,
    );
  });
  return tl;
}

/**
 * Motion for the Staunch Capital page, ported from the Kanso site. Everything
 * it touches outside the .capital subtree (html flags, body classes) is
 * removed again on unmount, so client navigation back into the main site
 * leaves nothing behind.
 */
export default function CapitalFX() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = root.classList.contains("reduced");
    const cleanups: Array<() => void> = [];
    let lenis: Lenis | null = null;

    /* Local time (Cape Town, SAST) */
    const timeEls = document.querySelectorAll<HTMLElement>("[data-time]");
    function tickClock() {
      try {
        const t = new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Africa/Johannesburg",
        }).format(new Date());
        timeEls.forEach((el) => (el.textContent = t + " SAST"));
      } catch {
        /* leave blank */
      }
    }
    if (timeEls.length) tickClock();
    const clockInterval = timeEls.length ? setInterval(tickClock, 30000) : null;
    if (clockInterval) cleanups.push(() => clearInterval(clockInterval));

    /* Nav: frost on scroll, hide on scroll down / show on scroll up */
    const nav = document.getElementById("nav");
    const progressFillEl = document.getElementById("scrollProgress");
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      nav?.classList.toggle("scrolled", y > 24);
      if (progressFillEl) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressFillEl.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
      if (y > 560 && y > lastY + 4 && !document.body.classList.contains("menu-open")) {
        nav?.classList.add("nav-hidden");
      } else if (y < lastY - 4 || y <= 560) {
        nav?.classList.remove("nav-hidden");
      }
      lastY = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    /* Mobile menu */
    const burger = document.getElementById("burger");
    const menu = document.getElementById("mobileMenu");
    const menuClose = document.getElementById("menuClose");
    function openMenu() {
      menu?.classList.add("open");
      menu?.setAttribute("aria-hidden", "false");
      burger?.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
      if (lenis) lenis.stop();
      menuClose?.focus();
    }
    function closeMenu() {
      if (!menu?.classList.contains("open")) return;
      menu.classList.remove("open");
      menu.setAttribute("aria-hidden", "true");
      burger?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
      if (lenis && !root.classList.contains("is-loading")) lenis.start();
    }
    function toggleMenu() {
      if (menu?.classList.contains("open")) closeMenu();
      else openMenu();
    }
    burger?.addEventListener("click", toggleMenu);
    menuClose?.addEventListener("click", closeMenu);
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKeydown);
    cleanups.push(() => {
      burger?.removeEventListener("click", toggleMenu);
      menuClose?.removeEventListener("click", closeMenu);
      document.removeEventListener("keydown", onKeydown);
    });

    /* FAQ accordion (no GSAP needed) */
    const faqItems = Array.from(document.querySelectorAll<HTMLElement>(".faq-item"));
    const faqHandlers: Array<() => void> = [];
    faqItems.forEach((item) => {
      const btn = item.querySelector<HTMLButtonElement>(".faq-q");
      if (!btn) return;
      const handler = () => {
        const isOpen = item.classList.contains("open");
        faqItems.forEach((other) => {
          other.classList.remove("open");
          other.querySelector(".faq-q")?.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
        if (!reduced) setTimeout(() => ScrollTrigger.refresh(), 600);
      };
      btn.addEventListener("click", handler);
      faqHandlers.push(() => btn.removeEventListener("click", handler));
    });
    cleanups.push(() => faqHandlers.forEach((fn) => fn()));

    /* Scroll cue → glide to the first section */
    const scrollCue = document.getElementById("scrollCue");
    function onScrollCue() {
      const target = document.getElementById("fund");
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: -40, duration: 1.4 });
      else target.scrollIntoView({ behavior: "smooth" });
    }
    scrollCue?.addEventListener("click", onScrollCue);
    cleanups.push(() => scrollCue?.removeEventListener("click", onScrollCue));

    if (reduced) {
      root.classList.remove("is-loading");
      return () => cleanups.forEach((fn) => fn());
    }

    gsap.registerPlugin(ScrollTrigger);
    /* iOS: don't refresh (and jump scrubbed tweens) when the URL bar resizes the viewport */
    ScrollTrigger.config({ ignoreMobileResize: true });

    /* Lenis smooth scroll */
    lenis = new Lenis({ duration: 0.6, smoothWheel: true });
    root.classList.add("lenis-on");
    lenis.on("scroll", ScrollTrigger.update);
    function raf(time: number) {
      lenis?.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.stop();

    /* Anchor links: smooth via Lenis */
    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const anchorHandlers: Array<() => void> = [];
    anchors.forEach((a) => {
      const handler = (e: Event) => {
        const id = a.getAttribute("href");
        if (id === "#") return;
        const target = id ? document.querySelector<HTMLElement>(id) : null;
        if (!target) return;
        e.preventDefault();
        if (a.hasAttribute("data-menu-link")) closeMenu();
        if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.4 });
        else target.scrollIntoView({ behavior: "smooth" });
      };
      a.addEventListener("click", handler);
      anchorHandlers.push(() => a.removeEventListener("click", handler));
    });
    cleanups.push(() => anchorHandlers.forEach((fn) => fn()));

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

      /* Preloader + hero intro — plays on every fresh load; skipped only when
         the browser restored a mid-page scroll position (reload after scrolling) */
      const preloader = document.getElementById("preloader");
      const skipPreloader = window.scrollY > 60;

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
          )
          .fromTo("#heroMark", { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" }, 0.15);
        const heroMark = document.querySelector<SVGElement>("#heroMark");
        if (heroMark) tl.add(drawBars(heroMark, { duration: 1.6, stagger: 0.09 }), 0.2);
      }

      function releasePage() {
        root.classList.remove("is-loading");
        if (lenis && !document.body.classList.contains("menu-open")) lenis.start();
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

        if (skipPreloader || !preloader) {
          if (preloader) preloader.style.display = "none";
          releasePage();
          heroIntro(true);
        } else {
          const word = preloader.querySelector<HTMLElement>(".preloader__word");
          const line = preloader.querySelector<HTMLElement>(".preloader__line");
          gsap
            .timeline({ onComplete: () => (preloader.style.display = "none") })
            .fromTo(word, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.1)
            .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, 0.35)
            .to([word, line], { opacity: 0, duration: 0.4, ease: "power2.in" }, 1.35)
            .to(
              preloader,
              {
                yPercent: -100,
                duration: 0.9,
                ease: "power4.inOut",
                onStart: () => {
                  releasePage();
                  heroIntro(false);
                },
              },
              1.55,
            );
          setTimeout(() => {
            if (root.classList.contains("is-loading")) {
              preloader.style.display = "none";
              releasePage();
              heroIntro(true);
            }
          }, 4000);
        }

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
        gsap.to(".hero-mark", {
          y: 90,
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

        /* Symptom rows are written rather than faded: the numeral lands, then the
           line follows out from behind it. Targets .row__line, not .row__main —
           the latter owns a CSS hover transform an inline one would clobber. */
        if (group.classList.contains("rows--symptoms")) {
          tl.fromTo(
            group.querySelectorAll(".row__line"),
            { x: -16 },
            { x: 0, duration: 1.15, ease: "power3.out", stagger: 0.08, clearProps: "x" },
            0.26,
          );
        }
      });

      /* Differential depth. Motion parallax is a genuine monocular depth cue, but
         only in small doses — these factors stay inside 3–12%. Never applied to
         body copy: text parallax is where this technique gives itself away. */
      if (!matchMedia("(pointer: coarse)").matches) {
        gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) => {
          const factor = parseFloat(el.getAttribute("data-depth") || "0");
          if (!factor) return;
          const span = el.closest<HTMLElement>("section") || el;
          gsap.fromTo(
            el,
            { y: () => window.innerHeight * factor * 0.5 },
            {
              y: () => -window.innerHeight * factor * 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: span,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      }

      /* The recurring bar grounds. Each one is alive in the same four ways as the
         hero's: it draws itself on, turns continuously (CSS, on the rotor group),
         drifts with the pointer, and answers scroll. The three transforms are kept
         on separate elements — scroll on the wrapper, pointer on the svg, rotation
         on the rotor — so they never fight over the same matrix. */
      const ghostDrift = matchMedia("(hover: hover) and (pointer: fine)").matches;
      const ghostDrifters: Array<(nx: number, ny: number) => void> = [];

      gsap.utils.toArray<HTMLElement>("[data-bar-ghost]").forEach((ghost) => {
        /* Grounds the breakpoint has dropped get no triggers and no tweens. */
        if (getComputedStyle(ghost).display === "none") return;

        const span = ghost.closest<HTMLElement>("section") || ghost;
        const svg = ghost.querySelector<SVGElement>("svg");
        if (svg) {
          gsap.fromTo(
            svg,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: { trigger: span, start: "top 85%", once: true },
            },
          );
        }

        /* Every ground draws itself on, exactly as the hero's does. */
        if (svg) {
          ScrollTrigger.create({
            trigger: span,
            start: "top 82%",
            once: true,
            onEnter: () => drawBars(svg, { duration: 1.8, stagger: 0.1 }),
          });
          gsap.set(svg.querySelectorAll("rect"), { scaleY: 0 });
        }

        /* Pointer lean, scaled by the ring's own depth factor so the further-back
           grounds move least — the same cue the scroll parallax uses. */
        if (ghostDrift && svg) {
          const factor = (parseFloat(ghost.getAttribute("data-depth") || "0.1") || 0.1) / 0.1;
          const dx = gsap.quickTo(svg, "x", { duration: 1.4, ease: "power3.out" });
          const dy = gsap.quickTo(svg, "y", { duration: 1.4, ease: "power3.out" });
          ghostDrifters.push((nx, ny) => {
            dx(nx * 24 * factor);
            dy(ny * 17 * factor);
          });
        }

        /* Scroll drives scale only; the wave belongs to CSS. */
        gsap.fromTo(
          ghost,
          { scale: 0.94 },
          {
            scale: 1.06,
            ease: "none",
            scrollTrigger: { trigger: span, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      if (ghostDrifters.length) {
        const onGhostMove = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          ghostDrifters.forEach((fn) => fn(nx, ny));
        };
        window.addEventListener("mousemove", onGhostMove, { passive: true });
        cleanups.push(() => window.removeEventListener("mousemove", onGhostMove));
      }

      /* Process steps light as the drawn line reaches them, so the rail and the
         content read as one gesture. Reversible — it answers scrolling back up. */
      gsap.utils.toArray<HTMLElement>(".pstep").forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 62%",
          onEnter: () => step.classList.add("is-lit"),
          onLeaveBack: () => step.classList.remove("is-lit"),
        });
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

      /* Process: gold line draws down as you scroll */
      const processFill = document.getElementById("processFill");
      if (processFill) {
        gsap.to(processFill, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".process", start: "top 72%", end: "bottom 78%", scrub: 0.4 },
        });
      }

      /* Custom cursor + magnetic CTAs (fine pointers only) */
      const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (finePointer && document.querySelector(".cursor-dot") && document.querySelector(".cursor-ring")) {
        root.classList.add("cursor-on");
        const dot = document.querySelector<HTMLElement>(".cursor-dot")!;
        const ring = document.querySelector<HTMLElement>(".cursor-ring")!;
        const dotX = gsap.quickTo(dot, "x", { duration: 0.16, ease: "power3" });
        const dotY = gsap.quickTo(dot, "y", { duration: 0.16, ease: "power3" });
        const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
        const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
        let cursorShown = false;
        function onMouseMove(e: MouseEvent) {
          if (!cursorShown) {
            cursorShown = true;
            gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
            gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
          }
          dotX(e.clientX);
          dotY(e.clientY);
          ringX(e.clientX);
          ringY(e.clientY);
        }
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        function onMouseLeave() {
          gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
          cursorShown = false;
        }
        document.documentElement.addEventListener("mouseleave", onMouseLeave);
        function onMouseOver(e: MouseEvent) {
          if ((e.target as HTMLElement)?.closest?.("a, button")) root.classList.add("cursor-hover");
        }
        function onMouseOut(e: MouseEvent) {
          if ((e.target as HTMLElement)?.closest?.("a, button")) root.classList.remove("cursor-hover");
        }
        document.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseout", onMouseOut);

        /* Hero: the mark drifts gently with the pointer */
        const hero = document.querySelector<HTMLElement>(".hero");
        const markSvg = document.getElementById("heroMark");
        let onHeroMouseMove: ((e: MouseEvent) => void) | null = null;
        if (hero && markSvg) {
          const markX = gsap.quickTo(markSvg, "x", { duration: 1.2, ease: "power3.out" });
          const markY = gsap.quickTo(markSvg, "y", { duration: 1.2, ease: "power3.out" });
          onHeroMouseMove = (e: MouseEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            markX(nx * 34);
            markY(ny * 24);
          };
          hero.addEventListener("mousemove", onHeroMouseMove, { passive: true });
        }

        /* Magnetic CTAs */
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

        cleanups.push(() => {
          window.removeEventListener("mousemove", onMouseMove);
          document.documentElement.removeEventListener("mouseleave", onMouseLeave);
          document.removeEventListener("mouseover", onMouseOver);
          document.removeEventListener("mouseout", onMouseOut);
          if (hero && onHeroMouseMove) hero.removeEventListener("mousemove", onHeroMouseMove);
          magneticHandlers.forEach((fn) => fn());
        });
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
      root.classList.remove("lenis-on", "cursor-on", "cursor-hover", "is-loading");
      document.body.classList.remove("menu-open");
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
