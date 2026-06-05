import type { RequestPriority, RequestStatus } from "@/api/types"

export const REQUEST_STATUS_ORDER: RequestStatus[] = [
  "ABERTO",
  "TRIAGEM",
  "EM_EXECUCAO",
  "RESOLVIDO",
  "ENCERRADO",
]

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  ABERTO: "Aberto",
  TRIAGEM: "Em triagem",
  EM_EXECUCAO: "Em execucao",
  RESOLVIDO: "Resolvido",
  ENCERRADO: "Encerrado",
}

export const REQUEST_PRIORITY_LABELS: Record<RequestPriority, string> = {
  BAIXA: "Baixa",
  MEDIA: "Media",
  ALTA: "Alta",
  CRITICA: "Critica",
}

export const FINAL_REQUEST_STATUSES: RequestStatus[] = ["RESOLVIDO", "ENCERRADO"]
