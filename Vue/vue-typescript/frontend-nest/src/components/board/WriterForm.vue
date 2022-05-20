<template>
  <div id = boardList>

    <div class="board_wrapper">
      <section class="board-section"></section>

      <section class="board_main">
        <MenuTitle></MenuTitle>

        <!-- 이미지 업로드 -->
        <div v-if="!image">
          <h5>이미지 업로드</h5>
          <input type="file" @change="onFileChange">
        </div>
        <div v-else>
          <img width="500px" :src="image" alt="img" />
          <button @click="removeImage">취소</button>
        </div>
        <!-- 이미지 업로드 끝끝 -->

       <div class="board_section_wrap">
         <!-- <CategoryList></CategoryList> -->
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
import {IBoard} from "@/components/board/interface/IBoard";

@Component({
  components: {
    CategoryList,MenuTitle
  },
})
export default class WriterForm extends Vue{

  btn: boolean;

  title: string;
  content: string;

  file: string;
  image: string | ArrayBuffer | null;
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
    this.file = '';
    this.btn = true;
    this.image = '';
  }

  async created(){
      if(this.$route.params.id != null){
        const _id = this.$route.params.id;
        const { boardData } = await Vue.axios.get(`/board/d/${_id}`) as { boardData: IBoard };

        this.board = boardData;
        this.title = this.board.title;
        this.content = this.board.content;
        this.btn = false;
      }
      throw new Error();
  }

  async writeBoard(){
    const { result } = await Vue.axios.post('/board',{
      title: this.title,
      content: this.content,
      writer: this.$store.state.memberName,
    }) as { result: boolean };

    if(result){
      await this.$router.push({
        path : '/board'
      })
    }
    throw new Error();
  }

  onFileChange(e: any){
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
      return;
    this.createImage(files[0]);
  }

  createImage(file: any) {
    let image = new Image();
    let reader = new FileReader();
    let vm = image;

    reader.onload = (e: any) => {
      vm = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  removeImage(e : string) {
  this.image = '';
  }

  async updateBoard() {
    const _id = this.$route.params.id;
    const { result } = await Vue.axios.patch(`/board/${_id}`,{
      title : this.title,
      content : this.content
    }) as { result: boolean };
      if(result){
        await this.$router.push({
          path : '/board'
        })
      }
    throw new Error();
  }

  async uploadFile(){
    const formData = new FormData();
    formData.append('file', this.file);

    try {
      const { data } = await Vue.axios.post('/fileUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(data);
    } catch(err) {
      console.log(err);
    }
  }

  async selectFile($file: string){
    this.file = $file;
  }

  async cancelWrite(){
    await this.$router.push({
      path: '/board'
    })
  }

}
</script>

<style scoped>

#boardList {
  height: 710px;
}

.board_section_wrap{
  display: flex;
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


</style>