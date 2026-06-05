"use client"

import { Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import { getApiErrorMessage } from "@/api/client"
import {
  deleteRequest,
  getRequest,
  getRequestHistory,
} from "@/api/solicitacoes"
import type { Request, RequestHistory } from "@/api/types"
import { RequestDetails } from "@/components/features/solicitacoes/request-details"
import { RequestForm } from "@/components/features/solicitacoes/request-form"
import { RequestHistoryTimeline } from "@/components/features/solicitacoes/request-history-timeline"
import { ConfirmDeleteDialog } from "@/components/features/shared/confirm-delete-dialog"
import { ErrorState } from "@/components/features/shared/error-state"
import { LoadingState } from "@/components/features/shared/loading-state"
import { PageHeader } from "@/components/features/shared/page-header"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCategorias } from "@/hooks/use-categorias"
import { routes } from "@/lib/routes"

export function CitizenRequestDetailsView({ id }: { id: string }) {
  const router = useRouter()
  const [request, setRequest] = useState<Request | null>(null)
  const [history, setHistory] = useState<RequestHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const {
    categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useCategorias()

  const loadDetails = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [requestData, historyData] = await Promise.all([
        getRequest(id),
        getRequestHistory(id),
      ])
      setRequest(requestData)
      setHistory(historyData)
    } catch (loadError) {
      setError(loadError)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    Promise.all([getRequest(id), getRequestHistory(id)]).then(
      ([requestData, historyData]) => {
        setRequest(requestData)
        setHistory(historyData)
        setIsLoading(false)
      },
      (loadError) => {
        setError(loadError)
        setIsLoading(false)
      }
    )
  }, [id])

  async function handleDelete() {
    if (!request) return
    setIsDeleting(true)
    try {
      await deleteRequest(request.id)
      router.replace(routes.citizenRequests)
    } catch (deleteError) {
      setError(deleteError)
      setIsDeleting(false)
    }
  }

  if (isLoading) return <LoadingState rows={6} />
  if (error || !request) {
    return <ErrorState description={getApiErrorMessage(error)} onRetry={loadDetails} />
  }

  return (
    <>
      <PageHeader
        title="Detalhe da solicitação"
        description="Consulte as informações e o histórico de atendimento."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditOpen(true)}>
              <Pencil />
              Editar
            </Button>
            <ConfirmDeleteDialog
              title="Excluir solicitação?"
              description="Esta ação não pode ser desfeita."
              isDeleting={isDeleting}
              onConfirm={handleDelete}
              trigger={
                <Button variant="destructive">
                  <Trash2 />
                  Excluir
                </Button>
              }
            />
          </div>
        }
      />
      <RequestDetails request={request} />
      <section className="surface-panel mt-6 p-5 sm:p-6">
        <h2 className="mb-5 text-lg font-semibold">Histórico</h2>
        <RequestHistoryTimeline history={history} />
      </section>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar solicitação</DialogTitle>
            <DialogDescription>Atualize as informações registradas.</DialogDescription>
          </DialogHeader>
          {categoriesLoading ? (
            <LoadingState rows={5} />
          ) : categoriesError ? (
            <ErrorState description={getApiErrorMessage(categoriesError)} />
          ) : (
            <RequestForm
              request={request}
              categories={categories.filter(
                (category) => category.ativa || category.id === request.categoriaId
              )}
              onCancel={() => setEditOpen(false)}
              onSuccess={(updatedRequest) => {
                setRequest(updatedRequest)
                setEditOpen(false)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
