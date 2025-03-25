
import * as React from "react"

import { cn } from "@/lib/utils"
import { InfoTooltip } from "./tooltip"

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
  React.HTMLAttributes<HTMLHeadingElement> & { tooltip?: React.ReactNode }
>(({ className, tooltip, children, ...props }, ref) => (
  <div className="flex items-center gap-1.5">
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
    {tooltip && (
      <InfoTooltip content={tooltip} />
    )}
  </div>
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
  React.HTMLAttributes<HTMLDivElement> & { title?: string, icon?: React.ReactNode, tooltip?: React.ReactNode }
>(({ className, title, icon, tooltip, children, ...props }, ref) => (
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
        {tooltip && (
          <InfoTooltip content={tooltip} className="ml-1" />
        )}
      </div>
    )}
    {children}
  </div>
))
CardSection.displayName = "CardSection"

const CardInvestmentTerm = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    icon?: React.ReactNode, 
    title: string, 
    value: React.ReactNode, 
    description?: string,
    tooltip?: React.ReactNode,
    type?: string
  }
>(({ className, icon, title, value, description, tooltip, type, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-slate-200 bg-white p-4 flex flex-col",
      className
    )}
    {...props}
  >
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center gap-2">
        {icon && <span className="text-slate-500">{icon}</span>}
        <span className="font-medium text-sm">{title}</span>
        {tooltip && <InfoTooltip content={tooltip} className="ml-0.5" />}
      </div>
      {type && (
        <span className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-sm">
          {type}
        </span>
      )}
    </div>
    <div className="text-xl font-semibold mb-1">{value}</div>
    {description && <div className="text-xs text-slate-500">{description}</div>}
  </div>
))
CardInvestmentTerm.displayName = "CardInvestmentTerm"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardHighlight, 
  CardSection,
  CardInvestmentTerm
}
