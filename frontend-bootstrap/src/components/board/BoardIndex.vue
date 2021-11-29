<template>
  <div id = boardList>

    <section class="board_main">

      <div class="board_section2">
        <b-table-simple hover small caption-top responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>#</b-th>
              <b-th>제목</b-th>
              <b-th>내용</b-th>
              <b-th>작성자</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <tr v-if="isBoard">
              <td colspan="4" class="isBoard">게시글이 존재하지 않습니다.</td>
            </tr>
            <tr v-for="(board,index) in board" :key="index" v-else>
              <td>{{board.num}}</td>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// interface IBoard {
//   result: boolean,
//   _id: {
//     num: number,
//     title: string,
//     content: string,
//     writer: string,
//     createData: string,
//     updateData: string,
//     isDelete: number,
//     isComment: number,
//     hit: number,
//   }
// }

@Component({
  components: {

  },
})
export default class BoardIndex extends Vue{

  isBoard: boolean;
  perPage: number;
  currentPage: number;

  board: {
            num: number,
            title: string,
            writer: string,
            content: string };

  constructor() {
    super();
    this.board = {
      num: 0,
      title: '',
      content: '',
      writer: '',
    };

    this.isBoard = false;
    this.perPage = 1;
    this.currentPage = 1;
  }
    async created(){
      const { data } = await Vue.axios.get('/board') as {data: any};
      if(!data.result){
        this.isBoard = true;
      }

      this.board = data.boardData;
      this.currentPage = data.currentPage;
      this.perPage = data.totalPage;
    }


   async detailBoard(board : any) {

   }

   async writeForm(){
     const result = await this.$router.push({
       path : '/board/write',
     });
   }

   async page(pageNum){
     const { data } = await Vue.axios.get(`/board/?page=${pageNum}`) as {data: any};

     this.board = data.boardData;
     this.currentPage = data.currentPage;
     this.perPage = data.totalPage;

     throw new Error();
   }


 //  async created(){
 //
 //    const res = await this.axios.get(TestURL.GetData);
 //    if(res.data.msg === 'noData'){
 //      this.isBoard = true;
 //    }
 //    this.board = res.data.board;
 //    this.currentPage = res.data.currentPage;
 //    this.perPage = res.data.totalPage;
 //
 //    throw new Error();
 //  }
 //
 // async detailBoard(board : any) {
 //  await this.$router.push({
 //      path : `/board/detail/${board._id}`,
 //    })
 //  }
 //
 //  async writeForm(){
 //    await this.$router.push({
 //      path : '/board/write',
 //    }).catch((err)=> {console.error(err)});
 //  }
 //


}
</script>

<style scoped>

a{
  text-decoration: none;
}

#boardList {
  margin-left: 260px;
  display: flex;
  justify-content: center;
  height: 700px;
  background: #faf9f7;
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

.board-write_btn{
  outline: none;
  background: none;
  border: none;
  float: right;
}

.board_main {
  width: 70%;
  height: auto;
}

.isBoard {
  text-align: center;
}

@media screen and (max-width: 1024px){
  #boardList {
    margin: auto;
  }
}

@media screen and (max-width: 350px){
  #boardList {
    display: block;
    width: 350px;
  }

  .board_section2{
    width: 340px;
    margin-left: 5px;
  }
}
</style>