<!-- 回款管理 -->
<template>
    <div class="PaymentRecevied">
        <table-component :tableOption="tableOption" :data="tableData" ref="table"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" @click="save">保存</el-button>
                <el-button type="danger" size="small">删除</el-button>
            </span>
            <payment-recevied-detail ref="detail" :rowData="row"></payment-recevied-detail>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import PaymentReceviedDetail from '@/components/page_extension/PaymentReceviedDetail'

    const URL = '/received_payments'

    export default {
        name: "PaymentRecevied",
        data() {
            return {
                tableData: [],
                tableOption: {
                    'name': 'PaymentReceviedList',
                    'url': "",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': true,
                    'list_type': 'serial',
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
                        {type: 'text', label: '客户', prop: 'customer.name', width: '178'},
                        {type: 'text', label: '请款单号', prop: 'invoice.serial', width: '150'},
                        {type: 'text', label: '回款账户', prop: 'payment_account.name', width: '150'},
                        {type: 'text', label: '回款时间', prop: 'received_date', width: '120'},
                        {type: 'text', label: '回款金额', prop: 'amount', width: '120'},
                        {type: 'text', label: '备注', prop: 'remark', min_width: '180'},
                    ],
                },
                isPanelVisible: false,
                title: "新增",
                row:{
                    invoices:{
                        name:'测试',
                        id:1
                    }
                },
            }
        },
        mounted(){
            this.refreshTableData();
        },
        methods: {
            refreshTableData(option) {
                const url = URL;
                const success = _ =>{
                    console.log(_);
                }
                this.$axiosGet({url,option,success})
            },
            handleRowClick(row) {

            },
            add() {
                this.isPanelVisible = true;
            },
            save(){
                this.$refs.detail.submitForm();
            },
        },
        components: {
            TableComponent,
            AppShrink,
            PaymentReceviedDetail,
        }
    }
</script>

<style scoped>

</style>