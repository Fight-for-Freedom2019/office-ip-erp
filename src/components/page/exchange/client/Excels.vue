<!-- EXCEL交互 -->
<template>
  <div class="Excel">
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
          :loading="loading"
        >保存</el-button>
      </span>
      <excel-edit
        :type="compileType"
        :data="rowData"
        ref="ExcelEdit"
        @update="update"
        @refresh="refresh"
        @saved="saved"
      ></excel-edit>
    </app-shrink>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import ExcelEdit from "@/components/page/exchange/client/ExcelEdit";
import TableMixins from "@/mixins/table-mixins";
import Config from "@/const/selectConfig";

const config = new Map(Config);

export default {
  name: "Excel",
  mixins: [TableMixins],
  data() {
    return {
      URL: "/excels",
      tableOption: {
        name: "ExcelList",
        url: "/excels",
        height: "default",
        highlightCurrentRow: true,
        list_type: "cpc_notice",
        search_placeholder: "请输入关键字",
        rowClick: this.handleRowClick,
        header_btn: [
          { type: "add", click: this.add },
          { type: "delete" }
          // {type: 'export'},
          // { type: "control" }
        ],
        columns: [
          { type: "selection" },
          {
            type: "text",
            label: "描述",
            prop: "description",
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
      title: "",
      loading: false
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
      this.title = `编辑Excel交互配置>${row.description}`;
    },
    add() {
      this.rowData = {};
      this.title = "新增Excel交互配置";
      this.compileType = "add";
      this.openVisible("isPanelVisible");
      this.$refs.ExcelEdit ? this.$refs.ExcelEdit.clear() : "";
    },
    save(type) {
      this.loading = true;
      this.$refs.ExcelEdit.submitForm(type, this.rowID);
    },
    saved() {
      this.loading = false;
      this.closeVisible("isPanelVisible");
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
    ExcelEdit
  }
};
</script>

<style scoped>
</style>