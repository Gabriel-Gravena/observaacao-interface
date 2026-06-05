import { AlertTriangle, ChevronsUp, Flag, Minus, type LucideIcon } from "lucide-react"

import type { RequestPriority } from "@/api/types"
import { Badge } from "@/components/ui/badge"
import { formatPriorityLabel } from "@/helpers/request-priority"
import { cn } from "@/lib/utils"

const priorityStyles: Record<RequestPriority, string> = {
  BAIXA: "border-transparent bg-priority-low text-priority-low-foreground",
  MEDIA: "border-transparent bg-priority-medium text-priority-medium-foreground",
  ALTA: "border-transparent bg-priority-high text-priority-high-foreground",
  CRITICA:
    "border-transparent bg-priority-critical text-priority-critical-foreground",
}

const priorityIcons: Record<RequestPriority, LucideIcon> = {
  BAIXA: Minus,
  MEDIA: Flag,
  ALTA: ChevronsUp,
  CRITICA: AlertTriangle,
}

export function PriorityBadge({
  priority,
  className,
}: {
  priority: RequestPriority
  className?: string
}) {
  const Icon = priorityIcons[priority]

  return (
    <Badge className={cn(priorityStyles[priority], className)}>
      <Icon aria-hidden="true" />
      {formatPriorityLabel(priority)}
    </Badge>
  )
}
