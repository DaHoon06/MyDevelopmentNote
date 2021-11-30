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
              <button v-if="btn" v-on:click="insertData" >작성하기</button>
              <button v-else v-on:click="updateBoard" >수정하기</button>
              <button v-on:click="cancelWrite">취소</button>
          </b-form>
        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class WriteForm extends Vue{

  btn: boolean;

  board_title: string;
  board_content: string;

  board: {
    _id: string,
    board_title: string,
    board_content: string
  };

  constructor() {
    super();
    this.board_title = '';
    this.board_content = '';

    this.board = {
      _id: '',
      board_title : '',
      board_content : '',
    }
    this.btn = true;
  }

  async created(){
    if(this.$route.params.id){

      const id = this.$route.params.id;
      const boardData = await Vue.axios.get(`/board/b/${id}`);

      this.board_title = boardData.data["title"];
      this.board_content = boardData.data["content"];
      this.btn = false;
    }
  }

  async insertData(){
    const { data } = await Vue.axios.post('/board/insert',{
        title: this.board_title,
        writer: '전다훈',
        content: this.board_content,
    });

    await this.$router.push({
      path: '/board'
    });

    console.log(data)
    if(!data){
      alert('작성 실패...')
      await this.$router.push({
        path: '/board'
      });
    }
  }

  async cancelWrite(){
     await this.$router.push({
       path: '/board'
     });
  }

  async updateBoard(){
      const _id = this.$route.params.id;
      const result = await Vue.axios.patch(`/board/${_id}`,{

      });
      if(result) {
        await this.$router.push({
          path: '/board'
        });
      }
  }




}
</script>

<style scoped>
.board_wrapper{
  display: flex;
}

button {
  background: none;
  border: none;
  outline: none;
}

.board_main{
  width: 70%;
  margin-left: 260px;
  height: auto;
}

.board_section2{
  width: 100%;
  margin-left: 50px;
}
@media screen and (max-width: 1024px){
  .board_main{
    margin: auto;
    width: 100%;
  }

  .board_section2 {
    width: 100%;
  }
}
@media screen and (max-width: 350px){
  .board_main{
    margin: auto;
    width: 340px;
  }
  .board_section2 {
    width: 340px;

  }
}


</style>