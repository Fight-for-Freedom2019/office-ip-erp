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
                           @click="submitCommon(rowID,'/submit','提交审核')">提交审核</el-button>
                <el-button type="primary" size="small" v-if="bill_status === 'remind'">邮件提醒</el-button>
                <!--<el-button type="" size="small">退回修改</el-button>-->
            </span>
            <payment-manage-detail ref="detail" :id="rowID" @update="update" :rowData="row"></payment-manage-detail>
        </app-shrink> 
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import PaymentManageDetail from '@/components/page_extension/PaymentManageDetail'
    import Config from "@/const/selectConfig"
    import FeeManage from '@/mixins/fee-manage'

    const config = new Map(Config);
    const status = [
        [0,"audit"],
        [8,"remind"],
    ];
    const statusMap = new Map(status);
    export default {
        name: "PaymentManage",
        mixins:[FeeManage(statusMap)],
        data() {
            return {
                tableData: [],
                tableOption: {
                    'name': 'PaymentManageList',
                    'url': this.URL,
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
                        {type: 'text', label: '回款确认用户', prop: 'confirmation_user', width: '150', render_header: true},
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
                        /*{
                            type: 'text', label: '快递单号', prop: 'express', width: '150', render: (h, item) => {
                                return h("span", item ? item.serial : "")
                            }
                        },
                        {type: 'text', label: '寄件时间', prop: 'express.date', width: '150'},*/
                        {type: 'text', label: '备注', prop: 'remark', width: '150'},
                    ],
                },
                is_deleted: 0,
                URL:"/invoices",
                d_URL:"/invoices_delete",
            }
        },
        components: {
            TableComponent,
            AppShrink,
            PaymentManageDetail,
        }
    }
</script>

<style scoped>

</style>