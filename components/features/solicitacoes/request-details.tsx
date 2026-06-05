import { CalendarDays, EyeOff, MapPin } from "lucide-react"

import type { Request } from "@/api/types"
import { PriorityBadge } from "@/components/features/solicitacoes/priority-badge"
import { ProtocolDisplay } from "@/components/features/solicitacoes/protocol-display"
import { StatusBadge } from "@/components/features/solicitacoes/status-badge"
import { formatDateTime } from "@/helpers/format-date"
import { cn } from "@/lib/utils"

export function RequestDetails({ request }: { request: Request }) {
  return (
    <section className="surface-raised overflow-hidden">
      <div className="h-1.5 bg-primary" />
      <div className="p-5 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <ProtocolDisplay protocol={request.protocolo} />
          <h2 className="mt-4 text-xl font-semibold">{request.titulo}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{request.categoriaNome}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={request.status} />
          <PriorityBadge priority={request.prioridade} />
        </div>
      </div>
      <dl className="mt-7 grid gap-3 border-t pt-6 sm:grid-cols-2">
        <Detail label="Descrição" className="sm:col-span-2">
          {request.descricao}
        </Detail>
        <Detail label="Localização">
          <span className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {request.endereco ? `${request.endereco}, ${request.bairro}` : request.bairro}
          </span>
        </Detail>
        <Detail label="Prazo Alvo">
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4" aria-hidden="true" />
            {formatDateTime(request.prazoAlvo)}
          </span>
        </Detail>
        <Detail label="Data de abertura">{formatDateTime(request.createdAt)}</Detail>
        <Detail label="Identificação">
          {request.anonima ? (
            <span className="flex items-center gap-2">
              <EyeOff className="size-4" aria-hidden="true" />
              Anônimo
            </span>
          ) : (
            request.cidadaoNome ?? "Não informado"
          )}
        </Detail>
      </dl></div>
    </section>
  )
}

function Detail({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("rounded-md bg-muted/45 p-4", className)}>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-2 text-sm">{children}</dd>
    </div>
  )
}
