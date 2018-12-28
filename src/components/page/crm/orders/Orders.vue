<!-- 订单管理 -->
<template>
    <div class="Orders">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @refresh="refresh" @update="update"
                         @refreshTableData="refreshTableData"></table-component>
        <order-detail type="pay" ref="detail" @update="update"></order-detail>
        <app-shrink :visible.sync="visibleOrderAdd" :modal='false' :title="orderAddTitle">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" @click="save('addDetail')">保存</el-button>
            </span>
            <order-list-add ref="addDetail" :rowData="row" :id="rowID" @refresh="refresh" @closeVisible="closeVisible"></order-list-add>
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
    import OrderDetail from '@/components/page/crm/orders/OrderDetail'
    import OrderListAdd from '@/components/page/crm/orders/OrderListAdd'
    import Config from "@/const/selectConfig"
    import FeeManage from '@/mixins/fee-manage'

    const config = new Map(Config);
    const status = [
        [1,"audit"],
        [3,"audit"],
        [8,"remind"],
        [11,"upload"],
        [12,"confirm"],
    ];
    const URL = "/orders"
    const statusMap = new Map(status);
    export default {
        name: "Orders",
        mixins:[FeeManage(statusMap)],
        data() {
            return {
                tableData: [],
                paymentDialog:false,
                tableOption: {
                    'name': 'OrdersList',
                    'url': URL,
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    // 'is_list_filter': true,
                    'list_type': 'orders',
                    'treeFilter': 'orders',
                    'rowClick': this.handleRowClick,
                    'search_placeholder': '搜索客户名称、订单号码',
                    'header_btn': [
                        // {type: 'export'},
                        {type: 'add',click:this.add},
                        {type: 'delete'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '订单号', prop: 'serial', min_width: '120'},
                        {type: 'text', label: '客户名称', prop: 'customer', render_simple:"name", min_width: '178', render_header: true},
                        {type: 'text', label: '联系人', prop: 'contact', render_simple:"name", min_width: '110', render_header: true},
                        {type: 'text', label: '销售', prop: 'sales' ,render_simple:"name",render_header: true, min_width: '110'},
                        {type: 'text', label: '交付期限', prop: 'delivery_date', min_width: '110',render_header: true},
                        {type: 'text', label: '订单状态', prop: 'status',render_simple:'name', min_width: '110',render_header:true},
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
                orderAddTitle:"新增",
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
                this.$refs.detail.show(row.id,'edit');
            },
            refreshTableData(data) {
                const url = this.URL;
                const success = _ => {
                    this.tableData = _.data;
                };
                this.$axiosGet({url, data, success})
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
            OrderDetail,
            OrderListAdd,
        }
    }
</script>

<style scoped>

</style>