<template>
  <div class="main">
  		<table-component :tableOption="tableOption" :data="tableData" @refreshTableData="refreshTableData" ref="table" >
        <!-- <el-select v-model="mailbox" slot="mailbox" style="width: 150px">
          <el-option v-for="item in options.mailbox" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select> -->
      </table-component>
      <Detail ref="mail_detail"></Detail>
      <app-shrink :visible.sync="shrinkVisible" :title="`邮件`">
        <mail-add @refresh="refresh" ref="mail_add"></mail-add>
      </app-shrink>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import Strainer from '@/components/page_extension/MailList_strainer'
import AxiosMixins from '@/mixins/axios-mixins'
import Detail from '@/components/page_extension/Email_detail'
import MailAdd from '@/components/page/MailAdd'
import AppShrink from '@/components/common/AppShrink'

const URL = '/mails';

export default {
  name: 'mailList',
  mixins: [ AxiosMixins ],
  data () {
		return {
		  options: {
        mailbox: [
  		  	{ label: '收件箱', value: 1 },
  		  	{ label: '发件箱', value: 2 },
          { label: '草稿箱', value: 0 },
  		  ] 
      },
		  props: {
		  	'label': 'label',
		  	'children': 'children',
		  },
		  currentNodeKey: 1,
		  tableOption: {
        'name': 'mailList',
        'url': URL,
		  	'header_btn': [
		  		{ type: 'custom', label: '写邮件', icon: 'edit', click: this.add },
		  		{ type: 'delete' },
          {type: 'control'},
		  	],
        'height': 'default',
        'header_slot': [ 'mailbox' ],
		  	// 'is_search': false,
		  	'columns': [
		  		{ type: 'selection'},
		  		 {type: 'text', label: '邮件类型', prop: 'mail_type', render_simple: 'name', width: '100' },
          {type: 'text', label: '邮件标题', prop: 'subject', min_width: '120'},
          {type: 'text', label: '发送时间', prop: 'sent_time', width: '200'},
          {type: 'text', label: '发件人', prop: 'sender', render_simple: 'name', width: '160'},
          {type: 'array', label: '收件人', prop: 'recipients', width: '160'},
          {type: 'array', label: '抄送', prop: 'cc', render:_=>_.map(_=>`${_.title}_${_.email}`), width: '160'},
		  		{ 
		  			type: 'action',
            width: '150',
		  			btns: [
              { type: 'custom', click: this.edit, label: '编辑&补发',},
		  				{ type: 'delete', click: this.mailDelete },
		  			],  
		  		}
		  	],
        rowClick: this.handleRowClick,

		  },
		  tableData: [],
		  filter: {},
      mailbox: 1,
      shrinkVisible: false,
		}
  },
  methods: {
  	add () {
      this.shrinkVisible = true;
  	},
    edit (row) {
      this.shrinkVisible = true;
      this.$nextTick(_=>{
        this.$refs.mail_add.setForm(row);
      })
    },
    refreshTableData (option) {
      const url = URL;
      const mailbox = {'mailbox': this.mailbox};
      const data = Object.assign({}, this.filter, option,);
      const success = _=>{this.tableData = _.mails;}

      this.axiosGet({url, data, success});
    },
    refresh () {
      this.$refs.table.refresh();
    },
    update () {
      this.$refs.table.update();
    },
    handleCurrentChange (data) {
      this.setCurrent(data.value);
    },
    setCurrent (id) {
      this.currentNodeKey = id;
      this.refresh(); 
    },
  	mailDelete ({id}) {
      const url = `${URL}/${id}`;
      this.$confirm(
        '此操作将永久删除该邮件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          const success = _=>{ 
          this.update();
          this.$message({message: '删除邮件成功', type: 'success'}) 
        };

        this.axiosDelete({url, success});
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
    },
    handleRowClick ({id}) {
      this.$refs.mail_detail.show(id);
    }
  },
  watch: {
    mailbox () {
      this.refresh();
    }
  },
  mounted () {
    this.refresh();
  },
  components: { TableComponent, Strainer, Detail, MailAdd, AppShrink },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>