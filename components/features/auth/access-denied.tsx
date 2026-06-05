"use client"

import { ShieldX } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { getHomeRoute, routes } from "@/lib/routes"

export function AccessDenied() {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-md rounded-lg border bg-card p-8 text-center">
        <ShieldX className="mx-auto size-8 text-destructive" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-semibold">Acesso negado</h1>
        <p className="mt-2 text-muted-foreground">
          Seu perfil nao possui permissao para acessar esta pagina.
        </p>
        <Button
          className="mt-6"
          onClick={() => router.replace(user ? getHomeRoute(user.role) : routes.login)}
        >
          Voltar para o inicio
        </Button>
      </section>
    </main>
  )
}
