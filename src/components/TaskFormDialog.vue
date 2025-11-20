<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useTaskStore } from '@/stores/TasksStore'
import { useMembersStore } from '@/stores/MembersStore'
import { useHeaderStore } from '@/stores/HeaderStore'
import { taskFormSchema, statusOptions, type TaskFormData } from '@/types/schemas/TaskFormSchema'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon, Trash2 } from 'lucide-vue-next'
import { Calendar } from './ui/calendar'
import { cn } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import { toast } from 'vue-sonner'

const headerStore = useHeaderStore()
const taskStore = useTaskStore()
const membersStore = useMembersStore() 

const isEditing = computed(() => !!taskStore.editingTask)

const isSubmitting = ref(false)
const errors = ref<Partial<Record<keyof TaskFormData, string>>>({})

const df = new DateFormatter('pt-BR', {
  dateStyle: 'long'
})

const formatDisplayDate = (date: CalendarDate) => {
  const localDate = date.toDate(getLocalTimeZone())
  return df.format(localDate)
}

const initialFormState = (): Partial<TaskFormData> => ({
  titulo: '',
  descricao: '',
  status: undefined,
  responsavelId: '',
  entrega: undefined
})

const formData = ref<Partial<TaskFormData>>(initialFormState())

const resetForm = () => {
  formData.value = initialFormState()
  errors.value = {}
  taskStore.setEditingTask(null)
}

const loadTaskData = () => {
  if (taskStore.editingTask) {
    const task = taskStore.editingTask
    
    formData.value = {
      titulo: task.titulo,
      descricao: task.descricao,
      status: task.status,
      responsavelId: task.responsavelId,
      entrega: task.entrega
    }
    errors.value = {}
  } else {
    formData.value = initialFormState()
    errors.value = {}
  }
}

onMounted(() => {
  loadTaskData()
})

// importante
watch(() => taskStore.editingTask, () => {
  loadTaskData()
}, { deep: true })

const clearError = (field: keyof TaskFormData) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

const handleDelete = () => {
  if (taskStore.editingTask?.id) {
    taskStore.removeTask(taskStore.editingTask.id) 
    resetForm()
    headerStore.closeDialog()
  }
}

const handleCancel = () => {
  resetForm()
  headerStore.closeDialog()
}

const handleSubmit = async () => {
  isSubmitting.value = true
  
  const result = taskFormSchema.safeParse(formData.value)

  if (!result.success) {
    const formattedErrors: any = {}
    result.error.issues.forEach((issue) => {
      formattedErrors[issue.path[0]] = issue.message
    })
    errors.value = formattedErrors
    isSubmitting.value = false
    return
  }

  try {
    if (isEditing.value && taskStore.editingTask?.id) {
      await taskStore.updateTask(taskStore.editingTask.id, {
        titulo: result.data.titulo,
        descricao: result.data.descricao,
        entrega: result.data.entrega,
        status: result.data.status,
        responsavelId: result.data.responsavelId
      })
    } else {
      await taskStore.addTask({
        titulo: result.data.titulo,
        descricao: result.data.descricao,
        entrega: result.data.entrega,
        status: result.data.status,
        responsavelId: result.data.responsavelId
      })
    }
    
    resetForm()
    headerStore.closeDialog()
    toast.success("Sucesso!")

  } catch (error) {
    console.error('Erro ao salvar tarefa:', error)
    errors.value = { titulo: 'Erro ao salvar tarefa. Tente novamente.' }
    toast.error("Ops... Algo deu errado!")
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <DialogContent class="sm:max-w-[425px] bg-card">
    <form @submit.prevent="handleSubmit">
      <DialogHeader>
        <DialogTitle>{{ isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}</DialogTitle>
        <DialogDescription>
          {{ isEditing ? 'Atualize os detalhes desta tarefa.' : 'Crie uma nova tarefa e atribua a um membro do time.' }}
        </DialogDescription>
      </DialogHeader>

      <FieldGroup class="gap-4 mt-6">
        <Field>
          <FieldLabel for="titulo">Título</FieldLabel>
          <Input 
            id="titulo" 
            v-model="formData.titulo" 
            placeholder="Ex: Implementar Login" 
            :disabled="isSubmitting"
            @input="clearError('titulo')" 
          />
          <FieldError v-if="errors.titulo">
            {{ errors.titulo }}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel for="descricao">Descrição</FieldLabel>
          <Textarea
            id="descricao"
            v-model="formData.descricao" 
            placeholder="Detalhes da tarefa..."
            :rows="6"
            :disabled="isSubmitting"
            @input="clearError('descricao')"
          />
          <FieldError v-if="errors.descricao">
            {{ errors.descricao }}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel for="entrega">Data de Entrega</FieldLabel>
          
          <Popover>
            <PopoverTrigger as-child>
              <Button 
                variant="outline"
                :class="cn('w-60 justify-start text-left font-normal', !formData.entrega && 'text-muted-foreground')"
              >
                <CalendarIcon />
                <span v-if="formData.entrega">
                  {{ formatDisplayDate(formData.entrega) }}
                </span>
                <span v-else>
                  Escolha uma data
                </span>
              </Button>
            </PopoverTrigger>
            
            <PopoverContent class="w-auto p-0" align="start">
              <Calendar 
                v-model="formData.entrega"
                @update:model-value="clearError('entrega')"
              />
            </PopoverContent>
          </Popover>
          <FieldError v-if="errors.entrega">
            {{ errors.entrega }}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel for="responsavel">Responsável</FieldLabel>
          <Select 
            v-model="formData.responsavelId" 
            :disabled="isSubmitting"
            @update:model-value="clearError('responsavelId')"
          >
            <SelectTrigger id="responsavel">
              <SelectValue placeholder="Selecione um membro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem 
                v-for="member in membersStore.members" 
                :key="member.id" 
                :value="member.id"
              >
                {{ member.nome }}
              </SelectItem>
            </SelectContent>
          </Select>
          <FieldError v-if="errors.responsavelId">
            {{ errors.responsavelId }}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel for="status">Status</FieldLabel>
          <Select 
            v-model="formData.status" 
            :disabled="isSubmitting"
            @update:model-value="clearError('status')"
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Defina o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem 
                v-for="(status, index) in statusOptions" 
                :key="index" 
                :value="status"
              >
                {{ status }}
              </SelectItem>
            </SelectContent>
          </Select>
          <FieldError v-if="errors.status">
            {{ errors.status }}
          </FieldError>
        </Field>

      </FieldGroup>

      <div class="mt-8 flex flex-row justify-between items-center w-full gap-2">
        <div>
          <Button 
            v-if="isEditing" 
            type="button" 
            variant="destructive"
            @click="handleDelete"
            :disabled="isSubmitting"
            size="icon"
          >
            <Trash2 class="w-4 h-4" />
          </Button>
        </div>

        <div class="flex gap-2 ml-auto">
          <DialogClose as-child>
            <Button 
              variant="outline" 
              type="button" 
              :disabled="isSubmitting" 
              @click="handleCancel"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" :disabled="isSubmitting">
            <Spinner class="animate-spin mr-2" v-if="isSubmitting" />
            {{ isEditing ? 'Salvar' : 'Criar Tarefa' }}
          </Button>
        </div>
      </div>
    </form>
  </DialogContent>
</template>