<!-- 转档 -->
<template>
  <el-form :model="form" label-width="100%" label-position="top">
    <el-form-item label="第一步:上传专利说明书（仅支持.doc/.docx格式）">
      <el-upload
        class="upload-demo"
        action="/api/files?action=cpcpdf"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :file-list="fileList"
        :headers="auth"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="或从已上传的文件中选择要转档的文件">
      <el-input></el-input>
    </el-form-item>
    <template v-if="uploadSuccess">
      <el-form-item :label="label">
        <template>
          <table-component v-loading="loading" :tableOption="tableOption" :data="tableData"></table-component>
        </template>
      </el-form-item>
    </template>
    <template v-if="showTitle">
      <el-form-item label="标题">
        <el-input></el-input>
      </el-form-item>
    </template>
    <template v-if="!turnArchivesSuccess">
      <el-form-item class="turn-archives-tip" :label="defeated"></el-form-item>
    </template>
    <!--<el-form-item>-->
    <el-button style="margin-top: 10px" type="primary" @click="saveResult">保存结果</el-button>
    <!--</el-form-item>-->
  </el-form>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
export default {
  name: "TurnArchives",
  data() {
    return {
      form: {},
      fileList: [],
      uploadSuccess: false,
      loading: false,
      turnArchivesSuccess: true,
      showTitle: false,
      tableData: [],
      label: "第二步，耐心等待服务器完成转档操作，平均用时约20秒，已用时秒",
      defeated:
        "转档失败，一般是由于系统无法识别说明书的章节，请使用系统推荐模板撰写说明书",
      tableOption: {
        name: "TurnArchivesFile",
        height: 120,
        highlightCurrentRow: true,
        is_search: false,
        is_pagination: false,
        is_list_filter: false,
        list_type: "serial",
        columns: [
          {
            type: "text",
            label: "文件名称",
            prop: "filename",
            min_width: "150"
          },
          { type: "text", label: "起始页码", prop: "begin", width: "100" },
          {
            type: "text",
            label: "页数",
            prop: "project_subtype",
            width: "120"
          },
          { type: "text", label: "操作", prop: "action", width: "120" }
        ]
      }
    };
  },
  methods: {
    reset() {
      this.uploadSuccess = false;
      this.loading = false;
      this.turnArchivesSuccess = true;
      this.showTitle = false;
      this.tableData = [];
      this.fileList = [];
    },
    handleChange() {},
    handleSuccess(r, f, fl) {
      this.uploadSuccess = true;
      this.handleTurnArchives();
      this.loading = true;
    },
    handleTurnArchives() {
      let time = 1;
      let keepTime = setInterval(() => {
        this.label = `第二步，耐心等待服务器完成转档操作，平均用时约20秒，已用时${time++}秒`;
      }, 1000);
      let timer = setInterval(() => {
        this.getResult(timer, keepTime);
      }, 3000);
    },
    getResult(timer, keepTime) {
      const success = _ => {
        if (_.status === 200) {
          this.loading = false;
          this.turnArchivesSuccess = false;
          this.showTitle = true;
          clearInterval(timer);
          clearInterval(keepTime);
        }
      };
      // this.$axiosPost({url,data:{},success});
    },
    saveResult() {
      this.reset();
    }
  },
  computed: {
    auth() {
      return { Authorization: window.localStorage.getItem("token") };
    }
  },
  components: {
    TableComponent
  }
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
<style>
.turn-archives-tip .el-form-item__label {
  color: #ec2b57;
}
</style>