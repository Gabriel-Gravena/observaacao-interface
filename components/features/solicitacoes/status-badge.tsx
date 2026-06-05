import {
  CheckCircle2,
  CircleDot,
  CircleStop,
  Clock3,
  LoaderCircle,
  type LucideIcon,
} from "lucide-react"

import type { RequestStatus } from "@/api/types"
import { Badge } from "@/components/ui/badge"
import { formatStatusLabel } from "@/helpers/request-status"
import { cn } from "@/lib/utils"

const statusStyles: Record<RequestStatus, string> = {
  ABERTO: "border-transparent bg-status-open text-status-open-foreground",
  TRIAGEM: "border-transparent bg-status-triage text-status-triage-foreground",
  EM_EXECUCAO:
    "border-transparent bg-status-in-progress text-status-in-progress-foreground",
  RESOLVIDO:
    "border-transparent bg-status-resolved text-status-resolved-foreground",
  ENCERRADO: "border-transparent bg-status-closed text-status-closed-foreground",
}

const statusIcons: Record<RequestStatus, LucideIcon> = {
  ABERTO: CircleDot,
  TRIAGEM: Clock3,
  EM_EXECUCAO: LoaderCircle,
  RESOLVIDO: CheckCircle2,
  ENCERRADO: CircleStop,
}

export function StatusBadge({
  status,
  className,
}: {
  status: RequestStatus
  className?: string
}) {
  const Icon = statusIcons[status]

  return (
    <Badge className={cn(statusStyles[status], className)}>
      <Icon aria-hidden="true" />
      {formatStatusLabel(status)}
    </Badge>
  )
}
