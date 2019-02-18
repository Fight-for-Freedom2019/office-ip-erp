<!-- 新增延期记录 -->
<template>
  <div class="main">
    <app-shrink :visible.sync="isPanelVisible" :modal="false" :title="title">
      <span slot="header" style="float: right;">
        <app-button-loading :func="submitForm" ref="loadingBtn" text="保存" v-if="this.mode == 'add'"></app-button-loading>
      </span>
      <el-form
        label-width="160px"
        :model="form"
        :rules="rules"
        ref="form"
        style="margin-top:10px;"
        v-loading="loading"
        element-loading-text="延期数据加载中"
      >
        <el-form-item label="说明" prop="intro">
          <span>如果延长后的期限已过客户期限，必须在附件里上传客户的沟通记录</span>
        </el-form-item>
        <el-form-item label="相关案件" prop="project" v-if="this.mode == 'edit'">
          <a
            ref="project"
            style="cursor: pointer"
            @click="showPanel"
          >{{ this.project != undefined ? this.project.serial + '-' + this.project.title : '点我查看相关案件' }}</a>
        </el-form-item>
        <el-form-item label="延期前期限" prop="first_edition_deadline" v-if="this.mode == 'edit'">
          <el-date-picker
            style="width: 100%"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请输入延期后期限"
            v-model="form.first_edition_deadline"
            :disabled="true"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="延期后期限" prop="deadline">
          <el-date-picker
            style="width: 100%"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请输入延期后期限"
            v-model="form.deadline"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="附件" prop="attachments">
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

      <common-detail ref="common_detail" title="案件详情"></common-detail>
    </app-shrink>
  </div>
</template>

<script>
import RemoteSelect from "@/components/form/RemoteSelect";
import StaticSelect from "@/components/form/StaticSelect";
import JumpSelect from "@/components/form/JumpSelect";
import AppShrink from "@/components/common/AppShrink";
import Upload from "@/components/form/Upload";
import CommonDetail from "@/components/page_extension/Common_detail";

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
        deadline: "",
        first_editon_deadline: "",
        attachments: [],
        remark: ""
      },
      attachments: [],
      rules: {
        deadline: [
          { required: true, message: "请输入延期后期限", trigger: "blur" }
        ]
      },
      isPanelVisible: false,
      loading: false,
      title: "",
      mode: "add",
      project: "",
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
          data.previous_deadline = this.row.internal_deadline;
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
    showPanel() {
      this.$refs.common_detail.show(this.project.id, "patent");
    },
    show(mode, data) {
      this.mode = mode;
      this.isPanelVisible = true;

      if (mode == "add") {
        this.title = "申请延期";
        this.form.deadline = "";
        this.form.attachments = [];
        this.form.remark = "";
        this.attachments = [];
      } else {
        const id = parseInt(data);
        if (id == NaN) {
          this.title = "延期记录详情";
          this.coverObj(data);
          this.attachments = data.attachments;
          this.id = data.id;
        } else {
          //只提供了ID，调用接口加载数据
          this.loading = true;
          const url = this.URL + "/" + id;
          const success = _ => {
            this.coverObj(_.data);
            this.attachments = _.data.attachments;
            this.project = _.data.project;
            this.form.first_edition_deadline =
              _.data.process.first_edition_deadline;
            this.title =
              _.data.project.serial +
              "-" +
              _.data.project.title +
              "延期申请详情";
          };
          const complete = _ => {
            this.loading = false;
          };
          this.$axiosGet({ url, success, complete });
        }
      }
    },
    close () {
      this.isPanelVisible = false;
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
    Upload,
    CommonDetail
  }
};
</script>

<style scoped>
</style>