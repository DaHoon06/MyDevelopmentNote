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
    memberCode: null,
    isLogin: false,
    //auth: null,
  },
  //공통으로 사용될 메소드 정의 여기서는 counter 수를 올리는데 사용할 것이다.
  getters:{
    token: state => {
      return state.token
    },
    memberName: state => {
      return state.memberName
    },
    memberCode: state => {
      return state.memberCode
    },
    isLogin: state => {
      return state.isLogin
    }
  },
  //mutations : state의 값을 변경시키는 로직이 들어가는곳!! - 동기 로직 ( setter 의 느낌 )
  mutations: {
    logout (state) {
      if(!confirm('로그아웃 하시겠습니까??')){
        return false;
      }
      state.memberName = null
      state.memberCode = null
      state.token = null
    },
    login (state, { token, memberName, memberCode }) {
      state.token = token
      state.memberName = memberName || null
      state.memberCode = memberCode || null
      state.isLogin = true
    },
    google_login(state,{ userData,jwt_token}){
      state.token = jwt_token
      state.memberName = userData.name || null
      state.memberCode = userData.sub || null
    },

  },
  // - 비동기 로직 : mutations의 값을 정의 commit
  actions: {
    async google_login(context,googleUser: any){
      try{
        const profile = googleUser.getBasicProfile();

        const user = await Vue.axios.post('/user/login',{
          info: profile,
        });

        if(user){
          let userData = user.data.userData.userInfo;
          let jwt_token = user.data.userData.token;
          //state 저장
          await context.commit('google_login',{userData,jwt_token});
        }
        return user; // 이건 무슨 역할???
      } catch (e) {
        throw Error(e);
      }
    },

    async login(context,{userId,userPwd}){
      try{
        const url = '/user/login'
        const method = 'post'

        const {data} = await Vue.axios({
          url,
          method,
          data: {
            userId,
            userPwd,
          }
        })
        const {result, token, memberCode, memberName} = data
        if(result) await context.commit('login',{token,memberCode,memberName});

        return result;
      } catch (e) {
        throw Error(e);
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
        throw Error(e)
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
