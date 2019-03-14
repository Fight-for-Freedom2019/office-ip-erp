<!-- 发票管理 -->
<template>
    <div class="InvoiceRequest">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <invoice-manage-detail ref="detail" @update="update" @refresh="refresh"></invoice-manage-detail>
    </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import InvoiceManageDetail from '@/components/page_extension/InvoiceManageDetail'
import TableMixins from '@/mixins/table-mixins'

const URL = '/vouchers';
export default {
    name: "InvoiceManage",
    mixins: [TableMixins],
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
                    { type: 'add', click: this.add },
                    { type: 'delete' },
                    // {type: 'export'},
                    { type: 'control' },
                ],
                'columns': [
                    { type: 'selection' },
                    { type: 'text', label: '发票号', prop: 'serial', width: '120', render_header: true },
                    { type: 'text', label: '客户/供应商', prop: 'customer', width: '150', render_simple: "name", render_header: true },
                    // { type: 'text', label: '关联账单', prop: 'invoice', render_simple: "serial", width: '120', render_header: true },
                    // {type: 'text', label: '税务票号', prop: 'tax_no', min_width: '120',render_header:true},
                    { type: 'text', label: '发票类型', prop: 'voucher_type', render_simple: 'name', min_width: '120', render_header: true },
                    { type: 'text', label: '发票抬头', prop: 'invoice_target', render_simple: "name", min_width: '150', render_header: true },
                    { type: 'text-btn', label: '金额', prop: 'amount', width: '100', render_header: true },
                    { type: 'text', label: '状态', prop: 'status', render_simple: "name", min_width: '120', render_header: true },
                    // {type: 'text', label: '申请国家', prop: 'status', width: '120',render_header:true},
                    // {type: 'text', label: '扫描件', prop: 'is_scanning_copy', width: '100'},
                    // {type: 'text', label: '扫描件', prop: 'scanning_copy', width: '150',render_header:true},
                    { type: 'text', label: '备注', prop: 'remark', width: '120', render_header: true },
                    // {type: 'text', label: '发票明细', prop: 'service_fee', width: '150'},
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
    computed: {
        defaultParams() {
            const params = this.$route.meta.params;
            return params ? params : {};
        },
        urlParams() {
            return this.$route.query;
        },
    },
    methods: {
        handleRowClick(row) {
            this.rowData = row;
            this.rowID = row.id;
            this.$refs.detail.show(row.id, 'edit', row)
        },
        refreshTableData(option) {
            const data = Object.assign({}, option, this.urlParams, this.defaultParams);
            const url = URL;
            const success = _ => {
                this.tableData = _.data;
                this.closeVisible("isPanelVisible");
            };
            this.$axiosGet({ url, data, success })
        },
        add() {
            this.rowData = {};
            this.openVisible("isPanelVisible");
            this.compileType = "add";
            this.title = "开票申请";
            this.$refs.detail.show(0, 'add')
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
        InvoiceManageDetail,
    }
}
</script>

<style scoped>

</style>