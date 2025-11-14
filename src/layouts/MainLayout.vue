<script setup lang="ts">
import { SidebarProvider } from "@/components/ui/sidebar"; 
import MinhaSidebar from "@/components/MinhaSidebar.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <SidebarProvider style="--sidebar-width: 300px; --sidebar-width-mobile:300px;">
    <MinhaSidebar/>
    <main class="bg-card w-full" >
      <Header/>
      
      <div class="w-full max-w-5xl mx-auto px-4 sm:px-8 py-4">
        <RouterView/>
        <slot />
      </div>

    </main>
  </SidebarProvider>
</template>