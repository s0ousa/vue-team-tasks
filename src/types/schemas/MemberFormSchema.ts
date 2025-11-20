import { z } from 'zod'
export const cargos = [
  'Tech Lead',
  'Desenvolvedor',
  'Gerente de Projetos',
  'Designer',
  'Analista'
] as const


export const memberFormSchema = z.object({
  nome: z
    .string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'O nome é obrigatório e deve conter apenas letras'),
  
  cargo: z.enum(cargos, 'Escolha uma das opções'),
  
  email: z.email('Digite um email válido'),

  avatarUrl:z
    .url('URL inválida')
    .optional()
    .or(z.literal(''))
})

export type MemberFormData = z.infer<typeof memberFormSchema>