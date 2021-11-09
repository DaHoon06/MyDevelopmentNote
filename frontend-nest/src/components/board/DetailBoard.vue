<template>
  <div id="detailBoard">

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
              <b-button variant="primary" @click="updateBoard(board)">수정하기</b-button>
              <b-button variant="primary" @click="deleteBoard(board)">삭제하기</b-button>
              <b-button variant="danger" @click="cancelWrite">취소</b-button>
            </b-form>
            <!--  답변 시작  -->
            <div id="comment_wrapper">
              <form>
                <b-form-textarea ref="regi_comment" rows="10" cols="10" v-model="c_content" id="commentArea"></b-form-textarea>
              </form>
              <div>
                <b-button id="commentData" variant="primary" @click="comment">답변</b-button>
              </div>
            </div>

            <div v-if="comments != null" v-for="(comment,index) in comments" :key="index">
              <textarea readonly class="comment-area" name="showComment">{{comment.c_content}}</textarea>
              <div class="data_wrapper">
                <span class="comment_date_title">작성일 </span> <span class="comment_date">{{$moment(comment.updated_at).format('YYYY-MM-DD')}}</span>
              </div>
              <div class="comment_btn_wrapper">
                <button @click="toggleBtn($event,comment,index)" name="updateBtn" >수정</button>
                <button @click="delete_comment(comment)">삭제</button>
              </div>
            </div>
            <div class="comment-area2" v-if="comments == 0">
              답변이 존재하지 않습니다.
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

  c_content: string;
  newComment: string;

  comments: {
    c_content: string,
    updated_at: string,
    b_id: string,
    _id: string
  }[]

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
    this.newComment = '';
    this.comments = {
      c_content: '',
      updated_at: '',
    }

  }

  async created() {
    const _id = this.$route.params.id;
    const res = await axios.get(`/api/board/d/${_id}`);
    const c_res = await axios(`/api/comment/${_id}`);

    this.board = res.data.board;
    this.comments = c_res.data.comments;

    throw new Error();
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

  //--  댓글입력
  async comment(){
    const _id = this.$route.params.id;
    const res = await axios.post('/api/comment',{
        c_content: this.c_content,
        b_id: _id,
    });
    this.c_content = '';
    location.reload();
    this.$refs.regi_comment.focus();
  }

  async delete_comment(comment: any){
    const _id = comment._id;
    const res = await axios.delete(`/api/comment/${_id}`);
    if(res.data.result === 1){
      location.reload();
    } else {
      alert('삭제 실패');
    }
  }
  //수정 < - > 저장 버튼 전환
  async toggleBtn(event: any,comment: any,index: string){
    const ele = event.target;
    ele.classList.toggle('isUpdate');

    const isUpdate = ele.classList.contains('isUpdate');
    if(isUpdate){
      ele.innerText = '저장'
      document.getElementsByName('showComment')[index].removeAttribute('readonly');
    }else{
      ele.innerText = '수정'
      await this.saveComment(comment,index);
    }
  }

  async saveComment(comment,index){
    const _id = comment._id;
    const data = document.getElementsByName('showComment')[index].value;
    comment.c_content = data as string;

    const res = await axios.patch(`/api/comment/${_id}`,comment);
    location.reload();
    if(res.result === 1){
      location.reload();
    }
  }


}// VUE END!!
</script>

<style scoped>

#detailBoard{
  height: 1080px;
}

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
  padding: 5px;
  border: 1px solid #c4c0c0;
  border-radius: 5px;
  background-color: #f5f6f6;
  margin-left: 60px;
  margin-top: 20px;
  width: 600px;
  height: 100px;
  resize: none;
}

.comment-area2 {
  margin: 20px;
  width: 80%;
  border: 1px solid black;
  height: 100px;
}

.data_wrapper{
  text-align: right;
  margin-right: 40px;
}

.comment_date_title {
  font-size: 13px;
  color: gray;
}

.comment_date {
  font-size: 12px;
  color: gray;
}

.comment_btn_wrapper{
  text-align: right;
  margin-right: 32px;
}
.comment_btn_wrapper button {
  border: none;
  outline: none;
  background: none;
}

.comment_btn_wrapper button:hover {
  color: #ffffff;
  background-color: #4f5050;
  border-radius: 4px;
}

#commentArea {
  width: 600px;
  height: 90px;
  resize: none;
}

#comment_wrapper{
  margin-left: 60px;
  margin-top: 20px;
}

#comment_wrapper div {
  text-align: right;
  margin-right: 40px;
  margin-top: 10px;
}

#commentData{
  border: none;
  background-color: #f3f3ed;
  color: black;
}

#commentData:hover {
  background-color: #adb5bd;
  color: #ffffff;
}

</style>