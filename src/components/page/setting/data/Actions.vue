<!-- 收款账户 -->
<template>
    <div class="FeeCode">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <fee-code-add :type="compileType" :data = "rowData" ref="FeeCodeAdd" @update="update" @refresh="refresh"></fee-code-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import FeeCodeAdd from '@/components/page/setting/data/FeeCodeAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "FeeCode",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/fee_codes",
                tableOption: {
                    'name': 'FeeCodeList',
                    'url': "/fee_codes",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '费用名称、备注',
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
                            type: 'text', label: '案件类型', prop: 'category',render_simple:'name', width: '100'
                        },
                        {type: 'text', label: '案件子类型', prop: 'subtype',render_simple:'name', width: '120'},
                        {type: 'text', label: '费用类型', prop: 'fee_type',render_simple:'name', width: '100'},
                        {type: 'text', label: '费用名称', prop: 'name', min_width: '200'},
                        {type: 'text', label: '货币', prop: 'currency', width: '80'},
                        {type: 'text', label: '金额', prop: 'amount', width: '120'},
                        {type: 'text', label: '排序', prop: 'sort', width: '100'},
                        {type: 'text', label: '状态', prop: 'status',render_simple:'name', width: '100'},
                        {type: 'text', label: '英文名', prop: 'alias', width: '100'},
                        {type: 'text', label: '备注', prop: 'remark', width: '100'},
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
                this.title = `编辑费用>${row.name}`
                
            },
            add() {
                this.rowData = {};
                this.title = "新增费用";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.FeeCodeAdd?this.$refs.FeeCodeAdd.clear():"";
            },
            save(type) {
                this.$refs.FeeCodeAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            FeeCodeAdd,
        },
    }
</script>

<style scoped>

</style>