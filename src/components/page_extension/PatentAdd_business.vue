<template>
  <el-form label-width="100px" ref="bussinessForm" :model="form" :rules="rules">
    <el-form-item label="客户" prop="customer">
      <remote-select
        type="customer"
        :page-type="type"
        v-model="form.customer"
        :para="customerParam"
        @input="customerChanged"
      ></remote-select>
    </el-form-item>
    <el-form-item label="IPR" prop="ipr">
      <remote-select type="ipr_para" :page-type="type" v-model="form.ipr" :para="customerParam"></remote-select>
    </el-form-item>
    <el-form-item label="技术联系人">
      <remote-select type="contacts" :page-type="type" v-model="form.contact" :para="customerParam"></remote-select>
    </el-form-item>
    <el-form-item label="客户案号" prop="customer_serial">
      <el-input v-model="form.customer_serial" placeholder="请填写客户案号"></el-input>
    </el-form-item>
    <el-form-item label="服务类型" prop="service">
      <static-select type="services" v-model="form.service"></static-select>
    </el-form-item>
    <el-form-item label="合同类型" prop="contract_type">
      <static-select type="contract_mode" v-model="form.contract_type"></static-select>
    </el-form-item>
    <el-form-item label="相关合同" prop="contract">
      <jump-select type="contracts" v-model="form.contract" multiple :para="customerParam"></jump-select>
    </el-form-item>
    <el-form-item label="费用策略" prop="fee_policy">
      <static-select type="fee_mode" v-model="form.fee_policy"></static-select>
    </el-form-item>
    <el-form-item label="费用清单" prop="fees" v-if="form.fee_policy == 1 && type == 'add'">
      <fee-list v-model="form.fees"></fee-list>
    </el-form-item>
    <el-form-item label="关联订单" prop="order" v-if="form.fee_policy == 2">
      <jump-select type="orders" v-model="form.order" :para="customerParam"></jump-select>
    </el-form-item>
  </el-form>
</template>

<script>
import StaticSelect from "@/components/form/StaticSelect";
import RemoteSelect from "@/components/form/RemoteSelect";
import JumpSelect from "@/components/form/JumpSelect";
import FeeList from "@/components/form/FeeList";

export default {
  name: "patentAddBusiness",
  props: {
    type: String,
    customer: Number
  },
  data() {
    return {
      contractObj: {},
      form: {
        customer: [],
        ipr: "",
        contact: "",
        service: "",
        customer_serial: "",
        contract_type: 1,
        contract: "",
        fee_policy: "",
        fees: [],
        order: ""
      },
      rules: {
        customer: {
          type: "number",
          required: true,
          message: "客户不能为空",
          trigger: "change"
        },
        ipr: {
          type: "number",
          required: true,
          message: "IPR不能为空",
          trigger: "change"
        },
        contact: {
          type: "number",
          required: true,
          message: "技术联系人不能为空",
          trigger: "change"
        },
        service: {
          type: "number",
          required: true,
          message: "服务类型不能为空",
          trigger: "change"
        },
        contract_type: {
          type: "number",
          required: true,
          message: "合同类型不能为空",
          trigger: "change"
        },
        fee_policy: {
          type: "number",
          required: true,
          message: "费用策略不能为空",
          trigger: "change"
        },
        fees: {
          type: "array",
          required: true,
          message: "费用清单不能为空",
          trigger: "change"
        }
      }
    };
  },
  computed: {
    customerParam() {
      return this.customer ? { customer: this.customer } : null;
    }
  },
  methods: {
    customerChanged() {
      this.$emit("customerChanged", this.form.customer);
    },
    setForm(data) {
      this.$tool.coverObj(this.form, data, {
        obj: ["service", "contract_type", "fee_policy"]
      });
    },
    submitForm() {
      return this.$tool.shallowCopy(this.form, { });
    },
    checkForm(callback) {
      let flag = true;
      this.$refs.bussinessForm.validate(_ => {
        flag = _;
        callback(flag);
      });
    }
  },
  watch: {
    // 'form.customer': {
    //   handler(val) {
    //       if(val && val.length != 0) {
    //         if(val[0].contract_type) {
    //           this.form.contract_type = val[0].contract_type;
    //         }
    //         if(val[0].fee_policy) {
    //           this.form.fee_policy = val[0].fee_policy;
    //         }
    //       }
    //   },
    //   deep: true,
    // },
    "form.contract_type": {
      handler(val) {
        const obj = {};
        obj.type = val;
        this.contractObj = obj;
      }
    }
  },
  components: {
    StaticSelect,
    RemoteSelect,
    JumpSelect,
    FeeList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>