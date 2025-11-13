<script setup lang="ts">
    const props = defineProps({
        title: String,
        quantity: Number,
    })


</script>
<template>
    <div class="bg-red-200 w-3xs rounded-lg p-4 flex flex-col gap-1.5 ">
        <p class="text-md ">Total de tarefas</p>
        <p class="text-2xl font-semibold">12</p>
    </div>
</template>


<style scoped>

</style>