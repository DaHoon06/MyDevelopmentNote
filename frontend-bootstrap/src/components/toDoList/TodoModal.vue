<template>
<div>
  <b-modal ref="modal" id="modal-center" centered title="입력" @show="resetModal"
           @hidden="resetModal" @ok="submitBtn">
    <b-form @submit.stop.prevent="handleSubmit">
      <b-form-textarea no-resize v-model="todo_content" required :state="contentState" rows="10"></b-form-textarea>
    </b-form>
  </b-modal>
</div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";

@Component
export default class TodoModal extends Vue{

  todo_content: string;
  contentState: string;
  submittedNames: [];

  constructor() {
    super();
    this.todo_content = '';
    this.contentState = '';
    this.submittedNames = [];
  }

  resetModal() {
    this.todo_content = '';
    this.contentState = '';
  }

  submitBtn(bvModalEvt: any){
    bvModalEvt.preventDefault();
    this.handleSubmit();
  }

  async handleSubmit(){
    setTimeout(() => {
      this.$bvModal.hide('modal-center');
    }, 200);

    const {result} = await Vue.axios.post('/todoList/insert',{
      todo_content:  this.todo_content,
    });
    if(result){
      alert('등록 되었습니다.');
    }
    throw new Error('입력 실패..');
  }




}
</script>

<style scoped>

</style>