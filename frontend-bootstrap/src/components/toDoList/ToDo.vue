<template>
<div>

  <div id="toDoList">
    <section class="toDoList">
      <b-card-group deck>
        <b-card header="해야할 일">
          <b-list-group>
            <b-list-group-item>
              <div>
                TEST1 <input type="checkbox" />
              </div>
            </b-list-group-item>
          </b-list-group>
          <div>
            <b-button v-b-modal.modal-center>추가</b-button>
            <button>삭제</button>
          </div>
        </b-card>
      </b-card-group>
    </section>

    <section class="toDoList">
      <b-card-group deck>
        <b-card header="진행중인 일">
          <b-list-group>
            <b-list-group-item>
              <div>
                TEST2 <input type="checkbox" />
              </div>
            </b-list-group-item>
          </b-list-group>
          <div>
            <b-button v-b-modal.modal-center>추가</b-button>
            <button>삭제</button>
          </div>
        </b-card>
      </b-card-group>
    </section>

    <section class="toDoList">
      <b-card-group deck>
        <b-card header="완료된 일">
          <b-list-group>
            <b-list-group-item>
              <div>
                TEST3 <input type="checkbox" />
              </div>
            </b-list-group-item>
          </b-list-group>
          <div>
            <button>추가</button>
            <button>삭제</button>
          </div>
        </b-card>
      </b-card-group>
    </section>
  </div>


  <todo-modal name="title" />

</div>
</template>

<script>
import {Component, Vue} from "vue-property-decorator";
import todoModal from './todoModal.vue';

@Component({
  components:{
    todoModal
  }
})
export default class ToDo extends Vue{


  todo(){

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

@media screen and (max-width: 1024px){
  #toDoList{
    display: flex;
    align-content: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .toDoList{
    width: 500px;
    height: 270px;
  }
}

</style>