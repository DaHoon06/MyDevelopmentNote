import LoginComponent from "@/components/LoginComponent.vue";
import { mount } from "@vue/test-utils";

describe("LoginComponent", () => {
  it("아이디가 존재한다면 로그인 성공", () => {
    const wrapper = mount(LoginComponent);
    console.log(wrapper)
  });
});
