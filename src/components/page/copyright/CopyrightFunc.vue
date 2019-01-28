<template>
  <el-form label-width="100px" :model="form" :rules="rules" ref="form">
    <el-form-item label="硬件环境" prop="hardware_environment">
      <el-input type="textarea" v-model="form.hardware_environment" placeholder="请填写硬件环境"></el-input>
    </el-form-item>
    <el-form-item  label="软件环境" prop="software_environment">
      <el-input type="textarea" v-model="form.software_environment" placeholder="请填写软件环境"></el-input>
    </el-form-item>
    <el-form-item  label="编程语言" prop="program_language ">
      <el-input  v-model="form.program_language" placeholder="请填写编程语言"></el-input>
    </el-form-item>
    <el-form-item  label="源程序量" prop="source_lines">
      <el-input  v-model="form.source_lines" placeholder="请填写源程序量"></el-input>
    </el-form-item>
    <el-form-item label="案件摘要" prop="abstract">
      <el-input type="textarea" v-model="form.abstract" placeholder="请填写案件摘要" ></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'copyrightFunc',
  props: {
    pageType:{
      type: String,
      default: '',
    }
  },
  data () {
    return {
      form: {
       hardware_environment: '',
       software_environment: '',
       program_language: '',
       source_lines: '',
       abstract: '',
      },
      rules: {},
    }
  },
  methods: {
  submitForm () {
    return this.$tool.shallowCopy(this.form, { date: true });
  },
  setForm (form) {
    this.$tool.coverObj(this.form, form);
  },
  checkForm(callback) {
      let flag = true;
      this.$refs.form.validate(_ => {
        flag = _;
        callback(flag);
      });
    },
  },
  components: {
  }
} 
</script>
<style lang-="scss" scoped>
</style>