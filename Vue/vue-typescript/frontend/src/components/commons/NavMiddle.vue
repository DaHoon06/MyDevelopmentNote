<template>
<div>

  <div id="nav_middle">
    <div class="nav_middle_section">
      <a href="/">
        <img src="http://image.kyobobook.co.kr/ink/images/gnb/logo_kyobo.png">
      </a>
    </div>

    <div class="nav_middle_section">
      <input type="text" v-model="search_keyword" v-on:click="check" placeholder="Search..." class="search_bar" />
      <a class="search_btn" type="button" @click="searching">
        <img width="20px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0RGu5Iw07hx5Nfd7q8oq3Pa4Iln9MoPnlJw&usqp=CAU" />
      </a>

      <div id="recent_keyword" v-model="show_keyword" v-if="show_keyword">
        <div class="recent_1" v-if="data === '' " >
          최근 검색어가 없습니다.
        </div>

        <div class="recent_3" v-else>
          <ol>
            <li v-on:click="use_keyword(index)" class="recent_use_keyword" v-for="(dates,index) in keyword" :key="index">{{dates}}</li>
          </ol>
        </div>

        <div class="recent_2">
          <button v-on:click="deleteCookies">기록 삭제</button>
          <button v-on:click="close_keyword">닫기</button>
        </div>
      </div>

    </div>

    <div class="nav_middle_section">
      <img src="https://simage.kyobobook.co.kr/ink/images/prom/2021/banner/210203/bnH_02.jpg">
    </div>
  </div>

  <!-- Modal -->
  <div v-if="isModal" @close-modal="isModal=false">
    <b-modal id="modal-center" centered title="Login">

      <form v-on:submit="Login">
        <input type="email" v-model="email" placeholder="e-mail" />  <br/>
        <input type="password" v-model="pw" placeholder="Password" />  <br/>
        <button type="submit">Login</button> <button  v-on:click="signIn">SignIn</button>
      </form>

    </b-modal>
  </div>

</div>
</template>

<script lang="ts">
import {Component,Vue} from "vue-property-decorator";
import axios from "axios";

@Component
export default class NavMiddle extends Vue{

  email: string;
  pw: string;
  isModal: boolean;
  isLoaded: boolean;

  before_session: boolean;
  search_keyword: string;
  show_keyword: boolean;
  data: string;
  keyword: string[];

  constructor() {
    super();
    this.email = '';
    this.pw = '';
    this.isModal = true;
    this.isLoaded = true;

    this.before_session = true;
    this.search_keyword = '';
    this.show_keyword = false;
    this.data = '';
    this.keyword = [];
  }

  async Login(){
    const res = await axios.post('/api/user',{
      email : this.email,
      pw : this.pw,
    })
    console.log(res.data);
  }

  signIn(){
    this.isModal=false;
    this.$router.push({
      path : '/signIn'
    });
  }

  async searching(){
    const keyword = this.search_keyword;

    if(keyword === ''){
      alert('검색어를 입력해주세요.');
      return false;
    }

    const res = await this.axios.get(`/board/search/${keyword}`);
    this.search_keyword = '';

    this.data = res.data.data;
    this.board = res.data.board[0];

    this.$cookies.set('data_c',this.data);

    let cookie = this.$cookies.get('data_c');

    //중복 저장됨....
    this.keyword.push(this.data);

    if(this.board !== undefined){
      await this.$router.push({
        path : `/board/detail/${this.board._id}`,
      })
    } else {
      alert('값이 없음...');
    }
  }

  async check(){
    this.show_keyword = true;
    const keyword = this.search_keyword;

    //const data = await this.axios.get(`/search/${keyword}`);
  }
  close_keyword(){
    this.show_keyword = false;

  }

  deleteCookies(){
    // this.$cookies.remove('data_c');
    this.keyword = [];
    this.data = '';
  }

  use_keyword(index: string){
    document.getElementsByClassName('recent_use_keyword').item(parseInt(index))
    this.search_keyword = this.data;

  }

}
</script>

<style scoped>

nav > div > ul {
  list-style: none;
}

ul > li {
  float: left;
  margin-left: 20px;
}

#nav_middle{
  width: 1000px;
  height: auto;
  display: flex;
  align-items: center;
  margin: auto;
}

.nav_middle_section{
  margin: 20px;
}

#recent_keyword{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #ffffff;
  position: absolute;
  top: 92px;
  border: 1px solid black;
  width: 400px;
  height: 120px;
}

.recent_1{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.recent_2{
  display: flex;
  justify-content: flex-end;
  background-color: #adb5bd;
  font-size: 12px;
  height: 22px;
}

.recent_3{
  display: flex;
  justify-content: flex-start;
  height: 100px;
  overflow-y: scroll;
}

.recent_2 button {
  outline: none;
  border:none;
  background: none;
}
.recent_2 button:hover{
  color: #ffffff;
}

.recent_use_keyword:hover {
  cursor: pointer;
  color: gray;
}

.search_bar{
  border: 1px solid rgb(70, 70, 123);
  padding-left: 15px;
  height: 40px;
  font-size: 13px;
  width: 400px;
  border-radius: 20px;
}
.search_btn{
  position: relative;
  right: 30px;
  top: -3px;
  width: 20px;
}

</style>