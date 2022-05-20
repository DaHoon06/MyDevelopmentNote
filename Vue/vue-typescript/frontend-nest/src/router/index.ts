import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('@/components/BlogHome.vue')
  },

  {
    path: '/board/write/:id?',
    component: () => import('@/components/board/WriterForm.vue')
  },
  {
    path: '/board/:page?',
    component: () => import('@/components/board/BoardIndex.vue')
  },
  {
    path: '/board/detail/:id',
    component: () => import('@/components/board/DetailBoard.vue')
  },
  {
    path: '/signIn',
    component: () => import('@/components/user/JoinForm.vue')
  },
  {
    path: '/chart',
    component: () => import('@/components/chart/chartIndex.vue')
  },
  {
    path: '/test',
    component: () => import("@/components/IndexPage.vue")
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
export default router
