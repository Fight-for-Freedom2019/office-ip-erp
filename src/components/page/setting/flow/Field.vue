<!-- 字段 -->
<template>
    <div class="Field">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <field-add :type="compileType" :id="rowID" :data="rowData" ref="FieldAdd" @update="update" @refresh="refresh"></field-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import FieldAdd from '@/components/page/setting/flow/FieldAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "Field",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/fields",
                tableOption: {
                    'name': 'FieldList',
                    'url': "/fields",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '字段名称、备注',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        // {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '字段标签', prop: 'name', min_width: '110'},
                        {type: 'text', label: '字段名称', prop: 'key', min_width: '110'},
                        {type: 'text', label: '占位符', prop: 'placeholder', min_width: '110'},
                        {type: 'text', label: '字段类型', prop: 'field_type',render_simple:'name', min_width: '120'},
                        // {type: 'text', label: '选项类型', prop: 'options', min_width: '100'},
                        // {type: 'text', label: '验证规则', prop: 'rules', min_width: '120'},
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
                this.title = `编辑字段>${row.name}`
                
            },
            add() {
                this.rowData = {};
                this.title = "新增字段";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.FieldAdd?this.$refs.FieldAdd.clear():"";
            },
            save(type) {
                this.$refs.FieldAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            FieldAdd,
        },
    }
</script>

<style scoped>

</style>