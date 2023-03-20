import { createRouter, createWebHistory } from 'vue-router'
import Statistika from '../components/Pages/Statistika.vue'
import Register from '../components/Auth/Register.vue'
import Login from '../components/Auth/Login.vue'
import Dash from '../components/Dashboard/Dash.vue'
import Savdo from '../components/Pages/Savdo.vue'
import Chiqim from '../components/Pages/Chiqim.vue'
import Oylik from '../components/Pages/Oylik.vue'
import Foyda from '../components/Pages/Foyda.vue'
import Sqlar from '../components/Pages/Sqlar.vue'
import Tovartip from '../components/Pages/Tovartip.vue'
import User from '../components/Pages/User.vue'
import Yetkazuvchi from '../components/Pages/Yetkazuvchi.vue'
import Setting from '../components/Pages/Setting.vue'
import Valyuta from '../components/Pages/Valyuta.vue'
import Zadacha from '../components/Pages/Zadacha.vue'
import Tel from '../components/Pages/Tel.vue'
import Ensydash from '../components/Ensy/Ensydash.vue'
import Torgosoft from '../components/Torgo/Torgosoft.vue'
import Gbc from '../components/Gbc/Gbc.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: '/',
      component: Login
    },
    {
      path: '/notpag',
      name: 'notpag',
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
          path: '/valyuta',
          name: 'valyuta',
          component: Valyuta
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
          path: '/oylik',
          name: 'oylik',
          component: Oylik
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
          path: '/zadacha',
          name: 'zadacha',
          component: Zadacha
        },
      ],
    },
    {
      path: '/tel',
      name: 'tel',
      component: Tel
    },
    {
      path: '/ensy',
      name: 'ensy',
      component: Ensydash
    },
    {
      path: '/torgo',
      name: 'torgo',
      component: Torgosoft
    },
    {
      path: '/gbc',
      name: 'gbc',
      component: Gbc
    },
  ]
})

export default router
