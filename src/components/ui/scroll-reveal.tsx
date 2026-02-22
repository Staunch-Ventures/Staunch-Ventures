"use client";

import { motion, useAnimation, Variants } from "framer-motion";
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

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  yOffset = 24,
  threshold = 0.1,
  triggerOnce = true,
}: ScrollRevealProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: triggerOnce,
    threshold: threshold,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
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
