<template>
	<div class="main">
		<table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData" ref="table">
			<el-select v-model="status" style="width: 150px; margin-left: 5px;" slot="status">
				<el-option label="全部" value=""></el-option>
				<el-option v-for="item in statusArr" :key="item[0]" :value="item[0]" :label="item[1]"></el-option>
			</el-select>
		</table-component>
		<pop ref="pop" @refresh="refresh"></pop>
		<el-dialog title="新建年费评估单" :visible.sync="dialogVisble" @close="remark = '';due_time='';" class="dialog-small">
			<!-- <el-date-picker type="date" v-model="due_time" placeholder="请选择评估期限"></el-date-picker> -->
			<el-form :model="addForm" ref="addForm">
				<el-form-item label="服务费/件" prop="price" :rules="{required: true, message: '请输入服务费/件', trigger: 'blur'}">
					<el-input v-model="addForm.price" placeholder="请输入服务费/件"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="remark" :rules="{required: true, message: '请输入服务费/件', trigger: 'blur'}">
					<el-input type="textarea" v-model="addForm.remark" placeholder="请填写年费评估单备注"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :loading="loading" type="primary" @click="addEstimate">{{ loading ? '新建中...' : '确认新建' }}</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="添加到已有评估单" :visible.sync="dialogVisble2" @close="estimate = '';" class="dialog-small">
			<jump-select type="estimate"  v-model="estimate"></jump-select>
			<el-button :loading="loading" type="primary" @click="putEstimate" style="margin-top: 10px;">{{ loading ? '添加中...' : '确认添加' }}</el-button>
		</el-dialog>
		<el-dialog title="设置年费监控偏好" :visible.sync="dialogVisble3">
			<div class="form-description">默认显示几个月内即将过期的年费</div>
			<el-input-number v-model="month" :min="1"></el-input-number>
			<el-button type="primary" @click="saveMonth" :loading="loading">{{ loading ? '保存中...' : '保存' }}</el-button>
		</el-dialog>
		<el-dialog title="批量添加年费" :visible.sync="dialogVisble4" @close="patent = ''" class="dialog-small">
			<div class="form-description">请选择需要批量添加年费的专利</div>
			<remote-select type="patent" v-model="patent" ref="patent"></remote-select>
			<el-button type="primary" @click="batchAdd" :loading="loading" style="margin-top: 10px;">{{ loading ? '添加中...' : '确认添加' }}</el-button>
		</el-dialog>
	</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/page_extension/RenewalFee_pop'
import RemoteSelect from '@/components/form/RemoteSelect'
import JumpSelect from '@/components/form/JumpSelect'
import {mapActions} from 'vuex'

const URL = '/renewal_fees'
const URL2 = '/renewal_confirmation_sheets'
export default {
	name: 'renewalFee',
	props: {
		defaultParams: {
			type: Object,
			default () {
				return {};
			}
		}
	},	
	data () {
		const statusArr = [ [0, '年费监控中'], [1, '年费评估中'], [2, '年费评估缴纳'], [3, '年费评估放弃'] ];
		const statusMap = new Map(statusArr);
		let month = this.$tool.getLocal('renewalFeeMonth');
		this.month = month ? month : 3;
		
		return {
			month,
			status: '',
			statusArr,
			statusMap,
			dialogVisble: false,
			dialogVisble2: false,
			dialogVisble3: false,
			dialogVisble4: false,
			loading: false,
			loading4: false,
			patent: '',
			addForm: {
				remark: '',
				price: '',
			},
			// due_time: '',
			estimate: '',

			option: {
				name: 'renewalFeeList',
				url: URL,
				height: 'default2',
				search_placeholder: '案号、案件名称、创建人',
				header_btn: [
					// { type: 'add', click: this.addPop },
					// { type: 'add', label: '批量添加', click: _=>{ this.dialogVisble4 = true; } },
					{ 
            type: 'dropdown',
            label:  '年费评估单',
            items: [
              {text: '新建评估单', click: ()=>{ this.estimatePop('add') }, icon: 'plus' },
              {text: '添加至已有评估单', click: ()=>{ this.estimatePop('append') }, icon: 'd-arrow-right'  },
            ],
          },
					{ type: 'delete' },
					{ type: 'control' },
					// { 
					// 	type: 'custom', 
					// 	icon: 'setting', 
					// 	label: '设定', 
					// 	click: _=>{
					// 		let month = this.$tool.getLocal('renewalFeeMonth');
					// 		this.month = month ? month : 3;
					// 		this.dialogVisble3 = true;
					// 	} 
					// },
				],
				// header_slot: [ 'status' ],
				columns: [
					{ type: 'selection' },
					{ type: 'text', label: '案号', prop: 'serial', render_key: 'project', render_simple: 'serial', width: '200'},
					{ type: 'text', label: '案件名称', prop: 'title',  render_key: 'project', render_simple: 'title', width: '200'},
					{ type: 'text', label: '客户', prop: 'customer',  render_key: 'project', render_simple: 'name', width: '200'},
					{ type: 'text', label: '申请号', prop: 'application_number',  render_key: 'project', render_simple: 'application_number', width: '200'},
					{ type: 'text', label: '申请日', prop: 'application_date',  render_key: 'project', render_simple: 'application_date', width: '200'},
					{ type: 'text', label: '官方绝限', prop: 'legal_deadline', width: '200'},
					{ type: 'text', label: '客户', prop: 'customer',  render_key: 'project', render_simple: 'name', width: '200'},

					{ type: 'text', label: '年费类型', prop: 'fee_code', render_simple: 'name', width: '200'},
					{ 
						type: 'text', 
						label: '外币金额', 
						prop: 'amount', 
						width: '100',
						align: 'right',
						render:(h,item,row)=>{
	            if( row.roe == 1 ){
		            return h('span','N/A');
		          }else{
		            return h('span',`${item}${row.currency}`);
		          }
	          } 
	        },
          { 
          	type: 'text', 
          	label: '汇率', 
          	prop: 'roe', 
          	width: '80',
          	align: 'right',
          	render:(h,item)=>{
		          if( item == 1 ){
		            return h('span','N/A');
		          }else{
		            return h('span',item);
		          } 
		        }
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
					{ 
						type: 'text', 
						label: '年费状态', 
						prop: 'status', 
						render_text: _=>this.statusMap.get(_),
						width: '200'
					},
					{ type: 'text', label: '案件费用策略', prop: 'fee_policy', render_key: 'project', render_simple: 'name', width: '200'},
					{ type: 'text', label: '评估单号', prop: 'confirmation_sheet', render_simple: 'serial', width: '200'},
					{ type: 'text', label: '备注', prop: 'remark', width: '200'},
				]
			},
			tableData: [],
		};
	},
	methods: {
    ...mapActions([
      'refreshUser',
      'refreshRoeData',
    ]),
    batchAdd () {
    	if( !this.patent ) return this.$message({type: 'warning', message: '专利不能为空'});
    	const serial = this.$refs.patent.getSelected()[0]['name'].split('-')[0].match(/^\[(.*)\]$/)[1];
    	this.loading4 = true;
    	this.$axiosPost({
    		url: '/api/renewalFeeBatch',
    		data: { project_id: this.patent },
    		success: _=>{ 
    			this.$message({type: 'success', message: '批量添加成功'}) 
    			this.dialogVisble4 = false;
    			this.search(serial);
    		},
    		complete: _=>{ this.loading4 = false },
    		
    	}) 
    },	
		addPop () {
			this.$refs.pop.show();
		},
		refresh () {
			this.$refs.table.refresh();
		},
		search (val) {
			this.$refs.table.search(val);
		},
		refreshTableData (option) {
			this.$axiosGet({
				url: URL,
				data: Object.assign({}, option, this.defaultParams),
				success: _=>{this.tableData = _.data},
			})
		},
		estimatePop (type) {
			const list = this.$refs.table.getSelected();
			if(!list) return;
			// for(let i = 0; i < list.length; i++) {
			// 	if(list[i]['status'] != 0) {
			// 		return this.$message({type: 'warning', message: '请选择处于年费监控状态的列表项'});
			// 	}
			// }

			if(type == 'add') this.dialogVisble = true;
			if(type == 'append') this.dialogVisble2 = true;

		},
		addEstimate () {
			this.$refs.addForm.validate(valid=>{
				if(valid) {
					const fees = this.$tool.splitObj(this.$refs.table.getSelected(true), 'id');
					const remark = this.remark;
					const price = this.price;
					const data = { fees, remark, price };
					
					this.loading = true; 
					this.$axiosPost({
						url: URL2,
						data,
						success: _=>{
							this.$message({type: 'success', message: '新建年费评估单成功'});
							this.dialogVisble = false;
							this.refresh();
							this.refreshUser();
						},
						complete: _=>{
							this.loading = false;
						}
					})
				}
			})
		},
		putEstimate () {
			if(!this.estimate) return this.$message({type: 'warning', message: '请选择年费评估单'});
			const ids = this.$tool.splitObj(this.$refs.table.getSelected(true), 'id');
			const data = { ids }; 
			this.$axiosPut({		
				url: `${URL2}/${this.estimate}`,
				data,
				success: _=>{
					this.$message({type: 'success', message: '添加成功'});
					this.dialogVisble2 = false;
					this.refresh();
				},
				complete: _=>{
					this.loading = false;
				}
			})
		},
		saveMonth () {
			this.$tool.setLocal('renewalFeeMonth', this.month);
			this.dialogVisble3 = false;
			this.refresh();
		},
	},
	mounted () {
		this.refresh();
		this.refreshRoeData();
	},
	watch: {
		status () {
			this.refresh();
		}
	},
	components: { 
    	TableComponent, 
		Pop,
		RemoteSelect,
		JumpSelect,
	}
} 
</script>