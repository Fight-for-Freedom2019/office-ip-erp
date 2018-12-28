<template>
    <div>
        <table-component :data="tableData" :tableOption="option" ref="table"
                         @refreshTableData="refreshTableData"></table-component>
        <pop @refresh="refresh" @update="update" ref="pop" :customer="customer" :URL="URL" :remarkID = "remarkID" :popType="popType"></pop>
    </div>
</template>
<script>
    import TableComponent from '@/components/common/TableComponent'
    import Pop from '@/components/page_extension/RemarkListPop'
    import Config from "@/const/selectConfig";

    const map = new Map(Config);

    import {mapGetters} from 'vuex'

    const URL = '/customers';
    export default {
        name: 'CustomerListRemark',
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
                        {type: 'text', label: '类型', prop: 'type', width: '150',render_simple:"name"},
                        {type: 'text', label: '备注人', prop: 'user.name', width: '145'},
                        {type: 'text', label: '备注时间', prop: 'creation_time', width: '240'},
                        {type: 'text', label: '备注内容', prop: 'content'},
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
                tableData: [
                    {
                        id: 0,
                        name: 'kdsaokd'
                    }
                ],
                remarkID:null,
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
            refreshTableData(option) {
                let url = `${this.URL}/${this.customer.id}/remarks`
                this.$axiosGet({
                    url: url,
                    data: Object.assign({}, option),
                    success: _ => {
                        this.tableData = _.data;
                    }
                })
            },
            addPop() {
                this.popType = "add"
                this.$refs.pop.show();
            },
            refresh() {
                this.$refs.table.refresh();
            },
            update() {
                this.$refs.table.update();
            },
            editPop(row) {
                this.popType = "edit";
                let copy = this.$tool.deepCopy(row);
                map.get("remark_type").options.forEach((_) => {
                    if (_.name === copy.type) {
                        copy.type = _.id;
                    }
                });
                this.remarkID = copy.id;
                this.$refs.pop.show("edit", copy);
            },
            clientDelete({id}) {
                const url = `/remarks?id[]=${id}`;
                this.$confirm(
                    '此操作将永久删除该信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    const success = _ => {
                        this.update();
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
