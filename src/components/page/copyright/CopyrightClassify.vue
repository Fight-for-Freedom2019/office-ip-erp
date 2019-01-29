<template>
  <el-form label-width="100px" :model="form" :rules="rules" ref="form">
    <el-form-item label="代理机构名称">
      <remote-select type="agency" v-model="form.agency"></remote-select>
    </el-form-item>
    <el-form-item label="事务所案号">
      <el-input v-model="form.agency_serial" placeholder="请填写事务所案号"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'copyrightClassify',
  props: {
    pageType:{
      type: String,
      default: '',
    }
  },
  data () {
    return {
      form: {
        agency: '',
        agency_serial: '',
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