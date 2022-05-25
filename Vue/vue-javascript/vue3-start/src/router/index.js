import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/fieldOpen/classDetail/:crrseqId',
    name: 'TestComponent',
    component: () => import('../views/TestComponent.vue')
  },
  {
    path: '/test',
    name: 'TestPage',
    component: () => import('../views/Test'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
