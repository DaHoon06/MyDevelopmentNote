<template>
  <div id="main">

    <section class="main_body">

      <div id="dp_items">

        <div class="dp_main">
          <div class="dp_img">
            <div class="dp_items">
              <ul>
                <li>TITLE</li>
                <li>item1</li>
                <li>item2</li>
                <li>item3</li>
              </ul>
            </div>
            <div class="dp_btn">
              <ul>
                <li>
                  <span>요즘 이 책</span>
                </li>
                <li>
                  <span>핫이슈</span>
                </li>
                <li>
                  <span>새로나온책</span>
                </li>
                <li>
                  <span>기획/테마</span>
                </li>
                <li>
                  <span>eBook</span>
                </li>
                <li>
                  <span>sam</span>
                </li>
                <li>
                  <span>한정특가</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="dp_img_sub">
            show
          </div>
          <button class="img_btn" id="prev">&lang;</button>
          <button class="img_btn" id="next">&rang;</button>


        </div>

      </div>

    </section>

    <div class="main_wrapper">

      <section class="main-section"></section>

      <section class="main_sub">
        TEST
      </section>

      <section class="main-section"></section>

    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {

  }
})
export default class MainHome extends Vue {


  constructor() {
    super();

  }


}
</script>

<style scoped>

.main_wrapper{

  display: flex;
}

.main-section{
  border: none;
  width: 15%;
  height: auto;
}

.main_body{
  border: none;
  margin: auto;
  background-color: #dadff5;
  width: 1900px;
  height: 400px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.main_sub{
  width: 1000px;
  height: 1000px;
  margin: auto;
}

#dp_items {
  border: 1px solid black;
  width: 1000px;
  height: 90%;
}

.img_btn {
  position:absolute;

  height:70px;
  top:315px;
  border:none;
  padding:20px;
  background-color:transparent;
  color:#000;
  font-weight:800;
  font-size:24px;
}
.dp_main{
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.dp_img{
  margin-top: 20px;
  border: 1px solid black;
  width: 700px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dp_items{
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 94%;
  height: 80%;
}

.dp_items > ul {
  list-style: none;

}

.dp_items > ul > li {
  float: left;
  width: 105px;
  height: 198px;
  border: 1px solid black;
  margin: 5px;
}

.dp_img_sub{
  margin: 20px;
  border: 1px solid black;
  width: 14%;
  height: 300px;
}

.dp_btn{
  position: absolute;
  top: 525px;
}
.dp_btn > ul{
  list-style: none;
}
.dp_btn > ul > li{
  float: left;
  border: 1px solid gray;
  background-color: aliceblue;
  width: 90px;
  height: 40px;
  text-align: center;
  margin-left: 0;
}
#prev {
  left:0;
  margin-left: 25%;
}
#next {
  right:0;
  margin-right: 38%;
}
.img_btn:hover {
  background-color:#222;
  color:#fff;
  opacity:0.6;
  cursor:pointer;
}
.img_btn:focus {
  outline:0;
}



</style>
