<script setup lang="ts">
import { Menu, Plus } from 'lucide-vue-next';
import Button from './ui/button/Button.vue';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { useHeaderStore } from '@/stores/HeaderStore';
import { useTaskStore } from '@/stores/TasksStore';
import { useMembersStore } from '@/stores/MembersStore';
import { toast } from 'vue-sonner';

const { toggleSidebar } = useSidebar();
const headerStore = useHeaderStore()
const taskStore = useTaskStore()
const membersStore = useMembersStore()

const handleAddTask = () => {
    if(membersStore.members.length == 0 && headerStore.pageTitle == "Tarefas") {
        toast.error("Cadastre um membro antes, por favor!")
        return
    }
  taskStore.setEditingTask(null) 
  headerStore.openDialog()
}
</script>

<template>
    <header class="flex w-full bg-card h-20 items-center border-b border-border">
          
          <div class="hidden md:flex items-center justify-between w-full max-w-5xl mx-auto px-4 sm:px-8 py-10">
              <div>
                  <SidebarTrigger class="md:hidden" />
                  <h1 class="text-lg sm:text-2xl font-semibold">{{headerStore.pageTitle}}</h1>
                  <!-- <p class="hidden lg:inline">{{headerStore.pageDescription}}</p> -->
              </div>
              <Button size="lg" class="cursor-pointer" @click="handleAddTask">
                  <Plus/>
                 <p class="hidden sm:inline">{{headerStore.buttonText}}</p> 
              </Button>
          </div>
  
          <div class="flex md:hidden items-center justify-between w-full px-4 py-4">
              <Menu @click="toggleSidebar" class="cursor-pointer  w-9 h-9 p-2 rounded-lg hover:bg-neutral-200"/>
              <h1 class="text-lg font-semibold">{{headerStore.pageTitle}}</h1>
              <Button size="icon" class="cursor-pointer" @click="handleAddTask">
                  <Plus/>
              </Button>
          </div>
  
      </header>
</template>