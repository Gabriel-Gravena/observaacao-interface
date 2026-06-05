import { Inbox } from "lucide-react"

import { cn } from "@/lib/utils"

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "surface-panel flex flex-col items-center border-dashed px-6 py-14 text-center",
        className
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground"><Inbox className="size-5" aria-hidden="true" /></span>
      <h2 className="mt-5 text-lg font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </section>
  )
}
