<template>
  <div class="container">
    <hm-floor
      v-if="parent.parent"
      :parent="parent.parent"
      :count="count - 1"
      @replyFloor="send"
    ></hm-floor>
    <div class="hm-floor">
      <div class="header">
        <div class="left">
          <span class="floor">{{ count }}楼</span>
          <span class="user">{{ parent.user.nickname }}</span>
          <span class="time">{{ parent.create_date | date2 }}</span>
        </div>
        <div class="right" @click="send(parent.id, parent.user.nickname)">
          回复
        </div>
      </div>
      <div class="content">{{ parent.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    parent: Object,
    count: Number
  },
  name: 'hm-floor',
  methods: {
    send(id, nickname) {
      console.log(id, nickname);
      this.$emit('replyFloor', id, nickname);
    }
  }
};
</script>

<style lang="less" scoped>
.hm-floor {
  padding: 20px;
  background-color: #ddd;
  border: 1px solid #999;
  .header {
    display: flex;
    justify-content: space-between;
    .left {
      text-align: left;
      margin-bottom: 10px;
      font-size: 14px;
      .user {
        margin: 0 10px;
      }
      .time {
        color: #666;
        font-size: 12px;
      }
    }
  }
}
</style>
