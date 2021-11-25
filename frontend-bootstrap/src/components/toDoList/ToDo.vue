<template>
<div>

    <div id="toDoList">

      <section class="toDoList">
        <b-card-group deck>
          <b-card header="해야할 일">
            <button v-b-modal.modal-center class="insertBtn">+</button>
            <b-list-group>
              <draggable>
                <b-list-group-item href="#" variant="light">Item1 <input type="checkbox" />
                  <div>
                    <button v-b-modal.modal-center class="insertBtn">+</button>
                    <button class="deleteBtn">-</button>
                  </div>
                </b-list-group-item>

                <b-list-group-item href="#" variant="light">Item2 <input type="checkbox" />
                  <div>
                    <button v-b-modal.modal-center class="insertBtn">+</button>
                    <button class="deleteBtn">-</button>
                  </div>
                </b-list-group-item>

                <b-list-group-item href="#" variant="light">Item3 <input type="checkbox" />
                  <div>
                    <button v-b-modal.modal-center class="insertBtn">+</button>
                    <button class="deleteBtn">-</button>
                  </div>
                </b-list-group-item>

                <b-list-group-item href="#" variant="light">Item4 <input type="checkbox" />
                  <div>
                    <button v-b-modal.modal-center class="insertBtn">+</button>
                    <button class="deleteBtn">-</button>
                  </div>
                </b-list-group-item>

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
                <b-list-group-item href="#" variant="light">Item1 <input type="checkbox" />
                  <div>
                    <button class="deleteBtn">-</button>
                  </div>
                </b-list-group-item>

                <b-list-group-item href="#" variant="light">Item2 <input type="checkbox" />
                  <div>
                    <button class="deleteBtn">-</button>
                  </div>
                </b-list-group-item>

                <b-list-group-item href="#" variant="light">Item3 <input type="checkbox" />
                  <div>
                    <button class="deleteBtn">-</button>
                  </div>
                </b-list-group-item>

                <b-list-group-item href="#" variant="light">Item4 <input type="checkbox" />
                  <div>
                    <button class="deleteBtn">-</button>
                  </div>
                </b-list-group-item>

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
                <b-list-group-item href="#" variant="light">Item1 <input type="checkbox" />
                  <div>
                    <button class="deleteBtn">-</button>
                  </div>
                </b-list-group-item>

                <b-list-group-item href="#" variant="light">Item2 <input type="checkbox" />
                  <div>
                    <button class="deleteBtn">-</button>
                  </div>
                </b-list-group-item>

                <b-list-group-item href="#" variant="light">Item3 <input type="checkbox" />
                  <div>
                    <button class="deleteBtn">-</button>
                  </div>
                </b-list-group-item>

                <b-list-group-item href="#" variant="light">Item4 <input type="checkbox" />
                  <div>
                    <button class="deleteBtn">-</button>
                  </div>
                </b-list-group-item>

              </draggable>
            </b-list-group>
          </b-card>
        </b-card-group>
      </section>

    </div>

  <todo-modal name="title" />

</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import todoModal from './TodoModal.vue';
import draggable from "vuedraggable";

interface  TODO_DETAIL {
  _id: {
    doing:string,
    todo_content:string,
    updated_at:string
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

  constructor() {
    super();
    this.todoList = [{_id: {doing:'', todo_content:'', updated_at:''}}];
    this.doingList = [{_id: {doing:'', todo_content:'', updated_at:''}}];
    this.completeList = [{_id: {doing:'', todo_content:'', updated_at:''}}];
  }

  async created(){
    // const { data } = await Vue.axios.get('/todoList') as { data: { _id:{doing:string, todo_content:string, updated_at : string }}[] };
    const { data } = await Vue.axios.get('/todoList') as { data: TODO_DETAIL[] };

    for(let i of data){
      switch (i._id.doing){
        case '해야할일':
          this.todoList.push(i._id);
          break;
        case '진행중':
          this.doingList.push(i._id);
          break;
        case '완료':
          this.completeList.push(i._id);
          break;
      }
    }

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
  height: 600px;
}

.deleteBtn, .insertBtn{
  width: 18px;
  border: 1px solid #e5e0e0;
  border-radius: 30px;
  background: #94b49f;
  outline: none;
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