import type { Metadata } from "next"

import { ServerQueueView } from "@/components/features/servidor/server-queue-view"

export const metadata: Metadata = {
  title: "Fila de atendimento",
}

export default function ServerQueuePage() {
  return <ServerQueueView />
}
