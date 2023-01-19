import { createRouter, createWebHistory } from 'vue-router'
import Statistika from '../components/Pages/Statistika.vue'
import Register from '../components/Auth/Register.vue'
import Login from '../components/Auth/Login.vue'
import Dash from '../components/Dashboard/Dash.vue'
import Savdo from '../components/Pages/Savdo.vue'
import Chiqim from '../components/Pages/Chiqim.vue'
import Foyda from '../components/Pages/Foyda.vue'
import Korsatma from '../components/Pages/Korsatma.vue'
import Sqlar from '../components/Pages/Sqlar.vue'
import Tovartip from '../components/Pages/Tovartip.vue'
import User from '../components/Pages/User.vue'
import Yetkazuvchi from '../components/Pages/Yetkazuvchi.vue'
import Setting from '../components/Pages/Setting.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      component: Dash,
      children: [
        {
          path: '/dash',
          name: 'dash',
          component: Statistika
        },
        {
          path: '/setting',
          name: 'setting',
          component: Setting
        },
        {
          path: '/treding',
          name: 'treding',
          component: Savdo
        },
        {
          path: '/tovartip',
          name: 'tovartip',
          component: Tovartip
        },
        {
          path: '/sqlad',
          name: 'sqlad',
          component: Sqlar
        },
        {
          path: '/user',
          name: 'user',
          component: User
        },
        {
          path: '/yetkazuvchi',
          name: 'yetkazuvchi',
          component: Yetkazuvchi
        },
        {
          path: '/chiqim',
          name: 'chiqim',
          component: Chiqim
        },
        {
          path: '/foyda',
          name: 'foyda',
          component: Foyda
        },
        {
          path: '/korsatma',
          name: 'korsatma',
          component: Korsatma
        },
      ],
    },

  ]
})

export default router
