<template>
  <div id="app">
    <side-bar></side-bar>

    <router-view />

    <footer-page></footer-page>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SideBar from '@/components/commons/SideBar.vue';
import FooterPage from '@/components/commons/FooterPage.vue';

@Component({
  components: {
    SideBar,
    FooterPage,
  }
})
export default class App extends Vue {

}
</script>

<style>


</style>
