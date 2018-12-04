<!-- 收款账户 -->
<template>
    <div class="Definition">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <definition-add :type="compileType" :data = "rowData" ref="DefinitionAdd" @update="update" @refresh="refresh"></definition-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import DefinitionAdd from '@/components/page/setting/flow/DefinitionAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "Definition",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/definitions",
                tableOption: {
                    'name': 'DefinitionList',
                    'url': "/definitions",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '管制事项名称、备注',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '案件类型', prop: 'project_type', width: '120'},
                        {type: 'text', label: '管制事项名称', prop: 'name', min_width: '120'},
                        {type: 'text', label: '管制事项描述', prop: 'description', min_width: '120'},
                        {type: 'text', label: '默认期限', prop: 'default_period', min_width: '120'},
                        {type: 'text', label: '法限', prop: 'is_deadline', min_width: '80', render: (h, item) => h('span', item ? '是' : '否')},
                        {type: 'text', label: '默认流程', prop: 'default_flow',render_simple:'name', width: '120'},
                        {type: 'text', label: '排序', prop: 'sort', width: '100'},
                        {type: 'text', label: '阶段', prop: 'project_stage',render_simple:'name', width: '100'},
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
                this.title = `编辑管制事项>${row.name}`
                
            },
            add() {
                this.rowData = {};
                this.title = "新增管制事项";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.DefinitionAdd?this.$refs.DefinitionAdd.clear():"";
            },
            save(type) {
                this.$refs.DefinitionAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            DefinitionAdd,
        },
    }
</script>

<style scoped>

</style>