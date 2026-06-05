"use client"

import { useState } from "react"
import {
  Copy,
  MessageSquare,
  Check
} from "lucide-react"

import { PageHeader } from "@/components/features/shared/page-header"
import { Button } from "@/components/ui/button"

const TEMPLATES = [
  {
    title: "Triagem: Solicitação de mais informações",
    content: "Prezado cidadão, verificamos a sua solicitação. No entanto, para darmos andamento à tratativa, precisamos de mais detalhes sobre a localização exata e/ou fotos do local. Por favor, atualize as informações para podermos prosseguir.",
  },
  {
    title: "Execução: Equipe em deslocamento",
    content: "Informamos que a equipe técnica responsável já foi acionada e está em deslocamento para o local ou com a demanda na fila de prioridade do dia. O prazo estimado para a solução é de até 48 horas úteis.",
  },
  {
    title: "Conclusão: Serviço realizado com sucesso",
    content: "Sua solicitação foi concluída com sucesso pela nossa equipe. Agradecemos o seu contato e contribuição para a melhoria da nossa cidade. Caso o problema persista, não hesite em abrir um novo chamado.",
  },
  {
    title: "Cancelamento: Demanda duplicada",
    content: "Identificamos que já existe um chamado aberto para esta mesma localidade/problema (Protocolo Anterior). Portanto, esta solicitação será encerrada por duplicidade. Você pode acompanhar o andamento pelo chamado original.",
  }
]

export function ServerSupportView() {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col gap-8 pb-8 animate-in fade-in zoom-in-95 duration-500">
      <PageHeader 
        title="Apoio Operacional" 
        description="Recursos práticos, manuais e respostas rápidas para agilizar seu fluxo de trabalho diário."
      />

      <div className="grid gap-8">
        {/* Text Templates */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MessageSquare className="size-4" />
            </span>
            <h2 className="text-xl font-semibold">Modelos de Resposta</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Utilize os textos abaixo para padronizar a comunicação com o cidadão e economizar tempo na triagem e resolução das solicitações.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {TEMPLATES.map((template, idx) => (
              <article key={idx} className="surface-raised flex flex-col p-5 transition-shadow hover:shadow-md">
                <h3 className="font-medium mb-3 text-sm">{template.title}</h3>
                <div className="bg-muted/30 rounded-md p-3 mb-4 flex-1 text-sm text-muted-foreground border">
                  {template.content}
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full justify-center gap-2"
                  onClick={() => handleCopy(template.content, idx)}
                >
                  {copiedId === idx ? (
                    <>
                      <Check className="size-4 text-status-resolved-foreground" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      Copiar texto
                    </>
                  )}
                </Button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
