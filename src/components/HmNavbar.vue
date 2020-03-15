<template>
  <div class="hm-navbar">
    <div class="left">{{ title }}</div>
    <div class="center">{{ content }}</div>
    <div class="right">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true
    },
    content: String
  }
};
</script>

<style lang="less" scoped>
.hm-navbar {
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-left: 20px;
  padding: 0 20px;
  .left {
    flex: 1;
    font-size: 16px;
  }
  .center {
    flex: 1;
    text-align: right;
    padding-right: 20px;
    color: #999;
  }
  .right {
    width: 30px;
    color: #999;
  }
}
</style>
