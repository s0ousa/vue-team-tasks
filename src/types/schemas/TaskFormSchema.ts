import type { CalendarDate } from '@internationalized/date'
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
  
    entrega: z.custom<CalendarDate>(
      (val) => {
        // Verifica se é CalendarDate
        if (!val || typeof val !== 'object') return false
        if (!('year' in val && 'month' in val && 'day' in val)) return false
        
        // Verifica se a data não é no passado
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        const entregaDate = new Date(val.year, val.month - 1, val.day)
        entregaDate.setHours(0, 0, 0, 0)
        
        return entregaDate >= today
      },
      {
        message: 'A data de entrega é obrigatória e não pode ser no passado'
      }
    ),
  status: z.enum(statusOptions, 'Escolha um status'),
  
  responsavelId: z.string().min(1, 'Selecione um responsável')
})

export type TaskFormData = z.infer<typeof taskFormSchema>