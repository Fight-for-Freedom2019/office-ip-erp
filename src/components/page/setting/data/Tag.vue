<!-- 收款账户 -->
<template>
    <div class="Tag">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <!--<el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>-->
                <app-button-loading :func="save" v-if="compileType === 'add'" ref="loadingBtn"></app-button-loading>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <tag-add :type="compileType" :data = "rowData" ref="TagAdd" @update="update" @refresh="refresh"></tag-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import TagAdd from '@/components/page/setting/data/TagAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "Tag",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/tags",
                tableOption: {
                    'name': 'TagList',
                    'url': "/tags",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '标签名称、备注',
                    // 'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        // {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        
                        {type: 'text', label: '标签名称', prop: 'name', min_width: '100'},
                        {type: 'text', label: '内置标签', prop: 'is_default', min_width: '100', render: (h, item) => h('span', item ? '是' : '否')},
                        {type: 'text', label: '备注', prop: 'remark', min_width: '200'},
                        {
                            type: 'action',
                            label: '操作',
                            btns: [
                                {type: 'edit', click: this.edit},
                                {type: 'delete', click: this.delete},
                            ],
                        }
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
            edit(row) {
                if (row.is_default) {
                    this.$alert('内置标签无法编辑');
                    return;
                }
                this.rowData = row;
                this.rowID = row.id;
                this.openVisible("isPanelVisible");
                this.compileType = "edit";
                this.title = `编辑标签>${row.name}`
            },
            delete(row) {
                if (row.is_default) {
                    this.$alert('内置标签无法删除');
                    return;
                }
                const success = _ => {
                    this.refreshTableData()
                };

                const data = Object.assign({}, {field_id:field.id});
                this.$axiosDelete({
                    url: this.URL + '/' + row.id,
                    data: data,
                    success,
                })
            },
            add() {
                this.rowData = {};
                this.title = "新增标签";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.TagAdd?this.$refs.TagAdd.clear():"";
            },
            save(type) {
                this.$refs.TagAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            TagAdd,
        },
    }
</script>

<style scoped>

</style>