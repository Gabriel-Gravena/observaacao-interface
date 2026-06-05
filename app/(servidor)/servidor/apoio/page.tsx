import type { Metadata } from "next"

import { ServerSupportView } from "@/components/features/servidor/server-support-view"

export const metadata: Metadata = {
  title: "Apoio Operacional",
}

export default function ApoioPage() {
  return <ServerSupportView />
}
