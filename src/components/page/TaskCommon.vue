<template>
  <div class="main" id="task_common">
    <table-component
      :tableOption="tableOption"
      :data="tableData"
      :refreshTableData="refreshTableData"
      ref="table"
    >
      <el-badge slot="badge" :value="instancySum" v-if="defaultParams.is_completed != 1">
        <el-button size="small" type="danger" @click="instancyHandle">3天内到期/已过期</el-button>
      </el-badge>
    </table-component>

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

    <!-- 任务详情 -->
    <task-common-detail ref="taskDetail" @refresh="refresh" @update="update"></task-common-detail>
    <!-- 任务新增 -->
    <task-common-edit ref="taskEdit" @addSuccess="refresh"></task-common-edit>
    <!-- 批量操作 -->
    <batch-task-common
      ref="batchOperation"
      :ids="batchOperationIds"
      :operationType="batchOperationType"
      @update="update"
    ></batch-task-common>
  </div>
</template>

<script>
import AxiosMixins from "@/mixins/axios-mixins";
import TableComponent from "@/components/common/TableComponent";
import TaskCommonDetail from "@/components/page_extension/TaskCommonDetail";
import TaskCommonEdit from "@/components/page_extension/TaskCommon_edit";
import BatchTaskCommon from "@/components/page_extension/BatchTaskCommon";
import MailAdd from "@/components/page/MailAdd";
import debounce from "lodash/debounce";

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
  inject: ["closeAllTag"],
  data() {
    return {
      timer: null, //定时器
      dialogTurnoutVisible: false,
      instancySum: 0,
      filters: {},
      activeName: "finish",
      checkedTest: [],
      currentRow: {},
      remark: "",
      loadingText: "任务数据加载中",
      deleteId: "",
      batchOperationType: "",
      batchOperationIds: [],
      tableOption: {
        name: "taskList",
        url: URL,
        height: "default",
        is_view: true,
        import_type: "process",
        treeFilter: "process",
        is_list_filter: true,
        list_type: "task",
        search_placeholder: "搜索案号、标题、申请号、代理人、备注",
        is_filter: false,
        expandsSpan:2,
        row_class: ({ due_time }, index) => {
          return;
        },
        header_btn: [
          {
            type: "add",
            click: () => {
              this.addPop();
            },
            map_if: "/task/btn/save"
          }, //部分顶部按钮在refreshOption中渲染
          {},
          {},
          {},
          { type: "export2" },
          { type: "control", label: "字段" },
          {
            type: "dropdown",
            label: "批量操作",
            map_if: "/task/btn/save",
            items: [
              {
                text: "派案",
                click: () => {
                  this.showBatchOperation("sendCase");
                },
                icon: "arrow-right"
              },
              {
                text: "转出",
                click: () => {
                  this.showBatchOperation("caseOut");
                },
                icon: "d-arrow-right"
              },
              {
                text: "立案通知",
                click: () => {
                  this.showBatchOperation("notice");
                },
                icon: "message"
              },
              {
                text: "完成任务",
                click: () => {
                  this.showBatchOperation("fulfilTask");
                },
                icon: "check"
              },
              {
                text: "期限提醒",
                click: () => {
                  this.showBatchOperation("remind");
                },
                icon: "date"
              }
            ]
          }
        ],
        header_slot: ["toggle", "badge"],
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
            // render_header: true,
            render_simple: "name",
            width: "60"
          },
          { type: "text", prop: "serial", label: "案号", width: "180" },
          {
            type: "text",
            prop: "customer_serial",
            label: "客户案号",
            render_key: "project",
            render_simple: "customer_serial",
            width: "180"
          },
          { type: "text", prop: "title", label: "标题", width: "340" },
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
            prop: "process_action",
            render_obj: "task",
            render_simple: "name",
            label: "当前节点",
            render_header: true,
            width: "110"
          },
          {
            type: "text",
            prop: "internal_deadline",
            label: "管控期限",
            render_header: true,
            width: "100"
          },
          {
            type: "text",
            prop: "deadline",
            render_key: "task",
            render_simple: "deadline",
            label: "节点期限",
            render_header: true,
            width: "110",
            expanded: true
          },
          {
            type: "text",
            prop: "legal_deadline",
            label: "官方绝限",
            render_header: true,
            width: "100",
            expanded: true
          },
          // {
          //   type: "text",
          //   prop: "process_stage",
          //   label: "当前阶段",
          //   render_simple: "name",
          //   render_header: true,
          //   width: "110"
          // },
          {
            type: "text",
            prop: "user",
            label: "承办人",
            render_obj: "task",
            render_simple: "name",
            render_header: true,
            width: "110",
            expanded: true
          },
          {
            type: "text",
            prop: "agent",
            label: "代理人",
            render_simple: "name",
            render_header: true,
            width: "110",
            expanded: true
          },
          // {
          //   type: "text",
          //   prop: "assistant",
          //   label: "代理人助理",
          //   render_simple: "name",
          //   render_header: true,
          //   width: "110"
          // },
          {
            type: "text",
            prop: "first_reviewer",
            label: "初审人",
            render_simple: "name",
            render_header: true,
            width: "110",
            expanded: true
          },
          {
            type: "text",
            prop: "final_reviewer",
            label: "复核人",
            render_simple: "name",
            render_header: true,
            width: "110",
            expanded: true
          },
          {
            type: "text",
            prop: "representative",
            label: "对外代理人",
            render_simple: "name",
            render_header: true,
            width: "110",
            expanded: true
          },
          {
            type: "text",
            prop: "organization_unit",
            label: "所属部门",
            render_simple: "name",
            render_header: true,
            width: "110",
            expanded: true
          },
          {
            type: "array",
            prop: "project_tags",
            label: "案件标签",
            render: this.tagRender,
            width: "123",
            render_header: true,
            expanded: true
          },
          {
            type: "array",
            prop: "process_tags",
            label: "事项标签",
            render: this.tagRender,
            width: "123",
            render_header: true,
            expanded: true
          },
          {
            type: "text",
            prop: "application_number",
            label: "申请号",
            width: "145",
            expanded: true
          },
          {
            type: "text", prop: "entrusting_time",label: "委案日",render_header: true,width: "100",expanded: true
          },
          {
            type: "text",
            prop: "creation_time",
            label: "立案日",
            render_key: "project",
            render_simple: "creation_time",
            render_header: true,
            width: "100",
            expanded: true
          },
          {
            type: "text",
            prop: "application_date",
            label: "申请日",
            render_header: true,
            width: "100",
            expanded: true
          },
          // { type: 'text', prop: 'task', label: '当前节点', render_header: true, width: '110', render: function(h,item){
          //   item = item != null ? item.process_action.name: '';
          //   return h('span',item);
          // }},

          {
            type: "text",
            prop: "customer",
            label: "客户",
            render_simple: "name",
            render_header: true,
            width: "120",
            expanded: true
          },
          {
            type: "text",
            prop: "ipr",
            label: "IPR",
            render_simple: "name",
            render_header: true,
            width: "110",
            expanded: true
          },
          {
            type: "text",
            prop: "contact",
            label: "联系人",
            render_simple: "name",
            render_header: true,
            width: "100",
            expanded: true
          },
          // {
          //   type: "text",
          //   prop: "first_edition_deadline",
          //   label: "初稿期限",
          //   render_header: true,
          //   width: "100"
          // },
          // {
          //   type: "text",
          //   prop: "filing_deadline",
          //   label: "递交期限",
          //   render_header: true,
          //   width: "100"
          // },

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
        ]
      },
      tableData: [],
      task_toggle: "my",
      dialogAgenVisible: false,
      btn_disabled: false,
      install: "",
      mailVisible: false,
      pageType: ""
    };
  },
  computed: {
    ...mapGetters(["detailBase", "menusMap", "innerHeight", "userid", 'shrinkLoading']),
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
      "refreshProcessDetail",
      "fillListFilter",
      "onShrinkLoading"
    ]),
    getThreeDateLate(onlyTime = false) {
      let time = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return onlyTime ? time : `${year}-${month}-${day}`;
    },
    instancyHandle() {
      // this.closeAllTag("all");
      let obj = {
        internal_deadline: {
          extraOption: {
            operation: 1,
            internal_deadline: `,${this.getThreeDateLate()}`
          },
          key: "internal_deadline",
          label: `日期范围： - ${this.getThreeDateLate()}`,
          name: "管控期限",
          value: ["", this.getThreeDateLate(true)]
        }
      };
      this.fillListFilter(obj);
    },
    tagRender(arr) {
      arr.map(_ => {
        _.classname = "tag-color-" + _.color;
      });
      return arr;
    },
    addPop(type = "add") {
      this.$refs.taskEdit.show("add");
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
          this.instancySum = d.processes.sum;
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
    addSuccess() {
      this.$message({ message: "添加成功", type: "success" });
      this.refresh();
    },
    editSuccess() {
      this.$message({ message: "编辑成功", type: "success" });
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
    handleRowClick: _.debounce(async function (row) {
        // 使用防抖函数，300ms内不多次触发
        this.currentRow = row;
         this.onShrinkLoading(this.loadingText);
        await this.refreshProcessDetail({id: row.id})
        .then(res=>{
          const len = this.$tool.getObjLength(res);
          if(typeof res == 'object' && len > 0){
            this.$refs.taskDetail.show(row,res);
          }
        });
      },300),
    showBatchOperation(type) {
      this.batchOperationType = type;
      const s = this.$refs.table.getSelect(true);
      if (s.length == 0) {
        return this.$message({
          message: "请选择需要批量操作的列表项",
          type: "warning"
        });
      }
      const ids = this.$tool.splitObj(s, "id");
      let resultIds = [];
      ids.forEach(id => {
        this.tableData.data.forEach(o => {
          if (o.id === id) {
            resultIds.push(o.task.id);
          }
        });
      });
      this.batchOperationIds = resultIds;
      this.$nextTick(() => {
        this.$refs.batchOperation.show();
      });
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
    menusMap() {
      this.refreshOption();
    }
  },
  mounted() {
    // 开个10s定时器,自动刷新当前列表
    // this.timer = setInterval(() => {
    //   this.update();
    // }, 10000);
    this.addListFilter(this.expringControl);
    if (this.$route.params.id) {
      this.install = this.$route.params.id;
    }
    if (this.task_status == 1 || this.task_status == -1) {
      this.activeName = "relative_tasks";
    }
    this.refreshFlows({ type: 1 });
    this.refreshOption();
    this.refreshAction();
  },
  beforeDestroy() {
    // 页面销毁前清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  components: {
    AxiosMixins,
    TableComponent,
    TaskCommonDetail,
    TaskCommonEdit,
    MailAdd,
    MessageContent,
    BatchTaskCommon
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