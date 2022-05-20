<template>
<div>

  <nav id="nav_bottom">

    <b-button-group>
      <b-dropdown right text="Menu">
        <b-dropdown-item>게시판</b-dropdown-item>
        <b-dropdown-item>ChartJS</b-dropdown-item>
        <b-dropdown-item>Item 3</b-dropdown-item>
      </b-dropdown>
    </b-button-group>

    <div class="menu">
      <ul>
        <li><a href="/board">게시판</a></li>
        <li><a href="/chart">ChartJS</a></li>
        <li><a href="/test">TEST</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
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

</div>
</template>

<script lang="ts">
import {Component,Vue} from "vue-property-decorator";

@Component
export default class NavBottom extends Vue{

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
  width: 1900px;
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

@media screen and (max-width: 1000px) {
  #nav_bottom div.menu{
    display: block;
  }
}
</style>