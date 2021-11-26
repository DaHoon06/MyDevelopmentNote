<template>
  <div id="app">

    <side-bar></side-bar>
    <header-nav></header-nav>

    <router-view />

    <footer-page></footer-page>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SideBar from '@/components/commons/SideBar.vue';
import HeaderNav from '@/components/commons/HeaderNav.vue';
import FooterPage from '@/components/commons/FooterPage.vue';

@Component({
  components: {
    SideBar,
    FooterPage,
    HeaderNav,
  }
})
export default class App extends Vue {


}
</script>

<style>


</style>
