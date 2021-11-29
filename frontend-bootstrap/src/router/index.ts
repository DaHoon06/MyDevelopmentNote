import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('@/components/MainHome.vue')
  },
  {
    path: '/board',
    component: () => import('@/components/board/BoardIndex.vue')
  },
  {
    path: '/board/write',
    component: () => import('@/components/board/WriterForm.vue')
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
