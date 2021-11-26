<template>
<div>
  <header id="header">
    <div id="header-wrap">



    </div>
  </header>
</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class HeaderNav extends Vue{

}
</script>

<style scoped>

#header{
  width: calc(100% - 260px);
  margin-left: 260px;
  height: 180px;
  background: linear-gradient(17deg, rgba(17, 178, 92, 0.6) 40%, rgba(16, 182, 165, 0.6) 60%);
}


@media screen and (max-width: 1024px){
  #header{
    width: 100%;
    height: 180px;
    background: linear-gradient(17deg, rgba(17, 178, 92, 0.6) 40%, rgba(16, 182, 165, 0.6) 60%);
    margin-left: 0;
  }
}

</style>