<template>
  <section id="MainBody">
    <div id="MainBody-wrap">

      <!-- ToDoList 진행 상황 -->
      <div>
        <div id="chart-area">

        </div>
      </div>

      <!-- ToDOList 시작 -->
      <div>
        <board-index></board-index>
      </div>


    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BoardIndex from "@/components/board/BoardIndex.vue";
@Component({
  components: {
    BoardIndex
  }
})
export default class MainHome extends Vue {



}
</script>


<style scoped>
#MainBody{
  height: 100%;
  margin-left: 260px;
  background: #faf9f7;
}

#chart-area {
  border: 1px solid gray;
  width: 500px;
}

@media screen and (max-width: 1024px){
  #MainBody{
    height: 100%;
    margin-left: 0;
  }

  #chart-area {
    margin: auto;

  }
}

@media screen and (max-width: 340px){
  #chart-area {
    margin-top: 30px;
    width: 100%;
    margin: auto;
  }
}

</style>
