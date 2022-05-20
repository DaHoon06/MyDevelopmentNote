<template>
<div>

  <div id="wrapper">
    <div>
      <nav id="nav_container">
        <div><span>NAVIGATION</span></div>
        <b-nav id="nav_list">
          <ul>
            <li>ITEM1</li>
            <li>ITEM2</li>
            <li>ITEM3</li>
            <li>ITEM4</li>
            <li>ITEM5</li>
          </ul>

        </b-nav>

        <hr/>

        <b-nav>
          <ul>
            <li>ITEM6</li>
            <li>ITEM7</li>
            <li>ITEM8</li>
            <li>ITEM9</li>
            <li>ITEM10</li>
          </ul>
        </b-nav>
      </nav>
    </div>
    <div>
      <section id="main_container">
        <div id="header_area">
          <div id="header">
            <div>
              <span><b>HOME</b></span>
            </div>
            <ul>
              <li>
                <input class="search_input" placeholder="Search.." type="text">
                <button><b-icon icon="search"></b-icon></button>
              </li>
              <li>
                <b-img src="https://picsum.photos/500/500/?image=54" rounded="circle" width="45px"></b-img>
              </li>
            </ul>
          </div>
          <div id="header_body">
            <ul>
              <li>BOX 1</li>
              <li>BOX 2</li>
              <li>BOX 3</li>
              <li>BOX 4</li>
            </ul>
          </div>
        </div>

        <section id="section_area">
          SECTION AREA
        </section>
      </section>
    </div>
  </div>

</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class IndexPage extends Vue{

}
</script>

<style scoped>
#wrapper {
  margin: 0;
  padding: 0;

}

button{
  background: none;
  border: none;
  outline: none;
}
hr {
  width: 150px;
  margin: auto;

}

#nav_container{
  position: fixed;
  width: 250px;
  height: 1000px;
  text-align: center;
}
#nav_container ul {
  list-style: none;
  margin: auto;
}
#nav_container ul li {
  margin-top: 10px;
}
#main_container{
  margin-left: 250px;
  width: calc(100% - 250px);
  height: 1000px;
}

#header_area{
  background: linear-gradient(17deg, rgba(17, 178, 92, 0.6) 40%, rgba(16, 182, 165, 0.6) 60%);
  height: 400px;
  display: flex;
  flex-direction: column;
}

#header{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 150px;
  padding-bottom: 70px;
}

#header ul {
  list-style: none;
  margin-left: 400px;
}

#header ul li {
  float: left;
  padding-left: 30px;
}

.search_input{
  border: 1px solid #e7d2d2;
  border-radius: 20px;
  width: 300px;
  height: 31px;
  padding-left: 12px;
  background: none;
  outline: none;
  color: #f1ecec;
  font-size: 15px;
}

#header_body{
  height: 250px;
  display: flex;
  justify-content: space-around;
}

#header_body ul {
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
}

#header_body ul li {
  border: 1px solid #ffffff;

  border-radius: 6px;
  width: 330px;
  float: left;
  height: 120px;
  background: #ffffff;
  color: #4f5050;
  margin-right: 60px;
}

#section_area{
  background: rgba(248, 248, 253, 0.8);
  height: 600px;
}


</style>