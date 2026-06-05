import type { RequestStatus } from "@/api/types"
import { REQUEST_STATUS_LABELS, REQUEST_STATUS_ORDER } from "@/lib/constants"

export function formatStatusLabel(status: RequestStatus) {
  return REQUEST_STATUS_LABELS[status]
}

export function getNextStatus(status: RequestStatus): RequestStatus | null {
  const currentIndex = REQUEST_STATUS_ORDER.indexOf(status)
  return REQUEST_STATUS_ORDER[currentIndex + 1] ?? null
}
