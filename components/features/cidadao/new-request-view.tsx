"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { getApiErrorMessage } from "@/api/client"
import type { Request } from "@/api/types"
import { RequestForm } from "@/components/features/solicitacoes/request-form"
import { ProtocolDisplay } from "@/components/features/solicitacoes/protocol-display"
import { EmptyState } from "@/components/features/shared/empty-state"
import { ErrorState } from "@/components/features/shared/error-state"
import { LoadingState } from "@/components/features/shared/loading-state"
import { PageHeader } from "@/components/features/shared/page-header"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCategorias } from "@/hooks/use-categorias"
import { citizenRequestRoute } from "@/lib/routes"

export function NewRequestView() {
  const router = useRouter()
  const { categories, isLoading, error, reload } = useCategorias()
  const [createdRequest, setCreatedRequest] = useState<Request | null>(null)
  const activeCategories = categories.filter((category) => category.ativa)

  return (
    <>
      <PageHeader
        title="Abrir solicitação"
        description="Registre uma demanda publica para acompanhamento."
      />
      <section className="surface-raised p-5 sm:p-7">
        {isLoading ? (
          <LoadingState rows={5} />
        ) : error ? (
          <ErrorState description={getApiErrorMessage(error)} onRetry={reload} />
        ) : activeCategories.length === 0 ? (
          <EmptyState
            title="Nenhuma categoria disponivel"
            description="Não ha categorias ativas para abrir uma solicitação neste momento."
          />
        ) : (
          <RequestForm categories={activeCategories} onSuccess={setCreatedRequest} />
        )}
      </section>
      <Dialog open={Boolean(createdRequest)} onOpenChange={(open) => !open && setCreatedRequest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitação registrada</DialogTitle>
            <DialogDescription>
              Guarde o protocolo para acompanhar o andamento.
            </DialogDescription>
          </DialogHeader>
          {createdRequest && (
            <div className="rounded-md bg-accent p-4">
              <ProtocolDisplay protocol={createdRequest.protocolo} />
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() =>
                createdRequest && router.push(citizenRequestRoute(createdRequest.id))
              }
            >
              Ver detalhes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
