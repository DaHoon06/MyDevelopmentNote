<template>
  <div>
    <b-container class="vh-100 d-flex flex-column ">
      <div>

      </div>
      <survey_desc v-if="false" @prev="prev" @next="next" :questionProp="questionList.desc"></survey_desc>
<!--      <survey-check v-if="true" @prev="prev" @next="next" :question-prop="questionList.check"></survey-check>-->
      <survey-check v-if="true" @prev="prev" @next="next" :question-prop="questionList.SQ1"></survey-check>
    </b-container>
    <div>
      <b-button @click="valueLog">테스트버튼</b-button>
    </div>
  </div>
</template>
<script>
import survey_desc from "@/components/survey/HY/survey_desc";
import SurveyCheck from "@/components/survey/HY/survey_check";
export default {
  name: "hySurveyIndex",
  components:{
    SurveyCheck,
    survey_desc
  },
  data: ()=> ({
    answerArray:{},
    questionList : {
      desc : {
        type:'DESC',
        name:'DESC0',
        title:'안내문',
        content:`
         <p>안녕하세요 반갑습니다. 본 조사는 조사 목적이 아닌 개발팀 신입사원 역량강화를 위해 실시되는 테스트의 참고 코드입니다.</p>
         <p>🌐 <b>[ 사용기술 ]</b> FE-VUE / BE-NEST / DB-MONGO </p>
         <p>🚩 <b>[ 사용 NPM ]</b> Bootstrap, Mongoose, Router, Chart</p>
         <p>🚩 <b>[ 목적 ]</b> 신입사원 역량강화 , 조사 개발 프로세스, 개발 프레임워크 학습</p>
          `,
      },
      check : {
        type:'CHECK',
        name:'CHECK_0',
        title:'안녕하십니까, 귀하가 좋아하는 메뉴를 선택해주십시오',
        content:[
          {text:'김치찌개',value:'1'},
          {text:'두부',value:'2'},
          {text:'백반',value:'3'},
          {text:'라면',value:'4'},
          {text:'우동',value:'5'},
        ]
      },
      SQ1:{
        type:'RADIO',
        name:'SQ1',
        title:'귀하의 성별은 무엇입니까?',
        content:[
          {text:'남성',value:'1'},
          {text:'여성',value:'2'}
        ]
      },
      SQ2: {
        type:'TEXT',
        name:'SQ2',
        title:'귀하의 연령은 어떻게 되십니까?',
        content:'',
      },
      SQ3: {
        type:'TEXT',
        name:'SQ2',
        title:'귀하의 연령은 어떻게 되십니까?',
        content:'',
      },
      SQ4: {
        type:'TEXT',
        name:'SQ2',
        title:'귀하의 연령은 어떻게 되십니까?',
        content:'',
      },
      C1: {
        type:'TEXT',
        name:'SQ2',
        title:'귀하의 연령은 어떻게 되십니까?',
        content:'',
      },
      C2: {
        type:'TEXT',
        name:'SQ2',
        title:'귀하의 연령은 어떻게 되십니까?',
        content:'',
      },
      C3: {
        type:'TEXT',
        name:'SQ2',
        title:'귀하의 연령은 어떻게 되십니까?',
        content:'',
      },
      D1: {
        type:'TEXT',
        name:'SQ2',
        title:'귀하의 연령은 어떻게 되십니까?',
        content:'',
      },
      D2: {
        type:'TEXT',
        name:'SQ2',
        title:'귀하의 연령은 어떻게 되십니까?',
        content:'',
      },
      D3: {
        type:'TEXT',
        name:'SQ2',
        title:'귀하의 연령은 어떻게 되십니까?',
        content:'',
      },
    },
  }),
  methods:{
    prev(){
      console.log('prev')
    },
    next(questionInfo){
      this.answerArray = {
        ...questionInfo
      }
      // const qName = 'SQ2';

    },
    valueLog(){
      for(const i of Object.keys(this.answerArray)){
        console.log({i,value:this.answerArray[i]})
      }

    }
  }


}
</script>

<style scoped>

</style>
