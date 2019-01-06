<!-- 流程节点 -->
<template>
    <div class="Action">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <action-add :type="compileType" :data = "rowData" ref="ActionAdd" @update="update" @refresh="refresh"></action-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import ActionAdd from '@/components/page/setting/flow/ActionAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "Action",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/actions",
                tableOption: {
                    'name': 'ActionList',
                    'url': "/fee_codes",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '节点名称、备注',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        // {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '节点名称', prop: 'name', min_width: '150'},
                        {type: 'text', label: '节点创建后阶段', prop: 'creation_process_stage',render_simple:'name', width: '130'},
                        {type: 'text', label: '节点完成后阶段', prop: 'completion_process_stage',render_simple:'name', width: '130'},
                        {type: 'text', label: '节点创建邮件模板', prop: 'creation_template',render_simple:'name', width: '130'},
                        {type: 'text', label: '节点完成邮件模板', prop: 'completion_template',render_simple:'name', width: '130'},
                        {type: 'text', label: '创建逻辑', prop: 'creation_logic', min_width: '110'},
                        {type: 'text', label: '完成逻辑', prop: 'completion_logic', min_width: '110'},
                        {type: 'text', label: '通过逻辑', prop: 'pass_logic', min_width: '110'},
                        {type: 'text', label: '驳回逻辑', prop: 'rejection_logic', min_width: '110'},
                        {type: 'text', label: '自动完成', prop: 'is_auto_complete', width: '110'},
                        {type: 'text', label: '审核节点', prop: 'is_review_action', width: '110'},
                        {type: 'text', label: '表单', prop: 'form',render_simple:'name', width: '100'},
                        {type: 'text', label: '排序', prop: 'sort', width: '100'},
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
                this.title = `编辑流程节点>${row.name}`
                
            },
            add() {
                this.rowData = {};
                this.title = "新增流程节点";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.ActionAdd?this.$refs.ActionAdd.clear():"";
            },
            save(type) {
                this.$refs.ActionAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            ActionAdd,
        },
    }
</script>

<style scoped>

</style>