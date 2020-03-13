<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <div class="form-group">
      <input type="username" placeholder="手机号/用户名" />
    </div>
    <div class="form-group">
      <input type="password" placeholder="请输入密码" />
    </div>
    <hm-button>登录</hm-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
input[type="username"],
input[type="password"] {
  width: 90%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 0 20px;
  font-size: 16px;
  margin-bottom: 15px;
}
</style>
