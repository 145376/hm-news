<template>
  <div class="hm-button">
    <div class="btn" @click="login">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$emit('login');
    }
  }
};
</script>

<style lang="less" scoped>
.hm-button {
  margin: 20px;
  text-align: center;
  .btn {
    height: 50px;
    line-height: 50px;
    background-color: red;
    font-size: 18px;
    color: #fff;
    border-radius: 25px;
  }
}
</style>
