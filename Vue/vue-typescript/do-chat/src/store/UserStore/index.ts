import { Module } from 'vuex';
import { ins as axios } from '@/utils/axios';
import { IStore } from "@/interfaces/common";

const UserStore: Module<IStore.State, IStore.State> = {
  namespaced: true,
  state: {
    isLogin: false,
    name: '',
    token: '',
  },
  getters: {
    isLogin: state => state.isLogin,
    token: state => state.token,
    name: store => store.name,
  },
  mutations: {
    login(state: IStore.State, payload: IStore.LoginSuccess) {
      const { name, token } = payload;
      state.isLogin = true;
      state.token = token;
      state.name = name;
    },
    logout(state: IStore.State){
      state.isLogin = false;
      state.token = '';
      state.name = '';
    },
    isLogin(state: IStore.State, payload: boolean) {
      state.isLogin = payload;
    }
  },
  actions: {
    async login(context, sendData) {
      try {
        const { data } = await axios.post('/user/auth', sendData);
        context.commit('login', data);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async logout(context, payload) {
      try {
        const sendData = {
          name: payload
        }
        console.log(sendData)
        const result = await axios.patch('/user/logout', sendData);
        if (result) context.commit('logout');

        return true
      } catch (e) {
        return false;
      }
    },
    async verify(context, payload) {
      try {
        const { token } = payload;
        const { data, status } = await axios.post(`/user/auth/${token}`);
        console.log(data);
        if (status === 201) return true
      } catch (e) {
        return false;
      }
    },

  },
}

export default UserStore;
