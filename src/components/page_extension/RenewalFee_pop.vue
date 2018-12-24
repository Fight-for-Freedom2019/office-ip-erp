<template>
  <!-- <el-dialog :title="title" :visible.sync="dialogVisible" class="dialog-small"> -->
  <app-shrink :title="title" :visible.sync="dialogVisible">
     <span slot="header" style="float: right;">
        <el-button type="primary" @click="edit" :loading="btn_disabled" size="mini">{{ btn_disabled ? '保存中...' : '保存' }}</el-button>
      </span>  
  	<el-form label-width="80px" ref="form" :model="form" :rules="rules">
  		
  		<el-form-item label="案件引用" prop="project">
				<remote-select type="project" v-model="form.project"></remote-select>
			</el-form-item>
<!-- 			<el-form-item label="年费对象" prop="target">
				<remote-select type="member" v-model="form.target"></remote-select>
			</el-form-item>
      <el-form-item label="年费地区" prop="area">
        <static-select type="area" v-model="form.area"></static-select>
      </el-form-item> -->
      <el-form-item label="年费类型" prop="fee_code">
        <static-select  type="fee_code_renewal" v-model="form.fee_code" ref="fee_code" ></static-select>
      </el-form-item>
			<el-form-item label="费用金额" prop="money">
				<el-row>	
					<el-col :span="16" style="padding-right: 5px;">
						<el-input v-model="form.money.amount" placeholder="请输入费用金额">
							<static-select slot="prepend" style="width: 150px;" type="currency" v-model="form.money.currency"></static-select>
						</el-input>
					</el-col>

					<el-col :span="8" style="padding-left: 5px;">
						<el-input v-model="form.money.roe" placeholder="请输入执行汇率">
							<template slot="prepend">执行汇率</template>
						</el-input>
					</el-col>

				</el-row>
			</el-form-item>

<!-- 			<el-row>
				<el-col :span="12">
					<el-form-item label="费用期限" prop="due_time">
						<el-date-picker v-model="form.due_time" type="date" placeholder="请选择费用期限"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="官方绝限" prop="deadline">
						<el-date-picker v-model="form.deadline" type="date" placeholder="请选择绝限"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
  	 -->
  		<el-form-item prop="remark" label="备注">
  			<el-input type="textarea" v-model="form.remark" placeholder="请填写年费备注"></el-input>
  		</el-form-item>
  	</el-form>
  </app-shrink>  
  <!-- </el-dialog> -->
</template>

<script>
import PopMixins from '@/mixins/pop-mixins'
import AppShrink from '@/components/common/AppShrink'
import RemoteSelect from '@/components/form/RemoteSelect'
import StaticSelect from '@/components/form/StaticSelect'
import { checkMoney } from '@/const/validator.js'
import { mapGetters } from 'vuex'

export default {
  name: 'renewalFeePop',
  mixins: [ PopMixins ],
  data () {
		return {
      form: {
      	project: '',
        area: '',
      	fee_code: '',
      	money: {
      		amount: '',
      		currency: '',
      		roe: '',
      	},
      	// due_time: '',
      	// deadline: '',
      	remark: '',
      	// target: '',
      },
      rules: {
        'project': { type: 'number', required: true, message: '请选择案件引用' ,trigger: 'change',},
      	// 'area': { required: true, message: '请选择年费地区',trigger: 'change',},
      	'fee_code': { type: 'number', required: true, message: '请选择年费类型',trigger: 'change', },
      	// 'target': { type: 'number', required: true, message: '请选择年费对象',trigger: 'change', },
      	'money': { 
          type: 'object',
          required: true,
          trigger: 'change', 
          validator: (a,b,c)=>{
            checkMoney(a, b, c);
       		},
       	},
      	'deadline': { type: 'date', required: true, message: '请选择官方绝限',trigger: 'blur', },
      }
		}
  },
  computed: {
    ...mapGetters([
      'roeData',
    ]),
    areaFilter () {
      const value = this.form.area;
      if(value) {
        return [{key: 'area', value}];
      }else {
        return [{key: 'area', value: ''}];
      }
    }
  },
  methods: {
  	submitForm () {
  		const s = this.$tool.shallowCopy(this.form, {date: true, skip: ['money']});
      const obj = {
        amount: this.form.money.amount,
        roe: this.form.money.roe,
        currency: this.form.money.currency,
      };
  		return Object.assign(s, obj);  		
  	},
    setForm(d) {
      console.log(d)
      this.$tool.coverObj(this.form,d,{
        obj: ['project','fee_code'],
      });
      if(d.amount) {
        this.form.money.amount = d.amount;
      }
      if(d.roe) {
        this.form.money.roe = d.roe;
      }
      if(d.currency) {
        this.form.money.currency = d.currency;
      }
    },
  },
  watch: {
		'form.fee_code': {
			handler (v) {
				const val = this.$refs.fee_code.getSelected(v)[0];
				if(val) {
					this.form.money.currency = 'CNY';
					this.$tool.coverObj(this.form.money, val);
				}				
			}
		},
    'form.money.currency': {
      handler (v) {
        const val = this.roeData[v];
        if(val) {
          this.form.money.roe = val;
        }
      }
    }
	},
	URL: '/renewal_fees',
  REMINDER_TEXT: '年费',
  components: {
  	StaticSelect,
  	RemoteSelect,
    AppShrink,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>