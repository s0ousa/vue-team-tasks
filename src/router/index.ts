import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Equipe from '@/pages/Equipe.vue'
import Tarefas from '@/pages/Tarefas.vue'
import MainLayout from '@/layouts/MainLayout.vue'

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      component: MainLayout,
        children: [
          {
            path: '',
            redirect: '/tarefas'
          },
          {
            path: 'tarefas',
            name: 'tarefas',
            component: Tarefas,
            meta: {
              title: 'Gerenciamento de Tarefas',
              subtitle: 'Organize e acompanhe o progresso da sua equipe',
           }
          },
          {
            path: 'equipe',
            name: 'equipe',
            component: Equipe,
            meta: {
              title: 'Gerenciamento de Equipe',
              subtitle: 'Gerencie os membros da sua equipe',
            }
          }
        ]
      }
    ]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})