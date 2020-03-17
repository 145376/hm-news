import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import User from '../pages/User.vue';
import Edit from '../pages/Edit.vue';

Vue.use(VueRouter);
let router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { name: 'login', path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/user', component: User },
    { path: '/edit', component: Edit }
  ]
});
//路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  let token = localStorage.getItem('token');
  // if (to.path == '/user') {
  //   if (token) {
  //     next();
  //   } else {
  //     next('/login');
  //   }
  // } else {
  //   next();
  // }
  if (to.path !== '/login' && !token) {
    next('/login');
  } else {
    next();
  }
});
export default router;
