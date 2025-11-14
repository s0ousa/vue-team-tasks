<script setup lang="ts">
    import TaskStatusCard from '@/components/TaskStatusCard.vue';
    import { useHeaderStore } from '@/stores/HeaderStore';
    import { onMounted, onUnmounted } from 'vue';

    const headerStore = useHeaderStore()

    const openCreateTaskModal = () => {
        alert('funcao de criar tarefa')
    }
    onMounted(() => {
        headerStore.setHeader(
                'Tarefas',
                'Organize e acompanhe o progresso da sua equipe',
                {
                    text: 'Adicionar Tarefa',
                    onClick: openCreateTaskModal
                }
            )
        }
    )

    onUnmounted(() => {
        headerStore.clearHeader()
})

</script>
<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <TaskStatusCard title="Total de Tarefas" quantity="12"/>
        <TaskStatusCard title="Pendentes" quantity="12"/>
        <TaskStatusCard title="Em andamento" quantity="12"/>
        <TaskStatusCard title="Concluídas" quantity="12"/>
    </div>

</template>