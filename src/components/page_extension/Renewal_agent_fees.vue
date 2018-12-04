<template>
	<app-table :columns="columns" :data="tableData" :border='true'></app-table>
</template>
<script>
import AppTable from '@/components/common/AppTable'
import {mapGetters} from 'vuex' 
export default {
	name: 'renewalAgentFee',
	props: ['id'],
	data () {
		return {
			tableData: [],
			columns: [
				{type: 'text', label: '审查节点', prop: 'taskdef',render_simple: 'name'},
				{type: 'text', label: '记录人', prop: 'operator',render_simple: 'name'},
				{type: 'text', label: '记录时间', prop: 'create_time'},
				{type: 'text', label: '审查要点', prop: 'opinion', className: 'tabel-content__visible',overflow: false,},
				{type: 'text', label: '修改/答辩', prop: 'response',className: 'tabel-content__visible',overflow: false,},
			]	
		}
	},
	computed: {
		...mapGetters([
			'renewalAgentFee',
		]),
	},
	methods: {
		handleRefreshDetail () {
			const url = '/fees';
			const data = { renewal_confirmation_sheet_id: this.id, is_debit: 0 };
			const success = _=> {
				this.tableData = _.data.data;
			}; 
			this.$axiosGet({ url, data, success });
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
	}
}
</script>
<style lang='scss' scoped>
</style>