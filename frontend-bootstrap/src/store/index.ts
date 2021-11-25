import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//import ToDoStore from '@/store/modules/ToDoStore.js';

const store = new Vuex.Store({
  modules: {
    //ToDoStore: ToDoStore
  },
});

export default store;