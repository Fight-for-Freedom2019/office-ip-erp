
<template>
  <div class="task_common">
    <app-shrink :visible.sync="isTaskDetailVisible" :title="title">
      <span slot="header" style="margin-left: 10px;">
        <el-tag v-if="row.taskdef">{{ row.taskdef.name }}</el-tag>
        <el-tag v-if="row.serial">{{ row.serial }}</el-tag>
      </span>
      <span slot="header" style="float: right">
        <el-dropdown
          @command="handleOperation"
          trigger="click"
          menu-align="start"
          style="margin-left: 10px; margin-top: 4px;"
          class="tree-dropdown"
        >
          <el-button size="small">
            {{ `操作` }}
            <i class="el-icon-caret-bottom el-icon--right" style="font-size: 12px;"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="编辑任务" v-if="menusMap && menusMap.get('/task/btn/save')">编辑任务</el-dropdown-item>
            <el-dropdown-item
              command="结束任务"
              v-if="!row.status && menusMap && menusMap.get('/task/btn/close')"
            >结束任务</el-dropdown-item>
            <el-dropdown-item
              command="移交任务"
              v-if="menusMap && menusMap.get('/task/btn/transfer')"
            >移交任务</el-dropdown-item>
            <el-dropdown-item
              command="回退任务"
              v-if="menusMap && menusMap.get('/task/btn/reject')"
            >回退任务</el-dropdown-item>
            <el-dropdown-item command="申请延期">申请延期</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown
          @command="handleCommandSendMail"
          trigger="click"
          style="margin-left: 5px;"
          size="small"
          v-if="mailbtn == 'patent'"
        >
          <el-button size="small">
            发送邮件
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" class="app-dropdown-menu">
            <el-dropdown-item command="inventor_supplement">发明人补充材料</el-dropdown-item>
            <el-dropdown-item command="inventor_review">发明人看稿</el-dropdown-item>
            <el-dropdown-item command="search_report">检索报告</el-dropdown-item>
            <el-dropdown-item command="ipr_review">IPR看稿</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>

      <div>
        <el-tabs v-model="activeName" @tab-click="tabclick">
          <el-tab-pane label="前往处理" name="finish">
            <div :style="`height: ${innerHeight - 140}px; overflow-y: auto;overflow-x:hidden;`">
              <task-finish
                :id="row.id"
                :row="row"
                :process="processData"
                @submitSuccess="finishSuccess"
                @showmailbtn="showmailbtn"
                ref="finish"
                v-if="processData != undefined"
              ></task-finish>
            </div>
          </el-tab-pane>
          <el-tab-pane label="相关任务" name="relative_tasks">
            <div :style="`height: ${innerHeight - 140}px; overflow-y: auto;overflow-x:hidden;`">
              <detail :row="row" ref="taskDetail" @refreshSiblings="refreshSiblings"></detail>
            </div>
          </el-tab-pane>
          <el-tab-pane label="延期记录" name="delay">
            <div :style="`height: ${innerHeight - 140}px; overflow-y: auto;overflow-x:hidden;`">
              <delay-history :row="row" ref="delay"></delay-history>
            </div>
          </el-tab-pane>
        </el-tabs>

        <el-dialog
          title="移交任务"
          :visible.sync="dialogTranserVisible"
          class="dialog-medium"
          width="50%"
          :modal="false"
        >
          <el-form label-width="80px">
            <el-form-item label="承办人">
              <jump-select type="user" v-model="transfer_person"></jump-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px;">
              <app-button-loading :func="transferTask" ref="loadingBtn" text="保存"></app-button-loading>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-dialog title="完结任务" :visible.sync="dialogCloseVisible" size="50%" :modal="false">
          <el-form label-width="80px">
            <el-form-item label="完结备注">
              <el-form-item>
                <el-input v-model="close_reason"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px;">
              <el-button type="primary" @click="closeTask" style="margin-bottom: 0px;">提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-dialog
          title="回退任务"
          :visible.sync="dialogRejectVisible"
          class="dialog-medium"
          :modal="false"
          width="50%"
        >
          <el-form label-width="80px" ref="reject">
            <el-form-item label="流程节点">
              <static-select :type="selectSibling" v-model="taskId"></static-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px;">
              <el-button type="primary" @click="rejectTask" style="margin-bottom: 0px;">提交</el-button>
              <el-button @click="dialogRejectVisible = false" style="margin-bottom: 0px;">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 任务延期记录添加 -->
        <task-postpone ref="postpone" @refresh="refreshPostpone" :row="row"></task-postpone>

        <!-- 任务新增编辑 -->
        <task-common-edit ref="taskEdit" @editSuccess="editSuccess"></task-common-edit>

        <!-- 发送邮件 -->
        <mail-add
          style="margin-top: 10px; "
          ref="mailEdit"
          @sendSuccess="mailCallBack"
          @cancelSending="mailCallBack"
        ></mail-add>
      </div>
    </app-shrink>
  </div>
</template>

<script>
import AxiosMixins from "@/mixins/axios-mixins";
import Detail from "@/components/page_extension/TaskCommon_detail";
import RemoteSelect from "@/components/form/RemoteSelect";
import JumpSelect from "@/components/form/JumpSelect";
import StaticSelect from "@/components/form/StaticSelect";

import AppFilter from "@/components/common/AppFilter";
import AppCollapse from "@/components/common/AppCollapse";
import TableComponent from "@/components/common/TableComponent";
import AppDatePicker from "@/components/common/AppDatePicker";

import TaskFinish from "@/components/common/TaskFinish";
import AppShrink from "@/components/common/AppShrink";
import DelayHistory from "@/components/page_extension/TaskCommon_delay";
import AppointCase from "@/components/page_extension/AppointCase";
import TaskPostpone from "@/components/page_extension/TaskCommonPostpone";
import TaskCommonEdit from "@/components/page_extension/TaskCommon_edit";

import MailAdd from "@/components/page/MailAdd";

import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
// import $ from 'jquery'

const URL = "/processes";
const colorMap = new Map([
  [-2, "#339"],
  [-1, "#09C"],
  [0, "#3c3"],
  [1, "#f90"],
  [2, "#c03"]
]);
const typeMap = new Map([
  [0, "提案"],
  [1, "专利"],
  [2, "商标"],
  [3, "版权"],
  [4, "项目"],
  [5, "账单"],
  [6, "发文"]
]);
const mailMap = new Map([
  ["inventor_supplement", "发明人补充材料"],
  ["inventor_review", "发明人看稿"],
  ["search_report", "检索报告"],
  ["ipr_review", "IPR审核"]
]);
export default {
  name: "TaskCommonDetail",
  mixins: [AxiosMixins],
  props: [],
  data() {
    return {
      isTaskDetailVisible: false,
      dialogRejectVisible: false,
      dialogAddVisible: false,
      dialogEditVisible: false,
      dialogTranserVisible: false,
      dialogSettingVisible: false,
      dialogShrinkVisible: false,
      dialogDelayVisible: false,
      dialogCloseVisible: false,
      dialogActivationVisible: false,
      moreVisible: false,
      nextValue: false,
      rerender: true,
      taskIds: "",
      moreType: "",
      historyTasks: [],
      taskId: "",
      filters: {},
      activeName: "finish",
      shrinkTitle: "",
      expandOldType: "",
      expandType: "edit",
      checkedTest: [],
      transfer_person: "",
      remark: "",
      close_reason: "",
      activation_reason: "",
      days: "5",
      deleteId: "",
      mailbtn: "",
      tableData: [],
      task_toggle: "my",
      // agen: {
      //   agency_id: '',
      //   agency_agent: '',
      //   agency_type: '',
      //   remark: '',
      // },
      dialogAgenVisible: false,
      btn_disabled: false,
      install: "",
      mailVisible: false,
      pageType: "",
      loadingVisible: false,
      loadingText: "任务数据加载中",
      url: URL,
      row: {}
    };
  },
  computed: {
    ...mapGetters(["detailBase", "menusMap", "innerHeight", "userid", "processData"]),
    model: {
      get() {
        return this.deleteStatus;
      },
      set(val) {
        this.$nextTick(_ => {
          this.deleteStatus = val;
          this.$emit("input", val);
        });
      }
    },
    title() {
      if (this.row == undefined || this.row.id == undefined) return "";
      return this.row.model.id == "Patent" ||
        this.row.model.id == "Trademark" ||
        this.row.model.id == "Copyright"
        ? this.row.title
        : this.row.model.name +
            (this.row.serial != undefined ? this.row.serial : "");
    },
    expringControl() {
      return this.$route.params.item;
    },
    task_status() {
      return this.$route.meta.status;
    },
    urlParams() {
      return this.$route.query;
    },
    categoryType() {
      let type = "";

      if (this.row.category == 1) {
        type = "patent";
      }
      if (this.row.category == 3) {
        type = "copyright";
      }
      if (this.row.category == 2) {
        type = "trademark";
      }

      return type;
    },
    isCommon() {
      return (
        this.row.category == 1 ||
        this.row.category == 3 ||
        this.row.category == 2
      ); //专利 版权 商标
    },
    defaultParams() {
      const params = this.$route.meta.params;
      return params ? params : {};
    },
    custom() {
      // 自定义筛选项
      const custom = this.$route.meta.custom;
      return custom !== undefined ? custom : false;
    },
    selectSibling() {
      const arr = [];
      if (this.historyTasks && this.historyTasks.length != 0) {
        this.historyTasks.forEach(v => {
          if (v["id"] !== this.row.task.id) {
            arr.push({
              id: v["id"],
              name: `${v["process_action"]["name"]}_${v["user"]["name"]}`
            });
          }
        });
        return {
          placeholder: "请选择退回到的流程节点",
          options: arr
        };
      } else {
        return {
          placeholder: "请选择退回到的流程节点",
          options: arr
        };
      }
    }
  },
  methods: {
    ...mapMutations(["showAgencyLoad", "addScreen"]),
    ...mapActions([
      "refreshUser",
      "refreshTaskDelay",
      "addListFilter",
      "refreshFlows",
      "refreshAction",
      "refreshProcessDetail"
    ]),
    show(row) {
      this.isTaskDetailVisible = true;
      this.row = row;
      //调用完成任务显示
      // this.$nextTick(() => {
      //   this.$refs.finish.show();
      // });
    },
    handleOperation(command) {
      switch (command) {
        case "编辑任务":
          this.$refs.taskEdit.show("edit", this.row);
          break;
        case "结束任务":
          this.dialogCloseVisible = true;
          break;
        case "移交任务":
          this.dialogTranserVisible = true;
          this.transfer_person = {
            id: row.person_in_charge,
            name: row.person_in_charge_name
          };
          break;
        case "回退任务":
          this.dialogRejectVisible = true;
          break;
        case "申请延期":
          this.$refs.postpone.show("add");
          break;
      }
    },
    refreshSiblings(data) {
      console.log(data);
      this.historyTasks = data;
    },
    refreshPostpone() {
      this.$refs.delay.refreshData();
      this.close();
    },
    tabclick(tab) {
      if (tab.name == "relative_tasks") {
        this.$refs.taskDetail.refreshData();
      } else if (tab.name == "delay") {
        this.$refs.delay.refreshData();
      }
    },
    showmailbtn(scene) {
      this.mailbtn = scene;
    },
    handleCommandSendMail(command) {
      const scene = mailMap.get(command);
      if(command === 'inventor_review') {
        this.$refs.mailEdit.show_common(scene, this.row.model_id,"process_id",this.row.id);
      }else {
        this.$refs.mailEdit.show(scene, this.row.model_id);
      }
    },
    mailCallBack() {
      this.mailVisible = false;
    },
    handleReject() {
      if (this.historyTasks && this.historyTasks.length == 1) {
        this.$message({
          type: "warning",
          message: "当前任务是起始任务，不可退回"
        });
      } else {
        this.dialogRejectVisible = true;
      }
    },
    handleSendMail(id) {
      this.mailVisible = true;
      this.$nextTick(() => {
        this.$refs.mailEdit.initForm(id);
      });
    },
    transferTask() {
      const url = `${URL}/${this.row.id}/transfer`;
      const data = { user: this.transfer_person };
      const success = _ => {
        this.dialogTranserVisible = false;
        this.dialogShrinkVisible = false;
        this.$message({ message: "任务移交成功", type: "success" });
        this.refreshUser();
        this.close();
        this.$emit("update");
      };

      this.$axiosPost({ url, data, success });
    },
    closeTask() {
      const url = `${URL}/${this.row.id}/close`;
      const data = { remark: this.close_reason };
      const success = _ => {
        this.dialogCloseVisible = false;
        this.dialogShrinkVisible = false;
        this.$message({ message: "完结任务成功", type: "success" });
        this.refreshUser();

        this.$emit("update");
        this.close();
      };

      this.$axiosPost({ url, data, success });
    },
    activateTask() {
      const url = `${URL}/${this.row.id}/activate`;
      const data = { remark: this.activation_reason };
      const success = _ => {
        this.dialogActivationVisible = false;
        this.dialogShrinkVisible = false;
        this.$message({ message: "重新激活任务成功", type: "success" });
        this.refreshUser();

        this.$emit("update");
      };

      this.$axiosPost({ url, data, success });
    },
    rejectTask() {
      const url = `/processes/${this.row.id}/reject`;
      const data = {
        remark: this.remark,
        task_id: this.taskId
      };
      const success = _ => {
        this.$message({ message: "回退任务成功", type: "success" });
        this.dialogRejectVisible = false;
        window.setTimeout(_ => {
          this.close();
          this.dialogShrinkVisible = false;
          this.$emit("update");
        }, 0);
      };
      this.$axiosPost({ url, data, success });
    },
    editSuccess(process) {
      this.$message({ message: "编辑管制事项成功", type: "success" });
      this.$emit("update");
      this.close();
      this.row = process;
    },
    refreshOption() {},

    finishSuccess(data) {
      this.isTaskDetailVisible = false;
      this.$emit("refresh");
      this.$refs.taskDetail.refreshData();
      // if(data.is_send_mail) {
      //   this.mailVisible = true;
      //   this.$nextTick( () => {
      //     this.$refs.mailEdit.initForm(data.mail_id);
      //   });
      // }
    },
    close() {
      this.taskId = "";
      this.isTaskDetailVisible = false;
    }
  },
  watch: {
    row (val) {
      if(val) {
        this.refreshProcessDetail({id: val.id});
      }
    },
    deleteStatus(val) {
      if (val) {
        this.$forceUpdate();
      }
    },
    filter() {
      this.refresh();
    },
    task_toggle() {
      this.refresh();
    },
    menusMap() {
      this.refreshOption();
    }
  },
  mounted() {},
  components: {
    RemoteSelect,
    StaticSelect,
    JumpSelect,
    AppFilter,
    TableComponent,
    AppDatePicker,
    AppCollapse,
    TaskFinish,
    AppShrink,
    Detail,
    DelayHistory,
    MailAdd,
    AppointCase,
    TaskPostpone,
    TaskCommonEdit
  }
};
</script>
<style>
#app .task_common .el-dialog--small .el-upload--text {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  position: absolute;
  left: 0px;
  bottom: 4px;
}
#app .task_common .el-tabs__header {
  margin: 0 0 5px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>