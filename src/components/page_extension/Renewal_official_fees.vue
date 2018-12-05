<template>
	<div>
		<span>
			<search-input v-model="searchValue" style="float: right;" placeholder="搜索案号、案件名称、申请号"></search-input>
		</span>
		<app-table :columns="columns" :data="tableData" :border='true'></app-table>
	</div>
</template>
<script>
import AppTable from '@/components/common/AppTable'
import SearchInput from '@/components/common/SearchInput'
import Config from "@/const/selectConfig"
import {mapGetters} from 'vuex' 
const config = new Map(Config);
export default {
	name: 'renewalOfficialFee',
	props: ['id'],
	data () {
		return {
			searchValue: '',
			initData: [],
			columns: [
				{ type: 'selection'},
				{ type: 'text', label: '案号', prop: 'serial', render_key: 'project', render_simple: 'serial', width: '200'},
				{ type: 'text', label: '案件名称', prop: 'title',  render_key: 'project', render_simple: 'title', width: '200'},
				{ type: 'text', label: '申请号', prop: 'application_number',  render_key: 'project', render_simple: 'application_number', width: '200'},
				{ type: 'text', label: '申请日', prop: 'application_date',  render_key: 'project', render_simple: 'application_date', width: '200'},
				{ type: 'text', label: '费用类型', prop: 'fee_code', width: '200',
					render: (h, item) => {
                        let name = "";
                        config.get("fee_type").options.map(function (o) {
                            if (item && o.id === item.fee_type) {
                                name = o.name;
                            }
                        });
                        return h("span", name);
                    },
				},
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
			const url = '/fees';
			const data = { renewal_confirmation_sheet_id: this.id, is_debit: 1 };
			const success = _=> {
				this.initData = _.data.data;
			}; 
			this.$axiosGet({ url, data, success });
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
				          		if (typeof n[m] == 'string' && n[m].indexOf(keyword) != -1 && (m === 'serial' || m === 'title' || m === 'application_number')) {
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
	}
}
</script>
<style lang='scss' scoped>
</style>