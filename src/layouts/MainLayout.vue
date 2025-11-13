<script setup lang="ts">
import { SidebarProvider } from "@/components/ui/sidebar"; 
import MinhaSidebar from "@/components/MinhaSidebar.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <SidebarProvider     style="--sidebar-width: 280px; --sidebar-width-mobile:300px;">
    <MinhaSidebar/>
    <main class="bg-background w-full" >
      <Header/>
      <RouterView/>
      <slot />
    </main>
  </SidebarProvider>
</template>