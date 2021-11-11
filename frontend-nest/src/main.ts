import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GAuth from 'vue-google-oauth2'
import VueAxios from 'vue-axios';
import VueCookies from "vue-cookies";
import Vuetify from "vuetify";
//import VueToast from 'vue-toast-notification';
import { BootstrapVue, IconsPlugin,PaginationNavPlugin } from 'bootstrap-vue'
const vue_moment = require('vue-moment');
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// @ts-ignore
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)

import { ins as axios} from './utils/axiosIns';


Vue.use(PaginationNavPlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookies);
Vue.use(Vuetify);
Vue.use(GAuth, {clientId: process.env.VUE_APP_ClientID, scope: process.env.VUE_APP_SCOPE})
//Vue.use(VueToast);
Vue.use(VueAxios,axios);
Vue.use(vue_moment);

Vue.config.productionTip = false
Vue.$cookies.config("60");


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
