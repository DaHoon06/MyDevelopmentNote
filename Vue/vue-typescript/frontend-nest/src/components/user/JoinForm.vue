<template>
  <div class="main">

    <form id="joinForm" v-on:submit="join">
      <fieldset id="join">
        <legend id="joinTitle">JOIN</legend>
        <ol>
          <li>
            <label>이메일</label>
            <input type="email" ref="email" v-model="email" placeholder="abca@domain.com" id="email" required="required" size="20" class="box"/>
            <input type="button" value="중복확인" class="check" @click="emailCheck" />
            <div class="alert_txt">
              <input type="text" id="email_check" v-model="alertEmail" />
            </div>
          </li>
          <li>
            <label>비밀번호</label>
            <input type="password" placeholder="8 ~ 12 글자" @change="pwCheck1" id="pw1" v-model="pw1" size="20" required="required" class="box"/>
            <div class="alert_txt">
              <p>1개이상의 문자와 특수문자 포함</p>
            </div>
            <div class="alert_txt">
              <input type="text" id="pw_check1" v-model="alertPw1" />
            </div>
          </li>
          <li>
            <label>비밀번호 확인</label>
            <input type="password" @change="pwCheck2" id="pw2" v-model="pw2" size="20" required="required" class="box"/>
            <div id="pw_check2">
              <input type="text"  v-model="alertPw2" />
            </div>
          </li>
          <li>
            <label>이름</label>
            <input type="text" v-model="name" size="20" required="required" class="box" />
          </li>
          <li>
            <label>전화번호</label>
            <input type="tel" v-model="phone" @change="phoneCheck" required placeholder="010-1234-5678" size="20" class="box" />
          </li>
        </ol>
      </fieldset>

      <div>
        <input type="submit" value="회원가입" class="btn" />
        <input type="button" value="취소" v-on:click="home" class="btn" />
      </div>

    </form>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class JoinForm extends Vue{

  email: string;
  pw1: string;
  pw2: string;
  name: string;
  phone: string;

  alertEmail: string;
  alertPw1: string;
  alertPw2: string;

  constructor() {
    super();
    this.email = '';
    this.pw1 = '';
    this.pw2 = '';
    this.name = '';
    this.phone = '';

    this.alertEmail = '';
    this.alertPw1 = '';
    this.alertPw2 = '';
  }

  async join(){
    if(confirm('가입하시겠습니까?')){
      const { result } = await Vue.axios.post('/user/signUp',{
        email: this.email,
        password: this.pw1,
        name: this.name,
        phone: this.phone,
      }) as { result: boolean };

      if(result){
        await this.$router.push({
          path: '/login',
        })
      } else {
        alert('가입 실패...');
        throw new Error();
      }
    }
    await this.home();
  }

  //----   유효성 검사   -----

  //이메일
  async emailCheck(){
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(regExp.test(this.email)){
      const { result } = await Vue.axios.post('/user/emailCheck',{email: this.email}) as { result: boolean};

      if(result){
        this.alertEmail = '사용가능한 이메일 입니다.';
      } else {
        this.alertEmail = '중복된 이메일 입니다.';
      }
    } else {
      this.alertEmail = '이메일 형식이 맞지 않습니다.';
      this.email = '';
      //this.$refs.email.focus();
    }
  }

  //비밀번호
  pwCheck1(){
    let pw1 = this.pw1;
    let regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!regExp.test(pw1)){
      this.alertPw1 = '하나 이상의 문자 및 특수문자가 포함되어야합니다.';
      this.pw1 = '';
    } else {
      this.alertPw1 = '사용가능한 비밀번호 입니다.';
    }
  }

  pwCheck2() {
    let pw1 = this.pw1;
    let pw2 = this.pw2;

    if(pw1 !== pw2){
      this.alertPw2 = '비밀번호가 일치하지 않습니다.';
    } else {
      this.alertPw2 = '비밀번호가 일치합니다.';
    }
  }



  //핸드폰
  async phoneCheck(){
    const regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if(!regExp.test(this.phone)){
      alert('전화번호 확인');
      this.phone = '';
    }
  }

  async home(){
    await this.$router.push({
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
/*----  경고 문구 -----*/
.alert_txt{
  text-align: right;
}

.alert_txt h5{
  color: gray;
  font-size: 12px;
}

#pw_check1 {
  position: relative;
  left: 10px;
}
#pw_check2 {
  position: relative;
  left: 90px;
}

#email_check{
  position: relative;
  right: 66px;
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
  border-radius: 5px;

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

#email_check,#pw_check1, #pw_check2{
  color: #d91515;
  font-size: 15px;
}


</style>