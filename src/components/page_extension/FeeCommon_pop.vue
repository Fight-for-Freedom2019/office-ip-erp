<template>
  
</template>

<script>

import Patent from '@/components/form/Patent'
import Member from '@/components/form/Member'
import FeeStatus from '@/components/form/FeeStatus'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'


const URL = '/api/fees'

export default {
  name: 'FeeCommonPop',
  props: {
  	feeType: Number,
  },
  data () {
		return {
		  id: '',
		  type: '',
		  dialogVisible: false,
		  feeAnnual: false,
		  form: {
		  	project: '',
		  	target: '',
		  	code: '',
		  	status: 0,
		  	money: {
		  		amount: '',
		  		currency: '',
		  		roe: '',
		  	},
		  	due_time: '',
		  	deadline: '',
		  	pay_time: '',
		  	invoice_entity_id: '',
		  	remark: '',
		  	
		  },
		  loading: false,
		  options: {
		  	currencyType: [
		  		{label:"人民币[CNY]",value:"CNY"},
		  		{label:"美元[USD]",value:"USD"},
		  		{label:"欧元[EUR]",value:"EUR"},
		  		{label:"日元[JPY]",value:"JPY"},
		  		{label:"韩元[KRW]",value:"KRW"},
		  		{label:"港币[HKD]",value:"HKD"},
		  		{label:"新台币[NTD]",value:"NTD"},
		  		{label:"英磅[GBP]",value:"GBP"},
		  		{label:"德国马克[DEM]",value:"DEM"},
		  		{label:"瑞士法郎[CNY]",value:"CHF"},
		  		{label:"加拿大元[CAD]",value:"CAD"},
		  		{label:"澳大利亚元[AUD]",value:"AUD"},
		  		{label:"新西兰元[NZD]",value:"NZD"},
		  	]
		  },
		}
  },
  computed: {
  	title () {
  		const key1 = this.type == 'add' ? '新增' : '编辑';
  		const key2 = this.feeType == 1 ? '应收' : '应付';
  		return `${key1}${key2}费用`;
  	},
  	submitForm: {
  		get () {
  			const form = this.form;
  			const o = {};
  			for(let k in form) {
  				const d = form[k];
  				if(k == 'money') {
  					Object.assign(o, d);
  				}else if(d instanceof Date) {
  					o[k] = this.$tool.getDate(d);
  				}
  				else {
  					o[k] = d;
  				}
  			}
  			o['debit'] = this.feeType;

  			return o;
  		},
  		set (val) {
  			const arr = ['amount', 'currency', 'roe'] 

  			this.id = val.id;
  			this.$tool.coverObj(this.form, val);
  			if(this.form.code) {
  				this.form.code = this.form.code.id;
  			}
  			this.form.status = this.form.status.id;
  			arr.forEach( d=>{this.form.money[d] = val[d] });
  		}
  	}
  },
  methods: {
  	show (type='add', row) {
  		this.type = type;
  		this.dialogVisible = true;
  		this.$nextTick(()=>{
  			if(type == 'edit') {
	  			this.submitForm = row;
  			}
  		});
  		
  	},
  	cancel() {
  		this.dialogVisible = false;
  	},
  	add () {
  		if(this.form.status != 100 && this.form.pay_time) {
  			return this.$message({type: 'warning', message: '未付款的状态不能选择支付时间'});
  		}
  		if(this.form.status == 100 && !this.form.pay_time) {
  			return this.$message({type: 'warning', message: '请选择支付时间'});
  		}
  		const url = URL;
  		const data = this.submitForm;
  		const success = ()=>{ 
  			this.$message({type: 'success', message: '添加费用成功'});
  			this.dialogVisible = false; 
  			this.$emit('refresh'); 
  		};
  		const complete = _=>{
  			this.loading = false;
  		}
  		this.loading = true;
  		this.$axiosPost({url, data, success, complete});
  	},
  	edit () {
  		if(this.form.status == 100 && !this.form.pay_time) {
  			return this.$message({type: 'warning', message: '请选择支付时间'});
  		}
  		const url = `${URL}/${this.id}`;
  		const data = this.submitForm;
  		const success = ()=>{ 
  			this.$message({type: 'success', message: '编辑费用成功'});
  			this.dialogVisible = false;
  			this.$emit('refresh') 
  		};
  		const complete = _=>{
  			this.loading = false;
  		}
  		this.loading = true;
  		this.$axiosPut({url, data, success, complete});
  	},
  	codeChange ({amount, name}) {
  		this.form.money.amount = amount;
  		this.form.money.currency = 'CNY';
  		this.form.money.roe = "1";

  		const reg = /年费/;
  		this.feeAnnual = reg.test(name); 
  	},
  },
  watch: {
		'form.code': {
			handler () {
				this.$nextTick(_=>{
					const val = this.$refs.fee_code.getSelected()[0];
					// console.log(val);
					if(val) {
						this.codeChange(val);
					}	
				})
				
			}
		}
	},
  components: { Patent, Member, FeeStatus, RemoteSelect, StaticSelect },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>