<template>
  <!-- <app-collapse col-title="扩展信息"> -->
      <el-form label-width="120px" :model="form" ref="form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="立案日">
              <el-date-picker size="small" v-model="form.creation_time" placeholder="立案日" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="委案日">
              <el-date-picker size="small"  v-model="form.entrusting_time" type="date" placeholder="委案日" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="DAS码">
              <el-input size="small"  v-model="form.das" placeholder="DAS码" class="input-min-width"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请号">
              <el-input size="small"  v-model="form.application_number" placeholder="申请号" class="input-min-width"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日">
              <el-date-picker size="small"  v-model="form.application_date" type="date" placeholder="申请日" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="初审合格日">
              <el-date-picker size="small"  v-model="form.pre_exam_ok_date" type="date" placeholder="初审合格日" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="公告号">
              <el-input size="small"  v-model="form.issue_number" placeholder="公告号" class="input-min-width"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公告日">
              <el-date-picker size="small"  v-model="form.issue_date" type="date" placeholder="公告日" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>          
          <el-col :span="8">
             <el-form-item label="PCT检索日">
              <el-date-picker size="small"  v-model="form.pct_search_date" placeholder="PCT检索日" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="国际申请号">
              <el-input size="small"  v-model="form.pct_application_number" placeholder="国际申请号" class="input-min-width"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="PCT申请日">
              <el-date-picker size="small" v-model="form.pct_application_date" type="date" placeholder="PCT申请日" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="PCT优先权日">
              <el-date-picker size="small"  v-model="form.pct_priority_date" type="date" placeholder="PCT优先权日" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="国际公开号">
              <el-input size="small"  v-model="form.pct_publication_number" placeholder="国际公开号" class="input-min-width"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国际公开日">
              <el-date-picker size="small"  v-model="form.pct_publication_date" type="date" placeholder="国际公开日" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国际公开语言">
              <static-select size="small"  type="language" v-model="form.pct_publication_language" class="input-min-width"> </static-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="PCT国家阶段">
              <el-date-picker size="small"  v-model="form.pct_national_stage_expire_date" type="date" placeholder="PCT国家阶段" :disabled="true" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="PCT19条期限">
              <el-date-picker size="small"  v-model="form.pct19_expire_date" type="date" placeholder="PCT19条期限" :disabled="true" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="PCT初审期限">
              <el-date-picker size="small"  v-model="form.pct_pre_exam_expire_date" type="date" placeholder="PCT初审期限" :disabled="true" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="进入实审日">
              <el-date-picker size="small"  v-model="form.sub_exam_start_date" type="date" placeholder="进入实审日" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="优先权期限">
              <el-date-picker size="small"  v-model="form.priority_expire_date" type="date" placeholder="优先权期限" :disabled="true" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主动修改期限">
              <el-date-picker size="small"  v-model="form.active_supplement_expire_date" type="date" placeholder="主动修改期限" :disabled="true" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="8">
            <el-form-item label="公开号">
              <el-input size="small"  v-model="form.publication_number" placeholder="公开号" class="input-min-width"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公开日">
              <el-date-picker size="small"  v-model="form.publication_date" type="date" placeholder="公开日" class="input-min-width"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    <!-- </app-collapse> -->
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Branch from '@/components/form/Branch'
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'
import AppSwitch from '@/components/form/AppSwitch'

import { checkInventors } from '@/const/validator.js'

export default {
  name: 'patentAddPerson',
  props: ['type'],
  data () {
    return {
      form: {
        creation_time: '',
        entrusting_time: '',
        das: '',
        application_number: '',
        application_date: '',
        pre_exam_ok_date: '',
        publication_date: '',
        publication_number: '',
        sub_exam_start_date: '',
        issue_date: '',
        issue_number: '',
        pct_application_number: '',
        pct_apd: '',
        pct_priority_date: '',
        pct_publication_number: '',
        pct_publication_date: '',
        pct_publication_language: '',
        pct19_expire_date: '',
        pct_national_stage_expire_date: '',
        active_supplement_expire_date: '',
        first_edition_to_ipr_time: '',
        pct_pre_exam_expire_date: '',
        ipr_final_edition_time: '',
        priority_expire_date: '',
        inventor_review_times: '',
        pct_search_date: '',
      },
      ipr_name: '',
      branchName: '',
      options: {
        language: [
          {name:"中文-Chinese",id:"CN"},
          {name:"英文-English",id:"EN"},
          {name:"法文-Franch",id:"FR"},
          {name:"德文-Germany",id:"GE"},
          {name:"日文-Japanese",id:"JP"},
          {name:"俄文-Russian",id:"RU"},
          {name:"西班牙-Spanish",id:"ES"},
        ]
      },
    }
  },
  methods: {
    handleInventor (val) {
      this.form.inventors = val;
      this.$refs.form.validateField('inventors');
    },
    setForm (data) {
      for(let k in this.form) {
        if(data[k] == undefined) continue;
        if( k == 'branch' ) {
          
          if(data[k]) {
            this.form[k] = data[k]['id'];  
            this.branchName = data[k]['name'];
          }else {
            this.form[k] = '';
            this.branchName = '';
          }
        }else if( k == 'ipr' ) {
          this.ipr_name = data[k]['name'];
        }else {
          this.form[k] = data[k];
        }
      }
    },
    submitForm () {
      // console.log(this.form);
      // if(this.type == 'add') this.form.ipr = this.user.id;
      return this.$tool.shallowCopy(this.form, { 'date': true });
    },
    checkForm (callback) {
      let flag = true;
      this.$refs.form.validate(_=>{
        flag = _;
        callback(flag);
      });
    },
  },
  computed: {
    user () {
      return this.$store.getters.getUser;
    }
  },
  components: { 
    AppCollapse, 
    Branch, 
    StaticSelect, 
    RemoteSelect,
    AppSwitch,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>