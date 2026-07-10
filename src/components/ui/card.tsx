import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "relative rounded-2xl text-card-foreground transition-all duration-300",
  {
    variants: {
      variant: {
        // Default — near-opaque surface, gradient-lit rim, layered depth.
        // No backdrop-blur on content cards: browsers composite backdrop-filter
        // asynchronously, so a translucent card flashed the sharp background
        // pattern through it on first paint until the blur caught up. A high
        // fill opacity reads as a solid card from the first frame (and is
        // cheaper). The lit rim + shadow carry the depth the blur used to.
        default:
          "border-lit bg-card/90 shadow-elevated",
        // Subtle — quieter nested surface
        subtle:
          "bg-muted/80 border border-border/60",
        // Outline — structure without fill
        outline:
          "bg-transparent border border-border",
        // Glass — heavier blur, for the few floating overlays that want it
        glass:
          "border-lit bg-card/50 backdrop-blur-2xl shadow-glass",
        // Interactive — lifts and brightens on hover; for link cards
        interactive:
          "border-lit bg-card/90 shadow-elevated cursor-pointer hover:-translate-y-1 hover:shadow-float",
        // Brand — terracotta-tinted depth for the one signature surface
        brand:
          "border-lit bg-[linear-gradient(160deg,hsl(var(--primary)/0.14),transparent_55%),hsl(var(--card)/0.92)] shadow-elevated",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative z-[2] flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative z-[2] p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative z-[2] flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
