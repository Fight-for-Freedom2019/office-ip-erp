<template>
  <div class="main">
    <app-table
      :columns="columns"
      :data="detailProcesses"
      height="default6"
      style="overflow-y:auto;overflow-x: hidden; "
    >
      <template slot="row_action" slot-scope="scope">
        <el-button type="text" size="mini" @click="showProcessDetail(scope.row)">详情</el-button>
        <el-button
          type="text"
          size="mini"
          @click="toggle(scope.row)"
        >{{ show == scope.row.id ? '隐藏子节点' : '显示子节点'}}</el-button>
        <el-button type="text" size="mini" @click="DeleteProcess(scope.row)">删除</el-button>
      </template>
    </app-table>
    <template v-if="show ? true : false">
      <app-table
        :columns="columns2"
        :data="tableData2"
        @row-click="handleRowClick"
        style="margin-top: 20px;"
        height="default8"
      ></app-table>
    </template>
    <el-dialog title="附件下载" :visible.sync="dialogVisible" :modal="false">
      <template>
        <app-table :columns="columns3" :data="tableData3.attachments"></app-table>
      </template>
    </el-dialog>
    <edit type="edit" ref="processes_task" :row="currentRow" @editSuccess="editSuccess"></edit>
  </div>
</template>

<script>
import AppTable from "@/components/common/AppTable";
import AxiosMixins from "@/mixins/axios-mixins";
import Edit from "@/components/page_extension/TaskCommon_edit";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "commonDetailControl",
  mixins: [AxiosMixins],
  data() {
    return {
      columns: [
        {
          type: "text",
          label: "管制事项",
          prop: "process_definiton",
          render: this.taskdefRender
        },
        // { type: 'text', label: '流程节点', prop: 'flownode', render_simple: 'name'},
        { type: "text", label: "开始时间", prop: "creation_time" },
        { type: "text", label: "管控期限", prop: "internal_deadline" },
        { type: "text", label: "官方绝限", prop: "legal_deadline" },
        { type: "text", label: "完成时间", prop: "completion_time" },
        // { type: 'text', label: '状态', prop: 'status', render_text: v => v ? '已完成' : '未完成' },
        // { type: 'text', label: '代理机构', prop: 'agency' },
        // { type: 'text', label: '代理人', prop: 'agent' },
        // {
        //   type: 'text', label: '定稿文件', prop: 'attachments',
        //   render (h,item) {

        //     return h(
        //       'span',
        //       item.map(function (g) {
        //           return h('a',
        //           {
        //             style: {
        //             marginRight: '2px',
        //         },
        //         attrs: {
        //           href: '#',
        //         },
        //           },g.name)
        //       })
        //     )
        //   }
        // },
        {
          type: "action",
          label: "操作",
          fixed: false,
          width: "188",
          btns_render: "action"
        }
      ],
      columns2: [
        {
          type: "text",
          label: "子节点名称",
          prop: "process_action",
          render_simple: "name"
        },
        { type: "text", label: "承办人", prop: "user", render_simple: "name" },
        { type: "text", label: "开始时间", prop: "creation_time" },
        { type: "text", label: "完成时间", prop: "completion_time" },
        {
          type: "text",
          label: "附件",
          prop: "attachments",
          render(h, item) {
            return h(
              "span",
              item.map(function(g) {
                return h(
                  "span",
                  {
                    style: {
                      marginRight: "2px"
                    },
                    attrs: {
                      href: "#"
                    }
                  },
                  g.name
                );
              })
            );
          }
        },
        { type: "text", label: "备注", prop: "remark" }
      ],
      columns3: [
        { type: "text", label: "文件名称", prop: "name", min_width: "120" },
        {
          type: "text",
          label: "上传人",
          prop: "uploader",
          render_simple: "name",
          min_width: "100"
        },
        {
          type: "text",
          label: "上传日期",
          prop: "creation_time",
          min_width: "120"
        },
        { type: "text", label: "大小", prop: "size", min_width: "80" },
        {
          type: "action",
          label: "操作",
          width: "178",
          btns: [
            {
              type: "view",
              click: ({ viewUrl }) => {
                window.open(viewUrl);
              }
            },
            {
              type: "download",
              click: ({ downloadUrl }) => {
                window.open(downloadUrl);
              }
            },
            {
              type: "delete",
              click: this.handleDelete,
              btn_if: () => {
                return this.menusMap && this.menusMap.get("/role/flow")
                  ? true
                  : false;
              }
            }
          ]
        }
      ],
      tableData2: [],
      tableData3: [],
      show: null,
      dialogVisible: false,
      dialogAddVisible: false,
      currentRow: ""
    };
  },
  computed: {
    ...mapGetters(["detailProcesses", "menusMap"])
  },
  methods: {
    ...mapActions(["refreshDetailData"]),
    toggle({ id }) {
      if (id === 0) {
        this.tableData2 = [];
        return;
      }
      if (this.show == null || this.show != id) {
        const url = `processes/${id}/tasks`;
        const success = _ => {
          this.tableData2 = _.tasks.data;
          // console.log(_)
        };

        this.axiosGet({ url, success });
      }
      this.show = this.show == id ? null : id;
    },
    showProcessDetail(row) {
      const url = `processes/${row.id}`;
      const success = _ => {
        this.currentRow = _.process;
        this.$refs.processes_task.show("edit", this.currentRow);
      };
      const complete = _ => {
        this.dialogAddVisible = true;
      };
      this.$axiosGet({ url, success, complete });
    },
    handleRowClick(row) {
      this.tableData3 = row;
      this.dialogVisible = true;
    },
    handleTasks(type) {
      if (type == "edit") {
        this.$refs.processes_task.edit();
      }
    },
    editSuccess() {
      this.dialogAddVisible = false;
      this.refreshDetailData();
      this.$message({ message: "编辑成功", type: "success" });
    },
    handleDelete({ id }) {
      this.$confirm("此操作将删除当前附件，是否继续？", "提示", {
        type: "warning"
      })
        .then(_ => {
          const url = `/task/${this.tableData3["id"]}/files/${id}`;
          const success = _ => {
            this.$message({ type: "success", message: _.info });
            this.dialogVisible = false;
            this.refreshDetailData();
          };

          this.axiosDelete({ url, success });
        })
        .catch(_ => {});
    },
    DeleteProcess({ id }) {
      this.$confirm("此操作将删除当前管制事项，是否继续？", "提示", {
        type: "warning"
      })
        .then(_ => {
          const url = `/processes`;
          const data = {
            id,
            is_delete_process: 1
          };
          const success = _ => {
            this.$message({ type: "success", message: _.info });
            this.refreshDetailData();
          };

          this.axiosDelete({ url, data, success });
        })
        .catch(_ => {});
    },
    taskdefRender(h, item, data) {
      return (
        <span>
          {data.is_completed ? (
            <i class="el-icon-check" style="color: #3c3;margin-right:10px;" />
          ) : (
            <i class="el-icon-loading" style="color: #f90;margin-right:10px;" />
          )}
          <span>{data.process_definition.name}</span>
        </span>
      );
    }
  },
  watch: {
    detailProcesses(val) {
      if (val.length != 0) {
        this.toggle(val[0]);
      } else {
        this.tableData2 = [];
      }
    }
  },
  components: {
    AppTable,
    Edit
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>