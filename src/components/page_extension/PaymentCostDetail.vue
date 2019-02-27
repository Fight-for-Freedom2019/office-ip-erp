<!-- 请款管理 费用明细 -->
<template>
  <div class="PaymentCostDetail">
    <app-table
      :columns="columns"
      :data="data"
      height="payment_detail"
      :merge="merge"
      :showSummary="true"
      :sumFunc="sumFunc"
    ></app-table>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :modal="false" width="60%">
      <table-component :tableOption="feeDetailOption" :data="feesDetail"></table-component>
    </el-dialog>
    <el-dialog :title="attachmentsTitle" :visible.sync="attachmentsVisible" :modal="false">
      <table-component
        style="margin: 10px 0;"
        :tableOption="attachmentsOption"
        :data="voucherDetail"
      ></table-component>
    </el-dialog>
    <common-detail ref="project" title></common-detail>
  </div>
</template>


<script>
import CommonDetail from "@/components/page_extension/Common_detail";
// import TableComponent from '@/components/common/TableComponent'
import Config from "@/const/selectConfig";
const PROJECT_TYPE = new Map([
  ["专利","patent"],
  ["商标","trademark"],
  ["版权","copyright"],
])
const config = new Map(Config);
export default {
  name: "PaymentCostDetail",
  data() {
    return {
      columns: [
        {
          type: "text",
          label: "客户",
          prop: "customer.name",
          min_width: "120"
        },
        {
          type: "text-btn",
          label: "案号",
          prop: "project.serial",
          width: "178",
          click: this.checkProjectDetail,
          render_text_btn: row => {
            return row.project.serial;
          }
        },
        {
          type: "text",
          label: "标题",
          prop: "project.title",
          min_width: "200"
        },

        {
          type: "text-btn",
          label: "代理费",
          prop: "service_fee.sum_currency",
          width: "100",
          align: "right",
          header_align: "right",
          click: this.checkFeeDetail,
          render_text_btn: row => {
            return row.service_fee.sum_currency;
          }
        },
        {
          type: "text-btn",
          label: "官费",
          prop: "official_fee.sum_currency",
          width: "100",
          align: "right",
          header_align: "right",
          click: this.checkFeeDetail,
          render_text_btn: row => {
            return row.official_fee.sum_currency;
          }
        },
        {
          type: "text",
          label: "小计",
          align: "right",
          header_align: "right",
          prop: "sum_currency",
          width: "100"
        },
        {
          type: "text",
          label: "合计",
          align: "right",
          header_align: "right",
          prop: "total_currency",
          width: "100"
        }
      ],
      merge: [
        { col: 0, key: "customer.id", prop: "user" },
        { col: 6, key: "customer.id", prop: "project.serial" }
      ],

      feeDetailOption: {
        name: "feeDetailList",
        url: "",
        height: 396,
        highlightCurrentRow: true,
        is_search: false,
        is_footer: true,
        rowClick: this.handleRowClick,
        header_btn: [
          // {type: 'add'},
        ],
        columns: [
          // {type: 'selection'},
          {
            type: "text",
            label: "费用名称",
            prop: "feecode.name",
            min_width: "120"
          },
          {
            type: "text",
            label: "费用类型",
            prop: "fee_type",
            render_obj: "feecode",
            width: "100",
            render_simple: "name"
          },
          { type: "text", label: "金额", prop: "amount", width: "70" },
          { type: "text", label: "币别", prop: "currency", width: "70" },
          { type: "text", label: "汇率", prop: "roe", width: "70" },
          { type: "text", label: "人民币", prop: "rmb_amount", width: "70" },
          {
            type: "text",
            label: "费用状态",
            prop: "status",
            render_simple: "name",
            width: "80"
          },
          { type: "text", label: "备注", prop: "remark", width: "80" }
        ]
      },
      attachmentsOption: {
        is_header: false,
        is_pagination: false,
        is_border: false,
        height: 300,
        columns: [
          { type: "text", label: "附件名称", prop: "name" },
          { type: "text", label: "附件格式", prop: "ext" },
          { type: "text", label: "附件大小 ", prop: "size" },
          {
            type: "action",
            label: "详情",
            btns: [
              {
                type: "view",
                click: ({ viewUrl }) => {
                  window.open(viewUrl);
                }
              },
              {
                type: "download",
                click: ({ downloadUrl }) => {
                  window.open(downloadUrl);
                }
              }
            ]
          }
        ]
      },
      tableData: [],
      feesDetail: [],
      voucherDetail: [],
      title: "官费明细",
      attachmentsTitle: "官费票据",
      dialogFormVisible: false,
      attachmentsVisible: false
    };
  },
  props: {
    type: {
      type: String,
      default() {
        return "";
      }
    },
    data: Array
  },
  created() {},
  computed: {
    order() {
      let order = false;
      this.data.forEach(_ => {
        if (_.order != undefined && _.order.id) {
          order = true;
        }
      });
      return order;
    }
  },
  methods: {
    refreshTableData(option) {},
    handleRowClick(row) {},
    checkProjectDetail(row, e, col) {
      this.$refs.project.show(row.project.id, PROJECT_TYPE.get(row.project.project_type.name));
    },
    checkFeeDetail(row, e, col) {
      this.dialogFormVisible = true;
      col.label === "官费"
        ? (this.title = "官费明细")
        : (this.title = "代理费明细");
      if (col.label === "官费") {
        this.feesDetail = row.official_fee.list;
      } else {
        this.feesDetail = row.service_fee.list;
      }
    },
    checkVoucherDetail(row, e, col) {
      this.attachmentsVisible = true;
      col.label === "官费票据"
        ? (this.attachmentsTitle = "官费票据明细")
        : (this.attachmentsTitle = "代理费票据明细");
      if (col.label === "官费票据") {
        this.voucherDetail = row.official_voucher[0];
      } else {
        this.voucherDetail = row.serfice_voucher;
      }
    },
    getRowData(data) {
      this.$emit("getRowData", data);
    },
    sumFunc: param => {
      const { columns, data } = param;
      const sums = [];
      const fields = new Map([
        ["service_fee.sum_currency", "service_fee.sum"],
        ["official_fee.sum_currency", "official_fee.sum"],
        ["sum_currency", "sum"],
        ["total_currency", "total"]
      ]);
      let func = (obj, desc) => {
        // 深层遍历对象属性获取属性值
        let arr = desc.split(".");
        let o = obj;
        while (arr.length && o) {
          o = o[arr.shift()];
        }
        return o;
      };
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        } else if (index === 1) {
          sums[index] = "";
          return;
        }

        if (fields.get(column.property) != undefined) {
          const values = data.map((item, func) => {
            const f = fields.get(column.property);
            let arr = f.split(".");
            let o = item;
            while (arr.length && o) {
              o = o[arr.shift()];
            }
            return Number(o.toString().replace(",", ""));
          });
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            //将结果拆分为小数与整数
            const digits = sums[index]
              .toFixed(2)
              .toString()
              .split(".");
            let number;
            let decimal;
            if (digits.length > 1) {
              number = digits[0].toString();
              decimal = digits[1];
            } else {
              number = sums[index].toString();
              decimal = "00";
            }
            sums[index] =
              number.replace(/\B(?=(\d{3})+$)/g, ",") + "." + decimal;
          }
        } else {
          sums[index] = "";
        }
      });

      return sums;
    }
  },
  components: {
    // TableComponent,
    CommonDetail
  }
};
</script>

<style scoped>
</style>