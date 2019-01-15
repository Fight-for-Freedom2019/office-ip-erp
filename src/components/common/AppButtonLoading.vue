<!--
    父组件中只能存在本组件，
    因为关闭loading是通过$refs来寻找的，
    虽然可以在下面的click事件中添加本组件的实例作为参数传递给执行的方法，
    但是这样就需要在每个请求里面也加上这个实例作为参数，
    改动太大
 -->
<template>
  <el-button @click="click" :disabled="disabled" type="primary" :size="size" :loading="loading">{{text}}</el-button>
</template>

<script>
  export default {
    name: "AppButtonLoading",
    data() {
      return {
        loading: false,
      }
    },
    props: {
      size:{
        type:String,
        default(){
          return "small"
        },
      },
      disabled: {
        type: Boolean,
        default() {
          return false
        },
      },
      text: {
        type: String,
        default() {
          return "新建"
        }
      },
      func: {
        type: Function,
        default() {
          return () => {
          }
        },
      },
      param: {
        type: String,
        default() {
          return "add"
        },
      }
    },
    computed: {
      multiple: function () {
        return /,/.test(this.param);
      }
    },
    methods: {
      click() {
        this.multiple ? this.func(...this.param.split(",")) : this.func(this.param);
      },
    }
  }
</script>

<style scoped>

</style>