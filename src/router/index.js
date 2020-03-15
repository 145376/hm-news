import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import User from '../pages/User.vue';

Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { name: 'login', path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/user', component: User }
  ]
});
