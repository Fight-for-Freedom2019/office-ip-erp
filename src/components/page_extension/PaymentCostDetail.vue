<!-- 请款管理 费用明细 -->
<template>
  <div class="PaymentCostDetail">
    <table-component :tableOption="tableOption" :data="data" @getRowData="getRowData"></table-component>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :modal="false" width="60%">
      <table-component :tableOption="feeDetailOption" :data="feesDetail"></table-component>
    </el-dialog>
    <el-dialog :title="attachmentsTitle" :visible.sync="attachmentsVisible" :modal="false">
      <table-component style="margin: 10px 0;" :tableOption="attachmentsOption"
                       :data="voucherDetail"></table-component>
    </el-dialog>
    <order-detail type="pay" ref="detail"></order-detail>

  </div>


</template>


<script>
  import OrderDetail from "@/components/page/crm/orders/OrderDetail";
  // import TableComponent from '@/components/common/TableComponent'
  import Config from '@/const/selectConfig'

  const config = new Map(Config);
  export default {
    name: "PaymentCostDetail",
    data() {
      return {
        tableOption: {
          'name': 'PaymentCostDetailList',
          'url': "",
          'height': 394,
          'highlightCurrentRow': true,
          'is_search': false,
          'is_pagination': false,
          'rowClick': this.handleRowClick,
          'header_btn': [
            // {type: 'add'},
          ],
          'columns': [
            {type: 'selection'},
            // {type: 'text', label: '客户', prop: 'customer.name', min_width: '120'},
            {
              type: 'text-btn', label: '订单号', prop: 'order.serial', width: '120',
              click: this.checkOrderDetail,
              render_text_btn: (row) => {
                return row.order.serial;
              }
            },
            {
              type: 'text-btn',
              label: '代理费',
              prop: 'service_fee.sum',
              width: '90',
              click: this.checkFeeDetail,
              render_text_btn: (row) => {
                return row.service_fee.sum;
              }
            },
            {
              type: 'text-btn',
              label: '官费',
              prop: 'official_fee.sum',
              width: '90',
              click: this.checkFeeDetail,
              render_text_btn: (row) => {
                return row.official_fee.sum;
              }
            },
            {type: 'text', label: '案号', prop: 'project.serial', width: '120'},
            {type: 'text', label: '标题', prop: 'project.title', width: '120'},
            // {type: 'text', label: '申请国家', prop: 'area', width: '180'},
            {type: 'text', label: '申请号', prop: 'application_number', width: '120'},
            {type: 'text', label: '申请日', prop: 'application_date', width: '100'},

            // {
            //     type: 'text', label: '费用策略', prop: 'policy', width: '150', render: (h, item) => {
            //         let name = "";
            //         config.get("policy").options.map(function (o) {
            //             if (o.id === item) {
            //                 name = o.name;
            //             }
            //         });
            //         return h("span", name);
            //     }
            // },
            // {
            //     type: 'text-btn',
            //     label: '官费票据',
            //     prop: 'official_voucher',
            //     width: '150',
            //     click: this.checkVoucherDetail,
            //     render_text_btn: (row) => {
            //         return "点击查看详情";
            //     }
            // },
            // {
            //     type: 'text-btn', label: '代理费票据', prop: 'serfice_voucher', width: '150',
            //     click: this.checkVoucherDetail,
            //     render_text_btn: (row) => {
            //         return "点击查看详情";
            //     }
            // },
          ],
        },
        feeDetailOption: {
          'name': 'feeDetailList',
          'url': "",
          'height': 396,
          'highlightCurrentRow': true,
          'is_search': false,
          'is_footer': true,
          'rowClick': this.handleRowClick,
          'header_btn': [
            // {type: 'add'},
          ],
          'columns': [
            // {type: 'selection'},
            {type: 'text', label: '费用名称', prop: 'feecode.name', min_width: '120'},
            {
              type: 'text',
              label: '费用类型',
              prop: 'fee_type',
              render_obj: "feecode",
              width: '100',
              render_simple: 'name',
            },
            {type: 'text', label: '金额', prop: 'amount', width: '80'},
            {type: 'text', label: '币别', prop: 'currency', width: '80'},
            {type: 'text', label: '汇率', prop: 'roe', width: '80'},
            {type: 'text', label: '人民币', prop: 'rmb_amount', width: '90'},
            {type: 'text', label: '费用状态', prop: 'status', render_simple: 'name', width: '100',},
            {type: 'text', label: '备注', prop: 'remark', width: '150'},
          ],
        },
        attachmentsOption: {
          'is_header': false,
          'is_pagination': false,
          'is_border': false,
          "height": 300,
          'columns': [
            {type: 'text', label: '附件名称', prop: 'name'},
            {type: 'text', label: '附件格式', prop: 'ext'},
            {type: 'text', label: '附件大小 ', prop: 'size'},
            {
              type: 'action',
              label: '详情',
              btns: [
                {
                  type: 'view', click: ({viewUrl}) => {
                    window.open(viewUrl)
                  }
                },
                {
                  type: 'download', click: ({downloadUrl}) => {
                    window.open(downloadUrl)
                  }
                },
              ],
            }
          ]
        },
        tableData: [],
        feesDetail: [],
        voucherDetail: [],
        title: "官费明细",
        attachmentsTitle: "官费票据",
        dialogFormVisible: false,
        attachmentsVisible: false,
      }
    },
    props: {
      type: {
        type: String,
        default() {
          return ""
        }
      },
      data: Array,
    },
    created() {
      if (!this.type) {
        Array.shift(this.tableOption.columns);
      } else {
        this.tableOption.is_pagination = false;
        this.tableOption.is_footer = true;
        this.tableOption.footer_btn = [
          {
            type: "verify"
          }
        ]
      }
    },
    methods: {
      refreshTableData(option) {
      },
      handleRowClick(row) {

      },
      checkOrderDetail(row, e, col){
        // console.log("row",row);
        this.$refs.detail.show(row.order.id, "edit");
      },
      checkFeeDetail(row, e, col) {
        this.dialogFormVisible = true;
        col.label === "官费" ? this.title = "官费明细" : this.title = "代理费明细";
        if (col.label === "官费") {
          this.feesDetail = row.official_fee.list;
        } else {
          this.feesDetail = row.service_fee.list;
        }
      },
      checkVoucherDetail(row, e, col) {
        this.attachmentsVisible = true;
        col.label === "官费票据" ? this.attachmentsTitle = "官费票据明细" : this.attachmentsTitle = "代理费票据明细";
        if (col.label === "官费票据") {
          this.voucherDetail = row.official_voucher[0];
        } else {
          this.voucherDetail = row.serfice_voucher;
        }
      },
      getRowData(data) {
        this.$emit("getRowData", data);
      },
    },
    components: {
      // TableComponent,
      OrderDetail
    }
  }
</script>

<style scoped>

</style>