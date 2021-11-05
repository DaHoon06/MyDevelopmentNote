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
                  id="input-2" v-model="title" required></b-form-input>
          </div>
          <div>
            <b-form-textarea placeholder="내용을 입력해주세요."
                id="textarea" v-model="content" rows="3"
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
import CategoryList from "@/components/board/CategoryList.vue";
import MenuTitle from "@/components/board/MenuTItle.vue";
import {BoardURI} from "@/utils/board.URI";
import axios from "axios";

@Component({
  components: {
    CategoryList,MenuTitle
  },
})
export default class WriterForm extends Vue{

  btn: boolean;

  title: string;
  content: string;

  board: { title: string,
            writer: string,
            content: string }


  constructor() {
    super();
    this.title = '';
    this.content = '';

    this.board = {
      title: '',
      writer: '',
      content: '',
    }

    this.btn = true;
  }

  created(){
      if(this.$route.params.id != null){

        const _id = this.$route.params.id;

        this.axios.get(`/api/board/b/${_id}`,{
        }).then((res) => {
          this.board = res.data.board;

          this.title = this.board.title;
          this.content = this.board.content;

          this.btn = false;
        }).catch((err) => {
          console.error(err);
        })
      }

  }

  writeBoard(){
    axios.post('/api/board',{
      title: this.title,
      content: this.content,
    }).then((res) => {
      this.$router.push({
        path : '/board'
      })
    }).catch((err) => {
      console.log(err);
    })
  }
  /*
  async writeBoard(){
    const res = await this.axios.post(BoardURI.DataInsert,{
      title: this.title,
      content: this.content
    });
    if(res){
      await this.$router.push({
        path: '/board'
      })
      throw new Error(res.status);
    }

  }
  */

  updateBoard() {
    const _id = this.$route.params.id;
    this.axios.put(`/api/board/${_id}`,{
      board_title : this.title,
      board_content : this.content
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