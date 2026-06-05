import { z } from "zod"

import type { RequestPriority } from "@/api/types"

export const requestSchema = z.object({
  titulo: z.string().trim().min(3, "Informe um titulo com pelo menos 3 caracteres."),
  descricao: z
    .string()
    .trim()
    .min(10, "Descreva a situacao com pelo menos 10 caracteres."),
  bairro: z.string().trim().min(2, "Informe o bairro."),
  endereco: z.string().trim(),
  prioridade: z.custom<RequestPriority>((value) =>
    ["BAIXA", "MEDIA", "ALTA", "CRITICA"].includes(String(value))
  , "Selecione uma prioridade."),
  anonima: z.boolean(),
  categoriaId: z.string().min(1, "Selecione uma categoria."),
})

export type RequestFormValues = z.infer<typeof requestSchema>
