import * as React from "react"
import { AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"

function Alert({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
        className
      )}
      {...props}
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div>{children}</div>
    </div>
  )
}

export { Alert }
