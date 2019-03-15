<template>
  <div class="main">
    <!-- <div class="total" style="margin: 0px 5px 15px 5px;font-size: 16px;">
      <el-tag>总收入：{{ income }}CNY</el-tag>
      <el-tag>总支出：{{ expend }}CNY</el-tag>
    </div>-->
    <template>
      <el-dropdown style="margin-bottom: 10px;" trigger="click" @command="handleCommand">
        <el-button class="table-header-btn" size="small" type="primary">
          新建费用
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="fee_in">应收</el-dropdown-item>
          <el-dropdown-item command="fee_out">应付</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="收入" name="first">
          <app-table :columns="columns" :data="detailRevenue.list?detailRevenue.list : []"></app-table>
        </el-tab-pane>
        <el-tab-pane label="支出" name="second">
          <app-table :columns="columns" :data="detailCost.list ? detailCost.list : []"></app-table>
        </el-tab-pane>
        <el-tab-pane label="年费监控" name="third">
          <app-table :columns="columns" :data="detailRenewal.list ? detailRenewal.list : []"></app-table>
        </el-tab-pane>
      </el-tabs>
    </template>
    <!-- 
    <app-collapse :col-title="`发明人奖励(总计：${detailInventorBonus.sum?detailInventorBonus.sum:'0'}CNY)`">
      <app-table :columns="columns" :data="detailInventorBonus.list ? detailInventorBonus.list : []"></app-table>
    </app-collapse>-->
    <!-- <app-collapse :col-title="`政府资助及专利奖(总计：${detailFundings.sum?detailFundings.sum:'0'}CNY)`">
      <app-table :columns="columns" :data="detailFundings.list ? detailFundings.list : []"></app-table>
    </app-collapse>-->
    <app-shrink :visible.sync="visible" :title="`${pageType == 'add'?'新建':'编辑'}费用`">
      <span slot="header" style="float: right;">
        <el-button type="primary" size="small" v-if="pageType == 'edit'" @click="save('edit')">保存</el-button>
        <el-button type="primary" size="small" v-else @click="save('add')">新建</el-button>
      </span>
      <fee
        :row-data="currentRowFee"
        :fee_type="feeType"
        :is_debit="isDebit"
        :page-type="pageType"
        ref="fee"
        :global="global"
        @update="handleRrefresh"
        @refresh="handleRrefresh"
      ></fee>
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
      feeType: "",
      pageType: "",
      currentRowFee: {},
      columns: [
        {
          type: "text",
          label: "费用名称",
          prop: "name",
          min_width: "110"
        },
        {
          type: "text",
          label: "费用对象",
          prop: "user",
          render_simple: "name",
          width: "110"
        },
        {
          type: "text",
          label: "金额",
          prop: "amount",
          width: "120",
          render: (h, item, row) => {
            return h("span", `${item}${row.currency}`);
          }
        },
        {
          type: "text",
          label: "汇率",
          prop: "roe",
          width: "70"
        },
        {
          type: "text",
          label: "人民币",
          prop: "rmb_amount",
          width: "100"
        },
        // { type: "text", label: "付款日期", prop: "payment_time", width: "100" },
        {
          type: "text",
          label: "状态",
          prop: "status",
          render_simple: "name",
          width: "90"
        },
        { type: "text", label: "官方绝限", prop: "deadline", width: "100" },
        { type: "text", label: "备注", prop: "remark", width: "90" },
        {
          type: "action",
          label: "操作",
          width: "90",
          // fixed: false,
          btns: [
            { type: "edit", click: this.editFee },
            { type: "delete", click: this.deleteFee }
          ]
        }
      ],
      activeName: "first",
      global:true,  // 是否取全局的detailId或detail_customer
    };
  },
  computed: {
    ...mapGetters(["detailRevenue", "detailCost", "detailRenewal"]),
    expend() {
      return this.detailCost ? this.detailCost.sum : "0";
    },
    income() {
      return this.detailRevenue ? this.detailRevenue.sum : "0";
    },
    isDebit() {
      return this.feeType == 'pay'? 0 : 1 
    }, 
  },
  methods: {
    ...mapActions(["refreshDetailData"]),
    handleCommand(command) {
      this.visible = true;
      this.$nextTick(() => {
        this.pageType = "add";
      });
      if (command == "fee_in") {
        this.feeType = "fee";
      } else if (command == "fee_out") {
        this.feeType = "pay";
      }
    },
    editFee({ id, is_renewal }) {
      this.visible = true;
      this.pageType = "edit";
      const url = is_renewal ? `/renewal_fees/${id}` : `/fees/${id}`;
      const success = _ => {
        this.currentRowFee = _.data;
      };
      this.$axiosGet({ url, success });
    },
    handleRrefresh() {
      this.refresh();
      this.visible = false;
    },
    save(type) {
      if (this.pageType == "add") {
        this.$refs.fee.save("add");
      } else {
        const id = this.currentRowFee.id;
        this.$refs.fee.save(type, id);
      }
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
  watch: {
    pageType(val) {
      if (val == "add" && this.feeType) {
        this.$refs.fee.clear();
      }
    },
    feeType(val) {
      this.$nextTick(() => {
        this.$refs.fee.clear();
      });
    },
    activeName(val) {
      if(val === "first") {
        this.feeType = "fee";
      }else if(val === "second"){
        this.feeType = "pay";
      }
    },
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