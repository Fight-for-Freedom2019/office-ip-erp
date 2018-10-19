<template>
  <el-form label-width="120px" ref="bussinessForm" :model="form" :rules="rules">
      <el-form-item label="客户" prop="customer">
        <remote-select type="customer" :page-type="type" v-model="form.customer"></remote-select>
      </el-form-item >
      <el-form-item label="服务类型" prop="service">
        <static-select type="service" v-model="form.service"></static-select>
      </el-form-item>
      <el-form-item label="合同类型" prop="contract_mode">
        <static-select type="contract_mode" v-model="form.contract_mode"></static-select>
      </el-form-item>
      <el-form-item label="相关合同" prop="contracts">
        <remote-select type="contracts" v-model="form.contracts" multiple></remote-select>
      </el-form-item>
      <el-form-item label="费用类型" prop="fee_mode">
        <static-select type="fee_mode" v-model="form.fee_mode"></static-select>
      </el-form-item>
      <el-form-item label="预付比例" prop="prepay_ratio">
        <el-input v-model="form.prepay_ratio" placeholder="请填写预付比例"></el-input>
      </el-form-item>
      <el-form-item label="费用清单" prop="fees">
        <fee-list v-model="form.fees"></fee-list>
      </el-form-item>
  </el-form>
</template>

<script>
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'
import FeeList from '@/components/form/FeeList'

export default {
  name: 'patentAddBusiness',
  props: ['type'],
  data () {
    return {
      form: {
        customer: [],
        service: '',
        contract_mode: '',
        contracts: [],
        fee_mode: '',
        prepay_ratio: '',
        fees: [],
      },
      rules: {
        'customer':{type: 'array', required: true, message: '客户不能为空', trigger: 'change'},
        'service':{type: 'number', required: true, message: '服务类型不能为空', trigger: 'change'},
        'contract_mode':{type: 'number', required: true, message: '合同类型不能为空', trigger: 'change'},
        'contracts':{type: 'array', required: true, message: '合同不能为空', trigger: 'change'},
        'fee_mode':{type: 'number', required: true, message: '费用类型不能为空', trigger: 'change'},
        'perpay_ratio':{required: true, message: '预付比例不能为空', trigger: 'change'},
        'fees':{type: 'array', required: true, message: '费用清单不能为空', trigger: 'change'},
      }
    }
  },
  methods: {
    setForm (data) {
      this.$tool.coverObj(this.form, data, {
        obj: ['customer', 'service', 'contract_mode', 'fee_mode',], 
        skip:['prepay_ratio'],
      });
    },
    submitForm () {
      return this.form;
    },
    checkForm (callback) {
       let flag = true;
      this.$refs.bussinessForm.validate(_=>{
        flag = _;
        callback(flag);
      });
    },
  },
  watch: {
    'form.customer': {
      handler(val) {
          if(val && val.length != 0) {
            if(val[0].contract_mode) {
              this.form.contract_mode = val[0].contract_mode;
            }
            if(val[0].fee_mode) {
              this.form.fee_mode = val[0].fee_mode;
            }
          }
      },
      deep: true,
    },
  },
  components: { 
    StaticSelect,
    RemoteSelect,
    FeeList,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>