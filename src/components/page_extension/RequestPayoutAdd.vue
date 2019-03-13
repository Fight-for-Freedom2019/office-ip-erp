<template>
  <div class="main">
    <el-form label-width="120px" :model="form" :rules="rules" ref="form">
      <el-row>
        <el-col :span="24">
          <el-form-item label="费用对象" prop="user" style="margin-top:10px;">
            <jump-select
                v-if="fee_type === 'pay'"
                type="target"
                :pageType="type"
                v-model="form.user"
            ></jump-select>
            <jump-select type="customer" v-else :pageType="type" v-model="form.user"></jump-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="相关案件" prop="project">
            <jump-select type="project" v-model="form.project"></jump-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="费用名称" prop="fee_code">
            <static-select type="fee_code" v-model="form.fee_code"></static-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="币别" prop="currency">
            <static-select type="currency" v-model="form.currency"></static-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="汇率" prop="roe">
            <el-input type="text" placeholder="请输入汇率" v-model="form.roe"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="金额" prop="amount">
            <el-input type="text" v-model="form.amount" placeholder="请输入金额"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="费用期限" prop="deadline">
            <el-date-picker
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间"
                v-model="form.deadline"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款时间" prop="payment_time">
            <el-date-picker
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择时间"
                v-model="form.payment_time"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="费用策略" prop="policy">
            <static-select type="policy" v-model="form.policy"></static-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="费用状态" prop="status">
            <static-select :type="fee_type === 'pay' ? 'fee_status_payment' : 'fee_status_income'"
                           v-model="form.status"></static-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" v-if="fee_type !== 'pay'">
          <el-form-item label="请款时机" prop="payment_request_timing">
            <static-select type="payment_request_timing" v-model="form.payment_request_timing"></static-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" placeholder="请填写备注" v-model="form.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import RemoteSelect from "@/components/form/RemoteSelect";
  import JumpSelect from "@/components/form/JumpSelect";
  import StaticSelect from "@/components/form/StaticSelect";
  import {mapGetters} from "vuex";

  export default {
    name: "RequestPayoutAdd",
    data() {
      return {
        URL: "/fees",
        form: {
          user: "",
          project: "",
          currency: "",
          roe: "",
          amount: "",
          payment_time: "",
          deadline: "",
          due_time: "",
          status: "",
          order_id: "",
          fee_code: "",
          remark: "",
          payment_request_timing: "",
          policy: ""
        },
        rules: {
          customer: [{required: true, message: "请选择客户", trigger: "blur"}],
          roe: [{required: true, message: "汇率不能为空!", trigger: "blur"}],
          project: [{required: true, message: "请选择案件", trigger: "blur"}],
          amount: [{required: true, message: "请输入金额", trigger: "blur"}]
        },
        type: "add"
      };
    },
    props: {
      rowData: {
        type: Object
      },
      is_debit: {
        type: [Number, String]
      },
      // fee_type为区分收费和付费的字段，付费(pay)是面向供应商的，收费(fee)为客户
      fee_type: {
        type: String,
        default() {
          return "fee";
        }
      },
      global: {
        type: Boolean,
        default:false
      },
      pageType: {
        type: String
      }
    },
    computed: {
      ...mapGetters(["detailId", "detail_customer"]),
      // label:function () {
      //     if(this.fee_type === "pay") {
      //       return "选择供应商"
      //     }else {
      //       return "选择客户"
      //     }
      //   },
      defaultCustomer() {
        return this.detail_customer && this.detail_customer.length != 0
          ? {id: this.detail_customer[0].id, name: this.detail_customer[0].name}
          : {};
      }
    },
    methods: {
      save(type, id) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            let url;
            let message;
            let fun;
            let data = Object.assign({}, this.form);
            data.is_debit = this.is_debit;
            if (type === "add") {
              url = this.URL;
              message = "创建";
              fun = "update";
            } else {
              url = `${this.URL}/${id}`;
              message = "修改";
              fun = "refresh";
            }

            let success = _ => {
              this.$message({type: "success", message: `${message}费用成功!`});
              this.$emit(fun);
            };
            type === "add"
              ? this.$axiosPost({url, data, success})
              : this.$axiosPut({url, data, success});
          }
        });
      },
      clear() {
        this.$refs.form.resetFields();
      },
      coverObj(val) {
        val
          ? this.$tool.coverObj(this.form, val, {
            obj: ["fee_code", "policy", "status", "project","customer","user"]
          })
          : "";
      }
    },
    watch: {
      rowData: function (val, oldVal) {
        this.coverObj(val);
      },
      pageType(val) {
        if (val == "add") {
          this.form.project = this.detailId;
          this.$nextTick(() => {
            this.form.user = this.defaultCustomer;
          });
        }
      },
      fee_type: {
        handler(val) {
          if (this.global) {
            this.$nextTick(_ => {
              this.form.project = this.detailId;
              this.$nextTick(() => {
                this.form.user = this.defaultCustomer;
              });
            });
          }
        },
        immediate: true
      },
      detailId(val) {
        if (this.global){
          this.$nextTick(_ => {
            this.form.project = val;
          });
        }
      },
      defaultCustomer(val) {
        if (this.global){
          this.form.user = val;
        }
      }
    },
    mounted() {
      this.coverObj(this.rowData);
    },
    components: {
      RemoteSelect,
      JumpSelect,
      StaticSelect
    }
  };
</script>

<style scoped>
</style>
