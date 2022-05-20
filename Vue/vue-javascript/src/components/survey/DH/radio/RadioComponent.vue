<template>
  <b-container class="p-0 text-left pl-3">
    <div class="mt-4 pl-2">
      <p><b>{{question.num}}.</b> {{question.title}}</p>
    </div>
    <hr />
    <div>
      <ul v-for="(text, index) of question.radio" >
        <li class="float-left mr-4">
          <input
              :name='type'
              :id="index"
              @change="msgClear"
              type="radio"
              :value="index+1"
              v-model="radioData"
          />
          <label :for="index" >{{ text }}</label>
        </li>
      </ul>
    </div>
    <br />
    <p class="mt-4 text-center" style="color: red" ><b>{{ errorMsg }}</b></p>
    <div class="mt-5 text-center mb-2">
      <survey-button
          @next="next"
          :valid="valid"
      ></survey-button>
    </div>

  </b-container>
</template>

<script>
import SurveyButton from "@/components/survey/common/survey-button";

export default {
  name: "RadioComponent",
  props: {
    question: Object,
    type: String,
  },
  components: {
    SurveyButton
  },
  data: () => ({
    radioData: 0,
    errorMsg: '',
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
      return !!this.radioData
    },

    msgClear() {
      this.errorMsg = '';
    }
  },

  computed: {
    radioCheck() {
      if(!this.radioData) {
        this.errorMsg = '';
      }
    }
  },

}
</script>

<style scoped>
ul {
  list-style: none;
}

</style>