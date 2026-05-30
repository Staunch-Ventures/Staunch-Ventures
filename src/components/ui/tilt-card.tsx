"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePointerFine } from "@/hooks/use-pointer-fine";

/**
 * TiltCard — wraps content with a subtle 3D parallax tilt that follows the
 * pointer. Springy, premium, restrained (max ±6deg).
 *
 * On touch devices there is no pointer to follow, so we render the children
 * plainly — no springs, no listeners, no perspective wrapper.
 */
export function TiltCard({
  children,
  className,
  intensity = 6,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const fine = usePointerFine();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 140,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 140,
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

  if (!fine) {
    return <div className={cn("relative h-full w-full", className)}>{children}</div>;
  }

  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} className={cn("perspective-1000", className)}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
