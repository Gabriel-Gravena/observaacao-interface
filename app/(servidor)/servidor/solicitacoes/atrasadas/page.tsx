import type { Metadata } from "next"

import { ServerQueueView } from "@/components/features/servidor/server-queue-view"

export const metadata: Metadata = {
  title: "Demandas atrasadas",
}

export default function OverdueRequestsPage() {
  return <ServerQueueView overdue />
}
