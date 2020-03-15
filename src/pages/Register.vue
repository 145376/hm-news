<template>
  <div class="register">
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <hm-input
      type="text"
      placeholder="用户名/手机号"
      v-model="username"
      :rules="/^1\d{4,10}$/"
      msg="输入格式错误"
      ref="username"
    ></hm-input>
    <hm-input
      type="text"
      placeholder="昵称"
      v-model="nickname"
      :rules="/^[\u4e00-\u9fa5]{3,7}$/"
      msg="输入格式错误"
      ref="nickname"
    ></hm-input>
    <hm-input
      type="password"
      placeholder="密码"
      v-model="password"
      :rules="/^\d{3,}$/"
      msg="输入格式有误"
      ref="password"
    ></hm-input>
    <hm-button @clickFn="clickFn">注册</hm-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: ''
    };
  },
  methods: {
    clickFn() {
      let res1 = this.$refs.username.checkout(this.username);
      let res2 = this.$refs.nickname.checkout(this.nickname);
      let res3 = this.$refs.password.checkout(this.password);
      if (!res1 || !res2 || !res3) return;
      this.$axios({
        url: '/register',
        method: 'post',
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        }
      }).then(res => {
        console.log(res);
        if (res.data.statusCode === 200) {
          this.$toast.success(res.data.message);
          this.$router.push({
            name: 'login',
            params: {
              username: this.username,
              password: this.password
            }
          });
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
