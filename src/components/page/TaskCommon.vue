<template>
  <div class="main" id="task_common">
    <table-component
      :tableOption="tableOption"
      :data="tableData"
      :refreshTableData="refreshTableData"
      ref="table"
    ></table-component>

    <el-dialog title="申请委案" :visible.sync="dialogAgenVisible" class="dialog-small">
      <appoint-case
        ref="appointCase"
        @appointSuccess="appointSuccess"
        :task-ids="taskIds"
        type="task"
      ></appoint-case>
    </el-dialog>

    <el-dialog title="设置任务提醒偏好" :visible.sync="dialogSettingVisible" class="dialog-mini">
      <el-form label-position="top">
        <el-form-item label="请输入要提前标红色任务超期天数">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="请输入要顶部显示的任务超期天数">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="编辑任务时的默认案件类型">
          <el-input></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <el-button type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
    <el-dialog title="移交任务" :visible.sync="dialogTranserVisible" class="dialog-medium">
      <el-form label-width="80px">
        <el-form-item label="承办人">
          <remote-select type="member" v-model="transfer_person"></remote-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px;">
          <el-button type="primary" @click="transferTask" style="margin-bottom: 0px;">提交</el-button>
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

    <el-dialog title="将选中任务转给以下任务处理人" :visible.sync="dialogTurnoutVisible" class="dialog-mini">
      <el-form label-position="top">
        <el-form-item label="任务处理人">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="期限">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checkedTest">任务处理人更新为案件的负责人</el-checkbox>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;">
          <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <app-shrink
      :visible.sync="dialogShrinkVisible"
      :title="isCommon ? detailBase.title : shrinkTitle"
      @close="handleShrinkClose"
    >
      <span slot="header" style="margin-left: 10px;">
        <el-tag v-if="currentRow.taskdef">{{ currentRow.taskdef.name }}</el-tag>
        <el-tag v-if="currentRow.serial">{{ currentRow.serial }}</el-tag>
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
          v-if="!currentRow.status && menusMap && menusMap.get('/task/btn/close')"
          @click="dialogCloseVisible = true;"
        >完结</el-button>
        <el-button
          size="small"
          style="margin-left: 0px;"
          v-if="menusMap && menusMap.get('/task/btn/transfer')"
          @click="dialogTranserVisible = true; transfer_person = {id: currentRow.person_in_charge, name: currentRow.person_in_charge_name }"
        >移交</el-button>
        <el-button
          size="small"
          @click="handleReject"
          style="margin-left: 0px;"
          type="danger"
          v-if="menusMap && menusMap.get('/task/btn/reject')"
        >退回</el-button>
        <el-dropdown
          @command="handleCommandSendMail"
          trigger="click"
          style="margin-left: 5px;"
          size="small"
          v-if="mailbtn == 'patent'"
        >
          <el-button size="small">发送邮件
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
      <el-tabs v-model="activeName">
        <el-tab-pane label="前往处理" name="finish">
          <div :style="`height: ${innerHeight - 140}px; overflow-y: auto;overflow-x:hidden;`">
            <task-finish
              :id="currentRow.id"
              :row="currentRow"
              @submitSuccess="finishSuccess"
              @showmailbtn="showmailbtn"
              @more="handleMore"
              @refreshNext="handleNext"
              v-show="!nextValue"
            ></task-finish>
          </div>
        </el-tab-pane>
        <!--         <el-tab-pane label="详细信息" name="edit">   
          <div :style="`height: ${innerHeight - 140}px; overflow-y: auto;overflow-x:hidden;`">         
            <information :row="currentRow" @more="handleMore"></information> 
          </div>         
        </el-tab-pane>-->
        <el-tab-pane label="相关任务" name="relative_tasks">
          <div :style="`height: ${innerHeight - 140}px; overflow-y: auto;overflow-x:hidden;`">
            <detail
              :row="currentRow"
              style="margin: 10px 0;"
              @refreshSiblings="handleSiblings"
              ref="taskDetail"
            ></detail>
          </div>
        </el-tab-pane>
        <el-tab-pane label="延期历史" name="delay">
          <div :style="`height: ${innerHeight - 140}px; overflow-y: auto;overflow-x:hidden;`">
            <delay :row="currentRow"></delay>
          </div>
        </el-tab-pane>
      </el-tabs>
    </app-shrink>

    <app-shrink :visible.sync="dialogAddVisible" :title="pageType == 'add'?'新增任务':'编辑任务'">
      <span slot="header" style="float: right;">
        <el-button
          type="primary"
          size="small"
          v-if="pageType == 'add'"
          @click="handleTasks('add')"
        >新增</el-button>
        <el-button
          type="primary"
          size="small"
          v-if="pageType == 'edit'"
          @click="handleTasks('edit')"
        >保存</el-button>
      </span>
      <edit
        :type="pageType"
        @addSuccess="addSuccess"
        ref="processes_task"
        :row="currentRow"
        @editSuccess="editSuccess"
        v-if="rerender"
      ></edit>
    </app-shrink>
    <common-detail
      :type="categoryType"
      :id="currentRow.project_id"
      :visible.sync="moreVisible"
      :title="currentRow.title"
      @editSuccess="editProjectSuccess"
      :refresh-switch="false"
      @sendEmail="handleSendMail"
      ref="detail"
    ></common-detail>

    <mail-add
      style="margin-top: 10px; "
      ref="mailEdit"
      @sendSuccess="mailCallBack"
      @cancelSending="mailCallBack"
    ></mail-add>
  </div>
</template>

<script>
import AxiosMixins from "@/mixins/axios-mixins";
import Detail from "@/components/page_extension/TaskCommon_detail";
import RemoteSelect from "@/components/form/RemoteSelect";
import StaticSelect from "@/components/form/StaticSelect";

import AppFilter from "@/components/common/AppFilter";
import AppCollapse from "@/components/common/AppCollapse";
import TableComponent from "@/components/common/TableComponent";
import AppDatePicker from "@/components/common/AppDatePicker";

import Edit from "@/components/page_extension/TaskCommon_edit";
import Information from "@/components/page_extension/TaskCommon_information";

import TaskFinish from "@/components/common/TaskFinish";
import Strainer from "@/components/page_extension/TaskCommon_strainer";
import AppShrink from "@/components/common/AppShrink";
import CommonDetail from "@/components/page_extension/Common_detail";
import Delay from "@/components/page_extension/TaskCommon_delay";
import AppointCase from "@/components/page_extension/AppointCase";

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
// messageBox组件，单独提出来，vue监测不到value的改变导致radio无法即时更新
const MessageContent = {
  render(h) {
    const model = {
      props: {
        value: this.deleteType
      },
      on: {
        input: v => {
          this.deleteType = v;
        }
      }
    };

    const createLabel = label => ({ props: { label } });

    return h("el-radio-group", model, [
      h("el-radio", createLabel(0), "仅删除当前节点"),
      h("el-radio", createLabel(1), "删除整个管制事项")
    ]);
  },
  data() {
    return {
      deleteType: 0
    };
  }
};
export default {
  name: "taskList",
  mixins: [AxiosMixins],
  data() {
    return {
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
      currentRow: {},
      transfer_person: "",
      remark: "",
      close_reason: "",
      activation_reason: "",
      days: "5",
      deleteId: "",
      mailbtn: "",
      tableOption: {
        name: "taskList",
        url: URL,
        height: "default",
        treeFilter: "process",
        is_list_filter: true,
        list_type: "task",
        search_placeholder: "搜索案号、标题、申请号、代理人、备注",
        is_filter: false,
        row_class: ({ due_time }, index) => {
          return;
        },
        header_btn: [
          {
            type: "add",
            click: () => {
              this.addPop();
            },
            map_if: "/tasks/add_btn"
          }, //部分顶部按钮在refreshOption中渲染
          {},
          {},
          {},
          { type: "export" },
          // { type: 'custom', label: '转出', icon: '', click: ()=>{ this.dialogTurnoutVisible = true; } },
          { type: "control", label: "字段" },
          // { type: 'custom', label: '设定', icon: '', click: ()=>{ this.dialogSettingVisible = true; } }
          { type: "taskscope" }
        ],
        header_slot: ["toggle"],
        highlightCurrentRow: true,
        rowClick: this.handleRowClick,
        // 'expandFun': (row, expanded)=>{
        //   const expands = this.$refs.table.expands;
        //   const old_id = expands.shift();
        //   if(old_id != row.id) {
        //     expands.push(row.id);
        //   }else if( this.expandType != this.expandOldType) {
        //     expands.push(row.id);
        //   }
        //   this.expandOldType = this.expandType;
        // },
        columns: [
          // { type: 'expand' },
          { type: "selection" },
          {
            type: "text",
            prop: "model",
            label: "模块",
            render_header: true,
            render_simple: "name",
            width: "80"
          },
          { type: "text", prop: "serial", label: "案号", width: "160" },
          { type: "text", prop: "title", label: "标题", width: "200" },
          {
            type: "array",
            prop: "project_tags",
            label: "案件标签",
            render: this.tagRender,
            width: "123",
            render_header: true
          },
          {
            type: "array",
            prop: "process_tags",
            label: "事项标签",
            render: this.tagRender,
            width: "123",
            render_header: true
          },
          {
            type: "text",
            prop: "application_number",
            label: "申请号",
            width: "110"
          },
          {
            type: "text",
            prop: "application_date",
            label: "申请日",
            render_header: true,
            width: "100"
          },
          {
            type: "text",
            prop: "project_type",
            label: "案件类型",
            render_simple: "name",
            render_header: true,
            width: "100"
          },
          {
            type: "text",
            prop: "subtype",
            label: "案件子类型",
            render_simple: "name",
            render_header: true,
            width: "110"
          },
          {
            type: "text",
            prop: "process_definition",
            label: "管制事项",
            render_simple: "name",
            render_header: true,
            width: "110"
          },
          {
            type: "text",
            prop: "process_stage",
            label: "当前阶段",
            render_simple: "name",
            render_header: true,
            width: "110"
          },
          // { type: 'text', prop: 'task', label: '当前节点', render_header: true, width: '110', render: function(h,item){
          //   item = item != null ? item.process_action.name: '';
          //   return h('span',item);
          // }},
          {
            type: "text",
            prop: "process_action",
            render_obj: "task",
            render_simple: "name",
            label: "当前节点",
            render_header: true,
            width: "110"
          },
          {
            type: "text",
            prop: "user",
            label: "承办人",
            render_obj: "task",
            render_simple: "name",
            render_header: true,
            width: "110"
          },
          {
            type: "text",
            prop: "agent",
            label: "代理人",
            render_simple: "name",
            render_header: true,
            width: "110"
          },
          {
            type: "text",
            prop: "assistant",
            label: "代理人助理",
            render_simple: "name",
            render_header: true,
            width: "110"
          },
          {
            type: "text",
            prop: "first_reviewer",
            label: "初审人",
            render_simple: "name",
            render_header: true,
            width: "110"
          },
          {
            type: "text",
            prop: "final_reviewer",
            label: "复审人",
            render_simple: "name",
            render_header: true,
            width: "110"
          },
          {
            type: "text",
            prop: "organization_unit",
            label: "所属部门",
            render_simple: "name",
            render_header: true,
            width: "110"
          },
          {
            type: "text",
            prop: "customer",
            label: "客户",
            render_simple: "name",
            render_header: true,
            width: "120"
          },
          {
            type: "text",
            prop: "ipr",
            label: "IPR",
            render_simple: "name",
            render_header: true,
            width: "110"
          },
          {
            type: "text",
            prop: "contact",
            label: "联系人",
            render_simple: "name",
            render_header: true,
            width: "100"
          },
          {
            type: "text",
            prop: "first_edition_deadline",
            label: "初稿期限",
            render_header: true,
            width: "100"
          },
          {
            type: "text",
            prop: "filing_deadline",
            label: "递交期限",
            render_header: true,
            width: "100"
          },
          {
            type: "text",
            prop: "legal_deadline",
            label: "官方绝限",
            render_header: true,
            width: "100"
          },
          {
            type: "text",
            prop: "first_edition_time",
            label: "初稿日",
            render_header: true,
            width: "100"
          },
          {
            type: "text",
            prop: "internal_final_edition_time",
            label: "内部定稿日",
            render_header: true,
            width: "110"
          },
          {
            type: "text",
            prop: "customer_edition_time",
            label: "返稿日",
            render_header: true,
            width: "100"
          },
          {
            type: "text",
            prop: "customer_final_edition_time",
            label: "客户定稿日",
            render_header: true,
            width: "110"
          },
          {
            type: "text",
            prop: "filing_time",
            label: "递交日",
            render_header: true,
            width: "100"
          },
          {
            type: "text",
            prop: "internal_drafting_period",
            label: "内撰时长",
            width: "100"
          },
          {
            type: "text",
            prop: "internal_amending_period",
            label: "内改时长",
            width: "100"
          },
          {
            type: "text",
            prop: "internal_reviewing_period",
            label: "内审时长",
            width: "100"
          },
          {
            type: "text",
            prop: "customer_first_edition_period",
            label: "返稿时长",
            width: "100"
          },
          {
            type: "text",
            prop: "customer_reviewing_period",
            label: "客审时长",
            width: "100"
          },
          {
            type: "text",
            prop: "customer_amending_period",
            label: "客改时长",
            width: "100"
          },
          {
            type: "text",
            prop: "internal_reviewing_times",
            label: "内审次数",
            width: "100"
          },
          {
            type: "text",
            prop: "customer_reviewing_times",
            label: "客审次数",
            width: "100"
          },
          {
            type: "text",
            prop: "technical_rank",
            label: "技术评分",
            width: "100"
          },
          {
            type: "text",
            prop: "claims_rank",
            label: "权要评分",
            width: "100"
          },
          {
            type: "text",
            prop: "spec_rank",
            label: "说明书评分",
            width: "110"
          },
          {
            type: "text",
            prop: "communication_rank",
            label: "沟通评分",
            width: "100"
          },
          { type: "text", prop: "remark", label: "备注", width: "100" }
          // { type: 'action',fixed: true, width: '100'}
        ]
      },
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
      pageType: ""
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

      if (this.currentRow.category == 1) {
        type = "patent";
      }
      if (this.currentRow.category == 3) {
        type = "copyright";
      }
      if (this.currentRow.category == 2) {
        type = "trademark";
      }

      return type;
    },
    isCommon() {
      return (
        this.currentRow.category == 1 ||
        this.currentRow.category == 3 ||
        this.currentRow.category == 2
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
      //     if(v['id'] !== this.currentRow.id) {
      //       arr.push({'id': v['id'], 'name': `${v['flownode']['name']}_${v['person_in_charge']['name']}`});
      //     }
      //   });
      //   return {
      //     placeholder: '请选择退回到的历史流程节点',
      //     options: arr
      //   }
      // }else {
      //   return {
      //     placeholder: '请选择退回到的历史流程节点',
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
    showmailbtn(scene) {
      this.mailbtn = scene;
    },
    handleCommandSendMail(command) {
      const scene = mailMap.get(command);
      this.$refs.mailEdit.show(scene, this.currentRow.id);
    },
    tagRender(arr) {
      arr.map(_ => {
        _.classname = "tag-color-" + _.color;
      });
      return arr;
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
    handleShrinkClose() {
      this.$refs.table.setCurrentRow();
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
    agenPop() {
      const s = this.$refs.table.getSelect();
      let confirm = false;

      if (s) {
        for (let d of s) {
          if (d.agency !== "") {
            confirm = true;
            break;
          }
        }

        const pop = () => {
          if (this.$refs.appointCase) this.$refs.appointCase.resetFields();
          this.dialogAgenVisible = true;
          this.taskIds = s.map(_ => _.id);
        };

        if (confirm) {
          this.$confirm(
            "你选择的任务中包含已委案的任务，确认继续委案？",
            "提示",
            { type: "warning" }
          )
            .then(pop)
            .catch(_ => {});
        } else {
          pop();
        }
      }
    },
    // agenSubmit () {
    //   this.$refs.agen.validate(_=>{
    //     if(_) {
    //       const ids = this.$refs.table.getSelect().map(_=>_.id);
    //       const url = '/api/tasks/agency';
    //       const data = Object.assign({}, this.agen, { ids });
    //       const success = _=>{
    //         this.dialogAgenVisible = false;
    //         this.$message({type: 'success', message: '申请委案成功'});
    //         this.update();
    //       };
    //       const complete = _=>{this.btn_disabled = false};

    //       this.btn_disabled = true;
    //       this.axiosPost({url, data, success, complete});
    //     }else {
    //       this.$message({message: '请认真填写申请委案字段', type: 'warning'});
    //     }
    //   })

    // },
    // dropGenerator(str) {
    //   return (row, element)=>{
    //     this.expandType = str;
    //     $(element.target).parents("tr").find(".el-table__expand-icon").click();
    //   }
    // },
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
    submitDelete() {
      const url = URL;
      const data = {
        id: this.deleteId,
        is_delete_process: this.$refs.messageContent.deleteType
      };
      const success = _ => {
        this.$message({ type: "success", message: "删除成功" });
        this.update();
      };
      this.$axiosDelete({ url, data, success });
    },
    refreshTableData(option) {
      const url = URL;
      const data = Object.assign(
        {},
        option,
        { status: this.task_status, scope: this.task_toggle },
        this.urlParams,
        this.defaultParams
      );
      const success = d => {
        if (data["format"] == "excel") {
          window.location.href = d.tasks.downloadUrl;
        } else {
          this.tableData = d.processes;
          // this.filters = d.tasks.filters;
        }

        //初始化接口
        //PS:如果以后多个地方有这样的需求,可将filter改为与query全局相关,而不是用存储内部值的方式,这样不需要特别处理这样的需求
        if (this.install) {
          //找出对应的对象,然后插入
          const s1 = this.filters.filter(_ => _.key == "flow_node_id")[0];
          const s2 = s1["items"].filter(_ => _.value == this.install);
          this.addScreen({ name: s1.label, key: s1.key, items: s2 });
          //只触发一次
          this.install = "";
        }
      };
      return this.$axiosGet({ url, data, success });
    },
    refresh() {
      this.$refs.table.refresh();
    },
    update() {
      this.$refs.table.update();
    },
    transferTask() {
      const url = `${URL}/${this.currentRow.id}/transfer`;
      const data = { person_in_charge: this.transfer_person };
      const success = _ => {
        this.dialogTranserVisible = false;
        this.dialogShrinkVisible = false;
        this.$message({ message: "移交成功", type: "success" });
        this.refreshUser();

        this.update();
      };

      this.$axiosPost({ url, data, success });
    },
    closeTask() {
      const url = `${URL}/${this.currentRow.id}/close`;
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
      const url = `${URL}/${this.currentRow.id}/activate`;
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
          task_id: this.currentRow.id,
          project_id: this.currentRow.project_id,
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
        this.refreshTaskDelay(this.currentRow.id);
      };
      const complete = _ => {
        this.btn_disabled = false;
      };
      this.$axiosPost({ url, data, success, complete });
    },
    rejectTask() {
      const url = `/tasks/${this.currentRow.id}/reject`;
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
    refreshOption() {
      const t = this.task_status;
      const h = this.tableOption;
      const menusMap = this.menusMap;
      menusMap && menusMap.get("/task/btn/delete")
        ? h.header_btn.splice(1, 1, {
            type: "delete",
            click: this.taskDelete,
            callback: this.refreshUser
          })
        : h.header_btn.splice(1, 1, {});
      this.$forceUpdate();
    },
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
    proposalEdit({ project_id }) {
      this.$router.push({ path: "/proposal/edit", query: { id: project_id } });
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
    titleRender(h, item, data) {
      const color = colorMap.get(data["color"]);
      let tipContent = "";
      if (color === "#3c3") {
        // console.log('绿色');
        tipContent = "正常";
      } else if (color === "#f90") {
        // console.log('橙色');
        tipContent = "即将到期";
      } else if (color === "#c03") {
        // console.log('红色');
        tipContent = "已过期";
      } else if (color === "#339") {
        tipContent = "暂停处理";
      } else if (color === "#09C") {
        tipContent = "已完成";
      }

      let str = "";
      if (data.flag == 1) {
        str += "(代)";
      } else if (data.flag == 2) {
        str += "(移)";
      } else if (data.flag == 3) {
        str += "@";
      } else if (data.flag == 4) {
        str += "(退)";
      }
      str += item;

      return (
        <span>
          {data.icon && data.icon.length == 2 ? (
            <i class="el-icon-my-keyPoint" style="color: #ff2121">
              <i class="el-icon-my-award" style="color: #f2be45" />
            </i>
          ) : data.icon && data.icon.length == 1 && data.icon[0] == 1 ? (
            <i class="el-icon-my-keyPoint" style="color: #ff2121" />
          ) : data.icon && data.icon.length == 1 && data.icon[0] == 2 ? (
            <i class="el-icon-my-award" style="color: #f2be45" />
          ) : (
            <i />
          )}
          <el-tooltip effect="dark" content={`${tipContent}`} placement="top">
            <i
              class="table-flag"
              style={`background-color: ${color}; margin-right: 10px;`}
            />
          </el-tooltip>
          <span>{str}</span>
        </span>
      );
    },
    categoryRender(h, item, data) {
      const typeNum = typeMap.get(data["category"]);
      return <span>{typeNum}</span>;
    },
    titleClick(data) {
      if (data.category == 0) {
        this.$router.push(`/proposal/detail?id=${data.project_id}`);
      } else if (data.category == 1) {
        this.$router.push(`/patent/list/detail/${data.project_id}`);
      } else if (data.category == 3) {
        this.$router.push(`/copyright/list/detail/${data.project_id}`);
      }
    },
    handleRowClick(row) {
      this.shrinkTitle = row.title;
      this.currentRow = row;
      // this.refreshProcessDetail({id: row.id});
      if (!this.dialogShrinkVisible) this.dialogShrinkVisible = true;
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
    AppFilter,
    TableComponent,
    AppDatePicker,
    Edit,
    AppCollapse,
    TaskFinish,
    AppShrink,
    Information,
    CommonDetail,
    Detail,
    Delay,
    MailAdd,
    AppointCase,
    MessageContent
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