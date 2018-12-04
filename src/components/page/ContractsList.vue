<!-- 合同管理 -->
<template>
    <div class="main">
        <table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData"
                         ref="table"></table-component>
        <!-- 新建合同 -->
        <app-shrink :visible.sync="isContractsAddPanelVisible" :modal="formType==='add'" :title="this.appPanelTitle">
      <span slot="header" style="float: right;">
        <el-button type="primary" @click="saveAdd" v-if="formType === 'add'" size="small">新建</el-button>
        <el-button type="primary" @click="saveAdd" v-if="formType === 'edit'" size="small">保存</el-button>
      </span>
            <contracts-list-add ref="contractsAdd" :type='formType' :contracts='contracts' @refresh="refresh" @update="update"></contracts-list-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import ContractsListAdd from '@/components/page_extension/ContractsListAdd'
    import AppShrink from '@/components/common/AppShrink'
    import TableMixins from '@/mixins/table-mixins'

    const URL = '/contracts'

    export default {
        name: 'ContractsList',
        mixins:[TableMixins],
        data() {
            return {
                isContractsAddPanelVisible: false,
                appPanelTitle: '新建合同',
                formType: 'add',
                contracts: {},
                option: {
                    'name': 'ContractsList',
                    'url': URL,
                    'rowClick': this.handleRowClick,
                    'height': 'default',
                    'is_list_filter': true,
                    'list_type': 'contracts',
                    'treeFilter':'contracts',
                    'header_btn': [
                        {type: 'add', click: this.addPop},
                        {type: 'delete'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '客户', prop: 'customer', width: '150',render_simple:"name",render_header:true},
                        {type: 'text', label: '联系人', prop: 'contact', width: '170',render_simple:"name",render_header:true},
                        {type: 'text', label: '合同编号', prop: 'serial', width: '145',render_header:true},
                        {type: 'text', label: '合同类型', prop: 'type', width: '145',render_simple:"name",render_header:true},
                        {
                            type: 'text', label: '状态', prop: 'is_effective', width: '123', render: (h, item) => {
                                item = item === 1 ? "生效中" : "已失效";
                                return h("span", item);
                            },
                            render_header:true
                        },
                        {type: 'text', label: '签订日期', prop: 'signing_date', width: '175',render_header:true},
                        {type: 'text', label: '届满日期', prop: 'expire_date', width: '175',render_header:true},
                        {type: 'text', label: '备注', prop: 'remark',render_header:true},
                        // 	{
                        // 		type: 'action',
                        // width: '200',
                        // 		btns: [
                        // 			{ type: 'edit', click: this.editPop },
                        // 			{ type: 'delete', click: this.deleteSingle },
                        // 		]
                        // 	}
                    ]
                },
                tableData: [],
                filter: {},
            }
        },
        methods: {
            addPop() {
                this.formType = 'add';
                this.appPanelTitle = '新建合同';
                this.contracts = {};
                this.isContractsAddPanelVisible = true;
            },
            editPop(col) {
                this.$refs.pop.show('edit', col);
            },
            deleteSingle({id, name}) {
                this.$confirm(`删除后不可恢复，确认删除合同‘${name}’？`)
                    .then(_ => {
                        const url = `${URL}/${id}`;
                        const success = _ => {
                            this.$message({message: '删除合同成功', type: 'success'});
                            this.update();
                        };

                        this.$axiosDelete({url, success});
                    })
                    .catch(_ => {
                    });
            },
            saveAdd() {
                this.$refs.contractsAdd.save(this.formType);
            },
            refreshTableData(option) {
                const url = URL;
                const data = Object.assign({}, option);
                const success = _ => {
                    this.tableData = _.data;
                    this.formType === "add" ? this.isContractsAddPanelVisible = false : "";
                };

                this.$axiosGet({url, data, success});
            },
            handleRowClick(row) {
                this.contracts = row;
                this.formType = 'edit';
                this.appPanelTitle = '编辑合同>' + row.serial;
                this.isContractsAddPanelVisible = true;
            },
            handlePopRefresh(key) {
                this.refresh();
            }
        },
        components: {TableComponent, ContractsListAdd, AppShrink}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>