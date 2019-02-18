<!--客户管理-->
<!-- 供应商管理的需求和客户管理的需求很相似，只有接口不一样，然后没有申请人和发明人两项的添加 -->
<template>
  <div class="customerList">
    <table-component
      :tableOption="tableOption"
      :data="tableData"
      ref="table"
      @refreshTableData="refreshTableData"
    ></table-component>

    <!-- 新建客户 -->
    <customer-list-add ref="customerAdd" :URL="URL" @refresh="addSuccess" popType="add"></customer-list-add>

    <!-- 客户详情面板 -->
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
import { mapGetters } from "vuex";

export default {
  name: "customerList",
  data() {
    return {
      popType: "",
      URL: "/customers",
      isCustomerAddPanelVisible: false,
      is_suppliers: false,
      tableOption: {
        name: "customerList",
        url: "/customers",
        height: "default",
        highlightCurrentRow: true,
        is_search: true,
        is_list_filter: true,
        search_placeholder: "客户名称",
        rowClick: this.handleRowClick,
        header_btn: [
          { type: "add", click: this.add },
          { type: "delete" },
          // { type: "import" },
          // { type: "export" },
          { type: "control" }
        ],
        columns: [
          { type: "selection" },
          { type: "text", label: "客户名称", prop: "name", min_width: "200" },
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

          { type: "text", label: "邮箱", prop: "email_address", width: "178" },
          { type: "text", label: "电话", prop: "phone_number", width: "160" },
          { type: "text", label: "地址", prop: "address", width: "200" },
          {
            type: "text",
            label: "销售",
            prop: "sales",
            render_simple: "name",
            width: "110"
          },
          {
            type: "text",
            label: "顾问",
            prop: "consultant",
            render_simple: "name",
            width: "110"
          },
          {
            type: "text",
            label: "联系人",
            prop: "contact",
            render_simple: "name",
            width: "110"
          },
          {
            type: "text",
            label: "监控年费",
            prop: "is_annual_fee",
            width: "80",
            render: this.booleanRender
          },
          {
            type: "text",
            label: "年费收取服务费",
            prop: "is_annual_service_fee",
            width: "120",
            render: this.booleanRender
          }
        ]
      },
      tableData: [],
      client_status: "",
      client_invoice: "",
      currentRow: {},
      isDetailPanelVisible: false,
      dialogVisible: false,
      filter: {}
    };
  },
  computed: {
    ...mapGetters(["areaMap", "cityMap", "provinceMap"])
  },
  methods: {
    // handleShrinkClose () {
    //   this.$refs.table.setCurrentRow();
    // },
    refreshTableData(option) {
      const success = _ => {
        this.isCustomerAddPanelVisible = false;
        this.tableData = _.data;
      };
      this.$axiosGet({
        url: this.URL,
        data: Object.assign({}, option),
        success
      });
    },
    booleanRender(h, item) {
      item == 1 ? (item = "是") : (item = "否");
      return h("span", item);
    },
    addSuccess() {
      this.refreshTableData();
    },
    add() {
      this.$refs.customerAdd.show();
    },
    saveAdd() {
      this.$refs.customerAdd.add();
    },
    addRefresh(row) {
      this.currentRow = row;
      this.dialogVisible = false;
      this.refresh();
    },
    editRefresh() {
      this.update();
    },
    handleRowClick(row) {
      // console.log(row);
      this.currentRow = row;
      this.$refs.detail.onTabPageClicked(); // 点击table-row之后执行详情面板中的onTabPageClicked方法刷新内容
      if (!this.isDetailPanelVisible) {
        this.isDetailPanelVisible = true;
      }
    },
    refresh() {
      this.$refs.table.refresh();
    },
    update() {
      this.$refs.table.update();
    }
  },
  mounted() {
    this.refresh();
  },
  components: {
    TableComponent,
    AppShrink,
    CustomerListAdd,
    CustomerListDetail
  }
};
</script>
<style scoped lang="scss"></style>
