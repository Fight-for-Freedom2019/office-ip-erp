<!-- 代理人 -->
<template>
  <div class="Agents">
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
        <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
        <el-button
          type="primary"
          size="small"
          v-if="compileType === 'edit'"
          @click="save('edit')"
        >保存</el-button>
      </span>
      <agent-detail
        :type="compileType"
        :data="rowData"
        ref="detail"
        @update="update"
        @refresh="refresh"
      ></agent-detail>
    </app-shrink>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import AgentDetail from "@/components/page/setting/agencies/AgentDetail";
import TableMixins from "@/mixins/table-mixins";
import Config from "@/const/selectConfig";
import { mapActions } from "vuex";

const config = new Map(Config);

export default {
  name: "Agents",
  mixins: [TableMixins],
  data() {
    return {
      URL: "/agents",
      tableOption: {
        name: "AgentsList",
        url: "/agents",
        height: "default",
        highlightCurrentRow: true,
        is_search: true,
        is_list_filter: false,
        list_type: "serial",
        search_placeholder: "代理人名称、备注",
        rowClick: this.handleRowClick,
        header_btn: [
          { type: "add", click: this.add },
          { type: "delete" },
          // { type: "export" },
          { type: "control" }
        ],
        columns: [
          { type: "selection" },
          {
            type: "text",
            label: "代理机构",
            prop: "agency",
            render_simple: "name",
            min_width: "120"
          },
          { type: "text", label: "姓名", prop: "name", min_width: "150" },
          {
            type: "text",
            label: "执业证号",
            prop: "certificate",
            min_width: "100"
          },
          {
            type: "text",
            label: "电话",
            prop: "phone_number",
            min_width: "120"
          },
          {
            type: "text",
            label: "状态",
            prop: "status",
            render_simple: "name",
            min_width: "100"
          }
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
  created() {
    this.refreshTags();
  },
  methods: {
    ...mapActions([
      // 'refreshExtends', //extend-field
      "refreshTags" //product
    ]),
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
      this.title = `编辑代理人>${row.name}`;
    },
    add() {
      this.rowData = {};
      this.title = "新增代理人";
      this.compileType = "add";
      this.openVisible("isPanelVisible");
      this.$refs.detail ? this.$refs.detail.clear() : "";
    },
    save(type) {
      this.$refs.detail.submitForm(type, this.rowID);
    }
  },
  components: {
    TableComponent,
    AppShrink,
    AgentDetail
  }
};
</script>

<style scoped>
</style>