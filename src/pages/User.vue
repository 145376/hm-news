<template>
  <div class="hm-user">
    <hm-header>我的中心</hm-header>
    <div class="info">
      <div class="left">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584270670463&di=7a25b82102eebb12bb8585e9c97881cb&imgtype=0&src=http%3A%2F%2Fvsd-picture.cdn.bcebos.com%2F230ec03404cc00a31ad0328fe1be94a3e82069b0.jpg"
          alt=""
        />
      </div>
      <div class="center">
        <div class="name">
          <span class="iconfont iconxingbienan"></span>
          专业写bug
        </div>
        <div class="date">2020-3-15</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar title="我的关注" content="关注的用户"></hm-navbar>
    <hm-navbar title="我的跟贴" content="跟帖回复"></hm-navbar>
    <hm-navbar title="我的收藏" content="文章/视频"></hm-navbar>
    <hm-navbar title="设置"></hm-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.hm-user {
  .info {
    height: 80px;
    display: flex;
    padding: 0 20px;
    align-items: center;
    border-bottom: 3px solid #ccc;
    .left {
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: block;
      }
    }
    .center {
      flex: 1;
      padding-left: 20px;
      .name {
        font-size: 16px;
        font-weight: 700;
      }
      .date {
        font-size: 14px;
        color: #999;
      }
      span {
        color: skyblue;
      }
    }
    .right {
      width: 30px;
      span {
        color: #999;
        font-size: 16px;
      }
    }
  }
}
</style>
