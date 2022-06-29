<template>
  <div class="question questionColor">
    <div class="question-header pt-5 pl-5 pr-2 pb-2 text-left border-bottom">
      <p class="h5">
        {{question.name}}.{{question.title}}
      </p>
    </div>
    <div class="question-body text-left pt-3 pl-5">
<!--      <b-form-group>-->
<!--        <b-form-checkbox-group-->
<!--            v-model="question.answer"-->
<!--            :options="question.content"-->
<!--            switches-->
<!--            name="a"-->
<!--            stacked>-->
<!--        </b-form-checkbox-group>-->
<!--      </b-form-group>-->
      <b-form-group>
        <b-form-radio-group
            v-model="question.answer"
            :options="question.content"

            stacked>
        </b-form-radio-group>
      </b-form-group>
    </div>
    <div class="question-footer p-3">
      <survey-footer @next="next" @prev="prev"></survey-footer>
    </div>
  </div>
</template>

<script>
import '@/assets/css/questionCommon.css'
import SurveyFooter from "@/pages/survey/HY/common/surveyFooter";
export default {
  name: "surveyCheck",
  components: {SurveyFooter},
  props:{
    questionProp:{
      type:Object,
    }
  },
  data: ()=>({
    question:{
      type:'',
      name:'',
      title:'',
      content:'',
      answer:'',
    }
  }),
  methods:{
    prev(){
      this.$emit('prev');
    },
    next(){
      const sendData = {};
      sendData[this.question.name] = {
        answer : '1'
      }
      this.$emit('next',sendData);
    },

  },
  created(){
    this.question = this.$props.questionProp;
  }

}
</script>

<style scoped>
div.questionColor{
  --borderWidth: 3px;
  background: #fff;
  position: relative;
  border-radius: var(--borderWidth);
}

div.questionColor:after {
  content: '';
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-6 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(101% + var(--borderWidth) * 2);
  background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b , #1098ad, #07b39b, #6fba82);
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
}

@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}


div.question-header{
  display: flex;
  min-height: 90px;
}

div.question-body{
  display: flex;
  min-height: 160px;
}

div.question-footer{
  display: flex;
  min-height: 80px;
}

</style>
