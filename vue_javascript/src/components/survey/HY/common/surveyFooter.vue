<template>
  <div  class="w-100">
    <b-row class="d-flex justify-content-center">
      <b-col cols="2">
        <b-button class="w-100" variant="outline-info" @click="prev">이전</b-button>
      </b-col>
      <b-col cols="2">
        <b-button class="w-100" variant="outline-success" @click="next">다음</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "surveyFooter",
  data: ()=>({
  }),
  methods:{
    prev(){
      this.$emit('prev');
    },
    next(){
      this.$emit('next');
    },

  }
}
</script>

<style scoped>
</style>
