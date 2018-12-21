<!-- 合同管理 -->
<template>
    <div class="main">
        <table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData"
                         ref="table"></table-component>
        <!-- 合同详情 -->
        <contracts-list-add ref="contractsAdd" @refresh="refresh" @update="update" ></contracts-list-add>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import ContractsListAdd from '@/components/page/crm/contracts/ContractsListAdd'
    import TableMixins from '@/mixins/table-mixins'

    const URL = '/contracts'

    export default {
        name: 'ContractsList',
        mixins:[TableMixins],
        data() {
            return {
                isContractsAddPanelVisible: false,
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
                        {type: 'text', label: '联系人', prop: 'contact', width: '120',render_simple:"name",render_header:true},
                        {type: 'text', label: '合同编号', prop: 'serial', width: '120',render_header:true},
                        {type: 'text', label: '合同类型', prop: 'type', width: '120',render_simple:"name",render_header:true},
                        {type: 'text', label: '订单号', prop: 'order',render_simple:'name', width: '130',render_header:true},
                        {type: 'text', label: '合同状态', prop: 'status',render_simple:'name', width: '110',render_header:true},
                        {type: 'text', label: '签订日期', prop: 'signing_date', width: '110',render_header:true},
                        {type: 'text', label: '届满日期', prop: 'expire_date', width: '110',render_header:true},
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
                this.$refs.contractsAdd.show(row.id,'edit',row);
            },
            handlePopRefresh(key) {
                this.refresh();
            }
        },
        components: {TableComponent, ContractsListAdd}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>