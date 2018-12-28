<!-- 客户备注 -->
<template>
    <div class="main">
        <table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData"
                         ref="table"></table-component>
        <!-- 新建客户备注 -->
        <app-shrink :visible.sync="isRemarkAddPanelVisible" :modal='formType === "add"' :title="this.appPanelTitle">
      <span slot="header" style="float: right;">
        <el-button type="primary" @click="saveAdd" v-if="formType === 'add'" size="small">新建</el-button>
        <el-button type="primary" @click="saveAdd" v-if="formType === 'edit'" size="small">保存</el-button>
      </span>
            <remark-list-add ref="remarkAdd" :type='formType' :contacts='contacts' @refresh="refresh" @update="update"></remark-list-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import RemarkListAdd from '@/components/page_extension/RemarkListAdd'
    import AppShrink from '@/components/common/AppShrink'
    import TableMixins from '@/mixins/table-mixins'


    const URL = '/remarks'

    export default {
        name: 'CustomerRemarks',
        mixins:[TableMixins],
        data() {
            return {
                isRemarkAddPanelVisible: false,
                appPanelTitle: '新建客户备注',
                formType: 'add',
                contacts: {},
                option: {
                    'name': 'contactsList',
                    'url': URL,
                    'rowClick': this.handleRowClick,
                    'height': 'default',
                    'is_list_filter': true,
                    'list_type': 'remarks',
                    'treeFilter':'remarks',
                    'header_btn': [
                        {type: 'add', click: this.addPop},
                        {type: 'delete'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '类型', prop: 'type', width: '150',render_header:true,render_simple:"name"},
                        {type: 'text', label: '备注人', prop: 'user', width: '145',render_simple:"name",render_header:true},
                        {type: 'text', label: '备注时间', prop: 'creation_time', width: '240',render_header:true},
                        {type: 'text', label: '备注内容', prop: 'content',render_header:true},
                    ]
                },
                tableData: [],
                filter: {},
            }
        },
        methods: {
            addPop() {
                this.formType = 'add';
                this.appPanelTitle = '新建客户备注';
                this.applicant = {};
                this.isRemarkAddPanelVisible = true;
            },
            editPop(col) {
                this.$refs.pop.show('edit', col);
            },
            deleteSingle({id, name}) {
                this.$confirm(`删除后不可恢复，确认删除备注‘${name}’？`)
                    .then(_ => {
                        const url = `${URL}/${id}`;
                        const success = _ => {
                            this.$message({message: '删除备注成功', type: 'success'});
                            this.update();
                        };

                        this.$axiosDelete({url, success});
                    })
                    .catch(_ => {
                    });
            },
            saveAdd() {
                this.$refs.remarkAdd.save(this.formType);
            },
            refreshTableData(option) {
                const url = URL;
                const data = Object.assign({}, option);
                const success = _ => {
                    this.tableData = _.data;
                    this.formType === "add"?this.isRemarkAddPanelVisible = false:"";
                };

                this.$axiosGet({url, data, success});
            },
            handleRowClick(row) {
                this.contacts = row;
                this.formType = 'edit';
                this.appPanelTitle = '编辑备注';
                this.isRemarkAddPanelVisible = true;
            },
            handlePopRefresh(key) {
                this.refresh();
            }
        },
        components: {TableComponent, RemarkListAdd, AppShrink}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>