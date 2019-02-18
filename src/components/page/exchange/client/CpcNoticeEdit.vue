<!-- 编辑CPC通知书案件关联 -->
<template>
  <div class="main" style="margin-top:10px;">
    <el-form label-width="120px" :model="form" :rules="rules" ref="form">
      <el-form-item label="代送件用户" prop="tenant">
        <jump-select
          type="tenant"
          placeholder="请选择代送件用户"
          v-model="form.tenant"
          @input="tenantChanged"
        ></jump-select>
      </el-form-item>

      <el-form-item label="相关案件" prop="project">
        <jump-select type="专利" placeholder="请选择案件引用" v-model="form.project" :para="param"></jump-select>
      </el-form-item>

      <el-form-item label="导入状态" prop="is_imported">
        <static-select type="cpc_notice_imported" placeholder="请输入备注" v-model="form.is_imported"></static-select>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input type="text" placeholder="请输入备注" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import RemoteSelect from "@/components/form/RemoteSelect";
import JumpSelect from "@/components/form/JumpSelect";
import StaticSelect from "@/components/form/StaticSelect";
import AppSwitch from "@/components/form/AppSwitch";
import { mapActions } from "vuex";

export default {
  name: "CpcNoticeEdit",
  data() {
    return {
      URL: "/cpc_notices",
      form: {
        project: "",
        remark: "",
        is_imported: false
      },
      rules: {
        project: [{ required: false, message: "请选择案件", trigger: "blur" }]
      },
      param: null
    };
  },
  props: {
    data: Object,
    type: String
  },
  created() {},
  mounted() {
    this.coverObj(this.data);
  },
  watch: {
    data: function(val, oldVal) {
      this.coverObj(val);
    }
  },
  methods: {
    ...mapActions(["initializeSelectorCache"]),
    tenantChanged(val) {
      val ? (this.param = { tenant_id: val }) : false;
    },
    submitForm(type, id) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let url;
          let data;
          let msg;
          let fun;
          if (type === "add") {
            url = this.URL;
            data = this.form;
            msg = "创建";
            fun = "refresh";
          } else {
            url = `${this.URL}/${id}`;
            data = this.form;
            msg = "修改";
            fun = "update";
          }
          const success = _ => {
            this.$message({ type: "success", message: `${msg}成功!` });
            this.$emit(fun);
          };
          type === "add"
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
        ? this.$tool.coverObj(this.form, val, {
            obj: ["project", "is_imported"]
          })
        : "";
    }
  },
  components: {
    RemoteSelect,
    StaticSelect,
    AppSwitch,
    JumpSelect
  }
};
</script>

<style scoped>
</style>