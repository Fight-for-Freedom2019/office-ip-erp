<template>
    <div class="main">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <service-add :type="compileType" :data = "rowData" ref="ServiceAdd" @update="update" @refresh="refresh"></service-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import ServiceAdd from '@/components/page/setting/data/ServiceAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "Service",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/services",
                tableOption: {
                    'name': 'servicesList',
                    'url': "/services",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '服务名称、备注',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        // {type: 'text', label: 'ID', prop: 'id', width: '120'},
                        {type: 'text', label: '国家', prop: 'area', min_width: '80'},
                        {type: 'text', label: '案件类型', prop: 'project_type', min_width: '110'},
                        {type: 'text', label: '服务名称', prop: 'name', min_width: '150'},
                        {type: 'text', label: '单价', prop: 'unit_price', min_width: '100'},
                        {type: 'text', label: '触发的默认管制事项', prop: 'process_definition', render_simple: 'name', min_width: '178'},
                        {type: 'text', label: '备注', prop: 'remark', min_width: '160'},
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
                this.title = `编辑服务>${row.name}`
                
            },
            add() {
                this.rowData = {};
                this.title = "新增服务";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.ServiceAdd?this.$refs.ServiceAdd.clear():"";
            },
            save(type) {
                this.$refs.ServiceAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            ServiceAdd,
        },
    }
</script>

<style scoped>

</style>