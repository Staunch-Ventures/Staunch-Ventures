"use client";

import { motion, useAnimation, useReducedMotion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * ScrollReveal — entrance animation on scroll-into-view, using an iOS-style
 * ease curve. Animates only opacity + transform (compositor-friendly) — no
 * `filter: blur()`, which is expensive to animate and the main source of
 * scroll jank on mobile GPUs. Honors `prefers-reduced-motion`.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  yOffset = 28,
  threshold = 0.15,
  triggerOnce = true,
}: ScrollRevealProps) {
  const controls = useAnimation();
  const reduce = useReducedMotion();
  const [ref, inView] = useInView({ triggerOnce, threshold });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger — reveals children in sequence. Wrap items in <StaggerItem>.
 */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  threshold = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  threshold?: number;
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  yOffset = 24,
}: {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
