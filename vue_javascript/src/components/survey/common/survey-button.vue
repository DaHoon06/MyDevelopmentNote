<template>
  <div>
    <b-button
      pill
      variant="outline-secondary"
      @click="next"
    >
      다음
    </b-button>
  </div>
</template>

<script>
export default {
  name: "survey-button",
  props:{
    check: Boolean,
    valid: {
      type: Function,
      default: function () {
        return true;
      }
    },
  },
  methods: {
    next() {
      this.nextSQNumber();
      this.$emit('next',this.SQNumber);
    },
    nextSQNumber() {
      if(this.valid() && this.SQNumber < 6) {
        this.$store.commit('dhStore/setSQNumber');
      }
    }

  }
}
</script>

<style scoped>

</style>