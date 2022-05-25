<template>
  <main id="chat-container">
    <navigation-component />
    <main id="body">
      <user-lists-component @target="setChatTarget" />
      <send-message :targetName="targetName" />
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
  myInfo: {
    nickName: string,
    id: string,
    roomId: string,
  };

  roomName = "";
  targetName = "";

  constructor() {
    super();
    this.myInfo = {
      nickName: '',
      id: '',
      roomId: '',
    };
  }

  created() {
    this.init();
  }

  private init() {
    this.$socket.on("connect");
    const sendData = {
      name: this.getName,
    }
    this.$socket.emit("setInit", sendData, (response: any) => {
      const { nickName, roomId } = response;
      this.myInfo.nickName = nickName;
      this.myInfo.roomId = roomId;
      this.myInfo.id = this.$socket.id;
    });
  }

  private setChatTarget(name: string) {
    this.$socket.emit("propsName", name);
    this.$socket.on("propsName", (data) => {
      this.targetName = data;
    });
  }

}
</script>

<style scoped>
#body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
