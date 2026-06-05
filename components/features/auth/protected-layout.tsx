"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import type { UserRole } from "@/api/types"
import { useAuth } from "@/hooks/use-auth"
import { routes } from "@/lib/routes"

export function ProtectedLayout({
  allowedRole,
  children,
}: {
  allowedRole: UserRole
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.replace(routes.login)
      return
    }

    if (user.role !== allowedRole) {
      router.replace(routes.accessDenied)
    }
  }, [allowedRole, isLoading, router, user])

  if (isLoading || !user || user.role !== allowedRole) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground" role="status">
          Verificando acesso...
        </p>
      </main>
    )
  }

  return children
}
