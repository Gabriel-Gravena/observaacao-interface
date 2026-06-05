"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { getApiErrorMessage } from "@/api/client"
import AuthCard from "@/components/features/auth/auth-card"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { getHomeRoute, routes } from "@/lib/routes"
import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validations/auth"

export default function LoginForm() {
  const { signIn } = useAuth()
  const router = useRouter()
  const [apiError, setApiError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(values: LoginFormValues) {
    setApiError("")
    try {
      const user = await signIn(values)
      router.replace(getHomeRoute(user.role))
    } catch (error) {
      setApiError(getApiErrorMessage(error, "E-mail ou senha invalidos."))
    }
  }

  return (
    <AuthCard
      title="Entre na sua conta"
      description="Acompanhe solicitações ou acesse a fila de atendimento."
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        {apiError && <Alert>{apiError}</Alert>}
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nome@exemplo.com"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Ainda não possui uma conta?{" "}
          <Link className="font-medium text-primary hover:underline" href={routes.register}>
            Criar conta
          </Link>
        </p>
      </form>
    </AuthCard>
  )
}
