"use client"

import { useMemo, useState } from "react"

import type { RequestFilters } from "@/api/types"
import { RequestTable } from "@/components/features/solicitacoes/request-table"
import { EmptyState } from "@/components/features/shared/empty-state"
import { ErrorState } from "@/components/features/shared/error-state"
import { LoadingState } from "@/components/features/shared/loading-state"
import { PageHeader } from "@/components/features/shared/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCategorias } from "@/hooks/use-categorias"
import { useServerRequests } from "@/hooks/use-server-requests"
import { REQUEST_PRIORITY_LABELS, REQUEST_STATUS_LABELS } from "@/lib/constants"

export function ServerQueueView({ overdue = false }: { overdue?: boolean }) {
  const [draft, setDraft] = useState<RequestFilters>({})
  const [filters, setFilters] = useState<RequestFilters>({})
  const stableFilters = useMemo(() => filters, [filters])
  const { requests, isLoading, error, reload } = useServerRequests(overdue, stableFilters)
  const { categories } = useCategorias()

  return (
    <>
      <PageHeader
        title={overdue ? "Demandas atrasadas" : "Fila de atendimento"}
        description={
          overdue
            ? "Solicitações com prazo alvo ultrapassado."
            : "Priorize e acompanhe as demandas recebidas."
        }
      />
      {!overdue && (
        <section className="surface-panel mb-5 grid gap-3 p-4 md:grid-cols-5">
          <Filter label="Bairro" htmlFor="bairro">
            <Input
              id="bairro"
              value={draft.bairro ?? ""}
              onChange={(event) =>
                setDraft({ ...draft, bairro: event.target.value || undefined })
              }
            />
          </Filter>
          <Filter label="Categoria" htmlFor="categoria">
            <FilterSelect
              id="categoria"
              value={draft.categoriaId}
              onChange={(value) => setDraft({ ...draft, categoriaId: value })}
              options={categories.map((category) => [category.id, category.nome])}
            />
          </Filter>
          <Filter label="Status" htmlFor="status">
            <FilterSelect
              id="status"
              value={draft.status}
              onChange={(value) =>
                setDraft({ ...draft, status: value as RequestFilters["status"] })
              }
              options={Object.entries(REQUEST_STATUS_LABELS)}
            />
          </Filter>
          <Filter label="Prioridade" htmlFor="prioridade">
            <FilterSelect
              id="prioridade"
              value={draft.prioridade}
              onChange={(value) =>
                setDraft({ ...draft, prioridade: value as RequestFilters["prioridade"] })
              }
              options={Object.entries(REQUEST_PRIORITY_LABELS)}
            />
          </Filter>
          <div className="flex items-end gap-2">
            <Button onClick={() => setFilters({ ...draft })}>Filtrar</Button>
            <Button
              variant="outline"
              onClick={() => {
                setDraft({})
                setFilters({})
              }}
            >
              Limpar
            </Button>
          </div>
        </section>
      )}
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState onRetry={reload} />
      ) : requests.length ? (
        <RequestTable requests={requests} />
      ) : (
        <EmptyState
          title="Nenhuma solicitação encontrada"
          description="Não ha demandas para os criterios selecionados."
        />
      )}
    </>
  )
}

function Filter({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}

function FilterSelect({
  id,
  value,
  onChange,
  options,
}: {
  id: string
  value?: string
  onChange: (value: string | undefined) => void
  options: [string, string][]
}) {
  return (
    <select
      id={id}
      className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
      value={value ?? ""}
      onChange={(event) => onChange(event.target.value || undefined)}
    >
      <option value="">Todos</option>
      {options.map(([optionValue, label]) => (
        <option key={optionValue} value={optionValue}>
          {label}
        </option>
      ))}
    </select>
  )
}
