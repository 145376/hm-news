<template>
  <div class="hm-datail" :class="isShow ? 'pb71' : 'pb120'">
    <div class="header">
      <div class="arrow" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="attention">
        <div
          class="attentioned"
          v-if="detail.has_follow"
          @click="unattention(detail.user.id)"
        >
          已关注
        </div>
        <div class="unattention" v-else @click="attentioned(detail.user.id)">
          关注
        </div>
      </div>
    </div>
    <div class="article">
      <div class="title">{{ detail.title }}</div>
      <div class="info">
        <span>{{ detail.user.nickname }}</span>
        <span>{{ detail.create_date | date }}</span>
      </div>
      <div v-html="detail.content" v-if="detail.type === 1"></div>
      <video :src="detail.content" controls autoplay muted v-else></video>
      <div class="btns">
        <div
          class="btn like"
          :class="{ color: detail.has_like }"
          @click="like(detail.id)"
        >
          <span class="iconfont icondianzan"></span>
          {{ detail.like_length || 0 }}
        </div>
        <div class="btn share">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <!-- 评论区 -->
    <div class="comments">
      <div class="title">精彩跟帖</div>
      <hm-comment
        v-for="item in comment"
        :key="item.id"
        :comment="item"
        @replyComment="replyComment"
      ></hm-comment>
    </div>
    <!-- 回复 -->
    <div class="replay">
      <div class="input" v-if="isShow">
        <input type="text" placeholder="写跟贴" @focus="showArea" />
        <span class="iconfont iconpinglun-">
          <div class="length">{{ detail.comment_length || 0 }}</div>
        </span>
        <span
          class="iconfont iconshoucang"
          :class="{ color: detail.has_star }"
          @click="collect(detail.id)"
        ></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
      <div class="textarea" v-else>
        <textarea
          @blur="showInput"
          ref="textarea"
          v-model="text"
          :placeholder="`回复: ${nickname}`"
        ></textarea>
        <div class="send" @click="addComment">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    await this.getDetail();
    await this.getComment();
  },
  methods: {
    //获取文章详情
    async getDetail() {
      let id = this.$route.params.id;
      let res = await this.$axios.get(`/post/${id}`);
      console.log(res.data);
      let { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.detail = data;
      }
    },
    //获取评论
    async getComment() {
      let res = await this.$axios.get(`/post_comment/${this.detail.id}`);
      let { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.comment = data;
        console.log(this.comment);
      }
    },
    //关注
    async attentioned(id) {
      let token = localStorage.getItem('token');
      if (!token) {
        this.$router.push({ name: 'login', params: { back: true } });
        this.$toast.fail('请先登录');
        return;
      }
      let res = await this.$axios.get(`/user_follows/${id}`);
      console.log(res.data);
      let { statusCode, message } = res.data;
      if (statusCode === 200) {
        this.$toast.success(message);
        this.detail.has_follow = true;
        // this.getDetail();
      }
    },
    //取消关注
    async unattention(id) {
      let token = localStorage.getItem('token');
      if (!token) {
        this.$router.push({ name: 'login', params: { back: true } });
        this.$toast.fail('请先登录');
        return;
      }
      let res = await this.$axios.get(`/user_unfollow/${id}`);
      console.log(res.data);
      let { statusCode, message } = res.data;
      if (statusCode === 200) {
        this.$toast.success(message);
        this.detail.has_follow = false;
      }
    },
    //点赞
    async like(id) {
      let token = localStorage.getItem('token');
      if (!token) {
        this.$router.push({ name: 'login', params: { back: true } });
        this.$toast.fail('请先登录');
        return;
      }
      let res = await this.$axios.get(`/post_like/${id}`);
      console.log(res.data);
      let { statusCode, message } = res.data;
      if (statusCode === 200) {
        this.$toast.success(message);
        this.getDetail();
      }
    },
    //收藏
    async collect(id) {
      let token = localStorage.getItem('token');
      if (!token) {
        this.$router.push({ name: 'login', params: { back: true } });
        this.$toast.fail('请先登录');
        return;
      }
      let res = await this.$axios.get(`/post_star/${id}`);
      console.log(res.data);
      let { statusCode, message } = res.data;
      if (statusCode === 200) {
        this.$toast.success(message);
        this.getDetail();
      }
    },
    //显示隐藏文本框
    async showArea() {
      this.isShow = false;
      await this.$nextTick();
      this.$refs.textarea.focus();
    },
    showInput() {
      if (!this.text) {
        this.isShow = true;
        this.nickname = '';
        this.userId = '';
      }
    },
    //接受子组件数据
    async replyComment(id, nickname) {
      console.log(id, nickname);
      this.userId = id;
      this.nickname = nickname;
      //显示textarea框
      this.isShow = false;
      await this.$nextTick();
      this.$refs.textarea.focus();
    },
    //发送评论
    async addComment() {
      let res = await this.$axios({
        url: `/post_comment/${this.detail.id}`,
        method: 'post',
        data: {
          content: this.text,
          parent_id: this.userId
        }
      });
      console.log(res);
      let { statusCode, message } = res.data;
      if (statusCode === 200) {
        this.$toast.success(message);
        //隐藏文本框
        this.text = '';
        this.isShow = true;
        this.getComment();
        this.getDetail();
      }
    }
  },
  data() {
    return {
      detail: {
        user: {}
      },
      isShow: true,
      comment: [],
      userId: '',
      text: '',
      nickname: ''
    };
  }
};
</script>

<style lang="less" scoped>
.pb120 {
  padding-bottom: 120px;
}
.pb71 {
  padding-bottom: 71px;
}
.header {
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
  .arrow {
    width: 30px;
    color: #666;
    font-size: 20px;
  }
  .logo {
    height: 50px;
    line-height: 50px;
    flex: 1;
    text-align: left;
    span {
      height: 50px;
      line-height: 50px;
      font-size: 50px;
    }
  }
  .attentioned {
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    padding: 0 15px;
    font-size: 14px;
    background-color: #ff0000;
  }
  .unattention {
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #333;
    border-radius: 15px;
    padding: 0 15px;
    font-size: 14px;
  }
}
.article {
  padding: 0 10px 20px 10px;
  border-bottom: 3px solid #999;
  margin-bottom: 10px;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  video {
    width: 300px;
    height: 150px;
  }
  .info {
    color: #999;
    font-size: 14px;
    span {
      &:last-child {
        margin-left: 10px;
      }
    }
  }
  .btns {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    .btn {
      height: 30px;
      line-height: 30px;
      width: 100px;
      border: 1px solid #333;
      border-radius: 15px;
      padding: 0 15px;
      font-size: 18px;
      text-align: center;
      .iconfont {
        font-size: 24px;
      }
      &.share {
        span {
          &:first-child {
            color: green;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
.comments {
  padding: 0 10px;
  .title {
    font-size: 18px;
    text-align: center;
  }
}
.replay {
  width: 100%;
  padding: 20px 20px;
  border-top: 1px solid #333;
  margin-top: 20px;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background-color: #fff;
  .input {
    display: flex;
    justify-content: space-between;
    input {
      width: 180px;
      height: 30px;
      background-color: #ddd;
      border-radius: 15px;
      border: none;
      outline-style: none;
      padding-left: 20px;
    }
    span {
      font-size: 24px;
    }
    .iconpinglun- {
      position: relative;
      .length {
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 7px;
        padding: 0 5px;
        background-color: red;
        font-size: 12px;
        position: absolute;
        top: -8px;
        left: 8px;
      }
    }
  }
  .textarea {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    textarea {
      width: 240px;
      height: 80px;
      background-color: #ddd;
      border-radius: 5px;
      border: none;
      outline-style: none;
    }
    .send {
      flex: 1;
      text-align: left;
      margin-left: 15px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      padding: 0 15px;
      background-color: red;
      text-align: center;
    }
  }
}
/deep/ img {
  width: 300px;
  height: 210px;
  object-fit: cover;
  display: block;
}
.color {
  color: red;
}
</style>
