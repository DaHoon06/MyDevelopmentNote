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
              <b-button variant="primary" @click="updateBoard(board)">수정하기</b-button>
              <b-button variant="primary" @click="deleteBoard(board)">삭제하기</b-button>
              <b-button variant="danger" @click="cancelWrite">취소</b-button>
            </b-form>

            <!--  답변 시작  -->
            <div v-if="comments != null" v-for="(comment,index) in comments" :key="index">
              <textarea readonly class="comment-area" name="showComment">{{comment.c_content}}</textarea>
              <span class="comment_date">{{$moment(comment.updated_at).format('YYYY-MM-DD')}}</span>

              <br/>

              <button @click="toggleBtn($event,comment,index)" id="updateBtn1" name="updateBtn" >수정</button>
              <button @click="delete_comment(comment)">삭제</button>
            </div>
            <div class="comment-area2" v-if="comments == 0">
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

#updateBtn1{
  display: block;
}
#updateBtn2{
  display: none;
}

</style>