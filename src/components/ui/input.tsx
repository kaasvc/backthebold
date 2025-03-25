
import * as React from "react"

import { cn } from "@/lib/utils"
import { InfoTooltip } from "./tooltip"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  tooltip?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, tooltip, ...props }, ref) => {
    return (
      <div className={cn("relative", tooltip && "pr-7")}>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        {tooltip && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <InfoTooltip content={tooltip} />
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
