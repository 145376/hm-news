<template>
  <keep-alive :include="keepList">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['keepList'])
  }
};
</script>

<style lang="less" scoped></style>
