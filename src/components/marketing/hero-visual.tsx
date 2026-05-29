"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";

const spark = [18, 26, 22, 34, 30, 44, 40, 56, 52, 70, 66, 88];

function Sparkline() {
  const w = 280;
  const h = 80;
  const max = Math.max(...spark);
  const min = Math.min(...spark);
  const pts = spark.map((v, i) => {
    const x = (i / (spark.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * (h - 8) - 4;
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="heroSpark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(16 90% 57%)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(16 90% 57%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#heroSpark)" />
      <path d={line} fill="none" stroke="hsl(16 90% 57%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3.5" fill="hsl(16 90% 57%)" stroke="hsl(var(--card))" strokeWidth="2" />
    </svg>
  );
}

export function HeroVisual() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full max-w-md mx-auto perspective-1000"
    >
      {/* Glow pool beneath the card */}
      <div
        className="pointer-events-none absolute -inset-8 -z-10 blur-3xl opacity-70"
        style={{ background: "radial-gradient(circle at 55% 45%, hsl(16 90% 56% / 0.30), transparent 65%)" }}
      />

      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative">
        {/* Main dashboard surface */}
        <div className="border-lit relative rounded-2xl bg-card/80 backdrop-blur-2xl shadow-float p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Total NAV</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums">R5.31M</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 border border-success/25 px-2 py-1 text-xs font-medium text-success tabular-nums">
              <TrendingUp className="h-3 w-3" /> +18.4%
            </span>
          </div>

          <div className="mt-4">
            <Sparkline />
            <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>Jan</span><span>Jun</span><span>Dec</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-border bg-background/40 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">MRR</p>
              <p className="mt-0.5 text-base font-semibold tabular-nums">R450k</p>
            </div>
            <div className="rounded-xl border border-border bg-background/40 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Companies</p>
              <p className="mt-0.5 text-base font-semibold tabular-nums">12</p>
            </div>
          </div>
        </div>

        {/* Floating satellite chip — top right */}
        <motion.div
          style={{ transform: "translateZ(60px)" }}
          className="absolute -right-5 -top-5 border-lit rounded-xl bg-card/85 backdrop-blur-xl shadow-float px-3 py-2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">New valuation</p>
          <p className="text-sm font-semibold text-success tabular-nums">+R840k</p>
        </motion.div>

        {/* Floating satellite chip — bottom left */}
        <motion.div
          style={{ transform: "translateZ(40px)" }}
          className="absolute -left-6 bottom-6 border-lit rounded-xl bg-card/85 backdrop-blur-xl shadow-float px-3 py-2 flex items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 border border-primary/25">
            <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Deal closed</p>
            <p className="text-xs font-semibold">Series A · EdTech</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
