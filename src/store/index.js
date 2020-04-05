import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    keepList: []
  },
  mutations: {
    //一进入首页就缓存组件
    cache(state, name) {
      if (!state.keepList.includes(name)) {
        state.keepList.push(name);
        console.log('缓存组件', state.keepList);
      }
    },
    //清除缓存
    uncache(state, name) {
      if (state.keepList.includes(name)) {
        //删除组件缓存
        state.keepList = state.keepList.filter(v => v !== name);
        console.log('清楚缓存', state.keepList);
      }
    }
  }
});

export default store;
