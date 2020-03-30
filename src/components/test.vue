<template>
  <div class="container">
    <div class="son">
      我是递归组件-----{{ parent.name }}-------{{ parent.des }}
      <button @click="send(parent.name)">传值</button>
    </div>
    <test :parent="parent.parent" v-if="parent.parent" @aa="send"></test>
  </div>
</template>

<script>
export default {
  props: {
    parent: Object
  },
  name: 'test',
  methods: {
    send(name) {
      this.$emit('aa', name);
    }
  }
};
</script>

<style lang="less" scoped>
.son {
  padding: 15px;
  border: 1px solid #333;
}
</style>
