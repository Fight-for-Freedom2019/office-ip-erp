// 专利类型
import reasons from './reasons'

function vm() {
  const template = `
        <el-form :model="form" ref="form" label-width="120px">
          <el-form-item label="变更项目" prop="type">
            <el-select v-model="form.type" value-key="id" @change="changeProject" placeholder="请选择变更项目">
              <el-option
                v-for="item in change_project"
                :key="item.value.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="变更理由" prop="reason">
            <el-select v-model="form.reason" value-key="id" @change="changeReasons" placeholder="请选择变更理由">
              <el-option
                v-for="item in change_reasons"
                :key="item.value.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证明文件种类" prop="evidence">
            <el-select v-model="form.evidence" value-key="id" @change="changeEvidence" placeholder="请选择证明文件种类">
              <el-option
                v-for="item in change_evidence"
                :key="item.value.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
    `;
  const options = {
    data: {
      extendData: {
        type:"",
        reason:"",
        evidence:""
      },
      form:{
        type:"",
        reason:"",
        evidence:""
      },
      change_project:[],
      project:[],
      change_reasons:[],
      reasons:[],
      change_evidence:[],
      evidence:[],
    },
    methods:{
      changeProject(val){
        this.form.reason = "";
        this.form.evidence = "";
        this.change_reasons = [];
        this.change_evidence = [];
        window.$fc_citations_info = null;
        let arr = reasons.filter((item)=>item.id === val.id);
        this.reasons = arr[0].child;
        arr[0].child.forEach((reason)=>{
          this.change_reasons.push({value:{id:reason.id,name:reason.name},label:reason.name})
        })
      },
      changeReasons(val){
        this.form.evidence = "";
        this.change_evidence = [];
        window.$fc_citations_info = null;
        let arr = this.reasons.filter((item)=>item.id === val.id);
        this.evidence = arr[0].child;
        arr[0].child.forEach((reason)=>{
          this.change_evidence.push({value:{id:reason.id,name:reason.name},label:reason.name})
        })
      },
      changeEvidence(val){
        this.changeE(val);
      },
      changeE(val,noSave = true){
        let arr = this.evidence.filter((item)=>item.id === val.id);
        window.$fc_citations_info = arr[0];
        noSave?this.saveData():"";
      },
      paddingData(){
        for (let key in this.extendData){
          if(this.extendData.hasOwnProperty(key)) {
            this.form[key] = this.extendData[key];
          }
        }
      },
      saveData(){
        for (let key in this.form){
          if(this.form.hasOwnProperty(key)) {
            this.extendData[key] = this.form[key];
          }
        }
      },
    },
    created(){
      reasons.forEach((item)=>{
        let obj = {value:{id:item.id,name:item.name},label:item.name};
        this.change_project.push(obj);
      })
      this.extendData.type?this.changeProject(this.extendData.type):"";
      this.extendData.reason?this.changeReasons(this.extendData.reason):""
      this.extendData.evidence?this.changeE(this.extendData.evidence,false):"";
      this.paddingData();
    },
  };
  return {
    custom: true,
    vm: options,
    template: template,
    col:{
      labelWidth:"0px"
    },
    // label: label,
    field: "__pt",
  };
}

export {vm}