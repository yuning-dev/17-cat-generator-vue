import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import CatDetails from '@/pages/CatDetails/CatDetails.vue'
import CatGenerator from '@/pages/CatGenerator/CatGenerator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/generator',
      name: 'generator',
      component: CatGenerator
    },
    {
      path: '/details/:id',
      name: 'details',
      component: CatDetails
    }
  ]
})

export default router
