<template>
  <el-form label-width="100px" :model="form" :rules="rules" ref="form">
    <el-form-item label="部门" prop="branch">
      <branch v-model="form.branch"></branch>
    </el-form-item> 
    <el-form-item label="技术分类" prop="classification">
      <classification v-model="form.classification" count-type="copyright" multiple></classification>
    </el-form-item>
    <el-form-item label="产品分类" prop="products">
      <product v-model="form.products" count-type="copyright" multiple></product>
    </el-form-item>
    <el-form-item label="标签" prop="tags">
      <static-select type="tag" v-model="form.tags" multiple></static-select>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'copyrightCase',
  props: {
    pageType:{
      type: String,
      default: '',
    }
  },
  data () {
    return {
      form: {
        branch: [],
        classification: [],
        products: [],
        tags: []
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