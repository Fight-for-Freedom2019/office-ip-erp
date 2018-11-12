<template>
  <div style="display: flex;">
  	<template>
	  <user-tree @refresh="handleTree"></user-tree>
    </template>
    <template style="flex:1;">
	  <table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData" ref="table" style="overflow: auto;"></table-component>
    </template>
    <edit ref="edit" @refresh="handleRefresh"></edit>
  </div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'	
import UserTree from '@/components/common/UserTree'
import Edit from '@/components/page_extension/UserManage_edit'
const URL = '/users'
export default {
  name: 'userManage',
  data () {
  	return {
  	  option: {
  	  	'name': 'userManage',
  	  	'height': 'default5',
  	  	'is_pagination': false,
  	  	'is_search': false,
  	  	'header_btn': [
  	  		{ type: 'add', label: '添加成员', click: ()=>{ this.addShrink() }},
  	  	],
  	  	'columns': [
  	  	   { type: 'selection' },
  	  	   { type: 'text', label: '用户组', prop: 'roles', width: '145'},   	
  	  	   { type: 'text', label: '所属部门', prop: 'origanization_units', width: '145'},   	
  	  	   { type: 'text', label: '名称', prop: 'name', width: '145'},   	
  	  	   { type: 'text', label: '用户名', prop: 'user_name', width: '145'},   	
  	  	   { type: 'text', label: '邮箱', prop: 'email_address', width: '145'},   	
  	  	   { type: 'text', label: '电话', prop: 'phone_number', width: '145'},   	
  	  	   { type: 'text', label: '是否激活', prop: 'is_active', width: '145', render:(h,item)=>{
  	  	   	item = item == true ? '是' : '否'
  	  	   	return h('span',item)}},   	
  	  	   { type: 'text', label: 'POP收信服务器', prop: 'pop_server', width: '145'},   	
  	  	   { type: 'text', label: 'POP收信端口', prop: 'pop_port', width: '145'},   	
  	  	   { type: 'text', label: 'SMTP发信服务器', prop: 'smtp_server', width: '145'},   	
  	  	   { type: 'text', label: 'SMTP发信端口', prop: 'smtp_port', width: '145',},   	
  	  	   { type: 'text', label: '是否使用SSL', prop: 'is_ssl', width: '145', render:(h,item)=>{
  	  	   	item = item == true ? '是' : '否'
  	  	   	return h('span',item)}},   	
  	  	   { type: 'text', label: '创建人', prop: 'creator_user', render_simple: 'name', width: '145'},   	
  	  	   { type: 'text', label: '创建时间', prop: 'creation_time', width: '145'},
  	  	   { 
  	  	   	type: 'action',
  	  	   	label: '操作',
  	  	   	width: '130',
  	  	   	align: 'center',
  	  	   	btns:[
  	  	   	  { type: 'edit', click:(row)=>{this.editShrink(row)}},	
  	  	   	  { type: 'delete', click: this.deleteSingle },	
  	  	   	],
  	  	   }	
  	  	],
  	  },
  	  tableData: [],
  	  nodeData: '',
  	  roleType: '',
  	}
  },
  methods: {
  	addShrink () {
  		this.$refs.edit.show('add');
  	},
  	editShrink (row) {
  		this.$refs.edit.show('edit',row);
  	},
  	handleTree (val,type) {
  		this.nodeData = val;
  		this.roleType = type;
  		this.refresh();
  	},
  	handleRefresh () {
  		this.refresh();
  	},
  	refreshTableData(option) {
	    const url = URL;
	    const data = Object.assign({},option);
	    if(this.roleType === 'organization') {
	    	data.origanization_units = this.nodeData.id;
	    }else if (this.roleType === 'rolegroups') {
	    	data.roles = this.nodeData.id;
	    }
	    const success = _=>{
	        console.log(_)
	        this.tableData = _.data;
	    };
	    this.$axiosGet({ url, data, success });
  	},
	deleteSingle ({user_name, id}) {
		const url = `${URL}/${id}`;
		const success = _=>{ 
			this.$message({message: '删除用户成功！', type: 'success'});
			this.refresh();
		};

		this.$confirm(`删除后不可恢复，确认删除用户‘${user_name}’？`,'删除确认',{type: 'warning'})
			.then(_=>{
				this.$axiosDelete({url, success});
			})
			.catch(_=>{});
	},  	
  	refresh () {
      this.$refs.table.refresh();
    },
  },
  mounted () {
  	this.refresh();
  },
  components: {
  	TableComponent,
  	UserTree,
  	Edit,
  },
}	
</script>
<style lang="scss" scoped>
</style>