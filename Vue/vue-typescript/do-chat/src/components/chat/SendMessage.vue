<template>
  <div id="chat-room-wrapper">
    <div id="message-textarea">
      <p class="notice-msg">{{ this.noticeComputed }}</p>

      <div id="chat-body"></div>
    </div>
    <div id="message-input-area">
      <input
        type="text"
        id="message-input"
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="메세지를 입력해 주세요."
      />
      <button id="send-message-btn" @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export interface ChatInformation {
  name: string;
  message?: string;
}

@Component
export default class SendMessage extends Vue {
  @Prop() name?: string;

  notice = "";
  message = "";
  nickName = "";
  chatMessage = "";

  target = "";
  constructor() {
    super();
  }

  created() {
    this.connectSocket();
  }

  private setChatRoom() {
    console.log(this.name);

    if (this.name) {
      this.noticeComputed = `${this.name} 님 과 연결합니다.`;
    } else {
      this.noticeComputed = "상대방을 선택 해주세요.";
    }
  }

  private connectSocket() {
    this.getChatList();
  }
  private getChatList() {
    this.$socket.emit("getChatRoomList", null);
    this.$socket.on("getChatRoomList", (data) => {
      this.$socket.emit("enterChatRoom", data);
      this.$socket.on("enterChatRoom", (data) => {
        alert(data);
        this.notice = data;
      });
    });
  }

  private sendMessage() {
    const sendData = {
      message: this.message,
      nickName: this.getName,
    };
    if (this.message) {
      this.$socket.emit("sendMessage", sendData);
      this.$socket.on("getMessage", (data) => {
        const { nickName, message } = data;
        this.nickName = nickName;
        this.chatMessage = message;
        this.getMessage();
      });
    } else {
      alert("메세지가 입력되지 않았습니다.");
    }
  }

  private getMessage() {
    this.setChatInformation(this.nickName, this.chatMessage);
    this.message = "";
  }

  private setChatInformation(nickName: string, message: string) {
    const sendData = {
      name: nickName,
      message: message,
    };
    this.makeHTMLTags(sendData);
  }

  private makeHTMLTags(sendData: ChatInformation) {
    const { name, message } = sendData;
    if (name && message) {
      const div = document.getElementById("chat-body");
      const makeSection = document.createElement("section");
      const makeArticle = document.createElement("article");
      const makeMain = document.createElement("main");
      const msgArea = document.createElement("h5");
      const nameTag = document.createElement("span");

      makeSection.className =
        name === this.getName ? "user-wrapper-other" : "user-wrapper";
      makeArticle.className = "user-container";
      makeMain.className = "chat-main-section";
      msgArea.className = "user-text";
      nameTag.className = "user";

      msgArea.innerText = message + "";
      nameTag.innerText = name + "";

      makeSection.appendChild(makeArticle);
      makeArticle.appendChild(makeMain);
      makeMain.appendChild(msgArea);
      makeMain.appendChild(nameTag);
      div?.appendChild(makeSection);
    } else {
      return false;
    }
  }
  private set noticeComputed(msg) {
    this.notice = msg;
  }
  private get noticeComputed() {
    return this.notice;
  }
  mounted() {
    this.getMessage();
    this.setChatRoom();
  }
}
</script>

<style scoped>
#chat-room-wrapper {
  padding-top: 1em;
  background: #f2f2ff;
  width: 100vw;
  height: 800px;
}
#message-textarea {
  background: #f8f3ee;
  border-radius: 5px;
  margin-top: 4em;
  width: 70vw;
  max-width: 1000px;
  min-width: 1000px;
  height: 87%;
  margin-left: 22em;
  padding-bottom: 4em;
  overflow-y: auto;
  box-shadow: 0 10px 20px 10px #c5c5c5;
  border: 2px solid #d7d7d7;
}

#message-input {
  z-index: 5;
  padding-right: 4em;
  margin-left: 3.4em;
  border: 1px solid #afafaf;
  color: #151515;
  font-weight: 500;
  border-radius: 5px;
  padding-left: 5px;
  width: 100%;
  max-width: 937px;
  min-width: 937px;
  height: 2em;
  background: none;
}
#send-message-btn {
  z-index: 10;
  border-left: 1px solid #afafaf;
  position: relative;
  left: -4em;
  color: #626262;
}
#send-message-btn:hover {
  cursor: pointer;
  background: #cfcff4;
}
#message-input-area {
  position: relative;
  top: -2em;
  background: #cfcff4;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3em;
  width: 1005px;
  margin-left: 22em;
  border-radius: 0 0 10px 10px;
}

.notice-msg {
  font-weight: 500;
  color: #9d9da2;
  font-size: 0.85em;
}
</style>

<style>
.user {
  display: inline-block;
  border: 1px solid #afafaf;
  border-radius: 45px;
  width: 40px;
  height: 40px;
}
.user-wrapper {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.7em;
}

.user-wrapper-other {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.7em;
}

.user-container {
  box-shadow: 0 1px 1px 1px #b7b7b7;
  border: 1px solid #afafaf;
  color: #313131;
  background: #d3d3f8;
  font-weight: 500;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 15em;
  margin-left: 1em;
  padding-left: 0.5em;
}

.user-text {
  padding-right: 0.5em;
}

.chat-main-section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-wrapper-other .chat-main-section {
  flex-direction: row;
}
.user-wrapper .chat-main-section {
  flex-direction: row-reverse;
}
</style>
