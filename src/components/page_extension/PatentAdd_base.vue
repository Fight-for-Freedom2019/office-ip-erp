<template>
  <!-- <app-collapse col-title="基本信息"> -->
    <el-form label-width="120px" :model="form" :rules="rules" ref="form">
      <el-row>
        <el-col :span="8">
            <el-form-item label="案号" prop="serial">
              <el-input v-model="form.serial" placeholder="请填写案号"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title" placeholder="请填写案件标题" ></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="英文标题" prop="english_title">
              <el-input v-model="form.english_title" placeholder="请填写案件英文标题"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请国家" prop="area" :rules="{ type: type=='add' ? 'array' : 'string',required: true, message: '地区不能为空', trigger: 'change' }">
            <region 
              v-model="form.area" 
              :multiple="type == 'add'"
            ></region>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专利类型" prop="subtype">
            <static-select type="patent_type" v-model="form.subtype"></static-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案件等级">
            <static-select type="project_level" v-model="form.level"></static-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="案件状态">
              <jump-select type="project_stage" v-model="form.project_stage"></jump-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任务阶段">
              <jump-select type="process_stage" v-model="form.process_stage"></jump-select>
          </el-form-item>
        </el-col>
<!--         <el-col :span="8">
          <el-form-item label="群组号">
              <static-select  type="group_number" v-model="form.group_number" placeholder="请填写群组号" @visible-change="handleVisibleChange"></static-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专利族号">
              <static-select type="family_number" v-model="form.family_number" placeholder="请填写专利族号" @visible-change="handleVisibleChange"></static-select>
          </el-form-item>
        </el-col> -->
        <!-- <el-col :span="8"> -->
     <!--      <el-form-item label="法律状态">
              <static-select type="legal_status" v-model="form.official_status"></static-select>
          </el-form-item> -->
 <!--        </el-col>
         <el-col :span="8"> 
      
        </el-col> -->
      </el-row>
      <el-form-item label="申请人">
        <remote-select type="applicant" :page-type="type" v-model="form.applicants" :para="customerParam" multiple></remote-select>
      </el-form-item >

      <el-form-item label="发明人" prop="inventors" v-if="!menusMap.get('/iprs')">
        <!-- <inventors :page-type="type"  v-model="form.inventors" ref="inventors" @addInventor="$refs.form.validateField('inventors')" @deleteInventor="$refs.form.validateField('inventors')"></inventors> -->
         <remote-select type="inventor" :page-type="type" v-model="form.inventors" :para="customerParam" multiple></remote-select>
      </el-form-item>

<!--       <el-form-item label="送件发明人">
        <remote-select type="inventor" :page-type="type" v-model="form.alias_inventors" multiple></remote-select>
      </el-form-item> -->
      <el-form-item label="优先权">
        <priorities v-model="form.priorities"></priorities>
      </el-form-item>
      <el-form-item label="案件引用">
        <relative-projects v-model="form.references"  :customer="customerParam" :page-type="type"></relative-projects>
      </el-form-item>
      <el-form-item label="专利族">
        <remote-select v-model="form.families"  :para="customerParam"  type="patent_family" :page-type="type" :add-type="`patent_family`" multiple></remote-select>
      </el-form-item>

      <!-- <el-form-item label="案件标记">
        <el-checkbox-group v-model="form.extension" v-if="extensionSet.length != 0" id="extension">
          <el-checkbox 
            v-for="item in extensionSet" 
            :key="item.label"
            :label="item.label"
          >{{ item.text }}</el-checkbox>
        </el-checkbox-group>
        <span v-else>暂无可选项</span>
      </el-form-item> -->
      <el-form-item label="案件标签">
        <remote-select type="tags" v-model="form.tags" multiple></remote-select>
      </el-form-item>
      
      
      <!-- <el-form-item label="摘要">
        <el-input type="textarea" v-model="form.abstract" placeholder="请填写专利摘要" :rows="6" class="custom-textarea"></el-input>
      </el-form-item> -->
      <el-form-item label="附件" prop="attachments">
          <upload  @uploadSuccess="handleUploadSuccess" v-model="form.attachments" :file-list="attachments"></upload>
      </el-form-item>  
      <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" placeholder="请填写备注信息"></el-input>
      </el-form-item> 
    </el-form>
  <!-- </app-collapse> -->
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Region from '@/components/form/Region'
import Proposal from '@/components/form/Proposal'
import PatentType from '@/components/form/PatentType'
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'
import Priorities from '@/components/form/Priorities'
import Inventors from '@/components/form/Inventors'
import Upload from '@/components/form/Upload'
import RelativeProjects from '@/components/form/RelativeProjects'
import JumpSelect from '@/components/form/JumpSelect'
import {mapGetters,mapActions} from 'vuex'
import { checkInventors } from '@/const/validator.js'

const extensionHash = [
  { text: '是否同时提出实审请求', label: 'is_exam_request', area: 'CN', type: 1 },
  { text: '是否请求提前公开', label: 'is_pre_public', area: '', type: 1 },
  { text: '是否保密审查', label: 'is_secure_check', area: '', type: [1,2] },
  { text: '是否同日申请了同样的实用新型/发明', label: 'is_utility', area: '', type: [1,2] },  
  { text: '是否是分案申请', label: 'is_division', area: '', type: [] },
  { text: '是否与生物相关', label: 'is_biological', area: '', type: 1 },
  { text: '是否有序列表', label: 'is_sequence', area: '', type: 1 },
  { text: '是否依赖于遗传资源', label: 'is_genetic', area: 'CN', type: [] },
  { text: '是否不丧失新颖性公开', label: 'is_leakage', area: 'CN', type: [] },
  { text: '是否要求优先权', label: 'is_priority', area: '', type: [] },
  { text: '是否有变更', label: 'is_amended', area: '', type: [] },
  { text: '是否有许可备案', label: 'is_licensed', area: '', type: [] },
] 

export default {
  name: 'patentAddBase',
  props: {
    type:String,
    customer:Number,
  },
  data () {
    return {
      form: {
        serial: '',
        title: '',
        english_title:'',
        area: this.type == 'add' ? [] : '',
        subtype: '',
        // ipr: '',
        project_stage: '',
        process_stage: '',
        level: '',
        applicants: [],
        inventors: [],
        // alias_inventors: [],
        priorities: [],
        extension: [], 
        attachments: [],
        // contact:[],
        // group_number:'',
        // family_number:'',
        remark: '',
        // abstract:'',
        // flownode:'',
        // official_status: '',
        references: [],
        families:[],
        tags:[],
      },
      titleLock: false, //标题锁 当评审表被上传且标题自动填充后 不再自动填充 
      attachments: [],
      rules: {
        'title':{ required: true, message: '标题不能为空', trigger: 'blur' },
        'serial':{ required: true, message: '案号不能为空', trigger: 'blur' },
        'subtype': { type: 'number', required: true, message: '专利类型不能为空', trigger: 'change' },
        'english_title': {message: '请输入英文标题', trigger: 'blur', pattern:/^[^\u4e00-\u9fa5]*$/},
        // 'inventors': {
        //   type: 'array',
        //   trigger: 'change',
        //   validator: (a,b,c)=>{
        //     this.$nextTick(_=>{
        //       checkInventors(a, this.form.inventors, c, false);
        //     })       
        //   },
        // },
      },
    };
  },
  computed: {
    ...mapGetters([
      'userid',
      'userrole',
      'menusMap',
    ]),
    extensionSet () {
      let area = this.form.area;
      const type = this.form.type;
      if(!area || !type) return [];
      area = typeof area == 'string' ? area : area.join(',');
      const arr = [];
      extensionHash.forEach(d=>{
        const areaReg = new RegExp(d.area);
        const typeArr = d.type instanceof Array ? d.type : [d.type];
        if ( areaReg.test(area) ) {
          if(typeArr.length == 0) {
            arr.push({ text: d.text, label: d.label });
          }else {
            for (let t of typeArr) {
              if(t == type) {
                arr.push({ text: d.text, label: d.label });
                break;
              }
            }  
          }
        }
      })
      return arr;
    },
    serial () {
      return this.form.serial ? this.form.serial : '暂无案号信息';
    },
    uploadPara () {
      const obj = {};
      if(this.type == 'add') {
        obj.action = 'parseDisclosure';
      }
      return obj;
    },
    customerParam() {
      return this.customer ? {customer:this.customer} : null;
    },
  },
  methods: {
    ...mapActions([
      'initializeSelectorCache'
    ]),
    checkForm (callback) {
      let flag = true;
      this.$refs.form.validate(_=>{
        flag = _;
        callback(flag);
      });
    },
    //setForm 的Type用于区分正常填充 或者 是文件解析后的填充
    setForm (form, upload=false, disclosureType='') {
      const t = this.type;
      this.$tool.coverObj(this.form, form, {
        obj: [ 'attachments', 'area', 'subtype','level', 'agency_type'], 
        skip:[ 'extension', 'title'],
      });

      if(form['title'] != undefined && !this.titleLock) {
        this.form.title = form['title'];
      }
      if(form['area'] != undefined && t == 'add') {
        this.form.area = form['area']?[form['area']]:[];
      }
      if(form['area'] != undefined && t == 'edit') {
        this.form.area = form['area']['id'];
      }      
      if(form['extension']) {
        const arr = [];
        for(let d of form['extension']) {
          if(d['value']) arr.push(d['label']);
        }
        this.form.extension = arr;
      }
      if (form['references']) {
        this.form.references = form['references'].map(_=>{ return {id: { id: _.id, name: _.name }, reference_type: _.reference_type,} });
      }

      if(upload) {
        if(this.form.inventors && this.form.inventors.length != 0) {
          //复用组件内置的方法...
          this.$refs.inventors.handleShare(this.form.inventors);
        }
        if(disclosureType == 2) {
          this.titleLock = true;
        }
      }else {
        this.attachments = form.attachments ? form.attachments : [];
      }      
    },    
    submitForm () {
      if(this.form.references && this.form.references.length != 0) {
        this.form.references.map(_=>{
          _.id = _.id.id;
          _.reference_type = _.reference_type;
        });
      }
      return this.$tool.shallowCopy(this.form, { 'date': true });
    },
    handleUploadSuccess (a, b, c) {
      this.$emit('uploadSuccess', a, b, c);
    },
    handleVisibleChange(val) {
      // console.log(val);
      if(val[0]) {
        this.initializeSelectorCache({type: val[1], flag: true});
      }
    }  
  },
  created () {
    this.userrole == 3 && this.userid ? this.form.ipr = this.userid : this.form.ipr = ''; 
  },
  components: { 
    AppCollapse, 
    Region, 
    Proposal, 
    PatentType, 
    StaticSelect,
    RemoteSelect,
    Priorities,
    Inventors,
    Upload,
    RelativeProjects,
    JumpSelect,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#extension .el-checkbox {
  margin-left: 0px;
  margin-right: 10px;
}
</style>