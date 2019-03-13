<!-- 请款管理 -->
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

    <payment-manage-detail ref="detail" :id="rowID" @update="update"></payment-manage-detail>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import PaymentManageDetail from "@/components/page_extension/PaymentManageDetail";
import Config from "@/const/selectConfig";
import FeeManage from "@/mixins/fee-manage";

const config = new Map(Config);
const status = [[0, "audit"], [8, "remind"]];
const statusMap = new Map(status);
export default {
    name: "PaymentManage",
    mixins: [FeeManage(statusMap)],
    data() {
        return {
            tableData: [],
            tableOption: {
                name: "PaymentManageList",
                url: this.URL,
                height: "default",
                highlightCurrentRow: true,
                is_search: true,
                is_list_filter: true,
                list_type: "invoices",
                treeFilter: "invoices",
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
                        label: "请款单号",
                        prop: "serial",
                        min_width: "120",
                        render_header: true
                    },
                    // {type: 'text', label: '创建人', prop: 'creator_user', render_simple:"name", width: '110', render_header: true},
                    // {type: 'text', label: '负责人', prop: 'pic', render_simple:"name", width: '110', render_header: true},
                    // {type: 'text', label: '创建时间', prop: 'creation_time', width: '110', render_header: true},
                    {
                        type: "text",
                        label: "请款对象",
                        prop: "user",
                        width: "150",
                        render_simple: "name",
                        render_header: true
                    },
                    {
                        type: "text",
                        label: "金额",
                        prop: "amount_currency",
                        width: "100",
                        align: "right"
                    },
                    { type: "text", label: "币别", prop: "currency", width: "60" },
                    { type: "text", label: "汇率", prop: "roe", width: "70" },
                    {
                        type: "text",
                        label: "人民币",
                        prop: "rmb_amount_currency",
                        width: "100",
                        align: "right"
                    },
                    {
                        type: "text",
                        label: "请款时间",
                        prop: "request_time",
                        width: "110",
                        render_header: true
                    },
                    {
                        type: "text",
                        label: "回款期限",
                        prop: "deadline",
                        width: "110",
                        render_header: true
                    },
                    {
                        type: "text",
                        label: "回款金额",
                        prop: "received_amount_currency",
                        width: "110",
                        align: "right"
                    },
                    // {
                    //   type: "text",
                    //   label: "回款时间",
                    //   prop: "payment_time",
                    //   width: "110",
                    //   render_header: true
                    // },
                    {
                        type: "text",
                        label: "回款确认用户",
                        prop: "confirmation_user",
                        render_simple: "name",
                        width: "150",
                        render_header: true
                    },
                    {
                        type: "text",
                        label: "回款时间",
                        prop: "confirmation_time",
                        width: "150",
                        render_header: true
                    },
                    {
                        type: "text",
                        label: "请款单状态",
                        prop: "status",
                        width: "150",
                        render_header: true,
                        render: (h, item) => {
                            let name = "";
                            config.get("invoice_status").options.map(function (o) {
                                if (o.id === item) {
                                    name = o.name;
                                }
                            });
                            return h("span", name);
                        }
                    },
                    {
                        type: "text",
                        label: "票据已上传",
                        prop: "is_voucher_uploaded",
                        width: "120",
                        render: (h, item) => {
                            return h("span", item ? "是" : "否");
                        }
                    },
                    /*{
                                      type: 'text', label: '快递单号', prop: 'express', width: '150', render: (h, item) => {
                                          return h("span", item ? item.serial : "")
                                      }
                                  },
                                  {type: 'text', label: '寄件时间', prop: 'express.date', width: '150'},*/
                    { type: "text", label: "备注", prop: "remark", width: "150" }
                ]
            },
            is_deleted: 0,
            URL: "/invoices",
            d_URL: "/invoices_delete"
        };
    },
    methods: {
        handleRowClick(row) {
            this.$refs.detail.show(row.id, "request", row);
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