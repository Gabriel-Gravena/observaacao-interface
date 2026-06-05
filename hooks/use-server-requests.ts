"use client"
import { useCallback, useEffect, useState } from "react"
import { listOverdueRequests, listRequests } from "@/api/solicitacoes"
import type { Request, RequestFilters } from "@/api/types"

export function useServerRequests(overdue = false, filters?: RequestFilters) {
  const [requests, setRequests] = useState<Request[]>([]), [isLoading, setLoading] = useState(true), [error, setError] = useState<unknown>(null)
  const load = useCallback(async () => { setLoading(true); setError(null); try { setRequests(overdue ? await listOverdueRequests() : await listRequests(filters)) } catch(e) { setError(e) } finally { setLoading(false) } }, [overdue, filters])
  useEffect(() => { (overdue ? listOverdueRequests() : listRequests(filters)).then(x => { setRequests(x); setLoading(false) }, e => { setError(e); setLoading(false) }) }, [overdue, filters])
  return { requests, isLoading, error, reload: load }
}
