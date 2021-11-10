<template>
<div>

  <nav id="nav_bottom">

    <b-button-group>
      <b-dropdown right text="Menu">
        <b-dropdown-item to="/board">게시판</b-dropdown-item>
        <b-dropdown-item to="/chart">ChartJS</b-dropdown-item>
        <b-dropdown-item to="/test">TEST</b-dropdown-item>
      </b-dropdown>
    </b-button-group>

    <div class="menu">
      <ul>
        <li><a href="/board">게시판</a></li>
        <li><a href="/chart">ChartJS</a></li>
        <li><a href="/test">TEST</a></li>
        <li><a id="show-btn" @click="$bvModal.show('bv-modal-example')">Login</a></li>
      </ul>
    </div>

    <div id="sub_menu">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </div>

  </nav>

  <login-form></login-form>

</div>
</template>

<script lang="ts">
import {Component,Vue} from "vue-property-decorator";
import LoginForm from "@/components/user/LoginForm.vue";

@Component({
  components: {LoginForm},
  LoginForm,
})
export default class NavBottom extends Vue{

  login(){}


}
</script>

<style scoped>

nav > div > ul {
  list-style: none;
}

ul > li {
  float: left;
  margin-left: 20px;
}

#nav_bottom{
  background-color: rgb(88, 87, 155);
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#nav_bottom> div > ul > li > a {
  color: #ffffff;
  text-decoration: none;
}

#nav_bottom > div > ul > li {
  width: 80px;
  height: 30px;
  text-align: center;
}

#sub_menu{
  display: none;
}

#show-btn:hover{
  cursor: pointer;
  color: #adb5bd;
}

@media screen and (max-width: 1000px) {
  #nav_bottom div.menu{
    display: block;
  }
}
</style>