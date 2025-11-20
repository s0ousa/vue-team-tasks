<script setup lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'

  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
  import { Member } from '@/stores/MembersStore'
  import { useTaskStore } from '@/stores/TasksStore';

  const taskStore = useTaskStore()

  const props = defineProps<Member>()

</script>

<template>
  <Card class="">
    <CardContent class="flex flex-col items-center gap-4">
        <Avatar class="w-16 h-16">
            <AvatarImage :src="props.avatar" alt="@unovue" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div class="text-center">
            <CardTitle>
              {{props.nome}}
            </CardTitle>
            <p class="">{{ props.cargo }} </p>
            <p class="text-sm mt-2">Responsável por {{ taskStore.getTaksByMemberId(props.id).length }} tarefas</p>
        </div>
    </CardContent>
  </Card>
</template>