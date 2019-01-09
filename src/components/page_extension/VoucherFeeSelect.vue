<!-- 请款管理 费用明细 -->
<template>
  <app-shrink
    :visible.sync="dialogVisible"
    :modal="false"
    :size="`middle`"
    :title="title"
    ref="top"
  >
    <span slot="header" style="float: right;">
      <el-button type="primary" size="small" @click="save">确定</el-button>
    </span>
    <div class="PaymentCostDetail" v-loading="loadingVisible" :element-loading-text="loadingText">
      <table-component :tableOption="tableOption" :data="fees" ref="table"></table-component>
    </div>
  </app-shrink>
</template>


<script>
import TableComponent from "@/components/common/TableComponent";
import Config from "@/const/selectConfig";
import AppShrink from "@/components/common/AppShrink";

const config = new Map(Config);
export default {
  name: "PaymentCostDetail",
  data() {
    return {
      tableOption: {
        name: "PaymentCostDetailList",
        url: "",
        "min-height": "default",
        highlightCurrentRow: true,
        is_search: false,
        is_pagination: false,
        // 'rowClick': this.handleRowClick,
        header_btn: [
          // {type: 'add'},
        ],
        columns: [
          { type: "selection" },
          { type: "text", label: "订单号", prop: "order.serial", width: "120" },
          {
            type: "text",
            label: "代理费",
            prop: "service_fee.sum",
            width: "100"
          },
          {
            type: "text",
            label: "官费",
            prop: "official_fee.sum",
            width: "100"
          },
          { type: "text", label: "案号", prop: "serial", width: "120" },
          { type: "text", label: "标题", prop: "title", min_width: "150" },
          // {type: 'text', label: '申请国家', prop: 'area', width: '180'},
          {
            type: "text",
            label: "申请号",
            prop: "application_number",
            width: "120"
          },
          {
            type: "text",
            label: "申请日",
            prop: "application_date",
            width: "100"
          }
        ]
      },
      loadingVisible: false,
      dialogVisible: false,
      loadingText: "费用清单加载中...",
      title: "账单费用选择器",
      fees: []
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
  methods: {
    refreshTableData(option) {},

    save() {
      const selected = this.$refs.table.getSelection();
      this.$emit("onFeesSelected", selected);
      this.dialogVisible = false;
    },
    show(id) {
      this.dialogVisible = true;
      this.loadingVisible = true;
      let url = `/invoices/${id}`;
      let success = _ => {
        this.fees = _.data.fees;
        this.loadingVisible = false;
      };
      this.$axiosGet({ url, success });
    }
  },
  components: {
    TableComponent,
    AppShrink
  }
};
</script>

<style scoped>
</style>