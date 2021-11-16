import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueAxios from 'vue-axios';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ins as axios} from '../utils/axiosIns';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios,axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
