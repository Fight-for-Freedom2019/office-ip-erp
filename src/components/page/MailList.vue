<template>
  <div class="main">
  		<table-component :tableOption="tableOption" :data="tableData" @refreshTableData="refreshTableData" ref="table" >
        <!-- <el-select v-model="mailbox" slot="mailbox" style="width: 150px">
          <el-option v-for="item in options.mailbox" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select> -->
      </table-component>
      <mail-add @refresh="handleRefresh" ref="mail_add"></mail-add>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import Strainer from '@/components/page_extension/MailList_strainer'
import AxiosMixins from '@/mixins/axios-mixins'
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
		  		// { type: 'delete' },
          {type: 'control'},
		  	],
        'height': 'default',
        'header_slot': [ 'mailbox' ],
		  	// 'is_search': false,
		  	'columns': [
		  		{ type: 'selection'},
		  		 {type: 'text', label: '类型', prop: 'mail_type', width: '100' },
		  		 {type: 'text', label: '场景', prop: 'mail_scene',render_simple:'name', width: '100' },
          {type: 'text', label: '标题', prop: 'subject', min_width: '120'},
          {type: 'text', label: '发件人', prop: 'sender', render_simple: 'name', min_width: '160'},
          {type: 'array', label: '收件人', prop: 'recipient', render:_=>_.map(_=>`${_.title}`), min_width: '200'},
          {type: 'array', label: '抄送', prop: 'cc', render:_=>_.map(_=>`${_.title}`), min_width: '200'},
          {type: 'text', label: '发送时间', prop: 'sent_time', width: '110'},
		  		// { 
		  		// 	type: 'action',
          //   width: '150',
		  		// 	btns: [
          //     { type: 'custom', click: this.edit, label: '编辑&补发', },
		  		// 		{ type: 'delete', click: this.mailDelete },
		  		// 	],  
		  		// }
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
      this.$refs.mail_add.show('add',0);
  	},
    edit (row) {
      this.$refs.mail_add.show('view',row.id);
    },
    handleRefresh () {
      this.refresh();
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
      this.$refs.mail_add.show('view',id);
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
  components: { TableComponent, Strainer, MailAdd, AppShrink },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>