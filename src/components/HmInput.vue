<template>
  <div class="hm-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="send"
      :class="{ success: status === 'success', error: status === 'error' }"
    />
    <div class="tips" v-show="status === 'error'">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入...'
    },
    value: String,
    rules: RegExp,
    msg: {
      type: String,
      defaule: '输入格式有误'
    }
  },
  methods: {
    send(e) {
      let value = e.target.value;
      this.$emit('input', value);
      this.checkout(value);
    },
    checkout(value) {
      //表单校验
      if (this.rules) {
        if (this.rules.test(value)) {
          this.status = 'success';
          return true;
        } else {
          this.status = 'error';
          return false;
        }
      }
    }
  },
  data() {
    return {
      status: ''
    };
  }
};
</script>

<style lang="less" scoped>
.hm-input {
  height: 70px;
  margin: 0 20px;
  font-size: 12px;
  input {
    width: 100%;
    height: 50px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    outline: none;
    &.success {
      border-color: green;
    }
    &.error {
      border-color: red;
    }
  }
  .tips {
    color: red;
  }
}
</style>
