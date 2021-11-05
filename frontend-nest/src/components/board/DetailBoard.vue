<template>
  <div>

    <div class="board_wrapper">
      <section class="board-section"></section>

      <section class="board_main">
        <MenuTitle></MenuTitle>

        <div class="board_section_wrap">
          <CategoryList></CategoryList>

      <div class="board_section2">
      <b-form>
        <div>
          <b-form-input
                id="input-2" v-model="board.title" readonly></b-form-input>
        </div>
        <div>
          <b-form-textarea id="textarea" readonly v-model="board.content" rows="3"
              max-rows="6"></b-form-textarea>
        </div>
        <div>
          <b-form-input
              id="input-2" v-model="board.writer" readonly></b-form-input>
        </div>
          <b-button variant="primary" v-on:click="updateBoard(board)">수정하기</b-button>
          <b-button variant="primary" v-on:click="deleteBoard(board)">삭제하기</b-button>
          <b-button variant="danger" v-on:click="cancelWrite">취소</b-button>
        </b-form>

        <div v-if="comments != null" v-for="(comment,index) in comments" :key="index">
          <div class="comment-area">{{comment.c_content}}</div>
          <span class="comment_date">{{$moment(comment.updated_at).format('YYYY-MM-DD')}}</span>

          <br/>

          <button>수정</button>
          <button>삭제</button>
        </div>
        <div class="comment-area2" v-if="notExistComment">
          답변이 존재하지 않습니다.
        </div>

        <div>
          <form>
            <b-form-textarea ref="regi_comment" rows="10" cols="10" v-model="c_content"></b-form-textarea>
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
  notExistComment: boolean;
  c_content: string

  comments: {
    c_content: string,
    updated_at: string,
  }

  board: {
    title: string,
    writer: string,
    content: string
  }

  constructor() {
    super();
    this.board = {
      title: '',
      writer: '',
      content: '',
    }

    this.c_content = '';

    this.comments = {
      c_content: '',
      updated_at: '',
    }
    this.notExistComment = true;
  }


  async created() {
    const _id = this.$route.params.id;
    const res = await axios.get(`/api/board/d/${_id}`);
    this.board = res.data.board;

    //댓글 존재여부 체크
    const c_res = await axios(`/api/comment/${_id}`);
    if(c_res.data.msg === 'noData'){
      this.notExistComment = true;
    } else {
      this.comments = c_res.data.comments;
      this.notExistComment = false;
    }
  }

  mounted(){
    const _id = this.$route.params.id;
    axios(`/api/comment/${_id}`).then((res) => {
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

  async deleteBoard(board: any) {
    const res = await axios.delete(`/api/board/${board._id}`);
    if(res){
      await this.$router.push({
        path: '/board'
      })
    }
    throw new Error();
  }

  cancelWrite() {
    this.$router.push({
      path: '/board'
    })
  }

  //댓글입력
  async comment(){
    const _id = this.$route.params.id;
    const res = await axios.post('/api/comment',{
        c_content: this.c_content,
        b_id: _id,
    });
    if(res.data !== undefined){
      this.c_content = '';
      window.location.reload();
      this.$refs.regi_comment.focus();
    }

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