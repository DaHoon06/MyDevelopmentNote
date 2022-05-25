<template>
  <div>
    test
  </div>
</template>

<script>
export default {
  name: "TestComponent",
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log('TEST')
      const seq = this.$route.params.crrseqId;
      console.log(seq);
    }
  }
}
</script>

<style scoped>

</style>