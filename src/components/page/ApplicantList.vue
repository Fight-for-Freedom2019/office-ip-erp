<template>
  <div class="main">
		<table-component :tableOption="option" :data="tableData" ref="table" @refreshTableData="refreshTableData"></table-component>

		<!-- 新建申请人 -->
		<app-shrink :visible.sync="isApplicantAddPanelVisible" :modal='true' :title="this.appPanelTitle">
      <span slot="header" style="float: right;">
        <el-button type="primary" @click="saveAdd" v-if="formType == 'add'" size="small">新建</el-button>
				<el-button type="primary" @click="saveAdd" v-if="formType == 'edit'" size="small">保存</el-button>
      </span>
      <applicant-list-add ref="applicantAdd" :type='formType' :applicant='applicant' @addSuccess="()=>{this.isApplicantAddPanelVisible = false}"></applicant-list-add>
    </app-shrink>

  </div>
</template>

<script>

import AxiosMixins from '@/mixins/axios-mixins'
import TableComponent from '@/components/common/TableComponent'
import ApplicantListAdd from '@/components/page_extension/ApplicantListAdd'
import AppShrink from '@/components/common/AppShrink'

const URL = '/api/applicants';

export default {
  name: 'applicantList',
  mixins: [ AxiosMixins ],
  data () {
		return {
			isApplicantAddPanelVisible: false,
			appPanelTitle: '新建申请人',
			formType: 'add',
			applicant: {},
		  option: {
        'name': 'applicant',
        'url': '/api/applicants',
        'height': 'default',
		  	'header_btn': [
		  		{ type: 'add', click: this.add },
          { type: 'delete' },
		  		{ type: 'control' },
				],
				'rowClick': this.handleRowClick,
		  	'columns': [
		  		{ type: 'selection' },
		  		{ type: 'text', label: '申请人姓名', prop: 'name', sortable: true, width: '250' },
		  		{ type: 'text', label: '申请人类型', prop: 'type_name', sortable: true, width: '200' },
		  		{ type: 'text', label: '证件号码', prop: 'identity', sortable: true, width: '240' },
		  		{ type: 'text', label: '地区', prop: 'area', sortable: true, width: '175',
            render: (h,item)=>{
              const d = this.areaMap.get(item);
              return h('span', d ? d : '');
            }  
          },
		  		{ type: 'text', label: '省份', prop: 'province', sortable: true, width: '175', 
            render: (h, item)=>{ 
              const d = this.provinceMap.get(Number.parseInt(item));
              return h('span', d ? d : '');
            } 
          },
		  		{ type: 'text', label: '城市', prop: 'city', sortable: true, width: '175', 
            render: (h, item)=>{ 
              const d = this.cityMap.get(item);
              return h('span', d ? d : '');
            }
          },
		  		{ type: 'text', label: '详细地址', prop: 'address', sortable: true, width: '260' },
		  		{ type: 'text', label: '邮编', prop: 'postcode', sortable: true, width: '145' },
		  		{ type: 'text', label: '费用备案', prop: 'fee_discount', sortable: true, width: '145', render: (h, item)=>h('span', item ? '已完成' : '未完成') },
		  		{ type: 'text', label: '英文姓名', prop: 'ename', sortable: true, width: '175' },
		  		{ type: 'text', label: '英文地址', prop: 'eaddress', sortable: true, width: '260' },
		  		{ 
		  			type: 'action',
            width: '150',
		  			btns: [
		  				{ type: 'edit', click: this.handleRowClick },
		  				{ type: 'delete', click: this.applicantDelete },
		  			] 
		  		}
		  	],
		  },
		  tableData: [],
	    filter: {}
		}
  },
  computed: {
    provinceMap () {
      return this.$store.getters.provinceMap;
    },
    cityMap () {
      return this.$store.getters.cityMap;
    },
    areaMap () {
      return this.$store.getters.areaMap;
    } 
  },
  methods: {
  	add () {
			this.formType = 'add';
			this.appPanelTitle =  '新建申请人';
  		this.isApplicantAddPanelVisible = true;
		},
		saveAdd () {
      this.$refs.applicantAdd.save();
    },
  	handleRowClick (row) {
			this.applicant = row;
			this.formType = 'edit';
			this.appPanelTitle =  '编辑申请人>' + row.name;
			this.isApplicantAddPanelVisible = true;
  	},
  	applicantDelete ({id, name} ) {
  		this.$confirm(`删除后不可恢复，确认删除‘${name}’？`, {type: 'warning'})
  			.then(_=>{
  				const url = `${URL}/${id}`;
  				const success = _=>{
  					this.$message({message: '删除申请人成功', type: 'success'});
  					this.update();
  				}
  				this.axiosDelete({url, success});
  			})
  			.catch(_=>{});
  	},
  	refreshTableData (option) {
  		const url = URL;
  		const data = Object.assign({}, option);
			const success = _=>{ this.tableData = _.data };
  		this.axiosGet({url, data, success});
  	},
    refresh () {
			this.$refs.table.refresh();
    },
    update () {
			this.$refs.table.update();
    }
  },
  mounted () {
    this.refresh();
  },
	components: { 
		TableComponent, 
		ApplicantListAdd, 
		AppShrink 
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
