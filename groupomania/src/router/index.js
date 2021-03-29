import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Connexion from '../views/Connexion.vue'
import Profil from '../views/Profil.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      localStorage.getItem('user') ? next() : next({ name: 'Connexion'})
    }
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil,
    beforeEnter: (to, from, next) => {
      localStorage.getItem('user') ? next() : next({ name: 'Connexion'})
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
