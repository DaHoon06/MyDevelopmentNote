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
*{
  margin: 0;
  padding: 0;
}

a{
  text-decoration: none;
}

footer {
  margin-left: 300px;
}

#footer{
  border-top: 1px solid gray;
}

#footer {border-top: 1px solid #dbdbdb;}

.footer {text-align: center;}
.footer address {

  margin-top: 10px;
  margin-bottom: 10px;
  color: #bebebf;
}


.row{
  width: 100%;
}

@media screen and (max-width: 1279px){
  footer {
    margin: 0;
    height: 50px;
  }

  #footer {
    width: 100%;
    margin: auto;
  }

}

/* 테블릿 */
@media screen and (max-width: 1023px) {
  footer {
    margin: 0;
    height: 50px;
  }

  #footer {
    width: 100%;
    margin: auto;
  }

}

@media screen and (max-width: 767px) {
  footer {
    margin: 0;
    height: 50px;
  }

  #footer {
    width: 100%;
    margin: auto;
  }
}




</style>