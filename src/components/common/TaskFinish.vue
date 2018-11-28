<template>
<div v-loading="loading"  element-loading-text="数据加载中" >
  <el-steps :space="150" style="padding: 5px 40px;" v-if="data.tips" align-center>
    <el-step v-for="(item, index) in data.tips" :key="index" :title="item.name" :status="item.current ? 'finish' : 'wait'"></el-step>
  </el-steps>
  <el-collapse v-model="activeName">
    <el-collapse-item  name="1" v-if="processData">
       <template slot="title">
        任务详情<el-button size="mini" type="text" style="margin-left: 10px;" v-if="ifMore" @click.stop="dropDetial">更多...</el-button>
      </template>
      <el-form label-width="80px" label-position="left" class="form-information">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="节点名称" style="height:36px;"><span class="form-item-text" style="display:inline-block;max-width: 120px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" :title="actionName">{{ actionName }}</span></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="节点期限"><span class="form-item-text">{{ processData.task.deadline }}</span></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="代理人助理" style="height:36px;"><span class="form-item-text" style="display:inline-block;max-width: 120px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" :title="assistantName">{{ assistantName }}</span></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承办人" style="height:36px;"><span class="form-item-text" style="display:inline-block;max-width: 120px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" :title="userName">{{ userName }}</span></el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="管制期限"><span class="form-item-text">{{ processData.filing_deadline }}</span></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="代理人" style="height:36px;"><span class="form-item-text"  style="display:inline-block;max-width: 120px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" :title="agentName">{{ agentName }}</span></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="IPR"><span class="form-item-text">{{ iprName }}</span></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="官方绝限"><span class="form-item-text">{{ processData.legal_deadline }}</span></el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="申请日"><span class="form-item-text">{{ processData.application_date }}</span></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请号"><span class="form-item-text">{{ processData.application_number }}</span></el-form-item>
          </el-col>
          <el-col :span="6">
          </el-col>
          <el-col :span="6">
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注"><span class="form-item-text">{{ processData.task.remark }}</span></el-form-item>
        </el-row>
      <!--   <el-form-item label="附件">
            <app-table v-if="processData.attachments.length > 0" :columns="columns" :data="processData.attachments"></app-table>
            <span v-if="processData.attachments.length == 0">无附件</span>
        </el-form-item> -->
      </el-form>
    </el-collapse-item>
    <el-collapse-item title="任务处理" name="2">
        <app-form :source="sourceForm" :rules="appFormRules" @formData="handleForm" ref="appForm">
            <el-form-item label='审核意见' v-if="is_review">
              <app-radio
                v-model="review_opinion" 
                v-for="item in checkArr"
                :value="item.value"
                :key="item.value"
                :label="item.label"
                @change="checkRadio"
              >
              {{ item.label }}
              </app-radio>
            </el-form-item> 
            <template slot="app-button">
              <el-form-item style="margin-bottom: 0px;">
                <el-button type="primary" @click="submitFunc" :loading="btn_disabled">{{ btn_disabled ? '提交中...' : '提交' }}</el-button>
              </el-form-item>
            </template>
        </app-form>
  </el-collapse-item>
  </el-collapse>
</div>
</template>

<script>
import axiosMixins from '@/mixins/axios-mixins'
import Upload from '@/components/form/Upload'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'
import AppSwitch from '@/components/form/AppSwitch'
import AppTable from '@/components/common/AppTable'
import AppRadio from '@/components/form/AppRadio'
import AppForm from '@/components/form/AppForm'
import { map as formMap } from '@/const/formConfig'

import {mapMutations} from 'vuex'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

const URL = `/tasks`;
const pointMap = new Map([
  ['pass', {value: 'pass', label: '通过'}],
  ['amend', {value: 'amend', label: '退回修改'}],
  ['reject', {value: 'reject', label: '拒绝'}],
]);
export default {
  name: 'taskFinish',
  props: ['id','row'],
  data () {
    return {
      sourceForm: [],
      activeName:['1', '2'],
      'data': {},
      'review_opinion': '',
      'appFormRules': {},
      'description': '',
      'tasksData': '',
      'form': {},
      'columns':[
        { type: 'text', label: '附件名称', prop: 'name' },
        { type: 'text', label: '附件格式', prop: 'ext' },
        { type: 'text', label: '附件大小 ', prop: 'size' },
        { 
          type: 'action', 
          label: '详情',
          btns: [
            {type: 'view', click: ({viewUrl})=>{window.open(viewUrl)}},
            {type: 'download', click: ({downloadUrl})=>{window.open(downloadUrl)}},
          ],
        }
      ],
      'loading': false,
      'btn_disabled': false,
      'attachments': [],
      'confirmValidator': { 
          required: true,
          validator: (a,b,c)=>{

            if(b) {
              c();
            }else {
              c('必需确认送件信息完整');
            }

          },
        },
      
    }
  },
  created () {
    if(this.row) {
      this.refreshDetail();
    }
    this.refreshProcessDetail({id: this.id});
  },
  methods: {
    ...mapMutations([
      'showAgencyLoad',
    ]),
    ...mapActions([
      'refreshUser',
      'refreshDetailData',
      'refreshProcessDetail',
    ]),
    refreshData () {
      this.loading = true;
      const arr = []; 
      const url = `${URL}/${this.taskId}/form`;
      const success = d=>{
        const response = d.data;
        this.data = response;
        if(response.review_opinion && response.review_opinion.length != 0) {
          this.review_opinion = response.review_opinion[0];
        }
        if(response.forms && response.forms.length != 0) {
          response.forms.forEach(_=>{
            const staticConfig = formMap.get(_.field_type);
            if(_.is_required) {
              this.$set(this.appFormRules, _.field_type, staticConfig.rules);
            }
            const obj = Object.assign({}, staticConfig, _);
            arr.push(obj);
          })
          this.sourceForm = arr;
        }
      };
      const complete = _=>{ 
        this.loading = false; 
      }
      this.$axiosGet({url, success, complete});
    },
    submitFunc () {
      this.$refs.appForm.$refs.form.validate(_=>{
        if(_) {
          this.btn_disabled = true;
          const url = `${URL}/${this.taskId}/nexttask`;
          const reviewObj= this.is_review ? {'review_opinion': this.review_opinion} : {};
          const data = Object.assign({}, reviewObj , this.form);
          const success = ()=>{ 
            this.$message({type: 'success', message: '完成任务成功'});
            this.refreshUser();          
            this.$emit('submitSuccess', data);
          };

          const complete = _=>{ this.btn_disabled=false }; 
          this.$axiosPost({url, data, success, complete}); 
        }else {
          this.$message({message: '请正确填写任务完成字段', type: 'warning'})
        }
      })
    },
    cancel () {
      this.$emit('cancel');
    },
    handleMore (type) {
      this.$emit('more',type);
    },
    clear () {
      this.$refs.form.resetFields();
    },
    proposalFinish ({remark, attachments}) {
      this.form.remark = remark;
      this.form.attachments = attachments.map(_=>_.id);
      this.hide_r_a = true;
    },
    dropDetial () {
      if(this.row.category == 1){
        this.$emit('more', 'patent');
      }
      if(this.row.category == 3) {
        this.$emit('more', 'copyright');
      }
    },
    handleForm (val) {
      this.form = val;
    },
    checkRadio (val) {
      console.log(val)
    },
    refreshDetail() {
      this.loading = true;
      this.refreshDetailData({
      id: this.row.project_id,
      type: {1: 'patent', 3: 'copyright'}[this.row.category],
      func: _=>{
        this.loading = false;
      }
      })
    },
  },
  watch: {
    row(val) {
      this.refreshDetail();
      this.refreshProcessDetail({id: val.id});
    },
    // id (val) {
    //   // this.clear();
    //   this.refreshProcessDetail({id: val});
    // },
    taskId () {
      this.refreshData(); 
    }
  },
  computed: {
    ...mapGetters([
      'menusMap',
      'tasksDetail',
      'processData',
    ]),
    taskId () {
      return this.tasksDetail.id;
    },
    actionName () {     
      return this.processData.task && this.processData.task.process_action != null ? this.processData.task.process_action.name : '';
    },
    assistantName () {
      return this.processData.assistant != null ? this.processData.assistant.name : '';
    },
    userName () {
      return this.processData.user != null ? this.processData.user.name : '';
    },
    agentName () {
      return this.processData.agent != null ? this.processData.user.name : '';
    },
    iprName () {
      return this.processData.ipr !=null ? this.processData.ipr.name : '';
    },
    ifMore () {
      if(this.row && this.row.category == 1) {
        return (this.menusMap && !this.menusMap.get('/patent/detail_panel'));
      }else if(this.row && this.row.category == 3){
        return (this.menusMap && !this.menusMap.get('/copyright/detail_panel'));
      }else {
        return false;
      }
    },
    is_review () {
      const ol = this.$tool.getObjLength(this.data);
      return ol && this.data.is_review_action ? this.data.is_review_action : false;
    },
    pointData () {
      const ol = this.$tool.getObjLength(this.data);
      return ol && this.data.review_opinion ? this.data.review_opinion : [];
    },
    checkArr () {
      let arr = [];
      this.pointData.filter(v=>{
        const d = pointMap.get(v);
        arr.push(d);
        console.log(arr)
      });
      return arr;
    },    
  },
  components: {  Upload, RemoteSelect, StaticSelect, AppSwitch, AppTable, AppRadio, AppForm }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
