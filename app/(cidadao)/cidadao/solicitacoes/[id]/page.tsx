import type { Metadata } from "next"

import { CitizenRequestDetailsView } from "@/components/features/cidadao/citizen-request-details-view"

export const metadata: Metadata = {
  title: "Detalhe da solicitação",
}

export default async function CitizenRequestDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <CitizenRequestDetailsView id={id} />
}
