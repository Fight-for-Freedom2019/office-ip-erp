<template>
  <div class="mailTemplate">
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
      <mail-template-add
        :type="compileType"
        :data="rowData"
        ref="MailTemplateAdd"
        @update="update"
        @refresh="refresh"
      ></mail-template-add>
    </app-shrink>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import MailTemplateAdd from "@/components/page/setting/data/MailTemplateAdd";
import TableMixins from "@/mixins/table-mixins";
import Config from "@/const/selectConfig";

const config = new Map(Config);
const URL = "/message_templates";
export default {
  name: "MailTemplate",
  mixins: [TableMixins],
  data() {
    return {
      tableOption: {
        name: "mailTemplate",
        url: URL,
        height: "default",
        highlightCurrentRow: true,
        is_search: true,
        is_list_filter: false,
        list_type: "serial",
        search_placeholder: "模板类型",
        rowClick: this.handleRowClick,
        header_btn: [
          { type: "add", click: this.add },
          { type: "delete" },
          // {type: 'export'},
          { type: "control" }
        ],
        columns: [
          { type: "selection" },
          { type: "text", label: "ID", prop: "id", width: "60" },
          {
            type: "text",
            label: "默认模板",
            prop: "is_default",
            width: "80",
            render: (h, item) => {
              item = item ? "是" : "否";
              return h("span", item);
            }
          },
          {
            type: "text",
            label: "所属客户",
            prop: "customer",
            render_simple: "name",
            width: "110"
          },
          {
            type: "text",
            label: "模板类型",
            prop: "template_type",
            render_simple: "name",
            width: "80"
          },
          {
            type: "text",
            label: "子类型",
            prop: "subtype",
            render_simple: "name",
            width: "110"
          },
          {
            type: "text",
            label: "场景",
            prop: "scene",
            render_simple: "name",
            width: "100"
          },
          { type: "text", label: "标题", prop: "title", width: "100" },
          {
            type: "text",
            label: "收件人",
            prop: "to",
            width: "150",
            render: this.handleRenderPerson
          },
          {
            type: "text",
            label: "抄送",
            prop: "cc",
            width: "150",
            render: this.handleRenderPerson
          },
          // {type: 'text', label: '密送', prop: 'bcc', width: '100', render: this.handleRenderPerson,},
          { type: "text", label: "邮件正文", prop: "body", min_width: "150" }
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
        this.tableData = _.data.data;
      };
      const data = Object.assign({}, option);
      this.$axiosGet({
        url: URL,
        data: data,
        success
      });
    },
    handleRowClick(row) {
      this.rowData = row;
      this.rowID = row.id;
      this.openVisible("isPanelVisible");
      this.compileType = "edit";
      this.title = `编辑邮件模板>${row.title}`;
    },
    handleRenderPerson(h, item) {
      if (item == null || item.type == null) return;

      const type = item.type.name !== undefined ? item.type.name : item.type;
      const value = item.users.map(d => d.name);
      item = type + ":" + value;

      return h("el-tag", item);
    },
    add() {
      this.rowData = {};
      this.title = "新增邮件模板";
      this.compileType = "add";
      this.openVisible("isPanelVisible");
      this.$refs.MailTemplateAdd ? this.$refs.MailTemplateAdd.clear() : "";
    },
    save(type) {
      this.$refs.MailTemplateAdd.submitForm(type, this.rowID);
    }
  },
  components: {
    TableComponent,
    AppShrink,
    MailTemplateAdd
  }
};
</script>

<style scoped>
</style>