<template>
  <div id="app">
    <side-bar />
    <header-nav />
    <router-view/>
    <footer-page />
  </div>
</template>

<script>
import {Component,Vue} from "vue-property-decorator";
import SideBar from "@/components/commons/SideBar.vue";
import HeaderNav from "@/components/commons/HeaderNav.vue";
import FooterPage from '@/components/commons/FooterPage.vue';
@Component({
  components: {
    SideBar,
    HeaderNav,
    FooterPage
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
