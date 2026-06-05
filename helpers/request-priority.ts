import type { RequestPriority } from "@/api/types"
import { REQUEST_PRIORITY_LABELS } from "@/lib/constants"

export function formatPriorityLabel(priority: RequestPriority) {
  return REQUEST_PRIORITY_LABELS[priority]
}
