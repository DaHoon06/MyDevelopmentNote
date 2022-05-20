<template>
  <section id="user-list">
    <article id="user-list-section">
      <div
          class="user-list-items"
          v-for="(lists, index) of this.userLists"
          :key="index"
      >
        <span class="list-items">
          <a @click="doChat(lists.name)">{{ lists.name }}</a>
        </span>
        <span
            v-if="lists.connecting"
            id="isLogin"
            class="list-items blinking"
        ></span>
        <span v-else id="isLogout" class="list-items blinking"></span>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";

export interface IUserLists {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  connecting: boolean;
}

@Component
export default class ChatComponent extends Vue {
  userLists: IUserLists[];

  myInfo: {
    nickName: string;
    id: string;
    room: {
      roomName: string;
    };
  };
  constructor() {
    super();
    this.myInfo = {
      nickName: "",
      id: "",
      room: {
        roomName: "",
      },
    };
    this.userLists = [];
  }
  async created() {
    await this.load();
  }

  async load() {
    const { data } = await this.axios.get("/user/chatLists");
    this.userLists = data;
  }

  @Emit("target")
  doChat(name: string) {
    return name;
  }

  async updated() {
    setTimeout(async () => {
      await this.load();
    }, 300);
  }
}
</script>

<style scoped>
#user-list {
  position: fixed;
  width: 100vw;
  max-width: 330px;
  padding-top: 1em;
  background: #f2f2ff;
  min-height: 800px;
  height: 100vh;
  border-radius: 0 0 25px 0;
  box-shadow: 0 31px 10px 5px #cbcbcb;
  border-right: 2px solid #e5e5e5;
}

#user-list-section {
  margin-top: 2em;
  overflow-y: auto;
}

.user-list-items:first-child {
  border-top: 1px dotted #afafaf;
}
.user-list-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dotted #afafaf;
  margin-top: 0.3em;
}

#isLogin {
  border: 1px solid #04b404;
  box-shadow: 1px 1px 1px 1px #016201;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #0daf03;
}
#isLogout {
  border: 1px solid #ce0303;
  box-shadow: 1px 1px 1px 1px #810404;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #d50606;
}

.blinking {
  -webkit-animation: blink 3s ease-in-out infinite alternate;
  -moz-animation: blink 3s ease-in-out infinite alternate;
  animation: blink 3s ease-in-out infinite alternate;
}
@-webkit-keyframes blink {
  40% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes blink {
  40% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
@keyframes blink {
  40% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}

.list-items {
  margin: 0.5em 0.5em;
  color: #8c8989;
  font-weight: 500;
}

.list-items > a:hover {
  cursor: pointer;
  color: #c5c5ee;
  font-weight: 500;
}
</style>
