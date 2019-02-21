<!-- 转档 -->
<template>
  <el-form :model="form" label-width="100%" label-position="top">
    <el-tabs v-model="activeName" @tab-click="handleChange">
      <el-tab-pane label="第一步" name="stepOne">
        <el-form-item label="第一步:上传专利说明书（仅支持.doc/.docx格式）">
          <el-upload
              class="upload-demo"
              action="/api/files?action=cpcpdf"
              :on-success="handleSuccess"
              :before-upload = "handleBeforeUpload"
              :file-list="fileList"
              :headers="auth"
              accept=".doc,.docx"
          >
            <el-button size="small" type="primary" :disabled="disabled">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="或从已上传的文件中选择要转档的文件">
          <el-select v-model="selectFile" placeholder="请选择">
            <el-option
                v-for="item in amendments"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="第二步" name="stepTwo">
        <template v-if="uploadSuccess">
          <el-form-item :label=label>
            <template>
              <app-table v-loading="loading" height="260" :columns="columns" :data="tableData"></app-table>
            </template>
          </el-form-item>
        </template>
        <template v-if="showTitle">
          <el-form-item label="标题">
            <el-input v-model="title"></el-input>
          </el-form-item>
          <el-form-item class="turn-archives-tip" :label="tip"></el-form-item>
        </template>
        <template v-if="!turnArchivesSuccess">
          <el-form-item class="turn-archives-tip" :label="tip"></el-form-item>
        </template>
        <!--<el-form-item>-->
        <el-button style="margin-top: 10px" type="primary" @click="saveResult">保存结果</el-button>
        <el-button style="margin-top: 10px" @click="cancel">取消</el-button>
      </el-tab-pane>
    </el-tabs>

    <!--</el-form-item>-->
  </el-form>
</template>

<script>
  import TableComponent from "@/components/common/TableComponent";
  import AppTable from "@/components/common/AppTable";
  export default {
    name: "TurnArchives",
    data() {
      return {
        title:"",
        form: {},
        fileList: [],
        uploadSuccess: false,
        loading: false,
        turnArchivesSuccess: true,
        showTitle: false,
        tableData: [],
        selectFile: "",
        keepTime:"",
        disabled:false,
        activeName: 'stepOne',
        label: "第二步，耐心等待服务器完成转档操作，平均用时约20秒，已用时0秒",
        tip: "请一定查看以确认转档后PDF是否正确(点击文件名称查看)",
        columns: [
          {
            type: "text-btn",
            label: "文件名称",
            prop: "filename",
            click: this.viewFile,
            min_width: "150"
          },
          {type: "text", label: "起始页码", prop: "start", width: "130"},
          {
            type: "text",
            label: "页数",
            prop: "pages",
            width: "130"
          },
          {type: "action", label: "操作", align: "center", width: "120",
            btns: [
              { type: "delete", click: this.deleteFile },
              { type: "download", click: ({downloadUrl})=>{window.open(downloadUrl)} },
            ]
          }
        ],
      };
    },
    props: {
      amendments: {
        type: Array,
        default() {
          return [];
        },
      },
      otherFormMap:{
        type:Map,
        default(){
          return new Map();
        },
      },
    },
    methods: {
      handleChange(){},
      reset() {
        this.uploadSuccess = false;
        this.loading = false;
        this.turnArchivesSuccess = true;
        this.showTitle = false;
        this.tableData = [];
        this.fileList = [];
        this.activeName = "stepOne";
        this.disabled = true;
      },
      handleBeforeUpload(){
        this.disabled = true;
        this.uploadSuccess = true;
        this.loading = true;
        this.activeName = "stepTwo";
        let time = 0;
        this.keepTime = setInterval(() => {
          this.label = `第二步，耐心等待服务器完成转档操作，平均用时约20秒，已用时${time++}秒`;
        }, 1000);
      },
      handleSuccess(r, f, fl) {
        console.log("成功")
        this.disabled = false;
        if(f.response.data.list){
          this.handleTurnArchives();
          this.title = f.response.data.list.title;
          // this.tableData = f.response.data.list;
          this.fileIsView(f.response.data.list.files);
          this.tableData = this.tableData.concat(f.response.data.list.files);
        }else {
          this.handleDefeat();
          this.tip = "转档失败，一般是由于系统无法识别说明书的章节，请使用系统推荐模板撰写说明书";
        }
        this.$emit("turnArchivesFile",f.response.data.file);
        clearInterval(this.keepTime);
      },
      fileIsView(arr){
        arr.forEach((item)=>{
          item.filename = this.otherFormMap.get(item.code)?this.otherFormMap.get(item.code):item.name;
          item.isView = false;
        })
      },
      handleDefeat(){
        this.loading = false;
        this.turnArchivesSuccess = false;
      },
      handleTurnArchives() {
        this.loading = false;
        this.turnArchivesSuccess = true;
        this.showTitle = true;
      },
      viewFile(row){
        row.isView = true;
        window.open(row.viewUrl);
      },
      deleteFile(row){
        this.tableData.forEach((item,index)=>{
          if(item.id === row.id) {
            this.tableData.splice(index,1);
          }
        })
      },
      handleResult(arr){
        let bool = true;
        arr.forEach((item)=>{
          if(!item.isView && item.code !== "100000") {
            bool = false;
            this.tip = `${item.filename}.${item.ext}文件内容未确认`
          }
        })
        return bool;
      },
      saveResult() {
        if(this.handleResult(this.tableData)) {
          console.log("tableData",this.tableData);
          this.$emit("getTurnArchives", this.tableData);
          this.reset();
        }
      },
      cancel() {
        this.reset();
        this.$emit("hide")
      }
    },
    computed: {
      auth() {
        return {Authorization: window.localStorage.getItem("token")};
      }
    },
    components: {
      TableComponent,
      AppTable
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