<template>  
  	<el-form label-width="110px" :model="form" ref="form" :rules="rules">
      <el-form-item label="案件类型" prop="project_type" v-if="type == 'add'">
        <static-select type="project_type" v-model="form.project_type"></static-select>
      </el-form-item>
      <el-form-item label="案件引用" prop="model" v-if="type == 'add' && form.project_type != null">
        <remote-select :type="projectType" v-model="form.model" ref="project"></remote-select>
      </el-form-item>  
      <el-form-item label="管制事项" prop="process_definition"  v-if="form.model != null">
        <static-select type="process_definition" v-model="form.process_definition"></static-select>
        <!-- <el-select v-model="form.process_definition" placeholder="请选择事件名称">
          <el-option
            v-for="item in defOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="绑定流程" prop="process_flow"  v-if="form.model != null">
        <el-select v-model="form.process_flow" placeholder="请选择绑定流程" @visible-change.once="initFlows">
          <el-option
            v-for="item in flowOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始节点" prop="process_action" v-if="form.model != null">
        <el-select v-model="form.process_action" placeholder="请选择开始">
          <el-option
            v-for="item in actionOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item> 
      <el-row>
        <el-col :span="8" v-if="form.model != null">
          <el-form-item  label="承办人" prop="user">
            <remote-select type="user" v-model="form.user"></remote-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="代理人" prop="agent">
            <remote-select type="user" v-model="form.agent"></remote-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="代理人助理" prop="assistant">
            <remote-select type="user" v-model="form.assistant"></remote-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item  label="初审人" prop="first_reviewer">
            <remote-select type="user" v-model="form.first_reviewer"></remote-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="复审人" prop="final_reviewer">
            <remote-select type="user" v-model="form.final_reviewer"></remote-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="初稿时间" prop="first_edition_deadline">
            <el-date-picker type="date" v-model="form.first_edition_deadline" placeholder="请选择初稿时间"></el-date-picker>
          </el-form-item> 
        </el-col>        
        <el-col :span="8">
          <el-form-item label="递交期限" prop="filing_deadline">
            <el-date-picker type="date" v-model="form.filing_deadline" placeholder="请选择递交期限"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="官方绝限" prop="legal_deadline">
            <el-date-picker type="date" v-model="form.legal_deadline" placeholder="请选择官方绝限"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row> 
      <template v-if="type == 'edit'">
        <el-row>
          <el-col :span="8">
            <el-form-item label="初稿日" prop="first_edition_time">
              <el-date-picker type="date" v-model="form.first_edition_time" placeholder="请选择初稿日"></el-date-picker>
            </el-form-item>      
          </el-col>
          <el-col :span="8">
            <el-form-item label="内部定稿日" prop="internal_final_edition_time">
              <el-date-picker type="date" v-model="form.internal_final_edition_time" placeholder="请选择内部定稿日"></el-date-picker>
            </el-form-item>      
          </el-col>
          <el-col :span="8">
            <el-form-item label="返稿日" prop="customer_edition_time">
              <el-date-picker type="date" v-model="form.customer_edition_time" placeholder="请选择返稿日"></el-date-picker>
            </el-form-item>      
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户定稿日" prop="customer_final_edition_time">
              <el-date-picker type="date" v-model="form.customer_final_edition_time" placeholder="请选择客户定稿日"></el-date-picker>
            </el-form-item>      
          </el-col>
          <el-col :span="8">
            <el-form-item label="递交日" prop="filing_time">
              <el-date-picker type="date" v-model="form.filing_time" placeholder="请选择递交日"></el-date-picker>
            </el-form-item>      
          </el-col>
          <el-col :span="8">
            <el-form-item label="内部撰稿时长" prop="internal_drafting_period">
              <el-input v-model="form.internal_drafting_period" placeholder="请输入内部撰稿时长"></el-input>
            </el-form-item>      
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="内部修改时长" prop="internal_amending_period">
              <el-input v-model="form.internal_amending_period" placeholder="请输入内部修改时长"></el-input>
            </el-form-item>  
          </el-col>
          <el-col :span="8">
            <el-form-item label="内部审核时长" prop="internal_reviewing_period">
              <el-input v-model="form.internal_reviewing_period" placeholder="请输入内部审核时长"></el-input>
            </el-form-item>  
          </el-col>
          <el-col :span="8">
            <el-form-item label="返稿时长" prop="customer_first_edition_period">
              <el-input v-model="form.customer_first_edition_period" placeholder="请输入返稿时长"></el-input>
            </el-form-item>  
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户审核时长" prop="customer_amending_period">
              <el-input v-model="form.customer_amending_period" placeholder="请输入客户审核时长"></el-input>
            </el-form-item>  
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户修改时长" prop="customer_reviewing_period">
              <el-input v-model="form.customer_reviewing_period" placeholder="请输入客户修改时长"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
          </el-col>
        </el-row>    
          <el-form-item label="内部审核次数" prop="internal_reviewing_times">
            <el-select v-model="form.internal_reviewing_times" placeholder="请填写内部审核次数">
              <el-option
                v-for="item in timeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item> 
          <el-form-item label="客户审核次数" prop="customer_reviewing_times">
            <el-select v-model="form.customer_reviewing_times" placeholder="请填写客户审核次数">
              <el-option
                v-for="item in timeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>            
          </el-form-item>
          <el-form-item label="技术评分" prop="technical_rank">
            <el-slider v-model="form.technical_rank" show-input></el-slider>
          </el-form-item>
          <el-form-item label="权利要求评分" prop="claims_rank">
            <el-slider v-model="form.claims_rank" show-input></el-slider>
          </el-form-item>
          <el-form-item label="说明书评分" prop="spec_rank">
            <el-slider v-model="form.spec_rank" show-input></el-slider>
          </el-form-item>
          <el-form-item label="沟通交流评分" prop="communication_rank">
            <el-slider v-model="form.communication_rank" show-input></el-slider>
          </el-form-item>
        </template>        
        <el-form-item label="附件" prop="attachments">
          <upload v-model="form.attachments" :file-list="attachments"></upload>
        </el-form-item>  
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="form.remark" placeholder="请填写备注"></el-input>
        </el-form-item>   
  	</el-form>  
</template>

<script>
import Upload from '@/components/form/Upload'
import AxiosMixins from '@/mixins/axios-mixins'
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'
import JumpSelect from '@/components/form/JumpSelect'
import {mapActions} from 'vuex'

const URL = '/processes';
const typeMap = new Map([
  ['专利', '专利'],
  ['商标', '商标'],
  ['版权', '版权']
]);
export default {
  name: 'taskEdit',
  mixins: [ AxiosMixins ],
  props: [ 'type', 'row' ],
  
  methods: {
    ...mapActions([
      'refreshUser',
      'refreshFlows'
    ]),
    initFlows () {
      this.refreshFlows({type:this.projectType});
    },
    checkForm () {
      return new Promise((reject) => {
        this.$refs.form.validate(flag => {
          if (flag) {
            reject()
          } else {
            this.$message({type: 'warning', message: '请正确填写表单'})
          }
        })
      })
    },
    async add () {
      await this.checkForm()
      const url = URL;
      const data = this.$tool.shallowCopy(this.form, {'date': true,});
      const success = _=>{ 
        // this.dialogVisible  = false;
        this.$emit('addSuccess');
        this.refreshUser();
      };
      const complete = _=>{ this.btn_disabled = false };

      this.btn_disabled = true;
      await this.$axiosPost({url, data, success, complete});  
    },
    async edit () {
      await this.checkForm()
      if(this.form.project_type) {
        this.form.project_type = this.form.project_type['id'];
      }

      const url = `${URL}/${this.row.id}`;
      const data = this.$tool.shallowCopy(this.form, {'date': true,'skip': ['model']});
      const success = _=>{ this.$emit('editSuccess') };
      const complete = _=>{ this.btn_disabled = false };
      this.btn_disabled = true;

      await this.$axiosPut({url, data, success, complete });
    },
    clear () {
      this.form.project_type = '';
      this.$refs.form.resetFields();
    },
    fill (o,f,d) {
      // console.log(o+'/'+f+'/'+d);
      if(typeof this.taskDefsData[0]['id'] === 'string') {
        d = d + '';
      }else{
        d = d - 0;
      }
      this.form.model = o;
      window.setTimeout(_=>{
        this.form.flow_id = f;
        this.$nextTick(_=>{
          this.form.task_def_id = d;
        });
      }, 0);
    }, 
    refreshRow () {
      if(this.type == 'edit') {
        this.$tool.coverObj(this.form,this.row,{
          obj: ['process_flow','process_definition',],
          date: ['first_edition_deadline','first_edition_time','filing_deadline','legal_deadline','internal_reviewing_times','internal_drafting_period',
          'internal_amending_period','internal_final_edition_time','customer_amending_period','customer_reviewing_period','customer_edition_time','filing_time','customer_first_edition_period','customer_final_edition_time'],
        })
        if(this.row.task.process_action) {
          this.form.process_action = this.row.task.process_action['id'];
        }else if (this.row.task.remark) {
          this.form.remark = this.row.task.remark; 
        }else if (this.row.task.attachments && this.row.task.attachments.length != 0) {
           this.form.attachments = this.row.task.attachments.map(_=>_.id); 
        }
      }
    }
  },
  data () {
    const getRules = (message, type) => Object.assign({required: true, trigger: 'change'}, {message, type});
    const validateTask_def = (rule, value, callback) => {
      if(!value) {
         return callback(new Error('管制事项不能为空'));
      }
      if(typeof value === 'string' || typeof value === 'number'){
        callback();
      }else {
        callback(new Error('数据类型应为字符串或者数字'));
      }
    };   
    const validateFlow_node = (rule, value, callback) => {
      if(!value) {
         return callback(new Error('流程节点不能为空'));
      }
      if(typeof value === 'string' || typeof value === 'number'){
        callback();
      }else {
        // console.log()
        callback(new Error('数据类型应为字符串或者数字'));
      }
    };
  	return {
      form: {
        project_type: null,
        model: null,
        process_definition: '',
        process_flow: '',
        process_action: '',
        user: '',
        agent: '',
        assistant: '',
        first_reviewer: '',
        final_reviewer: '',
        first_edition_deadline: '',
        filing_deadline: '',
        legal_deadline: '',
        first_edition_time: '',
        internal_final_edition_time: '',
        customer_edition_time: '',
        customer_final_edition_time: '',
        filing_time: '',
        internal_drafting_period: '',
        internal_amending_period: '',
        internal_reviewing_period: '',
        customer_first_edition_period: '',
        customer_amending_period: '',
        customer_reviewing_period: '',
        internal_reviewing_times: '',
        customer_reviewing_times: '',
        technical_rank: 0,
        claims_rank: 0,
        spec_rank: 0,
        communication_rank: 0,        
        attachments: [],
        remark: '',
      },    
      attachments: [],
      btn_disabled: false,
      rules: {
        project_type: getRules('案件类型不能为空', 'string'),
        model: getRules('案件引用不能为空', 'number'),
        process_definition: getRules('管制事项不能为空', 'number'),
        process_flow: getRules('流程不能为空', 'number'),
        process_action: getRules('开始节点不能为空', 'number'),
        user: getRules('承办人不能为空', 'number'),
        agent: getRules('代理人不能为空', 'number'),
        first_reviewer: getRules('初审人不能为空', 'number'),
        first_edition_deadline: getRules('初稿时间不能为空', 'date'),
        filing_deadline: getRules('递交期限不能为空', 'date'),
      },
       timeOptions: [
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
  	}
  },
  computed: {
    projectType () {
      const config = this.type == 'add'? typeMap.get(this.form.project_type) : '';
      return config;
    },
    flowsData () {
      return this.$store.getters.flowsData;
    },
    flowOptions () {
      if( this.flowsData == undefined) {
        return [];
      }else {
        return this.flowsData;
      }  
    },
    defOptions () {
      let arr =[];
      const f = this.form.process_flow;
      if( !this.flowsData && !this.form.process_flow) {
        return [];
      }else {
       for (let i = 0; i < this.flowsData.length; i++) {
           if(this.flowsData[i].id == f ) {
            return arr = this.flowsData[i].Process_definition;
            break;
          }
        }
      }
    },
    actionOptions () {
     let arr =[];
      const f = this.form.process_flow;
      if( !this.flowsData && !this.form.process_flow ) {
        return [];
      }else {
       for (let i = 0; i < this.flowsData.length; i++) {
           if(this.flowsData[i].id == f ) {
            return arr = this.flowsData[i].process_action;
            break;
          }
        }
      }
    },
  },
  watch: {
    'row.id': {
      handler () {
        this.refreshRow();
      },
    },
    type (val) {
      if(val == 'edit') this.refreshRow();
    }
  },
  mounted () {
    this.refreshRow();
  },
  components: { Upload, RemoteSelect, JumpSelect, StaticSelect, }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
