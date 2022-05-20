<template>
  <div>



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