<template>
  <div class="main">
		<table-component :tableOption="tableOption" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>
		<common-detail
      	:title="currentRow.title"
      	type="trademark" 
		ref="trademark_detial"
      	:id="currentRow.id"
      	@editSuccess="refresh">
    	</common-detail>
    	<detail-shrink ref="trademarkAdd" page-type="add" @addSuccess="refresh()"></detail-shrink>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import AppDatePicker from '@/components/common/AppDatePicker'
import CommonDetail from '@/components/page_extension/Common_detail'
import DetailShrink from '@/components/page_extension/DetailShrink'
import { mapActions } from 'vuex'

const URL = '/trademarks'
export default {
  name: 'trademarkList', 
  data () {
		return {
			dialogScreenVisible: false,
			tableOption: {
				'name': 'trademark',
				'url': URL,
				'is_list_filter': true,
        		'list_type': 'trademark',
				'header_btn': [{
					'type': 'add',
					click: this.add,
					map_if: '/trademark/draftbox',
					btn_if: "draftbox"
				},
				{ type: 'delete',},
				// { type: 'import',},
				{ type: 'export2',},
				// { type: 'batch_upload',},
				// { type: 'report', click: _=>{this.$router.push('/trademark/report')} },
				{ type: 'control', label: '字段'},
				],
				'import_type': 'trademark',
				// 'upload_type': 'trademark',
				'highlightCurrentRow': true, 
	      		'rowClick': this.handleRowClick,
				'height': 'default',
				'columns': [{
					'show': true,
					'type': 'selection'
				},
				{ type: 'text', label: '案号', prop: 'serial', width: '198'},
				{ type: 'text', label: '标题', prop: 'title', width: '168', is_import: true,},
				{ type: 'text', label: '子类型', prop: 'subtype', render_simple:'name', width: '145', is_import: true,},
				// { type: 'text', label: '商标图样', prop: 'figure_file', align: 'center', header_align: 'left', width: '200',
				//   render:(h,item)=>{
				// 	return h('img',{
				// 	  attrs:{
				// 	    src:item.viewUrl,
				// 	    width: '150px',		
				// 	  },
				// 	  style:{
				// 		marginTop:'5px',
				// 	  }
				// 	})
				//   },
				// },
			  	{ type: 'text', label: '申请国家', prop: 'area', is_import: true, render_simple: 'name', width: '145',},
			    { type: 'array', label: '商标类别', prop: 'categories', render:_=>_.map(_=>_.name), is_import: true, width: '260',},
			    { type: 'text', label: '申请号', prop: 'application_number', width: '240', is_import: true,},
			    { type: 'text', label: '申请日', prop: 'application_date', width: '168', is_import: true,},
			    { type: 'text', label: '初审公告号', prop: 'public_number', width: '168', is_import: true,},
			    { type: 'text', label: '初审公告日', prop: 'public_date', width: '168', is_import: true,},
			    { type: 'text', label: '公告号', prop : 'issue_number', width: '168', is_import: true,},  
			    { type: 'text', label: '公告日', prop: 'issue_date', width: '168', is_import: true,}, 
			    { type: 'text', label: '客户', prop: 'customer', render_simple: 'name', width: '168', is_import: true,},
			    { type: 'text', label: '客户案号', prop: 'customer_serial', width : '145', is_import: true,},
			    { type: 'text', label: 'IPR', prop: 'ipr', render_simple: 'name', width : '145', is_import: true,},
				{ type: 'array', label: '申请人', prop: 'applicants', is_import: true, width: '260', render:_=>_.map(_=>_.name),},
			    { type: 'text', label: '案件状态', prop: 'project_stage', render_simple: 'name', width : '145', is_import: true,},
			    { type: 'text', label: '承办部门', prop: 'organization_unit', render_simple: 'name', width : '145', is_import: true,},
			    { type: 'text', label: '代理人', prop: 'agent', render_simple: 'name', width : '145', is_import: true,},
			    { type: 'text', label: '初审人', prop: 'first_reviewer', render_simple: 'name', width : '145', is_import: true,},
			    { type: 'text', label: '复核人', prop: 'final_reviewer', render_simple: 'name', width : '145', is_import: true,},
			    { type: 'text', label: '顾问', prop: 'consultant', render_simple: 'name', width : '145', is_import: true,},
			    { type: 'text', label: '销售', prop: 'sales', render_simple: 'name', width : '145', is_import: true,},
			    { type: 'text', label: '订单号', prop: 'order', render_simple: 'serial', width : '145', is_import: true,},
			    { type: 'text', label: '第三方订单号', prop: 'order_serial', width : '145', is_import: true,},
			    { type: 'text', label: '委案日', prop: 'entrusting_time', width : '145', is_import: true,},
			    { type: 'text', label: '备注', prop: 'remark', width: '280', is_import: true,},
			]},
			tableData: [],
			currentRow: '',
			shrinkVisible: false,
			filterVisible: false,
		};
	},
	computed: {
		defaultParams() {
      const params = this.$route.meta.params;
      return params ? params : {};
    },
    defaultStatus() {
      return this.defaultParams.status;
    },
	},
  methods: {
  	...mapActions([
  		'initializeSelectorCache',
  	]),
  	add () {
  		this.$refs.trademarkAdd.show(null,'trademark');
  	},
  	refreshTableData(option) {
  		
  		const success = d=>{
  			if(option['format'] == 'excel') {
          window.location.href = d.trademarks.downloadUrl;
        }else {
          this.tableData = d.trademarks;  
        }
  		}
  		this.$axiosGet({
  			url: URL,
  			data: Object.assign({}, option, this.defaultParams),
  			success,
  		})
  	},
  	customFields(name) {
	  	let newObj = new Object ();
	  	const newArr = [];
	  	Object.assign(newArr,this.tableOption.columns);
	  	newObj.width = '200';
	  	newObj.show = true;
	  	newObj.label = '自定义';
	  	newObj.prop = 'zidingyi';
	  	newObj.type = 'text';
	  	// console.log(newObj);
	  	// console.log(this.tableOption.columns instanceof  Array);
	  	newArr.push(newObj);
	  	console.log(newArr);
	  	this.tableOption.columns = newArr;
	  	return this.tableOption.columns;
  	},
  	refresh () {
  		this.$refs.table.refresh();
  	},
  	handleRowClick (row) {
  		this.currentRow = row;
  		// if(!this.shrinkVisible) {
  		// 	this.shrinkVisible = true;	
  		// }
  		this.$refs.trademark_detial.show(row.id, 'trademark')
  	}
  },
  mounted () {
  	this.refresh();
  	this.initializeSelectorCache({type: 'file_type_trademark_notice'});
  },
  components: { 
  	TableComponent, 
  	AppDatePicker,
  	CommonDetail,
  	DetailShrink,
  },
  watch: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>