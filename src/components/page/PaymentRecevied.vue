<!-- 回款管理 -->
<template>
    <div class="PaymentRecevied">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'edit'" @click="save('edit')">保存</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
            </span>
            <payment-recevied-detail ref="detail" @update="update" @refresh="refresh" :rowData="rowData"></payment-recevied-detail>
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
                    'url': "/received_payments",
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
                        {type: 'text', label: '客户', prop: 'invoice.customer.name', width: '178'},
                        {type: 'text', label: '请款单号', prop: 'invoice.serial', width: '150'},
                        {type: 'text', label: '回款账户', prop: 'payment_account.bank', width: '150'},
                        {type: 'text', label: '回款时间', prop: 'received_date', width: '120'},
                        {type: 'text', label: '回款金额', prop: 'amount', width: '120'},
                        {type: 'text', label: '备注', prop: 'remark', min_width: '180'},
                    ],
                },
                isPanelVisible: false,
                title: "新增",
                compileType:"add",
                rowData:{},
                rowID:null,
            }
        },
        mounted(){
            this.refreshTableData();
        },
        methods: {
            refreshTableData(option) {
                const url = URL;
                const success = _ =>{
                    this.tableData = _.data;
                };
                this.$axiosGet({url,option,success})
            },
            update(){
                this.$refs.table.update();
            },
            refresh(){
                this.$refs.table.refresh();
            },
            handleRowClick(row) {
                this.isPanelVisible = true;
                this.rowData = row;
                this.compileType = "edit";
                this.rowID = row.id;
                this.title = "修改";
            },
            add() {
                this.isPanelVisible = true;
                this.compileType = "add";
                this.title = "新增";
                this.$refs.detail?this.$refs.detail.clear():"";
            },
            save(type){
                this.$refs.detail.submitForm(type,this.rowID);
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