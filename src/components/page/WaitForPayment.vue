<!-- 待请费用 -->
<template>
    <div class="WaitForPayment">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <wait-for-payment-add ref="waitForPayment" :rowData="row" @update="update"
                                  @refresh="refresh"></wait-for-payment-add>
        </app-shrink>
        <el-dialog :visible.sync="dialogCreateNewOrder" :modal="true" width="600px" size="mini" title="将费用新建为请款单">
            <div style="margin-bottom: 10px; color: rgb(132, 146, 166); font-size: 14px;">
                <span>从选取的费用创建一个新的付款单，用于批量追踪请款费用，如果需要跨页选取费用，请在窗口左下角将分页数量调整为一个较大的值。</span>
            </div>
            <el-button type="primary" @click="saveOrder('new')">确认新建</el-button>
        </el-dialog>
        <el-dialog :visible.sync="dialogAddToOrder" :modal="true" width="600px" size="mini" title="将费用新建为请款单">
            <div style="margin-bottom: 10px; color: rgb(132, 146, 166); font-size: 14px;">
                <span>从选取的费用创建一个新的付款单，用于批量追踪请款费用，如果需要跨页选取费用，请在窗口左下角将分页数量调整为一个较大的值。</span>
            </div>
            <jump-select style="margin-bottom: 10px;" type="bill" v-model="bill"></jump-select>
            <el-button type="primary" @click="saveOrder('add')">确认添加</el-button>
        </el-dialog>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import WaitForPaymentAdd from '@/components/page_extension/WaitForPaymentAdd'
    import JumpSelect from '@/components/form/JumpSelect'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    const URL = '/fees';
    const DefaultParam = {
        is_debit: 1,
        status: 1
    };
    const API = 'Fees';

    export default {
        name: "WaitForPayment",
        data() {
            return {
                tableData: [],
                tableOption: {
                    'name': 'WaitForPaymentList',
                    'url': "/fees",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': true,
                    'list_type': 'serial',
                    'is_merge': {KEY: "user.customer.id", COL: [1, 2, 3, 4, 5]},
                    'search_placeholder': '',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {
                            type: 'dropdown', label: "请款单", click: this.getSelected, items: [
                                {text: "创建新的请款单", click: this.createNewOrder, divided: false, icon: "plus"},
                                {text: "将费用添加至现有的请款单内", click: this.addToOrder, divided: true, icon: "d-arrow-right"},
                            ]
                        },
                        {type: 'delete'},
                        {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '客户', prop: 'user.customer.name', min_width: '178'},
                        {type: 'text', label: '标题', prop: 'project.title', width: '150'},
                        {type: 'text', label: '申请号', prop: 'project.application_number', width: '150'},
                        {type: 'text', label: '申请日', prop: 'project.application_date', width: '100'},
                        {type: 'text', label: '请款单号', prop: 'invoice.serial', width: '150'},
                        {type: 'text', label: '案号', prop: 'project.serial', width: '120'},
                        {type: 'text', label: '申请国家', prop: 'project.area', width: '180'},
                        {type: 'text', label: '订单号', prop: 'order.serial', width: '120'},
                        {type: 'text', label: '费用名称', prop: 'fee_code.name', width: '160'},
                        {
                            type: 'text', label: '费用类型', prop: 'fee_code', width: '100', render: (h,item) => {
                                let name = "";
                                config.get("fee_type").options.map(function (o) {
                                    if (item && o.id === item.fee_type) {
                                        name = o.name;
                                    }
                                });
                                return h("span", name);
                            }
                        },
                        {type: 'text', label: '金额', prop: 'amount', width: '100'},
                        {type: 'text', label: '币别', prop: 'currency', width: '150'},
                        {type: 'text', label: '汇率', prop: 'roe', width: '150'},
                        {type: 'text', label: '人民币', prop: 'rmb_amount', width: '150'},
                        {type: 'text', label: '费用期限', prop: 'deadline', width: '150'},
                        {
                            type: 'text', label: '费用状态', prop: 'status', width: '150', render: (h, item) => {
                                let name = "";
                                config.get("fee_status").options.map(function (o) {
                                    if (o.id === item) {
                                        name = o.name;
                                    }
                                });
                                return h("span", name);
                            }
                        },
                        {type: 'text', label: '请款时机', prop: 'payment_request_timing', width: '150'},
                        {type: 'text', label: '请款时间', prop: 'invoice.payment_time', width: '150'},
                        {type: 'text', label: '请款单状态', prop: 'invoice.status', width: '150'},
                        {type: 'text', label: '付款时间', prop: 'invoice.payment_time', width: '150'},
                        {type: 'text', label: '备注', prop: 'remark', width: '150'},
                    ],
                },
                compileType: "add",
                isPanelVisible: false,
                title: "新增",
                row: null,
                dialogCreateNewOrder: false,
                dialogAddToOrder: false,
                bill: {},
                ids: [],
            }
        },
        methods: {
            add() {
                this.isPanelVisible = true;
                this.title = "新增";
                this.compileType = "add";
                this.$refs.waitForPayment ? this.$refs.waitForPayment.clear() : "";
            },
            handleRowClick(row) {
                this.compileType = "edit";
                this.row = row;
                this.title = `订单编号: ${row.project.serial}`;
                this.isPanelVisible = true;
            },
            refreshTableData(option) {
                const success = _ => {
                    this.isPanelVisible = false;
                    this.tableData = _.data;
                };
                const data = Object.assign({}, option, DefaultParam);
                this.$axiosGet({
                    url: URL,
                    data: data,
                    success,
                })
            },
            createNewOrder() {   // 创建新的请款单
                if (this.ids.length !== 0) {
                    console.log("createNewOrder", this.ids);
                    this.dialogCreateNewOrder = true;
                } else {
                    this.$message({type: "warning", message: "请至少选择一项！"});
                }
            },
            addToOrder() {   //将费用添加至现有的请款单内
                if (this.ids.length !== 0) {
                    this.dialogAddToOrder = true;
                } else {
                    this.$message({type: "warning", message: "请至少选择一项！"});
                }
            },
            saveOrder(type) {
                let url = "";
                let data = "";
                let message = "";
                let dialog = "";
                if (type === "new") {
                    url = "/invoices";
                    data = {
                        is_debit: 1,
                        fees: this.ids
                    };
                    message = "创建";
                    dialog = "dialogCreateNewOrder";
                } else {
                    url = `/invoices/${this.bill}/fees`;
                    data = {
                        is_debit: 1,
                        fees: this.ids
                    };
                    message = "添加";
                    dialog = "dialogAddToOrder";
                }
                const success = _ => {
                    this.$message({type: "success", message: `${message}成功!`});
                    this.closeDialog(dialog);
                };
                const error = _ => {
                    this.$message({type: "warning", message: `${_.info}`});
                    this.closeDialog(dialog);
                };
                type === "new" ? this.$axiosPost({url, data, success, error}) : this.$axiosPut({
                    url,
                    data,
                    success,
                    error
                })
            },
            closeDialog(name) {
                this[name] = false;
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
                this.$refs.waitForPayment.save(type, this.row ? this.row.id : "");
            },
            update() {
                this.$refs.table.update();
            },
            refresh() {
                this.$refs.table.refresh();
            },
        },
        mounted() {
            this.refresh();
        },
        components: {
            WaitForPaymentAdd,
            TableComponent,
            AppShrink,
            JumpSelect,
            Config
        }
    }
</script>

<style scoped>

</style>