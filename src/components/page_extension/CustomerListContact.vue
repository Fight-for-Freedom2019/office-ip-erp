<template>
    <div>
        <table-component :data="tableData" :tableOption="option" ref="table"
                         @refreshTableData='refreshTableData'></table-component>
        <pop @refresh="refresh" @update="update" ref="pop" :URL="URL" :customer="customer" :contact_id="contact_id"></pop>
    </div>
</template>
<script>
    import TableComponent from '@/components/common/TableComponent'
    import Pop from '@/components/form/LinkmanPop'
    import Config from '@/const/selectConfig'
    import {mapGetters} from 'vuex'

    const config = new Map(Config);
    export default {
        name: 'ClientlistLinkman',
        props: ['customer', 'itemData','URL'],
        data() {
            return {
                option: {
                    name: 'ClientlistLinkman',
                    URL: this.url,
                    is_search: true,
                    header_btn: [
                        {type: 'add', click: this.addPop},
                    ],
                    columns: [
                        {type: 'text', label: '姓名', prop: 'name', sortable: true, width: '150'},
                        {
                            type: 'text', label: '类型', prop: 'contact_type', width: '240', render: (h, item) => {
                                let options = config.get("contacts_type").options;
                                let name = "";
                                options.map(function (o) {
                                    o.id === item? name = o.name :"";
                                });
                                return h("span",name);
                            }
                        },
                        {type: 'text', label: '邮箱', prop: 'email_address', width: '145'},
                        {type: 'text', label: '电话', prop: 'phone_number'},
                        {type: 'text', label: '证件号码', prop: 'identity', width: '123'},
                        {type: 'text', label: '英文名', prop: 'first_name', min_width: '200'},
                        {type: 'text', label: '英文姓', prop: 'last_name', width: '200'},
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
                tableData: [],
                contact_id: null,
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
                this.$refs.pop.show("add", {});
            },
            refreshTableData(option) {
                const success = _ => {
                    this.tableData = _.data;
                }
                this.$axiosGet({
                    url: `${this.URL}/${this.customer.id}/contacts`,
                    data: Object.assign({}, option),
                    success,
                })
            },
            refresh() {
                this.$refs.table.refresh();
            },
            update() {
                this.$refs.table.update();
            },
            editPop(row) {
                this.contact_id = row.id;
                let copy = this.$tool.deepCopy(row);
                this.$refs.pop.show('edit', copy);
            },
            clientDelete(row) {

                const url = `/contacts?id[]=${row.id}`;
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
            itemData() {
                this.tableData = this.itemData;
            }
        },
        components: {
            TableComponent,
            Pop,
        },

    }
</script>
