<script setup lang="ts">
    import {
        Card,
        CardContent,
        CardTitle,
    } from '@/components/ui/card'

    const props = defineProps({
    title: String,
    quantity: Number || String,
    color: String
    })

</script>
<template>
   <Card class="w-full h-26 ">
    <CardContent class="flex flex-col gap-2 items-start justify-center">
            <CardTitle>{{title}}</CardTitle>
            <p class="text-3xl">
                {{ quantity }}
            </p>
        </CardContent>
        </Card>
</template>


<style scoped>

</style>