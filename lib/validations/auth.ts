import { z } from "zod"

const optionalDigits = (label: string, length: number) =>
  z
    .string()
    .trim()
    .refine(
      (value) => value === "" || new RegExp(`^\\d{${length}}$`).test(value),
      `${label} deve conter ${length} numeros.`
    )

export const loginSchema = z.object({
  email: z.email("Informe um e-mail valido."),
  password: z.string().min(1, "Informe sua senha."),
})

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  email: z.email("Informe um e-mail valido."),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
  cpf: optionalDigits("CPF", 11),
  telefone: optionalDigits("Telefone", 11),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
