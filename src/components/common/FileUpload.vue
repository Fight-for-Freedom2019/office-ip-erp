<template>
  <div title="文件上传" :visible.sync="dialogVisible" class="dialog-medium">  
    <el-upload
      :action="upload_url"
      :on-success="handleSuccess"
      drag
      :headers="auth"
      multiple
      style="line-height: 40px;display:inline-block;width:200px;"
      :show-file-list="false"
    >
      <div class="el-upload__text"><em>单/多文件上传</em></div>
    </el-upload>
    <el-upload
      :action="zip_upload_url"
      :on-success="handleSuccess"
      drag
      :headers="auth"
      multiple
      style="line-height: 40px;display:inline-block;width:200px;"
      :show-file-list="false"
      v-if="!config.no_zip"
    >
      <div class="el-upload__text"><em>压缩包批量上传</em></div>
    </el-upload>

    <el-table
      height="250"
      style="width: 100%; margin-bottom: 10px;"
      empty-text="暂无可上传数据"
      :data="tableData"
    >
      <el-table-column label="文件名称" prop="name" width="150"></el-table-column>
      <el-table-column label="关联案件" prop="project" min-width="120">
        <template slot-scope="scope">
          <jump-select :type="config.type" v-model="scope.row.project" single></jump-select>
        </template>
      </el-table-column>
      <el-table-column label="关联账单" prop="invoice" min-width="80"  v-if="config.invoice">
        <template slot-scope="scope">
          <jump-select type="invoices" v-model="scope.row.invoice" single  v-show="!!tableData[scope.$index]['show_invoice']"></jump-select>
        </template>
      </el-table-column>
      <el-table-column label="文件类型" prop="type" min-width="120" v-if="config.file_type || config.is_show">
        <template slot-scope="scope">
          <span v-if="config.is_show">{{scope.row.file_type.name}}</span>
          <static-select :type="config.select_type" v-model="scope.row.file_type" style="width: 100%;" @change="val=>{handleTypeChange(val, scope.$index)}" :ref="`file_type_${scope.$index}`" v-else></static-select>
        </template>
      </el-table-column>
      <el-table-column label="发文日" prop="mail_date" min-width="100" v-if="config.mail_date || config.is_show">
        <template slot-scope="scope">
          <span v-if="config.is_show">{{scope.row.mail_date}}</span>
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="scope.row.mail_date" style="width: 100%;" v-show="!!tableData[scope.$index]['show_mail_date']" v-else></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="官方绝限" min-width="100" prop="legal_deadline" v-if="config.legal_deadline || config.is_show" >
        <template slot-scope="scope">
          <span v-if="config.is_show">{{scope.row.legal_deadline}}</span>
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="scope.row.legal_deadline" style="width: 100%;" v-show="!!tableData[scope.$index]['show_legal_deadline']" v-else></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="申请日" min-width="100" prop="application_date" v-if="config.application_date || config.is_show">
        <template slot-scope="scope">
          <span v-if="config.is_show">{{scope.row.application_date}}</span>
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="scope.row.application_date" style="width: 100%;" v-show="!!tableData[scope.$index]['show_application_date']" v-else></el-date-picker>
        </template>
      </el-table-column>      
      <el-table-column label="申请号"  min-width="100" prop="application_number" v-if="config.application_number || config.is_show">
        <template slot-scope="scope">
          <span v-if="config.is_show">{{scope.row.application_number}}</span>
          <el-input v-model="scope.row.application_number" style="width: 100%;" v-show="!!tableData[scope.$index]['show_application_number']" v-else></el-input>
        </template>
      </el-table-column>       
      <el-table-column label="授权日" min-width="100" prop="issue_date" v-if="config.issue_date">
        <template slot-scope="scope">
          <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="scope.row.issue_date" style="width: 100%;" v-show="!!tableData[scope.$index]['show_issue_date']"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="授权号" min-width="100" prop="issue_number" v-if="config.issue_number">
        <template slot-scope="scope">
          <el-input v-model="scope.row.issue_number" style="width: 100%;" v-show="!!tableData[scope.$index]['show_issue_number']"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="费用" min-width="80" prop="fees" v-if="config.fees || config.is_show" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag v-for="(item, index ) in scope.row.fees" :key="index">{{ `${item.name}：${item.fee}` }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button icon="delete" size="mini" type="text" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
        
      
    </el-table>
    
    <el-button type="primary" @click="importData" :loading="loading" :disabled="disabled">{{ loading ? '上传中...' : '确认上传' }}</el-button>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import RemoteSelect from '@/components/form/RemoteSelect'
import JumpSelect from '@/components/form/JumpSelect'
import StaticSelect from '@/components/form/StaticSelect'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

const config = [
  ['oa', {
    action: 'parseNotices',
    url: '/files/oa',
    type: 'oa',
    select_type: 'file_type_oa',
    file_type:true,
    mail_date: true,
    issue_date: true,
    issue_number: true,
    legal_deadline: true,
    application_number: true,
    application_date: true,
    is_show:false,
  }],
  ['voucher', {
    action: 'parseVoucher',
    url: '/files/voucher',
    type: 'voucher',
    select_type: 'file_type_voucher',
    file_type:true,
    invoice: true,
    fees:true,
    is_show:false,
  }],
  ['other', {
    action: 'parseFiles',
    url: '/files/other',
    type: 'other',
    select_type: 'file_type_other',
    file_type:true,
    is_show:false,
  }],
  ['cpc', {
    action: 'parseCpc',
    url: '/cpc_notices',
    type: 'cpc',
    select_type: 'file_type_cpc',
    file_type:true,
    mail_date: true,
    legal_deadline: true,
    application_number: true,
    application_date: true,
    fees: true,
    is_show:true,
  }],
]
const map = new Map(config);

export default {
  name: 'fileUpload',
  mixins: [ AxiosMixins ],
  props: {
    'type': null,
  },
  data () {
    return {
      fileList: [],
      tableData: [],
      copyTableData: [],
      file: [],
      dialogVisible: false,
      dialogVisibleIn: false,
      project_id: '',
      $index: null,
      loading: false,
      disabled: false,
    }
  },
  computed: {
    ...mapGetters([
      'menusMap',
    ]),
    auth () {
      return { Authorization: window.localStorage.getItem('token') }
    },
    config () {
      const config = map.get(this.type);
      return config ? config : this.type;
    },
    upload_url () {
      const action = this.config.action;
      let url = '/files';
      if(action != '') {
        url += `?action=${action}`;
      }

      return url;
    },
    zip_upload_url () {
      const action = this.config.action;
      let url = '/files';
      if(action != '') {
        url += `?action=${action}&is_zip=1`;
      }

      return url;
    }
  },
  methods: {
    ...mapActions([
      'initializeSelectorCache',
    ]),
    show () {
      this.project_id = "";
      this.dialogVisible = true;
    },
    design() {
      const o = this.$tool.deepCopy(this.tableData[this.$index]);
      o.project_id = this.project_id;

      this.tableData.splice(this.$index, 1, o);
      this.dialogVisible = false;
    },
    handleTypeChange (selected, index) {
      let f;
      if(!selected) {
        f = {};
      }else {
        f = selected.fields;
      }
      if (!f) return;
      const copy = this.$tool.deepCopy(this.tableData[index]);
      copy['show_mail_date'] =f.mail_date == 1 &&this.config.mail_date ? true : false;
      copy['show_legal_deadline'] = f.deadline == 1 && this.config.legal_deadline ? true : false;
      copy['show_application_date'] = f.application_date == 1 && this.config.application_date ? true : false;
      copy['show_issue_date'] = f.issue_date == 1 && this.config.issue_date ? true : false;
      copy['show_issue_number'] = f.issue_number == 1 && this.config.issue_number ? true : false;
      copy['show_application_number'] = f.application_number == 1 && this.config.application_number ? true : false;
      copy['show_invoice'] = f.invoice == 1 && this.config.invoice ? true : false;
      copy['show_fees'] = f.fees == 1 && this.config.fees ? true : false;

      this.tableData.splice(index, 1, copy);

      //这里使用强制刷新 无法触发更新（why？可能是数据 不在当前组件强制刷新的作用范围内）
    //只有使用数组截取的方法 让它自动检测刷新了 麻烦一些 比起直接在row上进行修改
      // this.$forceUpdate();
    
    },
    designPop (scope) {
      this.$index = scope.$index;
      this.dialogVisibleIn = true;
    },
    deleteSingle (scope) {
      this.tableData.splice(scope.$index, 1);
    },
    importData () {
      
      if(this.tableData.length == 0) {
        return this.$message({message: '上传数据不能为空', type: 'warning'});
      }

      for(let d of this.tableData) {
        // if( this.config.time && !d.time ) {
        //   return this.$message({message: '发文日不能为空', type: 'warning'});
        // }
        if( !d.project  ) {
          return this.$message({message: '关联案件不能为空', type: 'warning'});
        }
        if( !d.file_type ) {
          return this.$message({message: '文件类型不能为空', type: 'warning'});
        }
      }

      const url = this.config.url;
      const list = this.$tool.deepCopy(this.tableData);
      const list2 = [];
      for(let i = 0; i < list.length; i++ ) {
        const _ = list[i];
      const obj = this.$tool.shallowCopy(_,{skip:['show_legal_deadline','show_application_number','show_issue_number','show_issue_date','show_mail_date'
        ,'show_fees', 'show_invoice', 'show_application_date','name',
      ],date: true});

        const o = {};
        o.file_id = _.file_id;
        o.project = _.project;
        o.name = _.name;
        o.file_type = _.file_type;
        if(_.subfile) {
          o.subfile = _.subfile;
        }
        if(_.zip) {
          o.zip = _.zip;
        }
        if(_.show_mail_date) {
          if(_.mail_date) {
            o.mail_date = this.$tool.getDate( new Date(_.mail_date) );
          }else {
            return this.$message({type: 'warning', message: '请填写发文日'});
          }
        }
          if(_.show_legal_deadline) {
            if(_.legal_deadline) {
              o.legal_deadline = this.$tool.getDate( new Date(_.legal_deadline) );
            }else {
              return this.$message({type: 'warning', message: '请填写官方绝限'}); 
            }
          }
          if(_.show_application_date) {
            if(_.application_date) {
              o.application_date = this.$tool.getDate( new Date(_.application_date) );
            }else {
              return this.$message({type: 'warning', message: '请填写申请日'}); 
            }
          }        
          if(_.show_issue_date) {
            if(_.issue_date) {
              o.issue_date = this.$tool.getDate( new Date(_.issue_date) );
            }else {
              return this.$message({type: 'warning', message: '请填写授权日'}); 
            }
          }
          if(_.show_application_number) {
            if(_.application_number) {
              o.application_number = _.application_number;
            }else {
              return this.$message({type: 'warning', message: '请填写申请号'}); 
            }
          }
          if(_.show_issue_number) {
            if(_.issue_number) {
              o.issue_number = _.issue_number;
            }else {
              return this.$message({type: 'warning', message: '请填写授权号'}); 
            }
          }
          if(_.show_pct_search_date) {
            if(_.pct_search_date) {
              o.pct_search_date = this.$tool.getDate( new Date(_.pct_search_date) );
            }else {
              return this.$message({type: 'warning', message: '请填写国际检索日期'}); 
            }
          }
          if(_.show_pct_search_result) {
            if(_.pct_search_result) {
              o.pct_search_result = _.pct_search_result;
            }else {
              return this.$message({type: 'warning', message: '请填写检索结论摘要'}); 
            }
          }

        list2.push(obj);  
      }
      const data = { list: list2};
      const success = _=>{
        this.clear();
        this.$message({message: '上传文件成功', type: 'success'});
        this.$emit('uploadSuccess');
      };
      const complete = _=>{
        this.loading = false;
        this.disabled = false;
      }

      this.loading = true;
      this.disabled = true;
      this.$axiosPost({url, data, success, complete});
    },
    handleSuccess (a,b,c) {
      const l = this.tableData.length;
      const lists = [];
      if(a.status) {
        
        a.data.list.forEach((_, key)=>{ 
          // _.time = '';
          // _.legal_deadline = '';
          // _.application_date = '';
          // _.issue_date = '';
          // _.issue_number = '';
          // _.application_number = '';
          // _.pct_search_result = '';
          // _.pct_search_date = '';
          if(_.code) {
            _.name = _.code.name;
          }   
          if(_.type) {
            _.type =  _.type.id-0;
          }
          lists.push(this.$tool.deepCopy(_));

          // _.type = '';
        });
        this.tableData.push(...a.data.list);
          this.file.push(a.data.file);
          this.$nextTick(_=>{
           lists.forEach((v,k)=>{
               this.tableData.splice(k+l,1,v);
            })
          this.copyTableData.push(...a.data.list);
          })
      }else {
        this.$message({message: a.info, type: 'warning'});
      }
    },
    arrayRender (row, col) {
      const arr = row[col.prop];
      return col.render ? col.render(arr) : arr;
    },
    handleDelete (index) {
      this.tableData.splice(index, 1);
      this.file.splice(index, 1);
    },
    clear () {
      this.file = [];
      this.tableData = [];
    }
  },
  created () {
    this.initializeSelectorCache({type: this.config.select_type});
  },
  watch: {
    'copyTableData':[ 
      function handle1(val) {
        val.forEach((v,i)=>{
          if(v.file_type != null) {
            this.$nextTick(()=>{
              if (!this.config.is_show) {
                const s = this.$refs[`file_type_${i}`].getSelected(v.file_type.id)[0]
                this.handleTypeChange(s,i)
              }
            })
          }
       })
      },
    ]
  },
  components: { 
    RemoteSelect,
    JumpSelect,
    StaticSelect,   
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>