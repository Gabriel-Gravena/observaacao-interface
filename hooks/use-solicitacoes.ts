"use client"

import { useCallback, useEffect, useState } from "react"

import { listMyRequests } from "@/api/solicitacoes"
import type { Request } from "@/api/types"

export function useMyRequests() {
  const [requests, setRequests] = useState<Request[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const reload = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      setRequests(await listMyRequests())
    } catch (loadError) {
      setError(loadError)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    listMyRequests().then(
      (data) => {
        setRequests(data)
        setIsLoading(false)
      },
      (loadError) => {
        setError(loadError)
        setIsLoading(false)
      }
    )
  }, [])

  return { requests, isLoading, error, reload }
}
