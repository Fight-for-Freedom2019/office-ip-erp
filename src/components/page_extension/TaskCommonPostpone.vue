<!-- 新增延期记录 -->
<template>
  <div class="main">
    <app-shrink :visible.sync="isPanelVisible" :modal="false" :title="title">
      <span slot="header" style="float: right;">
        <app-button-loading :func="submitForm" ref="loadingBtn" text="保存"></app-button-loading>
      </span>
      <el-form label-width="160px" :model="form" :rules="rules" ref="form" style="margin-top:10px;">
        <el-form-item label="说明" prop="intro">
          <span>同一管制事项申请期限延期次数不得超过2次，如果延长后的期限已过客户期限，必须在附件里上传客户的沟通记录</span>
        </el-form-item>
        <el-form-item label="申请延期天数" prop="days">
          <el-input type="text" placeholder="请输入要申请延期的天数" v-model="form.days"></el-input>
        </el-form-item>
        <el-form-item label="附件" prop="days">
          <upload
            @uploadSuccess="handleUploadSuccess"
            v-model="form.attachments"
            :file-list="attachments"
          ></upload>
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
import Upload from "@/components/form/Upload";

export default {
  name: "PostponeEdit",
  props: {
    row: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      URL: "/process_postpones",
      form: {
        days: "",
        attachments: [],
        remark: ""
      },
      attachments: [],
      rules: {
        days: [{ required: true, message: "请输入延期天数", trigger: "blur" }]
      },
      isPanelVisible: false,
      title: "",
      mode: "add",
      id: 0
    };
  },
  mounted() {},
  watch: {},
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
          data.process_id = this.row.id;
          data.task_id = this.row.task.id;
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
      val ? this.$tool.coverObj(this.form, val, { obj: [] }) : "";
    },
    show(mode, data) {
      this.mode = mode;
      this.isPanelVisible = true;
      if (mode == "add") {
        this.title = "申请延期";
        this.form.days = "";
        this.form.attachments = [];
        this.form.remark = "";
      } else {
        this.title = "延期记录详情";
        this.coverObj(data);
        this.id = data.id;
      }
    },
    handleUploadSuccess(a, b, c) {
      this.$emit("uploadSuccess", a, b, c);
    }
  },
  components: {
    RemoteSelect,
    StaticSelect,
    AppShrink,
    JumpSelect,
    Upload
  }
};
</script>

<style scoped>
</style>