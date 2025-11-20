import { z } from 'zod'

export const statusOptions = [
  'Pendente',
  'Andamento',
  'Concluida'
] as const

export const taskFormSchema = z.object({
  titulo: z
    .string()
    .min(3, 'O título deve ter no mínimo 3 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
  
  descricao: z
    .string()
    .min(5, 'A descrição deve ter no mínimo 5 caracteres'),
  
  entrega: z.coerce
    .date( "A data de entrega é obrigatória")
    .min(new Date(), 'A data de entrega não pode ser no passado'),
    
  status: z.enum(statusOptions, { errorMap: () => ({ message: 'Selecione um status' }) }),
  
  responsavelId: z.string().min(1, 'Selecione um responsável')
})

export type TaskFormData = z.infer<typeof taskFormSchema>