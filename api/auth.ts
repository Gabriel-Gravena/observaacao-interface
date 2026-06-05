import { api } from "@/api/client"
import type { LoginPayload, RegisterPayload, User } from "@/api/types"

export async function login(payload: LoginPayload) {
  const { data } = await api.post<User>("/auth/login", payload)
  return data
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post<User>("/auth/register", payload)
  return data
}

export async function logout() {
  await api.post("/auth/logout")
}

export async function getCurrentUser() {
  const { data } = await api.get<User>("/auth/me")
  return data
}
