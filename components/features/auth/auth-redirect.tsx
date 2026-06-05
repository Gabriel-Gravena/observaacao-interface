"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/hooks/use-auth"
import { getHomeRoute } from "@/lib/routes"

export function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace(getHomeRoute(user.role))
    }
  }, [router, user])

  if (isLoading || user) {
    return (
      <p className="text-sm text-muted-foreground" role="status">
        Verificando sessao...
      </p>
    )
  }

  return children
}
