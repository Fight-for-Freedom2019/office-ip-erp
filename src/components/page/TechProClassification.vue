<template>
  <div style="display: flex;">
  	<template>
      <classification-tree @deliver="receive" ref="classification_tree"></classification-tree>
    </template>
    <template style="flex:1;">
      <table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData" ref="table" style="overflow: auto;">
        <span slot="bread_mark">{{ mark }}</span>
      </table-component>
    </template>
    <common-detail
        :title="currentRow.title"
        :visible.sync="shrinkVisible" 
        type="patent" 
        :id="currentRow.id" 
        ref="detail"
        @editSuccess="refresh"
    >
    </common-detail>
  </div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'	
import ClassificationTree from '@/components/page_extension/ClassificationTree'
import CommonDetail from '@/components/page_extension/Common_detail'
const URL = '/patents'
export default {
  name: 'tech-pro-classifition',
  data () {
  	return {
      shrinkVisible: false,
  	  option: {
        'url': '/patents',
  	  	'name': 'tech-pro-classifition',
  	  	'height': 'default3',
  	  	'is_pagination': false,
  	  	'is_search': false,
        'rowClick': this.handleRowClick,
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
  	  	],
  	  },
  	  tableData: [],
      mark: '',
      filter_id: 1,
      currentRow: '',
  	}
  },
  computed: {
    pageType () {
      const path = this.$route.path;
      return /classification/.test(path) ? 'classification' : 'product';
    },
  },
  methods: {
    receive (val) {
      console.log(val)
      this.mark = val.fullname +':' + val.description;
      this.filter_id = val.id;
    },
    handleRowClick (row) {
      this.shrinkVisible = true;
      this.currentRow = row;
    },
  	refreshTableData(option) {
      const t = this.pageType;
	    const url = URL;
      let extraParams = {};
      extraParams[`is_${t}_child`] = 0;
      extraParams[`${t}_id`] = this.filter_id;
	    const data = Object.assign({},option, extraParams);
	   
	    const success = _=>{
	        console.log(_)
	        this.tableData = _.patents.data;
	    };
	    this.$axiosGet({ url, data, success });
  	}, 	
  	refresh () {
      this.$refs.table.refresh();
    },
  },
  mounted () {
  	this.refresh();
  },
  watch: {
    filter_id () {
      this.refresh();
    }
  },
  components: {
  	TableComponent,
    ClassificationTree,
    CommonDetail,
  },
}	
</script>
<style lang="scss" scoped>
</style>