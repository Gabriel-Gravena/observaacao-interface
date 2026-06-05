import type { UserRole } from "@/api/types"

export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  accessDenied: "/acesso-negado",
  citizenRequests: "/cidadao/solicitacoes",
  citizenNewRequest: "/cidadao/solicitacoes/nova",
  citizenProtocolSearch: "/cidadao/consultar-protocolo",
  serverDashboard: "/servidor/dashboard",
  serverQueue: "/servidor/solicitacoes",
  serverSupport: "/servidor/apoio",
  serverCategories: "/servidor/categorias",
} as const

export function getHomeRoute(role: UserRole) {
  return role === "CIDADAO" ? routes.citizenRequests : routes.serverQueue
}

export function citizenRequestRoute(id: string) {
  return `${routes.citizenRequests}/${id}`
}
export function serverRequestRoute(id: string) { return `${routes.serverQueue}/${id}` }
