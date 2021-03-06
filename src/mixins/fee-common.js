import {mapGetters} from 'vuex'
import TableMixins from '@/mixins/table-mixins'

const typeMap = new Map([
  ['专利', 'patent'],
  ['商标', 'trademark'],
  ['版权', 'copyright'],
])
export default (module,mode) => ({  // module=>组件的$refs, mode=>'request' or 'pay'
  mixins: [TableMixins],
  data() {
    return {
      tableData: [],
      compileType: "add",
      isPanelVisible: false,
      title: "新增",
      row: null,
      dialogCreateNewOrder: false,
      dialogAddToOrder: false,
      bill: null,
      ids: [],
    }
  },
  computed: {
    ...mapGetters([
      "areaMap"
    ]),
    params() {
      return this.$route.meta.params;
    }
  },
  methods: {
    formatMoney(h, item, row){
      const digits = Number(item)
        .toFixed(2)
        .toString()
        .split(".");
      let number;
      let decimal;
      if (digits.length > 1) {
        number = digits[0].toString();
        decimal = digits[1];
      } else {
        number = digits.toString();
        decimal = "00";
      }
      return h('span',number.replace(/\B(?=(\d{3})+$)/g, ",") + "." + decimal);
    },
    handleRowClick(row) {
      this.compileType = "edit";
      this.row = row;
      this.title = `费用详情`;
      this.isPanelVisible = true;
    },
    handleCaseDetail(row) {
      if (row) {
        const type = typeMap.get(row.project.project_type['id']);
        this.$refs.detail.show(row.project.id, type)
      }
    },
    // 在应收/应付明细中查看账单详情
    handleInvoiceDetail(row) {
      this.$refs.invoiceDetail.show(row.invoice.id, mode, row);
    },
    createNewOrder() {   // 创建新的请/付款单
      if (this.ids.length !== 0) {
        console.log("createNewOrder", this.ids);
        this.dialogCreateNewOrder = true;
      } else {
        this.$message({type: "warning", message: "请至少选择一项！"});
      }
    },
    addToOrder() {   //将费用添加至现有的请/付款单内
      if (this.ids.length !== 0) {
        this.dialogAddToOrder = true;
      } else {
        this.$message({type: "warning", message: "请至少选择一项！"});
      }
    },
    getSelected(flag) {      // 获取选中行的id
      let _this = this;
      if (flag) {
        _this.ids = [];
        _this.$refs.table.getSelect(true).map(function (item) {
          _this.ids.push(item.id);
        });
      }
    },
    save(type) {
      this.$refs[module].save(type, this.row ? this.row.id : "");
    },
    refreshTableData(option) {
      const success = _ => {
        this.isPanelVisible = false;
        this.tableData = _.data;
      };
      const data = Object.assign({}, option, this.params);
      this.$axiosGet({
        url: this.URL,
        data: data,
        success,
      })
    },
    saveOrder(type) {
      let url = "";
      let data = "";
      let message = "";
      let dialog = "";
      if (type === "new") {
        url = "/invoices";
        data = {
          is_debit: this.is_debit,
          currency: this.currency,
          fees: this.ids
        };
        message = "创建";
        dialog = "dialogCreateNewOrder";
      } else {
        url = `/invoices/${this.bill}/fees`;
        data = {
          is_debit: this.is_debit,
          fees: this.ids
        };
        message = "添加";
        dialog = "dialogAddToOrder";
      }
      const success = _ => {
        this.$message({type: "success", message: `${message}成功!`});
        this.update();
        this.closeVisible(dialog);
      };
      const error = _ => {
        this.$message({type: "warning", message: `${_.info}`});
        this.closeVisible(dialog);
      };
      type === "new" ? this.$axiosPost({url, data, success, error}) : this.$axiosPut({
        url,
        data,
        success,
        error
      })

    },
    add() {
      this.isPanelVisible = true;
      this.title = "新增";
      this.compileType = "add";
      this.row = {};
      this.$refs[module] ? this.$refs[module].clear() : "";
    },
  },
})
