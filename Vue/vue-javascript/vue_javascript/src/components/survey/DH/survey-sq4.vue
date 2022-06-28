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
import RadioComponent from "@/pages/survey/DH/radio/RadioComponent";

export default {
  name: "survey-sq4",
  components: {
    RadioComponent
  },
  data: () => ({
    question: {
      num: 'SQ4',
      title: '귀하께서는 최근 6개월 이내에 "전자기기 회사"에 관련된 시장 조사에 참여하신 적이 있으십니까?',
      radio: ['네, 있다.','아니오, 없다.'],
    },
    type: 'ans',
  }),
}
</script>

<style scoped>

ul {
  list-style: none;
}

</style>