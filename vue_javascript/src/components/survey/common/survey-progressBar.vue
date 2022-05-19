<template>
  <b-col class="px-0 mt-4" id="progressBar">
    <div class="d-flex align-items-end justify-content-end" style="font-size: small">
      <div>
        <b>진행률 :</b>
      </div>
      <div class="col-md-3 col-4">
        <b-progress
            variant="success"
            :value="current"
            :max="maxVal"
            class="mb-0"
            show-value
        ></b-progress>
      </div>
    </div>

  </b-col>
</template>

<script>
export default {
  name: "survey-progressBar",
  props: {
    current: Number,
    maxVal: Number,
  },
}
</script>

<style scoped>
#progressBar {
  box-shadow: 0.18rem 0.18rem 2px rgb(118, 118, 121);
  border-bottom: 2px solid #67696c;
  border-radius: 5px;
  padding-bottom: 30px;
}
</style>