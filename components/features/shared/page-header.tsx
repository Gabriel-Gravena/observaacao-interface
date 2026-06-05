import { cn } from "@/lib/utils"

export function PageHeader({
  title,
  description,
  action,
  className,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <header
      className={cn(
        "mb-7 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="border-l-2 border-primary pl-4">
        <p className="eyebrow mb-2">ObservaAção</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  )
}
