
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-slate-50 shadow-elegant hover:bg-slate-800 hover:shadow-premium active:scale-[0.98]",
        destructive:
          "bg-red-500 text-slate-50 shadow-elegant hover:bg-red-600 hover:shadow-premium active:scale-[0.98]",
        outline:
          "border border-slate-200 bg-white shadow-elegant hover:bg-slate-50 hover:text-slate-900 hover:shadow-premium active:scale-[0.98]",
        secondary:
          "bg-slate-100 text-slate-900 shadow-elegant hover:bg-slate-200 hover:shadow-premium active:scale-[0.98]",
        ghost: "hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]",
        link: "text-slate-900 underline-offset-4 hover:underline hover:text-slate-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
