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
import { routes } from "@/lib/routes"
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validations/auth"

export function RegisterForm() {
  const { signUp } = useAuth()
  const router = useRouter()
  const [apiError, setApiError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", cpf: "", telefone: "" },
  })

  async function onSubmit(values: RegisterFormValues) {
    setApiError("")
    try {
      await signUp({
        ...values,
        cpf: values.cpf || undefined,
        telefone: values.telefone || undefined,
      })
      router.replace(routes.citizenRequests)
    } catch (error) {
      setApiError(getApiErrorMessage(error, "Nao foi possivel criar sua conta."))
    }
  }

  return (
    <AuthCard
      title="Crie sua conta"
      description="Registre e acompanhe solicitacoes publicas do seu municipio."
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {apiError && <Alert>{apiError}</Alert>}
        <Field
          id="name"
          label="Nome"
          error={errors.name?.message}
          inputProps={{
            autoComplete: "name",
            "aria-invalid": Boolean(errors.name),
            ...register("name"),
          }}
        />
        <Field
          id="email"
          label="E-mail"
          error={errors.email?.message}
          inputProps={{
            type: "email",
            autoComplete: "email",
            "aria-invalid": Boolean(errors.email),
            ...register("email"),
          }}
        />
        <Field
          id="password"
          label="Senha"
          error={errors.password?.message}
          inputProps={{
            type: "password",
            autoComplete: "new-password",
            "aria-invalid": Boolean(errors.password),
            ...register("password"),
          }}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="cpf"
            label="CPF (opcional)"
            error={errors.cpf?.message}
            inputProps={{
              inputMode: "numeric",
              maxLength: 11,
              "aria-invalid": Boolean(errors.cpf),
              ...register("cpf"),
            }}
          />
          <Field
            id="telefone"
            label="Telefone (opcional)"
            error={errors.telefone?.message}
            inputProps={{
              inputMode: "tel",
              maxLength: 11,
              "aria-invalid": Boolean(errors.telefone),
              ...register("telefone"),
            }}
          />
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Criando conta..." : "Criar conta"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Ja possui uma conta?{" "}
          <Link className="font-medium text-primary hover:underline" href={routes.login}>
            Entrar
          </Link>
        </p>
      </form>
    </AuthCard>
  )
}

function Field({
  id,
  label,
  error,
  inputProps,
}: {
  id: string
  label: string
  error?: string
  inputProps: React.ComponentProps<typeof Input>
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...inputProps} />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
