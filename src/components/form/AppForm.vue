<template>
	<el-form :model="form" :label-width="labelWidth" :label-position="labelPosition" :rules="rules" ref="form">
		<slot></slot>
		<template v-for="(item, index) in source">
			<template v-if="item.components == 'static_select'">
				<el-form-item :label="item.name" :prop="item.key" :key="index">
					<static-select 
						ref="static-select"
						:type="item.type"
						:multiple="item.multiple"
						v-model="form[item.key]"
						@input="handleInput"
					>
					</static-select>
				</el-form-item>
			</template>			
			<template v-else-if="item.components == 'remote_select'">
				<el-form-item :label="item.name" :prop="item.key" :key="index">
					<remote-select 
						ref="remote-select"
						:multiple="item.multiple"
						v-model="form[item.key]"
						@input="handleInput"
						:type="item.type"
					>
					</remote-select>
				</el-form-item>
			</template>
			<template v-else-if="item.components == 'date'">
				<el-form-item :label="item.name" :prop="item.key" :key="index">
					<el-date-picker
						ref="date"
						v-model="form[item.key]"
						@input="handleInput"
						:type="item.type"
						:placeholder="item.placeholder"
					>
					</el-date-picker>
				</el-form-item>
			</template>
			<template v-else-if="item.components == 'input'">
				<el-form-item :label="item.name" :prop="item.key" :key="index">
					<el-input
						ref="input"
						v-model="form[item.key]"
						@input="handleInput"
						:type="item.type"
						:placeholder="item.placeholder"
					>
					</el-input>
				</el-form-item>
			</template>
			<template v-else-if="item.components == 'switch'">
				<el-form-item :label="item.name" :prop="item.key" :key="index">
					<app-switch
						ref="switch"
						v-model="form[item.key]"
						@input="handleInput"
						:type="item.type"
					>
					</app-switch>
				</el-form-item>
			</template>
			<template v-else-if="item.components == 'slider'">
				<el-form-item :label="item.name" :prop="item.key" :key="index">
					<el-slider
						ref="slider"
						v-model="form[item.key]"
						@input="handleInput"
						show-input
					>
					</el-slider>
				</el-form-item>
			</template>
			<template v-else-if="item.components == 'upload'">
				<el-form-item :label="item.name" :prop="item.key" :key="index">
					<upload 
						ref="upload"
						v-model="form[item.key]"
						@input="handleInput"
					>
					</upload>
				</el-form-item>
			</template>
			<template v-else-if="item.components == 'panel'">
				<el-form-item :label="item.name" :prop="item.key" :key="index">
					<a ref="panel"
						href="#"
						v-model="form[item.key]"
						@click="showPanel(item.type)"
						:type="item.type"
						>{{"点我查看" + item.name}}
					</a>
				</el-form-item>
			</template>
		</template>
		<slot name="app-button"></slot>
		<app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
			<template v-if="this.type == 'order'">
				<order-manage-detail type="pay" ref="detail" :id="row.model_id"></order-manage-detail>
			</template>
			<template v-else-if="this.type == 'cpc_editor'">
				<cpc-editor type="pay" ref="detail" :id="row.model_id"></cpc-editor>
			</template>
			<template v-else-if="this.type == 'payment_request'">
				<payment-manage-detail type="pay" ref="detail" :id="row.model_id"></payment-manage-detail>
			</template>
			<template v-else-if="this.type == 'outgo_payment'">
				<cusotmer-payment-detail type="pay" ref="detail" :id="row.model_id"></cusotmer-payment-detail>
			</template>
			<template v-else-if="this.type == 'contract'">
				<contract-detail type="pay" ref="detail" :id="row.model_id"></contract-detail>
			</template>
			<template v-else-if="this.type == 'voucher'">
				<invoice-manage-detail type="pay" ref="detail" :id="row.model_id"></invoice-manage-detail>
			</template>
			<template v-else-if="this.type == 'sensitive_operation'">
				<sensitive-operation type="pay" ref="detail" :id="row.model_id"></sensitive-operation>
			</template>
		</app-shrink>
	</el-form>
</template>
<script>
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'
import JumpSelect from '@/components/form/JumpSelect'
import AppSwitch from '@/components/form/AppSwitch'
import Upload from '@/components/form/Upload'
import AppShrink from '@/components/common/AppShrink'
import OrderManageDetail from '@/components/page_extension/OrderManageDetail'
import PaymentManageDetail from '@/components/page_extension/PaymentManageDetail'
import CustomerPaymentDetail from '@/components/page/crm/suppliers/Payments'
import InvoiceManageDetail from '@/components/page_extension/InvoiceManageDetail'
import ContractsDetail from '@/components/page_extension/ContractsListAdd'
import SensitiveOperation from '@/components/page/common/SensitiveOperation'
import CpcEditor from '@/components/page/cpc/CpcEditor'

export default {
	name: 'appForm',
	props: {
		'source': {
			type: Array,
			default () {
				return []
			}
		},
		'labelWidth': {
			type: String,
			default: '80px',
		},
		'labelPosition': {
			type: String,
			default: 'right',
		},
		'rules': {
			type: Object,
			default () {
				return {}
			},
		},
		'row':{
			type: Object,
			default: {},
		}
	},
	data () {
		return {
			form: {},
			isPanelVisible: false,
			id: 0,
			type: '',
			title: '',
		}
	},
	computed: {
		allKeys () {
			if(this.source) {
				const keys = this.$tool.splitObj(this.source, 'key');
				console.log(keys);
				return keys;
			}
		},
	},
	methods: {
		handleInput (val) {
			this.$emit('input',val);
			this.$emit('formData',this.form);
		},
		showPanel (val) {
			this.type = val;
			this.title = this.row.model.name + '详情>' + this.row.serial;
			this.isPanelVisible = true;
		},
		initializeForm () {
			let val = null;
			this.source.forEach((_)=>{
				if(_.components == 'remote_select' || _.components == 'static_select') {
					val = _.multiple ? [] : '';
				}else if (_.components == 'upload'){
					val = [];
				}else {
					val = '';
				}
				this.$set(this.form, _.key, val);
			});
		},
	},
	mounted () {
		this.initializeForm();
	},
	watch: {
		source() {
			this.initializeForm();
		},
	},
	components: { StaticSelect, RemoteSelect, JumpSelect, AppSwitch, Upload,OrderManageDetail,AppShrink, PaymentManageDetail, InvoiceManageDetail, ContractsDetail, SensitiveOperation, CpcEditor,CustomerPaymentDetail  }
}
</script>
<style lang="scss" scoped>
</style>