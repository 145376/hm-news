import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import User from '../pages/User.vue';
import Edit from '../pages/Edit.vue';
import Attention from '../pages/Attention.vue';
import Comment from '../pages/Comment.vue';
import Collect from '../pages/Collect.vue';
import Home from '../pages/Home.vue';
import Detail from '../pages/Detail.vue';
import Manage from '../pages/Manage.vue';
import Search from '../pages/Search.vue';
import aaa from '../pages/aaa.vue';

Vue.use(VueRouter);

//解决重复导航
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

let router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { name: 'login', path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/user', component: User },
    { path: '/edit', component: Edit },
    { path: '/attention', component: Attention },
    { path: '/comment', component: Comment },
    { path: '/collect', component: Collect },
    { path: '/home', component: Home },
    { path: '/aaa', component: aaa },
    { path: '/detail/:id', component: Detail },
    { path: '/manage', component: Manage },
    { path: '/search', component: Search }
  ]
});
//路由守卫
let permit = ['/user', '/edit', '/attention', '/collect'];
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (permit.includes(to.path)) {
    if (token) {
      next();
    } else {
      router.push('/login');
    }
  } else {
    next();
  }
});
export default router;
