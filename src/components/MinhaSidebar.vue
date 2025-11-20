<script setup>
import { CheckSquare, Users } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar'

const { setOpenMobile } = useSidebar();


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
 <Sidebar side="left" class="border-r bg-card border-border hidden md:inline">
    <SidebarHeader > 
        <div class="h-18 py-9 border-b border-border flex items-center justify-center">
            <img src="@/assets/WTFLogo.png"  class="invert w-28">
        </div>
    </SidebarHeader>
    <SidebarContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title" class="mx-4 ">
                <SidebarMenuButton asChild  class=" px-2 py-6 rounded-md ">
                    <RouterLink 
                      :to="item.page"  
                      @click="setOpenMobile(false)" 
                      class="w-full "
                      active-class="!bg-accent !text-accent-foreground hover:!bg-accent text-"
                    >   
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
                    </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
    </SidebarContent>
  </Sidebar>
</template>