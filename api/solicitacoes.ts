import { api } from "@/api/client"
import type { Request, RequestFilters, RequestHistory, RequestPayload, UpdateStatusPayload } from "@/api/types"

export async function listRequests(filters?: RequestFilters) {
  const { data } = await api.get<Request[]>("/solicitacoes", { params: filters })
  return data
}
export async function listOverdueRequests() {
  const { data } = await api.get<Request[]>("/solicitacoes/atrasadas")
  return data
}
export async function updateRequestStatus(id: string, payload: UpdateStatusPayload) {
  const { data } = await api.patch<Request>(`/solicitacoes/${id}/status`, payload)
  return data
}

export async function listMyRequests() {
  const { data } = await api.get<Request[]>("/solicitacoes/minhas")
  return data
}

export async function createRequest(payload: RequestPayload) {
  const { data } = await api.post<Request>("/solicitacoes", payload)
  return data
}

export async function getRequest(id: string) {
  const { data } = await api.get<Request>(`/solicitacoes/${id}`)
  return data
}

export async function getRequestByProtocol(protocol: string) {
  const { data } = await api.get<Request>(
    `/solicitacoes/protocolo/${encodeURIComponent(protocol)}`
  )
  return data
}

export async function updateRequest(id: string, payload: RequestPayload) {
  const { data } = await api.put<Request>(`/solicitacoes/${id}`, payload)
  return data
}

export async function getRequestHistory(id: string) {
  const { data } = await api.get<RequestHistory[]>(`/solicitacoes/${id}/historico`)
  return data
}

export async function deleteRequest(id: string) {
  await api.delete(`/solicitacoes/${id}`)
}
