<template>
  <div class="hm-search">
    <div class="header">
      <div class="left" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconsearch"></span>
        <input
          type="text"
          placeholder="请输入搜索关键字"
          v-model="keyword"
          @input="commend_search"
        />
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <!-- 文章详情 -->
    <div class="post" v-if="postList.length > 0">
      <hm-article
        v-for="item in postList"
        :key="item.id"
        :post="item"
      ></hm-article>
    </div>
    <!-- 搜索推荐 -->
    <div class="recommend" v-if="recommend.length > 0">
      <div
        class="item"
        v-for="item in recommend"
        :key="item.id"
        @click="recommendpost(item.title)"
      >
        <div class="left cuttext">{{ item.title }}</div>
        <div class="right">
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </div>
    <!-- 历史记录 -->
    <div class="history" v-if="history.length > 0">
      <div class="title">历史记录</div>
      <div class="content">
        <div
          class="item"
          v-for="(item, index) in history"
          :key="index"
          @click="history_search(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <!-- 热门推荐 -->
    <div class="hot">
      <div class="title">热门推荐</div>
      <div class="content">
        <div class="item" v-for="(item, index) in hotList" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  created() {
    let history = JSON.parse(localStorage.getItem('history'));
    if (history) {
      this.history = history;
    } else {
    }
  },
  data() {
    return {
      keyword: '',
      postList: [],
      history: [],
      hotList: ['美女', '军事', '疫情', '肺炎', '经济', '文学'],
      recommend: []
    };
  },
  methods: {
    async search() {
      console.log(1);
      this.history = this.history.filter(v => v !== this.keyword);
      this.history.unshift(this.keyword);
      localStorage.setItem('history', JSON.stringify(this.history));
      let res = await this.$axios.get(`/post_search`, {
        params: {
          keyword: this.keyword
        }
      });
      let { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.postList = data;
        console.log(this.postList);
        this.recommend = [];
      }
    },
    async history_search(keyword) {
      this.keyword = keyword;
      this.search();
    },
    commend_search: _.debounce(async function() {
      if (!this.keyword) return;
      console.log(1);
      let res = await this.$axios.get(`/post_search_recommend`, {
        params: {
          keyword: this.keyword
        }
      });
      let { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.recommend = data;
        console.log(this.recommend);
      }
    }, 500),
    async recommendpost(keyword) {
      this.keyword = keyword;
      this.search();
      this.recommend = [];
    },
    back() {
      if (this.keyword) {
        this.keyword = '';
      } else {
        this.$router.back();
      }
    }
  },
  watch: {
    keyword(value) {
      if (!value) {
        console.log(2);
        this.postList = [];
        this.recommend = [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.hm-search {
  .header {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    display: flex;
    margin-bottom: 20px;
    .left {
      width: 30px;
      color: 999;
      span {
        font-size: 18px;
      }
    }
    .center {
      flex: 1;
      position: relative;
      padding: 0 10px;
      input {
        height: 30px;
        width: 100%;
        padding-left: 30px;
        border: none;
        outline-style: none;
        border: 1px solid #333;
        border-radius: 15px;
      }
      span {
        position: absolute;
        top: 0;
        left: 20px;
      }
    }
  }
  .history {
    padding: 0 10px;
    margin-bottom: 10px;
    .title {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .content {
      overflow: hidden;
      .item {
        float: left;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        background-color: #ddd;
        border-radius: 15px;
        padding: 0 15px;
        margin: 0 10px 10px 0;
      }
    }
  }
  .hot {
    padding: 0 10px;
    .title {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .content {
      overflow: hidden;
      .item {
        float: left;
        width: 50%;
        font-size: 14px;
        margin-bottom: 10px;
        &:nth-child(even) {
          padding-left: 10px;
          border-left: 1px solid #333;
        }
      }
    }
  }
  .post {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50px;
    z-index: 999;
    background-color: #fff;
  }
  .recommend {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    position: absolute;
    top: 50px;
    z-index: 999;
    background-color: #fff;
    .item {
      display: flex;
      align-items: space-between;
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #333;
      margin-bottom: 10px;
      .left {
        flex: 1;
        font-size: 14px;
      }
      .right {
        width: 30px;
        span {
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
}
</style>
