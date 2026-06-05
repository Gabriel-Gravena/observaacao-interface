import { CalendarDays, MapPin } from "lucide-react"
import Link from "next/link"

import type { Request } from "@/api/types"
import { PriorityBadge } from "@/components/features/solicitacoes/priority-badge"
import { ProtocolDisplay } from "@/components/features/solicitacoes/protocol-display"
import { StatusBadge } from "@/components/features/solicitacoes/status-badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/helpers/format-date"
import { citizenRequestRoute } from "@/lib/routes"

export function RequestList({ requests }: { requests: Request[] }) {
  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <article key={request.id} className="surface-panel group relative overflow-hidden p-4 transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-5">
          <span className="absolute inset-y-0 left-0 w-1 bg-primary/35 transition-colors group-hover:bg-primary" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <ProtocolDisplay protocol={request.protocolo} />
              <h2 className="mt-3 text-lg font-semibold tracking-tight">{request.titulo}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {request.categoriaNome}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={request.status} />
              <PriorityBadge priority={request.prioridade} />
            </div>
          </div>
          <div className="mt-5 grid gap-3 rounded-md bg-muted/45 p-3 text-sm text-muted-foreground sm:grid-cols-3">
            <span className="flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" />
              {request.bairro}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4" aria-hidden="true" />
              Aberta em {formatDate(request.createdAt)}
            </span>
            <span>Prazo alvo: {formatDate(request.prazoAlvo)}</span>
          </div>
          <div className="mt-4 flex justify-end border-t pt-4">
            <Button variant="outline" asChild>
              <Link href={citizenRequestRoute(request.id)}>Ver detalhes</Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  )
}
