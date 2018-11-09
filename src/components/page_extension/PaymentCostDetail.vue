<!-- 请款管理 费用明细 -->
<template>
    <div class="PaymentCostDetail">
        <table-component :tableOption="tableOption" :data="data" @getRowData="getRowData"></table-component>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" :modal="false">
            <table-component :tableOption="feeDetailOption" :data="feesDetail"></table-component>
        </el-dialog>
    </div>


</template>


<script>
    import TableComponent from '@/components/common/TableComponent'
    import Config from '@/const/selectConfig'

    const config = new Map(Config);
    export default {
        name: "PaymentCostDetail",
        data() {
            return {
                tableOption: {
                    'name': 'PaymentCostDetailList',
                    'url': "",
                    'height': 396,
                    'highlightCurrentRow': true,
                    'is_search': false,
                    // 'rowClick': this.handleRowClick,
                    'header_btn': [
                        // {type: 'add'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '客户', prop: 'customer.name', min_width: '178'},
                        {type: 'text', label: '案号', prop: 'serial', width: '120'},
                        {type: 'text', label: '标题', prop: 'title', width: '150'},
                        {type: 'text', label: '申请国家', prop: 'area', width: '180'},
                        {type: 'text', label: '订单号', prop: 'order.serial', width: '120'},
                        {type: 'text', label: '申请号', prop: 'application_number', width: '120'},
                        {type: 'text', label: '申请日', prop: 'application_date', width: '100'},
                        {
                            type: 'text-btn',
                            label: '官费',
                            prop: 'officail_fee.sum',
                            width: '150',
                            click: this.checkFeeDetail,
                            render_text_btn: (row) => {
                                return row.officail_fee.sum;
                            }
                        },
                        {
                            type: 'text-btn',
                            label: '代理费',
                            prop: 'service_fee.sum',
                            width: '150',
                            click: this.checkFeeDetail,
                            render_text_btn: (row) => {
                                return row.service_fee.sum;
                            }
                        },
                        {type: 'text', label: '费用策略', prop: 'policy', width: '150'},
                        {type: 'text', label: '官费票据', prop: 'official_voucher', width: '150'},
                        {type: 'text', label: '代理费票据', prop: 'serfice_voucher', width: '150'},
                    ],
                },
                feeDetailOption: {
                    'name': 'feeDetailList',
                    'url': "",
                    'height': 396,
                    'highlightCurrentRow': true,
                    'is_search': false,
                    'is_footer': true,
                    // 'rowClick': this.handleRowClick,
                    'header_btn': [
                        // {type: 'add'},
                    ],
                    'columns': [
                        // {type: 'selection'},
                        {type: 'text', label: '费用名称', prop: 'feecode.name', min_width: '178'},
                        {
                            type: 'text',
                            label: '费用类型',
                            prop: 'feecode.fee_type',
                            width: '120',
                            render_text: (item, row) => {
                                let name;
                                config.get("fee_type").options.map(function (o) {
                                    if (o.id === row.feecode.fee_type) {
                                        name = o.name;
                                    }
                                });
                                return name;
                            }
                        },
                        {type: 'text', label: '金额', prop: 'amount', width: '150'},
                        {type: 'text', label: '币别', prop: 'currency', width: '180'},
                        {type: 'text', label: '汇率', prop: 'roe', width: '120'},
                        {type: 'text', label: '人民币', prop: 'rmb_amount', width: '120'},
                        {
                            type: 'text', label: '费用状态', prop: 'status', width: '100', render_text: (item) => {
                                let name;
                                config.get("fee_status").options.map(function (o) {
                                    if (o.id === item) {
                                        name = o.name;
                                    }
                                });
                                return name;
                            }
                        },
                        {type: 'text', label: '备注', prop: 'remark', width: '150'},
                    ],
                },
                tableData: [],
                feesDetail: [],
                title: "官费明细",   // 弹窗title
                dialogFormVisible: false,
            }
        },
        props: {
            type: {
                type: String,
                default() {
                    return ""
                }
            },
            data: Array,
        },
        created() {
            if (!this.type) {
                Array.shift(this.tableOption.columns);
            } else {
                this.tableOption.is_pagination = false;
                this.tableOption.is_footer = true;
                this.tableOption.footer_btn = [
                    {
                        type: "verify"
                    }
                ]
            }
        },
        methods: {
            refreshTableData(option) {
            },
            checkFeeDetail(row, e, col) {
                this.dialogFormVisible = true;
                col.label === "官费" ? this.title = "官费明细" : this.title = "代理费明细";
                if (col.label === "官费") {
                    this.feesDetail = row.officail_fee.list;
                } else {
                    this.feesDetail = row.service_fee.list;
                }
            },
            getRowData(data) {
                this.$emit("getRowData", data);
            },
        },
        components: {
            TableComponent,
        }
    }
</script>

<style scoped>

</style>