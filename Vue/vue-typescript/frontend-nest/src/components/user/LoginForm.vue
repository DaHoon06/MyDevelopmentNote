<template>
  <div>

    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title>
        LOGIN FORM
      </template>

      <form v-on:submit="login">
        <div class="d-block text-center">
          <input type="text" v-model="id" class="login_input" placeholder="ID" />
        </div>
        <div class="d-block text-center">
          <input type="password" autocomplete="false" class="login_input" v-model='password' placeholder="Password" />
        </div>
        <button id="login_btn" type="submit">LOGIN</button>
      </form>
    </b-modal>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class LoginForm extends Vue{

  id: string;
  password: string;

  userInfo: {
    id: string,
    password: string
  };

  constructor() {
    super();

    this.id = 'hh@naver.com';
    this.password = '123qwe!@#';

    this.userInfo = {
      id: '',
      password: '',
    }
  }

  async login(){
    const info = {
      id: this.id,
      password: this.password
    }
    await this.$store.dispatch('login',info);
  }

}
</script>

<style scoped>

.login_input{
  width: 250px;
  border: none;
  border-bottom: 1px solid lightgray;
  outline: none;
  margin-top: 10px;
}

.d-block{
  float: left;
}

#login_btn{
  background: none;
  border: none;
  outline: none;
}

#login_btn:hover{
  cursor: pointer;
  color: #3b5999;
}
</style>