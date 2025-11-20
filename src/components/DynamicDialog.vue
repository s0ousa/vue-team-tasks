<script setup lang="ts">
import { useHeaderStore } from '@/stores/HeaderStore';
import { Dialog, } from '@/components/ui/dialog';

const headerStore = useHeaderStore();
</script>

<template>
  <Dialog :open="headerStore.isDialogOpen" @update:open="headerStore.isDialogOpen = $event">
      <slot /> <!-- p poder o conteudo vir da pagina-->
  </Dialog>
</template>