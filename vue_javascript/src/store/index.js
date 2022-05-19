import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import dhStore from "@/store/DH";

const store = new Vuex.Store({
  modules: {
    dhStore: dhStore,
  }
})

export default store;