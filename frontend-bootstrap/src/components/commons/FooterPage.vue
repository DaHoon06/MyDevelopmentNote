<template>
  <div>

    <footer id="footer">

    <div class="container_cus">
      <div class="row">
        <div class="footer">

          <address>
            Copyright ©2021 by
            <a href="http://webstoryboy.co.kr"><strong>DaHoon</strong></a>
            All Rights Reserved.
          </address>
        </div>
      </div>
    </div>

    </footer>

  </div>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";

@Component
export default class FooterPage extends Vue{

}
</script>

<style scoped>
footer {
  background: linear-gradient(17deg, rgba(17, 178, 92, 0.6) 40%, rgba(16, 182, 165, 0.6) 60%);
  height: 150px;
  margin-left: 260px;
}

#footer{
  height: 50px;
}

#footer {border-top: 1px solid #dbdbdb;}

.footer {text-align: center; padding: 30px 50px;}
.footer address {padding-top: 15px; margin-top: 20px;}


.row{
  width: 100%;
}

@media screen and (max-width: 1024px){
  #footer {
    width: 100%;
    margin: auto;
  }
}

@media screen and (max-width: 340px){
  #footer {
    width: 100%;
    margin: auto;
  }
}

</style>