<template>
  <div id="blogHome">

    <div>
      <b-container class="bv-example-row">
        <b-row>
          <b-col md="6" offset-md="3">
            <p>TEST</p>
            <h3>NEST</h3>
            <br/><br/>
            <hr/>
            <br/><br/>
            <p>BODY</p>

          </b-col>
        </b-row>
      </b-container>
    </div>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class NestIndex extends Vue{

}
</script>

<style scoped>

#blogHome {
  width: calc(100% - 300px);
  margin-left: 300px;
  min-height: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 1280px){
  #blogHome{
    margin: auto;
    min-height: 1000px;
    height: 100%;
  }
}

/* 테블릿 */
@media screen and (max-width: 1023px) {
  #blogHome{
    margin: auto;
    min-height: 1000px;
    height: 100%;
  }

}
</style>