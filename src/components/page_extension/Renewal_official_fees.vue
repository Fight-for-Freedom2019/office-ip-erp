<template>
	<app-table :columns="columns" :data="tableData" :border='true'></app-table>
</template>
<script>
import AppTable from '@/components/common/AppTable'
import Config from "@/const/selectConfig"
import {mapGetters} from 'vuex' 
const config = new Map(Config);
export default {
	name: 'renewalOfficialFee',
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
				{ type: 'text', label: '费用类型', prop: 'fee_type', render_key: 'fee_code',  width: '200',},
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
				{ type: 'text', label: '费用策略', prop: 'policy', width: '200',
					render: (h, item) => {
                        let name = "";
                        config.get("policy").options.map(function (o) {
                            if (o.id === item) {
                                name = o.name;
                            }
                        });
                        return h("span", name);
                     }
				},
			]	
		}
	},
	computed: {
		...mapGetters([
			'renewalOfficialFee',
		]),
	},
	methods: {
		handleRefreshDetail () {
			const url = '/fees';
			const data = { renewal_confirmation_sheet_id: this.id, is_debit: 1 };
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