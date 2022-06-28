<template>
  <div class="question questionColor">
    <div class="question-header p-3 text-left">
      <div class="card-text h2" v-html="question.title"></div>
    </div>
    <div class="question-body p-3">
      <span class="card-text text-left" v-html="question.content"></span>
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
  name: "surveyComponent",
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
  border-left: 20px solid #42b983;
}

div.question{
  /*display: table;*/
}

div.question-header{
  display: flex;
  min-height: 90px;
  justify-content: center;
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
