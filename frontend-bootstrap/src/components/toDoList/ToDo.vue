<template>
<div id="toDo_wrap">

    <div id="toDoList">

      <section class="toDoList">
        <b-card-group deck>
          <b-card header="DOING">

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
                    <input type="checkbox" class="todoCheck" :key="index" :checked="isChecked" @change="doing(todoList._id.obId,$event.target)" />
                    <div>
                      <button v-b-modal.modal-center class="updateBtn" @click="editTodo(todoList._id.obId,index)">edit</button>
                      <button class="deleteBtn" @click="deleteData(todoList._id.obId)">ㅡ</button>

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
          <b-card header="DOING">
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
                    <input type="checkbox" class="todoCheck" :checked="isChecked" @change="complete(todoList._id.obId,$event.target)" />
                    <div>
                      <button v-b-modal.modal-center class="updateBtn" @click="editTodo(todoList._id.obId,index)">edit</button>
                      <button class="deleteBtn" @click="deleteData(todoList._id.obId)">ㅡ</button>

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
          <b-card header="DONE">
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
                      <button class="deleteBtn" @click="deleteData(todoList._id.obId)">ㅡ</button>
                    </div>
                  </div>
                </div>
              </draggable>
            </b-list-group>
          </b-card>
        </b-card-group>
      </section>

    </div>

  <todo-modal @success_todoList="getTODOList" :updateIndex="obID"/>

</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import todoModal from './TodoModal.vue';
import draggable from "vuedraggable";

interface TODO_DETAIL {
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
  },

})
export default class ToDo extends Vue{

  //PROP DATA
  obID: string = '';

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
      this.todoList.shift();
      const isToDo = this.todoList.length;
      if(!isToDo){
        this.todoList = [{_id: {doing: '', todo_content: '', updatedAt: '',obId: ''}}];
        this.isTodo = false;
      }
    }

    if(this.isDoing){
      this.doingList.shift();
      const isOne = this.doingList.length;
      if(!isOne){
        this.doingList = [{_id: {doing: '', todo_content: '', updatedAt: '',obId: ''}}];
        this.isDoing = false;
      }
    }

    if(this.isComplete){
      this.completeList.shift();
      const isCom = this.completeList.length;
      if(!isCom){
        this.completeList = [{_id: {doing: '', todo_content: '', updatedAt: '',obId: ''}}];
        this.isComplete = false;
      }
    }

  }

  async doing(id: string, ele: any) {
    const  result  = await this.changeStateTodo(id);
    if(result){
      await this.getTODOList();
      ele.checked=false;
    } else {
      alert('ERROR');
      ele.checked=false;
    }
  }

  async complete(id: string, ele: any){
    const  result  = await this.changeStateComplete(id);
    if(result){
      await this.getTODOList();
      ele.checked=false;
    } else {
      alert('ERROR');
      ele.checked=false;
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

  async editTodo(id: string,index: number){
    console.log(id,index);
    this.obID = id;
  }

  async updateData(id: string){
    let data;
    for(let i of this.todoList){data = i}
    console.log(data._id);
    const result = await this.updateTodo(id,data);
  }

  //--------- BACKEND ---------
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

  async updateTodo(id: string, toDoData: any){
    const { data } = await Vue.axios.patch(`/todoList/update/${id}`,{
      toDoData
    });
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
#toDo_wrap {
  height: 700px;
}
.toDoList{
  width: 500px;
  height: auto;
}

.insertBtn{
  width: 18px;
  font-weight: bold;
  color: #fff9e7;
  border: none;
  border-radius: 100%;
  background: rgb(21, 21, 20);
  outline: none;
  margin: 0;
  padding: 0;
  padding-bottom: 3px;
  margin-bottom: 10px;
}
.insertBtn:hover{
  background: rgba(9, 155, 77, 0.6);
}

.deleteBtn{
  margin: 10px 5px 10px 0px;
  width: 18px;
  font-weight: bold;
  color: #ffffff;
  border: none;
  border-radius: 100%;
  background: rgb(161, 33, 33);
  outline: none;
  padding: 0;
}

.deleteBtn:hover{
  background: rgb(236, 76, 76);
}

input[type="checkbox"] {
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: 0;
  height: 16px;
  width: 16px;
  border: 1px solid black;
  border-radius: 100%;
  position: relative;
  top: -30px;
  float: right;
}


input[type="checkbox"]:hover {
  filter: brightness(90%);
}


.updateBtn {
  color: #fcfdfd;
  background: rgb(21, 21, 20);
  border: none;
  border-radius: 10px;
  width: 37px;
  outline: none;
  margin: 10px 5px 10px 0px;
}

.updateBtn:hover {
  color: #fcfdfd;
  background: linear-gradient(17deg, rgba(17, 178, 92, 0.6) 40%, rgba(16, 182, 165, 0.6) 60%);
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