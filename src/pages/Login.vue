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
      ref="username"
    ></hm-input>
    <hm-input
      type="password"
      placeholder="密码"
      v-model="password"
      :rules="/^\d{3,}$/"
      msg="格式错误"
      ref="password"
    ></hm-input>
    <hm-button @clickFn="clickFn">登录</hm-button>
    <div class="go-register">
      还没账号?去<router-link to="/register">注册</router-link>
    </div>
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
    clickFn() {
      let res1 = this.$refs.username.checkout(this.username);
      let res2 = this.$refs.password.checkout(this.password);
      // console.log(res1, res2);
      if (!res1 || !res2) return;
      this.$axios({
        url: '/login',
        method: 'post',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        console.log(res);
        const { statusCode, message, data } = res.data;
        if (statusCode === 200) {
          let userId = data.user.id;
          let token = data.token;
          localStorage.setItem('userId', userId);
          localStorage.setItem('token', token);
          this.$toast.success(message);
          this.$router.push('/user');
        } else {
          this.$toast.fail(message);
        }
      });
    }
  },
  created() {
    this.username = this.$route.params.username;
    this.password = this.$route.params.password;
  }
};
</script>

<style lang="less" scoped>
.go-register {
  font-size: 14px;
  text-align: right;
  padding-right: 20px;
}
</style>
