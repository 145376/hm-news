<template>
  <div class="hm-home">
    <div class="header">
      <div class="left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="middle" @click="$router.push('/search')">
        <div class="search">
          <i class="iconfont iconsearch"></i>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="right" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-tabs v-model="active">
      <van-tab
        :title="tab.name"
        v-for="tab in tabList"
        :key="tab.id"
        animated
        swipeable
        sticky
      >
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            finished-text="没有更多了"
            offset="50"
            :immediate-check="false"
          >
            <hm-article
              v-for="post in postList"
              :key="post.id"
              :post="post"
            ></hm-article>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      active: 0,
      tabList: [],
      postList: [],
      pageSize: 10,
      pageIndex: 1,
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  async created() {
    let active = JSON.parse(localStorage.getItem('active'));
    if (active) {
      this.tabList = active;
      this.getPost(this.tabList[this.active].id);
      return;
    }
    let resTab = await this.$axios.get('/category');
    let { statusCode, data } = resTab.data;
    if (statusCode === 200) {
      this.tabList = data;
      // console.log(this.tabList);
      this.getPost(this.tabList[this.active].id);
    }
  },
  methods: {
    async getPost(id) {
      // console.log(id);
      let resPost = await this.$axios.get('/post', {
        params: {
          category: id,
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        }
      });
      // console.log(resPost.data);
      if (this.postList.length > 0 && this.pageIndex === 1) {
        return (this.postList = []);
      }
      let { statusCode, data } = resPost.data;
      if (statusCode === 200) {
        this.postList = [...this.postList, ...data];
        this.loading = false;
        this.refreshing = false;
        if (data.length < 10) {
          this.finished = true;
        }
        // console.log(this.postList);
      }
    },
    onLoad() {
      // console.log('onload');
      setTimeout(() => {
        this.pageIndex++;
        // console.log(this.pageIndex);
        this.getPost(this.tabList[this.active].id);
      }, 1000);
    },
    onRefresh() {
      this.postList = [];
      this.pageIndex = 1;
      this.finished = false;
      this.loading = true;
      setTimeout(() => {
        let id = this.tabList[this.active].id;
        this.getPost(id);
      }, 1000);
    }
  },
  watch: {
    active(value) {
      console.log(value);
      this.pageIndex = 1;
      this.postList = [];
      // this.loading = true;
      this.finished = false;
      setTimeout(() => {
        this.getPost(this.tabList[value].id);
      }, 1000);
    }
  },
  destroyed() {
    console.log('组件销毁了');
  },
  beforeRouteLeave(to, from, next) {
    console.log('离开了');
    console.log(to);
    if (to.path !== 'detail') {
      console.log(1);
      this.$store.commit('uncache', 'home');
    }
    next();
  }
};
</script>

<style lang="less" scoped>
.hm-home {
  padding-top: 50px;
}
.header {
  width: 100%;
  background-color: red;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  color: #fff;
  position: fixed;
  top: 0;
  z-index: 999;
  .left {
    width: 60px;
    height: 50px;
    line-height: 50px;
    span {
      font-size: 55px;
    }
  }
  .middle {
    flex: 1;
    text-align: center;
    font-size: 16px;
    .search {
      // width: 80%;
      height: 35px;
      line-height: 33px;
      border: 1px solid #fff;
      border-radius: 25px;
      background-color: rgba(255, 255, 255, 0.5);
    }
    i {
      font-size: 20px;
      margin-right: 5px;
    }
  }
  .right {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    span {
      font-size: 25px;
    }
  }
}
/deep/ .van-tabs__nav {
  background-color: #ccc;
}
</style>
