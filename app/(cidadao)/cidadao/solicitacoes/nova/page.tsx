import type { Metadata } from "next"

import { NewRequestView } from "@/components/features/cidadao/new-request-view"

export const metadata: Metadata = {
  title: "Abrir solicitação",
}

export default function NewRequestPage() {
  return <NewRequestView />
}
