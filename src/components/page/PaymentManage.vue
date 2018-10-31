<!-- 请款管理 -->
<template>
    <div class="PaymentManage">
        <table-component :tableOption="tableOption" :data="tableData" ref="table"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small">保存</el-button>
                <el-button type="danger" size="small">删除</el-button>
                <el-button type="primary" size="small" v-if="bill_status === 'audit'">提交审核</el-button>
                <el-button type="primary" size="small" v-if="bill_status === 'remind'">邮件提醒</el-button>
                <!--<el-button type="" size="small">退回修改</el-button>-->
            </span>
            <payment-manage-msg :rowData = "row"></payment-manage-msg>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import PaymentManageMsg from '@/components/page_extension/PaymentManageMsg'

    export default {
        name: "PaymentManage",
        data() {
            return {
                tableData: [
                    {
                        serial: "B18001",
                        creator_user: {
                            name: "lx",
                            id:1
                        },
                        creation_time: "2018-10-29",
                        user: {
                            name: "lx"
                        },
                        amount: "20",
                        currency: "￥",
                        roe: "0.82",
                        rmb_amount: "2000",
                        request_time: "2018-11-03",
                        deadline: "2018-11-20",
                        payment_time: "2018-12-20",
                        received_amount: "6000",
                        confirmation_user: {
                            name: "hongjianguo"
                        },
                        confirmation_time: "2018-12-01",
                        status: 1,  // 1表示待审核
                        is_voucher_uploaded: "是",
                        express: {
                            serial: "156478653213415",
                            date: "2018-11-01",
                        },
                        remark: "已备注",
                    },
                    {
                        serial: "C19021",
                        creator_user: {
                            id:2,
                            name: "hongjianguo"
                        },
                        creation_time: "2018-10-29",
                        user: {
                            name: "hongjianguo"
                        },
                        amount: "20000",
                        currency: "$",
                        roe: "0.63",
                        rmb_amount: "5000",
                        request_time: "2018-11-03",
                        deadline: "2018-11-20",
                        payment_time: "2018-12-20",
                        received_amount: "6000",
                        confirmation_user: {
                            name: "hongjianguo"
                        },
                        confirmation_time: "2018-12-01",
                        status: 2,  //2 表示待回款
                        is_voucher_uploaded: "是",
                        express: {
                            serial: "156478653213415",
                            date: "2018-11-01",
                        },
                        remark: "已备注",
                    }
                ],
                bill_status:"add",
                tableOption: {
                    'name': 'PaymentManageList',
                    'url': "",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': true,
                    'list_type': 'serial',
                    'search_placeholder': '客户名称、联系人',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'export'},
                        {type: 'delete'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '请款单号', prop: 'serial', min_width: '178'},
                        {type: 'text', label: '创建人', prop: 'creator_user.name', width: '120'},
                        {type: 'text', label: '创建时间', prop: 'creation_time', width: '150'},
                        {type: 'text', label: '请款对象', prop: 'user.name', width: '180'},
                        {type: 'text', label: '金额', prop: 'amount', width: '120'},
                        {type: 'text', label: '币别', prop: 'currency', width: '120'},
                        {type: 'text', label: '汇率', prop: 'roe', width: '100'},
                        {type: 'text', label: '人民币', prop: 'rmb_amount', width: '150'},
                        {type: 'text', label: '请款时间', prop: 'request_time', width: '150'},
                        {type: 'text', label: '回款期限', prop: 'deadline', width: '150'},
                        {type: 'text', label: '回款时间', prop: 'payment_time', width: '150'},
                        {type: 'text', label: '回款金额', prop: 'received_amount', width: '150'},
                        {type: 'text', label: '回款确认用户', prop: 'confirmation_user.name', width: '150'},
                        {type: 'text', label: '回款确认时间', prop: 'confirmation_time', width: '150'},
                        {type: 'text', label: '请款单状态', prop: 'status', width: '150'},
                        {type: 'text', label: '票据已上传', prop: 'is_voucher_uploaded', width: '150'},
                        {type: 'text', label: '快递单号', prop: 'express.serial', width: '150'},
                        {type: 'text', label: '寄件时间', prop: 'express.date', width: '150'},
                        {type: 'text', label: '备注', prop: 'remark', width: '150'},
                    ],
                },
                isPanelVisible:false,
                title:"订单编号:B18001",
                row:null,
            }
        },
        methods: {
            handleRowClick(row){
                console.log(row);
                this.row = row;
                if(row.status === 1){
                    this.bill_status = 'audit';
                }else if(row.status === 2){
                    this.bill_status = 'remind';
                }else {
                    this.bill_status = 'add';
                }
                this.title = `订单编号: ${row.serial}`;
                this.isPanelVisible = true;
            },
            refreshTableData() {
            },
        },
        components: {
            TableComponent,
            AppShrink,
            PaymentManageMsg,
        }
    }
</script>

<style scoped>

</style>