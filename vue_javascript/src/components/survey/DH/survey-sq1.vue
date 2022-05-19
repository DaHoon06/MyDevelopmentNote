<template>
  <div>
    <radio-component
        :question="question"
        :type="type"
        @survey-data="this.nextQuestion"
    ></radio-component>
  </div>
</template>

<script>
import RadioComponent from "@/components/survey/DH/radio/RadioComponent";

export default {
  name: "survey-sq1",
  components: {
    RadioComponent
  },
  data: () => ({
    question: {
      num: 'SQ1',
      title: '귀하의 성별은 무엇입니까?',
      radio: ['남성','여성'],
    },
    type: 'gender'
  }),
}
</script>

<style scoped>

</style>