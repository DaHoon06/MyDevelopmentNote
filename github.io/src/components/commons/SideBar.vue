<template>
<div id="side">
  <div>
    <b-navbar toggleable type="dark">
      <b-navbar-toggle target="navbar-toggle-collapse">
        <template #default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-navbar-brand href="#">HOME</b-navbar-brand>

      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/node">NodeJS</b-nav-item>
          <b-nav-item to="/nest">NestJS</b-nav-item>
          <b-nav-item to="/vue">VueJS</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

  <div class="side_wrapper">
    <nav>
      <div id="menu">

        <template>
          <b-row>
            <b-col md="auto">
              <b-calendar
                  selected-variant="dark"
                  today-variant="success"
                  nav-button-variant="success"
                  v-model="value"
                  @context="onContext"
                  :hide-header="hideHeader"
              ></b-calendar>
            </b-col>
          </b-row>
        </template>

      </div>
    </nav>
  </div>




</div>
</template>

<script lang="ts">
import { Component,Vue } from "vue-property-decorator";

@Component
export default class SideBar extends Vue{
  value: string;
  context: string;
  hideHeader: boolean;

  constructor() {
    super();

    this.value = '';
    this.context = '';
    this.hideHeader = true;
  }

  async onContext(ctx: any) {
    this.context = ctx
    console.log()
  }




}
</script>

<style scoped>
#home{
margin: auto;
}

#side {
  width: 300px;
  min-height: 100%;
  background: #0e0e59;
  border-radius: 0 10px 10px 0;
  color: #ffffff;
  position: fixed;
}

.side_wrapper {
  border-top: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  border-radius: 0 10px 10px 0;
  width: 290px;
  margin-top: 5px;
  min-height: 850px;
}

#menu {

}
</style>