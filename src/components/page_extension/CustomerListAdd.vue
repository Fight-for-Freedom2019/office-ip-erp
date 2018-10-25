<template>
  <div class="main" style="margin-top:10px;">
  	<el-form label-width="100px" ref="form" :model="form" :rules="rules">
  		
  		<el-form-item label="客户名称" prop="name">
  			<el-input v-model="form.name" ></el-input>
  		</el-form-item>
      <!-- <el-form-item label="客户代码" prop="code">
  			<el-input v-model="form.code" ></el-input>
  		</el-form-item> -->
      <el-form-item label="邮箱" prop="email_address">
  			<el-input v-model="form.email_address" ></el-input>
  		</el-form-item>
      <el-form-item label="电话" prop="phone_number">
  			<el-input v-model="form.phone_number" ></el-input>
  		</el-form-item>
      <el-form-item label="所属销售" prop="sales">
  			<static-select type="skip" v-model="form.sales"></static-select>
  		</el-form-item>
      <el-form-item label="所属顾问" prop="consultant">
  			<static-select type="skip" v-model="form.consultant"></static-select>
  		</el-form-item>
      <el-form-item label="联系人" prop="contact">
  			<!--<remote-select :single="single" type="contacts" v-model="form.contact"></remote-select>-->
          <static-select type="skip" v-model="form.contact"></static-select>
  		</el-form-item>
      <el-form-item label="地区">
  			<provincial-linkage :value="cityInfo"  class="select-city" @input="chooseAddress"></provincial-linkage>
  		</el-form-item>
      <el-form-item label="地址" prop="address">
  			<el-input v-model="form.address" ></el-input>
  		</el-form-item>
      <!-- <el-form-item label="备注" prop="remark">
  			<el-input v-model="form.remark" ></el-input>
  		</el-form-item> -->
      <el-form-item style="margin-bottom: 0px;">
          <el-button type="primary" @click="add" v-if="type === 'add'" :disabled="btn_disabled">添加</el-button>
          <el-button type="primary" @click="edit" v-if="type === 'edit'" :disabled="btn_disabled">编辑</el-button>
      </el-form-item>
  	</el-form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import PopMixins from '@/mixins/pop-mixins'
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from "@/components/form/RemoteSelect";
import ProvincialLinkage from '@/components/form/City'
const URL = '/customers'
export default {
  name: 'CustomerListAdd',
  mixins: [ PopMixins ],
  props: [ 'customer', 'row' ],
  data () {
		return {
      cityInfo:[],
      single:true,
      form: {
        name: '',
        sales_id: '',
        consultant_id:0,
        contact_id:0,
        email_address:'',
        phone_number:'',
        address:'',
        province_code:'',
        city_code:'',
        // code:'',
        // remark:'',
        
      },
      'rules': {
        'name': [{ required: true, message: '申请人名称不能为空', trigger: 'blur'},
                 { min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                ],
        'type': { required: true, message: '申请人类型不能为空', trigger: 'change' },
        'identity':[{required: true, message: '证件号码不能为空', trigger: 'blur'},
                  { min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                ],
        'postcode': [{ required: true, message: '邮编不能为空', trigger: 'blur' },
                      { pattern: /^[\d]{4}|[\d]{6}]+$/, message: '邮编为4-6位数字', trigger: 'blur' }
                    ],
        'email_address': [
                    { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮件地址格式不正确', trigger: 'blur' }],
        'phone_number': { pattern: /^1[345678]\d{9}$/, message: '手机号码或者座机号码格式错误', trigger: 'blur' },
        'address': [{ required: true, message: '地址名称不能为空', trigger: 'blur'},
                   { min: 4, max: 255, message: '地址长度应在4-225个字符之间', trigger: 'blur'},
                    { pattern: /^[^~!@#$%^&*]+$/, message: '地址不能包含非法字符', trigger: 'blur' }],
        'english_name':[
                 { pattern: /^[a-zA-Z]+$/, message: '英文名称应为英文字符', trigger: 'blur' }],
        'english_address':{ pattern: /^[a-zA-Z 0-9]+$/, message: '英文地址为英文字母、数字和空格', trigger: 'blur' },
        'is_fee_discount': { required: true, message: '费减状态备案不能为空', trigger: 'change' },
      }
		}
  },
  computed: {
  //cityName 为选择的省市区名称
    cityName() {
      const names = [];
      this.cityInfo.province && names.push(this.cityInfo.province.name + ' ')
      this.cityInfo.city     && names.push(this.cityInfo.city.name + ' ')
      this.cityInfo.block    && names.push(this.cityInfo.block.name + ' ')
      console.log("cityName",name);
      return names.join('')
    },
    ...mapGetters([
      'areaMap',
      'cityMap',
      'provinceMap',
		]),
  },
  methods: {

  	// submitForm () {
  	// 	return Object.assign({}, this.form, {customer_id: this.customerId});
    // },
    refresh(){
      this.$emit('refresh');
    },
    add(){
      console.log(this.row)
      if(this.form.name !='' && this.form.address !=''){
          const url = URL;
          const data = Object.assign({},this.form);
          const success = _=>{
            this.dialogVisible = false;
            this.refresh();
            this.$message({message: '添加成功！', type: 'success'})
          }
          this.$axiosPost({url, data, success});
      }else{
        this.$message({type: 'warning',message: '必选项不能为空！'});
      }
      
    },
    edit(){
      const url = `${URL}/${this.customer.id}`;
      const data = Object.assign({},this.form);
      const success = _=>{
        this.dialogVisible = false;
        this.refresh();
        this.$message({message: '编辑成功！', type: 'success'})
      }
      this.$axiosPut({url, data, success});
    },
    cancel(){
      this.dialogVisible = false;
    },
    chooseAddress (info) {
        this.form.province_code = info[0];
        this.form.city_code = info[1];
    },
    coverObj(val){
      if(val){
        this.cityInfo = [val.province_code - 0,val.city_code];
        this.$tool.coverObj(this.form, val, {
          obj: [ 'consultant', 'contact', 'sales'], 
          skip:[],
        });
	    }
    },
  },
  components: { 
    StaticSelect,
    ProvincialLinkage,
    RemoteSelect
  },

  watch:{
    customer:function(val,oldVal){
      this.coverObj(val);
    },
  },

  created () {
    this.coverObj(this.customer);

	},
  URL: '/api/requirements',
  REMINDER_TEXT: '申请人要求',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>