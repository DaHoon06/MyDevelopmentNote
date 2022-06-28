<template>
  <div>
    <b-container class="p-0 text-left pl-3">
      <div class="mt-4 pl-2">
        <p><b>{{question.num}}. </b> {{question.title}}</p>
      </div>
      <hr />

      <div class="ml-4">
        <input
            id="ageInput"
            type="number"
            v-model="age"
            @click="notEmpty"
        /> 세 ( 만 나이 기준 )
      </div>

      <p class="mt-4 text-center" style="color: red"><b>{{errorMsg}}</b></p>

      <div class="mt-5 text-center mb-2">
        <survey-button
            :valid="valid"
            @next="next"
        ></survey-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import SurveyButton from "@/pages/survey/common/survey-button";

export default {
  name: "survey-sq2",
  components: {
    SurveyButton
  },
  data: () => ({
    question: {
      num: 'SQ2',
      title: '귀하의 연령은 어떻게 되십니까?',
    },
    age: '',
    errorMsg: '',
  }),
  methods: {
    next(){
      this.validation();
    },
    async validation() {
      if(this.age && Number(this.age) > 0){
        const sendData = {
          'QUESTION': this.question.num,
          'TOKEN': this.userToken,
          'PROGRESS': this.SQNumber,
          'DATA': Number(this.age)
        }
        const { data } = await this.axios.patch('/survey/surveyData',sendData);
        const { result } = data;
        if(result) this.nextQuestion()
      } else if(Number(this.age) <= 0 && this.age !== '') {
        this.errorMsg = '0보다 작은 수는 입력할 수 없습니다.';
      } else {
        this.errorMsg = '입력하지 않은 값이 존재합니다.';
      }
    },
    valid() {
      if(Number(this.age) > 0){
        return !!this.age;
      }
    },
    notEmpty() {
      this.errorMsg = '';
    }

  },



}
</script>

<style scoped>
#ageInput {
  width: 45px;
}
</style>