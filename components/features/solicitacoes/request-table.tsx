import { AlertTriangle, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

import type { Request } from "@/api/types"
import { PriorityBadge } from "@/components/features/solicitacoes/priority-badge"
import { StatusBadge } from "@/components/features/solicitacoes/status-badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/helpers/format-date"
import { isDeadlineNear, isRequestOverdue } from "@/helpers/request-deadline"
import { serverRequestRoute } from "@/lib/routes"

export function RequestTable({ requests }: { requests: Request[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Protocolo / titulo</TableHead>
          <TableHead>Local</TableHead>
          <TableHead>Prioridade</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Prazo</TableHead>
          <TableHead className="w-12"><span className="sr-only">Abrir</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => {
          const overdue = isRequestOverdue(request.prazoAlvo, request.status)
          const near = isDeadlineNear(request.prazoAlvo)
          return (
            <TableRow key={request.id} className={overdue ? "bg-destructive/5" : ""}>
              <TableCell>
                <Link className="font-semibold text-primary hover:underline" href={serverRequestRoute(request.id)}>
                  {request.protocolo}
                </Link>
                <p className="mt-1 max-w-72 truncate text-muted-foreground">{request.titulo}</p>
              </TableCell>
              <TableCell>
                <span className="font-medium">{request.bairro}</span>
                <p className="mt-1 text-xs text-muted-foreground">{request.categoriaNome}</p>
              </TableCell>
              <TableCell><PriorityBadge priority={request.prioridade} /></TableCell>
              <TableCell><StatusBadge status={request.status} /></TableCell>
              <TableCell>
                <span className={overdue ? "flex items-center gap-1.5 font-medium text-destructive" : near ? "flex items-center gap-1.5 font-medium text-priority-high-foreground" : "text-muted-foreground"}>
                  {overdue ? <AlertTriangle className="size-4" /> : near ? <Clock className="size-4" /> : null}
                  {formatDate(request.prazoAlvo)}
                </span>
              </TableCell>
              <TableCell>
                <Link href={serverRequestRoute(request.id)} className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-primary" aria-label={`Abrir ${request.protocolo}`}>
                  <ArrowRight className="size-4" />
                </Link>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
