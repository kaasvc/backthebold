
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
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
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const CardHighlight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { color?: "blue" | "pink" | "green" | "purple" | "orange" | "yellow" }
>(({ className, color = "blue", ...props }, ref) => {
  const colorClasses = {
    blue: "bg-soft-blue",
    pink: "bg-soft-pink",
    green: "bg-soft-green",
    purple: "bg-soft-purple",
    orange: "bg-soft-orange",
    yellow: "bg-soft-yellow"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-md p-3",
        colorClasses[color],
        className
      )}
      {...props}
    />
  );
})
CardHighlight.displayName = "CardHighlight"

const CardSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { title?: string, icon?: React.ReactNode }
>(({ className, title, icon, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mb-4 pb-3 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0",
      className
    )}
    {...props}
  >
    {(title || icon) && (
      <div className="flex items-center gap-1.5 mb-2.5 text-sm font-medium text-slate-600">
        {icon}
        {title}
      </div>
    )}
    {children}
  </div>
))
CardSection.displayName = "CardSection"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardHighlight, CardSection }
