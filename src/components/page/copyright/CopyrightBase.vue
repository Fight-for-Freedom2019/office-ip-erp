<template>
  <el-form label-width="100px" :model="form" :rules="rules" ref="form">
   <el-row>
            <el-col :span="8">
          <el-form-item label="案号" prop="serial">
            <el-input v-model="form.serial" placeholder="请填写案号"></el-input>
          </el-form-item>
            </el-col>
        <el-col :span="8">
          <el-form-item label="立案日" prop="creation_time">
            <el-date-picker type="date" v-model="form.creation_time" placeholder="请选择申请日"  class="input-min-width"></el-date-picker>
          </el-form-item>
            </el-col>
            
        <el-col :span="8">
                    <el-form-item label="案件状态" prop="legal_status">
                        <static-select type="legal_status" v-model="form.legal_status"></static-select>
                    </el-form-item>
                </el-col>
      </el-row>
      <el-row>
            <el-col :span="8">
              <el-form-item label="申请日" prop="applicant_date">
            <el-date-picker type="date" v-model="form.applicant_date" placeholder="请选择申请日"  class="input-min-width"></el-date-picker>
          </el-form-item>
            </el-col>
        <el-col :span="8">
          <el-form-item label="申请号" prop="applicant_number">
            <el-input v-model="form.applicant_number" placeholder="请填写申请号"  class="input-min-width"></el-input>
          </el-form-item>             
            </el-col>
            <el-col :span="8">
          <el-form-item label="著作权类型" prop="type">
            <!-- <el-select v-model="form.type" placeholder="请选择案件类型">
              <el-option v-for="item in options.type" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select> -->
            <static-select type="copyright_type" v-model="form.type"></static-select>
          </el-form-item>
            </el-col>
          </el-row>
      <el-row>
            <el-col :span="8">
          <el-form-item label="发证日" prop="issue_date">
            <el-date-picker type="date" v-model="form.issue_date" placeholder="请选择发证日"  class="input-min-width"></el-date-picker>
          </el-form-item>
            </el-col>
            <el-col :span="8">
          <el-form-item label="证书号" prop="issue_number">
            <el-input v-model="form.issue_number" placeholder="请填写证书号"  class="input-min-width"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="8">
          <el-form-item label="详细状态" prop="progress">
            <static-select type="copyrights_status" v-model="form.progress"></static-select>
          </el-form-item> 
            </el-col>
          </el-row> 
      <el-row>
            <el-col :span="8">
          <el-form-item label="提案人" prop="proposer">
          <remote-select type="member" v-model="form.proposer"></remote-select>
        </el-form-item>
            </el-col>
            <el-col :span="8">
          <el-form-item label="IPR" prop="ipr">
            <!-- <span class="form-item-text" v-if="type == 'add'">{{ user ? user.name : '暂未读取到当前用户数据' }}</span> -->
            <static-select type="ipr" v-model="form.ipr"></static-select>
          </el-form-item>
            </el-col>
            <el-col :span="8">
          
            </el-col>
          </el-row> 
                    

      <el-form-item label="著作权名称" prop="title">
        <el-input v-model="form.title" placeholder="请填写著作权名称"></el-input>
      </el-form-item>   
      <el-form-item label="著作权人" prop="applicants">
        <remote-select type="applicant" v-model="form.applicants"  multiple></remote-select>
      </el-form-item> 
      
      <el-form-item label="附件" prop="attachments">
        <upload v-model="form.attachments" :file-list="attachments"></upload>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="form.remark" placeholder="请填写备注"></el-input>
      </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'copyrightBase',
  props: {
    pageType:{
      type: String,
      default: '',
    }
  },
  data () {
    return {
      form: {
        serial: '',
        ceation_time: '',
        legal_status: '',
        applicant_number: '',
        applicant_date: '',
        type: '',
        issue_date: '',
        issue_number: '',
        progress: '',
        proposer: '',
        ipr: '',
        title: '',
        applicants: [],
        attachments: [],
        remark: '',
      },
      rules: {
        title: { required: true, message: '版权名称不能为空', trigger: 'blur' },
        type: { type: 'number', required: true, message: '著作权不能为空', trigger: 'change' },
      },
      attachments: [],
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