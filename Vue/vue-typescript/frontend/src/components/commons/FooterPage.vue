<template>
  <div>

    <footer id="footer">

    <div class="container_cus">
      <div class="row">
        <div class="footer">

          <ul>
            <li><a href="#">사이트 도움말</a></li>
            <li><a href="#">사이트 이용약관</a></li>
            <li><a href="#">사이트 운영원칙</a></li>
            <li><a href="#"><strong>개인정보취급방침</strong></a></li>
            <li><a href="#">책임의 한계와 법적고지</a></li>
            <li><a href="#">게시중단요청서비스</a></li>
            <li><a href="#">고객센터</a></li>
          </ul>

          <address>
            Copyright ©
            <a href="http://webstoryboy.co.kr"><strong>DaHoon</strong></a>
            All Rights Reserved.
          </address>
        </div>
      </div>
    </div>

    </footer>

  </div>
</template>

<script>
export default {
  name: "FooterPage"
}
</script>

<style scoped>
footer {
  background-color: rgb(62,63,68);
  clear: both;
  width: 100%;
  height: 150px;
}

#footer{
  height: 50px;
}

.footer li a {
  position: relative;
  top: -18px;
  font-size: 14px
}

#footer {border-top: 1px solid #dbdbdb;}

.footer {text-align: center; padding: 30px 50px;}
.footer li {position: relative; display: inline; padding: 0 7px 0 10px; white-space: nowrap;}
.footer li:before {content: ''; width: 1px; height: 12px; background-color: #dbdbdb; position: absolute; left: 0; top:-10px;}
.footer li:first-child:before {width: 0;}
.footer address {padding-top: 15px;}

a {
  text-decoration: none;
}

ul > li > a {
  color: #fff9e7;
}

.row{
  width: 1900px;
}


</style>