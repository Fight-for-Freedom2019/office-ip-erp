<template>
  <div class="main">
    <!-- <div class="total" style="margin: 0px 5px 15px 5px;font-size: 16px;">
      <el-tag>总收入：{{ income }}CNY</el-tag>
      <el-tag>总支出：{{ expend }}CNY</el-tag>
    </div>-->
    <app-collapse :col-title="`收入(总计：${detailRevenue.sum?detailRevenue.sum:'0'}CNY)`">
      <app-table
        :columns="columns"
        :data="detailRevenue.list?detailRevenue.list : []"
        :height="220"
      ></app-table>
    </app-collapse>

    <app-collapse :col-title="`支出(总计：${detailCost.sum?detailCost.sum:'0'}CNY)`">
      <app-table
        :columns="columns"
        :data="detailCost.list ? detailCost.list : []"
        :height="220"
      ></app-table>
    </app-collapse>
    <!-- 
    <app-collapse :col-title="`发明人奖励(总计：${detailInventorBonus.sum?detailInventorBonus.sum:'0'}CNY)`">
      <app-table :columns="columns" :data="detailInventorBonus.list ? detailInventorBonus.list : []"></app-table>
    </app-collapse>-->
    <!-- <app-collapse :col-title="`政府资助及专利奖(总计：${detailFundings.sum?detailFundings.sum:'0'}CNY)`">
      <app-table :columns="columns" :data="detailFundings.list ? detailFundings.list : []"></app-table>
    </app-collapse>-->
    <app-collapse :col-title="`监控中的年费(总计：${detailRenewal.sum?detailRenewal.sum:'0'}CNY)`">
      <app-table
        :columns="columns"
        :data="detailRenewal.list ? detailRenewal.list : []"
        max-height="160"
      ></app-table>
    </app-collapse>
    <app-shrink :visible.sync="visible" title="费用编辑">
      <span slot="header" style="float: right;">
        <el-button type="primary" size="small" @click="save('edit')">保存</el-button>
      </span>
      <fee :row-data="currentRowFee" ref="fee"></fee>
    </app-shrink>
    <renewal-fee @refresh="refresh"></renewal-fee>
  </div>
</template>

<script>
import AppTable from "@/components/common/AppTable";
import AppCollapse from "@/components/common/AppCollapse";
import AppShrink from "@/components/common/AppShrink";
import Fee from "@/components/page_extension/RequestPayoutAdd";
import RenewalFee from "@/components/page_extension/RenewalFee_pop";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "commonDetailFee",
  data() {
    return {
      visible: false,
      currentRowFee: {},
      columns: [
        { type: "text", label: "费用名称", prop: "name", min_width: "145" },
        { type: 'text', label: '费用对象', prop: 'user', render_simple: 'name', width: '120'},
        {
          type: "text",
          label: "金额",
          prop: "amount",
          width: "100",
          render: (h, item, row) => {
            if (row.roe == 1) {
              return h("span", "N/A");
            } else {
              return h("span", `${item}${row.currency}`);
            }
          }
        },
        {
          type: "text",
          label: "汇率",
          prop: "roe",
          width: "70",
          render: (h, item) => {
            if (item == 1) {
              return h("span", "N/A");
            } else {
              return h("span", item);
            }
          }
        },
        {
          type: "text",
          label: "人民币",
          prop: "rmb_amount",
          width: "120",
          render: (h, item) => {
            return h("span", `${item}CNY`);
          }
        },
        { type: "text", label: "付款日期", prop: "payment_time", width: "120" },
        { type: "text", label: "法限", prop: "deadline", width: "120" },
        {
          type: "text",
          label: "状态",
          prop: "status",
          render_simple: "name",
          width: "90"
        },
        { type: "text", label: "备注", prop: "remark", min_width: "90" },
        {
          type: "action",
          label: "操作",
          width: "110",
          // fixed: false,
          btns: [
            { type: "edit", click: this.editFee },
            { type: "delete", click: this.deleteFee }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["detailRevenue", "detailCost", "detailRenewal"]),
    expend() {
      return this.detailCost ? this.detailCost.sum : "0";
    },
    income() {
      return this.detailRevenue ? this.detailRevenue.sum : "0";
    }
    /*  	tableData () {
  		return this.$store.getters.detailFees;
  	}*/
  },
  methods: {
    ...mapActions(["refreshDetailData"]),
    editFee({ id, is_renewal }) {
      this.visible = true;
      const url = is_renewal ? `/renewal_fees/${id}` : `/fees/${id}`;
      const success = _ => {
        this.currentRowFee = _.data;
      };
      this.$axiosGet({ url, success });
    },
    save(type) {
      const id = this.currentRowFee.id;
      this.$refs.fee.save(type, id);
      this.$nextTick(_ => {
        this.refresh();
        this.visible = false;
      });
    },
    refresh() {
      this.refreshDetailData();
    },
    deleteFee({ id, name, is_renewal }) {
      const url = is_renewal ? `/renewal_fees` : `/fees`;
      const data = { id };
      const success = _ => {
        this.$message({ message: `删除${name}成功！`, type: "success" });
        this.refresh();
      };

      this.$confirm(`删除后不可恢复，确认删除用户‘${name}’？`, "删除确认", {
        type: "warning"
      })
        .then(_ => {
          this.$axiosDelete({ url, data, success });
        })
        .catch(_ => {});
    }
  },
  components: {
    AppCollapse,
    AppTable,
    Fee,
    RenewalFee,
    AppShrink
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>