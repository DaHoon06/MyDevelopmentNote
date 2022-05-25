<template>
  <main id="login-container">
    <section id="profile-box">
      <article id="profile-img">
<!--        <img src="@/assets/profile.png" alt="profile" />-->
      </article>

      <article>
        <label class="nickName" for="name" v-if="enterName">
          <small>닉네임을 입력해주세요.</small>
        </label>
        <label class="nickName" for="name" v-else>
          <small>{{ existsName }}</small>
        </label>
        <input
            type="text"
            class="name"
            @keyup.enter="login"
            id="name"
            v-model="name"
        />
      </article>

      <article>
        <button id="login-btn" @click="login">go</button>
      </article>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class LoginComponent extends Vue {
  name = "";
  enterName = true;
  test = "";
  msg: string;

  constructor() {
    super();
    this.msg = "";


  }

  async login() {
    const sendData = {
      name: this.name,
    };
    const result = await this.$store.dispatch("userStore/login", sendData);

    if (result) {
      await this.$router.push("/chat");
    } else {
      this.enterName = false;
      this.msg = "존재하는 이름 입니다.";
      this.existsName = this.msg;
    }
  }

  private set existsName(msg: string) {
    this.test = msg;
  }
  private get existsName(): string {
    return this.test;
  }
}
</script>

<style scoped>
input {
  font-weight: 400;
  padding-bottom: 0.3em;
  margin-top: 10px;
  border: none;
  background: none;
  border-bottom: 1px solid #d0d0d0;
  text-align: center;
}

#login-container {
  text-align: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 1px 1px 1px #c7c7c7;
  width: 50vw;
  max-width: 500px;
  height: 75vh;
  max-height: 500px;
  margin: 5em auto;
}

#login-btn {
  border: 2px solid #cfcff4;
  color: #757575;
  background: #cfcff4;
  font-weight: 400;
  border-radius: 5px;
  margin-top: 3em;
  width: 20%;
  height: 1.8em;
}
#login-btn:hover {
  border: none;
  cursor: pointer;
  background: #c5c5ee;
  color: #f5f5f5;
}
#profile-box {
  padding-top: 5em;
}
#profile-img {
  margin: 3em auto;
  background: #c4c4c4;
  border: 1px solid #cfcff4;
  border-radius: 45px;
  width: 80px;
  height: 80px;
}
#profile-img > img {
  margin-top: 0.7em;
  width: 3em;
}

.name {
  display: block;
  font-weight: 500;
  font-size: 14px;
}
.name:nth-child(2) {
  margin: auto;
}
</style>
