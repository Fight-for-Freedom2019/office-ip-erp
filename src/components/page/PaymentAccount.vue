<!-- 收款账户 -->
<template>
    <div class="PaymentAccount">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <payment-account-add :type="compileType" :data = "rowData" ref="PaymentAccountAdd" @update="update" @refresh="refresh"></payment-account-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import PaymentAccountAdd from '@/components/page_extension/PaymentAccountAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "PaymentAccount",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/payment_accounts",
                tableOption: {
                    'name': 'PaymentAccountList',
                    'url': "/payment_accounts",
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
                        // {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {
                            type: 'text', label: '账户类型', prop: 'account_type', width: '178',
                            render: (h, item) => {
                                let options = config.get("account_type").options;
                                let name = "";
                                options.map(function (o) {
                                    if (o.id === item) {
                                        name = o.name;
                                    }
                                });
                                return h("span", name);
                            }
                        },
                        {type: 'text', label: '账户简称', prop: 'abbr', width: '150'},
                        {type: 'text', label: '开户行', prop: 'bank', min_width: '100'},
                        {type: 'text', label: '收款账号', prop: 'account', width: '240'},
                        {type: 'text', label: '收款人', prop: 'receipt', width: '120'},
                        {type: 'text', label: '付款信息', prop: 'payment_info', width: '160'},
                    ],
                },
                compileType: "add",
                isPanelVisible: false,
                tableData: [],
                rowID:null,
                rowData:null,
                title:"",
            }
        },
        methods: {
            refreshTableData(option) {
                const success = _ => {
                    this.compileType === "add" ? this.closeVisible("isPanelVisible") : "";
                    this.tableData = _.data;
                };
                const data = Object.assign({}, option);
                this.$axiosGet({
                    url: this.URL,
                    data: data,
                    success,
                })
            },
            handleRowClick(row) {
                this.rowData = row;
                this.rowID = row.id;
                this.openVisible("isPanelVisible");
                this.compileType = "edit";
                this.title = `收款账户>${row.abbr}`
            },
            add() {
                this.rowData = {};
                this.title = "新增收款账户";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.PaymentAccountAdd?this.$refs.PaymentAccountAdd.clear():"";
            },
            save(type) {
                this.$refs.PaymentAccountAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            PaymentAccountAdd,
        },
    }
</script>

<style scoped>

</style>