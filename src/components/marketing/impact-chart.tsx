"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { useInView } from "react-intersection-observer";

// Shape only — deliberately unlabelled. Conveys trajectory, not a metric.
const shape = [
  { x: 1, y: 8 },
  { x: 2, y: 18 },
  { x: 3, y: 26 },
  { x: 4, y: 24 },
  { x: 5, y: 38 },
  { x: 6, y: 52 },
  { x: 7, y: 64 },
  { x: 8, y: 88 },
];

export function ImpactChart() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="flex h-full w-full flex-col">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Trajectory</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">Impact</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 border border-success/25 px-2.5 py-1 text-[11px] font-medium text-success">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Compounding
        </span>
      </div>

      <div className="relative mt-4 flex-grow min-h-[180px]">
        {inView && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={shape} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="impactFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="y"
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
                fill="url(#impactFill)"
                isAnimationActive
                animationDuration={1600}
                animationEasing="ease-out"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Backing founders building Africa&apos;s next chapter.
      </p>
    </div>
  );
}
