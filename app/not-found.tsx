import Link from "next/link"

import { EmptyState } from "@/components/features/shared/empty-state"
import { Button } from "@/components/ui/button"
import { routes } from "@/lib/routes"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <EmptyState
        className="w-full max-w-lg"
        title="Pagina nao encontrada"
        description="O endereco informado nao existe ou nao esta mais disponivel."
        action={
          <Button asChild>
            <Link href={routes.home}>Voltar para o inicio</Link>
          </Button>
        }
      />
    </main>
  )
}
