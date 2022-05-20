import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import store from '@/store';

@Component
export class GlobalMixin extends Vue {
  public $store = store;

  get isLogin() {
    return this.$store.getters['userStore/isLogin'];
  }
  set isLogin(payload: boolean) {
    this.$store.commit('userStore/isLogin', payload);
  }

  get getName() {
    return this.$store.getters['userStore/name'];
  }
  get getToken() {
    return this.$store.getters['userStore/token'];
  }
}
