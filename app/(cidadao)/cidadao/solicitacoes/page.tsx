import type { Metadata } from "next"
import { CitizenRequestsView } from "@/components/features/cidadao/citizen-requests-view"

export const metadata: Metadata = {
  title: "Minhas solicitações",
}

export default function CitizenRequestsPage() {
  return <CitizenRequestsView />
}
