<template>
<div>
  <header id="header">
    <div id="header-wrap">

      <div class="navbar navbar-top navbar-expand navbar-expand-lg">
        <div class="container-fluid">
          <div>
            <form>
              <input type="text" id="search_bar" placeholder="Searching..." />
              <button id="search_icon">
                <b-icon-search></b-icon-search>
              </button>
            </form>
          </div>
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="#">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
          </b-nav-item-dropdown>
        </div>
      </div>

    </div>
  </header>
</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class HeaderNav extends Vue{

}
</script>

<style scoped>

#header{
  width: calc(100% - 260px);
  margin-left: 260px;
  height: 180px;
  background: linear-gradient(17deg, rgba(17, 178, 92, 0.6) 40%, rgba(16, 182, 165, 0.6) 60%);
}

#search_bar {
  border-radius: 20px;
  padding-left: 12px;
  margin-left: 15px;
  font-size: 15px;
  width: 250px;
  height: 30px;
}
#search_icon {
  border: none;
  outline: none;
  background: none;
  position: relative;
  right: 30px;
}



@media screen and (max-width: 1024px){
  #header{
    width: 100%;
    height: 180px;
    background: linear-gradient(17deg, rgba(17, 178, 92, 0.6) 40%, rgba(16, 182, 165, 0.6) 60%);
    margin-left: 0;
  }
}

</style>