import { LoadingState } from "@/components/features/shared/loading-state"

export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <LoadingState rows={6} />
    </main>
  )
}
