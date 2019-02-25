<!-- 待付费用 -->
<template>
  <div class="SuppliersFee">
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
      <request-payout-add
        ref="requestPayout"
        :is_debit="is_debit"
        :fee_type="fee_type"
        :rowData="row"
        @update="update"
        @refresh="refresh"
      ></request-payout-add>
    </app-shrink>
    <el-dialog
      :visible.sync="dialogCreateNewOrder"
      :modal="true"
      width="600px"
      size="mini"
      title="将费用新建为付款单"
    >
      <div style="margin-bottom: 10px; color: rgb(132, 146, 166); font-size: 14px;">
        <span>从选取的费用创建一个新的付款单，用于批量追踪付款费用，如果需要跨页选取费用，请在窗口左下角将分页数量调整为一个较大的值。</span>
      </div>
      <el-button type="primary" @click="saveOrder('new')">确认新建</el-button>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogAddToOrder"
      :modal="true"
      width="600px"
      size="mini"
      title="将费用添加至现有的付款单内"
    >
      <div style="margin-bottom: 10px; color: rgb(132, 146, 166); font-size: 14px;">
        <span>从选取的费用添加至现有的付款单内，用于批量追踪付款费用，如果需要跨页选取费用，请在窗口左下角将分页数量调整为一个较大的值。</span>
      </div>
      <jump-select style="margin-bottom: 10px;" type="pay" v-model="bill"></jump-select>
      <el-button type="primary" @click="saveOrder('add')">确认添加</el-button>
    </el-dialog>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import RequestPayoutAdd from "@/components/page_extension/RequestPayoutAdd";
import JumpSelect from "@/components/form/JumpSelect";
import Config from "@/const/selectConfig";
import FeeCommon from "@/mixins/fee-common";

const config = new Map(Config);

export default {
  name: "SuppliersFee",
  mixins: [FeeCommon("requestPayout")],
  data() {
    return {
      tableOption: {
        name: "SuppliersFeeList",
        url: "/fees",
        height: "default",
        highlightCurrentRow: true,
        is_search: true,
        is_list_filter: true,
        list_type: "fees",
        treeFilter: "fees",
        // 'is_merge': {KEY: "user.customer.id", COL: [1, 2, 3]},
        search_placeholder: "",
        rowClick: this.handleRowClick,
        header_btn: [
          { type: "add", click: this.add },
          {
            type: "dropdown",
            label: "付款单",
            click: this.getSelected,
            items: [
              {
                text: "创建新的付款单",
                click: this.createNewOrder,
                divided: false,
                icon: "plus"
              },
              {
                text: "将费用添加至现有的付款单内",
                click: this.addToOrder,
                divided: true,
                icon: "d-arrow-right"
              }
            ]
          },
          { type: "delete" },
          // {type: 'export'},
          { type: "control" }
        ],
        columns: [
          { type: "selection" },
          {
            type: "text",
            label: "客户",
            prop: "user",
            render_simple: "name",
            min_width: "178",
            render_header: true
          },
          {
            type: "text",
            label: "标题",
            prop: "project.title",
            width: "240",
          },
          {
            type: "text",
            label: "申请号",
            prop: "project.application_number",
            width: "150",
            render_header: true
          },
          {
            type: "text",
            label: "账单号",
            prop: "invoice",
            render_simple:"serial",
            width: "150",
          },
          {
            type: "text",
            label: "委案日",
            prop: "project.entrusting_time",
            width: "100",
            render_header: true
          },
          {
            type: "text",
            label: "申请日",
            prop: "project.application_date",
            width: "100",
            render_header: true
          },
          {
            type: "text",
            label: "案号",
            prop: "project.serial",
            width: "178",
            // render_header: true
          },

          {
            type: "text",
            label: "费用名称",
            prop: "fee_code",
            render_simple:"name",
            width: "160",
            render_header: true
          },
          {
            type: "text",
            label: "费用类型",
            prop: "fee_type",
            render_simple:"name",
            width: "100",
            render_header: true
          },
          // TODO 接口有字段缺失
          { type: "text", label: "金额", prop: "amount", width: "80" },
          {
            type: "text",
            label: "币别",
            prop: "currency",
            width: "80",
            render_header: true
          },
          { type: "text", label: "汇率", prop: "roe", width: "60" },
          { type: "text", label: "人民币", prop: "rmb_amount", width: "80" },
          {
            type: "text",
            label: "官方绝限",
            prop: "deadline",
            width: "110",
            render_header: true
          },
          {
            type: "text",
            label: "计划付款时间",
            prop: "invoice.deadline", // TODO prop为invoice时计划付款时间和通知书发文日只渲染通知书发文日
            width: "120",
            // render_header: true
          },
          {
            type: "text",
            label: "实际付款时间",
            prop: "invoice.payment_time",
            width: "120",
            render_header: true
          },
          {
            type: "text",
            label: "通知书发文日",
            prop: "mail_date",
            render_obj: "notice",
            width: "120",
            render_header: true
          },
          {
            type: "text",
            label: "费用策略",
            prop: "policy",
            width: "120",
            render_header: true,
            render_simple: "name"
          },
          {
            type: "text",
            label: "费用状态",
            prop: "status",
            width: "120",
            render_simple: "name",
            render_header: true
          },
          {
            type: "text",
            label: "客户已付款",
            prop: "is_opposite_fee_payed",
            width: "120",
            render_header: true
          },
          {
            type: "text",
            label: "订单号",
            prop: "order.serial",
            width: "120",
            render_header: true
          },
          {
            type: "text",
            label: "备注",
            prop: "remark",
            width: "150",
            render_header: true
          }
        ]
      },
      is_debit: 0,
      URL: "/fees",
      fee_type: "pay" // 付费
    };
  },
  components: {
    RequestPayoutAdd,
    TableComponent,
    AppShrink,
    JumpSelect
  }
};
</script>

<style scoped>
</style>
