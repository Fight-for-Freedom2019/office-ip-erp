<template>
	<app-shrink :visible.sync="visible" :title="`年费评估单>${row.serial}`">	
		<span style="float: right;" slot="header">
			<el-button size="small" type="primary" :disabled="btn_disabled" @click="save">保存</el-button>
			<el-button size="small" type="danger" :disabled="btn_disabled" @click="deleteEstimate">删除</el-button>
			<el-button size="small" @click="sendMail">发送邮件</el-button>
		</span>
		<el-form :model="form" label-width="80px" label-position="left" class="form-information" v-loading="loading" element-loading-text="加载评估单信息中..." style="padding: 0px 20px;" ref="form">
			<el-row :gutter="20">
				<el-col :span="6">
					<el-form-item label="客户"><span :title="info && info.customer ? info.customer.name: ''" style="display:inline-block;max-width: 120px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{ info && info.customer ? info.customer.name: '' }}</span></el-form-item>
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
		<el-tabs v-model="active" style="margin-top: 10px;">
			<el-tab-pane label="年费清单" name="fees_list">
				<fees-list ref="fees_list" :id="id" ></fees-list>
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
        	<mail-add  ref="mail_add"></mail-add>
	</app-shrink>
</template>

<script>
import AppShrink from '@/components/common/AppShrink'	
import FeesList from '@/components/page_extension/Renewal_fees_list'
import OfficialFees from '@/components/page_extension/Renewal_official_fees'
import AgentFees from '@/components/page_extension/Renewal_agent_fees'
import Mails from '@/components/page_extension/Renewal_mails'
import MailAdd from '@/components/page/MailAdd'
import { mapGetters, mapActions } from 'vuex'

const URL = '/renewal_confirmation_sheets'
export default {
	name: 'renewalEstimateDetail',
	props: {
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
			id: '',
			btn_disabled: false,
			backData: '',
			visible: false,
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
		info () {
			return this.estimateDetail;
		},
	},
	methods: {
		...mapActions([
			'refreshEstimateDetail',
		]),
		// handleVisible (val) {
		// 	this.$emit('update:visible', val);
		// },
		show(id) {
			this.visible = true;
			this.id = id;
		},	
		close () {
      		this.visible = false;
    	},
		// handleRefresh () {
		// 	this.shrinkVisible = false;
		// },
		save () {
			this.$refs['form'].validate(_=>{
				if(_) {
					const url = `${URL}/${this.id}`;
					const data = this.$tool.deepCopy(this.form);
					const success = _=>{
						this.$emit('refresh');
						this.$message({type: 'success', message: _.info });
					};
					const complete = _=>{
						this.btn_disabled = false;
					}
					this.btn_disabled = true;
					this.$axiosPut({ url, data, success, complete });
				}
			})
		},
		deleteEstimate ({id}) {
			this.$confirm(`确认删除年费评估单？删除操作无法恢复，只能重新添加！`,'删除确认',{
				type: 'warning',
			})
			.then(_=>{
				const url = URL;
				const data = {id: this.id};
				const success = _=> {
					this.$emit('refresh');
					this.$message({type: 'success', message: _.info });
				};
				const complete = _=>{
					this,btn_disabled = false;
				};
				this.btn_disabled = true;
				this.$axiosDelete({ url, data, success });

			}).catch(_=>{

			})
		},
		sendMail () {
			this.$refs.mail_add.show('年费通知', this.id);
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
		}
	},
	components: {
		AppShrink,
		FeesList,
		OfficialFees,
		AgentFees,
		Mails,
		MailAdd,
	},
}
</script>