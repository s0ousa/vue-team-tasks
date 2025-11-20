<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useHeaderStore } from '@/stores/HeaderStore';
import { useMembersStore } from '@/stores/MembersStore';
import { useTaskStore } from '@/stores/TasksStore';
import DynamicDialog from '@/components/DynamicDialog.vue';
import TaskCard from '@/components/TaskCard.vue';
import TaskFormDialog from '@/components/TaskFormDialog.vue';
import { ChevronUp, ChevronDown } from 'lucide-vue-next'; 

const headerStore = useHeaderStore()
const tasksStore = useTaskStore()
const memberStore = useMembersStore()

const openSections = ref<Set<string>>(new Set())

const sections = [
  { 
    key: 'Pendente', 
    color: 'bg-pending',
    headerColor: 'bg-pending-background border-pending-border'
  },
  { 
    key: 'Andamento', 
    color: 'bg-processing',
    headerColor: 'bg-processing-background border-processing-border'
  },
  { 
    key: 'Concluida', 
    color: 'bg-completed',
    headerColor: 'bg-completed-background border-completed-border'
  }
]

const toggleSection = (section: string) => {
  if (openSections.value.has(section)) {
    openSections.value.delete(section)
  } else {
    openSections.value.add(section)
  }
}

const isOpen = (section: string) => openSections.value.has(section)

onMounted(() => {
    headerStore.setHeader(
        'Tarefas',
        'Organize e acompanhe o progresso da sua equipe',
        'Adicionar Tarefa'
    )
})

onUnmounted(() => {
    headerStore.clearHeader()
})
</script>

<template>
    <div>
        <div class="max-w-7xl mx-auto mt-2">
            
            <h1 class=" text-md sm:text-lg">{{ headerStore.pageDescription }}</h1>

            <!-- mobile -->
            <div class="md:hidden space-y-3 mt-6">
                <div 
                    v-for="section in sections" 
                    :key="section.key"
                    class="border border-border rounded-lg overflow-hidden shadow-sm bg-card"
                    :class="[section.headerColor.split(' ')[1]]"
                >
                    <button
                        @click="toggleSection(section.key)"
                        class="w-full px-4 py-4 flex items-center justify-between transition-colors border-b border-border"
                        :class="[
                            section.headerColor, 
                            isOpen(section.key) ? 'border-opacity-100' : 'border-transparent'
                        ]"
                    >
                        <div class="flex items-center gap-3">
                            <div :class="['w-3 h-3 rounded-full', section.color]" />
                            
                            <span class="font-semibold text-foreground">{{ section.key }}</span>
                            
                            <span class="px-2 py-0.5 bg-background/50 border border-border/50 text-muted-foreground text-xs rounded-full font-medium">
                                {{ tasksStore.getTasksByStatus(section.key).length }}
                            </span>
                        </div>
                        <ChevronUp v-if="isOpen(section.key)" class="w-5 h-5 text-muted-foreground" />
                        <ChevronDown v-else class="w-5 h-5 text-muted-foreground" />
                    </button>
          
                    <div 
                        v-if="isOpen(section.key)"
                        class="px-4 pb-4 space-y-3 pt-3 bg-muted/10" 
                    >
                        <template v-if="tasksStore.getTasksByStatus(section.key).length === 0">
                            <p class="text-center text-muted-foreground text-sm py-4">Nenhuma tarefa</p>
                        </template>
                        <template v-else>
                            <TaskCard 
                                v-for="task in tasksStore.getTasksByStatus(section.key)" 
                                :key="task.id"
                                v-bind="task"
                            />
                        </template>
                    </div>
                </div>
            </div>


            <!-- desktop -->
            <div class="hidden md:grid md:grid-cols-3 gap-6 mt-6">
                <div 
                    v-for="section in sections" 
                    :key="section.key"
                    class="flex flex-col"
                >
                    <div :class="['rounded-lg border p-4 mb-4 flex items-center justify-between', section.headerColor]">
                        <div class="flex items-center gap-2">
                            <div :class="['w-3 h-3 rounded-full', section.color]" />
                            <h2 class="font-semibold text-foreground">{{ section.key }}</h2>
                        </div>
                        <span class="px-2 py-1 bg-background/60 text-muted-foreground text-sm rounded-full font-medium border border-border/50">
                            {{ tasksStore.getTasksByStatus(section.key).length }}
                        </span>
                    </div>
          
                    <div class="space-y-3 flex-1">
                        <template v-if="tasksStore.getTasksByStatus(section.key).length === 0">
                            <div class="bg-muted/10 rounded-lg border border-dashed border-border p-8 text-center">
                                <p class="text-muted-foreground text-sm">Nenhuma tarefa</p>
                            </div>
                        </template>
                        <template v-else>
                            <TaskCard 
                                v-for="task in tasksStore.getTasksByStatus(section.key)" 
                                :key="task.id"
                                v-bind="task"
                            />
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <DynamicDialog>
            <TaskFormDialog/>
        </DynamicDialog>
    </div>
</template>