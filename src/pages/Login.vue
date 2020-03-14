<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <hm-input
      type="text"
      placeholder="用户名/手机号"
      v-model="username"
      :rules="/^1\d{4,10}$/"
      msg="格式错误"
    ></hm-input>
    <hm-input
      type="password"
      placeholder="密码"
      v-model="password"
      :rules="/^\d{3,}$/"
      msg="格式错误"
    ></hm-input>
    <hm-button @login="login">登录</hm-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      this.$axios({
        url: '/login',
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        if (res.data.statusCode === 200) {
          this.$router.push('/user');
        } else {
          alert(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
