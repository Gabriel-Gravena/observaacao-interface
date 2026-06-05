import type { Metadata } from "next"

import { AccessDenied } from "@/components/features/auth/access-denied"

export const metadata: Metadata = {
  title: "Acesso negado",
}

export default function AccessDeniedPage() {
  return <AccessDenied />
}
