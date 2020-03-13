import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/register", component: Register }
  ]
});
