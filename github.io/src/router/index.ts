import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('@/components/BlogHome.vue')
  },
  {
    path: '/node',
    name: 'node',
    component: () => import('@/components/node/IndexPage.vue')
  },
  {
    path: '/nest',
    name: 'nest',
    component: () => import('@/components/nest/IndexPage.vue')
  },
  {
    path: '/vue',
    name: 'vue',
    component: () => import('@/components/vue/IndexPage.vue')
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
export default router
