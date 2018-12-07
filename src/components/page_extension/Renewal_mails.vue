<template>
	<div>
		<span>
			<search-input v-model="searchValue" style="float: right;" placeholder="搜索案号、案件名称、申请号"></search-input>
		</span>
		<app-table :columns="columns" :data="tableData" :border='true'></app-table>
		<app-shrink :visible.sync="shrinkVisible" :title="`邮件`">
        	<mail-add @refresh="handleRefresh" ref="mail_add"></mail-add>
      	</app-shrink>
	</div>
</template>
<script>
import AppTable from '@/components/common/AppTable'
import SearchInput from '@/components/common/SearchInput'
import MailAdd from '@/components/page/MailAdd'
import AppShrink from '@/components/common/AppShrink'
import {mapGetters} from 'vuex' 
export default {
	name: 'renewalMail',
	props: ['id'],
	data () {
		return {
			searchValue: '',
			shrinkVisible: false,
			initData: [{id:1}],
			columns: [
				{ type: 'selection'},
		  		{type: 'text', label: '邮件类型', prop: 'mail_type', render_simple: 'name', width: '100' },
	          {type: 'text', label: '邮件标题', prop: 'subject', min_width: '120'},
	          {type: 'text', label: '发送时间', prop: 'sent_time', width: '200'},
	          {type: 'text', label: '发件人', prop: 'sender', render_simple: 'name', width: '160'},
	          {type: 'array', label: '收件人', prop: 'recipients', width: '160'},
	          // {type: 'array', label: '抄送', prop: 'cc', render:_=>_.map(_=>`${_.title}_${_.email}`), width: '160'},
		  		{ 
		  			type: 'action',
                    width: '80',
		  			btns: [
                        { type: 'custom', click: this.edit, label: '编辑&补发', },
		  			],  
		  		}
			]	
		}
	},
	computed: {
		...mapGetters([
			'renewalMail',
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
			const data = { renewal_confirmation_sheet_id: this.id, is_debit: 0 };
			const success = _=> {
				this.initData = _.data.data;
			}; 
			this.$axiosGet({ url, data, success });
		},
		handleRefresh () {
			this.handleRefreshDetail();
			this.shrinkVisible = false;
		},
		edit (row) {
			this.shrinkVisible = true;
	        this.$nextTick(_=>{
	        	this.$refs.mail_add.setForm(row);
	        })
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
			          		if (typeof n[m] == 'string' && n[m].indexOf(keyword) != -1 && (m === 'subject' || m=== 'sender' || m === 'recipients')) {
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
		MailAdd,
		AppShrink,
	}
}
</script>
<style lang='scss' scoped>
</style>