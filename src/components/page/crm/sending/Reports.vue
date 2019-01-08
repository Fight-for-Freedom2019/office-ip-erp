<!-- 收款账户 -->
<template>
    <div class="FileType">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <!--<el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>-->
                <app-button-loading :func="save" v-if="compileType === 'add'" ref="loadingBtn"></app-button-loading>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <file-type-add :type="compileType" :data = "rowData" ref="FileTypeAdd" @update="update" @refresh="refresh"></file-type-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import FileTypeAdd from '@/components/page/setting/data/FileTypeAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "FileType",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/file_types",
                tableOption: {
                    'name': 'FileTypeList',
                    'url': "/file_types",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '文件类型名称',
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
                            type: 'text', label: '案件类型', prop: 'project_category',render_simple:'name', width: '100'
                        },
                        {type: 'text', label: '文件类型', prop: 'category',render_simple:'name', width: '120'},
                        {type: 'text', label: '文件类型名称', prop: 'name', min_width: '200'},
                        {type: 'text', label: '文件类型简称', prop: 'abbr', width: '120'},
                        {type: 'text', label: '上传触发管制事项', prop: 'process_definition',render_simple:'name', width: '130'},
                        {type: 'text', label: '上传后案件阶段', prop: 'project_stage',render_simple:'name', width: '120'},
                        {type: 'text', label: '上传时填写字段', prop: 'fields', width: '120'},
                        {type: 'text', label: '上传时执行逻辑', prop: 'behavior', width: '120'},
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
                this.title = `编辑文件类型>${row.name}`
            },
            add() {
                this.rowData = {};
                this.title = "新增文件类型";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.FileTypeAdd?this.$refs.FileTypeAdd.clear():"";
            },
            save(type) {
                this.$refs.FileTypeAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            FileTypeAdd,
        },
    }
</script>

<style scoped>

</style>