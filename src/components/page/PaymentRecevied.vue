<!-- 回款管理 -->
<template>
  <div class="PaymentRecevied">
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
        <el-button
            type="primary"
            size="small"
            v-if="compileType === 'edit'"
            @click="save('edit')"
        >保存</el-button>
        <!--<el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>-->
        <app-button-loading :func="save" v-if="compileType === 'add'" ref="loadingBtn"></app-button-loading>
      </span>
      <payment-recevied-detail
          ref="detail"
          @update="update"
          @refresh="refresh"
          :rowData="rowData"
          :is_debit="is_debit"
          @closeVisible="closeVisible('isPanelVisible')"
      ></payment-recevied-detail>
    </app-shrink>
  </div>
</template>

<script>
  import TableComponent from "@/components/common/TableComponent";
  import AppShrink from "@/components/common/AppShrink";
  import PaymentReceviedDetail from "@/components/page_extension/PaymentReceviedDetail";
  import TableMixins from "@/mixins/table-mixins";

  const URL = "/received_payments";

  export default {
    name: "PaymentRecevied",
    mixins: [TableMixins],
    data() {
      let is_debit = this.$route.meta.params.is_debit;
      let type;
      let field;
      type = is_debit === 1 ? "回款" : "付款";
      field = is_debit === 1 ? "请款" : "付款";
      let data = {
        tableData: [],
        tableOption: {
          name: "PaymentReceviedList",
          url: "/received_payments",
          height: "default",
          highlightCurrentRow: true,
          is_search: true,
          is_list_filter: true,
          list_type: "received_payments",
          treeFilter: "received_payments",
          search_placeholder: "",
          rowClick: this.handleRowClick,
          header_btn: [
            {type: "add", click: this.add},
            {type: "delete"},
            {type: "control"}
          ],
          columns: [
            {type: "selection"},
            {
              type: "text",
              label: "客户",
              prop: "user",
              min_width: "178",
              render_obj: "invoice",
              render_simple: "name",
              render_header: true
            },
            {
              type: "text",
              label: `${field}单号`,
              prop: "invoice",
              render_simple: "serial",
              min_width: "150",
              render_header: true
            },
            {
              type: "text",
              label: `${type}账户`,
              prop: "payment_account",
              min_width: "150",
              render_simple: "abbr",
              render_header: true
            },
            {
              type: "text",
              label: `${type}时间`,
              prop: "received_date",
              min_width: "120",
              render_header: true
            },
            {
              type: "text",
              label: `${type}金额`,
              prop: "amount",
              min_width: "120",
              align: "right",
              render_header: true
            },
            {type: "text", label: "备注", prop: "remark", min_width: "180", render_header: true}
          ]
        },
        isPanelVisible: false,
        title: "新增",
        compileType: "add",
        rowData: {},
        rowID: null,
        is_debit
      }
      return {
        ...data
      };
    },
    computed:{
      para:function () {
        return this.$route.meta.params
      }
    },
    methods: {
      refreshTableData(option) {
        const url = URL;
        Object.assign(option,this.para);
        const success = _ => {
          this.tableData = _.data;
        };
        this.$axiosGet({url, data: option, success});
      },
      handleRowClick(row) {
        this.openVisible("isPanelVisible");
        this.rowData = row;
        this.compileType = "edit";
        this.rowID = row.id;
        this.title = "修改";
      },
      add() {
        this.openVisible("isPanelVisible");
        this.compileType = "add";
        this.title = "新增";
        this.rowData = {};
        this.$refs.detail ? this.$refs.detail.clear() : "";
      },
      save(type) {
        this.$refs.detail.submitForm(type, this.rowID);
      }
    },
    components: {
      TableComponent,
      AppShrink,
      PaymentReceviedDetail
    }
  };
</script>

<style scoped>
</style>