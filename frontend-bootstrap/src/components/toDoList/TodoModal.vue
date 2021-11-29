<template>
<div>
  <b-modal ref="modal" id="modal-center" centered title="입력" @ok="submitBtn">
    <b-form @submit.stop.prevent="handleSubmit">
      <b-form-textarea no-resize v-model="todo_content" required  rows="10"></b-form-textarea>
    </b-form>
    {{updateIndex}}
  </b-modal>
</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class TodoModal extends Vue{
  @Prop() updateIndex ?: string = '';

  todo_content: string;

  constructor() {
    super();
    this.todo_content = '';
  }

  submitBtn(bvModalEvt: any){
    bvModalEvt.preventDefault();
    this.handleSubmit();
  }

  async handleSubmit(){
    setTimeout(() => {
      this.$bvModal.hide('modal-center');
    }, 200);

    const result = await Vue.axios.post('/todoList/insert',{
      todo_content:  this.todo_content,
    });

    if(result){
      this.$emit('success-todoList',true);
      this.todo_content = '';
    } else {
      throw new Error('입력 실패..');
    }
  }


}
</script>

<style scoped>

</style>