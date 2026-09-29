"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { AFRICA_DOTS, MAP_H, MAP_W, NODES, WORLD_DOTS } from "./world-dots";

/**
 * The home hero's floating card: Staunch's promise, drawn. A dotted world map
 * with Africa lit, arcs out to the US, Europe and Asia, and light travelling
 * both ways along them — terracotta outward (founders reaching new markets),
 * pale gold inward (capital arriving).
 *
 * Depth: the card tilts toward the pointer anywhere on the page, and the
 * market labels sit at different heights above it (translateZ), so they
 * separate as it turns. With no pointer it drifts on its own.
 */

type Market = "us" | "europe" | "asia";

const MARKETS: { id: Market; label: string; z: number; float: number }[] = [
  { id: "us", label: "United States", z: 56, float: 6.5 },
  { id: "europe", label: "Europe", z: 78, float: 5.5 },
  { id: "asia", label: "Asia", z: 44, float: 7 },
];

/** A curve from the Africa hub to a market, bowed away from the equator. */
function arcPath(to: Market) {
  const [x1, y1] = NODES.africa;
  const [x2, y2] = NODES[to];
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  return `M${x1} ${y1} Q${mx} ${my - dist * 0.32} ${x2} ${y2}`;
}

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export function HeroMap() {
  const fine = usePointerFine();
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const rotateX = useSpring(useTransform(ny, [-1, 1], [9, -9]), { stiffness: 90, damping: 20 });
  const rotateY = useSpring(useTransform(nx, [-1, 1], [-12, 12]), { stiffness: 90, damping: 20 });
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
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="hero-map relative mx-auto w-full max-w-[560px] [perspective:1200px]"
    >
      {/* Glow pool beneath the card */}
      <div
        className="pointer-events-none absolute -inset-10 -z-10 opacity-80"
        style={{ background: "radial-gradient(closest-side, hsl(var(--primary) / 0.22), transparent)" }}
        aria-hidden
      />

      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="hero-map__drift relative">
        <div
          className="border-lit relative rounded-2xl bg-card/90 p-5 shadow-float sm:p-6"
          style={{ transformStyle: "preserve-3d" }}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary/90">Cross-border by design</p>
          <p className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">Four markets. One platform.</p>

          <div className="relative mt-10 sm:mt-8" style={{ transformStyle: "preserve-3d" }}>
            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="block h-auto w-full"
              role="img"
              aria-label="A world map with Africa connected to the United States, Europe and Asia"
            >
              <defs>
                <radialGradient id="hub-glow">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={NODES.africa[0]} cy={NODES.africa[1] - 20} r="92" fill="url(#hub-glow)" />
              <path d={WORLD_DOTS} stroke="hsl(var(--muted-foreground) / 0.32)" strokeWidth="1.7" strokeLinecap="round" />
              <path d={AFRICA_DOTS} stroke="hsl(var(--primary))" strokeWidth="1.9" strokeLinecap="round" />

              {MARKETS.map((m, i) => {
                const d = arcPath(m.id);
                return (
                  <g key={m.id} fill="none" strokeLinecap="round">
                    <path d={d} stroke="hsl(var(--primary) / 0.55)" strokeWidth="1.2" strokeDasharray="1.5 3.5" />
                    <path
                      d={d}
                      pathLength={100}
                      className="hero-map__pulse hero-map__pulse--out"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      style={{ animationDelay: `${i * 0.9}s` }}
                    />
                    <path
                      d={d}
                      pathLength={100}
                      className="hero-map__pulse hero-map__pulse--in"
                      stroke="#f3d9a4"
                      strokeWidth="1.6"
                      style={{ animationDelay: `${1.6 + i * 1.1}s` }}
                    />
                  </g>
                );
              })}

              {MARKETS.map((m, i) => (
                <g key={m.id}>
                  <circle
                    className="hero-map__ping"
                    cx={NODES[m.id][0]}
                    cy={NODES[m.id][1]}
                    r="7"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                    style={{ animationDelay: `${i * 0.7}s` }}
                  />
                  <circle cx={NODES[m.id][0]} cy={NODES[m.id][1]} r="2.6" fill="hsl(var(--foreground))" />
                </g>
              ))}
              <circle className="hero-map__ping" cx={NODES.africa[0]} cy={NODES.africa[1]} r="10" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" />
              <circle cx={NODES.africa[0]} cy={NODES.africa[1]} r="3.6" fill="hsl(var(--primary))" />
            </svg>

            {/* Market labels, lifted off the card at different depths */}
            {MARKETS.map((m) => (
              <span
                key={m.id}
                className="pointer-events-none absolute"
                style={{
                  left: pct(NODES[m.id][0], MAP_W),
                  top: pct(NODES[m.id][1], MAP_H),
                  transform: `translate(-50%, calc(-100% - 10px)) translateZ(${m.z}px)`,
                }}
              >
                <span
                  className="hero-map__float block whitespace-nowrap rounded-full border border-border-strong/70 bg-card/95 px-2.5 py-1 text-[11px] font-medium shadow-float"
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
                transform: "translate(-12%, 14px) translateZ(96px)",
              }}
            >
              <span
                className="hero-map__float flex items-center gap-2.5 whitespace-nowrap rounded-xl border border-primary/30 bg-card/95 px-3 py-2 shadow-float"
                style={{ animationDuration: "6s" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">Home market</span>
                  <span className="block text-sm font-semibold">Africa</span>
                </span>
              </span>
            </span>
          </div>

          <div className="mt-4 flex items-center gap-5 border-t border-border pt-4 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              Founders out
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f3d9a4]" aria-hidden />
              Capital in
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
