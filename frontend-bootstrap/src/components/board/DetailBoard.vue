<template>
    <div class="board_wrapper">


      <section class="board_main">


        <div class="board_section_wrap">


      <div class="board_section2">
      <b-form>
        <div>
          <b-form-input
                id="input-2" v-model="board.board_title" readonly></b-form-input>
        </div>
        <div>
          <b-form-textarea id="textarea" readonly v-model="board.board_content" rows="3"
              max-rows="6"></b-form-textarea>
        </div>
        <div>
          <b-form-input
              id="input-2" v-model="board.board_writer" readonly></b-form-input>
        </div>
          <button v-on:click="updateBoard(board)" class="detailBtn">수정하기</button>
          <button v-on:click="deleteBoard(board)" class="detailBtn">삭제하기</button>
          <button v-on:click="cancelWrite" class="detailBtn">취소</button>
        </b-form>

<!--        <div v-if="comments != null" v-for="(comment,index) in comments" :key="index">-->
<!--          <div class="comment-area">{{comment.comment_content}}</div>-->
<!--          <span class="comment_date">{{$moment(comment.updated_at).format('YYYY-MM-DD')}}</span>-->

<!--          <br/>-->

<!--          <button>수정</button>-->
<!--          <button>삭제</button>-->
<!--        </div>-->
<!--        <div class="comment-area2" v-if="comments == 0">-->
<!--          답변이 존재하지 않습니다.-->
<!--        </div>-->

        <div>
          <form>
            <b-form-textarea ref="regi_comment" rows="10" cols="10" v-model="comment_content"></b-form-textarea>
            <b-button variant="primary" @click="comment">답변</b-button>
          </form>
        </div>
      </div>
        </div>

      </section>

    <section class="board-section"></section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export interface boardDetail {
  result: boolean,
  _id: string,
  title: string,
  content: string,
  writer: string,
  createData: Date,
  updatedDate: Date,
  isComment: number,
  isDelete: number,
  hit: number
}

@Component
export default class WriterForm extends Vue {

  comment_content: string

  comments: {
    comment_content: string,
    updated_at: string,
  }

  board: {
    _id: string,
    board_title: string,
    board_writer: string,
    board_content: string
  }

  constructor() {
    super();
    this.board = {
      _id: '',
      board_title: '',
      board_writer: '',
      board_content: '',
    }

    this.comment_content = '';

    this.comments = {
      comment_content: '',
      updated_at: '',
    }
  }

  async created() {
    const _id = this.$route.params.id;
    const boardData = await Vue.axios.get(`/board/b/${_id}`) ;

    this.board = {
      _id: boardData.data["_id"],
      board_title: boardData.data["title"],
      board_content: boardData.data["content"],
      board_writer: boardData.data["writer"]
    }
    //댓글 존재여부 체크
    const commentData = await Vue.axios.get(`/board/comment/b/${_id}`);

  }

  async cancelWrite(){
    await this.$router.push({
      path: `/board`
    });
  }

  async updateBoard(board: any) {
    await this.$router.push({
      path: `/board/write/${board._id}`
    });
  }

  async deleteBoard(board: any) {
    const id = board._id;
    const result = await Vue.axios.patch(`/board/delete/${id}`);
    console.log(result);
    return '';
  }

  async comment(){
    const _id = this.$route.params.id;

  }

}
</script>

<style scoped>

.board_wrapper{
  margin-left: 260px;
}

.board_main{
  width: 70%;
  height: auto;
  margin: auto;
}

.board-section{
  border: none;
  width: 15%;
  height: auto;
}

.board_section2{
  width: 700px;
  margin: auto;
}

.board_section_wrap{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.comment-area {
  margin: 20px;
  width: 80%;
  border: 1px solid black;
  height: 100px;
  overflow-y: scroll;
}

.comment-area2 {
  margin: 20px;
  width: 80%;
  border: 1px solid black;
  height: 100px;
}

.detailBtn{
  border: none;
  outline: none;
  background: none;
  margin-left: 10px;
}


@media screen and (max-width: 1024px){
  .board_wrapper{
    margin: auto;
  }

  .board_main{
    width: 95%;
    height: auto;
    margin: auto;
  }
}

@media screen and (max-width: 340px){
  .board_main{
    width: 320px;
    height: auto;

  }
}

</style>