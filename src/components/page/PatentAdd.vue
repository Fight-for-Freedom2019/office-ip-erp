<template>
  <div class="main">
    <app-shrink :visible.sync="dialogVisible"  :title="title">
      <span slot="header" style="float: right;">
          <el-button type="primary" @click="save(mode)" size="small">保存</el-button>
      </span>
      <el-tabs type="border-card" v-loading="loadingVisible" :element-loading-text="loadingText" style="margin-top:10px;">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-info"></i> 案件信息</span>
          <pa-base ref="base" :type="pageType" @uploadSuccess="handleUploadSuccess"></pa-base>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-info"></i> 商务信息</span>
          <business ref="business" :type="pageType"></business>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 日期&号码</span>
          <person ref="person" :type="pageType"></person>
        </el-tab-pane>
        <el-tab-pane v-if="pageType == 'edit'">
          <span slot="label"><i class="el-icon-menu"></i> 人员信息</span>
          <classification ref="classification"></classification>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label"><i class="el-icon-more"></i> 其它信息</span>
          <other ref="other" :type="pageType" ></other>
        </el-tab-pane>

      </el-tabs>
    </app-shrink>
  </div>
</template>

<script>
const map = new Map([
  ['business', '请正确填写商务信息'],  
  ['base', '请正确填写基本信息'],
  ['person', '请正确填写扩展信息'],
  ['classification', '请正确填写分类信息'],
  ['agent', '请正确填写委案信息'],
  ['case', '请正确填写案件引用信息'],
  ['other', '请正确填写其他信息'],
  ['task', '请正确填写任务信息'],  
]);

const getKeys = ['base', 'person', 'other', 'business'];
const setKeys = ['base', 'person', 'classification', 'other', 'business'];

const URL = '/patents';

import AxiosMixins from '@/mixins/axios-mixins'
import AppCollapse from '@/components/common/AppCollapse'
import PaBase from '@/components/page_extension/PatentAdd_base'
import Person from '@/components/page_extension/PatentAdd_person'
import Classification from '@/components/page_extension/PatentAdd_classification'
import Agent from '@/components/page_extension/PatentAdd_agent'
import Case from '@/components/page_extension/PatentAdd_case'
import Other from '@/components/page_extension/PatentAdd_other'
import Task from '@/components/page_extension/PatentAdd_task'
import Business from '@/components/page_extension/PatentAdd_business'
import AppShrink from '@/components/common/AppShrink'
import {mapActions} from 'vuex'

export default {
  name: 'patentAdd',
  props: ['pageType'],
  data () {
    return {
      id: '',
      pop_type: '',
      btn_disabled: false,
      list: [],
      mode:'edit',
      dialogVisible: false,
      title:'',
      loadingVisible:false,
      loadingText:'专利数据加载中...',
    }
  },
  methods: {
    ...mapActions([
      'refreshUser',
    ]),
    async add (form) {
      const flag = await this.formCheck();
      if(flag) {
        const url = URL;
        const data = Object.assign( ...getKeys.map(_=>this.$refs[_].submitForm()), {list: this.list} );
        
        const success = _=>{ 
          this.$message({message: '新建专利成功', type: 'success'});
          this.refreshUser();
          this.$router.push('/patent/draftbox');
          this.$emit('addSuccess'); 
        };
        const complete = _=>{
          this.btn_disabled = false;
        }
        
        this.$axiosPost({url, data, success});
      }
    },
    async edit () {
      const flag = await this.formCheck();
      if(flag) {
        const url = `${URL}/${this.id}`;
        const data = Object.assign( ...setKeys.map(d=>this.$refs[d].submitForm()) );
        console.log(data);
        const success = _=>{ 
          this.$message({message: '专利更新成功，注意代理机构账号仅能修改代理人与代理所账号', type: 'success'});
          this.$emit('editSuccess');
          // this.$router.push('/patent/list');
        };
        const complete = _=>{
          this.btn_disabled = false;
        }

        this.btn_disabled = true;
        return this.$axiosPut({url, data, success, complete});
      }
    },
    show(id) {
      this.dialogVisible = true;
      this.loadingVisible = true;
      const url = `${URL}/${id}`;
      const success = _=>{ 
        const patent = _.patent;
        this.refreshForm(patent);
        this.loadingVisible = false;
      };
      this.$axiosGet({url, success});

    },
    clear () {
      this.$refs.form.resetFields();
      this.attachments = [];
      this.list = [];
    },
    formCheck () {
      return new Promise((resolve) => {
        //递归检测
        const check = (index) => {
          const key = getKeys[index];
          console.log(key);
          if(key) {
            this.$refs[key].checkForm(_=>{
              if(_) {
                check(index+1);
              }else {
                this.$message({message: map.get(key), type: 'warning'});    
                resolve(false);
              }
            })  
          }else {
            resolve(true);
          }
        }

        check(0);
      });
    },  
    cancel () {
      this.$router.push('/patent/list');
    },      
    refreshForm (val) {
      if( this.pageType == 'edit' && this.$tool.getObjLength(val) != 0) {
        const copy = this.$tool.deepCopy(val);
        this.id = copy.id;
        this.title = val.serial + '-' + val.title;
        setKeys.map(_=>this.$refs[_].setForm(copy));
      }
    },
    fillForm ([val,type]) {
      if(val instanceof Array && val.length != 0){
        const copy = this.$tool.deepCopy(val);
        // this.id = copy[0].id;
        const relates = [];
        if(type) {
          val.map(_=>{
            relates.push({id: _.id, name: _.title, type: type});
          })
        }
        const form = {};  
        const data = this.$tool.normalFilter(copy[0],{
          stay:['serial','title','area','type', 'ipr','level',"applicants","inventors",'priorities',"extension", 'attachments','proposer','group_number','family_number','legal_status','branch','products','classification','tags','main_ipc','project_name','project_serial',"product_relevance"]
        });
        Object.assign(form, data, {relates} );
        setKeys.map(_=>{
          if(this.$refs[_]) {

            this.$refs[_].setForm(form);
          }
        })
      }
    },
    proposalFill (v) {
      if(v instanceof Array && v.length != 0){
        const copy = this.$tool.deepCopy(v);
        const proposals = [];
        v.map(_=>{
          proposals.push({id:_.id,name:_.title});
        });
        const form = {};
        Object.assign(form, copy[0],{proposals});
        setKeys.map(_=>{
          if(this.$refs[_]){
            this.$refs[_].setForm(form);
          }
        })
      }
    },    
    handleUploadSuccess (d) {

      if( !d.data || !d.data.list ) {
        return;
      }
      //2锁定title disclosure_type
      if (d.data.list.is_disclosure == 1) {

        this.list.push(d.data.list);
        
        let disclosure_type = d.data.list.disclosure_type;
        disclosure_type = disclosure_type !== undefined ? disclosure_type : ''; 
        
        getKeys.forEach(_=>{
          this.$refs[_].setForm(d.data.list, true, disclosure_type);
        });

      }else if(d.data.list.is_disclosure == 2) {
        this.$message({type: 'warning', message: '文件识别失败'});
      }
      
    }
  },
  computed: {
    detail () {
      return this.$store.getters.detailBase;
    },
    getQuery () {
      const s = this.$route.query.s; 
      const t = this.$route.query.t;
      return [s,t];
    },
    getParams () {
      const d = this.$route.params.dataobj;
      return d;
    },
  },
  watch: {
    'detail': {
      handler: function(val) {
        this.refreshForm(val);
      }
    }, 
    'getQuery': {
      handler: function(val) {
        this.fillForm(val);
      }
    },
    'getParams': {
      handler: function(val) {
        this.proposalFill(val);
      }
    }, 
  },
  mounted () {
    this.refreshForm(this.detail);
    this.$nextTick(_=>{
        this.fillForm(this.getQuery);
    });
    this.$nextTick(_=>{
      this.proposalFill(this.getParams);
    })
  },
 components: { 
    PaBase, 
    Person, 
    Classification, 
    Agent, 
    Case, 
    Other, 
    AppCollapse,
    Task,
    Business,
    AppShrink,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-form {
  padding-top: 22px;
}
.el-form-item {
  padding: 0 15px;
}
</style>