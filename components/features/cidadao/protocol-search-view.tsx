"use client"

import { Search } from "lucide-react"
import { useState } from "react"

import { getApiErrorMessage } from "@/api/client"
import { getRequestByProtocol, getRequestHistory } from "@/api/solicitacoes"
import type { Request, RequestHistory } from "@/api/types"
import { RequestDetails } from "@/components/features/solicitacoes/request-details"
import { RequestHistoryTimeline } from "@/components/features/solicitacoes/request-history-timeline"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatProtocol } from "@/helpers/format-protocol"

export function ProtocolSearchView() {
  const [protocol, setProtocol] = useState("")
  const [request, setRequest] = useState<Request | null>(null)
  const [history, setHistory] = useState<RequestHistory[]>([])
  const [error, setError] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  async function handleSearch(event: React.FormEvent) {
    event.preventDefault()
    setError("")
    setRequest(null)
    setHistory([])
    setIsSearching(true)
    try {
      const foundRequest = await getRequestByProtocol(formatProtocol(protocol))
      const foundHistory = await getRequestHistory(foundRequest.id)
      setRequest(foundRequest)
      setHistory(foundHistory)
    } catch (searchError) {
      setError(getApiErrorMessage(searchError, "Protocolo nao encontrado."))
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="space-y-6">
      <form className="surface-raised border-l-4 border-l-primary p-5 sm:p-6" onSubmit={handleSearch}>
        <Label htmlFor="protocol">Protocolo</Label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Input
            id="protocol"
            value={protocol}
            onChange={(event) => setProtocol(event.target.value)}
            placeholder="OBS-2026-AB12CD34"
            required
          />
          <Button type="submit" disabled={isSearching || !protocol.trim()}>
            <Search />
            {isSearching ? "Consultando..." : "Consultar"}
          </Button>
        </div>
        {error && <Alert className="mt-4">{error}</Alert>}
      </form>
      {request && (
        <>
          <RequestDetails request={request} />
          <section className="rounded-lg border bg-card p-5 sm:p-6">
            <h2 className="mb-5 text-lg font-semibold">Historico</h2>
            <RequestHistoryTimeline history={history} />
          </section>
        </>
      )}
    </div>
  )
}
