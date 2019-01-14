<template>
  <el-form label-width="100px" ref="bussinessForm" :model="form" :rules="rules">
    <el-form-item label="客户" prop="customer">
      <remote-select
        type="customer"
        :page-type="type"
        v-model="form.customer"
        :para="customerParam"
        @input="customerChanged"
        add-type="customer"
      ></remote-select>
    </el-form-item>
    <el-form-item label="IPR" prop="ipr">
      <remote-select
        type="ipr_para"
        :page-type="type"
        v-model="form.ipr"
        :para="customerParam"
        add-type="contact"
      ></remote-select>
    </el-form-item>
    <el-form-item label="技术联系人">
      <remote-select
        type="contacts"
        :page-type="type"
        v-model="form.contact"
        :para="customerParam"
        add-type="contact"
      ></remote-select>
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
      <jump-select type="contracts" v-model="form.contracts" multiple :para="customerParam"></jump-select>
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
        contracts: [],
        fee_policy: 1,
        fees: [],
        order: ""
      },
      fees: [],
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
        obj: ["service", "contract_type", "fee_policy", "contract"]
      });
    },
    submitForm() {
      return this.$tool.shallowCopy(this.form, {});
    },
    checkForm(callback) {
      let flag = true;
      this.$refs.bussinessForm.validate(_ => {
        flag = _;
        callback(flag);
      });
    },
    loadDefaultFees() {
      if (!(this.form.customer && this.form.service)) {
        return;
      }
      if (this.form.customer == "") {
        return;
      }

      const url =
        "/quotations?customer=" +
        this.form.customer +
        "&service=" +
        this.form.service;
      const success = _ => {
        //有客户报价
        if (_.data.data.length > 0) {
          this.form.fees = [];
          const fee = _.data.data[0];
          if (fee.service_fee > 0) {
            this.form.fees.push({
              fee_type: _.data.service_fee_code,
              amount: fee.service_fee,
              currency: fee.service_fee_currency,
              request_timing: 1
            });
          }
          if (fee.official_fee > 0) {
            this.form.fees.push({
              fee_type: _.data.official_fee_code,
              amount: fee.official_fee,
              currency: fee.official_fee_currency,
              request_timing: 1
            });
          }
        } else {
          console.log("load service data");
          this.loadDefaultServiceQuotation();
        }
      };
      this.$axiosGet({
        url: url,
        success
      });
    },
    loadDefaultServiceQuotation() {
      const url = "/services/" + this.form.service;
      const success = _ => {
        if (_.status) {
          this.form.fees = [];
          const fee = _.services;
          if (fee.service_fee > 0) {
            this.form.fees.push({
              fee_type: fee.service_fee_code,
              amount: fee.service_fee,
              currency: fee.service_fee_currency,
              request_timing: 1
            });
          }
          if (fee.official_fee > 0) {
            this.form.fees.push({
              fee_type: fee.official_fee_code,
              amount: fee.official_fee,
              currency: fee.official_fee_currency,
              request_timing: 1
            });
          }
        }
      };
      this.$axiosGet({
        url: url,
        success
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
    },
    "form.service": {
      handler(val) {
        this.loadDefaultFees();
      }
    },
    "form.customer": {
      handler(val) {
        this.loadDefaultFees();
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