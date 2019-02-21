<!-- 编辑CPC通知书案件关联 -->
<template>
  <div class="main" style="margin-top:10px;">
    <el-form label-width="120px" :model="form" :rules="rules" ref="form">
      <el-form-item label="描述" prop="description">
        <el-input type="text" placeholder="请输入描述" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="配置" prop="config">
        <el-input
          type="textarea"
          placeholder="请输入描述"
          v-model="form.config"
          :autosize="{ minRows: 20}"
        ></el-input>
      </el-form-item>
      <el-form-item label="Excel文件" prop="file" v-if="type == 'edit'">
        <upload v-model="form.file"></upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Upload from "@/components/form/Upload";
import { mapActions } from "vuex";

export default {
  name: "ExcelEdit",
  data() {
    return {
      URL: "/excels",
      form: {
        description: "",
        config: "",
        file: []
      },
      rules: {},
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
  computed: {
    is_tenant: function() {
      return this.$store.getters.getUser.tenants;
    }
  },
  watch: {
    data: function(val, oldVal) {
      this.coverObj(val);
    }
  },
  methods: {
    ...mapActions(["initializeSelectorCache"]),
    tenantChanged(val) {
      this.param = val ? { tenant_id: val } : null;
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
            this.$emit("saved");
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
      val ? this.$tool.coverObj(this.form, val) : "";
    }
  },
  components: { Upload }
};
</script>

<style scoped>
</style>