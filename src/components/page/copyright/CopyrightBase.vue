<template>
  <el-form label-width="100px" :model="form" :rules="rules" ref="form">
   <el-row>
      <el-col :span="8">
        <el-form-item label="案号" prop="serial">
          <el-input v-model="form.serial" placeholder="请填写案号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
         <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请填写标题"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="版权类型" prop="subtype">
          <static-select type="copyright_subtype" v-model="form.subtype"></static-select>
        </el-form-item>
      </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="案件状态" prop="project_stage">
              <static-select type="project_stage" v-model="form.project_stage"></static-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="委案日" prop="entrusting_time">
            <el-date-picker type="date" v-model="form.entrusting_time" placeholder="请选择申请日"  class="input-min-width"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="受理日" prop="applicant_date">
            <el-date-picker type="date" v-model="form.applicant_date" placeholder="请选择受理日"  class="input-min-width"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="受理号" prop="applicant_number">
            <el-input v-model="form.applicant_number" placeholder="请填写受理号"  class="input-min-width"></el-input>
          </el-form-item>             
        </el-col>
        <el-col :span="8">
          <el-form-item label="证书号" prop="issue_number">
            <el-input v-model="form.issue_number" placeholder="请填写证书号"  class="input-min-width"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="下证日" prop="issue_date">
            <el-date-picker type="date" v-model="form.issue_date" placeholder="请选择下证日"  class="input-min-width"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row> 
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请人" prop="applicants">
            <remote-select type="applicant" v-model="form.applicants" multiple></remote-select>
          </el-form-item>
        </el-col>
            <el-col :span="8">
              <el-form-item label="代理人" prop="agent">
                <remote-select type="user" v-model="form.agent"></remote-select>
              </el-form-item>         
            </el-col>
            <el-col :span="8">
              <el-form-item label="销售" prop="sales">
                <remote-select type="user" v-model="form.sales"></remote-select>
              </el-form-item> 
            </el-col>
          </el-row> 
                    
        <el-form-item label="部门" prop="organization_unit">
          <branch v-model="form.organization_unit" count-type="copyright"></branch>
          <!-- <span v-else>{{ branchName ? branchName : '暂未归属某个部门' }}</span> -->
        </el-form-item>
      <el-form-item label="附件" prop="attachments">
        <upload v-model="form.attachments" :file-list="attachments" ref="upload"></upload>
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
        entrusting_time: '',
        applicant_number: '',
        applicant_date: '',
        project_stage: '',
        subtype: '',
        issue_date: '',
        issue_number: '',
        title: '',
        agent: '',
        sales: '',
        organization_unit: '',
        applicants: [],
        attachments: [],
        remark: '',
      },
      rules: {
        // serial: { required: true, message: '请填写案号', trigger: 'blur'},
        title: { required: true, message: '请填写标题', trigger: 'blur' },
        subtype: { type: 'number', required: true, message: '请填写版权类型', trigger: 'change' },
      },
      attachments: [],
    }
  },
  methods: {
  submitForm () {
    return this.$tool.shallowCopy(this.form, { date: true });
  },
  setForm (form) {
    this.$tool.coverObj(this.form, form, {
      obj: ['attachments'],
    });
    this.attachments = form.attachments && form.attachments.length ? form.attachments : [];  
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