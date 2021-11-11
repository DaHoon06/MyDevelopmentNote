<template>
  <div>

    <div class="header_wrapper">

      <nav id="header_wrapper">
        <div>
          <ul>
            <li v-if="this.$store.state.token === null">
              <g-signin-button id="g_login_btn"
                               :params="googleSignInParams"
                               @success="onSignInSuccess"
                               @error="onSignInError">
                <img src="data:image/png;base64,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" alt="img">
              </g-signin-button>
            </li>
            <li v-else>
              <div id="profile_img">
                <img alt="img" v-if="this.$store.state.memberImg" :src="this.$store.state.memberImg" />
                <a id="logout_btn" @click="$store.commit('logout')">로그아웃</a>
              </div>
            </li>
            <li> | </li>
            <li v-if="this.$store.state.token === null"><a href="/signIn">회원가입</a></li>
            <li v-else>마이페이지</li>
            <li>출석체크</li>
            <li>고객센터</li>
            <li>주문배송</li>
            <li>
              <img alt="img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAACOjo6SkpJ2dnbCwsL19fXd3d19fX38/Pzz8/NwcHAWFhbMzMxQUFDo6OiioqLU1NSpqakbGxuenp58fHwjIyMKCgo0NDTk5OTFxcVjY2NBQUFNTU23t7cfHx+FhYVbW1tOTk4qKipFRUVeXl4xMTGwsLBzOtNhAAADtUlEQVR4nO3c61LqMBQF4ABSCnIpCoo3LMfLef83PI6nBaU4bUr3Wmld339n9hpLmmQndU5ERERERERERERERERERERERERERET2hulFNYMRu9R6XnvVJexi67jwCNjrLdnl+otuvRLG7Hr93XkF7D2x663h2S/ihF2vvyu/hC38IbqVV8JWjqbRbFjqfpAlvGRXa2aU/xPZhZgZX7d3qKkon/oM2YWYyX+IK3YhZoZZwja+86tZZAmn7ELs5INpS5dQFTx0fqjJ5z4tXF5UNMsSztmFmInyoaa77/zHzg816zYvLyrJV5JrdiFm8uXFhl2ImUm+vIjYlZh5yhLO2IWYiTs/1OTLix27EDPd38lw+f74gl2ImT+/ZnnRZxdipvs7GfvlRR9uAJpmeLZxmgRaePu1UxsF2sVMeAlBb6hReSVGbjAB3YSWELbVPmclvEMlXJfXYuIRFdBtSQkHsISsoQa3vxfdUALiHtLDTgYW7iE9NEqxkJvQw/JymvcCDLhvlEIhH9JDoxQJ2yl5KC+oaag5aYawvMA+pPtGKRC4nTeGB9yMsQn3jVIY+M5eXF5Ts+BHWj2P3J7tHR0QvrzAbz/vG6UghHPX2J2MW3xAl0ITpoSE2OUF43IAdKh5JgR0DjnUpJSEyKGGc4PF7w7KWd7Rc9L/7nEJSYdZo/LKmsI6nDRFBeSMpA7YKKWduIbtZNBO0C1RCVkBYUMN8VoA6J1PPOaJ2cmYcl73nzCNUuaBcszygnkWGdIovaGeJ0cMNdxL1X1AwntqQsTygjiSOu/PadTBvvnv90mUOthHrd/ME5ID2i8vLtgJzRul7IfUvFE65V8f29gmZI+kznx5QX9IrRulIVyntn3nP7DjfZiYbikG8JA6t7NMyJ2TZiwbpSE8pLaN0i073CfLoYb/uv+07Q9s9Lt7WVxERDpulsTxqu4e7jKJ16sgJts/+pttLt5e1fjjbd4EWQUx3z4l2h3mW3PfCdf4ywWO11A/uPHtm+e+31j61uPhtpt+dHT2xG8P6ajFE+Tn7grdUp/DdoWLYtyG02mFy88+zenCdcY3szrrK2ycvnv8mAqd1usANtmOLIpdqOoj4qT4KZHwvll4YqnvkbD4x+El7P7/8MTv0GNq0obfYbGB0bmxtPvvw+7Pac6cl+6+/nGg81IXfTm2sPNeW1we/jjYtcXH+jBrRNVbH75kAcP+puYsSdOk7l71MknrbxCIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiEjz/gGftjT99RsE1AAAAABJRU5ErkJggg==" width="30px">
            </li>
          </ul>
        </div>
      </nav>

      <navi-middle></navi-middle>
    </div>

    <navi-bottom></navi-bottom>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NaviBottom from './NavBottom.vue'
import NaviMiddle from './NavMiddle.vue'
import { ENV } from "../../../env.config";

@Component({
  components: {
    NaviBottom,
    NaviMiddle
  }
})
export default class HeaderPage extends Vue{

  googleSignInParams: any = {
    client_id: ENV.ClientID
  }

  async onSignInSuccess (googleUser: any) {
    await this.$store.dispatch('google_login',googleUser);
  }

  async onSignInError (error: any) {
    console.log('OH NOES', error)
  }

}
</script>

<style scoped>

#logout_btn{
  color: #adb5bd;
}
#logout_btn:hover {
  color: #bebebf;
  cursor: pointer;
}
#g_login_btn img {
  width: 27px;
}
#g_login_btn:hover{
  cursor: pointer;
}


#header_wrapper{
  background-color: #ffffff;
  width: 1900px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

nav > div > ul {
  list-style: none;
}

ul > li {
  float: left;
  margin-left: 20px;
}

#profile_img img{
  border-radius: 100%;
  width: 25px;
  margin-right: 5px;
}

.header_wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 1000px) {
  .header_wrapper{
    display: block;
  }
}

@media screen and (max-width: 1000px){
  #header_wrapper{
    display: block;
    margin: 0;
  }
}

</style>