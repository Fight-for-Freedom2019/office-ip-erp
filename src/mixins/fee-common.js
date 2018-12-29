import {mapGetters} from 'vuex'
import TableMixins from '@/mixins/table-mixins'

export default (module) => ({
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
        handleRowClick(row) {
            this.compileType = "edit";
            this.row = row;
            this.title = `订单编号: ${row.order?row.order.serial:""}`;
            this.isPanelVisible = true;
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
