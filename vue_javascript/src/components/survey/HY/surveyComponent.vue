<template>
  <div class="shadow question">
    <p></p>
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import '@/assets/css/questionCommon.css'
export default {
  name: "surveyComponent"
}
</script>

<style scoped>

</style>
