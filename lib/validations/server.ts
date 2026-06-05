import { z } from "zod"
export const statusUpdateSchema = z.object({ comentario: z.string().trim().min(5, "Informe um comentario com pelo menos 5 caracteres.") })
export const categorySchema = z.object({ nome: z.string().trim().min(2, "Informe o nome."), descricao: z.string().trim(), sensivel: z.boolean(), ativa: z.boolean() })
export type StatusUpdateFormValues = z.infer<typeof statusUpdateSchema>
export type CategoryFormValues = z.infer<typeof categorySchema>
