import { defineStore } from "pinia";
import { ref } from "vue";
import type { CalendarDate } from '@internationalized/date';
import { parseDate } from '@internationalized/date';

export type Status = 'Pendente' | 'Andamento' | 'Concluida';

export interface Task {
    id: string,
    titulo: string,
    descricao: string,
    entrega:  string,
    status: Status,
    responsavelId: string
}

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const editingTask = ref<Task | null>(null)

    const toDateString = (date: CalendarDate | string): string => {
        if (typeof date === 'string') {
            const result = date.split('T')[0]
            return result
        }
        
        // CalendarDate.toString() retorna "YYYY-MM-DD"
        const result = date.toString()
        return result
    }

    
    const toCalendarDate = (date: string | Date | CalendarDate | any): CalendarDate => {
        // Já é CalendarDate
        if (date && typeof date === 'object' && 'year' in date && 'month' in date && 'day' in date) {
            return date as CalendarDate
        }
        
        let dateStr: string
        
        // É um objeto Date
        if (date instanceof Date) {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            dateStr = `${year}-${month}-${day}`
        } 
        // É string
        else if (typeof date === 'string') {
            // Remove tudo após 'T' ou espaço
            dateStr = date.split('T')[0].split(' ')[0].trim()
            
            // Se não está no formato YYYY-MM-DD, tenta parsear como Date primeiro
            if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                try {
                    const parsedDate = new Date(date)
                    if (!isNaN(parsedDate.getTime())) {
                        const year = parsedDate.getFullYear()
                        const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
                        const day = String(parsedDate.getDate()).padStart(2, '0')
                        dateStr = `${year}-${month}-${day}`
                    } else {
                        throw new Error('Data inválida')
                    }
                } catch (e) {
                    console.error('Erro ao parsear data:', date, e)
                    // Fallback: data atual
                    const today = new Date()
                    const year = today.getFullYear()
                    const month = String(today.getMonth() + 1).padStart(2, '0')
                    const day = String(today.getDate()).padStart(2, '0')
                    dateStr = `${year}-${month}-${day}`
                }
            }
        } 
        else {
            console.error('Tipo de data desconhecido:', date, typeof date)
            const today = new Date()
            const year = today.getFullYear()
            const month = String(today.getMonth() + 1).padStart(2, '0')
            const day = String(today.getDate()).padStart(2, '0')
            dateStr = `${year}-${month}-${day}`
        }
        
        return parseDate(dateStr)
    }
    const addTask = async (taskData: Omit<Task, "id">) => {
        loading.value = true
        error.value = null
        try {
            
            const entregaString = toDateString(taskData.entrega as any)
            
            const newTask: Task = {
                id: crypto.randomUUID(),
                ...taskData,
                entrega: entregaString
            }
            
            tasks.value.push(newTask)
            
            return newTask
        } catch (err) {
            error.value = 'Erro ao criar tarefa'
            throw err
        } finally {
            loading.value = false
        }
    }

    const removeTask = (id: string) => {
        tasks.value = tasks.value.filter(t => t.id !== id)
    }

    const getTasksByStatus = (status: Status) => {
        return tasks.value.filter(task => task.status === status)
    }

    const setEditingTask = (task: Task | null) => {
        if (!task) {
            editingTask.value = null
            return
        }
        
        try {
            editingTask.value = {
                ...task,
                entrega: toCalendarDate(task.entrega)
            }
        } catch (error) {
            console.error('Erro ao definir tarefa para edição:', error, task)
            editingTask.value = null
        }
    }

    const getTaksByMemberId = (id:string) => {
        return tasks.value.filter(task => task.responsavelId === id)
    }

    const updateTask = async (id: string, updatedData: Partial<Task>) => {
        loading.value = true
        error.value = null
        try {
            const index = tasks.value.findIndex(t => t.id === id)
            if (index !== -1) {
                const updatePayload: any = { ...updatedData }
                
                if (updatedData.entrega) {
                    updatePayload.entrega = toDateString(updatedData.entrega as any)
                }

                tasks.value[index] = { 
                    ...tasks.value[index], 
                    ...updatePayload
                }
            }
        } catch (err) {
            error.value = 'Erro ao atualizar tarefa'
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        tasks,
        loading,
        error,
        addTask,
        removeTask,
        getTasksByStatus,
        setEditingTask,
        updateTask,
        editingTask,
        getTaksByMemberId
    }
}, {
  persist: { key: 'tasks' }
})