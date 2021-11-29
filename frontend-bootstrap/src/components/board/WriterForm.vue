<template>
  <div class="board_wrapper">

    <section class="board_main">

      <div class="board_section_wrap">

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
              <button v-if="btn" v-on:click="insertData" variant="primary">작성하기</button>
              <button v-else v-on:click="updateBoard" variant="primary">수정하기</button>
              <button variant="danger" v-on:click="cancelWrite">취소</button>
          </b-form>
        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class WriterForm extends Vue{

  btn: boolean;

  board_title: string;
  board_content: string;

  board: {
    board_title: string,
    board_writer: string,
    board_content: string
  };

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


  async insertData(){
    const data = await Vue.axios.post('/board/insert',{
        title: this.board_title,
        writer: '전다훈',
        content: this.board_content,
    });
    console.log(data);
    // if(result){
    //   await this.$router.push({
    //     path:'/board'
    //   });
    // }
  }

  cancelWrite(){
    this.$router.push({
      path: '/board'
    })
  }


  //
  // writeBoard(){
  //   axios.post('/api/board',{
  //     board_title : this.board_title,
  //     board_content : this.board_content,
  //   }).then((res) => {
  //     this.$router.push({
  //       path : '/board'
  //     })
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }
  //
  // updateBoard() {
  //   const _id = this.$route.params.id;
  //   axios.put(`/api/board/${_id}`,{
  //     board_title : this.board_title,
  //     board_content : this.board_content
  //   }).then((res) => {
  //     this.$router.push({
  //       path : '/board'
  //     })
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }
  //


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

.board_section2{
  width: 700px;
  margin: auto;
}


</style>