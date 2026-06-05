import type { Metadata } from "next"

import { ProtocolSearchView } from "@/components/features/cidadao/protocol-search-view"
import { PageHeader } from "@/components/features/shared/page-header"

export const metadata: Metadata = {
  title: "Consultar protocolo",
}

export default function ProtocolSearchPage() {
  return (
    <>
      <PageHeader
        title="Consultar protocolo"
        description="Informe um protocolo para consultar os detalhes e o histórico."
      />
      <ProtocolSearchView />
    </>
  )
}
