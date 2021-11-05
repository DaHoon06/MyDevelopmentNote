<template>
  <div id = boardList>

    <div class="board_wrapper">
      <section class="board_main">
        <MenuTitle></MenuTitle>

        <div class="board_section_wrap">

          <CategoryList></CategoryList>

          <section id="board_area">
            <div class="search_FAQ">
              <ul>
                <li>
                  <span class="faq_title">FAQ</span>
                </li>
                <li>
                  <span class="search_title">검색</span>
                </li>
                <li>
                  <input type="text" class="faq_input" />
                </li>
                <li>
                  <button class="faq_btn">검색</button>
                </li>
              </ul>
            </div>

            <div class="board_section2">
              <b-table-simple hover small caption-top responsive>
                <b-thead head-variant="dark">
                  <b-tr>
                    <b-th>제목</b-th>
                    <b-th>내용</b-th>
                    <b-th>작성자</b-th>
                  </b-tr>
                </b-thead>

                <b-tbody>
                  <tr>
                    <td colspan="3" v-if="test" style="text-align: center">게시글이 존재하지 않습니다.</td>
                  </tr>

                  <tr v-for="(board,index) in board" :key="index">
                    <td>{{board.title}}</td>
                    <td v-on:click='detailBoard(board)'><a class="boardDetail">{{board.content}}</a></td>
                    <td>{{board.writer}}</td>
                  </tr>
                </b-tbody>
              </b-table-simple>

              <div id="pageList">
                <div v-for="(pageNum,index) in perPage" :key="index">
                  <a class="page" v-on:click="page(pageNum)">{{pageNum}}</a>
                </div>
              </div>

              <button class="board-write_btn" v-on:click="writeForm">
                <span>글작성</span>
              </button>
            </div>
          </section>

        </div>

      </section>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from "axios";
import {BoardURI} from "@/utils/board.URI";
import CategoryList from "@/components/board/CategoryList.vue";
import MenuTitle from '@/components/board/MenuTItle.vue';

@Component({
  components: {
    CategoryList,MenuTitle
  },
})
export default class BoardIndex extends Vue{

  test: boolean;
  perPage: number;
  currentPage: number;

  board: {
            title: string,
            writer: string,
            content: string };

  async created(){
    const res = await this.axios.get(BoardURI.GetData);
    alert(res.data.board);
    if(res.data.msg === 'noData'){
      this.test = true;
    } else {
      this.board = res.data.board;
      this.currentPage = res.data.currentPage;
      this.perPage = res.data.totalPage;
    }
    throw new Error(res.status);
  }

  constructor() {
    super();
    this.board = {
      title : '',
      content : '',
      writer : '',
    };

    this.test = false;
    this.perPage = 3;
    this.currentPage = 1;
  }

 async detailBoard(board : any) {
  await this.$router.push({
      path : `/board/detail/${board._id}`,
    })
  }

  async writeForm(){
    await this.$router.push({
      path : '/board/write',
    }).catch((err)=> {console.error(err)});
  }

  async page(pageNum){
    await axios.get(`/api/board/?page=${pageNum}`).then((res)=> {
      this.board = res.data.board;
      this.currentPage = res.data.currentPage;
      this.perPage = res.data.totalPage;
    }).catch((err: any) => {
      console.error(err);
    })
  }

}
</script>

<style scoped>

a{
  text-decoration: none;
}
.boardDetail:hover {
  cursor: pointer;
  color: black;
}
#board_area{
  display: flex;
  flex-direction: column;
  margin-right: 70px;
}
.page:hover {
  cursor: pointer;
  color: black;
}

#pageList {
  display: flex;
  justify-content: center;
}

#pageList > div > .page {
  padding-left: 10px;
}

#boardList {
  height: 710px;
}

.board_wrapper{
  display: flex;
  width: 1500px;
  justify-content: space-around;
  margin: auto;
}

.board_main{
  width: 70%;
  height: auto;
}

.board_section_wrap{
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}


.board_section2{
  width: 700px;
  margin: auto;
}

.board-write_btn{
  outline: none;
  background: none;
  border: none;
  float: right;
}

.search_FAQ{
  border: 1px solid black;
  width: 700px;
  height: 50px;
  background-color: #616464;
  margin: auto;
  padding-left: 20px;
}

.search_FAQ ul li {
  list-style: none;
  float: left;
  padding-left: 20px;
  margin-top: 10px;

}

.faq_title{
  background: linear-gradient(to right, #f8f6f6, #418af6);
  font-size: 20px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.search_title{
  color: #ffffff;
}

.search_FAQ{

}

.faq_input{
  width: 330px;
}
.faq_btn{
  background-color: black;
  color: #ffffff;
}
</style>