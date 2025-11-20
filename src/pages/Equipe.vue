<script setup lang="ts">
import MemberCard from '@/components/MemberCard.vue';
import MemberFormDialog from '@/components/MemberFormDialog.vue';
import SearchBox from '@/components/SearchBox.vue';
import { useHeaderStore } from '@/stores/HeaderStore';
import { onMounted, onUnmounted } from 'vue';
import DynamicDialog from '@/components/DynamicDialog.vue';
import { useMembersStore } from '@/stores/MembersStore';


const headerStore = useHeaderStore()
const membersStore = useMembersStore()

onMounted(() => {
    headerStore.setHeader(
        'Equipe',
        'Gerencie os membros da sua equipe e suas responsabilidades',
        'Adicionar membro'
    )
})

onUnmounted(() => {
    headerStore.clearHeader()
})
</script>

<template>
  <div>
    <h1 class=" text-md sm:text-lg">{{ headerStore.pageDescription }}</h1>
    
    <SearchBox/>
    
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-8">
      <MemberCard
        v-for="member in membersStore.filteredMembers"
        :key="member.id"
        v-bind="member"
      />
    </div>

    <div 
      v-if="membersStore.filteredMembers.length === 0" 
      class="text-center py-12 text-muted-foreground"
    >
      <p class="text-lg">Nenhum membro encontrado</p>
      <p class="text-sm mt-2">Tente ajustar os filtros de busca</p>
    </div>

    <DynamicDialog>
      <MemberFormDialog/>
    </DynamicDialog>
  </div>
</template>

<style scoped>
</style>