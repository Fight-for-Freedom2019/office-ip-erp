<template>
    <div>
        <table-component :data="tableData" :tableOption="option" ref="table"
                         @refreshTableData="refreshTableData"></table-component>
        <pop @refresh="refresh" @update="update" ref="pop" :customer="customer" :presentId=currentId></pop>
    </div>
</template>
<script>
    import TableComponent from '@/components/common/TableComponent'
    import Pop from '@/components/page_extension/RequirementListPop'
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import Config from '@/const/selectConfig'
    const config = new Map(Config);
    const URL = '/customers';
    export default {
        name: 'CustomerListApplicant',
        props: ['customer', 'itemData'],
        data() {
            return {
                option: {
                    name: 'requirementList',
                    url: URL,
                    header_btn: [
                        {type: 'add', click: this.addPop, size: 'small'},
                    ],
                    columns: [
                        {type: 'text', prop: 'name', label: '名称', width: '160',},
                        {
                            type: 'text',
                            prop: 'citizenship',
                            label: '国籍',
                            // render_text: _=>this.caseMap.get(Number.parseInt(_)),
                        },
                        {
                            type: 'text', prop: 'type', label: '申请人类型', width: '160',
                            render_text: (item) => {
                                let name;
                                config.get("applicant_type").options.map(function (o) {
                                    if (o.id === item) {
                                        name = o.name;
                                    }
                                })
                                return name
                            }
                        },
                        {type: 'text', prop: 'identity', label: '证件号码'},
                        {
                            type: 'text', prop: 'province_code', label: '省份',
                            render: (h, item) => {
                                const d = this.provinceMap.get(Number.parseInt(item));
                                return h('span', d ? d : '');
                            }
                        },
                        {
                            type: 'text', prop: 'city_code', label: '城市',
                            render: (h, item) => {
                                const d = this.cityMap.get(item + "");
                                return h('span', d ? d : '');
                            }
                        },
                        {type: 'text', prop: 'address', label: '地址'},
                        {
                            type: 'text',
                            prop: 'is_fee_discount',
                            label: '费减备案',
                            render: (h, item) => h('span', item ? '已完成' : '未完成')
                        },
                        {type: 'text', prop: 'english_name', label: '英文名称'},
                        {type: 'text', prop: 'english_address', label: '英文地址'},
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
                    is_search: true,
                    is_header: true,
                    height: "customerList",
                },
                tableData: [],
                currentId: {}
            };
        },
        computed: {
            ...mapGetters([
                'areaMap',
                'cityMap',
                'provinceMap',
            ]),
        },
        mounted() {
        },
        methods: {
            refreshTableData(option) {
                const success = _ => {
                    this.tableData = _.data;
                }
                this.$axiosGet({
                    url: `${URL}/${this.customer.id}/applicants`,
                    data: Object.assign({}, option),
                    success,
                })
            },
            addPop() {
                this.$refs.pop.show("add", {});
            },
            refresh() {
                this.$refs.table.refresh();
            },
            editPop(row) {
                let copy = this.$tool.deepCopy(row);
                copy.type === 0 ? copy.type = "" : ""
                this.currentId = copy.id;
                copy.province_city = [copy.province_code - 0, copy.city_code + ""];	// 添加province_city属性，在弹窗中准确显示省市
                this.$refs.pop.show('edit', copy);
            },
            update() {
                this.$refs.table.update();
            },
            clientDelete(row) {
                const url = `applicants?id[]=${row.id}`;
                this.$confirm(
                    '此操作将永久删除该邮件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                    const success = _ => {
                        this.update();
                        this.$message({message: '删除成功！', type: 'success'})
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