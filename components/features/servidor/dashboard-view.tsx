"use client"

import { useMemo } from "react"
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  EyeOff,
  Inbox,
  MapPin,
  Activity,
  type LucideIcon,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import { RequestTable } from "@/components/features/solicitacoes/request-table"
import { ErrorState } from "@/components/features/shared/error-state"
import { LoadingState } from "@/components/features/shared/loading-state"
import { isRequestOverdue } from "@/helpers/request-deadline"
import { useServerRequests } from "@/hooks/use-server-requests"

const PRIORITY_COLORS = {
  BAIXA: "var(--priority-low-foreground)",
  MEDIA: "var(--priority-medium-foreground)",
  ALTA: "var(--priority-high-foreground)",
  CRITICA: "var(--priority-critical-foreground)",
}

const STATUS_COLORS = {
  ABERTO: "var(--status-open-foreground)",
  TRIAGEM: "var(--status-triage-foreground)",
  EM_EXECUCAO: "var(--status-in-progress-foreground)",
  RESOLVIDO: "var(--status-resolved-foreground)",
  ENCERRADO: "var(--status-closed-foreground)",
}

export function DashboardView() {
  const { requests, isLoading, error, reload } = useServerRequests()

  const metrics = useMemo(() => {
    if (!requests.length) return null

    const total = requests.length
    const abertas = requests.filter((r) => r.status === "ABERTO" || r.status === "TRIAGEM").length
    const criticas = requests.filter((r) => r.prioridade === "CRITICA").length
    const atrasadasList = requests.filter((r) => isRequestOverdue(r.prazoAlvo, r.status))
    const atrasadas = atrasadasList.length
    const resolvidas = requests.filter((r) => r.status === "RESOLVIDO" || r.status === "ENCERRADO").length
    const emTriagem = requests.filter((r) => r.status === "TRIAGEM").length
    const emExecucao = requests.filter((r) => r.status === "EM_EXECUCAO").length
    const anonimas = requests.filter((r) => r.anonima).length

    // Data for Priority Pie Chart
    const priorityCounts = requests.reduce((acc, r) => {
      acc[r.prioridade] = (acc[r.prioridade] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const priorityData = Object.entries(priorityCounts).map(([name, value]) => ({
      name,
      value,
      color: PRIORITY_COLORS[name as keyof typeof PRIORITY_COLORS] || "#ccc"
    }))

    // Data for Status Bar Chart
    const statusCounts = requests.reduce((acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const statusData = [
      { name: "Aberto", count: statusCounts["ABERTO"] || 0, color: STATUS_COLORS["ABERTO"] },
      { name: "Triagem", count: statusCounts["TRIAGEM"] || 0, color: STATUS_COLORS["TRIAGEM"] },
      { name: "Execução", count: statusCounts["EM_EXECUCAO"] || 0, color: STATUS_COLORS["EM_EXECUCAO"] },
      { name: "Resolvido", count: statusCounts["RESOLVIDO"] || 0, color: STATUS_COLORS["RESOLVIDO"] },
      { name: "Encerrado", count: statusCounts["ENCERRADO"] || 0, color: STATUS_COLORS["ENCERRADO"] },
    ]

    // Data for Categories Bar Chart
    const categoryCounts = requests.reduce((acc, r) => {
      acc[r.categoriaNome] = (acc[r.categoriaNome] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const categoryData = Object.entries(categoryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5) // Top 5 categories

    return { total, abertas, criticas, atrasadas, resolvidas, priorityData, statusData, categoryData, atrasadasList, emTriagem, emExecucao, anonimas }
  }, [requests])

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState onRetry={reload} />

  const cards: { label: string; value: number; icon: LucideIcon; tone: string; desc: string }[] = [
    { label: "Total Abertas", value: metrics?.abertas || 0, icon: Inbox, tone: "bg-status-open text-status-open-foreground", desc: "Aguardando ação" },
    { label: "Em Triagem", value: metrics?.emTriagem || 0, icon: AlertCircle, tone: "bg-status-triage text-status-triage-foreground", desc: "Análise inicial pendente" },
    { label: "Em Execução", value: metrics?.emExecucao || 0, icon: Clock, tone: "bg-status-in-progress text-status-in-progress-foreground", desc: "Trabalho ativo das equipes" },
    { label: "Prioridade Crítica", value: metrics?.criticas || 0, icon: AlertTriangle, tone: "bg-priority-critical text-priority-critical-foreground", desc: "Exigem atenção imediata" },
    { label: "Prazos Atrasados", value: metrics?.atrasadas || 0, icon: AlertCircle, tone: "bg-destructive/20 text-destructive", desc: "Fora do prazo meta" },
    { label: "Total Resolvidas", value: metrics?.resolvidas || 0, icon: CheckCircle, tone: "bg-status-resolved text-status-resolved-foreground", desc: "Demandas concluídas" },
    { label: "Demandas Anônimas", value: metrics?.anonimas || 0, icon: EyeOff, tone: "bg-muted text-muted-foreground", desc: "Identidade protegida" },
    { label: "Taxa de Resolução", value: metrics?.total ? Math.round(((metrics.resolvidas || 0) / metrics.total) * 100) : 0, icon: Activity, tone: "bg-primary/20 text-primary", desc: "Pedidos finalizados (%)" },
  ]

  return (
    <div className="flex flex-col gap-8 pb-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Geral</h1>
          <p className="text-muted-foreground mt-1">Visão operacional e métricas de atendimento municipal em tempo real.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, tone, desc }) => (
          <article key={label} className="surface-raised group relative flex flex-col justify-between overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <span className={`flex size-10 items-center justify-center rounded-xl ${tone}`}>
                <Icon className="size-5" />
              </span>
            </div>
            <div className="mt-4">
              <p className="text-4xl font-bold tracking-tight text-foreground">
                {label.includes("Taxa") ? `${value}%` : value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
            </div>
            <span className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-primary/[0.03] transition-colors group-hover:bg-primary/[0.05]" />
          </article>
        ))}
      </section>

      {/* Charts Grid */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Status Breakdown */}
        <article className="surface-panel flex flex-col p-6 transition-shadow hover:shadow-md">
          <div className="mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="size-5 text-primary" />
              Solicitações por Status
            </h2>
            <p className="text-sm text-muted-foreground">Distribuição atual do funil de atendimento.</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics?.statusData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }} />
                <Tooltip 
                  cursor={{ fill: 'var(--muted)' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {metrics?.statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        {/* Priority Breakdown */}
        <article className="surface-panel flex flex-col p-6 transition-shadow hover:shadow-md">
          <div className="mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="size-5 text-primary" />
              Distribuição de Prioridades
            </h2>
            <p className="text-sm text-muted-foreground">Volume de chamados classificados por criticidade.</p>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics?.priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {metrics?.priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-bold">{metrics?.total || 0}</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">Total</span>
            </div>
          </div>
        </article>

        {/* Top Categories */}
        <article className="surface-panel flex flex-col p-6 lg:col-span-2 transition-shadow hover:shadow-md">
          <div className="mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="size-5 text-primary" />
              Top 5 Categorias Mais Demandadas
            </h2>
            <p className="text-sm text-muted-foreground">Assuntos com maior volume de solicitações na plataforma.</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics?.categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }} />
                <YAxis type="category" dataKey="name" width={150} axisLine={false} tickLine={false} tick={{ fill: 'var(--foreground)', fontSize: 12, fontWeight: 500 }} />
                <Tooltip 
                  cursor={{ fill: 'var(--muted)' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}
                />
                <Bar dataKey="count" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      {/* Demandas Atrasadas Table */}
      <section className="surface-panel flex flex-col p-6 mt-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AlertCircle className="size-5 text-destructive" />
            Fila de Atenção: Demandas Atrasadas
          </h2>
          <p className="text-sm text-muted-foreground">Priorize a resolução das solicitações abaixo que já ultrapassaram o SLA.</p>
        </div>
        
        {metrics?.atrasadasList && metrics.atrasadasList.length > 0 ? (
          <RequestTable requests={metrics.atrasadasList} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle className="size-12 text-status-resolved-foreground mb-4" />
            <h3 className="text-lg font-semibold">Excelente trabalho!</h3>
            <p className="text-muted-foreground">Não há demandas atrasadas na fila no momento.</p>
          </div>
        )}
      </section>
    </div>
  )
}
