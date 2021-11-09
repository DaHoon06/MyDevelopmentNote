import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainHome from '../components/MainHome.vue'
import BoardIndex from '../components/board/BoardIndex.vue';
import WriterForm from "@/components/board/WriterForm.vue";
import DetailBoard from '@/components/board/DetailBoard.vue';

import JoinForm from  '@/components/user/JoinForm.vue';

import chartIndex from '@/components/chart/chartIndex.vue';
import ImageBanner from "@/components/ImageBanner.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'MainHome',
    component: MainHome
  },
  {
    path: '/board/write/:id?',
    name: 'WriterForm',
    component: WriterForm
  },
  {
    path: '/board/:page?',
    name: 'BoardIndex',
    component: BoardIndex
  },
  {
    path: '/board/detail/:id',
    name: 'DetailBoard',
    component: DetailBoard
  },
  {
    path: '/signIn',
    name : 'JoinForm',
    component: JoinForm
  },
  {
    path: '/chart',
    name : 'chartIndex',
    component: chartIndex
  },
  {
    path: '/test',
    name : 'ImageBanner',
    component: ImageBanner
  }



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
