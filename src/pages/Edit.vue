<template>
  <div class="hm-edit">
    <hm-header>编辑资料</hm-header>
    <div class="avator">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
    </div>
    <hm-navbar
      title="昵称"
      :content="info.nickname"
      @click="showNicknameDialog"
    ></hm-navbar>
    <hm-navbar title="密码" content="******" @click="showPwsDialog"></hm-navbar>
    <hm-navbar
      title="性别"
      :content="info.gender === 1 ? '男' : '女'"
      @click="showGenderDialog"
    ></hm-navbar>
    <!-- 修改昵称 -->
    <van-dialog
      v-model="showNickname"
      title="修改昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>
    <!-- 修改密码 -->
    <van-dialog
      v-model="showPws"
      title="修改密码"
      show-cancel-button
      @confirm="editPws"
    >
      <van-field type="password" v-model="pws" placeholder="请输入密码" />
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog
      v-model="showGender"
      title="修改性别"
      show-cancel-button
      @confirm="editGender"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <!-- 修改头像 -->
    <van-uploader :after-read="afterRead" />
  </div>
</template>

<script>
export default {
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let id = localStorage.getItem('userId');
      let token = localStorage.getItem('token');
      this.$axios({
        url: `/user/${id}`,
        method: 'get'
      }).then(res => {
        let { statusCode, data } = res.data;
        if (statusCode === 200) {
          this.info = data;
          console.log(this.info);
        }
      });
    },
    axiosEdit(data) {
      let id = localStorage.getItem('userId');
      this.$axios({
        url: `/user_update/${id}`,
        method: 'post',
        data
      }).then(res => {
        console.log(res);
        let { statusCode } = res.data;
        if (statusCode === 200) {
          this.getInfo();
        }
      });
    },
    showNicknameDialog() {
      this.showNickname = true;
      this.nickname = this.info.nickname;
    },
    editNickname() {
      this.axiosEdit({
        nickname: this.nickname
      });
    },
    showPwsDialog() {
      this.showPws = true;
      this.pws = this.info.password;
    },
    editPws() {
      this.axiosEdit({
        password: this.pws
      });
    },
    showGenderDialog() {
      this.showGender = true;
      this.gender = this.info.gender;
    },
    editGender() {
      this.axiosEdit({
        gender: this.gender
      });
    },
    afterRead(file) {
      // console.log(file.file);
      let fd = new FormData();
      fd.append('file', file.file);
      this.$axios({
        url: '/upload',
        method: 'post',
        data: fd
      }).then(res => {
        // console.log(res);
        let { statusCode, data } = res.data;
        if (statusCode === 200) {
          this.axiosEdit({
            head_img: data.url
          });
        }
      });
    }
  },
  data() {
    return {
      info: {},
      showNickname: false,
      nickname: '',
      showPws: false,
      pws: '********',
      showGender: false,
      gender: 1
    };
  }
};
</script>

<style lang="less" scoped>
.hm-edit {
  .avator {
    width: 70px;
    height: 70px;
    margin: 10px auto;
    display: block;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .van-dialog {
    padding: 0 10px;
    .van-field {
      border: 1px solid #ccc;
      margin: 10px 0;
    }
  }
  .van-uploader {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
}
</style>
