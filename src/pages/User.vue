<template>
  <div class="hm-user">
    <hm-header>我的中心</hm-header>
    <div class="info" @click="$router.push('/edit')">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      </div>
      <div class="center">
        <div class="name">
          <span
            class="iconfont"
            :class="{
              iconxingbienan: info.gender === 1,
              iconxingbienv: info.gender === 0
            }"
          ></span>
          {{ info.nickname }}
        </div>
        <div class="date">{{ info.create_date | date }}</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar title="我的关注" content="关注的用户"></hm-navbar>
    <hm-navbar title="我的跟贴" content="跟帖回复"></hm-navbar>
    <hm-navbar title="我的收藏" content="文章/视频"></hm-navbar>
    <hm-navbar title="设置" @click="$router.push('/edit')"></hm-navbar>
    <hm-navbar title="退出" @click="logout"></hm-navbar>
  </div>
</template>

<script>
export default {
  created() {
    let id = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    // console.log(id, token);
    this.$axios({
      url: `/user/${id}`,
      method: 'get',
      headers: {
        Authorization: token
      }
    }).then(res => {
      // console.log(res);
      const { statusCode, message, data } = res.data;
      if (statusCode === 200) {
        this.info = data;
        // console.log(this.info);
      }
    });
  },
  data() {
    return {
      info: {}
    };
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '是否要退出'
        })
        .then(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          this.$router.push('/login');
          this.$toast('退出成功');
        })
        .catch(() => {
          this.$toast('取消退出');
        });
    }
  }
};
</script>

<style lang="less" scoped>
.hm-user {
  .info {
    height: 80px;
    display: flex;
    padding: 0 20px;
    align-items: center;
    border-bottom: 3px solid #ccc;
    .left {
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: block;
      }
    }
    .center {
      flex: 1;
      padding-left: 20px;
      .name {
        font-size: 16px;
        font-weight: 700;
      }
      .date {
        font-size: 14px;
        color: #999;
      }
      span {
        color: skyblue;
      }
    }
    .right {
      width: 30px;
      span {
        color: #999;
        font-size: 16px;
      }
    }
  }
}
</style>
