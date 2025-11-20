import { defineStore } from "pinia";
import { ref } from "vue";
import type { CalendarDate } from '@internationalized/date';
import { parseDate } from '@internationalized/date';

export type Status = 'Pendente' | 'Andamento' | 'Concluida';

export interface Task {
    id: string,
    titulo: string,
    descricao: string,
    entrega: CalendarDate | string,
    status: Status,
    responsavelId: string
}

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const editingTask = ref<Task | null>(null)

    const toDateString = (date: CalendarDate | Date | string): string => {
        if (typeof date === 'string') {
            return date.split('T')[0]
        }
        if (date instanceof Date) {
            return date.toISOString().split('T')[0]
        }
        return date.toString()
    }

    
    const toCalendarDate = (dateStr: string): CalendarDate => {
        // extrai apenas YYYY-MM-DD da string
        const dateOnly = dateStr.split('T')[0]
        return parseDate(dateOnly)
    }

    const addTask = async (taskData: Omit<Task, "id">) => {
        loading.value = true
        error.value = null
        try {
            const newTask: Task = {
                id: crypto.randomUUID(),
                ...taskData,
                entrega: toDateString(taskData.entrega as any)
            }
            tasks.value.push(newTask)
            console.log('Tarefa criada:', tasks.value)
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
        if (task && typeof task.entrega === 'string') {
            editingTask.value = {
                ...task,
                entrega: toCalendarDate(task.entrega)
            }
        } else {
            editingTask.value = task
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