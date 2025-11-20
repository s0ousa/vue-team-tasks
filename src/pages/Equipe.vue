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
        }
    )

    onUnmounted(() => {
        headerStore.clearHeader()
})
    
</script>
<template>
    <div>
        <SearchBox/>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-12">
            <MemberCard
                v-for="member in membersStore.members"
                :key="member.id"
                v-bind="member"
            />
            
        </div>

        <DynamicDialog>
            <MemberFormDialog/>
        </DynamicDialog>
    </div>
</template>

<style scoped>

</style>