<template>
  <div>
    <survey-progress-bar
        :current="sq"
        :maxVal="maxVal"
        v-if="this.SQNumber < 6"
    ></survey-progress-bar>

    <b-container class="mt-5">
      <b-row>
        <b-col id="desc_wrapper" cols="12">
          <div class="side-background"></div>
          <component
              :is="dynamicComponents"
              @survey-data="changeComponent"
          ></component>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import surveyButton from'@/pages/survey/common/survey-button';
import SurveyProgressBar from "@/pages/survey/common/survey-progressBar";
import RadioComponent from "@/pages/survey/DH/radio/RadioComponent";

export default {
  name: "dh-index",
  components: {
    SurveyProgressBar,
    surveyButton,
    RadioComponent,
    'survey-index': () => import('@/pages/survey/DH/survey-index'),
    'survey-sq1': () => import('@/pages/survey/DH/survey-sq1'),
    'survey-sq2': () => import('@/pages/survey/DH/survey-sq2'),
    'survey-sq3': () => import('@/pages/survey/DH/survey-sq3'),
    'survey-sq4': () => import('@/pages/survey/DH/survey-sq4'),
    'survey-sq5': () => import('@/pages/survey/DH/survey-sq5'),
    'survey-end': () => import('@/pages/survey/DH/survey-end'),
  },
  data:() => ({
    sq: 0,
    maxVal: 5,
  }),
  methods:{
    changeComponent(){
      this.sq = this.SQNumber;
    }
  },
  computed: {
    dynamicComponents() {
      switch (this.sq){
        case 0:
          return 'survey-index';
        case 1:
          return 'survey-sq1';
        case 2:
          return 'survey-sq2';
        case 3:
          return 'survey-sq3';
        case 4:
          return 'survey-sq4';
        case 5:
          return 'survey-sq5';
        default: {
          return 'survey-end';
        }
      }
    },

  },

}
</script>

<style scoped>

#desc_wrapper {
  border: solid 1px #041b4b;
  border-radius: 10px;
  box-shadow: 0.18rem 0.18rem 2px rgb(128, 126, 126);
  padding: 0;
}

.side-background {
  background: #041b4b;
  width: 16px;
  border-radius: 10px 0 0 10px;
  position: absolute;
  left: -3px;
  height: 100%
}
</style>