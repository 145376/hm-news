<template>
  <div class="hm-comment">
    <hm-header>我的评论</hm-header>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      loading-text="正在加载"
      :immediate-check="false"
      @load="onLoad"
      offset="50"
    >
      <div class="list" v-for="item in list" :key="item.id">
        <div class="time">
          {{ item.create_date | date('YYYY-MM-DD HH:mm') }}
        </div>
        <div class="father" v-if="item.parent">
          <div class="user">回复: {{ item.parent.user.nickname }}</div>
          <div class="quest">{{ item.parent.content }}</div>
        </div>
        <div class="content">{{ item.content }}</div>
        <div class="origin" @click="$router.push(`/post/${item.id}`)">
          <p class="cuttext">原文：{{ item.post.title }}</p>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      let res = await this.$axios({
        url: `/user_comments`,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });
      let { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.list = [...this.list, ...data];
        if (data.length < this.pageSize) {
          this.finished = true;
        }
      }
    },
    onLoad() {
      setTimeout(() => {
        this.pageIndex++;
        this.getInfo();
        this.loading = false;
      }, 2000);
    }
  },
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      finished: false
    };
  }
};
</script>

<style lang="less" scoped>
.hm-comment {
  .list {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .time {
      color: #666;
      font-size: 12px;
      margin-bottom: 10px;
    }
    .father {
      padding: 15px;
      background-color: #ccc;
      color: #666;
      font-size: 14px;
      margin-bottom: 10px;
      .user {
        margin-bottom: 10px;
      }
    }
    .content {
      font-size: 14px;
      margin-bottom: 15px;
    }
    .origin {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #999;
      p {
        flex: 1;
      }
      span {
        width: 25px;
        text-align: right;
      }
    }
  }
}
</style>
