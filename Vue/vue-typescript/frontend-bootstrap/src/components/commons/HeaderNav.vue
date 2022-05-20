<template>
<div>
  <header id="header">
    <div id="header-wrap">

        <button class="googleBtn">
          <img class="google_logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbAeoW6pgRV5d6lrao5OZ3JTiAxUHC18nxMd5FnwwMX-Wgz-qFlkYrB0uo6AZM_Bz1OTk&usqp=CAU" />
        </button>

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
.googleBtn{
  background: none;
  outline: none;
  border: none;
  border-radius: 100%;
}

.google_logo{
  border-radius: 36px;
  width: 27px;
}

#header-wrap {


}

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

@media screen and (max-width: 350px){
  #header{
    width: 350px;
    height: 100px;
  }
}

</style>