<template>
  <div class="container">
    <div>我是aaa组件-----{{ list.name }}-------{{ list.des }}</div>
    <div class="son">parent的名字------{{ name }}</div>
    <test :parent="list.parent" v-if="list.parent" @aa="aa"></test>
  </div>
</template>

<script>
import test from '../components/test.vue';
export default {
  data() {
    return {
      list: {
        name: '王五',
        des: '第一任',
        parent: {
          name: '吴无',
          des: '第二任',
          parent: {
            name: '文物',
            des: '第三任',
            parent: {
              name: '李四',
              des: '第四任'
            }
          }
        }
      },
      name: ''
    };
  },
  components: {
    test
  },
  methods: {
    aa(name) {
      console.log(name);
      this.name = name;
    }
  }
};
</script>

<style></style>
