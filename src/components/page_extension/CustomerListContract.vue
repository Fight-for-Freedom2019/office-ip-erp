<template>
    <div>
        <table-component :data="tableData" :tableOption="option" ref="table"
                         @refreshTableData='refreshTableData'></table-component>
        <pop @refresh="refresh" @update="update" ref="pop" :URL="URL" :customer="customer" :contractsID="contractsID"
             :popType="popType"></pop>
    </div>
</template>
<script>
    import TableComponent from '@/components/common/TableComponent'
    import Pop from '@/components/page_extension/ContractListPop'
    import {mapGetters} from 'vuex'

    export default {
        name: 'CustomerListContract',
        props: ['customer', 'itemData','URL'],
        data() {
            return {
                option: {
                    URL: this.url,
                    is_search: true,
                    header_btn: [
                        {type: 'add', click: this.addPop},
                    ],
                    columns: [
                        {
                            type: 'text',
                            prop: 'serial',
                            label: '合同编号',
                            // render_text: _=>this.caseMap.get(Number.parseInt(_)),
                        },
                        {type: 'text', prop: 'type', label: '合同类型'},
                        {
                            type: 'text', prop: 'is_effective', label: '状态', render: (h, item) => {
                                item = item === 1 ? "生效中" : "已失效";
                                return h("span", item);
                            }
                        },
                        {type: 'text', prop: 'signing_date', label: '签订日期'},
                        {type: 'text', prop: 'expire_date', label: '届满日期'},
                        {type: 'text', prop: 'accessory', label: '附件'},
                        {type: 'text', prop: 'remark', label: '备注'},
                        {
                            type: 'action',
                            width: '100',
                            align: 'left',
                            btns: [
                                {type: 'edit', click: this.editPop},
                                {type: 'delete', click: this.clientDelete}
                            ]

                        },
                    ],
                    is_pagination: true,
                    is_border: true,
                    height: "customerList",
                },
                popType: "add",
                tableData: [],
                contractsID: null,
            };
        },
        computed: {
            ...mapGetters([
                'caseMap',
            ]),
            url(){
              return this.URL;
            },
        },
        methods: {
            addPop() {
                this.popType = "add";
                this.$refs.pop.show();
            },
            refresh() {
                this.$refs.table.refresh();
            },
            update() {
                this.$refs.table.update();
            },
            refreshTableData(option) {
                const success = _ => {
                    this.tableData = _.data;
                }
                this.$axiosGet({
                    url: `${this.URL}/${this.customer.id}/contracts`,
                    data: Object.assign({}, option),
                    success,
                })
            },
            clientDelete({id}) {
                const url = `/contracts?id[]=${id}`;
                this.$confirm(
                    '此操作将永久删除该信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    const success = _ => {
                        this.refreshTableData();
                        this.$message({message: '删除成功', type: 'success'})
                    };

                    this.$axiosDelete({url, success});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除！'
                    })
                })
            },
            editPop(row) {
                this.popType = "edit";
                let copy = this.$tool.deepCopy(row);
                this.contractsID = copy.id;
                this.$refs.pop.show("edit", copy);
            },
        },
        watch: {
            itemData(val, oldVal) {
                this.tableData = val;
            }
        },
        components: {
            TableComponent,
            Pop,
        },

    }
</script>
