"use client"

import { useCallback, useEffect, useState } from "react"

import { listCategories } from "@/api/categorias"
import type { Category } from "@/api/types"

let hasSeeded = false

export function useCategorias() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const reload = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      let data = await listCategories()
      
      // Auto-seed if empty
      if (data.length === 0 && !hasSeeded) {
        hasSeeded = true
        try {
          const { createCategory } = await import("@/api/categorias")
          await createCategory({ nome: "Iluminação Pública", descricao: "Postes apagados ou lâmpadas queimadas", ativa: true, sensivel: false })
          await createCategory({ nome: "Buraco na Via", descricao: "Asfalto danificado ou crateras", ativa: true, sensivel: false })
          await createCategory({ nome: "Limpeza Urbana", descricao: "Lixo acumulado ou terrenos baldios", ativa: true, sensivel: false })
          await createCategory({ nome: "Denúncia Anônima", descricao: "Relato sigiloso de irregularidades", ativa: true, sensivel: true })
          data = await listCategories()
        } catch (seedErr) {
          console.error("Failed to seed categories", seedErr)
        }
      }
      
      setCategories(data)
    } catch (loadError) {
      setError(loadError)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { categories, isLoading, error, reload }
}
