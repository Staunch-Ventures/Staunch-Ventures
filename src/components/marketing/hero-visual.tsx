"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Wrench,
  Rocket,
  Compass,
  Network as NetworkIcon,
  Check,
} from "lucide-react";
import { usePointerFine } from "@/hooks/use-pointer-fine";

const services = [
  { icon: Wrench, label: "Tech architecture" },
  { icon: Rocket, label: "Go-to-market" },
  { icon: Compass, label: "Strategy frameworks" },
  { icon: NetworkIcon, label: "Network access" },
];

const sectors = ["EdTech", "HealthTech", "AgriTech", "Clean Energy"];

export function HeroVisual() {
  const fine = usePointerFine();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 18,
  });

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
      onMouseMove={fine ? onMove : undefined}
      onMouseLeave={fine ? onLeave : undefined}
      className="relative w-full max-w-md mx-auto perspective-1000"
    >
      {/* Glow pool beneath the card */}
      <div
        className="pointer-events-none absolute -inset-8 -z-10 blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(circle at 55% 45%, hsl(16 90% 56% / 0.30), transparent 65%)",
        }}
      />

      <motion.div
        style={fine ? { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" } : undefined}
        className="relative"
      >
        {/* Main surface — Cofounding-as-a-Service productized */}
        <div className="border-lit relative rounded-2xl bg-card/80 backdrop-blur-2xl shadow-float p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/90">
                Cofounding as a Service
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">
                Beyond capital.
              </p>
            </div>
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-success/15 border border-success/25 px-2 py-1 text-[10px] font-medium text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Active
            </span>
          </div>

          <ul className="mt-5 space-y-2.5">
            {services.map((s) => (
              <li
                key={s.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-3 py-2.5"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <s.icon className="h-3.5 w-3.5 text-primary" strokeWidth={1.75} />
                </span>
                <span className="flex-1 text-sm font-medium">{s.label}</span>
                <Check className="h-4 w-4 text-success" strokeWidth={2.5} />
              </li>
            ))}
          </ul>

          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
              Sectors
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sectors.map((s, i) => (
                <span
                  key={s}
                  className={
                    i < 2
                      ? "rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-[11px] font-medium text-primary"
                      : "rounded-full bg-muted border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  }
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Floating chip — top right: featured venture */}
        <motion.div
          style={{ transform: "translateZ(60px)" }}
          className="absolute -right-5 -top-5 border-lit rounded-xl bg-card/85 backdrop-blur-xl shadow-float px-3 py-2.5 flex items-center gap-2.5"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-[hsl(264_30%_18%)] text-xs font-semibold">
            BL
          </div>
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Now backing
            </p>
            <p className="text-sm font-semibold">Bag Learning</p>
            <p className="text-[10px] text-primary font-medium tracking-wider">
              EDTECH
            </p>
          </div>
        </motion.div>

        {/* Floating chip — bottom left: network signal */}
        <motion.div
          style={{ transform: "translateZ(40px)" }}
          className="absolute -left-6 bottom-8 border-lit rounded-xl bg-card/85 backdrop-blur-xl shadow-float px-3 py-2 flex items-center gap-2.5"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 border border-primary/25">
            <NetworkIcon className="h-3.5 w-3.5 text-primary" strokeWidth={1.75} />
          </span>
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Reach
            </p>
            <p className="text-xs font-semibold">Cross-border network</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
