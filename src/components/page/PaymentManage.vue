<!-- 请款管理 -->
<template>
    <div class="PaymentManage">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @refresh="refresh" @update="update"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" @click="save">保存</el-button>
                <el-button type="danger" size="small" @click="deleteBill">删除</el-button>
                <el-button type="primary" size="small" v-if="bill_status === 'audit'"
                           @click="submitAudit">提交审核</el-button>
                <el-button type="primary" size="small" v-if="bill_status === 'remind'">邮件提醒</el-button>
                <!--<el-button type="" size="small">退回修改</el-button>-->
            </span>
            <payment-manage-msg ref="detail" :id="rowID" @update="update" :rowData="row"></payment-manage-msg>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import PaymentManageMsg from '@/components/page_extension/PaymentManageMsg'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);
    const URL = "/invoices";
    export default {
        name: "PaymentManage",
        data() {
            return {
                tableData: [],
                bill_status: "add",
                tableOption: {
                    'name': 'PaymentManageList',
                    'url': URL,
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': true,
                    'list_type': 'invoices',
                    'treeFilter': 'invoices',
                    'search_placeholder': '',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        // {type: 'export'},
                        {type: 'delete',click:this.deleteBill},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '请款单号', prop: 'serial', min_width: '178', render_header: true},
                        {type: 'text', label: '创建人', prop: 'creator_user', render_simple:"name", width: '120', render_header: true},
                        {type: 'text', label: '创建时间', prop: 'creation_time', width: '150', render_header: true},
                        {type: 'text', label: '请款对象', prop: 'user', width: '180', render_simple:"name",render_header: true},
                        {type: 'text', label: '金额', prop: 'amount', width: '120'},
                        {type: 'text', label: '币别', prop: 'currency', width: '120', render_header: true},
                        {type: 'text', label: '汇率', prop: 'roe', width: '100'},
                        {type: 'text', label: '人民币', prop: 'rmb_amount', width: '150', render_header: true},
                        {type: 'text', label: '请款时间', prop: 'request_time', width: '150', render_header: true},
                        {type: 'text', label: '回款期限', prop: 'deadline', width: '150', render_header: true},
                        {type: 'text', label: '回款时间', prop: 'payment_time', width: '150', render_header: true},
                        {type: 'text', label: '回款金额', prop: 'received_amount', width: '150'},
                        {type: 'text', label: '回款确认用户', prop: 'creator_user_name', width: '150', render_header: true},
                        {type: 'text', label: '回款确认时间', prop: 'confirmation_time', width: '150', render_header: true},
                        {
                            type: 'text',
                            label: '请款单状态',
                            prop: 'status',
                            width: '150',
                            render_header: true,
                            render: (h,item) => {
                                let name = "";
                                config.get("invoice_status").options.map(function (o) {
                                    if (o.id === item) {
                                        name = o.name;
                                    }
                                });
                                return h("span", name);
                            }
                        },
                        {
                            type: 'text',
                            label: '票据已上传',
                            prop: 'is_voucher_uploaded',
                            width: '150',
                            render: (h, item) => {
                                return h("span", item ? "是" : "否")
                            }
                        },
                        {
                            type: 'text', label: '快递单号', prop: 'express', width: '150', render: (h, item) => {
                                return h("span", item ? item.serial : "")
                            }
                        },
                        {type: 'text', label: '寄件时间', prop: 'express.date', width: '150'},
                        {type: 'text', label: '备注', prop: 'remark', width: '150'},
                    ],
                },
                isPanelVisible: false,
                title: "",
                row: null,
                rowID: null,
                is_deleted: 0,
            }
        },
        methods: {
            handleRowClick(row) {
                this.row = row;
                this.rowID = row.id;
                if (row.status === 8) {
                    this.bill_status = 'remind';
                } else if (row.status === 0) {
                    this.bill_status = 'audit';
                } else {
                    this.bill_status = 'add';
                }
                this.title = `订单编号: ${row.serial}`;
                this.isPanelVisible = true;
            },
            refreshTableData(data) {
                const url = URL;
                const success = _ => {
                    this.tableData = _.invoice;
                };
                this.$axiosGet({url, data, success})
            },
            update() {
                this.$refs.table.update();
            },
            refresh() {
                this.$refs.table.refresh();
            },
            submitAudit() {  // 提交审核
                this.$refs.detail.submitAudit(this.rowID);
            },
            save() {     // 保存修改的账单
                this.$refs.detail.save(this.rowID);
            },
            change(val) {
                val ? this.is_deleted = 1 : this.is_deleted = 0;
            },

            changeState(){     // 由于状态显示在shrink组件下的子组件中，所以还需要一个方法改变PaymentManageMsg中的form.status
                this.$refs.detail.changeState();
                this.bill_status = "add";
            },

            deleteBill(e,s) {
                const h = this.$createElement;
                this.$msgbox({
                    title: "提示",
                    message: h("el-checkbox", {
                        on: {
                            change: this.change
                        }
                    }, "是否删除订单下的所有费用"),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            const url = "/invoices_delete";
                            const data = {
                                is_deleted: this.is_deleted,
                                id: s?this.$tool.splitObj(s, 'id'):[this.rowID]
                            };
                            const success = _ => {
                                this.$message({type: "success", message: "删除成功!"});
                                this.update();
                                this.changeState() // 成功之后在这里调用这个方法改变子组件的账单状态
                                done();
                            };
                            this.$axiosDelete({url, data, success});
                        } else {
                            done();
                        }
                    }
                })
            }
        },
        mounted() {
            this.$refs.table.refresh();
        },
        components: {
            TableComponent,
            AppShrink,
            PaymentManageMsg,
        }
    }
</script>

<style scoped>

</style>