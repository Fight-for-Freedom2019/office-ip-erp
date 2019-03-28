<!-- 请款管理 费用明细 -->
<template>
  <app-shrink :visible.sync="dialogVisible" :modal="false" :size="`middle`" :title="title" ref="top">
    <span slot="header" style="float: right">
      <el-button type="primary" size="small" @click="save">确定</el-button>
    </span>
    <div class="PaymentCostDetail" v-loading="loadingVisible" :element-loading-text="loadingText">
      <el-form label-width="75px" style="margin-top:10px;">
        <el-form-item label="账单" prop="invoice">
          <jump-select type="bill" :para="para" @change="loadFees" v-model="form.invoice"></jump-select>
        </el-form-item>
      </el-form>
      <table-component :tableOption="tableOption" :data="fees" ref="table"></table-component>
      <common-detail ref="project"></common-detail>
      <order-detail ref="order"></order-detail>
    </div>
  </app-shrink>
</template>


<script>
  import TableComponent from "@/components/common/TableComponent";
  import Config from "@/const/selectConfig";
  import AppShrink from "@/components/common/AppShrink";
  import JumpSelect from "@/components/form/JumpSelect";
  import OrderDetail from "@/components/page/crm/orders/OrderDetail";
  import CommonDetail from "@/components/page_extension/Common_detail";

  const config = new Map(Config);
  export default {
    name: "PaymentCostDetail",
    data() {
      return {
        tableOption: {
          name: "PaymentCostDetailList",
          url: "",
          height: "voucher_fee_select",
          highlightCurrentRow: true,
          is_search: false,
          is_pagination: false,
          search_placeholder:"输入金额、费用类型、是否已开票筛选",
          // 'rowClick': this.handleRowClick,
          header_btn: [
            // {type: 'add'},
          ],
          filterFields:[
            {field: "feecode.name", value: "代理费"},
            {field: "project.serial"},
            {field: "rmb_amount"},
            {field: "is_voucher", value: "是"},
            {field: "is_voucher", value: "否"},
          ],
          columns: [
            {type: "selection"},
            {type: "text", label: "费用名称", prop: "feecode", render_simple: 'name', width: "110"},
            {type: "text", label: "金额", prop: "rmb_amount", width: "100"},
            {
              type: "text-btn",
              label: "案号/订单号",
              prop: "project.serial",
              width: "140",
              click: this.showDetail,
              render_text_btn: row => {
                return row.order ? row.order.serial : row.project ? row.project.serial : "";
              }
            },
            {type: "text", label: "标题", prop: "project.title", min_width: "120"},
            {type: "text", label: "已开票", prop: "is_voucher", width: "80", render_text: _ => _ ? '是' : '否'},
            // {type: 'text', label: '申请国家', prop: 'area', width: '180'},
            // { type: "text", label: "申请号", prop: "application_number", width: "120" },
            // { type: "text", label: "申请日", prop: "application_date", width: "100" }
          ]
        },
        loadingVisible: false,
        dialogVisible: false,
        loadingText: "费用清单加载中...",
        title: "账单费用选择器",
        fees: [],
        fees_copy: [],
        para: '',
        form: {
          invoice: ''
        },
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
    created() {
    },
    methods: {
      refreshTableData(option) {
      },
      showDetail(row) {
        if (row.order) {
          this.$refs.order.show(row.order.id, 'edit');
        } else {
          switch (row.project.project_type.id) {
            case '专利':
              this.$refs.project.show(row.project.id, 'patent');
              break;
            case '商标':
              this.$refs.project.show(row.project.id, 'trademark');
              break;
            case '版权':
              this.$refs.project.show(row.project.id, 'copyright');
              break;
          }
        }
      },
      save() {
        let selected = this.$refs.table.getSelection();
        const l = selected.length;
        if (l == 0) {
          this.$message({message: "请选择至少一笔费用", type: "warning"});
          return;
        }
        selected = selected.filter(_ => {
          return !_.is_voucher;
        })
        const nl = selected.length;
        if (l != nl) {
          this.$message({message: "请不要选择已经开过发票的费用", type: "warning"});
          return;
        }
        this.$emit("onFeesSelected", selected);
        this.dialogVisible = false;
      },
      show(customer) {
        this.dialogVisible = true;
        this.loadingVisible = false;
        this.para = {customer}
      },
      loadFees() {
        if (this.form.invoice - 0 > 0) {
          this.loadingVisible = true;
          let url = `/invoices/${this.form.invoice}`;
          let success = _ => {
            this.fees = _.data.fee_list;
            this.fees_copy = this.$tool.deepCopy(this.fees);
            this.loadingVisible = false;
          };
          this.$axiosGet({url, success});
        }
      },
    },
    components: {
      TableComponent,
      AppShrink,
      JumpSelect,
      OrderDetail,
      CommonDetail,
    }
  };
</script>

<style scoped>
</style>