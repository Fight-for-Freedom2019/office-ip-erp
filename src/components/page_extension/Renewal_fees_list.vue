<template>
	<div>
		<span>
			<el-button type="danger" size="small" style="float: left;" @click="deleteRenewal">删除年费</el-button>
			<el-button size="small" type="primary" @click="confirmEstimate">评估单确认</el-button>
			<search-input v-model="searchValue" style="float: right;" placeholder="搜索案号、案件名称、申请号"></search-input>
		</span>
		<app-table :columns="columns" :data="tableData" :border='true' ref="table" ></app-table>
		<el-dialog :visible.sync="dialogVisible" title="评估单确认" width="25%" :modal="false">
			<span>生成请款单：</span>
			<app-switch type="is" v-model="is_invoice"></app-switch>
			<el-button @click="submit" style="display: block; margin-top: 10px;" size="small" type="primary">确认</el-button>
		</el-dialog>
	</div>
</template>
<script>
import AppTable from '@/components/common/AppTable'
import SearchInput from '@/components/common/SearchInput'
import AppSwitch from '@/components/form/AppSwitch'
import {mapGetters} from 'vuex' 

export default {
	name: 'renewalFeeList',
	props: ['id'],
	data () {
		return {
			searchValue: '',
			initData: [],
			feeIds: '',
			dialogVisible: false,
			is_invoice: 0,
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
		tableData () {
	 		if(this.searchValue == '') {
	 			return this.initData;
	 		}else{
	 			return this.search(this.searchValue);
	 		}
 		},
	},
	methods: {
		handleRefreshDetail () {
			const url = '/renewal_fees';
			const data = {renewal_confirmation_sheet_id: this.id};
			const success = _=> {
				this.initData = _.data.data;
			}; 
			this.$axiosGet({ url, data, success });
		},
		confirmEstimate () {
			const s =this.$refs.table.getSelected();
			console.log(s)
			if (s) {
				this.feeIds = this.$tool.splitObj(s, 'id');
				console.log(this.feeIds)
				this.dialogVisible = true;
			}
		},
		submit () {
			const is_invoice = this.is_invoice;
			const fees = this.feeIds;
			const url = `/renewal_confirmation_sheets/${this.id}/confirm`;
			const data = { fees , is_invoice};

			const success = _=> {
				this.$message({type: 'success', message: _.info });
				this.dialogVisible = false;
			};
			this.$axiosPut({ url, data, success });
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
		search (keyword) {
			// 纯前端关键字过滤 （案号、标题、申请号）
	        let newArr = [];
	        if(keyword){
		        this.initData.filter((val,i,arr)=>{
		          for (let k in arr[i]) {
		          	let n = arr[i][k];
		          	if(n instanceof Object) {
			          	for(let m in n) {
			          		if (typeof n[m] == 'string' && n[m].indexOf(keyword) != -1 && (m === 'serial' || m=== 'title' || m === 'application_number')) {
			          			newArr.push(arr[i]);
			          		}
			          	}
		          	}
		          }
		        })
		        return this.$tool.rmDuplicate(newArr);
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
		AppSwitch,
	}
}
</script>
<style lang='scss' scoped>
</style>