<!-- 新增报价 -->
<template>
  <div class="main">
    <app-shrink :visible.sync="isPanelVisible" :modal="false" :title="title">
      <span slot="header" style="float: right;">
        <app-button-loading :func="submitForm" ref="loadingBtn" text="保存"></app-button-loading>
      </span>
      <el-form label-width="160px" :model="form" :rules="rules" ref="form" style="margin-top:10px;">
        <el-form-item label="客户" prop="customer">
          <jump-select type="customer" v-model="form.customer"></jump-select>
        </el-form-item>

        <el-form-item label="服务项目" prop="service">
          <jump-select type="services" v-model="form.service"></jump-select>
        </el-form-item>

        <el-form-item label="代理费" prop="service_fee">
          <el-input type="text" placeholder="请输入代理费" v-model="form.service_fee"></el-input>
        </el-form-item>

        <el-form-item label="代理费币别" prop="service_fee_currency">
          <static-select type="currency" v-model="form.service_fee_currency"></static-select>
        </el-form-item>

        <el-form-item label="官费" prop="official_fee">
          <el-input type="text" placeholder="请输入官费" v-model="form.official_fee"></el-input>
        </el-form-item>

        <el-form-item label="官费币别" prop="official_fee_currency">
          <static-select type="currency" v-model="form.official_fee_currency"></static-select>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input type="text" placeholder="请输入备注" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
    </app-shrink>
  </div>
</template>

<script>
import RemoteSelect from "@/components/form/RemoteSelect";
import StaticSelect from "@/components/form/StaticSelect";
import JumpSelect from "@/components/form/JumpSelect";
import AppShrink from "@/components/common/AppShrink";

export default {
  name: "QuotationAdd",
  data() {
    return {
      URL: "/quotations",
      form: {
        customer: "",
        service: "",
        service_fee: "",
        service_fee_currency: "CNY",
        official_fee: "",
        official_fee_currency: "CNY",
        remark: ""
      },
      rules: {
        customer: [{ required: true, message: "请选择客户", trigger: "blur" }],
        service: [
          { required: true, message: "请选择服务项目", trigger: "blur" }
        ],
        service_fee: [
          { required: true, message: "请输入代理费", trigger: "blur" }
        ],
        service_fee_currency: [
          { required: true, message: "请选择代理费币别", trigger: "blur" }
        ]
      },
      isPanelVisible: false,
      title: "",
      mode: "add",
      id: 0
    };
  },
  props: {
    data: Object
  },
  mounted() {
    this.coverObj(this.data);
  },
  watch: {
    data: function(val, oldVal) {
      this.coverObj(val);
    }
  },
  methods: {
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let url;
          let data;
          let msg;
          let fun;
          if (this.mode === "add") {
            url = this.URL;
            data = this.form;
            msg = "创建";
            fun = "refresh";
          } else {
            url = `${this.URL}/${this.id}`;
            data = this.form;
            msg = "更新";
            fun = "update";
          }
          const success = _ => {
            this.$message({ type: "success", message: `${msg}成功!` });
            this.$emit(fun);
            this.isPanelVisible = false;
          };
          this.mode === "add"
            ? this.$axiosPost({ url, data, success })
            : this.$axiosPut({ url, data, success });
        } else {
          this.$message({ type: "warning", message: "请正确填写" });
        }
      });
    },
    clear() {
      this.$refs.form.resetFields();
    },
    coverObj(val) {
      val
        ? this.$tool.coverObj(this.form, val, { obj: ["customer", "service"] })
        : "";
    },
    show(mode, data) {
      this.mode = mode;
      this.isPanelVisible = true;
      if (mode == "add") {
        this.title = "新增报价";
        this.form.customer = "";
        this.form.service = "";
        this.form.service_fee = "";
        this.form.service_fee_currency = "CNY";
        this.form.official_fee = "";
        this.form.official_fee_currency = "CNY";
        this.form.remark = "";
      } else {
        this.title = "编辑报价";
        this.coverObj(data);
        this.id = data.id;
      }
    }
  },
  components: {
    RemoteSelect,
    StaticSelect,
    AppShrink,
    JumpSelect
  }
};
</script>

<style scoped>
</style>