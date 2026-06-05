"use client"

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Inbox,
  LoaderCircle,
  type LucideIcon,
} from "lucide-react"

import { ErrorState } from "@/components/features/shared/error-state"
import { LoadingState } from "@/components/features/shared/loading-state"
import { PageHeader } from "@/components/features/shared/page-header"
import { isRequestOverdue } from "@/helpers/request-deadline"
import { useServerRequests } from "@/hooks/use-server-requests"

export function DashboardView() {
  const { requests, isLoading, error, reload } = useServerRequests()

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState onRetry={reload} />

  const cards: { label: string; value: number; icon: LucideIcon; tone: string }[] = [
    { label: "Abertas", value: requests.filter((r) => r.status === "ABERTO").length, icon: Inbox, tone: "bg-status-open text-status-open-foreground" },
    { label: "Criticas", value: requests.filter((r) => r.prioridade === "CRITICA").length, icon: AlertTriangle, tone: "bg-priority-critical text-priority-critical-foreground" },
    { label: "Atrasadas", value: requests.filter((r) => isRequestOverdue(r.prazoAlvo, r.status)).length, icon: Clock, tone: "bg-priority-high text-priority-high-foreground" },
    { label: "Em execucao", value: requests.filter((r) => r.status === "EM_EXECUCAO").length, icon: LoaderCircle, tone: "bg-status-in-progress text-status-in-progress-foreground" },
    { label: "Resolvidas", value: requests.filter((r) => r.status === "RESOLVIDO").length, icon: CheckCircle2, tone: "bg-status-resolved text-status-resolved-foreground" },
  ]

  return (
    <>
      <PageHeader title="Dashboard" description="Visao operacional das solicitacoes municipais." />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(({ label, value, icon: Icon, tone }) => (
          <article key={label} className="surface-panel group relative overflow-hidden p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <span className={`flex size-10 items-center justify-center rounded-lg ${tone}`}>
              <Icon className="size-5" />
            </span>
            <p className="mt-6 text-4xl font-semibold tracking-tight">{value}</p>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{label}</p>
            <span className="absolute right-0 bottom-0 h-16 w-16 rounded-tl-full bg-primary/4 transition-colors group-hover:bg-primary/7" />
          </article>
        ))}
      </section>
      <section className="surface-panel mt-6 p-6">
        <p className="eyebrow">Visao geral</p>
        <h2 className="mt-2 text-lg font-semibold">Atendimento municipal</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Os indicadores sao calculados a partir da fila atual e ajudam a identificar prioridades e prazos.
        </p>
      </section>
    </>
  )
}
