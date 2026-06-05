"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { formatProtocol } from "@/helpers/format-protocol"
import { cn } from "@/lib/utils"

export function ProtocolDisplay({
  protocol,
  className,
}: {
  protocol: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const formattedProtocol = formatProtocol(protocol)

  async function copyProtocol() {
    await navigator.clipboard.writeText(formattedProtocol)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <code className="rounded-md bg-muted px-2 py-1 text-sm font-semibold text-foreground">
        {formattedProtocol}
      </code>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={copyProtocol}
        aria-label={copied ? "Protocolo copiado" : "Copiar protocolo"}
      >
        {copied ? <Check /> : <Copy />}
      </Button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Protocolo copiado." : ""}
      </span>
    </div>
  )
}
