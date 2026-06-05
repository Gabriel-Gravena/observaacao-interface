import { CircleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ErrorState({
  title = "Não foi possivel carregar os dados",
  description = "Tente novamente em alguns instantes.",
  onRetry,
}: {
  title?: string
  description?: string
  onRetry?: () => void
}) {
  return (
    <section className="rounded-lg border border-destructive/30 bg-destructive/5 p-6">
      <CircleAlert className="size-6 text-destructive" aria-hidden="true" />
      <h2 className="mt-3 font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      {onRetry && (
        <Button className="mt-4" variant="outline" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </section>
  )
}
