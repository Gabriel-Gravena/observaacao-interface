"use client"

import { useCallback, useEffect, useState } from "react"

import { listCategories } from "@/api/categorias"
import type { Category } from "@/api/types"

export function useCategorias() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const reload = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      setCategories(await listCategories())
    } catch (loadError) {
      setError(loadError)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    listCategories().then(
      (data) => {
        setCategories(data)
        setIsLoading(false)
      },
      (loadError) => {
        setError(loadError)
        setIsLoading(false)
      }
    )
  }, [])

  return { categories, isLoading, error, reload }
}
