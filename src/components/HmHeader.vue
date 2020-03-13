<template>
  <div class="hm-header">
    <div class="left" @click="$router.back()">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="middle">
      <slot></slot>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.hm-header {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  display: flex;
  text-align: center;
  padding: 0 10px;
  .left {
    width: 30px;
  }
  .middle {
    flex: 1;
    font-size: 18px;
    font-weight: 700;
  }
  .right {
    width: 30px;
  }
}
</style>
