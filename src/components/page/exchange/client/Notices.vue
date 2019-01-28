<!-- 收款账户 -->
<template>
  <div class="CpcNotice">
    <table-component
      :tableOption="tableOption"
      :data="tableData"
      ref="table"
      @update="update"
      @refresh="refresh"
      @refreshTableData="refreshTableData"
    ></table-component>
    <app-shrink :visible.sync="isPanelVisible" :modal="false" :title="title">
      <span slot="header" style="float: right;">
        <!--<el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>-->
        <app-button-loading :func="save" v-if="compileType === 'add'" ref="loadingBtn"></app-button-loading>
        <el-button
          type="primary"
          size="small"
          v-if="compileType === 'edit'"
          @click="save('edit')"
        >保存</el-button>
      </span>
      <cpc-notice-edit
        :type="compileType"
        :data="rowData"
        ref="CpcNoticeEdit"
        @update="update"
        @refresh="refresh"
      ></cpc-notice-edit>
    </app-shrink>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import CpcNoticeEdit from "@/components/page/exchange/client/CpcNoticeEdit";
import TableMixins from "@/mixins/table-mixins";
import Config from "@/const/selectConfig";

const config = new Map(Config);

export default {
  name: "CpcNotice",
  mixins: [TableMixins],
  data() {
    return {
      URL: "/cpc_notices",
      tableOption: {
        name: "CpcNoticeList",
        url: "/cpc_notices",
        height: "default",
        highlightCurrentRow: true,
        is_search: true,
        is_list_filter: true,
        list_type: "cpc_notice",
        treeFilter: "cpc_notice",
        search_placeholder: "案号、标题、发文序列号",
        rowClick: this.handleRowClick,
        header_btn: [
          // {type: 'add', click: this.add},
          // {type: 'delete'},
          // {type: 'export'},
          { type: "control" },
          {
            type: "dropdown",
            label: "批量操作",
            map_if: "/task/btn/save",
            items: [
              {
                text: "下载CPC压缩包",
                click: () => {
                  this.downloadCpcBatch("cpc_notice");
                },
                icon: "download"
              },
              {
                text: "下载通知书PDF",
                click: () => {
                  this.downloadCpcBatch("notice");
                },
                icon: "download"
              }
            ]
          }
        ],
        columns: [
          { type: "selection" },
          { type: "text", label: "通知书ID", prop: "cpc_id", min_width: "140" },
          {
            type: "text",
            label: "通知书代码",
            prop: "cpc_code",
            min_width: "90"
          },
          {
            type: "text",
            label: "通知书名称",
            prop: "cpc_file_type",
            render_simple: "name",
            min_width: "150"
          },
          {
            type: "text",
            label: "发文日",
            prop: "cpc_mail_date",
            render_header: true,
            min_width: "100"
          },
          {
            type: "text",
            label: "发文序列号",
            prop: "cpc_mail_serial",
            render_header: true,
            min_width: "160"
          },
          {
            type: "text",
            label: "PDF",
            prop: "file",
            min_width: "90",
            render: (h, item, row) => {
              if (row.file == null) return;
              return h("span", {}, [
                h(
                  "a",
                  {
                    attrs: {
                      target: "_blank",
                      href: row.file.viewUrl
                    },
                    on: {
                      click: e => {
                        e.stopPropagation();
                      }
                    }
                  },
                  `查看`
                ),
                h(
                  "a",
                  {
                    attrs: {
                      target: "_blank",
                      href: row.file.downloadUrl
                    },
                    on: {
                      click: e => {
                        e.stopPropagation();
                      }
                    },
                    style: { marginLeft: "5px" }
                  },
                  `下载`
                )
              ]);
            }
          },
          {
            type: "text",
            label: "压缩包",
            prop: "cpc_file",
            min_width: "60",
            render: (h, item, row) => {
              if (row.cpc_file == null) return;
              return h(
                "a",
                {
                  attrs: {
                    target: "_blank",
                    href: row.cpc_file.downloadUrl
                  },
                  on: {
                    click: e => {
                      e.stopPropagation();
                    }
                  }
                },
                `下载`
              );
            }
          },

          {
            type: "text",
            label: "匹配案件",
            prop: "project",
            min_width: "200",
            render: (h, item) => {
              return item == null
                ? ""
                : h("span", item.serial + "-" + item.title);
            }
          },
          {
            type: "text",
            label: "来源",
            prop: "source",
            render_simple: "name",
            render_header: true,
            min_width: "100"
          },
          {
            type: "text",
            label: "上传用户",
            prop: "creator_user",
            render_simple: "name",
            min_width: "80"
          },
          {
            type: "text",
            label: "上传时间",
            prop: "creation_time",
            render_header: true,
            min_width: "160"
          },
          {
            type: "text",
            label: "导入状态",
            prop: "is_imported",
            render_simple: "name",
            render_header: true,
            min_width: "100"
          },
          {
            type: "text",
            label: "导入时间",
            prop: "import_date",
            render_header: true,
            min_width: "110"
          },
          {
            type: "text",
            label: "导入用户",
            prop: "import_user",
            render_simple: "name",
            min_width: "110"
          },

          // {type: 'text', label: '下载日', prop: 'cpc_download_date', min_width: '100'},
          // {type: 'text', label: '下载账号', prop: 'cpc_user', min_width: '100'},
          //   {
          //     type: "text",
          //     label: "内部案号",
          //     prop: "cpc_serial",
          //     render_header: true,
          //     min_width: "100"
          //   },
          {
            type: "text",
            label: "官方绝限",
            prop: "cpc_deadline",
            render_header: true,
            min_width: "100"
          },
          // {type: 'text', label: '案件名称', prop: 'cpc_title', min_width: '100'},
          {
            type: "text",
            label: "备注",
            prop: "remark",
            render_header: true,
            min_width: "100"
          }
          // {
          //     type: 'action',
          //     label: '详情',
          //     btns: [
          //         {type: 'view', click: ({viewUrl})=>{window.open(viewUrl)}},
          //     ],
          // }
        ]
      },
      compileType: "add",
      isPanelVisible: false,
      tableData: [],
      rowID: null,
      rowData: null,
      title: ""
    };
  },
  methods: {
    refreshTableData(option) {
      const success = _ => {
        this.compileType === "add" ? this.closeVisible("isPanelVisible") : "";
        this.tableData = _.data;
      };
      const data = Object.assign({}, option);
      this.$axiosGet({
        url: this.URL,
        data: data,
        success
      });
    },
    handleRowClick(row) {
      this.rowData = row;
      this.rowID = row.id;
      this.openVisible("isPanelVisible");
      this.compileType = "edit";
      this.title = `编辑CPC通知书>${row.cpc_serial}-${row.cpc_file_type.name}`;
    },
    // add() {
    //     this.rowData = {};
    //     this.title = "新增文件类型";
    //     this.compileType = "add";
    //     this.openVisible("isPanelVisible");
    //     this.$refs.CpcNoticeEdit?this.$refs.CpcNoticeEdit.clear():"";
    // },
    save(type) {
      this.$refs.CpcNoticeEdit.submitForm(type, this.rowID);
    },
    downloadCpcBatch(type) {
      var selected = this.$refs.table.getSelected();
      if (selected === false) {
        return;
      }
      let token = null;
      var ids = [];
      selected.forEach(_ => {
        if (token == null && _.cpc_file) {
          var u = _.cpc_file.downloadUrl;
          var a = u.split("token=");
          token = a.pop();
        }
        if (type == "cpc_notice" && _.cpc_file) {
          ids.push(_.cpc_file.id);
        }
        if (type == "notice" && _.file) {
          ids.push(_.file.id);
        }
      });
      if (ids.length == 0) {
        this.$message({
          message: "您选择的通知书未解析，无法下载PDF",
          type: "warning"
        });
        return;
      }
      const url =
        "/files/download?type=" +
        type +
        "&ids=" +
        ids.join(",") +
        "&token=" +
        token;
      window.open(url);
    }
  },
  components: {
    TableComponent,
    AppShrink,
    CpcNoticeEdit
  }
};
</script>

<style scoped>
</style>