<template>
  <div class="hm-article" @click="$router.push(`/detail/${post.id}`)">
    <!-- 视频结构 -->
    <div class="video" v-if="post.type === 2">
      <div class="title">
        {{ post.title }}
      </div>
      <div class="model">
        <img :src="img(post.cover[0].url)" alt="" />
        <div class="play">
          <span class="iconfont iconshipin"></span>
        </div>
      </div>
      <div class="info">
        <div class="user">{{ post.user.nickname }}</div>
        <div class="comment">{{ post.comment_length }}跟帖</div>
      </div>
    </div>
    <!-- 单张图片结构 -->
    <div class="single" v-else-if="post.cover.length < 3">
      <div class="left">
        <div class="title">
          {{ post.title }}
        </div>
        <div class="info">
          <div class="user">
            {{ post.user.nickname }}
          </div>
          <div class="comments">{{ post.comment_length }}跟帖</div>
        </div>
      </div>
      <img :src="img(post.cover[0].url)" alt="" />
    </div>
    <!-- 多图片结构 -->
    <div class="multiple" v-else>
      <div class="title">
        {{ post.title }}
      </div>
      <div class="imgs">
        <img :src="img(post.cover[0].url)" alt="" />
        <img :src="img(post.cover[0].url)" alt="" />
        <img :src="img(post.cover[0].url)" alt="" />
      </div>
      <div class="info">
        <div class="user">{{ post.user.nickname }}</div>
        <div class="comment">{{ post.comment_length }}跟帖</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    }
  },
  methods: {
    img(url) {
      if (url.startsWith('http')) {
        return url;
      } else {
        return this.$axios.defaults.baseURL + url;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.single {
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  .left {
    flex: 1;
    .title {
      height: 40px;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .info {
      display: flex;
      color: #666;
      .user {
        margin-right: 10px;
      }
    }
  }
  img {
    width: 127px;
    height: 70px;
    object-fit: cover;
  }
}
.multiple {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title {
    font-size: 12px;
  }
  .imgs {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    img {
      width: 110px;
      height: 70px;
      display: block;
      object-fit: cover;
    }
  }
  .info {
    display: flex;
    color: #666;
    .user {
      margin-right: 10px;
    }
  }
}
.video {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title {
    font-size: 14px;
  }
  .model {
    position: relative;
    padding: 10px 0;
    img {
      width: 340px;
      height: 170px;
      display: block;
      object-fit: cover;
    }
    .play {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.5);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 60px;
      span {
        font-size: 35px;
        color: #fff;
      }
    }
  }
  .info {
    display: flex;
    color: #666;
    .user {
      margin-right: 10px;
    }
  }
}
</style>
