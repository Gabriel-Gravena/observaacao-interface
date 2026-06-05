"use client"

import type { RequestPriority, RequestStatus } from "@/api/types"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  REQUEST_PRIORITY_LABELS,
  REQUEST_STATUS_LABELS,
} from "@/lib/constants"

export interface CitizenRequestFilters {
  status: RequestStatus | "TODOS"
  priority: RequestPriority | "TODAS"
}

export function RequestFilters({
  filters,
  onChange,
}: {
  filters: CitizenRequestFilters
  onChange: (filters: CitizenRequestFilters) => void
}) {
  return (
    <section className="surface-panel mb-5 flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-2">
        <Label htmlFor="filter-status">Status</Label>
        <select
          id="filter-status"
          className="h-9 w-full rounded-md border border-input bg-background px-2.5 text-sm"
          value={filters.status}
          onChange={(event) =>
            onChange({ ...filters, status: event.target.value as CitizenRequestFilters["status"] })
          }
        >
          <option value="TODOS">Todos os status</option>
          {Object.entries(REQUEST_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 space-y-2">
        <Label htmlFor="filter-priority">Prioridade</Label>
        <select
          id="filter-priority"
          className="h-9 w-full rounded-md border border-input bg-background px-2.5 text-sm"
          value={filters.priority}
          onChange={(event) =>
            onChange({
              ...filters,
              priority: event.target.value as CitizenRequestFilters["priority"],
            })
          }
        >
          <option value="TODAS">Todas as prioridades</option>
          {Object.entries(REQUEST_PRIORITY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <Button
        variant="outline"
        onClick={() => onChange({ status: "TODOS", priority: "TODAS" })}
      >
        Limpar filtros
      </Button>
    </section>
  )
}
