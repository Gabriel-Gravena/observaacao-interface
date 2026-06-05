import { Skeleton } from "@/components/ui/skeleton"

export function LoadingState({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-label="Carregando" role="status">
      <Skeleton className="h-8 w-48" />
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className="h-16 w-full" />
      ))}
      <span className="sr-only">Carregando dados...</span>
    </div>
  )
}
