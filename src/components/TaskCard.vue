<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useTaskStore, type Task } from '@/stores/TasksStore';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useMembersStore } from '@/stores/MembersStore';
import { PencilIcon } from 'lucide-vue-next';
import { Button } from './ui/button';
import { useHeaderStore } from '@/stores/HeaderStore';

const props = defineProps<Task>()
const memberStore = useMembersStore()
const taskStore = useTaskStore()    
const headerStore = useHeaderStore()


const handleEdit = () => {
  taskStore.setEditingTask(props)
  headerStore.openDialog() 
}


</script>

<template>
  <Card>
    <CardHeader class="gap-1 pb-3">
      <div class="flex justify-between items-center">
        <CardTitle class="text-base line-clamp-2 flex-1 min-w-0">
          {{ props.titulo }}
        </CardTitle>
        <Button 
            variant="ghost" 
            size="icon" 
            class="hover:cursor-pointer shrink-0"
            @click.stop="handleEdit"
        >
          <PencilIcon class="h-4 w-4"/> 
        </Button>
      </div>
      
      <CardDescription class="text-sm line-clamp-2">
        {{ props.descricao }}
      </CardDescription>
    </CardHeader>

    <CardContent class="pt-0">
      <div class="flex items-center justify-between gap-3">
        <div class="flex gap-2 items-center min-w-0 flex-1">
          <Avatar class="h-8 w-8 shrink-0">
            <AvatarImage 
              :src="memberStore.getMemberById(responsavelId)?.avatar"
              alt="avatar" 
              class="object-cover" 
            />
            <AvatarFallback>
              {{ memberStore.getMemberById(responsavelId)?.nome[0] }}
            </AvatarFallback>
          </Avatar>
          <p class="text-sm truncate">
            {{ memberStore.getMemberById(responsavelId)?.nome }}
          </p>
        </div>
        
        <p class="text-sm text-muted-foreground whitespace-nowrap shrink-0">
          {{ new Date(props.entrega).toLocaleDateString('pt-br') }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>