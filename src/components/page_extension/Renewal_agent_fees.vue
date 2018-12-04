<template>
	<app-table :columns="columns" :data="tableData" :border='true'></app-table>
</template>
<script>
import AppTable from '@/components/common/AppTable'
import Config from "@/const/selectConfig"
import {mapGetters} from 'vuex' 
const config = new Map(Config);

export default {
	name: 'renewalAgentFee',
	props: ['id'],
	data () {
		return {
			tableData: [],
			columns: [
			 {type: 'selection'},
                        {
                            type: 'text',
                            label: '客户',
                            prop: 'customer',
                            render_simple: "name",
                            min_width: '178',
                            render_header: true
                        },
                        {type: 'text', label: '标题', prop: 'title', width: '150', render_header: true},
                        {type: 'text', label: '申请号', prop: 'application_number', width: '150', render_header: true},
                        {type: 'text', label: '申请日', prop: 'application_date', width: '160', render_header: true},
                        {type: 'text', label: '案号', prop: 'serial', width: '120', render_header: true},
                        {type: 'text', label: '订单号', prop: 'order.serial', width: '120', render_header: true},
                        {type: 'text', label: '费用名称', prop: 'fee_code.name', width: '160', render_header: true},
                        {
                            type: 'text', label: '费用类型', prop: 'fee_code', width: '100', render: (h, item) => {
                                let name = "";
                                config.get("fee_type").options.map(function (o) {
                                    if (item && o.id === item.fee_type) {
                                        name = o.name;
                                    }
                                });
                                return h("span", name);
                            },
                            render_header: true
                        },
                        {type: 'text', label: '金额', prop: 'amount', width: '100'},
                        {type: 'text', label: '币别', prop: 'currency', width: '150', render_header: true},
                        {type: 'text', label: '汇率', prop: 'roe', width: '150'},
                        {type: 'text', label: '人民币', prop: 'rmb_amount', width: '150'},
                        {type: 'text', label: '费用期限', prop: 'deadline', width: '150', render_header: true},
                        {
                            type: 'text',
                            label: '费用策略',
                            prop: 'policy',
                            width: '150',
                            render_header: true,
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
                        {
                            type: 'text', label: '费用状态', prop: 'status', width: '150', render: (h, item) => {
                                let name = "";
                                config.get("fee_status").options.map(function (o) {
                                    if (o.id === item) {
                                        name = o.name;
                                    }
                                });
                                return h("span", name);
                            },
                            render_header: true
                        },
                        {
                            type: 'text',
                            label: '请款时机',
                            prop: 'payment_request_timing',
                            width: '150',
                            render: (h, item) => {
                                let name = "";
                                config.get("payment_request_timing").options.map(function (o) {
                                    if (o.id === item) {
                                        name = o.name;
                                    }
                                });
                                return h("span", name);
                            },
                            render_header: true
                        },
                        {type: 'text', label: '备注', prop: 'remark', width: '150', render_header: true},
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