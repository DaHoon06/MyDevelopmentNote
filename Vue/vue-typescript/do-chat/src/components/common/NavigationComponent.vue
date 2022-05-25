<template>
  <nav id="nav-container">
    <span id="login-user">
      <small
        ><strong id="user-info">{{ name }} 접속중</strong></small
      >
    </span>
    <span>
      <button id="logout-btn" @click="logout">logout</button>
    </span>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavigationComponent extends Vue {
  name: string;
  constructor() {
    super();
    this.name = "";
  }

  created() {
    this.name = this.$store.getters["userStore/name"];
  }

  private logout() {
    const result = this.$store.dispatch("userStore/logout", this.name);
    if (result) {
      this.$socket.emit("closedChat", this.getName);
      this.$router.replace("/");
    }
  }
}
</script>

<style scoped>
#nav-container {
  position: fixed;
  background: #cfcff4;
  width: 100vw;
  margin: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0.5em 0;
  height: 40px;
  box-shadow: 3px 0 15px 2px #cbcbcb;
  border-radius: 0 0 2px 2px;
  z-index: 10;
}
#user-info {
  color: #8a8a8a;
}
#user-info::after {
  content: " |";
}

#login-user {
  margin-right: 0.5em;
  height: 1em;
}
#logout-btn {
  color: #8a8a8a;
  margin-right: 0.5em;
  height: 1.7em;
}
#logout-btn:hover {
  color: #a4a4d3;
  cursor: pointer;
  border-bottom: 0.2em solid #a4a4d3;
}
</style>
