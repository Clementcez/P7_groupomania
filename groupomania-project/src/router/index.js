import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
