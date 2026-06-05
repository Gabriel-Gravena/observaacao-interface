import type { RequestStatus } from "@/api/types"
import { FINAL_REQUEST_STATUSES } from "@/lib/constants"

const DAY_IN_MS = 1000 * 60 * 60 * 24

export function calculateOverdueDays(deadline: string | Date, now = new Date()) {
  const difference = now.getTime() - new Date(deadline).getTime()
  return Math.max(0, Math.ceil(difference / DAY_IN_MS))
}

export function isRequestOverdue(
  deadline: string | Date,
  status: RequestStatus,
  now = new Date()
) {
  return !FINAL_REQUEST_STATUSES.includes(status) && new Date(deadline) < now
}

export function isDeadlineNear(deadline: string | Date, now = new Date()) {
  const difference = new Date(deadline).getTime() - now.getTime()
  return difference >= 0 && difference <= DAY_IN_MS * 2
}
