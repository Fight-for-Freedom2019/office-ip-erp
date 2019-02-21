<template>
  <el-form label-width="100px" :model="form" :rules="rules" ref="form">
      <el-row>
          <el-col :span="8">
              <el-form-item label="申请日" prop="application_date">
                  <el-date-picker type="date" v-model="form.application_date" placeholder="请选择申请日" class="input-min-width"></el-date-picker>
              </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-form-item label="申请号" prop="application_number">
                  <el-input v-model="form.application_number" placeholder="请填写申请号" class="input-min-width"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-form-item label="初审公告日" prop="publication_date">
                  <el-date-picker type="date" v-model="form.publication_date" placeholder="请选择初审公告日" class="input-min-width"></el-date-picker>
              </el-form-item>                    
          </el-col>
      </el-row>          
      <el-row>
          <el-col :span="8">
              <el-form-item label="初审公告号" prop="publication_number">
                  <el-input v-model="form.publication_number" placeholder="请填写初审公告号" class="input-min-width"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-form-item label="公告日" prop="issue_date">
                  <el-date-picker type="date" v-model="form.issue_date" placeholder="请选择公告日" class="input-min-width"></el-date-picker>
              </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-form-item label="公告号" prop="issue_number">
                  <el-input v-model="form.issue_number" placeholder="请填写公告号" class="input-min-width"></el-input>
              </el-form-item>
          </el-col>
      </el-row>          
      <el-row>
          <el-col :span="8">
              <el-form-item label="委案日" prop="entrusting_time">
                  <el-date-picker type="date" v-model="form.entrusting_time" placeholder="请选择委案日" class="input-min-width"></el-date-picker>
              </el-form-item>
          </el-col>
      </el-row>
  </el-form>
</template>
<script>
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
      form: {
        application_date: '',
        application_number: '',
        publication_date: '',
        publication_number: '',
        issue_date: '',
        issue_number: '',
        entrusting_time: '',
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