<!-- 发票管理 -->
<template>
    <div class="InvoiceRequest">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" v-if="compileType === 'add'" size="small"
                           @click="save('add')">申请开具</el-button>
                <el-button type="primary" v-if="compileType === 'edit'" size="small"
                           @click="save('edit')">保存</el-button>
            </span>
            <invoice-manage-detail ref="detail" @update="update" @refresh="refresh" :rowData="rowData" :compileType="compileType"></invoice-manage-detail>
            <!-- 这里需要props是因为要修改表单内容 -->
        </app-shrink>
        <el-dialog title="发票明细" :visible.sync="dialogFormVisible" :modal="false">
            <table-component :tableOption="feeDetailOption" :data="feesDetail"></table-component>
        </el-dialog>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import InvoiceManageDetail from '@/components/page_extension/InvoiceManageDetail'
    import TableMixins from '@/mixins/table-mixins'

    const URL = '/vouchers';
    export default {
        name: "InvoiceManage",
        mixins:[TableMixins],
        data() {
            return {
                tableData: [],
                tableOption: {
                    'name': 'InvoiceRequestList',
                    'url': URL,
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': true,
                    'list_type': 'invoice_request',
                    'treeFilter': 'invoice_request',
                    'search_placeholder': '',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '客户', prop: 'customer', width: '178',render_simple:"name",render_header:true},
                        {type: 'text', label: '账单编号', prop: 'invoice',render_simple:"serial", width: '180',render_header:true},
                        {type: 'text', label: '开票主体', prop: 'invoice_target',render_simple:"name", min_width: '260',render_header:true},
                        {type: 'text-btn', label: '金额', prop: 'amount', width: '180', click: this.checkFeeDetail,render_header:true},
                        {type: 'text', label: '申请国家', prop: 'status', width: '120',render_header:true},
                        {type: 'text', label: '备注', prop: 'remark', width: '320',render_header:true},
                        // {type: 'text', label: '扫描件', prop: 'is_scanning_copy', width: '100'},
                        {type: 'text', label: '扫描件', prop: 'scanning_copy', width: '150',render_header:true},
                        // {type: 'text', label: '发票明细', prop: 'service_fee', width: '150'},
                    ],
                },
                feeDetailOption: {
                    'name': 'feeDetailList',
                    'url': "",
                    'height': 387,
                    'highlightCurrentRow': true,
                    'is_search': false,
                    // 'rowClick': this.handleRowClick,
                    'header_btn': [
                        // {type: 'add'},
                    ],
                    'columns': [
                        // {type: 'selection'},
                        {type: 'text', label: '案号/订单号', prop: 'fee_code.name', min_width: '150'},
                        {type: 'text', label: '案件名称', prop: 'fee_code.fee_type', width: '130'},
                        {type: 'text', label: '官费', prop: 'amount', width: '130'},
                        {type: 'text', label: '代理费', prop: 'currency', width: '130'},
                        {type: 'text', label: '小计', prop: 'roe', width: '130'},
                    ],
                },
                feesDetail: [],  //费用明细
                isPanelVisible: false,
                dialogFormVisible: false,
                title: "开票申请",
                compileType: "add",
                rowData: {},
                rowID: {},
            }
        },
        methods: {
            handleRowClick(row) {
                this.rowData = row;
                this.rowID = row.id;
                this.title = "发票编辑";
                this.openVisible("isPanelVisible");
                this.compileType = "edit";
            },
            refreshTableData(data) {
                const url = URL;
                const success = _ => {
                    this.tableData = _.data;
                    this.closeVisible("isPanelVisible");
                };
                this.$axiosGet({url, data, success})
            },
            add() {
                this.rowData = {};
                this.openVisible("isPanelVisible");
                this.compileType = "add";
                this.title = "开票申请";
                this.$refs.detail?this.$refs.detail.clear():"";
            },
            save(type) {
                this.compileType = type;
                this.$refs.detail.submitForm(type, this.rowID);
            },
            checkFeeDetail(row, e, col) {
                this.openVisible("dialogFormVisible");
                this.feesDetail = row.detail ? row.detail : [];
            },
        },
        components: {
            TableComponent,
            AppShrink,
            InvoiceManageDetail,
        }
    }
</script>

<style scoped>

</style>