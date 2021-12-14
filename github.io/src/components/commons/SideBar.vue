<template>
<div>
  <!-- WEB -->
  <div id="navBar_web">
    <div>
      <b-navbar toggleable type="dark">
        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-navbar-brand href="/">HOME</b-navbar-brand>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <router-link to="/node">NodeJS</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/nest">NestJS</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/vue">VueJS</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <div class="side_wrapper">

      <section id="profile_section">
        <div class="profile">
          <b-avatar src="data:image/jpeg;base64,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" size="12rem" ></b-avatar>
        </div>
      </section>

      <nav>
        <div class="menu">
          <ul>
            <li>
              <a href="https://github.com/DaHoon06">
                <p>
                  <img class="git" src="https://key0.cc/images/small/1624_ff0201a47d8da7e9de462d6de33561f3.png" />
                  DaHoon06
                </p>
              </a>
            </li>
            <li>
              <a href="https://june-17.tistory.com/">
                <p>
                  <img class="t-story" src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/5a539919017800001.png" />
                  june-17
                </p>
              </a>
            </li>
            <li>
              <p>
                <img class="mail" src="https://cdn.pixabay.com/photo/2013/04/01/21/31/mail-99217_640.png" />
                dahoon226@naver.com
              </p>
            </li>
          </ul>
        </div>

        <div id="desc">
          GitHub Blog
        </div>

      </nav>
    </div>
  </div>

<!-------------     MOBILE    ------------------>
  <div id="navBar_mobile">
    <div id="m_navBar">
      <b-navbar toggleable type="dark">
        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-navbar-brand href="/">HOME</b-navbar-brand>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item class="nav_item_m">
              <router-link class="nav_link_m" to="/node">NodeJS</router-link>
            </b-nav-item>
            <b-nav-item class="nav_item_m">
              <router-link class="nav_link_m" to="/nest">NestJS</router-link>
            </b-nav-item>
            <b-nav-item class="nav_item_m">
              <router-link class="nav_link_m" to="/vue">VueJS</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <nav id="m_profile">

      <div id="profile_img_m">
        <section id="profile_section_m">
          <div class="profile">
            <b-avatar src="data:image/jpeg;base64,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" size="12rem" ></b-avatar>
          </div>
        </section>
      </div>

    </nav>

    <nav id="myInfo">
        <div class="menu">
          <ul>
            <li>
              <a href="https://github.com/DaHoon06">
                <p>
                  <img class="git" src="https://key0.cc/images/small/1624_ff0201a47d8da7e9de462d6de33561f3.png" />
                  DaHoon06
                </p>
              </a>
            </li>
            <li>
              <a href="https://june-17.tistory.com/">
                <p>
                  <img class="t-story" src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/5a539919017800001.png" />
                  june-17
                </p>
              </a>
            </li>
            <li>
              <p>
                <img class="mail" src="https://cdn.pixabay.com/photo/2013/04/01/21/31/mail-99217_640.png" />
                dahoon226@naver.com
              </p>
            </li>
          </ul>
        </div>
    </nav>

  </div>

</div>
</template>

<script lang="ts">
import { Component,Vue } from "vue-property-decorator";

@Component
export default class SideBar extends Vue{
  value: string;
  context: string;
  hideHeader: boolean;

  constructor() {
    super();

    this.value = '';
    this.context = '';
    this.hideHeader = true;
  }

  async onContext(ctx: any) {
    this.context = ctx
    console.log()
  }




}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #ffffff;
}

a:hover {
  color: #bebebf;
}

#navBar_web {
  width: 300px;
  min-height: 100%;
  background: #0e0e59;
  border-radius: 0 10px 10px 0;
  color: #ffffff;
  position: fixed;
}

#navBar_mobile{
  display: none;
}

.side_wrapper {
  border-top: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
  border-radius: 0 10px 10px 0;
  width: 290px;
  margin-top: 5px;
  min-height: 850px;
}

.profile{
  margin-top: 50px;
  margin-left: 50px;
}

.git {
  background: none;
  outline: none;
  border: none;
  width: 30px;
}

.menu ul{
  list-style: none;
}

.menu ul li {
  padding: 5px;
}

.t-story {
  background: none;
  outline: none;
  border: none;
  width: 30px;
  border-radius: 8px;
}

.mail {
  background: none;
  outline: none;
  border: none;
  width: 30px;
  border-radius: 30px;
}

#profile_section {
  margin-bottom: 50px;
}

#myInfo {
  width: 100%;
  background: #0e0e59;
  color: #ffffff;
}

#desc {
  border: 1px solid #ffffff;
  background: #fff3e0;
  border-radius: 5px;
  width: 90%;
  height: 200px;
  margin: auto;
  color: black;
  padding: 10px;
  line-height: normal;
}

@media screen and (max-width: 1279px){
  a {
    text-decoration: none;
    color: #ffffff;
  }

  a:hover {
    color: #ffffff;
  }

  #navBar_web{
    display: none;
  }

  #navBar_mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #m_navBar {
    width: 100%;
    background: #0e0e59;
    color: #ffffff;
  }

  #m_profile {
    text-align: center;
    width: 100%;
    display: block;
    background: #f2f2f37d;
  }

  .nav_link_m {
    color: #ffffff;
  }

  .nav_item_m:hover{
    background: #ffffff;
  }

  .nav_item_m:hover > .nav_link_m {
    color: black;
  }

  .profile{
    margin: 30px auto 30px;
  }

  .side_wrapper {
    border: none;
    border-radius: 0;
  }

  .menu ul li {
    margin-top: 10px;
    padding: 0;
  }


}

/* 테블릿 */
@media screen and (max-width: 1023px) {
  a {
    text-decoration: none;
    color: #ffffff;
  }

  a:hover {
    color: #0f0f57;
  }
  #navBar_web{
    display: none;
  }
  #navBar_mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #m_navBar {
    width: 100%;
    background: #0e0e59;
    color: #ffffff;
  }

  #m_profile {
    text-align: center;
    width: 100%;
    display: block;
    background: #f2f2f37d;
  }

  .nav_link_m {
    color: #ffffff;
  }

  .profile{
    margin: 30px auto 30px;
  }

  .side_wrapper {
    border: none;
    border-radius: 0;
  }

}

/* 모바일 */
@media screen and (max-width: 767px) {
  a {
    text-decoration: none;
    color: #ffffff;
  }

  a:hover {
    color: #0f0f57;
  }
  #navBar_web{
    display: none;
  }

  #navBar_mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #m_navBar {
    width: 100%;
    background: #0e0e59;
    color: #ffffff;
  }

  #m_profile {
    text-align: center;
    width: 100%;
    display: block;
    background: #f2f2f37d;
  }

  .nav_link_m {
    color: #ffffff;
  }

  .nav_link_m:hover {
    background: #ffffff;
  }

  .profile{
    margin: 30px auto 30px;
  }

  .side_wrapper {
    border: none;
    border-radius: 0;
  }


}

</style>