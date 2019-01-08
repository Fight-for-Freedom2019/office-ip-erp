<!-- 收款账户 -->
<template>
  <div class="BonusRule">
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
      <rule-add
        :type="compileType"
        :data="rowData"
        ref="RuleAdd"
        @update="update"
        @refresh="refresh"
      ></rule-add>
    </app-shrink>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import RuleAdd from "@/components/page/setting/bonus/RuleAdd";
import TableMixins from "@/mixins/table-mixins";
import Config from "@/const/selectConfig";
import { mapActions } from "vuex";

const config = new Map(Config);

export default {
  name: "BonusRule",
  mixins: [TableMixins],
  data() {
    return {
      URL: "/bonus_rules",
      tableOption: {
        name: "BonusRuleList",
        url: "/bonus_rules",
        height: "default",
        highlightCurrentRow: true,
        is_search: true,
        is_list_filter: false,
        list_type: "bonus_rule",
        search_placeholder: "提成规则名称、备注",
        rowClick: this.handleRowClick,
        header_btn: [
          { type: "add", click: this.add },
          { type: "delete" },
          // { type: "export" },
          { type: "control" }
        ],
        columns: [
          { type: "selection" },
          { type: "text", label: "规则名称", prop: "name", min_width: "150" },
          {
            type: "text",
            label: "案件类型",
            prop: "project_type",
            render_simple: "name",
            width: "90",
            render_header: true
          },
          {
            type: "text",
            label: "案件子类型",
            prop: "project_subtype",
            render_simple: "name",
            width: "110",
            render_header: true
          },
          {
            type: "text",
            label: "国家/地区",
            prop: "area",
            render_simple: "name",
            width: "100",
            render_header: true
          },
          {
            type: "text",
            label: "管制事项",
            prop: "process_definition",
            render_simple: "name",
            width: "120",
            render_header: true
          },
          {
            type: "text",
            label: "提成类型",
            prop: "bonus_rule_type",
            render_simple: "name",
            width: "100"
          },
          {
            type: "text",
            label: "生成时机",
            prop: "timing",
            render_simple: "name",
            width: "80"
          },
          { type: "text", label: "点数", prop: "points", width: "60" },
          {
            type: "text",
            label: "点数对象",
            prop: "bonus_target",
            render_simple: "name",
            width: "80"
          },
          {
            type: "text",
            label: "是否折扣",
            prop: "is_discount",
            width: "80",
            render: (h, item) => h("span", item ? "是" : "否")
          },
          {
            type: "text",
            label: "客户",
            prop: "customer",
            render_simple: "name",
            width: "100"
          },
          {
            type: "array",
            label: "案件标签",
            prop: "project_tags",
            min_width: "150",
            render: _ => _.map(_ => _.name)
          },
          {
            type: "array",
            label: "管制事项标签",
            prop: "process_tags",
            min_width: "150",
            render: _ => _.map(_ => _.name)
          },
          { type: "text", label: "优先级", prop: "priority", width: "90" },
          {
            type: "text",
            label: "流程节点",
            prop: "process_action",
            render_simple: "name",
            width: "120"
          },

          { type: "text", label: "备注", prop: "remark", width: "100" }
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
      this.title = `编辑提成规则>${row.name}`;
    },
    add() {
      this.rowData = {};
      this.title = "新增提成规则";
      this.compileType = "add";
      this.openVisible("isPanelVisible");
      this.$refs.RuleAdd ? this.$refs.RuleAdd.clear() : "";
    },
    save(type) {
      this.$refs.RuleAdd.submitForm(type, this.rowID);
    }
  },
  components: {
    TableComponent,
    AppShrink,
    RuleAdd
  }
};
</script>

<style scoped>
</style>