<!-- 收款账户 -->
<template>
    <div class="Flow">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <flow-add :type="compileType" :data = "rowData" ref="FlowAdd" @update="update" @refresh="refresh"></flow-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import FlowAdd from '@/components/page/setting/flow/FlowAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "Flow",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/flows",
                tableOption: {
                    'name': 'FlowList',
                    'url': "/flows",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '流程名称、备注',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '案件类型', prop: 'project_type', width: '100'},
                        {type: 'text', label: '流程名称', prop: 'name', min_width: '120'},
                        {type: 'text', label: '流程描述', prop: 'description', min_width: '120'},
                        {type: 'text', label: '排序', prop: 'sort', width: '100'},
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
                this.title = `编辑流程>${row.name}`
                
            },
            add() {
                this.rowData = {};
                this.title = "新增流程";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.FlowAdd?this.$refs.FlowAdd.clear():"";
            },
            save(type) {
                this.$refs.FlowAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            FlowAdd,
        },
    }
</script>

<style scoped>

</style>