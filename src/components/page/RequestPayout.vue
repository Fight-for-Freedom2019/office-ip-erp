<!-- 待请费用 -->
<template>
  <div class="RequestPayout">
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
        <!--<el-button type="primary" size="small" v-if="compileType === 'add'"
        @click="save('add','requestPayout')">新建</el-button>-->
        <app-button-loading
          :func="save"
          v-if="compileType === 'add'"
          param="add,requestPayout"
          ref="loadingBtn"
        ></app-button-loading>
        <el-button
          type="primary"
          size="small"
          v-if="compileType === 'edit'"
          @click="save('edit','requestPayout')"
        >保存</el-button>
      </span>
      <request-payout-add
        ref="requestPayout"
        :is_debit="is_debit"
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
      title="将费用新建为请款单"
    >
      <div style="margin-bottom: 10px; color: rgb(132, 146, 166); font-size: 14px;">
        <span>从选取的费用创建一个新的请款单，用于批量追踪请款费用，如果需要跨页选取费用，请在窗口左下角将分页数量调整为一个较大的值。</span>
      </div>
      <el-button type="primary" @click="saveOrder('new')">确认新建</el-button>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogAddToOrder"
      :modal="true"
      width="600px"
      size="mini"
      title="将费用添加至现有的请款单内"
    >
      <div style="margin-bottom: 10px; color: rgb(132, 146, 166); font-size: 14px;">
        <span>从选取的费用添加至现有的请款单内，用于批量追踪请款费用，如果需要跨页选取费用，请在窗口左下角将分页数量调整为一个较大的值。</span>
      </div>
      <jump-select style="margin-bottom: 10px;" type="bill" v-model="bill"></jump-select>
      <el-button type="primary" @click="saveOrder('add')">确认添加</el-button>
    </el-dialog>
    <common-detail ref="detail"></common-detail>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import RequestPayoutAdd from "@/components/page_extension/RequestPayoutAdd";
import JumpSelect from "@/components/form/JumpSelect";
import Config from "@/const/selectConfig";
import FeeCommon from "@/mixins/fee-common";
import CommonDetail from '@/components/page_extension/Common_detail'

const config = new Map(Config);

export default {
    name: "RequestPayout",
    mixins: [FeeCommon("requestPayout")],
    data() {
        return {
            tableOption: {
                name: "RequestPayoutList",
                url: "/fees",
                height: "default",
                highlightCurrentRow: true,
                is_search: true,
                is_list_filter: true,
                list_type: "fees",
                treeFilter: "fees",
                import_type: 'fees_in',
                show_summary: true,
                merge: [
                    // { col: 2, key: "user.id", prop: "user" },
                    { col: 3, key: "project.id", prop: "project.serial" },
                    { col: 4, key: "project.id", prop: "project.subtype.id" },
                    { col: 5, key: "project.id", prop: "title" },
                    { col: 12, key: "project.id", prop: "official_sum_currency" },
                    { col: 13, key: "project.id", prop: "service_sum_currency" },
                    { col: 14, key: "project.id", prop: "sum_currency" }
                ],
                search_placeholder: "",
                rowClick: this.handleRowClick,
                header_btn: [
                    { type: "add", click: this.add },
                    { type: "delete" },
                    { type: 'export2' },
                    {
                        type: "dropdown",
                        label: "请款单",
                        click: this.getSelected,
                        items: [
                            {
                                text: "创建新的请款单",
                                click: this.createNewOrder,
                                divided: false,
                                icon: "plus"
                            },
                            {
                                text: "将费用添加至现有的请款单内",
                                click: this.addToOrder,
                                divided: true,
                                icon: "d-arrow-right"
                            }
                        ]
                    },
                    {
                        type: "dropdown",
                        label: "操作",
                        click: this.getSelected,
                        items: [
                            {
                                text: "删除",
                                click: this.deleteFees,
                                divided: false,
                                icon: "delete"
                            },
                            {
                                text: "将费用添加至现有的请款单内",
                                click: this.addToOrder,
                                divided: true,
                                icon: "d-arrow-right"
                            }
                        ]
                    },
                    
                    { type: "control" }
                ],
                columns: [
                    { type: "selection" },
                    { type: "text", label: "客户", prop: "user", render_simple: "name", min_width: "120", render_header: true },
                    { type: "text-btn", label: "案号", prop: "serial", render_text_btn: (row) => { return row.project != null ? row.project.serial : "" }, click: this.handleCaseDetail, width: "178" },
                    { type: "text", label: "案件类型", render_simple: "name", prop: "subtype", render_obj: "project", width: "100", render_header: true },
                    { type: "text", label: "标题", prop: "title",render_obj:"project", width: "180" },
                    { type: "text", label: "费用名称", prop: "fee_code", render_simple: "name", width: "130", render_header: true },
                    { type: "text", label: "类型", prop: "fee_type", render_simple: "name", width: "80", render_header: true },
                    { type: "text", label: "收款账户", prop: "payment_account", render_simple: "abbr", width: "120", render_header: true },
                    { type: "text", label: "金额", prop: "amount_currency", width: "100", align: "right" },
                    { type: "text", label: "币别", prop: "currency", width: "55" },
                    { type: "text", label: "汇率", prop: "roe", width: "68", align: "right" },
                    { type: "text", label: "人民币", prop: "rmb_amount_currency", width: "100", align: "right" },
                    { type: "text", label: "官费小计", prop: "official_sum_currency", width: "100", align: "right" },
                    { type: "text", label: "代理费小计", prop: "service_sum_currency", width: "100", align: "right" },
                    { type: "text", label: "小计", prop: "sum_currency", width: "100", align: "right" },
                    { type: "text", label: "申请号", prop: "application_number", width: "165", render_header: true, expanded: true,
                      render:(h,item,row)=>{
                        return h('span',row.project?row.project.application_number:"");
                      }
                    },
                    { type: "text", label: "申请日", prop: "application_date",render_obj:"project", width: "100", render_header: true, expanded: true,
                      render:(h,item,row)=>{
                        return h('span',row.project?row.project.application_date:"");
                      }
                    },
                    { type: "text", label: "委案日", prop: "entrusting_time", width: "100", render_header: true, expanded: true,
                      render:(h,item,row)=>{
                        return h('span',row.project?row.project.entrusting_time:"");
                      }
                    },
                    { type: "text", label: "费用期限", prop: "deadline", width: "100", render_header: true, expanded: true },
                    { type: "text", label: "费用策略", prop: "policy", width: "100", render_header: true, render_simple: "name", expanded: true },
                    { type: "text", label: "费用状态", prop: "status", width: "100", render_simple: "name", render_header: true, expanded: true },
                    { type: "text", label: "请款时机", prop: "payment_request_timing", width: "110", render_simple: "name", render_header: true, expanded: true },
                    { type: "text", label: "订单号", prop: "order",render_simple:"serial", width: "80", expanded: true },
                    { type: "text", label: "备注", prop: "remark", width: "80", render_header: true, expanded: true }
                ],
                sumFunc: param => {
                    const { columns, data } = param;
                    const sums = [];
                    const fields = [
                        "rmb_amount_currency",
                        "amount_currency",
                        "official_sum_currency",
                        "service_sum_currency",
                        "sum_currency"
                    ];
                    columns.forEach((column, index) => {
                        if (index === 0) {
                            sums[index] = "总计";
                            return;
                        } else if (index === 1) {
                            sums[index] = "";
                            return;
                        }
                        if (fields.indexOf(column.property) >= 0) {
                            const values = data.map(item =>
                                Number(item[column.property].replace(",", ""))
                            );
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
            is_debit: 1,
            URL: "/fees"
        };
    },
    components: {
        RequestPayoutAdd,
        TableComponent,
        AppShrink,
        JumpSelect,
        CommonDetail,
    }
};
</script>

<style scoped>
</style>
