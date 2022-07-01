import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    redirect: '/layout/home',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'look',
        name: 'look',
        component: () => import('@/views/Look')
      },
      {
        path: 'ask',
        name: 'ask',
        component: () => import('@/views/Ask')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/citys',
    name: 'citys',
    component: () => import('@/views/Citys')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/Map')
  },
  {
    path: '/mystar',
    name: 'mystar',
    component: () => import('@/views/My/MyStar')
  },
  {
    path: '/myrent',
    name: 'myrent',
    component: () => import('@/views/My/MyRent')
  },
  {
    path: '/addhouse',
    name: 'addhouse',
    component: () => import('@/views/AddHouse')
  },
  {
    path: '/commity',
    name: 'commity',
    component: () => import('@/views/Commity')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/Detail'),
    props: true
  }

]

const router = new VueRouter({
  routes
})

export default router
