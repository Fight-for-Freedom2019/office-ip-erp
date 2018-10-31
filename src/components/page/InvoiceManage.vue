<!-- 发票管理 -->
<template>
    <div class="InvoiceRequest">
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
            <payment-manage-msg :rowData = "row"></payment-manage-msg>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import PaymentManageMsg from '@/components/page_extension/PaymentManageMsg'

    export default {
        name: "InvoiceRequest",
        data() {
            return {
                tableData: [],
                tableOption: {
                    'name': 'InvoiceRequestList',
                    'url': "",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': true,
                    'list_type': 'serial',
                    'search_placeholder': '客户名称、联系人',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add'},
                        {type: 'delete'},
                        {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '客户', prop: 'customer.name', min_width: '178'},
                        {type: 'text', label: '案号', prop: 'invoice.serial', width: '120'},
                        {type: 'text', label: '标题', prop: 'project.title', width: '150'},
                        {type: 'text', label: '申请国家', prop: 'project.area', width: '180'},
                        {type: 'text', label: '订单号', prop: 'order.serial', width: '120'},
                        {type: 'text', label: '申请号', prop: 'application_number', width: '120'},
                        {type: 'text', label: '申请日', prop: 'application_date', width: '100'},
                        {type: 'text', label: '官费', prop: 'official_fee', width: '150'},
                        {type: 'text', label: '代理费', prop: 'service_fee', width: '150'},
                        {type: 'text', label: '费用策略', prop: 'policy', width: '150'},
                        {type: 'text', label: '票据', prop: 'voucher', width: '150'},
                    ],
                },
                isPanelVisible:false,
                title:"",
                row:null,
            }
        },
        methods: {
            handleRowClick(row){
                console.log(row);
                this.row = row;
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