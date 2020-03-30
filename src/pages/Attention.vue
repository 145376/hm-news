<template>
  <div class="hm-attention">
    <hm-header>我的关注</hm-header>
    <div class="list" v-for="item in list" :key="item.id">
      <div class="left">
        <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
      </div>
      <div class="middle">
        <div class="user">{{ item.nickname }}</div>
        <div class="time">
          {{ item.create_date }}
        </div>
      </div>
      <div class="right" @click="unattention(item.id)">
        取消关注
      </div>
    </div>
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
        url: `/user_follows`
      });
      let { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.list = data;
        console.log(this.list);
      }
    },
    async unattention(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '是否取关该用户'
        });
        let res = await this.$axios({
          url: `/user_unfollow/${id}`,
          data: id
        });
        console.log(res.data);
        let { statusCode } = res.data;
        if (statusCode === 200) {
          this.getInfo();
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  data() {
    return {
      list: []
    };
  }
};
</script>

<style lang="less" scoped>
.hm-attention {
  .list {
    padding: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .middle {
      flex: 1;
      text-align: left;
      padding-left: 15px;
      .user {
        font-size: 18px;
      }
      .time {
        color: #666;
      }
    }
    .right {
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      background-color: #999;
      border-radius: 15px;
      color: #333;
    }
  }
}
</style>
