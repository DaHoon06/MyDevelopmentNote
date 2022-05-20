import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store/index";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/doChat",
  },
  {
    path: "/doChat",
    name: "index",
    component: () => import("@/views/Home.vue"),
    meta: { unauthorized: true },
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/views/chat/Chat.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  try {
    const { meta } = to;
    const { unauthorized } = meta || { unauthorized: true };
    if (unauthorized) return next();

    const token = store.getters["userStore/token"];
    const verified = await store.dispatch("userStore/verify", { token });

    if (verified) return next();
    else return next("/401");
  } catch (e) {
    return next("/401");
  }
});

export default router;
