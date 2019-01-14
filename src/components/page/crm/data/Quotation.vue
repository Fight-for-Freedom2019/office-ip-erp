<template>
  <div class="Quotation">
    <table-component
      :tableOption="tableOption"
      :data="tableData"
      ref="table"
      @refresh="refresh"
      @update="update"
      @refreshTableData="refreshTableData"
    ></table-component>
    <quotation-add @refresh="refresh" @update="update" ref="detail"></quotation-add>
  </div>
</template>
<script>
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import TableMixins from "@/mixins/table-mixins";
import QuotationAdd from "@/components/page/crm/data/QuotationAdd";
import { mapGetters } from "vuex";

export default {
  name: "Quotation",
  mixins: [TableMixins],
  data() {
    return {
      tableOption: {
        name: "QuotationList",
        url: "/quotations",
        is_list_filter: true,
        list_type: "quotations",
        treeFilter: "quotations",
        height: "default",
        highlightCurrentRow: true,
        is_search: true,
        search_placeholder: "",
        rowClick: this.handleRowClick,
        header_btn: [
          { type: "add", click: this.add },
          { type: "delete" },
          { type: "control" }
        ],
        columns: [
          { type: "selection" },
          {
            type: "text",
            label: "客户",
            prop: "customer",
            render_simple: "name",
            min_width: "178",
            render_header: true
          },
          {
            type: "text",
            label: "服务项目",
            prop: "service",
            render_simple: "name",
            min_width: "120",
            render_header: true
          },
          {
            type: "text",
            label: "代理费",
            prop: "service_fee",
            min_width: "120"
          },
          {
            type: "text",
            label: "代理费币别",
            prop: "service_fee_currency",
            min_width: "120"
          },
          {
            type: "text",
            label: "代收官费",
            prop: "official_fee",
            min_width: "120"
          },
          {
            type: "text",
            label: "官费币别",
            prop: "official_fee_currency",
            min_width: "120"
          },
          { type: "text", label: "备注", prop: "remark", min_width: "120" }
        ]
      },
      tableData: [],
      isPanelVisible: false,
      title: "新增",
      form: {
        parent: "",
        name: "",
        description: ""
      },
      rules: {}
    };
  },
  computed: {
    ...mapGetters(["caseMap"])
  },
  methods: {
    refreshTableData(option) {
      const success = _ => {
        this.tableData = _.data;
      };
      const data = Object.assign({}, option);
      this.$axiosGet({
        url: this.tableOption.url,
        data: data,
        success
      });
    },
    handleRowClick(row) {
      this.$refs.detail.show("edit", row);
    },
    add() {
      this.$refs.detail.show("add");
    }
  },
  components: {
    TableComponent,
    AppShrink,
    QuotationAdd
  }
};
</script>