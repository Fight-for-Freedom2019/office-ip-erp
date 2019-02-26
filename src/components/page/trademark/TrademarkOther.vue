<template>
  <el-form label-width="100px" :model="form" :rules="rules" ref="form">
   <el-form-item label="权利要求项数">
          <el-input v-model="form.claims_count" placeholder="请填写权利要求项数"></el-input>
        </el-form-item>
        <el-form-item label="说明书字数">
          <el-input v-model="form.words_count" placeholder="请填写说明书字数"></el-input>
        </el-form-item>
        <el-form-item label="首次年费年度">
          <el-select v-model="form.start_year" placeholder="请选择首次年费年度">
            <el-option
              v-for="item in yearOptions"
              :key="item.id"
              :label="item.id"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="案件摘要">
          <el-input v-model="form.abstract" type="textarea" placeholder="请填写案件摘要"></el-input>
        </el-form-item>
        <!-- <el-form-item label="摘要附图">
          <upload v-model="form.figure_file" :limit="1" :fileList="figure_file"></upload>
        </el-form-item> -->
  </el-form>
</template>
<script>
import Priorities  from '@/components/form/Priorities'
export default {
  name: 'trademarkCase',
  props: {
    pageType:{
      type: String,
      default: '',
    }
  },
  data () {
    return {
       yearOptions: [
        { id: 1, name: '1'},
        { id: 2, name: '2'},
        { id: 3, name: '3'},
        { id: 4, name: '4'},
        { id: 5, name: '5'},
        { id: 6, name: '6'},
        { id: 7, name: '7'},
        { id: 8, name: '8'},
        { id: 9, name: '9'},
        { id: 10, name: '10'},
      ],
      form: {
        words_count: '',
        claims_count: '',
        official_status: '',
        start_year:'',
        abstract: '',
        // figure_file: [],
      },
      // figure_file: [],
      rules: {},
    }
  },
  methods: {
  submitForm () {
    return this.$tool.shallowCopy(this.form, { date: true });
  },
  setForm (form) {
    this.$tool.coverObj(this.form, form);
    //  this.figure_file = data.figure_file ? data.figure_file : [];
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
    Priorities,
  }
} 
</script>
<style lang-="scss" scoped>
</style>