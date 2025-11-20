<script setup lang="ts">
import { Button } from '@/components/ui/button'
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { memberFormSchema, type MemberFormData } from '@/types/schemas/MemberFormSchema'
import { cargos } from '@/types/schemas/MemberFormSchema'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ref, computed, watch } from 'vue'
import { useMembersStore } from '@/stores/MembersStore'
import { useHeaderStore } from '@/stores/HeaderStore'
import { Spinner } from './ui/spinner'

const headerStore = useHeaderStore()
const membersStore = useMembersStore()

const formData = ref<Partial<MemberFormData>>({
  nome: '',
  cargo: undefined,
  email: '',
  avatarUrl: ''
})

const errors = ref<Partial<Record<keyof MemberFormData, string>>>({})
const isSubmitting = ref(false)

const avatarFallback = computed(() => {
  return formData.value.nome?.charAt(0)
})

const resetForm = () => {
  formData.value = {
    nome: '', 
    cargo: undefined,
    email: '',
    avatarUrl: ''
  }
  errors.value = {}
}

watch(() => headerStore.isDialogOpen, (isOpen) => {
  if (!isOpen) {
    resetForm()
  }
})


const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    errors.value = {}

    const result = memberFormSchema.safeParse(formData.value)
    
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof MemberFormData
        if (field) {
          errors.value[field] = issue.message
        }
      })

      return
    }
    
    await membersStore.addMember({
      nome: result.data.nome,
      cargo: result.data.cargo,
      email: result.data.email,
      avatar: result.data.avatarUrl || ''
    })
  
  
    headerStore.closeDialog()
    resetForm()
    
  } catch (error) {
    console.error('erro ao adicionar membro:', error)
 
  } finally {
    isSubmitting.value = false
  }
}

const clearError = (field: keyof MemberFormData) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}
</script>

<template>
  <DialogContent class="sm:max-w-[425px] bg-card ">
      <form @submit.prevent="handleSubmit" >
      <DialogHeader>
        <DialogTitle>
          Novo membro
        </DialogTitle>
        <DialogDescription>
          Crie um novo membro para colaborar com o time
        </DialogDescription>
      </DialogHeader>

      <FieldGroup class="gap-4 mt-6">
        <Field>
          <FieldLabel for="nome">
            Nome
          </FieldLabel>
          <Input 
            id="nome"
            v-model="formData.nome"
            placeholder="Digite um nome"
            :disabled="isSubmitting"
            @input="clearError('nome')"
          />
          <FieldError v-if="errors.nome">
            {{ errors.nome }}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel for="cargo">Cargo</FieldLabel>
          <Select 
            v-model="formData.cargo"
            :disabled="isSubmitting"
            @update:model-value="clearError('cargo')"
          >
            <SelectTrigger 
              id="cargo"
             
            >
              <SelectValue placeholder="Escolha um cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem 
                v-for="(cargo, index) in cargos" 
                :key="index" 
                :value="cargo"
              >
                {{ cargo }}
              </SelectItem>
            </SelectContent>
          </Select>
          <FieldError v-if="errors.cargo">
            {{ errors.cargo }}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel for="email">
            Email
          </FieldLabel>
          <Input 
            id="email" 
            type="email" 
            v-model="formData.email" 
            placeholder="joao@example.com"
         
            :disabled="isSubmitting"
            @input="clearError('email')"
          />
          <FieldError v-if="errors.email">
            {{ errors.email }}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel for="avatar">
            Avatar
          </FieldLabel>
         
          <div class="flex justify-center w-full mb-2">
            <Avatar class="h-16 w-16">
              <AvatarImage 
                :src="formData.avatarUrl || ''" 
                alt="avatar" 
                class="object-cover" 
              />
              <AvatarFallback>{{ avatarFallback }}</AvatarFallback>
            </Avatar>
          </div>
          <FieldDescription>
            Você pode inserir um link de imagem para o avatar
          </FieldDescription>
          <Input 
            id="avatar" 
            placeholder="https://example.com/avatar.jpg"  
            v-model="formData.avatarUrl"

            :disabled="isSubmitting"
            @input="clearError('avatarUrl')"
          />

          <FieldError v-if="errors.avatarUrl">
            {{ errors.avatarUrl }}
          </FieldError>
        </Field>
      </FieldGroup>

      <DialogFooter class="mt-8">
        <DialogClose as-child>
          <Button 
            variant="outline"
            type="button"
            :disabled="isSubmitting"
            onclick="resetForm"
          >
            Cancelar
          </Button>
        </DialogClose>
        <Button 
          type="submit"
          :disabled="isSubmitting"
        >
        <Spinner class="animate-spin"  v-if="membersStore.loading"/>
        <p v-else> Salvar</p>
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</template>