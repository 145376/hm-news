<template>
  <div class="hm-manage">
    <hm-header>栏目管理</hm-header>
    <div class="delete">
      <div class="title">点击删除以下频道(必需保留3条)</div>
      <div class="channel">
        <div
          class="item"
          v-for="item in activeList"
          :key="item.id"
          @click="deleteItem(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="add">
      <div class="title">点击添加以下频道</div>
      <div class="channel">
        <div
          class="item"
          v-for="item in deactiveList"
          :key="item.id"
          @click="addItem(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    let active = JSON.parse(localStorage.getItem('active'));
    let deactive = JSON.parse(localStorage.getItem('deactive'));
    if (active && deactive) {
      this.activeList = active;
      this.deactiveList = deactive;
      return;
    }
    let res = await this.$axios.get(`/category`);
    let { statusCode, data } = res.data;
    if (statusCode === 200) {
      this.activeList = data;
      this.deactiveList = [];
      console.log(this.activeList);
    }
  },
  data() {
    return {
      activeList: [],
      deactiveList: []
    };
  },
  methods: {
    //删除频道
    deleteItem(id) {
      if (this.activeList.length <= 3) {
        this.$toast('必须保留3条');
        return;
      }
      console.log(id);
      let index = this.activeList.findIndex(v => v.id === id);
      console.log(index);
      let arr = this.activeList.slice(index, index + 1);
      this.deactiveList.push(this.activeList[index]);
      this.activeList.splice(index, 1);
    },
    //添加频道
    addItem(id) {
      console.log(id);
      let index = this.deactiveList.findIndex(v => v.id === id);
      this.activeList.push(this.deactiveList[index]);
      this.deactiveList.splice(index, 1);
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler(value) {
        localStorage.setItem('active', JSON.stringify(this.activeList));
        localStorage.setItem('deactive', JSON.stringify(this.deactiveList));
      }
    }
  }
};
</script>

<style lang="less" scoped>
.hm-manage {
  .delete {
    margin-top: 20px;
    padding: 0 20px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .add {
    padding: 0 20px;
  }
}
.title {
  color: #666;
  font-size: 14px;
}
.channel {
  width: 100%;
  .item {
    float: left;
    width: 20%;
    padding: 5px;
    background-color: #ddd;
    font-size: 12px;
    text-align: center;
    margin: 5px;
  }
}
</style>
