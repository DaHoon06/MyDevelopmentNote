<template>
  <div>
    <div style="font-size: 18px" class="text-center my-4 mb-5">
      <h3 class="font-weight-bold">PMI DevTutorials</h3>
    </div>
    <b-container class="mt-2 pl-4">
      <b-row>
        <b-col cols="12" class="text-left">
          <p>이번 프로젝트를 통하여 설문을 만드는데 필요한 프레임워크를 학습해보도록 하겠습니다.</p>
          <p>사용하여 설문의 응답값을 토대로 Chart에 표현하는것까지가 최종목표 입니다.</p>

          <div id="skills" class="w-25 m-auto">
            <div class="text-left mt-3">
              <ul>
                <li><b>FrontEnd</b> : VueJS </li>
                <li><b>BackEnd</b> : NestJS</li>
                <li><b>DB</b> : MongoDB</li>
              </ul>
            </div>
          </div>

          <div class="mt-5 text-center mb-2">
            <survey-button
                :check="true"
                @next="next"
            ></survey-button>
          </div>

        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import SurveyButton from "@/components/survey/common/survey-button";

export default {
  name: "survey-index",
  components: {
    SurveyButton
  },
  methods: {
    async next(){
      const { data } = await this.axios.post('/survey/surveyData');
      const { result, uuid } = data;
      this.$store.commit('dhStore/setToken',uuid);

      return result ? this.nextQuestion() : false;
    },


  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}

#skills {
  border: 1px solid gray;
  border-radius: 10px;
}

ul{
  list-style: none;
}
ul li {
  margin-bottom: 5px;
}
</style>