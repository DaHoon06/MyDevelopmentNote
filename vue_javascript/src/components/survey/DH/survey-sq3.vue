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
  name: "survey-sq3",
  components: {
    RadioComponent
  },
  data: () => ({
    question: {
      num: 'SQ3',
      title: '귀하께서 현재 거주하시는 곳은 어디입니까?',
      radio: ['서울','인천','경기도','충청도','강원도','전라도','경상도','기타'],
    },
    type: 'location'
  }),
}
</script>

<style scoped>

</style>