<template>
  <div class="comment">
    <div class="header">
      <div class="left">
        <img :src="$axios.defaults.baseURL + comment.user.head_img" alt />
      </div>
      <div class="center">
        <div class="user">{{ comment.user.nickname }}</div>
        <div class="time">{{ comment.create_date | date2 }}</div>
      </div>
      <div class="right" @click="send(comment.id, comment.user.nickname)">
        回复
      </div>
    </div>
    <hm-floor
      :parent="comment.parent"
      v-if="comment.parent"
      :count="parentLength(0, comment)"
      @replyFloor="replyFloor"
    ></hm-floor>
    <div class="content">{{ comment.content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  },
  methods: {
    parentLength(num, obj) {
      if (obj.parent) {
        return this.parentLength(num + 1, obj.parent);
      } else {
        return num;
      }
    },
    send(id, nickname) {
      console.log(id, nickname);
      this.$emit('replyComment', id, nickname);
    },
    replyFloor(id, nickname) {
      console.log(id, nickname);
      this.$emit('replyComment', id, nickname);
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .left {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      margin-left: 10px;
      .user {
        font-size: 16px;
        margin-top: 5px;
      }
      .time {
        color: #999;
      }
    }
    .right {
      font-size: 14px;
      color: #666;
    }
  }
  .content {
    font-size: 16px;
    font-weight: 100;
    margin-top: 10px;
    word-break: break-all;
  }
}
</style>
