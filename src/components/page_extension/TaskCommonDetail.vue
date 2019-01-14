
<template>
  <div class="main" id="task_common">
    <app-shrink :visible.sync="isTaskDetailVisible" :title="title">
      <span slot="header" style="margin-left: 10px;">
        <el-tag v-if="row.taskdef">{{ row.taskdef.name }}</el-tag>
        <el-tag v-if="row.serial">{{ row.serial }}</el-tag>
      </span>
      <span slot="header" style="float: right">
        <el-button
          size="small"
          type="primary"
          @click="addPop('edit')"
          v-if="menusMap && menusMap.get('/task/btn/save')"
          style="margin-left: 0px;"
        >编辑</el-button>
        <el-button
          size="small"
          style="margin-left: 0px;"
          v-if="!row.status && menusMap && menusMap.get('/task/btn/close')"
          @click="dialogCloseVisible = true;"
        >完结</el-button>
        <el-button
          size="small"
          style="margin-left: 0px;"
          v-if="menusMap && menusMap.get('/task/btn/transfer')"
          @click="dialogTranserVisible = true; transfer_person = {id: row.person_in_charge, name: row.person_in_charge_name }"
        >移交</el-button>
        <!-- <el-button size="small" style="margin-left: 0px;" @click="postpone">延期</el-button> -->
        <!-- <el-button
          size="small"
          @click="handleReject"
          style="margin-left: 0px;"
          type="danger"
          v-if="menusMap && menusMap.get('/task/btn/reject')"
        >退回</el-button>-->
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
      <div v-loading="loadingVisible" :element-loading-text="loadingText">
        <el-tabs v-model="activeName" @tab-click="tabclick">
          <el-tab-pane label="前往处理" name="finish">
            <div :style="`height: ${innerHeight - 140}px; overflow-y: auto;overflow-x:hidden;`">
              <task-finish
                :id="row.id"
                :row="row"
                @submitSuccess="finishSuccess"
                @showmailbtn="showmailbtn"
                @more="handleMore"
                @refreshNext="handleNext"
                ref="finish"
              ></task-finish>
            </div>
          </el-tab-pane>
          <el-tab-pane label="相关任务" name="relative_tasks">
            <div :style="`height: ${innerHeight - 140}px; overflow-y: auto;overflow-x:hidden;`">
              <detail
                :row="row"
                style="margin: 10px 0;"
                @refreshSiblings="handleSiblings"
                ref="taskDetail"
              ></detail>
            </div>
          </el-tab-pane>
          <el-tab-pane label="延期记录" name="delay">
            <div :style="`height: ${innerHeight - 140}px; overflow-y: auto;overflow-x:hidden;`">
              <delay-history :row="row" ref="delay"></delay-history>
            </div>
          </el-tab-pane>
        </el-tabs>

        <el-dialog title="任务延期" :visible.sync="dialogDelayVisible" class="dialog-medium">
          <el-form label-width="80px">
            <el-form-item label="延期天数">
              <el-select v-model="days" placeholder="请选择延期天数">
                <el-option value="1"></el-option>
                <el-option value="2"></el-option>
                <el-option value="3"></el-option>
                <el-option value="4"></el-option>
                <el-option value="5"></el-option>
                <el-option value="6"></el-option>
                <el-option value="7"></el-option>
                <el-option value="8"></el-option>
                <el-option value="9"></el-option>
                <el-option value="10"></el-option>
              </el-select>
              <ul style="padding: 0">
                <li style="color:rgba(187,187,187,1);">备注：延期时间单位为工作日天数，遇假期/周末自动延长</li>
              </ul>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="remark" placeholder="请填写备注"></el-input>
              <!-- <ul style="padding: 0">
            <li style="color:rgba(187,187,187,1);">延期的任务将会自动延期5个工作日</li>
              </ul>-->
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="delayTask" :disabled="btn_disabled">提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog
          title="移交任务"
          :visible.sync="dialogTranserVisible"
          class="dialog-medium"
          width="50%"
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
        <el-dialog title="完结任务" :visible.sync="dialogCloseVisible" class="dialog-medium">
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
        <el-dialog title="重新激活任务" :visible.sync="dialogActivationVisible" class="dialog-medium">
          <el-form label-width="80px">
            <el-form-item label="重新激活任务备注">
              <el-form-item>
                <el-input v-model="activation_reason"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px;">
              <el-button type="primary" @click="activateTask" style="margin-bottom: 0px;">提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog
          title="退回任务"
          :visible.sync="dialogRejectVisible"
          class="dialog-medium"
          @close="close"
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
        <task-postpone ref="postpone" @refresh="refreshPostpone" :row="row"></task-postpone>
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
      isTaskDetailVisible: false,
      dialogRejectVisible: false,
      dialogScreenVisible: false,
      dialogTurnoutVisible: false,
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
      url: URL
    };
  },
  computed: {
    ...mapGetters(["detailBase", "menusMap", "innerHeight", "userid"]),
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
      if (this.row.id == undefined) return "";
      return this.row.model.id == "Patent" ||
        this.row.model.id == "Trademark" ||
        this.row.model.id == "Copyright"
        ? this.row.title
        : this.row.model.name + this.process.row;
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
      // const arr = [];
      // if(this.historyTasks && this.historyTasks.length !=0 ) {
      //   this.historyTasks.forEach( v =>{
      //     if(v['id'] !== this.row.id) {
      //       arr.push({'id': v['id'], 'name': `${v['flownode']['name']}_${v['person_in_charge']['name']}`});
      //     }
      //   });
      //   return {
      //     placeholder: '请选择退回到的记录流程节点',
      //     options: arr
      //   }
      // }else {
      //   return {
      //     placeholder: '请选择退回到的记录流程节点',
      //     options: arr
      //   }
      // }
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
    show(id) {
      this.isTaskDetailVisible = true;
      //调用完成任务显示
      this.$nextTick(() => {
        this.$refs.finish.show();
      });
    },
    refreshPostpone() {
      this.$refs.delay.refreshData();
    },
    postpone() {
      this.$refs.postpone.show("add");
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
      this.$refs.mailEdit.show(scene, this.row.id);
    },
    handleTasks(type) {
      if (type == "add") {
        this.$refs.processes_task.add();
      }
      if (type == "edit") {
        this.$refs.processes_task.edit();
      }
    },
    appointSuccess() {
      this.dialogAgenVisible = false;
      this.update();
    },
    mailCallBack() {
      this.mailVisible = false;
    },
    handleSiblings(val) {
      this.historyTasks = val;
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
    handleNext(val) {
      if (val && val.length != 0) {
        this.nextValue = false;
      } else {
        this.nextValue = true;
      }
    },
    handleMore(type) {
      this.moreVisible = true;
    },
    handleSendMail(id) {
      this.mailVisible = true;
      this.$nextTick(() => {
        this.$refs.mailEdit.initForm(id);
      });
    },
    addPop(type = "add") {
      this.pageType = type;
      this.dialogAddVisible = true;

      if (type == "add") {
        this.rerender = false;
        this.$nextTick(_ => {
          // add为了重置表单 强制重新渲染表单
          this.rerender = true;
          this.$nextTick(_ => {
            this.$refs.processes_task.clear();
          });
        });
      }
    },
    taskDelete({ id }) {
      const s = this.$refs.table.getSelect(true);
      if (s.length == 0) {
        return this.$message({
          message: "请选择需要删除的列表项",
          type: "warning"
        });
      }
      this.deleteId = this.$tool.splitObj(s, "id");
      const h = this.$createElement;
      this.$msgbox({
        title: "删除确认",
        message: h("message-content", {
          ref: "messageContent"
        }),
        confirmButtonText: "确定",
        showCancelButton: true
      })
        .then(action => {
          this.submitDelete();
        })
        .catch(action => {});
    },
    transferTask() {
      const url = `${URL}/${this.row.id}/transfer`;
      const data = { user: this.transfer_person };
      const success = _ => {
        this.dialogTranserVisible = false;
        this.dialogShrinkVisible = false;
        this.$message({ message: "任务移交成功", type: "success" });
        this.refreshUser();

        this.update();
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

        this.update();
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

        this.update();
      };

      this.$axiosPost({ url, data, success });
    },
    delayTask() {
      const url = "/api/delayrecord";
      const data = Object.assign(
        {},
        {
          task_id: this.row.id,
          project_id: this.row.project_id,
          create_user: this.userid,
          remark: this.remark,
          days: this.days
        }
      );
      const success = _ => {
        this.dialogDelayVisible = false;
        this.dialogShrinkVisible = false;
        this.btn_disabled = true;
        this.$message({ message: "延期成功", type: "success" });
        this.update();
        this.refreshTaskDelay(this.row.id);
      };
      const complete = _ => {
        this.btn_disabled = false;
      };
      this.$axiosPost({ url, data, success, complete });
    },
    rejectTask() {
      const url = `/tasks/${this.row.id}/reject`;
      const data = {
        remark: this.remark,
        task_id: this.taskId
      };
      const success = _ => {
        this.$message({ message: "退回任务成功", type: "success" });
        this.dialogRejectVisible = false;
        window.setTimeout(_ => {
          this.dialogShrinkVisible = false;
          this.update();
        }, 0);
      };
      this.$axiosPost({ url, data, success });
    },
    addSuccess() {
      this.dialogAddVisible = false;
      this.$message({ message: "添加成功", type: "success" });
      this.refresh();
    },
    editSuccess() {
      this.dialogEditVisible = false;
      this.dialogShrinkVisible = false;
      this.$message({ message: "编辑成功", type: "success" });

      this.update();
    },
    editProjectSuccess() {
      this.update();
    },
    refreshOption() {},
    handleTask(url) {
      const s = this.$refs.table.getSelect();
      if (s) {
        const data = { ids: this.$tool.splitObj(s, "id") };
        const success = _ => {
          this.$message({ type: "success", message: "操作成功" });
          this.update();
          this.refreshUser();
        };

        this.axiosPut({ url, data, success });
      }
    },

    finishSuccess(data) {
      this.dialogShrinkVisible = false;
      this.refresh();
      this.$refs.taskDetail.refreshData();
      // if(data.is_send_mail) {
      //   this.mailVisible = true;
      //   this.$nextTick( () => {
      //     this.$refs.mailEdit.initForm(data.mail_id);
      //   });
      // }
    },
    save() {
      this.$refs.detail.edit();
    },
    close() {
      this.taskId = "";
    }
  },
  watch: {
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
    "agen.agency_id": {
      handler(val) {
        if (val !== "") {
          this.$nextTick(_ => {
            this.$refs.agent.clear();
          });
        } else {
          this.agen.agency_id = "";
        }
      }
    },
    menusMap() {
      this.refreshOption();
    }
  },
  mounted() {
    this.addListFilter(this.expringControl);
    if (this.$route.params.id) {
      this.install = this.$route.params.id;
    }

    // if(!this.custom) {

    //   this.refresh();
    // }

    if (this.task_status == 1 || this.task_status == -1) {
      this.activeName = "relative_tasks";
    }
    this.refreshFlows({ type: 1 });
    this.refreshOption();
    this.refreshAction();
  },
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
    TaskPostpone
  }
};
</script>
<style>
#task_common .el-dialog--small .el-upload--text {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  position: absolute;
  left: 0px;
  bottom: 4px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>