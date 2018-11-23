<!-- 报价 -->
<template>
    <div class="Quotation">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <quotation-add :type="compileType" :data = "rowData" ref="QuotationAdd" @update="update" @refresh="refresh"></quotation-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import QuotationAdd from '@/components/page/crm/data/QuotationAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "Quotation",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/quotations",
                tableOption: {
                    'name': 'QuotationList',
                    'url': "/quotations",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '报价名称',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '报价对象', prop: 'user',render_simple:'name', min_width: '120'},
                        {type: 'text', label: '服务项目', prop: 'service',render_simple:'name', min_width: '100'},
                        {type: 'text', label: '报价', prop: 'price', min_width: '120'},
                        {type: 'text', label: '备注', prop: 'remark', min_width: '120'},
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
                this.title = `编辑报价>${row.name}`
            },
            add() {
                this.rowData = {};
                this.title = "新增报价";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.QuotationAdd?this.$refs.QuotationAdd.clear():"";
            },
            save(type) {
                this.$refs.QuotationAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            QuotationAdd,
        },
    }
</script>

<style scoped>

</style>