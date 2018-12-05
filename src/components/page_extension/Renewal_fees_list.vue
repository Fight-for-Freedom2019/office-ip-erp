<template>
	<div>
		<span>
			<el-button type="danger" size="small" style="float: left;" @click="deleteRenewal">删除年费</el-button>
			<search-input style="float: right;"></search-input>
		</span>
		<app-table :columns="columns" :data="tableData" :border='true' ref="table" ></app-table>
	</div>
</template>
<script>
import AppTable from '@/components/common/AppTable'
import SearchInput from '@/components/common/SearchInput'
import {mapGetters} from 'vuex' 

export default {
	name: 'renewalFeeList',
	props: ['id'],
	data () {
		return {
			tableData: [],
			columns: [
				{ type: 'selection'},
				{ type: 'text', label: '案号', prop: 'serial', render_key: 'project', render_simple: 'serial', width: '200'},
				{ type: 'text', label: '案件名称', prop: 'title',  render_key: 'project', render_simple: 'title', width: '200'},
				{ type: 'text', label: '申请号', prop: 'application_number',  render_key: 'project', render_simple: 'application_number', width: '200'},
				{ type: 'text', label: '申请日', prop: 'application_date',  render_key: 'project', render_simple: 'application_date', width: '200'},
				{ type: 'text', label: '年费类型', prop: 'fee_code', render_simple: 'name', width: '200'},
        		{ 
		        	type: 'text', 
		        	label: '人民币金额', 
		        	prop: 'rmb_amount', 
		        	width: '120',
		        	align: 'right',
		        	render:(h,item)=>{
		            return h('span',`${item}CNY`)
	          		}
        		},
				{ type: 'text', label: '案件费用策略', prop: 'fee_policy', render_key: 'project', render_simple: 'name', width: '200'},
			]	
		}
	},
	computed: {
		...mapGetters([
			'renewalFeeList',
		]),
	},
	methods: {
		handleRefreshDetail () {
			const url = '/renewal_fees';
			const data = {renewal_confirmation_sheet_id: this.id};
			const success = _=> {
				this.tableData = _.data.data;
			}; 
			this.$axiosGet({ url, data, success });
		},
		deleteRenewal () {
			const s = this.$refs.table.getSelected();
			console.log(s)
			if(s) {
				const fees = this.$tool.splitObj(s, 'id');
				console.log(fees)
				this.$confirm(`确认删除选择的年费？删除操作无法恢复，只能重新添加！`,'删除确认',{
					type: 'warning',
				})
				.then(_=>{
					const url = `/renewal_confirmation_sheets/${this.id}/fees`;
					const data = {fees};
					const success = _=> {
						this.$emit('refresh');
						this.$message({type: 'success', message: _.info });
					};
					this.$axiosDelete({ url, data, success });

				}).catch(_=>{

				})
			}
		},
	},
	created () {
		if(this.id) {
 			this.handleRefreshDetail();
		}
	},
	watch: {
		id (val) {
			this.handleRefreshDetail();
		}
	},
	components: {
		AppTable,
		SearchInput,
	}
}
</script>
<style lang='scss' scoped>
</style>