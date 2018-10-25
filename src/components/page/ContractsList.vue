<!-- 合同管理 -->
<template>
    <div class="main">
        <table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData" ref="table"></table-component>
        <!-- 新建合同 -->
        <app-shrink :visible.sync="isContractsAddPanelVisible" :modal='false' :title="this.appPanelTitle">
      <span slot="header" style="float: right;">
        <el-button type="primary" @click="saveAdd" v-if="formType === 'add'" size="small">新建</el-button>
        <el-button type="primary" @click="saveAdd" v-if="formType === 'edit'" size="small">保存</el-button>
      </span>
            <contracts-list-add ref="contractsAdd" :type='formType' :contracts='contracts' @editSuccess="refreshTableData" @addSuccess="refreshTableData"></contracts-list-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import ContractsListAdd from '@/components/page_extension/ContractsListAdd'
    import AxiosMixins from '@/mixins/axios-mixins'
    import AppShrink from '@/components/common/AppShrink'

    const URL = '/contracts'

    export default {
        name: 'ContractsList',
        mixins: [ AxiosMixins ],
        data () {
            return {
                isContractsAddPanelVisible: false,
                appPanelTitle: '新建合同',
                formType: 'add',
                contracts:{},
                option: {
                    'name': 'ContractsList',
                    'url': URL,
                    'rowClick': this.handleRowClick,
                    'height': 'default',
                    'header_btn': [
                        { type: 'add', click: this.addPop },
                        { type: 'delete' },
                        { type: 'control' },
                    ],
                    'columns': [
                        { type: 'selection' },
                        { type: 'text', label: '客户', prop: 'customer.name', width: '150' },
                        { type: 'text', label: '联系人', prop: 'contact.name', width: '240' },
                        { type: 'text', label: '合同编号', prop: 'serial', width: '145' },
                        { type: 'text', label: '合同类型', prop: 'type'},
                        { type: 'text', label: '状态', prop: 'identity', width:'123'},
                        { type: 'text', label: '签订日期', prop: 'signing_date', sortable: true, width: '175' },
                        { type: 'text', label: '届满日期', prop: 'expire_date', min_width: '200' },
                        { type: 'text', label: '备注', prop: 'remark',width: '200' },
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
            addPop () {
                this.formType = 'add';
                this.appPanelTitle =  '新建合同';
                this.contracts = {};
                this.isContractsAddPanelVisible = true;
            },
            editPop (col) {
                this.$refs.pop.show('edit', col);
            },
            deleteSingle ({id, name}) {
                this.$confirm(`删除后不可恢复，确认删除合同‘${name}’？`)
                    .then(_=>{
                        const url = `${URL}/${id}`;
                        const success = _=>{
                            this.$message({message: '删除合同成功', type: 'success'});
                            this.update();
                        };

                        this.axiosDelete({url, success});
                    })
                    .catch(_=>{});
            },
            saveAdd () {
                this.$refs.contractsAdd.save(this.formType);
            },
            refreshTableData (option) {
                const url = URL;
                const data = Object.assign({}, option);
                const success = _=>{this.tableData = _.data };

                this.axiosGet({url, data, success});
            },
            handleRowClick (row) {
                this.contracts = row;
                this.formType = 'edit';
                this.appPanelTitle =  '编辑合同>' + row.serial;
                this.isContractsAddPanelVisible = true;
            },
            refresh () {
                this.$refs.table.refresh();
            },
            update () {
                this.$refs.table.update();
            },
            handlePopRefresh (key) {
                this.refresh();
            }
        },
        mounted () {
            this.refresh();
        },
        components: { TableComponent, ContractsListAdd, AppShrink }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>