<template>
  <div style="position: relative">
    <input :style="inputStyle" type="text" :placeholder="placeholder" @input="handleInput"  @keyup="handleInput" :value="value" class="el-input__inner search-content" style="padding-right: 35px; font-size: 14px;" @keyup.enter="handleEnter"></input>
    <i class="el-icon-search" title="输入回车搜索" v-if="!value" style="position: absolute; top: 13px; right: 10px; cursor: pointer; opacity: .5;"></i>
    <i class="el-icon-circle-close" v-if="clearable && value" title="点击清空" style="position: absolute; top: 13px; right: 10px; cursor: pointer; opacity: .5;" @click="handleClear"></i>
  </div>
</template>

<script>
import debounce from "lodash/debounce"
export default {
  name: 'searchInput',
  props: {
    'value': [String, Number],
    'placeholder': {
      type: String,
      default: '',
    },
    'inputStyle': {
      type: String,
      default: '',
    },
    'clearable': {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleInput(event) { 
      this.$emit('input', event.target.value);
    },
    handleEnter () {
      this.$emit('enter', this.value)
    },
    handleClick () {
      this.$emit('click', this.value)
    },
    handleClear() {
      this.$emit('clear', this.value)
    },
  },
  watch: {
    value(v) {
      console.log(v)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>