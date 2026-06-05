"use client"

import { ErrorState } from "@/components/features/shared/error-state"

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <ErrorState
        title="Algo deu errado"
        description="Não foi possivel carregar esta pagina."
        onRetry={reset}
      />
    </main>
  )
}
