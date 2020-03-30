import Vue from 'vue';
import App from './App.vue';
import 'lib-flexible';
import axios from 'axios';
import moment from 'moment';
//引入样式
import './style/base.less';
//引入字体图标
import './style/iconfont.less';
//引入路由
import router from './router/index';
//引入全局组件
import HmHeader from './components/HmHeader.vue';
import HmLogo from './components/HmLogo.vue';
import HmButton from './components/HmButton.vue';
import HmInput from './components/HmInput.vue';
import HmNavbar from './components/HmNavbar.vue';
import HmArticle from './components/HmArticle.vue';
import HmComment from './components/HmComment.vue';
import HmFloor from './components/HmFloor.vue';
Vue.component('hm-header', HmHeader);
Vue.component('hm-logo', HmLogo);
Vue.component('hm-button', HmButton);
Vue.component('hm-input', HmInput);
Vue.component('hm-navbar', HmNavbar);
Vue.component('hm-article', HmArticle);
Vue.component('hm-comment', HmComment);
Vue.component('hm-floor', HmFloor);

//引入vant-ui组件
import { Toast } from 'vant';
import { Dialog } from 'vant';
import { Field } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Uploader } from 'vant';
import { Button } from 'vant';
import { List } from 'vant';
import { Tab, Tabs } from 'vant';
import { PullRefresh } from 'vant';
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Field);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Uploader);
Vue.use(Button);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(PullRefresh);

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:3000';
Vue.prototype.$axios = axios;
//请求拦截器
axios.interceptors.request.use(config => {
  // console.log(config);
  let token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
//响应拦截器
axios.interceptors.response.use(res => {
  // console.log(res);
  if (res.data.statusCode === 401 && res.data.message === '用户信息验证失败') {
    router.push('/login');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
  return res;
});

//全局过滤器
Vue.filter('date', (input, format = 'YYYY-MM-DD') => {
  return moment().format(format);
});
Vue.filter('date2', input => {
  let price = Date.now() - new Date(input);
  let h = (price / 1000 / 60 / 60) | 0;
  if (h < 1) {
    return '刚刚';
  } else if (h < 24) {
    return `${h}小时前`;
  } else {
    return moment(input).format('YYYY-MM-DD HH:mm:ss');
  }
});

let vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
