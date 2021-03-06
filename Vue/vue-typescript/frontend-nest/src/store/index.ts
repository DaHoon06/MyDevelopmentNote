import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// Vue.$cookies.config('1d');

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  //컴포넌트간의 공통으로 사용될 데이터를 정의
  state: {
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
      state.memberName = userData.name || null
      state.memberEmail = userData.email || null
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
    async login(context,info){
      try {
        console.log('login 시도')
        const user = {
          id: info.id,
          password: info.password,
        }

        const { data } = await Vue.axios({
          url:'/user/login',
          method:'POST',
          data : user
        })

        console.log('data 출력--------')
        console.log(data);

        const { result,...userData } = data;

        if (result) {
          const user = userData;
          const jwt_token = userData.access_token;

          await context.commit('login', { user, jwt_token });
        }
      } catch (e) {
        throw new Error();
      }
    },
    async google_login(context, googleUser){
      try{
        const profile = googleUser.getBasicProfile();
        const { data } = await Vue.axios.post('/user/googleLogin',{
          info: profile,
        }) as { data: any};

        const { result , ...userInfo } = data;
        if(result){
          const userData = userInfo;
          const jwt_token = userInfo.access_token;
          //state 저장
          await context.commit('google_login',{ userData,jwt_token });
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
