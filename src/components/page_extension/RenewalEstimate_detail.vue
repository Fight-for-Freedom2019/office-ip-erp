<template>
	<app-shrink :visible="visible" :title="`年费评估单>${row.serial}`" @update:visible="handleVisible">	
		<span style="float: right;" slot="header">
			<el-button size="small" type="primary" @click="save">保存</el-button>
			<el-button size="small" type="danger" @click="deleteEstimate">删除</el-button>
			<el-button size="small">发送邮件</el-button>
			<el-button size="small" type="primary" @click="confirmEstimate">评估单确认</el-button>
		</span>
		<el-form :model="form" label-width="80px" label-position="left" class="form-information" v-loading="loading" element-loading-text="加载评估单信息中..." style="padding: 0px 20px;" ref="form">
			<el-row :gutter="20">
				<el-col :span="6">
					<el-form-item label="客户">{{ info && info.customer ? info.customer.name: '' }}</el-form-item>
				</el-col>
				<el-col :span="6">
			  		<el-form-item label="创建人"><span>{{ info && info.creator ? info.creator.name : '' }}</span></el-form-item>
				</el-col>
			    <el-col :span="6">
			      <el-form-item label="创建时间"><span>{{ info ? info.creation_time : '' }}</span></el-form-item>
			    </el-col>
			    <el-col :span="6">
			      <el-form-item label="评估单状态"><span>{{ info && info.status ? info.status.name : '' }}</span></el-form-item>
			    </el-col>
	  		</el-row>
	  		<el-row :gutter="20">
	  			<el-col :span="12">
			    	<el-form-item label="服务费/件" prop="price" :rules="{required: true, message: '请输入服务费/件', trigger: 'blur'}">
			    		<el-input v-model="form.price" placeholder="请输入服务费/件" ></el-input>
			    	</el-form-item>    
	  			</el-col>	
	  			<el-col :span="12">
			    	<el-form-item label="备注">
			    		<el-input v-model="form.remark" placeholder="请输入备注"></el-input>
			    	</el-form-item>    
	  			</el-col>
	  		</el-row>
		</el-form>
		<el-tabs v-model="active" style="margin-top: 10px;" @tab-click="handleTags">
			<el-tab-pane label="年费清单" name="fees_list">
				<fees-list ref="fees_list" :id="id"></fees-list>
			</el-tab-pane>
			<el-tab-pane label="应付官费" name="official_fees">
				<official-fees :id="id"></official-fees>
			</el-tab-pane>
			<el-tab-pane label="应收费用" name="agent_fees">
				<agent-fees :id="id"></agent-fees>
			</el-tab-pane>
			<el-tab-pane label="邮件" name="mails">
				<mails :id="id"></mails>
			</el-tab-pane>
		</el-tabs>

		<el-dialog :visible.sync="dialogVisible" title="评估单确认" width="25%" :modal="false">
			<span>生成请款单：</span>
			<app-switch type="is" v-model="is_invoice"></app-switch>
			<el-button @click="submit" style="display: block; margin-top: 10px;" size="small" type="primary">确认</el-button>
		</el-dialog>
	</app-shrink>		
</template>

<script>
import AppShrink from '@/components/common/AppShrink'	
import FeesList from '@/components/page_extension/Renewal_fees_list'
import OfficialFees from '@/components/page_extension/Renewal_official_fees'
import AgentFees from '@/components/page_extension/Renewal_agent_fees'
import AppSwitch from '@/components/form/AppSwitch'
import Mails from '@/components/page_extension/Renewal_mails'
import { mapGetters, mapActions } from 'vuex'

const URL = '/renewal_confirmation_sheets'
export default {
	name: 'renewalEstimateDetail',
	props: {
		'visible': {
	  		type: Boolean,
	  		default: false,
	  	},
	  	'row': {
	  		type: Object,
	  		default(){
	  			return {}
	  		}
	  	},
	},
	data () {
		return {
			loading: false,
			feeIds: '',
			dialogVisible: false,
			is_invoice: 0,
			active: 'fees_list',
			form: {
				price: '',
				remark: '',
			},
		}
	},
	computed: {
		...mapGetters([
			'estimateDetail',
		]),
		id () {
			return this.row ? this.row.id : '';  
		},
		info () {
			return this.estimateDetail;
		},
	},
	methods: {
		...mapActions([
			'refreshEstimateDetail',
		]),
		handleVisible (val) {
			this.$emit('update:visible', val);
		},	
		save () {
			this.$refs['form'].validate(_=>{
				if(_) {
					const url = `${URL}/${this.id}`;
					const data = this.$tool.deepCopy(this.form);
					const success = _=>{
						this.$emit('refresh');
						this.$message({type: 'success', message: _.info });
					};
					this.$axiosPut({ url, data, success });
				}
			})
		},
		deleteEstimate ({id}) {
			this.$confirm(`确认删除年费评估单？删除操作无法恢复，只能重新添加！`,'删除确认',{
				type: 'warning',
			})
			.then(_=>{
				const url = `${URL}/${this.id}`;
				const success = _=> {
					this.$emit('refresh');
					this.$message({type: 'success', message: _.info });
				};
				this.$axiosDelete({ url, success });

			}).catch(_=>{

			})
		},	
		confirmEstimate () {
			const s =this.$refs.fees_list.$refs.table.getSelected();
			if (s) {
				this.feeIds = this.$tool.splitObj(s, 'id');
				this.dialogVisible = true;
			}
		},
		submit () {
			const is_invoice = this.is_invoice;
			const fees = this.feeIds;
			const url = `${URL}/${this.id}/confirm`;
			const data = { fees , is_invoice};

			const success = _=> {
				this.$message({type: 'success', message: _.info });
				this.dialogVisible = false;
			};
			this.$axiosPut({ url, data, success });
		},
		handleTags (tag, event) {

		},
	},
	created () {
		this.refreshEstimateDetail({id: this.id});
	},
	watch: {
		id () {
			this.refreshEstimateDetail({id: this.id});
		},
		info (val) {
			this.$nextTick(_=>{
			if (val) {
				this.form.price = val.price;
				this.form.remark = val.remark
			}
		})
},
	},
	components: {
		AppShrink,
		FeesList,
		OfficialFees,
		AgentFees,
		Mails,
		AppSwitch,
	},
}
</script>