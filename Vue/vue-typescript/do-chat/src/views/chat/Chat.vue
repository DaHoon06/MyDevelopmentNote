<template>
  <main id="chat-container">
    <navigation-component />
    <main id="body">
      <user-lists-component @target="setChatTarget" />
      <send-message :targetName="setChatTarget" />
    </main>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserListsComponent from "@/components/user/UserListsComponent.vue";
import NavigationComponent from "@/components/common/NavigationComponent.vue";
import SendMessage from "@/components/chat/SendMessage.vue";

@Component({
  components: {
    NavigationComponent,
    UserListsComponent,
    SendMessage,
  },
})
export default class ChatList extends Vue {
  targetName = "";

  private setChatTarget(name: string) {
    this.$socket.emit("test", name);
    this.$socket.on("test", (data) => {
      console.log(data);
    });
  }

  private set targetNameComputed(name: string) {
    this.targetName = name;
  }
  private get targetNameComputed() {
    return this.targetName;
  }

  // mounted() {
  //   this.setChatTarget();
  // }
}
</script>

<style scoped>
#body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
