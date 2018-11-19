<!-- 开票信息 -->
<template>
    <div class="ExpressManage">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <billing-info-add :type="compileType" :data = "rowData" ref="BillInfoAdd" @update="update" @refresh="refresh"></billing-info-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import BillingInfoAdd from '@/components/page_extension/BillingInfoAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);
    export default {
        name: "BillingInfo",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/invoice_targets",
                tableOption: {
                    'name': 'BillingInfoList',
                    'url': "/invoice_targets",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': true,
                    'list_type': 'invoice_targets',
                    'treeFilter':'invoice_targets',
                    'search_placeholder': '',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '客户', prop: 'customer', width: '178',render_simple:"name",render_header:true},
                        {
                            type: 'text', label: '主体类型', prop: 'target_type', width: '150',
                            render: (h, item) => {
                                let options = config.get("target_type").options;
                                let name = "";
                                options.map(function (o) {
                                    if (o.id === item) {
                                        name = o.name;
                                    }
                                });
                                return h("span", name);
                            },
                            render_header:true
                        },
                        {type: 'text', label: '单位名称', prop: 'name', width: '150',render_header:true},
                        {type: 'text', label: '纳税人识别号', prop: 'identity', min_width: '140',render_header:true},
                        {type: 'text', label: '注册地址', prop: 'address', width: '240',render_header:true},
                        {type: 'text', label: '联系电话', prop: 'phone_number', width: '120',render_header:true},
                        {type: 'text', label: '开户行', prop: 'bank', width: '160',render_header:true},
                        {type: 'text', label: '银行账户', prop: 'account', width: '200',render_header:true},
                        {type: 'text', label: '备注', prop: 'remark', width: '220',render_header:true},
                    ],
                },
                tableData: [],
                isPanelVisible: false,
                title: "",
                compileType: "add",
                rowData:null,
                rowID:null,
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
                this.title = `开票信息>${row.customer.name}`
            },
            add() {
                this.title = "开票信息>";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.rowData = {
                    customer:"",
                    target_type:"",
                    name:"",
                    identity:"",
                    address:"",
                    phone_number:"",
                    bank:"",
                    account:"",
                    remark:"",
                }
            },
            save(type) {
                this.$refs.BillInfoAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            BillingInfoAdd
        }
    }
</script>

<style scoped>

</style>