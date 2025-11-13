<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import Button from './ui/button/Button.vue';
import { SidebarTrigger } from "@/components/ui/sidebar";
</script>

<template>
    <header class="flex w-full bg-card h-18 items-center px-4 sm:px-8 py-10 border-b justify-between">
        
        <div class="hidden md:flex items-center justify-between w-full">
            <div>
                <SidebarTrigger class="md:hidden" />
                <h1 class="text-lg sm:text-2xl">Titulo da pagina</h1>
                <p class="hidden sm:inline">Descrição da página</p>
            </div>
            <Button size="lg" class="cursor-pointer">
                <Plus/>
               <p class="hidden sm:inline">Adicionar Membro</p> 
            </Button>
        </div>

        <div class="flex md:hidden items-center justify-between w-full">
            <SidebarTrigger />

            <h1 class="text-lg font-semibold">Titulo da pagina</h1>

            <Button size="icon" class="cursor-pointer">
                <Plus/>
            </Button>
        </div>

    </header>
</template>