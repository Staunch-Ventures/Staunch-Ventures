"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { AFRICA_PATH, GRATICULE_PATH, MAP_H, MAP_W, NODES, WORLD_PATH } from "./world-outline";

/**
 * The home hero's floating card: Staunch's promise, drawn as an engraved
 * chart rather than a dashboard. Hairline coastlines on a faint graticule,
 * Africa washed in the brand colour, and a fine arc out to each market with
 * one soft light travelling along it. Labels are set in serif, not pills.
 *
 * Depth: the card tilts toward the pointer anywhere on the page, and the
 * labels sit at different heights above it (translateZ), so they separate as
 * it turns. With no pointer it drifts on its own.
 */

type Market = "us" | "europe" | "asia";

const MARKETS: { id: Market; label: string; z: number; float: number; align: "left" | "right" }[] = [
  { id: "us", label: "United States", z: 50, float: 7, align: "left" },
  { id: "europe", label: "Europe", z: 72, float: 6, align: "left" },
  { id: "asia", label: "Asia", z: 40, float: 7.5, align: "right" },
];

/** A curve from the Africa hub to a market, bowed away from the equator. */
function arcPath(to: Market) {
  const [x1, y1] = NODES.africa;
  const [x2, y2] = NODES[to];
  const dist = Math.hypot(x2 - x1, y2 - y1);
  return `M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - dist * 0.3} ${x2} ${y2}`;
}

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export function HeroMap() {
  const fine = usePointerFine();
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const rotateX = useSpring(useTransform(ny, [-1, 1], [8, -8]), { stiffness: 80, damping: 22 });
  const rotateY = useSpring(useTransform(nx, [-1, 1], [-11, 11]), { stiffness: 80, damping: 22 });
  const ref = React.useRef<HTMLDivElement>(null);

  // Track the pointer across the whole viewport, relative to the card, so the
  // hero responds wherever the visitor's mouse is, not only over the card.
  React.useEffect(() => {
    if (!fine) return;
    const onMove = (e: MouseEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      nx.set(clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      ny.set(clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
    };
    const onLeave = () => {
      nx.set(0);
      ny.set(0);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [fine, nx, ny]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="relative mx-auto w-full max-w-[560px] [perspective:1200px]"
    >
      {/* A soft pool of light beneath the card */}
      <div
        className="pointer-events-none absolute -inset-12 -z-10 opacity-70"
        style={{ background: "radial-gradient(closest-side, hsl(var(--primary) / 0.16), transparent)" }}
        aria-hidden
      />

      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="hero-map__drift relative">
        <div
          className="border-lit relative rounded-2xl bg-card/90 px-6 pb-7 pt-7 shadow-float sm:px-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          <h2 className="font-serif text-2xl font-normal tracking-heading text-foreground sm:text-[1.75rem]">
            Connecting Africa to the world
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Four markets. One platform.</p>

          <div className="relative mt-8" style={{ transformStyle: "preserve-3d" }}>
            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="block h-auto w-full"
              role="img"
              aria-label="A map of Africa connected to the United States, Europe and Asia"
            >
              <defs>
                <radialGradient id="hm-africa" cx="50%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.42" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
                </radialGradient>
                <linearGradient id="hm-arc" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#e8cf9f" stopOpacity="0.55" />
                </linearGradient>
                {/* Fade the chart out at its edges, so it sits in the card like
                    an engraving rather than a cropped screenshot. */}
                <radialGradient id="hm-vignette" cx="50%" cy="50%" r="62%">
                  <stop offset="70%" stopColor="#fff" />
                  <stop offset="100%" stopColor="#000" />
                </radialGradient>
                <mask id="hm-fade">
                  <rect x="-10" y="-10" width={MAP_W + 20} height={MAP_H + 20} fill="url(#hm-vignette)" />
                </mask>
              </defs>

              <g mask="url(#hm-fade)">
                <path d={GRATICULE_PATH} fill="none" stroke="hsl(var(--foreground) / 0.06)" strokeWidth="0.5" />
                <path
                  d={WORLD_PATH}
                  fill="hsl(var(--foreground) / 0.035)"
                  stroke="hsl(var(--muted-foreground) / 0.4)"
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                />
                <path
                  d={AFRICA_PATH}
                  fill="url(#hm-africa)"
                  stroke="hsl(var(--primary) / 0.75)"
                  strokeWidth="0.7"
                  strokeLinejoin="round"
                />
              </g>

              {MARKETS.map((m, i) => {
                const d = arcPath(m.id);
                return (
                  <g key={m.id} fill="none" strokeLinecap="round">
                    <path d={d} stroke="url(#hm-arc)" strokeWidth="0.8" opacity="0.75" />
                    {/* The travelling light: a wide faint stroke under a fine
                        bright one reads as a glow, with no blur filter. */}
                    <path
                      d={d}
                      pathLength={100}
                      className="hero-map__light"
                      stroke="#f6e3bd"
                      strokeWidth="4"
                      opacity="0.18"
                      style={{ animationDelay: `${i * 2.3}s` }}
                    />
                    <path
                      d={d}
                      pathLength={100}
                      className="hero-map__light"
                      stroke="#fbeed3"
                      strokeWidth="1.2"
                      style={{ animationDelay: `${i * 2.3}s` }}
                    />
                  </g>
                );
              })}

              {MARKETS.map((m) => (
                <g key={m.id}>
                  <circle cx={NODES[m.id][0]} cy={NODES[m.id][1]} r="5.5" fill="none" stroke="hsl(var(--foreground) / 0.18)" strokeWidth="0.6" />
                  <circle cx={NODES[m.id][0]} cy={NODES[m.id][1]} r="2" fill="hsl(var(--card))" stroke="hsl(var(--foreground) / 0.8)" strokeWidth="0.8" />
                </g>
              ))}
              <circle cx={NODES.africa[0]} cy={NODES.africa[1]} r="8" fill="none" stroke="hsl(var(--primary) / 0.4)" strokeWidth="0.6" />
              <circle cx={NODES.africa[0]} cy={NODES.africa[1]} r="2.6" fill="hsl(var(--primary))" />
            </svg>

            {/* Market names, set in serif and lifted off the chart at different depths */}
            {MARKETS.map((m) => (
              <span
                key={m.id}
                className="pointer-events-none absolute"
                style={{
                  left: pct(NODES[m.id][0], MAP_W),
                  top: pct(NODES[m.id][1], MAP_H),
                  transform: `translate(${m.align === "left" ? "-4px" : "calc(-100% + 4px)"}, calc(-100% - 9px)) translateZ(${m.z}px)`,
                }}
              >
                <span
                  className="hero-map__float block whitespace-nowrap font-serif text-[15px] italic text-foreground/90 [text-shadow:0_1px_12px_hsl(var(--card))]"
                  style={{ animationDuration: `${m.float}s` }}
                >
                  {m.label}
                </span>
              </span>
            ))}
            <span
              className="pointer-events-none absolute"
              style={{
                left: pct(NODES.africa[0], MAP_W),
                top: pct(NODES.africa[1], MAP_H),
                transform: "translate(14px, 10px) translateZ(88px)",
              }}
            >
              <span
                className="hero-map__float block whitespace-nowrap font-serif text-[22px] italic leading-none text-primary [text-shadow:0_1px_14px_hsl(var(--card))]"
                style={{ animationDuration: "6.5s" }}
              >
                Africa
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
