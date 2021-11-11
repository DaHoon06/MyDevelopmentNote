<template>
  <div id="app">
    <header-page></header-page>

    <router-view />

    <footer-page></footer-page>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderPage from '@/components/commons/HeaderPage.vue';
import FooterPage from '@/components/commons/FooterPage.vue';

@Component({
  components: {
    HeaderPage,
    FooterPage,
  }
})
export default class App extends Vue {

}
</script>

<style>


</style>
