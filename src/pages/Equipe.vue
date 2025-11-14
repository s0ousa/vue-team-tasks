<script setup lang="ts">
import SearchBox from '@/components/SearchBox.vue';
import { useHeaderStore } from '@/stores/HeaderStore';
import { onMounted, onUnmounted } from 'vue';

    const headerStore = useHeaderStore()
    
    const openCreateMemberModal = () => {
        alert('funcao de criar membro')
    }
    onMounted(() => {
        headerStore.setHeader(
                'Equipe',
                'Gerencie os membros da sua equipe e suas responsabilidades',
                {
                    text: 'Adicionar Membro',
                    onClick: openCreateMemberModal
                }
            )
        }
    )

    onUnmounted(() => {
        headerStore.clearHeader()
})
    
</script>
<template>
    <div>
        <SearchBox/>
    </div>
</template>

<style scoped>

</style>