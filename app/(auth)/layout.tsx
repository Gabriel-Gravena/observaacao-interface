import { AuthRedirect } from "@/components/features/auth/auth-redirect"
import { Building2, CheckCircle2, ShieldCheck } from "lucide-react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid min-h-screen lg:grid-cols-[minmax(22rem,0.85fr)_1.15fr]">
      <aside className="relative hidden overflow-hidden border-r bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_34%),radial-gradient(circle_at_80%_75%,white_0,transparent_28%)]" />
        <div className="relative">
          <div className="flex items-center gap-3 text-lg font-semibold">
            <span className="flex size-10 items-center justify-center rounded-lg bg-white/12">
              <ShieldCheck className="size-5" />
            </span>
            ObservaAção
          </div>
          <div className="mt-24 max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground/70">Servico publico digital</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight">Demandas municipais com acompanhamento claro.</h2>
            <p className="mt-5 text-base leading-7 text-primary-foreground/75">Registre solicitações, acompanhe prazos e mantenha o histórico de cada atendimento.</p>
          </div>
        </div>
        <div className="relative grid gap-3 text-sm text-primary-foreground/80">
          <span className="flex items-center gap-3"><CheckCircle2 className="size-4" /> Histórico rastreavel</span>
          <span className="flex items-center gap-3"><Building2 className="size-4" /> Atendimento Municipal organizado</span>
        </div>
      </aside>
      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-8">
        <AuthRedirect>{children}</AuthRedirect>
      </section>
    </main>
  );
}
