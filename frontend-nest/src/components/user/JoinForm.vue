<template>
  <div class="main">

    <form id="joinForm">
      <fieldset id="join">
        <legend id="joinTitle">JOIN</legend>
        <ol>
          <li>
            <label>이메일</label>
            <input type="email" v-model="email" placeholder="abca@domain.com" required="required" size="20" class="box"/>
            <input type="button" value="중복확인" class="check" />
            <div id="email_check"></div>
          </li>
          <li>
            <label>비밀번호</label>
            <input type="password" v-model="pw1" size="20" required="required" class="box"/>
          </li>
          <li>
            <label>비밀번호 확인</label>
            <input type="password" v-model="pw2" size="20" required="required" class="box"/>
            <div id="pw_check"></div>
          </li>
          <li>
            <label>이름</label>
            <input type="text" v-model="name" size="20" required="required" class="box" />
          </li>
          <li>
            <label>전화번호</label>
            <input type="tel" v-model="phone" placeholder="010-1234-5678" size="20" class="box" />
          </li>
        </ol>
      </fieldset>

      <div>
        <input type="submit" value="회원가입" class="btn" />
        <input type="button" value="취소" v-on:click="cancle" class="btn" />
      </div>

    </form>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from "axios";

@Component
export default class JoinForm extends Vue{

  email: string;
  pw1: string;
  pw2: string;
  name: string;
  phone: string;

  constructor() {
    super();
    this.email = '';
    this.pw1 = '';
    this.pw2 = '';
    this.name = '';
    this.phone = '';
  }

  join(){
    axios.post('/api/user/signUp',{
      email: this.email,
      pw: this.pw1,
      name: this.name,
      phone: this.phone,
    }).then((res) => {
        this.$router.push({
          path : '/'
        })
    }).catch((err) => {
      console.error(err);
    })
  }

  cancle(){
    this.$router.push({
      path: '/'
    })
  }
}

</script>

<style scoped>

*{
  box-sizing: border-box;
  text-decoration: none;
  margin: 0;
  padding: 0;

}



#joinForm{
  margin-top: 30px;
  position: relative;
  width:500px;
  height:600px;
  background-color: #ffffff;
  border: 1px solid gray;
  text-align: center;
  top: 350px;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 27%;

}

#joinTitle{
  font-size: 30px;
  margin-bottom: 40px;
  font-weight: bold;
  text-shadow: 0 1px 1px gray;
}

#join{
  border:none;
  margin-top: 40px;
  font-size: 20px;
}

#join:last-of-type{
  margin-bottom: 0;
}

form label{
  float: left;
  width: 130px;
  font-size: 20px;
}

label{
  margin-left: 23px;
}



li{
  color: #636e72;
  float:left;
  background: none;
  border: none;
  margin-bottom: 30px;
  list-style: none;
}

.box{
  margin-left:44px;
  border: none;
  outline: none;
  color: #636e72;
  font-size: 16px;
  height: 25px;
  background: none;
  border-bottom: 2px solid black;
}

.check{
  border: none;
  background: none;
  font-size: 17px;
  color: #636e72;
}

.btn{
  border: none;
  background: none;
  font-size: 17px;
  color: #636e72;
  margin-left: 30px;
  margin-right: 30px;
  cursor: pointer;
}

.main{
  width: 100%;
  height: 710px;
}

</style>