"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/hooks/use-auth"
import { getHomeRoute, routes } from "@/lib/routes"

export function HomeRedirect() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      router.replace(user ? getHomeRoute(user.role) : routes.login)
    }
  }, [isLoading, router, user])

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-muted-foreground" role="status">
        Carregando ObservaAção...
      </p>
    </main>
  )
}
