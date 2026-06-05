"use client"

import { Plus } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"

import { getApiErrorMessage } from "@/api/client"
import {
  RequestFilters,
  type CitizenRequestFilters,
} from "@/components/features/solicitacoes/request-filters"
import { RequestList } from "@/components/features/solicitacoes/request-list"
import { EmptyState } from "@/components/features/shared/empty-state"
import { ErrorState } from "@/components/features/shared/error-state"
import { LoadingState } from "@/components/features/shared/loading-state"
import { PageHeader } from "@/components/features/shared/page-header"
import { Button } from "@/components/ui/button"
import { useMyRequests } from "@/hooks/use-solicitacoes"
import { REQUEST_STATUS_LABELS } from "@/lib/constants"
import { routes } from "@/lib/routes"

export function CitizenRequestsView() {
  const { requests, isLoading, error, reload } = useMyRequests()
  const [filters, setFilters] = useState<CitizenRequestFilters>({
    status: "TODOS",
    priority: "TODAS",
  })

  const filteredRequests = useMemo(
    () =>
      requests.filter(
        (request) =>
          (filters.status === "TODOS" || request.status === filters.status) &&
          (filters.priority === "TODAS" || request.prioridade === filters.priority)
      ),
    [filters, requests]
  )

  return (
    <>
      <PageHeader
        title="Minhas solicitações"
        description="Acompanhe o andamento das solicitações registradas por você."
        action={
          <Button asChild>
            <Link href={routes.citizenNewRequest}>
              <Plus />
              Abrir solicitação
            </Link>
          </Button>
        }
      />
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState description={getApiErrorMessage(error)} onRetry={reload} />
      ) : requests.length === 0 ? (
        <EmptyState
          title="Nenhuma solicitação para exibir"
          description="Abra uma solicitação para acompanhar o atendimento por aqui."
          action={
            <Button variant="outline" asChild>
              <Link href={routes.citizenNewRequest}>Abrir primeira solicitação</Link>
            </Button>
          }
        />
      ) : (
        <>
          <RequestSummary requests={requests} />
          <RequestFilters filters={filters} onChange={setFilters} />
          {filteredRequests.length ? (
            <RequestList requests={filteredRequests} />
          ) : (
            <EmptyState
              title="Nenhum resultado encontrado"
              description="Altere ou limpe os filtros para visualizar outras solicitações."
            />
          )}
        </>
      )}
    </>
  )
}

function RequestSummary({ requests }: { requests: ReturnType<typeof useMyRequests>["requests"] }) {
  const counts = Object.keys(REQUEST_STATUS_LABELS).map((status) => ({
    status,
    label: REQUEST_STATUS_LABELS[status as keyof typeof REQUEST_STATUS_LABELS],
    count: requests.filter((request) => request.status === status).length,
  }))

  return (
    <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {counts.map((item) => (
        <div key={item.status} className="surface-panel relative overflow-hidden p-4">
          <span className="absolute inset-y-0 left-0 w-1 bg-primary/45" />
          <p className="text-3xl font-semibold tracking-tight">{item.count}</p>
          <p className="mt-1 text-xs font-medium text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </section>
  )
}
