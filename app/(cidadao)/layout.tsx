import { ProtectedLayout } from "@/components/features/auth/protected-layout"
import { AppShell } from "@/components/features/layout/app-shell"

export default function CitizenLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout allowedRole="CIDADAO">
      <AppShell role="CIDADAO">{children}</AppShell>
    </ProtectedLayout>
  )
}
