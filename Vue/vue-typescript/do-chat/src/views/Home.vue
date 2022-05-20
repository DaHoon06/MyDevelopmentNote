<template>
  <login-component />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginComponent from "@/components/LoginComponent.vue";


@Component({
  components: {
    LoginComponent
  },
})
export default class Home extends Vue {}
</script>

