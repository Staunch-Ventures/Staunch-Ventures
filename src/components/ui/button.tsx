import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Default — solid brand. The primary action.
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
        // Brand — same as default but with the signature glow. One per page max.
        brand:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] shadow-primary-glow",
        // Outline — bordered, transparent fill. The neutral secondary.
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted hover:border-border-strong",
        // Subtle — soft surface, no border. Quiet tertiary.
        subtle:
          "bg-muted text-foreground hover:bg-muted/80",
        // Ghost — transparent with hover surface. Toolbar / link-like.
        ghost: "text-foreground/80 hover:bg-muted hover:text-foreground",
        // Link — inline text action
        link: "text-primary underline-offset-4 hover:underline h-auto p-0",
        // Destructive — destructive actions
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]",
        // Secondary kept for shadcn compat (used by some primitives)
        secondary:
          "bg-muted text-foreground hover:bg-muted/80",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-md",
        sm: "h-8 px-3 rounded-md text-xs",
        lg: "h-12 px-7 rounded-md text-base",
        xl: "h-14 px-8 rounded-md text-base",
        icon: "h-10 w-10 rounded-md",
        // Pill sizes — for nav, hero CTA, anywhere oval feels right
        pill: "h-10 px-6 rounded-full",
        "pill-lg": "h-12 px-7 rounded-full text-base",
        "pill-xl": "h-14 px-8 rounded-full text-base",
        "pill-sm": "h-8 px-4 rounded-full text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
