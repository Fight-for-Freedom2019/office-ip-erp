<!-- 新增代理机构 -->
<template>
  <div class="main" style="margin-top:10px;">
    <el-form label-width="120px" :model="form" :rules="rules" ref="form">
      <el-form-item label="名称" prop="name">
        <el-input type="text" placeholder="请输入代理机构名称" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="机构代码" prop="name">
        <el-input type="text" placeholder="请输入代理机构代码" v-model="form.code"></el-input>
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
  name: "RuleAdd",
  data() {
    return {
      URL: "/agencies",
      form: {
        name: "",
        code: "",
        status: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入代理机构名称", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入代理机构代码", trigger: "blur" }
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