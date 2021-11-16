<template>
  <div id="app">
    <side-bar />
    <header-nav />
    <router-view/>
  </div>
</template>

<script>
import {Component,Vue} from "vue-property-decorator";
import SideBar from "@/components/commons/SideBar.vue";
import HeaderNav from "@/components/commons/HeaderNav.vue";
@Component({
  components: {
    SideBar,
    HeaderNav
  }
})
export default class App extends Vue{}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}




</style>
