import axios from "axios"

import type { ApiErrorResponse } from "@/api/types"
import { routes } from "@/lib/routes"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isAuthRequest = ["/auth/login", "/auth/register", "/auth/me"].some(
      (path) => error.config?.url?.includes(path)
    )
    if (
      typeof window !== "undefined" &&
      error.response?.status === 401 &&
      !isAuthRequest &&
      !window.location.pathname.startsWith(routes.login) &&
      !window.location.pathname.startsWith(routes.register)
    ) {
      window.dispatchEvent(new Event("observaação:unauthorized"))
      window.location.assign(routes.login)
    }

    if (
      typeof window !== "undefined" &&
      error.response?.status === 403 &&
      !isAuthRequest &&
      window.location.pathname !== routes.accessDenied
    ) {
      try {
        await api.get("/auth/me")
        window.location.assign(routes.accessDenied)
      } catch {
        window.dispatchEvent(new Event("observaação:unauthorized"))
        window.location.assign(routes.login)
      }
    }

    return Promise.reject(error)
  }
)

export function getApiErrorMessage(
  error: unknown,
  fallback = "Não foi possivel concluir a solicitação."
) {
  if (!axios.isAxiosError<ApiErrorResponse | string>(error)) {
    return fallback
  }

  const data = error.response?.data

  if (typeof data === "string" && data.trim()) {
    return data
  }

  if (data && typeof data === "object") {
    return data.message ?? data.error ?? fallback
  }

  return fallback
}
