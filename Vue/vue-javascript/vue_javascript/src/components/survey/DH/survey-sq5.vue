<template>
  <div>
    <b-container class="p-0 text-left pl-3">
      <div class="mt-4 pl-2">
        <p><b>{{question.num}}. </b> {{question.title}}</p>
      </div>
      <hr />

      <div class="ml-3">
        <table>
          <thead>
          <tr>
            <td class="table-thead" v-for="text of surveyHead" :key="text">
              {{text}}
            </td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td v-for="(text,index) of surveyHead" class="table-tbody" :key="index+1">
              <input
                  type="radio"
                  @change="msgClear"
                  v-model="radioData"
                  :value="index+1">
            </td>
          </tr>
          </tbody>
        </table>
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
import SurveyButton from "@/components/survey/common/survey-button";

export default {
  name: "survey-sq5",
  components: {
    SurveyButton
  },
  data: () => ({
    question: {
      num: 'SQ5',
      title: '본 설문에 얼나마 만족하십니까?',
    },
    surveyHead: ['전혀 만족하지 않는다.','만족하지 않는다.','보통이다.','만족한다.','매우 만족한다.'],
    errorMsg: '',
    radioData: 0,
  }),
  methods: {
    next(){
      this.validation();
    },
    async validation() {
      if(this.radioData){
        const sendData = {
          'QUESTION': this.question.num,
          'TOKEN': this.userToken,
          'PROGRESS': this.SQNumber,
          'DATA': this.radioData
        }
        const { data } = await this.axios.patch('/survey/surveyData',sendData);
        const { result } = data;

        if(result) this.nextQuestion();
      } else {
        this.errorMsg = '입력하지 않은 값이 존재합니다.';
      }
    },
    valid() {
      return !!this.radioData;
    },
    msgClear() {
      this.errorMsg = '';
    }
  },

}
</script>

<style scoped>
.table-thead {
  width: 180px;
  height: 33px;
  text-align: center;
  font-weight: bold;
  background: lightgray;
  border: 1px solid #a19f9f;

}

.table-tbody {
  border: 1px solid #a19f9f;
  text-align: center;
}
</style>