import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SurveyIndex from "@/views/survey/SurveyIndex";
import ChartIndex from "@/views/chart/ChartIndex";
import hySurveyIndex from "@/views/survey/hySurveyIndex";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/survey',
    name: 'Survey',
    component: SurveyIndex
  },
  {
    path: '/chart',
    name: 'Chart',
    component: ChartIndex
  },
  {
    path: '/dh/survey-index',
    name: 'dhSurvey',
    component: () => import('../components/survey/DH/survey-index')
  },
  {
    path: '/dh/index',
    name: 'dh-index',
    component: () => import('../views/survey/DH/index')
  },
  {
    path: '/hy/survey-index',
    name: 'hySurvey',
    component: hySurveyIndex
  },
  


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
