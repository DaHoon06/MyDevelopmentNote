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
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap');

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
