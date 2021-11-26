<template>
<div>

    <div id="toDoList">

      <section class="toDoList">
        <b-card-group deck>
          <b-card header="해야할 일">
            <button v-b-modal.modal-center class="insertBtn">+</button>
            <b-list-group>
              <draggable>
                <div v-for="(todoList,index) in todoList" :key="index">
                  <div  v-if="!isTodo">
                    <b-list-group-item variant="light">
                      등록된 일정이 없습니다.
                    </b-list-group-item>
                  </div>
                  <div v-else>
                    <b-list-group-item variant="light" >
                      {{todoList._id.todo_content}}
                    </b-list-group-item>
                    <div>
                      <input type="checkbox" class="todoCheck" :value="isChecked" @input="isChecked = $event.target.value" @change="doing(todoList._id.obId)" />
                      <button class="deleteBtn" @click="deleteData(todoList._id.obId)">-</button>
                    </div>
                  </div>
                </div>
              </draggable>
            </b-list-group>

          </b-card>
        </b-card-group>
      </section>

      <section class="toDoList">
        <b-card-group deck>
          <b-card header="진행중인 일">
            <b-list-group>
              <draggable>
                <div v-for="(todoList,index) in doingList" :key="index">
                  <div v-if="!isDoing">
                    <b-list-group-item variant="light" >
                      등록된 일정이 없습니다.
                    </b-list-group-item>
                  </div>
                  <div v-else>
                    <b-list-group-item variant="light" >
                      {{todoList._id.todo_content}}
                    </b-list-group-item>
                    <div>
                      <input type="checkbox" :key="index" class="todoCheck" :value="isChecked" @input="isChecked = $event.target.value" @change="complete(todoList._id.obId)" />
                      <button class="deleteBtn" @click="deleteData(todoList._id.obId)">-</button>
                    </div>
                  </div>
                </div>
              </draggable>
            </b-list-group>
          </b-card>
        </b-card-group>
      </section>

      <section class="toDoList">
        <b-card-group deck>
          <b-card header="완료된 일">
            <b-list-group>
              <draggable>
                <div v-for="(todoList,index) in completeList" :key="index">
                  <div  v-if="!isComplete">
                    <b-list-group-item variant="light">
                      등록된 일정이 없습니다.
                    </b-list-group-item>
                  </div>
                  <div  v-else>
                    <b-list-group-item variant="light">
                      {{todoList._id.todo_content}}
                    </b-list-group-item>
                    <div>
                      <button class="deleteBtn" @click="deleteData(todoList._id.obId)">-</button>
                    </div>
                  </div>
                </div>
              </draggable>
            </b-list-group>
          </b-card>
        </b-card-group>
      </section>

    </div>

  <todo-modal @success_todoList="getTODOList" />

</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import todoModal from './TodoModal.vue';
import draggable from "vuedraggable";

interface  TODO_DETAIL {
  _id: {
    doing: string,
    todo_content: string,
    updatedAt: string,
    obId: string,
  }
}

@Component({
  components:{
    todoModal,
    draggable,

  }
})
export default class ToDo extends Vue{

  todoList: TODO_DETAIL[];
  doingList : TODO_DETAIL[];
  completeList: TODO_DETAIL[];

  isChecked: boolean;
  isTodo: boolean;
  isDoing: boolean;
  isComplete: boolean;

  constructor() {
    super();
    this.todoList = [{_id: {doing: '', todo_content: '', updatedAt: '',obId: ''}}];
    this.doingList = [{_id: {doing: '', todo_content: '', updatedAt: '',obId: ''}}];
    this.completeList = [{_id: {doing: '', todo_content: '', updatedAt: '',obId: ''}}];

    this.isTodo = false;
    this.isDoing = false;
    this.isComplete = false;
    this.isChecked = false;
  }

  async created(){
    await this.getTODOList();
  }

  async todoListInit(){
    this.todoList = [{_id: {doing: '', todo_content: '', updatedAt: '',obId: ''}}];
    this.doingList = [{_id: {doing: '', todo_content: '', updatedAt: '',obId: ''}}];
    this.completeList = [{_id: {doing: '', todo_content: '', updatedAt: '',obId: ''}}];

  }

  async getTODOList(){
    const { data } = await Vue.axios.get('/todoList') as { data: TODO_DETAIL[] };
    await this.todoListInit();

    for(let i of data){
      switch (i._id.doing){
        case '해야할일':
          this.todoList.push(i);
          this.isTodo = true;
          break;
        case '진행중':
          this.doingList.push(i);
          this.isDoing = true;
          break;
        case '완료':
          this.completeList.push(i);
          this.isComplete = true;
          break;
      }
    }

    if(this.isTodo){
      this.todoList.shift()
    }
    if(this.isDoing){
      this.doingList.shift();
    }
    if(this.isComplete){
      this.completeList.shift();
    }

  }

  async doing(id: string) {
    const  result  = await this.changeStateTodo(id);
    if(result){
      await this.getTODOList();
      this.isChecked = false;
    } else {
      alert('ERROR')
    }
  }

  async complete(id: string){
    const  result  = await this.changeStateComplete(id);
    if(result){
      await this.getTODOList();
      this.isChecked = false;
    } else {
      alert('ERROR')
    }
  }

  async deleteData(id: string){
    const result = await this.deleteBtn(id);
    if(result){
      await this.getTODOList();
    } else {
      alert('ERROR');
    }
  }
  // 해야할일 -> 진행중
  async changeStateTodo(id: string){
    const { data } = await Vue.axios.patch(`/todoList/do/${id}`);
    return data;
  }

  async changeStateComplete(id: string){
    const { data } = await Vue.axios.patch(`/todoList/complete/${id}`);
    return data;
  }
  // 삭제 버튼
  async deleteBtn(id: string){
    const { data } = await Vue.axios.patch(`/todoList/delete/${id}`);
    return data;
  }


}
</script>

<style scoped>

#toDoList {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;

}

.toDoList{
  width: 500px;
  height: auto;
}

.deleteBtn, .insertBtn{
  width: 18px;
  border: 1px solid #e5e0e0;
  border-radius: 30px;
  background: #94b49f;
  outline: none;
}

.todoCheck{
  float: right;
}

@media screen and (max-width: 1024px){
  #toDoList{
    display: flex;
    align-content: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .toDoList{
    width: 500px;
    height: auto;
  }
}

</style>