<template>  
  	<el-form label-width="100px" :model="form" ref="taskForm" :rules="rules">
      <el-form-item label="是否触发任务" prop="is_task">
        <app-switch type="is" v-model="form.is_task"  @change="val=>{$emit('isTaskChanged', val)}"></app-switch>
      </el-form-item>
      <el-form-item label="管制事项" prop="process_definition" v-if="type == 'add'&&form.is_task==1">
          <static-select type="process_definition" v-model="form.process_definition"></static-select>
        </el-form-item>
        <el-form-item label="事项流程" prop="process_flow"  v-if="type == 'add'&&form.is_task==1">
          <el-select v-model="form.process_flow" clearable placeholder="请选择事项流程">
            <el-option
              v-for="item in flowOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始节点" prop="process_action" v-if="type == 'add'&&form.is_task==1">
          <el-select v-model="form.process_action" clearable placeholder="请选择开始">
            <el-option
              v-for="item in actionOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item> 

  		<el-form-item label="承办人" prop="user"  v-if="type == 'add'&&form.is_task==1">
        <remote-select type="member" v-model="form.user"></remote-select>
  		</el-form-item>

      <el-form-item label="承办期限" prop="due_time" v-if="form.is_task == 1">
        <el-date-picker type="date" v-model="form.due_time" placeholder="请选择承办期限"></el-date-picker>
      </el-form-item>
 
  	</el-form>  
</template>

<script>
import Member from '@/components/form/Member'
import AxiosMixins from '@/mixins/axios-mixins'
import RemoteSelect from '@/components/form/RemoteSelect'
import {mapActions} from 'vuex'

export default {
  name: 'taskEdit',
  mixins: [ AxiosMixins ],
  props: [ 'type', 'row','category' ],
  methods: {
    ...mapActions([
      'refreshUser',
    ]),
 	setForm (data) {
      this.$tool.coverObj(this.form, data);
    },
    submitForm () {
    	if(this.form.is_task==='1') {
      		 return this.$tool.shallowCopy(this.form, { 'date': true });
 		}else {
 			 return this.$tool.shallowCopy(this.form, { 'date': true ,
 			 	skip:['process_flow','process_definition','user','due_time','deadline','process_action'],
 			});
 		}		
    
    },
  	checkForm (callback) {
      let flag = true;
      this.$refs.taskForm.validate(_=>{
        flag = _;
        callback(flag);
      });
  	},
    clear () {
      this.$refs.form.resetFields();
    }, 
    refreshRow () {
      if(this.type == 'edit') {
        
        for( let k in this.form) {
          const d = this.row[k];
          
          if(k == 'attachments') {
            this.form[k] = d.map(_=>_.id);
            this.attachments = d;
          }else if(k == 'user') {
            this.form[k] = {id: d, name: this.row['user_name']};
          }else {
            if(d) {
              this.form[k] = d;  
            }else {
              this.form[k] = "";
            }
          }
        }
      }
    }
    // handleProductChange (d) {
    //   this.category = d.category;
    // }
  },
  data () {
  	return {
  	  form: {
  	  	is_task: 0,
        // project_id: '',
        process_flow: '',
        process_definition: '',
        user: '',
        due_time: '',
        process_action: '',
        deadline: '',
      },
      rules:{
      	'process_flow': [{type: 'number', required: true, message: '请选择任务流程', trigger:' blur,change'}],
      	'process_definition': [{required: true, message: '请选择任务类型', trigger:' blur,change'}],
      	'process_action': [{type: 'number',required: true, message: '请选择流程节点', trigger:' blur,change'}],
      	'user': [{type: 'number', required: true, message: '请选择承办人', trigger:' blur,change'}],
      	'due_time': [{type: 'date', required: true, message: '请选择承办期限', trigger:' change'}],
      	'deadline': [{type: 'date', required: true, message: '请选择官方绝限', trigger:' change'}],
      },
  	}
  },
  computed: {
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
      }
    }
  },
  mounted () {
    this.refreshRow();
  },
  components: { Member, RemoteSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
