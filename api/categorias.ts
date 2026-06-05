import { api } from "@/api/client"
import type { Category, CategoryPayload } from "@/api/types"

export async function listCategories() {
  const { data } = await api.get<Category[]>("/categorias")
  return data
}
export async function createCategory(payload: CategoryPayload) {
  const { data } = await api.post<Category>("/categorias", payload); return data
}
export async function updateCategory(id: string, payload: CategoryPayload) {
  const { data } = await api.put<Category>(`/categorias/${id}`, payload); return data
}
export async function deleteCategory(id: string) { await api.delete(`/categorias/${id}`) }
