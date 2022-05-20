<template>
  <div>
    <p class="h1">CHART PAGE</p>
    <a id="home" @click="directHome">HOME</a>
    <chart-component />
  </div>
</template>
<script>
import ChartComponent from '@/components/survey/DH/chart/chart-component.vue';

export default {
  name: "ChartIndex",
  components: {
    ChartComponent,
  },
  methods: {
    directHome() {
      this.$store.commit('dhStore/resetState');
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped>
#home {
  color: #060685;
  font-weight: bold;
}
#home:hover {
  cursor: pointer;
  color: #3b3b3b;
  border-bottom: 3px solid #111111;
}
</style>
