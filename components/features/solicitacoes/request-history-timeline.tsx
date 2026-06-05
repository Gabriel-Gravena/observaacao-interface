import { MessageSquareText } from "lucide-react"

import type { RequestHistory } from "@/api/types"
import { StatusBadge } from "@/components/features/solicitacoes/status-badge"
import { formatDateTime } from "@/helpers/format-date"

export function RequestHistoryTimeline({
  history,
}: {
  history: RequestHistory[]
}) {
  if (history.length === 0) {
    return (
      <p className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
        Nenhuma atualização registrada.
      </p>
    )
  }

  return (
    <ol className="space-y-0" aria-label="Histórico da solicitação">
      {history.map((item, index) => (
        <li key={item.id} className="relative grid grid-cols-[1.25rem_1fr] gap-3 pb-6">
          {index < history.length - 1 && (
            <span
              className="absolute top-5 bottom-0 left-[0.5625rem] w-px bg-border"
              aria-hidden="true"
            />
          )}
          <span className="relative mt-1 flex size-5 items-center justify-center rounded-full border bg-card">
            <span className="size-2 rounded-full bg-primary" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={item.statusNovo} />
              <time className="text-xs text-muted-foreground" dateTime={item.createdAt}>
                {formatDateTime(item.createdAt)}
              </time>
            </div>
            <p className="mt-2 flex gap-2 text-sm">
              <MessageSquareText
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <span>{item.comentario}</span>
            </p>
            {item.servidorNome && (
              <p className="mt-1 text-xs text-muted-foreground">
                Registrado por {item.servidorNome}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
