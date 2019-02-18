<!-- 编辑CPC通知书案件关联 -->
<template>
  <div class="main" style="margin-top:10px;">
    <el-form label-width="100px" :model="form" :rules="rules" ref="form">
      <el-form-item label="相关案件" prop="project">
        <jump-select type="专利" placeholder="请选择相关案件" v-model="form.project"></jump-select>
      </el-form-item>

      <el-form-item label="案卷包状态" prop="filing_status">
        <static-select type="cpc_archive_status" placeholder="请输入备注" v-model="form.filing_status"></static-select>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input type="text" placeholder="请输入备注" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import JumpSelect from "@/components/form/JumpSelect";
import StaticSelect from "@/components/form/StaticSelect";
import { mapActions } from "vuex";

export default {
  name: "CpcArchiveEdit",
  data() {
    return {
      URL: "/cpc_archives",
      form: {
        project: "",
        remark: "",
        filing_status: 1
      },
      rules: {
        project: [{ required: false, message: "请选择案件", trigger: "blur" }]
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
            obj: ["project", "filing_status"]
          })
        : "";
    }
  },
  components: {
    JumpSelect,
    StaticSelect
  }
};
</script>

<style scoped>
</style>