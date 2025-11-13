<script setup>
import { CheckSquare, Users } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
// IMPORTAÇÕES FALTANTES:
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar'

const items = [
  {
    title: 'Todas as Tarefas',
    icon: CheckSquare,
    page: { name: 'tarefas' } 
  },
  {
    title: 'Equipe',
    icon: Users,
    page: { name: 'equipe' } 
  }
]
</script>

<template>
 <Sidebar side="left" class="border-r border-gray-500 hidden md:inline">
    <SidebarHeader > 
        <div class="h-18 py-10 border-b flex items-center justify-center">
            <h1>WTF Tasks</h1>
        </div>
    </SidebarHeader>
    <SidebarContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild class="">
                    <RouterLink :to="item.page" class="flex gap-2 p-2 bg-red-50">   
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
                    </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
    </SidebarContent>
  </Sidebar>
</template>