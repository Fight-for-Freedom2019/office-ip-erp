<!-- 收款账户 -->
<template>
    <div class="ProjectStage">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <!--<el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>-->
                <app-button-loading :func="save" v-if="compileType === 'add'" ref="loadingBtn"></app-button-loading>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <project-stage-add :type="compileType" :data = "rowData" ref="ProjectStageAdd" @update="update" @refresh="refresh"></project-stage-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import ProjectStageAdd from '@/components/page/setting/data/ProjectStageAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "ProjectStage",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/project_stages",
                tableOption: {
                    'name': 'ProjectStageList',
                    'url': "/project_stages",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '案件阶段名称',
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
                            type: 'text', label: '案件类型', prop: 'project_type',render_simple:'name', width: '100'
                        },
                        {type: 'text', label: '案件阶段名称', prop: 'name', min_width: '200'},
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
                this.title = `编辑案件阶段>${row.name}`
                
            },
            add() {
                this.rowData = {};
                this.title = "新增案件阶段";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.ProjectStageAdd?this.$refs.ProjectStageAdd.clear():"";
            },
            save(type) {
                this.$refs.ProjectStageAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            ProjectStageAdd,
        },
    }
</script>

<style scoped>

</style>