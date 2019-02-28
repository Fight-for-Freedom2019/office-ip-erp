<!-- 付款管理 -->
<template>
  <div class="PaymentManage">
    <table-component
      :tableOption="tableOption"
      :data="tableData"
      ref="table"
      @refresh="refresh"
      @update="update"
      @refreshTableData="refreshTableData"
    ></table-component>

    <payment-manage-detail type="pay" ref="detail" :id="rowID" @update="update"></payment-manage-detail>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import PaymentManageDetail from "@/components/page_extension/PaymentManageDetail";
import Config from "@/const/selectConfig";
import FeeManage from "@/mixins/fee-manage";

const config = new Map(Config);
const status = [[0, "audit"], [8, "remind"], [11, "upload"], [12, "confirm"]];
const statusMap = new Map(status);
export default {
  name: "PaymentManage",
  mixins: [FeeManage(statusMap)],
  data() {
    return {
      tableData: [],
      paymentDialog: false,
      tableOption: {
        name: "PaymentManageList",
        url: this.URL,
        height: "default",
        highlightCurrentRow: true,
        is_search: true,
        is_list_filter: true,
        list_type: "invoices",
        treeFilter: "invoices_payment",
        search_placeholder: "",
        rowClick: this.handleRowClick,
        header_btn: [
          // {type: 'export'},
          { type: "delete", click: this.deleteBill },
          { type: "control" }
        ],
        columns: [
          { type: "selection" },
          {
            type: "text",
            label: "付款单号",
            prop: "serial",
            min_width: "110",
            render_header: true
          },

          {
            type: "text",
            label: "付款对象",
            prop: "user",
            width: "180",
            render_simple: "name",
            render_header: true
          },
          {
            type: "text",
            label: "金额",
            prop: "amount_currency",
            width: "100",
            align: "right",
            render_header: true
          },
          { type: "text", label: "币别", prop: "currency", width: "60" },
          { type: "text", label: "汇率", prop: "roe", width: "70" },
          {
            type: "text",
            label: "人民币",
            prop: "rmb_amount_currency",
            width: "100",
            align: "right",
            render_header: true,
          },
          {
            type: "text",
            label: "状态",
            prop: "status",
            width: "80",
            align: "center",
            render_header: true,
            render: (h, item) => {
              let name = "";
              config.get("invoice_status_fee").options.map(function(o) {
                if (o.id === item) {
                  name = o.name;
                }
              });
              return h("span", name);
            }
          },
          {
            type: "text",
            label: "实付金额",
            prop: "received_amount_currency",
            width: "100",
            align: "right",
            render_header: true
          },
          {
            type: "text",
            label: "请款时间",
            prop: "request_time",
            width: "100",
            render_header: true
          },
          {
            type: "text",
            label: "付款期限",
            prop: "deadline",
            width: "100",
            render_header: true
          },
          {
            type: "text",
            label: "付款时间",
            prop: "payment_time",
            width: "100",
            render_header: true
          },

          {
            type: "text",
            label: "创建人",
            prop: "creator_user",
            render_simple: "name",
            width: "90",
            render_header: true
          },
          {
            type: "text",
            label: "创建时间",
            prop: "creation_time",
            width: "100",
            render_header: true
          },
          {
            type: "text",
            label: "确费用户",
            prop: "confirmation_user",
            render_simple: "name",
            width: "100",
            render_header: true
          },
          {
            type: "text",
            label: "确费时间",
            prop: "confirmation_time",
            width: "100",
            render_header: true
          },

          {
            type: "text",
            label: "票据上传",
            prop: "is_voucher_uploaded",
            width: "100",
            render: (h, item) => {
              return h("span", item ? "是" : "否");
            }
          },
          { type: "text", label: "备注", prop: "remark", width: "100" }
        ]
      },
      is_deleted: 0,
      URL: "/invoices",
      d_URL: "/invoices_delete",
      form: {
        date: "1992-02-21"
      },
      rules: {
        date: [{ required: true, message: "请选择付款时间", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleRowClick(row) {
      this.$refs.detail.show(row.id, "pay", row);
    }
  },
  components: {
    TableComponent,
    AppShrink,
    PaymentManageDetail
  }
};
</script>

<style scoped>
</style>