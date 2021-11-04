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
            <b-form-input placeholder="제목을 입력해주세요."
                  id="input-2" v-model="board_title" required></b-form-input>
          </div>
          <div>
            <b-form-textarea placeholder="내용을 입력해주세요."
                id="textarea" v-model="board_content" rows="3"
                max-rows="6"></b-form-textarea>
          </div>
            <b-button v-if="btn" v-on:click="writeBoard" variant="primary">작성하기</b-button>
            <b-button v-else v-on:click="updateBoard" variant="primary">수정하기</b-button>
            <b-button variant="danger" v-on:click="cancelWrite">취소</b-button>
        </b-form>
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
export default class WriterForm extends Vue{

  btn: boolean;

  board_title: string;
  board_content: string;

  board: { board_title: string,
            board_writer: string,
            board_content: string }


  constructor() {
    super();
    this.board_title = '';
    this.board_content = '';

    this.board = {
      board_title : '',
      board_writer : '',
      board_content : '',
    }

    this.btn = true;
  }

  created(){
      if(this.$route.params.id != null){

        const _id = this.$route.params.id;

        axios.get(`/api/board/b/${_id}`,{
        }).then((res) => {
          this.board = res.data.board;

          this.board_title = this.board.board_title;
          this.board_content = this.board.board_content;

          this.btn = false;
        }).catch((err) => {
          console.error(err);
        })
      }

  }

  writeBoard(){
    axios.post('/api/board',{
      board_title : this.board_title,
      board_content : this.board_content,
    }).then((res) => {
      this.$router.push({
        path : '/board'
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  updateBoard() {
    const _id = this.$route.params.id;
    axios.put(`/api/board/${_id}`,{
      board_title : this.board_title,
      board_content : this.board_content
    }).then((res) => {
      this.$router.push({
        path : '/board'
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  cancelWrite(){
    this.$router.push({
      path: '/board'
    })
  }

}
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


</style>