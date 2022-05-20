import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueAxios from 'vue-axios';
import { ins as axios } from './utils/axios';

Vue.use(IconsPlugin);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.mixin({
  data:() => ({
    loading: false
  }),
  methods: {
    nextQuestion() {
      return this.$emit('survey-data', this.$store.getters['dhStore/getSurveyData']);
    }
  },
  computed: {
    userToken() {
      return this.$store.getters['dhStore/getToken'];
    },
    SQNumber() {
      return this.$store.getters['dhStore/getSQNumber'];
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
