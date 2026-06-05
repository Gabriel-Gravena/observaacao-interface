import { ProtectedLayout } from "@/components/features/auth/protected-layout"
import { AppShell } from "@/components/features/layout/app-shell"

export default function ServerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout allowedRole="SERVIDOR">
      <AppShell role="SERVIDOR">{children}</AppShell>
    </ProtectedLayout>
  )
}
