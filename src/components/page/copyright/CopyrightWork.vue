<template>
  <el-form label-width="100px" :model="form" :rules="rules" ref="form">
   <el-row> 
        <el-col :span="8">
          <el-form-item label="版本号" prop="version">
            <el-input v-model="form.version" placeholder="请填写版本号"  class="input-min-width"></el-input>
          </el-form-item>     
        </el-col>
        <el-col :span="8">
          <el-form-item label="分类号" prop="main_ipc">
            <el-input v-model="form.main_ipc" placeholder="请填写分类号"  class="input-min-width"></el-input>
          </el-form-item>             
        </el-col>
        <el-col :span="8">
          <el-form-item label="原创类型" prop="original_flag">
            <!-- <el-select v-model="form.original_flag" placeholder="请选择原创类型">
              <el-option v-for="(item, index) in options.original_flag" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select> -->
            <static-select type="original_flag" v-model="form.original_flag"></static-select>
          </el-form-item> 
        </el-col>
      </el-row>
      <template v-if="form.original_flag==2">
        <el-form-item label="经原权利人授权" prop="is_authorized">
          <app-switch type="is" v-model="form.is_authorized"></app-switch>
        </el-form-item>
        <el-form-item label="原有软件已经登记" prop="is_original_registered">
          <app-switch type="is" v-model="from.is_original_registered"></app-switch>
        </el-form-item>
      </template>
      <template v-if="form.is_original_registered==1">
        <el-form-item label="原登记号" prop="original_register_number">
          <el-input v-model="form.original_register_number" placeholder="请填写原登记号"></el-input>
        </el-form-item>
      </template>
      <template v-if="form.original_flag==2">
        <el-form-item label="修改软件作品说明" prop="modification_introduction">
          <el-input v-model="form.modification_introduction" type="textarea" placeholder="请填写修改软件作品说明"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="开发完成日期" prop="develop_date">
        <el-date-picker type="date" v-model="form.develop_date" placeholder="请选择开发完成日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="是否发表" prop="is_published">
        <app-switch type="is" v-model="form.is_published"></app-switch>
      </el-form-item>   
      <el-form-item label="首次发表日期" prop="publish_date">
        <el-date-picker type="date" v-model="form.publish_date" placeholder="请选择首次发表日期"></el-date-picker>
      </el-form-item> 
      <el-form-item label="开发方式" prop="develop_mode">
       <!--  <el-select v-model="form.develop_mode" placeholder="请选择开发方式">
          <el-option v-for="(item,index) in options.develop_mode" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select> -->
        <static-select type="develop_mode" v-model="form.develop_mode"></static-select>
      </el-form-item> 
      <el-form-item label="权利取得方式" prop="right_acquisition_method">
  <!--     <el-select v-model="form.right_acquisition_method" placeholder="请选择权利范围">
        <el-option v-for="(item,index) in options.right_acquisition_method" :key="index" :label="item.name" :value="item.id"></el-option>
      </el-select> -->
        <static-select type="right_acquisition_method" v-model="form.right_acquisition_method"></static-select>
      </el-form-item>
          <template v-if="form.is_original_registered==1">
      <el-form-item label="原登记做过变更或补充" prop="is_original_registration_changed">
        <el-switch v-model="form.is_original_registration_changed" on-color="#13ce66" off-color="#ff4949" on-text="是" off-text="否"></el-switch>
      </el-form-item>
      </template>
      <template v-if="form.is_original_registration_changed==1">  
        <el-form-item label="变更或补充证明编号" prop="registration_change_evidence">
          <el-input v-model="form.registration_change_evidence" placeholder="请填写变更或补充证明编号"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="权利范围" prop="right_scope">
        <!-- <el-select v-model="form.right_scope" placeholder="请选择权利范围">
          <el-option v-for="(item,index) in options.right_scope" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select> -->
         <static-select type="right_scope" v-model="form.right_scope"></static-select>
      </el-form-item>
      <template v-if="form.right_scope==2">
        <el-form-item label="">
              <el-checkbox-group v-model="form.right_checkbox">
                <el-checkbox 
                  v-for="(item,index) in rightSet" 
                  :key="index"
                  :label="item.label"
                >{{ item.text }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </template>
      <el-form-item label="软件鉴别材料" prop="deposition_material">
    <!--     <el-select v-model="form.deposition_material" placeholder="请选择软件鉴别材料">
          <el-option v-for="(item,index) in options.deposition_material" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select> -->
        <static-select type="deposition_material" v-model="form.deposition_material"></static-select>
      </el-form-item>
      <template v-if="form.deposition_material==1">
        <el-form-item label="文档种类" prop="numbers_of_documents">
          <!-- <el-select v-model="form.numbers_of_documents" placeholder="请选择文档种类">
            <el-option v-for="(item,index) in options.numbers_of_documents" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select> -->
          <static-select type="numbers_of_documents" v-model="numbers_of_documents"></static-select>
        </el-form-item>
      </template>
      <template v-if="form.deposition_material==2">
      <el-form-item label="交存方式" prop="deposition_manner">
        <!-- <el-select v-model="form.deposition_manner" placeholder="请选择交存方式">
          <el-option v-for="(item,index) in options.deposition_manner" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select> -->
        <static-select type="deposition_manner" v-model="form.deposition_manner"></static-select>
      </el-form-item>
      </template>
  </el-form>
</template>
<script>
const rightHash = [
  { text: '发表权', label: 'is_publication_right',},
  { text: '署名权', label: 'is_sign_right', },
  { text: '修改权', label: 'is_modification_right',},
  { text: '复制权', label: 'is_copy_right', },  
  { text: '发行权', label: 'is_distribution_right',},
  { text: '出租权', label: 'is_rent_right',},
  { text: '信息网络传播权', label: 'is_network_distribution_right',},
  { text: '翻译权', label: 'is_translate_right',},
  { text: '应当由著权权人享有的其他权利', label: 'is_other_right',},
]   
export default {
  name: 'copyrightWork',
  props: {
    pageType:{
      type: String,
      default: '',
    }
  },
  computed: {
    rightSet () {
      const arr = [];
      rightHash.forEach((v,k,d)=>{
        arr[k] = d[k];  
      });
      return arr;
    }
  },
  data () {
    return {
      form: {
        version: '',
        main_ipc: '',
        original_flag: '',
        is_authorized: false,
        is_original_registered: false,
        original_register_number: '',
        modification_introduction: '',
        develop_date: '',
        is_original_registration_changed: false,
        registration_change_evidence: '',
        is_published: false,
        publish_date: '',
        develop_mode: '',
        right_acquisition_method: '',
        right_scope: '',
        right_checkbox: [],
        deposition_material: '',
        numbers_of_documents: '',
        deposition_manner: '',
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