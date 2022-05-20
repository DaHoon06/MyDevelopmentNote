<template>
  <div id="chat-room-container">
    <send-message />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavigationComponent from "@/components/common/NavigationComponent.vue";
import SendMessage from "@/components/chat/SendMessage.vue";

@Component({
  components: {
    SendMessage,
    NavigationComponent,
  },
})
export default class ChattingRoom extends Vue {
  // created() {}
}
</script>

<style scoped>
#chat-room-container {
  text-align: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 1px 1px 1px #c7c7c7;
  width: 90vw;
  height: 75vh;
  max-height: 500px;
  margin: auto auto auto auto;
}
</style>
