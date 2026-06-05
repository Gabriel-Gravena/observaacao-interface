export type UserRole = "CIDADAO" | "SERVIDOR"
export type RequestStatus =
  | "ABERTO"
  | "TRIAGEM"
  | "EM_EXECUCAO"
  | "RESOLVIDO"
  | "ENCERRADO"
export type RequestPriority = "BAIXA" | "MEDIA" | "ALTA" | "CRITICA"

export interface User {
  id: string
  name: string
  email: string
  cpf: string | null
  telefone: string | null
  role: UserRole
  createdAt: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  cpf?: string
  telefone?: string
}

export interface ApiErrorResponse {
  message?: string
  error?: string
}

export interface Request {
  id: string
  protocolo: string
  titulo: string
  descricao: string
  bairro: string
  endereco: string | null
  status: RequestStatus
  prioridade: RequestPriority
  anonima: boolean
  categoriaId: string
  categoriaNome: string
  cidadaoId: string
  cidadaoNome: string | null
  prazoAlvo: string
  createdAt: string
  updatedAt: string | null
}

export interface RequestHistory {
  id: string
  solicitacaoId: string
  statusAnterior: RequestStatus | null
  statusNovo: RequestStatus
  comentario: string
  servidorId: string | null
  servidorNome: string | null
  createdAt: string
}

export interface Category {
  id: string
  nome: string
  descricao: string | null
  sensivel: boolean
  ativa: boolean
  createdAt: string
  updatedAt: string | null
}

export interface RequestPayload {
  titulo: string
  descricao: string
  bairro: string
  endereco?: string
  prioridade: RequestPriority
  anonima: boolean
  categoriaId: string
}

export interface RequestFilters {
  bairro?: string
  categoriaId?: string
  status?: RequestStatus
  prioridade?: RequestPriority
}
export interface UpdateStatusPayload { status: RequestStatus; comentario: string }
export interface CategoryPayload { nome: string; descricao?: string; sensivel: boolean; ativa: boolean }
