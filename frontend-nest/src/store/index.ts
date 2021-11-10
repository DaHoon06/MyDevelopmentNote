import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    //컴포넌트간의 공통으로 사용될 데이터를 정의
    //접근은 $store.state.counter 이러한 형태로 접근
    token: null,
    memberName: null,
    memberImg: null,
    isLogin: false,
    memberEmail: null,
  },
  //공통으로 사용될 메소드 정의 여기서는 counter 수를 올리는데 사용할 것이다.
  getters:{
    token: state => {
      return state.token
    },
    memberName: state => {
      return state.memberName
    },
    memberEmail: state => {
      return state.memberEmail
    },
    memberImg: state => {
      return state.memberImg
    },
    isLogin: state => {
      return state.isLogin
    }
  },
  //mutations : state의 값을 변경시키는 로직이 들어가는곳!! - 동기 로직 ( setter 의 느낌 )
  mutations: {
    login(state,{ userData, jwt_token }){
      state.token = jwt_token
     // state.memberName = userData.name || null
      state.memberEmail = userData.id || null
      state.isLogin = true
    },
    logout (state) {
      if(!confirm('로그아웃 하시겠습니까??')){
        return false;
      }
      state.memberName = null
      state.memberEmail = null
      state.memberImg = null
      state.token = null
    },
    google_login(state,{ userData, jwt_token }){
      state.token = jwt_token
      state.memberName = userData.Re || null
      state.memberEmail = userData.Yt || null
      state.memberImg = userData.oK || null
      state.isLogin = true
    },
  },
  // - 비동기 로직 : mutations의 값을 정의 commit
  actions: {
    async login(context,{id,password}){
      try {
        const res = await Vue.axios.post('/user/login', {
          id: id,
          password: password,
        });

        const {result, data} = res.data;
        if (res) {
          let userData = data.userInfo.id;
          let jwt_token = data.access_token;

          await context.commit('login', {userData, jwt_token});
        }
      } catch (e) {
        throw new Error();
      }
    },

    async google_login(context, googleUser){
      try{
        const profile = googleUser.getBasicProfile();
        const user = await Vue.axios.post('/user/googleLogin',{
          info: profile,
        });

        const { result, data } = user.data;
        if(result){
          let userData = data.userInfo.info;
          let jwt_token = data.access_token;
          //state 저장
          await context.commit('google_login',{userData,jwt_token});
        }
      } catch (e) {
        throw new Error();
      }
    },
    async verify (context) {
      try {
        const url = `/users/verify`
        const method = `get`
        const { data } = await Vue.axios({
          url,
          method,
        })
        const { result, token, auth, memberCode, memberName } = data

        if (result) {
          context.commit('login', { token, auth, memberCode, memberName })
        } else {
          context.commit('logout')
        }
        return { result, auth }
      } catch (e) {
        context.commit('logout')
        throw new Error()
      }
    },
    logout (context) {
      context.commit('logout')
    }
  },
  modules: {
  }

})

export default store;
