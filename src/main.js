import Vue from "vue";
import App from "./App.vue";
import "lib-flexible";
//引入样式
import "./style/base.less";
//引入字体图标
import "./style/iconfont.less";
//引入路由
import router from "./router/index";
//引入全局组件
import HmHeader from "./components/HmHeader.vue";
import HmLogo from "./components/HmLogo.vue";
import HmButton from "./components/HmButton.vue";
Vue.component("hm-header", HmHeader);
Vue.component("hm-logo", HmLogo);
Vue.component("hm-button", HmButton);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
