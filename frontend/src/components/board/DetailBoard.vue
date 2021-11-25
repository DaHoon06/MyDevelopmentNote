<template>
  <div>

    <div class="board_wrapper">
      <section class="board-section"></section>

      <section class="board_main">
<!--        <MenuTitle></MenuTitle>-->

        <div class="board_section_wrap">
          <CategoryList></CategoryList>

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
          <b-button variant="primary" v-on:click="updateBoard(board)">수정하기</b-button>
          <b-button variant="primary" v-on:click="deleteBoard(board)">삭제하기</b-button>
          <b-button variant="danger" v-on:click="cancelWrite">취소</b-button>
        </b-form>

        <div v-if="comments != null" v-for="(comment,index) in comments" :key="index">
          <div class="comment-area">{{comment.comment_content}}</div>
          <span class="comment_date">{{$moment(comment.updated_at).format('YYYY-MM-DD')}}</span>

          <br/>

          <button>수정</button>
          <button>삭제</button>
        </div>
        <div class="comment-area2" v-if="comments == 0">
          답변이 존재하지 않습니다.
        </div>

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

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from "axios";
import CategoryList from "@/components/board/CategoryList.vue";
import MenuTitle from "@/components/board/MenuTItle.vue";



@Component({
  components: {
    CategoryList,MenuTitle
  },

})
export default class WriterForm extends Vue {

  comment_content: string

  comments: {
    comment_content: string,
    updated_at: string,
  }

  board: {
    board_title: string,
    board_writer: string,
    board_content: string
  }

  constructor() {
    super();
    this.board = {
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


  created() {
    const _id = this.$route.params.id;

    axios(`/api/board/b/${_id}`).then((res) => {
      this.board = res.data.board;
    }).catch((err) => {
      console.log(err);
    });

    //댓글 존재여부 체크
    axios(`/api/board/comment/b/${_id}`).then((res) => {
      this.comments = res.data.comment;
    }).catch((err) => {
      console.log(err);
    });
  }

  mounted(){
    const _id = this.$route.params.id;

    axios(`/api/board/comment/b/${_id}`).then((res) => {
      this.comments = res.data.comment;
    }).catch((err) => {
      console.log(err);
    });
  }


  updateBoard(board: any) {
    this.$router.push({
      path: `/board/write/${board._id}`
    })
  }

  deleteBoard(board: any) {
    axios.delete(`/api/board/${board._id}`).then((res) => {
      this.$router.push({
        path: '/board'
      })
    }).catch((err) => {
      console.error(err);
    })
  }

  cancelWrite() {
    this.$router.push({
      path: '/board'
    })
  }

  async comment(){
    const _id = this.$route.params.id;

    await axios.post('/api/board/comment',{
        comment_content: this.comment_content,
        board_id: _id,
    }).catch((err) => {console.error(err);})

    this.comment_content = '';
    window.location.reload();
    this.$refs.regi_comment.focus();
  }


}// VUE END!!
</script>

<style scoped>

.board_wrapper{
  display: flex;
}

.board_main{
  width: 70%;
  height: auto;
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

.comment_date{

}

</style>