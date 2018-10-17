<template>
	<div>
		<app-shrink :title="title" :visible="isPanelVisible" @update:visible="handleVisible">
			<span slot="header" style="float: right">
				<el-button size="small" type="primary" class="table-header-btn" @click="edit" :loading="saveLoading" >{{ saveLoading ? '保存中...' : '保存' }}</el-button>
				
				<el-button style="margin-left: 5px;" size="small" type="danger" @click="dialogClosed=true" v-if="!menusMap.get('Pages.Customers.Delete')">删除</el-button>
			</span>
			<el-tabs v-model="activeName" @tab-click="onTabPageClicked">
				<el-tab-pane label="基本信息" name="base">
					<customer-add  popType="edit" :customer="row" @refresh="handleRefresh"></customer-add>
				</el-tab-pane>
				<el-tab-pane label="申请人" name="applicants">
					<detail-applicant :customer="row" :itemData="appData"></detail-applicant>
				</el-tab-pane>
				<el-tab-pane label="发明人" name="inventors">
					<detail-inventor :customer="row"  :itemData="inventorsData"></detail-inventor>
				</el-tab-pane>
				<el-tab-pane label="联系人" name="contacts">
					<detail-contact  :customer="row" :itemData="contactsData"></detail-contact>
				</el-tab-pane>
				<el-tab-pane label="合同" name="contracts">
					<detail-contract  :customer="row" :itemData="contractsData"></detail-contract>
				</el-tab-pane>
				<!-- <el-tab-pane label="报价单" name="quotation">
					<detail-quotation  :customer="row"></detail-quotation>
				</el-tab-pane> -->
				<el-tab-pane label="客户备注" name="remarks">
					<detail-remark  :customer="row"></detail-remark>
				</el-tab-pane>
			</el-tabs>
		</app-shrink>
	</div>
</template>

<script>
import AppShrink from '@/components/common/AppShrink'
import DetailApplicant from '@/components/page_extension/CustomerListApplicant'
import DetailInventor from '@/components/page_extension/CustomerListInventor'
import DetailContact from '@/components/page_extension/CustomerListContact'
import DetailContract from '@/components/page_extension/CustomerListContract'
import DetailQuotation from '@/components/page_extension/CustomerListQuotation'
import DetailRemark from '@/components/page_extension/CustomerListRemark'
import CustomerAdd from '@/components/page_extension/CustomerListAdd'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
	name: 'customerListDetail',
	props: {
		'row': {
			type: Object,
			default() {
				return {};
			}
		},
		'type': String,
    	'id': Number,
		'visible': {
			type: Boolean,
			default: true,
		},
		'title': String,
	},
	data () {
		return {
			activeName: 'base',
			map: {},
			appData:[],
			inventorsData:[],
			contactsData:[],
			contractsData:[],
			saveLoading: false,
		}
	},
	computed: {
		...mapGetters([
		'shrinkHeight',
		'detailLoading',
		'menusMap',
		'innerHeight',
		'detailBase',
		]),
		isPanelVisible () {
			if( this.menusMap && !this.menusMap.get('Pages.Customers.Read') ) {
				return this.visible;
			}
			return false;
		}
	},
	methods: {
		refreshData() {
			// if(this.activeName == 'first') {
			// 	this.$refs.first.show('edit', this.row);
			// 	this.map['first'] = true;
			// }else if(this.activeName == 'second') {
			// 	this.$nextTick(_=>{
			// 		this.$refs.second.refresh();
			// 	})
			// 	this.map['second'] = true;
			// }else if(this.activeName == 'third') {
			// 	this.$nextTick(_=>{
			// 		this.$refs.third.refresh();
			// 	})
			// 	this.map['third'] = true;
			// }
		},
		handleRefresh () {
			this.$emit('refresh');
		},
		handleVisible (val) {
			this.$emit('update:visible', val);
		},
		async edit () {
			this.saveLoading = true;
			try {
				await this.$refs.customer.edit();
			}catch (e) {}
			this.saveLoading = false;
		},
		onTabPageClicked(tab, event){
			if(tab.name != 'base'){
				const url = `/api/customers/${this.row.id}/${tab.name}`;
				
				const success = _=>{
					if(this.appData.length == 0) {
						if(tab.name == 'applicants') {
							let initialData = _.data.data;
							for(let i = 0; i < initialData.length; i++) {
								this.appData.push(initialData[i]);
							}
						}
					}
					if(this.inventorsData.length == 0) {
						if(tab.name == 'inventors') {
							let initialData = _.inventors.data;
							console.log(initialData);
							for(let i = 0; i < initialData.length; i++) {
								this.inventorsData.push(initialData[i]);
							}
						}
					}
					if(this.contactsData.length == 0) {
						if(tab.name == 'contacts') {
							let initialData = _.Contacts.data;
							for(let i = 0; i < initialData.length; i++) {
								this.contactsData.push(initialData[i]);
							}
						}
					}
					if(this.contactsData.length == 0) {
						if(tab.name == 'orders') {
							let initialData = _.Contacts.data;
							for(let i = 0; i < initialData.length; i++) {
								this.contractsData.push(initialData[i]);
							}
						}
					}								
				}
				this.$axiosGet({
					url: url,
					data: Object.assign({}),
					success,
				})	
			}
		}
	},
	watch: {
		row (val) {
			console.log(val)
			this.map = {};
			this.refreshData();
		},
		activeName (val) {
			if(this.map[val]) return;
			this.refreshData();
		},
		
	},
	mounted () {
		this.refreshData();
	},
	components: {
		AppShrink,
		CustomerAdd,
		DetailApplicant,
		DetailInventor,
		DetailContact,
		DetailContract,
		DetailQuotation,
		DetailRemark,
	}

}
</script>