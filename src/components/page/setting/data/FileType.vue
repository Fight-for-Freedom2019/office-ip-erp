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
import { mapGetters } from "vuex";

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
                    { type: 'add', click: this.add },
                    { type: 'delete' },
                    // {type: 'export'},
                    { type: 'control' },
                ],
                'columns': [
                    { type: 'selection' },
                    { type: 'text', label: '案件类型', prop: 'project_type', render_simple: 'name', width: '80' },
                    { type: 'text', label: '文件类型', prop: 'category', render_simple: 'name', width: '80' },
                    { type: 'text', label: '文件类型名称', prop: 'name', min_width: '120' },
                    { type: 'text', label: '简称', prop: 'abbr', width: '90' },
                    { type: 'text', label: '管制事项', prop: 'process_definition', render_simple: 'name', width: '90' },
                    { type: 'text', label: '案件阶段', prop: 'project_stage', render_simple: 'name', width: '90' },
                    { type: 'text', label: '必填字段', prop: 'fields', render: this.fieldsRender, width: '200' },
                    // {type: 'text', label: '上传时执行逻辑', prop: 'behavior', width: '120'},
                    { type: 'text', label: '标记', prop: 'tag', width: '80' },
                    { type: 'text', label: '是否发文', prop: 'is_send_notice', render: this.booleanRender, width: '80' },
                    { type: 'text', label: '默认类型', prop: 'is_default', render: this.booleanRender, width: '80' },
                    { type: 'text', label: '排序', prop: 'sort', width: '60' },
                ],
            },
            compileType: "add",
            isPanelVisible: false,
            tableData: [],
            rowID: null,
            rowData: null,
            title: "",
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
        booleanRender(h, item) {
            item ? (item = "是") : (item = "否");
            return h("span", item);
        },
        fieldsRender(h, item) {
            const map = this.getHashMaps.get('document_fields');
            const values = [];
            for (var i in item) {
                let n = '';
                map.options.forEach(_ => {
                    if (_.id == i) {
                        n = _.name;
                    }
                })
                if (n.length > 0) {
                    values.push(n);
                }
            }
            return h('span', values.join(','));
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
            this.$refs.FileTypeAdd ? this.$refs.FileTypeAdd.clear() : "";
        },
        save(type) {
            this.$refs.FileTypeAdd.submitForm(type, this.rowID)
        },
    },
    computed: {
        ...mapGetters(['getHashMaps']),
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