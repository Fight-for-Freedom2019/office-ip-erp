<!-- 客户备注 -->
<template>
    <div class="main">
        <table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData"
                         ref="table"></table-component>
        <!-- 新建客户备注 -->
        <app-shrink :visible.sync="isRemarkAddPanelVisible" :modal='false' :title="this.appPanelTitle">
      <span slot="header" style="float: right;">
        <el-button type="primary" @click="saveAdd" v-if="formType === 'add'" size="small">新建</el-button>
        <el-button type="primary" @click="saveAdd" v-if="formType === 'edit'" size="small">保存</el-button>
      </span>
            <remark-list-add ref="remarkAdd" :type='formType' :contacts='contacts' @editSuccess="refreshTableData"
                             @addSuccess="refreshTableData"></remark-list-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import RemarkListAdd from '@/components/page_extension/RemarkListAdd'
    import AxiosMixins from '@/mixins/axios-mixins'
    import AppShrink from '@/components/common/AppShrink'

    const URL = '/remarks'

    export default {
        name: 'CustomerRemarks',
        mixins: [AxiosMixins],
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
                    'header_btn': [
                        {type: 'add', click: this.addPop},
                        {type: 'delete'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '类型', prop: 'type', width: '150'},
                        {type: 'text', label: '备注人', prop: 'user.name', width: '145'},
                        {type: 'text', label: '备注时间', prop: 'email_address', width: '240'},
                        {type: 'text', label: '备注内容', prop: 'content'},
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

                        this.axiosDelete({url, success});
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
                    this.tableData = _.data
                };

                this.axiosGet({url, data, success});
            },
            handleRowClick(row) {
                this.contacts = row;
                this.formType = 'edit';
                this.appPanelTitle = '编辑备注';
                this.isRemarkAddPanelVisible = true;
            },
            refresh() {
                this.$refs.table.refresh();
            },
            update() {
                this.$refs.table.update();
            },
            handlePopRefresh(key) {
                this.refresh();
            }
        },
        mounted() {
            this.refresh();
        },
        components: {TableComponent, RemarkListAdd, AppShrink}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>