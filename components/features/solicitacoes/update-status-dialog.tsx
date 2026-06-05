"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { getApiErrorMessage } from "@/api/client"
import { updateRequestStatus } from "@/api/solicitacoes"
import type { Request } from "@/api/types"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatStatusLabel, getNextStatus } from "@/helpers/request-status"
import {
  statusUpdateSchema,
  type StatusUpdateFormValues,
} from "@/lib/validations/server"

export function UpdateStatusDialog({
  request,
  onSuccess,
}: {
  request: Request
  onSuccess: (request: Request) => void
}) {
  const [open, setOpen] = useState(false)
  const nextStatus = getNextStatus(request.status)
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<StatusUpdateFormValues>({
    resolver: zodResolver(statusUpdateSchema),
    defaultValues: { comentario: "" },
  })

  if (!nextStatus) return null

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) reset()
  }

  async function submit(values: StatusUpdateFormValues) {
    const targetStatus = nextStatus
    if (!targetStatus) return

    try {
      const updated = await updateRequestStatus(request.id, {
        status: targetStatus,
        comentario: values.comentario.trim(),
      })
      onSuccess(updated)
      handleOpenChange(false)
    } catch (submitError) {
      setError("root", { message: getApiErrorMessage(submitError) })
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Atualizar para {formatStatusLabel(nextStatus)}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar atualização de status</DialogTitle>
          <DialogDescription>
            A solicitação avancara para {formatStatusLabel(nextStatus)}.
          </DialogDescription>
        </DialogHeader>
        {errors.root?.message && <Alert>{errors.root.message}</Alert>}
        <div className="space-y-2">
          <Label htmlFor="status-comment">Comentario obrigatorio</Label>
          <Textarea
            id="status-comment"
            aria-invalid={Boolean(errors.comentario)}
            {...register("comentario")}
          />
          {errors.comentario?.message && (
            <p className="text-sm text-destructive">{errors.comentario.message}</p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit(submit)} disabled={isSubmitting}>
            {isSubmitting ? "Atualizando..." : "Confirmar atualização"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
