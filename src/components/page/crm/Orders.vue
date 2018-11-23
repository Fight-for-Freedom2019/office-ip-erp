<!-- 订单管理 -->
<template>
    <div class="Orders">
        <!-- TODO 数据要改 -->
        <table-component :tableOption="tableOption" :data="tableData1.array" ref="table" @refresh="refresh" @update="update"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" @click="save">保存</el-button>
                <el-button type="danger" :disabled="is_disabled" size="small" @click="deleteBill">删除</el-button>
                <el-button type="primary" size="small" v-if="bill_status === 'audit'"
                           @click="submitCommon(rowID,'/submit','提交审核')">提交审核</el-button>
                <el-button type="primary" size="small" v-if="bill_status === 'remind'">邮件提醒</el-button>
                <el-button type="primary" size="small" v-if="bill_status === 'upload'" @click="submitCommon(rowID,'/add_to_payment_plan','提交付款')">提交付款</el-button>
                <el-button type="primary" size="small" v-if="bill_status === 'confirm'" @click="confirm">确认付款</el-button>
                <!--<el-button type="" size="small">退回修改</el-button>-->
            </span>
            <order-manage-detail type="pay" ref="detail" :id="rowID" @update="update" :rowData="row"></order-manage-detail>
        </app-shrink>
        <app-shrink :visible.sync="visibleOrderAdd" :modal='false' :title="orderAddTitle">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" @click="save">保存</el-button>
            </span>
            <order-list-add :rowData="row" :id="rowID"></order-list-add>
        </app-shrink>
        <!--<el-dialog title="确认付款" :inline="true" :visible.sync="paymentDialog" width="40%">
            <el-form :rules="rules" v-model="form" label-width="100px" label-position="left" ref="form">
                <el-form-item label="付款时间" prop="date">
                    <el-date-picker value-format="yyyy-MM-dd" v-model="form.date"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="confirmPayment">确认</el-button>
                    <el-button @click="()=>{paymentDialog = false}">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>-->
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import OrderManageDetail from '@/components/page_extension/OrderManageDetail'
    import OrderListAdd from '@/components/page_extension/OrderListAdd'
    import Config from "@/const/selectConfig"
    import FeeManage from '@/mixins/fee-manage'

    const config = new Map(Config);
    const status = [
        [0,"audit"],
        [8,"remind"],
        [11,"upload"],
        [12,"confirm"],
    ];
    const statusMap = new Map(status);
    export default {
        name: "Orders",
        mixins:[FeeManage(statusMap)],
        data() {
            return {
                tableData1:this.$mock.mock({
                    "array|2-5":[
                        {
                            "id|+1":1,
                            "customer":{
                                "name":"@cname()"
                            },
                            "contact":{
                                "name":"@cname()"
                            },
                            "sales":"@cname()",
                            "delivery_date":"@date()",
                            "status|0-13":4,
                            "remark":"@csentence()",
                        }
                    ]
                }),
                tableData: [],
                paymentDialog:false,
                tableOption: {
                    'name': 'OrdersList',
                    'url': this.URL,
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    /*'is_list_filter': true,
                    'list_type': 'invoices',
                    'treeFilter': 'invoices',*/
                    'search_placeholder': '',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        // {type: 'export'},
                        {type: 'add',click:this.add},
                        {type: 'delete',click:this.deleteBill},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '客户名称', prop: 'customer', render_simple:"name",width: '178', render_header: true},
                        {type: 'text', label: '联系人', prop: 'contact', render_simple:"name", width: '120', render_header: true},
                        {type: 'text', label: '销售', prop: 'sales' ,render_header: true},
                        {type: 'text', label: '交付日期', prop: 'delivery_date', width: '180',render_header: true},
                        {type: 'text', label: '订单状态', prop: 'status', width: '120'},
                        {type: 'text', label: '备注', prop: 'remark', min_width: '120', render_header: true},
                    ],
                },
                is_deleted: 0,
                URL:"/orders",
                d_URL:"/orders",
                form:{
                    date:""
                },
                rules:{
                    date:[
                        {required:true,message:"请选择付款时间",trigger: 'blur' }
                    ]
                },
                visibleOrderAdd:false,
                orderAddTitle:"新增"
            }
        },
        methods:{
            confirm(){
                this.paymentDialog = true;
            },
            confirmPayment(){
                this.$refs.form.validate((valid)=>{
                    if(valid){

                    }
                });
            },
            add(){
                this.openVisible("visibleOrderAdd");
            },
            handleRowClick(row){
                this.openVisible("isPanelVisible");
                this.title = "订单详情";
                this.rowID = row.id;
                this.row = row;
            },
        },
        computed:{
            is_disabled(){
                return this.row?this.row.status===1?false:true:false;
            },
        },
        components: {
            TableComponent,
            AppShrink,
            OrderManageDetail,
            OrderListAdd,
        }
    }
</script>

<style scoped>

</style>