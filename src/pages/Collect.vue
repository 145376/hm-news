<template>
  <div class="hm-collect">
    <hm-header>我的收藏</hm-header>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      finished-text="没有更多了"
      offset="50"
      :immediate-check="false"
    >
      <hm-article v-for="item in list" :key="item.id" :post="item"></hm-article>
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
      let res = await this.$axios.get(`/user_star`, {
        params: {
          pagesize: this.pagesize,
          pageIndex: this.pageIndex
        }
      });
      let { statusCode, data } = res.data;
      if (statusCode === 200) {
        data.forEach(v => {
          v.comment_length = v.comments.length;
        });
        this.list = [...this.list, ...data];
        this.loading = false;
        if (data.length < this.pagesize) {
          this.finished = true;
        }
        console.log(this.list);
      }
    },
    onLoad() {
      setTimeout(() => {
        this.pageIndex++;
        this.getInfo();
      }, 1000);
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pagesize: 8
    };
  }
};
</script>

<style lang="less" scoped></style>
