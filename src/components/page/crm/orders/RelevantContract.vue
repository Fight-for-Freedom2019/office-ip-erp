<!-- 订单管理 相关合同 -->
<template>
  <div class="main RelevantContract">
    <table-component :tableOption="tableOption" :data="data" ref="table"></table-component>
    <!-- 新建合同 -->
    <!-- <app-shrink :visible.sync="isContractsAddPanelVisible" :modal="false" :title="`新建订单合同`"> -->
    <contract-add
      ref="contractsAdd"
      :type="`add`"
      :order="order"
      @refresh="refresh"
      @update="update"
    ></contract-add>
  </div>
</template>

<script>
import AppShrink from "@/components/common/AppShrink";
import ContractAdd from "@/components/page/crm/contracts/ContractsListAdd";
import TableComponent from "@/components/common/TableComponent";
import TableMixins from "@/mixins/table-mixins";

export default {
  name: "RelevantContract",
  mixins: [TableMixins],
  data() {
    return {
      tableData: [],
      tableOption: {
        name: "RelevantContractList",
        height: 425,
        is_search: false,
        is_pagination: false,
        rowClick: this.handleRowClick,
        header_btn: [{ type: "add", click: this.showAddContractPanel }],
        columns: [
          {
            type: "text",
            label: "客户",
            prop: "customer",
            width: "150",
            render_simple: "name"
          },
          {
            type: "text",
            label: "联系人",
            prop: "contact",
            width: "170",
            render_simple: "name"
          },
          { type: "text", label: "合同编号", prop: "serial", width: "145" },
          {
            type: "text",
            label: "合同类型",
            prop: "type",
            render_simple: "name",
            width: "145"
          },
          // {type: 'text', label: '附件', prop: 'attachments', width: '145'},
          { type: "text", label: "备注", prop: "remark" }
        ]
      },
      isContractsAddPanelVisible: false
    };
  },
  props: {
    status: {
      type: Number,
      default() {
        return 0;
      }
    },
    order: {
      type: Object,
      default() {
        return {};
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    handleRowClick(row) {
      this.$refs.contractsAdd.show(row.id, "edit", row);
    },
    showAddContractPanel() {
      console.log(
        "button order>order_detail>relevant_contract>add is clicked and the contract add panel is shown"
      );
      this.$refs.contractsAdd.show(0, "add");
    },
    saveAdd() {
      this.$refs.contractsAdd.save("add");
    },
    refresh() {
      this.$emit("refresh");
      this.isContractsAddPanelVisible = false;
    }
  },
  components: {
    AppShrink,
    ContractAdd,
    TableComponent,
    TableMixins
  }
};
</script>

<style scoped>
.update-text {
  display: inline-block;
}
</style>
<style>
#app .RelevantContract .app-upload .el-upload {
  display: inline-block;
  position: static;
}
</style>