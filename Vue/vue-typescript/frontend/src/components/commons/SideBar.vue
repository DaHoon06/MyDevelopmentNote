<template>
<div>
  <section id="sideBar">
    <div id="sideBar-wrap">
      <div id="sidBar-title">
        <h3>HOME</h3>
      </div>
      <div class="sideBar_list">
        <b-list-group>
          <b-list-group-item href="#" variant="light">Item1</b-list-group-item>
          <b-list-group-item href="/test">Item2</b-list-group-item>
          <b-list-group-item href="#">Item3</b-list-group-item>
          <b-list-group-item href="#">Item4</b-list-group-item>
          <b-list-group-item href="#">Item5</b-list-group-item>
        </b-list-group>
      </div>

      <hr/>

      <div class="sideBar_list">
        <b-list-group>
          <b-list-group-item href="#" variant="light">전체글</b-list-group-item>
          <b-list-group-item href="#">Item7</b-list-group-item>
          <b-list-group-item href="#">Item8</b-list-group-item>
          <b-list-group-item href="#">Item9</b-list-group-item>
          <b-list-group-item href="#">Item10</b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </section>

  <section id="sub_side">
    <div >
      <b-navbar toggleable >
        <b-navbar-brand href="#">HOME</b-navbar-brand>

        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">item1</b-nav-item>
            <b-nav-item href="#">item2</b-nav-item>
            <b-nav-item href="#">item3</b-nav-item>
            <b-nav-item href="#">item4</b-nav-item>
            <b-nav-item href="#" disabled>item5</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </section>
</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class SideBar extends Vue{

}
</script>

<style scoped>

#sideBar {
  position: fixed;
  width: 260px;
  height: 1000px;
}

#sidBar-title{
  text-align: center;
  margin-top: 30px;
}

.sideBar_list{
  padding: 15px;
  margin: 30px 0 30px 0;
}

#sub_side{
  display: none;
}

hr {
  width: 200px;
  margin: auto;
}

ul {
  list-style: none;
}

@media screen and (max-width: 1024px){
  #sideBar{
    display: none;
  }

  #sub_side{
    display: block;
  }
}
</style>