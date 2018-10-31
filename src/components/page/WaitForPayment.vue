<!-- 待请费用 -->
<template>
    <div class="WaitForPayment">
        <table-component :tableOption="tableOption" :data="tableData" ref="table"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small">保存</el-button>
                <el-button type="danger" size="small">删除</el-button>
                <el-button type="primary" size="small">提交审核</el-button>
                <el-button type="primary" size="small">同意</el-button>
                <el-button type="" size="small">退回修改</el-button>
            </span>
            <wait-for-payment-add :rowData="row"></wait-for-payment-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import PaymentRequestDetail from '@/components/page_extension/WaitForPaymentAdd'
    import WaitForPaymentAdd from "../page_extension/WaitForPaymentAdd";

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
                /*tableData: [
                    {
                        "id": 100,
                        "amount": 233,
                        "currency": "CN",
                        "rmb_amount": 233,
                        "deadline": "2018-10-26",
                        "payment_time": null,
                        "status": "待请款",
                        "project_id": 1,
                        "policy": "代缴代垫",
                        "customer": {
                            "id": 1,
                            "name": "深圳市红坚果科技有限公司"
                        },
                        "project": {
                            "id": 1,
                            "serial": "ZQ0231",
                            "area": "CN",
                            "title": "测试案件",
                            "application_number": "20181234567890",
                            "application_date": "2018-08-17",
                            "customer": {
                                "id": 1,
                                "name": "深圳市红坚果科技有限公司"
                            }
                        },
                        "invoice": {
                            "id": 1,
                            "serial": "test",
                            "deadline": "2018-10-24 14:58:09",
                            "request_time": "2018-10-24 14:58:09",
                            "payment_time": "2018-10-24 14:58:09",
                            "remark": "测试帐单"
                        },
                        "user": null
                    },
                    {
                        "id": 99,
                        "amount": 233,
                        "currency": "CN",
                        "rmb_amount": 233,
                        "deadline": "2018-10-26",
                        "payment_time": null,
                        "status": "待请款",
                        "project_id": 1,
                        "policy": "代缴代垫",
                        "customer": {
                            "id": 1,
                            "name": "深圳市红坚果科技有限公司"
                        },
                        "project": {
                            "id": 1,
                            "serial": "ZQ0021",
                            "area": "CN",
                            "title": "测试案件",
                            "application_number": "20181234567890",
                            "application_date": "2018-08-17",
                            "customer": {
                                "id": 1,
                                "name": "深圳市红坚果科技有限公司"
                            }
                        },
                        "invoice": {
                            "id": 1,
                            "serial": "test",
                            "deadline": "2018-10-24 14:58:09",
                            "request_time": "2018-10-24 14:58:09",
                            "payment_time": "2018-10-24 14:58:09",
                            "remark": "测试帐单"
                        },
                        "user": null
                    },
                    {
                        "id": 98,
                        "amount": 233,
                        "currency": "CN",
                        "rmb_amount": 233,
                        "deadline": "2018-10-26",
                        "payment_time": null,
                        "status": "待请款",
                        "project_id": 1,
                        "policy": "代缴代垫",
                        "customer": {
                            "id": 2,
                            "name": "红坚果科技有限公司"
                        },
                        "project": {
                            "id": 1,
                            "serial": "ZQ0353",
                            "area": "CN",
                            "title": "测试案件",
                            "application_number": "20181234567890",
                            "application_date": "2018-08-17",
                            "customer": {
                                "id": 1,
                                "name": "深圳市红坚果科技有限公司"
                            }
                        },
                        "invoice": {
                            "id": 1,
                            "serial": "test",
                            "deadline": "2018-10-24 14:58:09",
                            "request_time": "2018-10-24 14:58:09",
                            "payment_time": "2018-10-24 14:58:09",
                            "remark": "测试帐单"
                        },
                        "user": null
                    },
                    {
                        "id": 97,
                        "amount": 233,
                        "currency": "CN",
                        "rmb_amount": 233,
                        "deadline": "2018-10-26",
                        "payment_time": null,
                        "status": "待请款",
                        "project_id": 1,
                        "policy": "代缴代垫",
                        "customer": {
                            "id": 3,
                            "name": "腾讯视频"
                        },
                        "project": {
                            "id": 1,
                            "serial": "ZQ0001",
                            "area": "CN",
                            "title": "测试案件",
                            "application_number": "20181234567890",
                            "application_date": "2018-08-17",
                            "customer": {
                                "id": 1,
                                "name": "深圳市红坚果科技有限公司"
                            }
                        },
                        "invoice": {
                            "id": 1,
                            "serial": "test",
                            "deadline": "2018-10-24 14:58:09",
                            "request_time": "2018-10-24 14:58:09",
                            "payment_time": "2018-10-24 14:58:09",
                            "remark": "测试帐单"
                        },
                        "user": null
                    },
                    {
                        "id": 96,
                        "amount": 233,
                        "currency": "CN",
                        "rmb_amount": 233,
                        "deadline": "2018-10-26",
                        "payment_time": null,
                        "status": "待请款",
                        "project_id": 1,
                        "policy": "代缴代垫",
                        "customer": {
                            "id": 1,
                            "name": "深圳市红坚果科技有限公司"
                        },
                        "project": {
                            "id": 1,
                            "serial": "ZQ0001",
                            "area": "CN",
                            "title": "测试案件",
                            "application_number": "20181234567890",
                            "application_date": "2018-08-17",
                            "customer": {
                                "id": 1,
                                "name": "深圳市红坚果科技有限公司"
                            }
                        },
                        "invoice": {
                            "id": 1,
                            "serial": "test",
                            "deadline": "2018-10-24 14:58:09",
                            "request_time": "2018-10-24 14:58:09",
                            "payment_time": "2018-10-24 14:58:09",
                            "remark": "测试帐单"
                        },
                        "user": null
                    },
                ],*/
                tableData:[],
                tableOption: {
                    'name': 'WaitForPaymentList',
                    'url': "/fees",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': true,
                    'list_type': 'serial',
                    'is_merge': {KEY: "customer.id", COL: [0,1,3,6,7,17]},
                    'search_placeholder': '客户名称、联系人',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '客户', prop: 'customer.name', min_width: '178'},
                        {type: 'text', label: '案号', prop: 'project.serial', width: '120'},
                        {type: 'text', label: '标题', prop: 'project.title', width: '150'},
                        {type: 'text', label: '申请国家', prop: 'project.area', width: '180'},
                        {type: 'text', label: '订单号', prop: 'order.serial', width: '120'},
                        {type: 'text', label: '申请号', prop: 'project.application_number', width: '150'},
                        {type: 'text', label: '申请日', prop: 'project.application_date', width: '100'},
                        {type: 'text', label: '费用名称', prop: 'fee_code.name', width: '100'},
                        {type: 'text', label: '费用类型', prop: 'fee_code.fee_type', width: '100'},
                        {type: 'text', label: '金额', prop: 'amount', width: '100'},
                        {type: 'text', label: '币别', prop: 'currency', width: '150'},
                        {type: 'text', label: '汇率', prop: 'roe', width: '150'},
                        {type: 'text', label: '人民币', prop: 'rmb_amount', width: '150'},
                        {type: 'text', label: '费用期限', prop: 'deadline', width: '150'},
                        {type: 'text', label: '费用状态', prop: 'status', width: '150'},
                        {type: 'text', label: '请款时机', prop: 'payment_request_timing', width: '150'},
                        {type: 'text', label: '请款单号', prop: 'invoice.serial', width: '150'},
                        {type: 'text', label: '请款时间', prop: 'invoice.request_time', width: '150'},
                        {type: 'text', label: '请款单状态', prop: 'invoice.status', width: '150'},
                        {type: 'text', label: '付款时间', prop: 'invoice.payment_time', width: '150'},
                        {type: 'text', label: '备注', prop: 'remark', width: '150'},
                    ],
                },
                isPanelVisible: false,
                title: "",
                row: null,
            }
        },
        methods: {
            add() {
                this.isPanelVisible = true;
            },
            handleRowClick(row) {
                console.log(row);
                this.row = row;
                this.title = `订单编号: ${row.serial}`;
                this.isPanelVisible = true;
            },
            refreshTableData() {
                const success = _ => {
                    this.isPanelVisible = false;
                    //this.tableData.push(_[API]['1']);
                    //console.log("费用的tableData", this.tableData);
                };
                this.$axiosGet({
                    url: URL,
                    data: DefaultParam,
                    success,
                })
            },
        },
        mounted() {
            this.refreshTableData();
        },
        components: {
            WaitForPaymentAdd,
            TableComponent,
            AppShrink,
            PaymentRequestDetail,
        }
    }
</script>

<style scoped>

</style>