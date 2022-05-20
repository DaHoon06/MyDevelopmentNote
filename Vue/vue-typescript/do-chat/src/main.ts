import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ins as axios } from "@/utils/axios";
import VueAxios from "vue-axios";
import { io } from 'socket.io-client';
import { GlobalMixin } from "@/mixins/global.mixin";

const socket = io('http://localhost:9001');

Vue.config.productionTip = false;
Vue.prototype.$socket = socket;

Vue.use(VueAxios, axios);
Vue.mixin(GlobalMixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
