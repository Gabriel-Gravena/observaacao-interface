"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"

import { getApiErrorMessage } from "@/api/client"
import { createRequest, updateRequest } from "@/api/solicitacoes"
import type { Category, Request } from "@/api/types"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { REQUEST_PRIORITY_LABELS } from "@/lib/constants"
import {
  requestSchema,
  type RequestFormValues,
} from "@/lib/validations/request"

export function RequestForm({
  categories,
  request,
  onSuccess,
  onCancel,
}: {
  categories: Category[]
  request?: Request
  onSuccess: (request: Request) => void
  onCancel?: () => void
}) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      titulo: request?.titulo ?? "",
      descricao: request?.descricao ?? "",
      bairro: request?.bairro ?? "",
      endereco: request?.endereco ?? "",
      prioridade: request?.prioridade ?? "MEDIA",
      anonima: request?.anonima ?? false,
      categoriaId: request?.categoriaId ?? "",
    },
  })

  const selectedCategoryId = useWatch({ control, name: "categoriaId" })
  const selectedCategory = categories.find((category) => category.id === selectedCategoryId)
  const sensitiveCategory = Boolean(selectedCategory?.sensivel)

  async function onSubmit(values: RequestFormValues) {
    try {
      const payload = {
        ...values,
        endereco: values.endereco || undefined,
        anonima: sensitiveCategory || values.anonima,
      }
      const savedRequest = request
        ? await updateRequest(request.id, payload)
        : await createRequest(payload)
      onSuccess(savedRequest)
    } catch (error) {
      setError("root", { message: getApiErrorMessage(error) })
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      {errors.root?.message && <Alert>{errors.root.message}</Alert>}
      {categories.length === 0 && (
        <Alert>Não ha categorias disponiveis para salvar esta solicitação.</Alert>
      )}
      <Field label="Titulo" htmlFor="titulo" error={errors.titulo?.message}>
        <Input id="titulo" aria-invalid={Boolean(errors.titulo)} {...register("titulo")} />
      </Field>
      <Field label="Descricao" htmlFor="descricao" error={errors.descricao?.message}>
        <Textarea
          id="descricao"
          aria-invalid={Boolean(errors.descricao)}
          {...register("descricao")}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Bairro" htmlFor="bairro" error={errors.bairro?.message}>
          <Input id="bairro" aria-invalid={Boolean(errors.bairro)} {...register("bairro")} />
        </Field>
        <Field label="Endereco (opcional)" htmlFor="endereco" error={errors.endereco?.message}>
          <Input id="endereco" {...register("endereco")} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Categoria" htmlFor="categoriaId" error={errors.categoriaId?.message}>
          <select
            id="categoriaId"
            className="h-9 w-full rounded-md border border-input bg-background px-2.5 text-sm"
            aria-invalid={Boolean(errors.categoriaId)}
            {...register("categoriaId", {
              onChange: (event) => {
                const category = categories.find((item) => item.id === event.target.value)
                if (category?.sensivel) setValue("anonima", true)
              },
            })}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nome}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Prioridade" htmlFor="prioridade" error={errors.prioridade?.message}>
          <select
            id="prioridade"
            className="h-9 w-full rounded-md border border-input bg-background px-2.5 text-sm"
            {...register("prioridade")}
          >
            {Object.entries(REQUEST_PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      {sensitiveCategory && (
        <p className="rounded-md bg-accent p-3 text-sm text-accent-foreground">
          Esta categoria exige anonimato para proteger sua identidade.
        </p>
      )}
      <Controller
        control={control}
        name="anonima"
        render={({ field }) => (
          <div className="flex items-start gap-3">
            <Checkbox
              id="anonima"
              checked={sensitiveCategory || field.value}
              disabled={sensitiveCategory}
              onCheckedChange={(checked) => field.onChange(Boolean(checked))}
            />
            <div>
              <Label htmlFor="anonima">Registrar como anonima</Label>
              <p className="mt-1 text-xs text-muted-foreground">
                Sua identidade não sera exibida durante o atendimento.
              </p>
            </div>
          </div>
        )}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting || categories.length === 0}>
          {isSubmitting
            ? "Salvando..."
            : request
              ? "Salvar alteracoes"
              : "Abrir solicitação"}
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
