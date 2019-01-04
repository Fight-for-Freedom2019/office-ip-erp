<!-- 代理人详情 -->
<template>
  <div class="main" style="margin-top:10px;">
    <el-form label-width="120px" :model="form" :rules="rules" ref="form">
      <el-form-item label="代理机构" prop="name">
        <remote-select type="agency" v-model="form.agency"></remote-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input type="text" placeholder="请输入姓名" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="执业证号" prop="certificate">
        <el-input type="text" placeholder="请输入执业证号" v-model="form.certificate"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phone_number">
        <el-input type="text" placeholder="请输入办公电话" v-model="form.phone_number"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="name">
        <static-select type="status" placeholder="请输入代理机构状态" v-model="form.status"></static-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import RemoteSelect from "@/components/form/RemoteSelect";
import StaticSelect from "@/components/form/StaticSelect";
import AppSwitch from "@/components/form/AppSwitch";
import { mapActions } from "vuex";

export default {
  name: "AgentDetail",
  data() {
    return {
      URL: "/agents",
      form: {
        agency: "",
        name: "",
        certificate: "",
        phone_number: "",
        status: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入代理人姓名", trigger: "blur" }
        ],
        agency: [
          { required: true, message: "请选择代理机构", trigger: "blur" }
        ],
        certificate: [
          { required: true, message: "请输入执业证号", trigger: "blur" }
        ],
        phone_number: [
          { required: true, message: "请输入办公电话", trigger: "blur" }
        ]
      }
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
            obj: []
          })
        : "";
    }
  },
  components: {
    RemoteSelect,
    StaticSelect,
    AppSwitch
  }
};
</script>

<style scoped>
</style>