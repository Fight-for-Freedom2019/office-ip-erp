<!-- 供应商管理 -->
<template>
  <div class="SuppliersList">
    <table-component
      :tableOption="tableOption"
      :data="tableData"
      ref="table"
      @refreshTableData="refreshTableData"
    ></table-component>

    <!-- 新建客户 -->
    <customer-list-add ref="customerAdd" :is_suppliers="is_suppliers" :URL="URL" @refresh="addSuccess" popType="add"></customer-list-add>
    <!-- 供应商详情面板 -->
    <customer-list-detail
      :title="currentRow.name"
      :visible.sync="isDetailPanelVisible"
      type="customer"
      :id="currentRow.id"
      :row="currentRow"
      ref="detail"
      :URL="URL"
      :is_suppliers="is_suppliers"
      @editSuccess="refresh"
    ></customer-list-detail>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import CustomerListDetail from "@/components/page_extension/CustomerListDetail";
import CustomerListAdd from "@/components/page_extension/CustomerListAdd";
import CustomerList from "@/components/page/CustomerList";
import { mapGetters } from "vuex";

export default {
  name: "Suppliers",
  mixins: [CustomerList],
  data() {
    return {
      URL: "/suppliers",
      tableOption: {
        name: "customerList",
        url: "/suppliers",
        height: "default",
        highlightCurrentRow: true,
        is_search: true,
        is_list_filter: true,
        search_placeholder: "客户名称",
        rowClick: this.handleRowClick,
        header_btn: [
          { type: "add", click: this.add },
          { type: "delete" },
          //   { type: "import" },
          //   { type: "export" },
          { type: "control" }
        ],
        columns: [
          { type: "selection" },

          {
            type: "text",
            label: "省份",
            prop: "province_code",
            min_width: "80",
            render: (h, item) => {
              const d = this.provinceMap.get(Number.parseInt(item));
              return h("span", d ? d : "");
            }
          },
          {
            type: "text",
            label: "城市",
            prop: "city_code",
            min_width: "80",
            render: (h, item) => {
              const d = this.cityMap.get(item);
              return h("span", d ? d : "");
            }
          },
          { type: "text", label: "供应商名称", prop: "name", min_width: "200" },
          { type: "text", label: "地址", prop: "address", min_width: "200" },
          {
            type: "text",
            label: "邮箱",
            prop: "email_address",
            min_width: "178"
          },
          {
            type: "text",
            label: "电话",
            prop: "phone_number",
            min_width: "220"
          },
          {
            type: "text",
            label: "销售",
            prop: "sales",
            render_simple: "name",
            min_width: "80"
          },
          {
            type: "text",
            label: "顾问",
            prop: "consultant",
            render_simple: "name",
            min_width: "80"
          },
          {
            type: "text",
            label: "联系人",
            prop: "contact",
            render_simple: "name",
            min_width: "80"
          }
        ]
      },
      is_suppliers: true
    };
  },
  methods: {},
  components: {
    TableComponent,
    AppShrink,
    CustomerListAdd,
    CustomerListDetail
  }
};
</script>

<style scoped>
</style>
