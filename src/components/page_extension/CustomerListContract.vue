<template>
    <div>
        <table-component :data="tableData" :tableOption="option" ref="table"
                         @refreshTableData='refreshTableData'></table-component>
        <pop @refresh="refresh" @update="update" ref="pop" :URL="URL" :customer="customer" :contractsID="contractsID"
             :popType="popType"></pop>
        <el-dialog :visible.sync="dialogVisible" class="dialog-small" title="附件详情" :modal="false">
            <app-table :columns="uploadColumns" :data="uploadData"></app-table>
        </el-dialog>
    </div>
</template>
<script>
    import TableComponent from '@/components/common/TableComponent'
    import Pop from '@/components/page_extension/ContractListPop'
    import AppTable from '@/components/common/AppTable'
    import {mapGetters} from 'vuex'

    export default {
        name: 'CustomerListContract',
        props: ['customer', 'itemData','URL'],
        data() {
            return {
                uploadColumns: [
                    { type: 'text', label: '文件名称', prop: 'name', min_width: '120'},
                    { type: 'text', label: '上传日期', prop: 'create_time', min_width: '120'},
                    { type: 'text', label: '上传人', prop: 'uploader', min_width: '100', render_simple: 'name'},
                    { type: 'text', label: '大小', prop: 'size', min_width: '80'},
                    {
                        type: 'action',
                        label: '操作',
                        fixed: false,
                        min_width: '120',
                        btns: [
                            { type: 'download', click: ({downloadUrl})=>{window.open(downloadUrl)}},
                            { type: 'view', click:({viewUrl})=>{window.open(viewUrl)}}
                        ]
                    }
                ],
                uploadData: [],
                dialogVisible:false,
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
                        },
                        {type: 'text', prop: 'type', label: '合同类型',render_simple:"name"},
                        {
                            type: 'text', prop: 'status', label: '状态', render_simple:"name"
                        },
                        {type: 'text', prop: 'signing_date', label: '签订日期'},
                        {type: 'text', prop: 'expire_date', label: '届满日期'},
                        {
                            type: 'text',
                            label: '附件',
                            width: '178',
                            prop: 'attachments',
                            render: this.attachmentsRender,
                        },
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
            attachmentsRender (h, item) {
                let body;

                if(item.length == 0) {
                    body = '';
                }else if(item.length == 1) {
                    const obj = {
                        attrs: { href: item[0]['downloadUrl'] },
                    };
                    body = [h('a', obj, item[0].name )];
                }else if(item.length > 1) {
                    body = [];
                    const obj = {
                        attrs: { href: item[0]['downloadUrl'] },
                        style: { width: '120px', display: 'inline-block',overflow: 'hidden',textOverflow:'ellipsis',
                            whiteSpace : 'nowrap' },
                    };

                    body.push(h('a', obj, item[0].name ));
                    body.push(h('el-button', {
                        props: {
                            type: 'text',
                            size: 'mini',
                        },
                        on: {
                            click: () => {
                                this.dialogVisible = true;
                                this.uploadData = item;
                            }
                        }
                    }, '更多'));
                }

                return h('span',{style:{display: 'flex',justifyContent:'flex-start',}}, body);
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
            AppTable,
        },

    }
</script>
