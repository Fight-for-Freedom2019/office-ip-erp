<!-- 请款管理 费用明细 -->
<template>
    <div class="PaymentCostDetail">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @getRowData = "getRowData"
                         @refreshTableData="refreshTableData"></table-component>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" :modal="false">
            <table-component :tableOption="feeDetailOption" :data="feesDetail"></table-component>
        </el-dialog>
    </div>



</template>

<script>
    import TableComponent from '@/components/common/TableComponent'

    export default {
        name: "PaymentCostDetail",
        data() {
            return {
                tableOption: {
                    'name': 'PaymentCostDetailList',
                    'url': "",
                    'height': 396,
                    'highlightCurrentRow': true,
                    'is_search': false,
                    // 'rowClick': this.handleRowClick,
                    'header_btn': [
                        // {type: 'add'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '客户', prop: 'customer.name', min_width: '178'},
                        {type: 'text', label: '案号', prop: 'project.serial', width: '120'},
                        {type: 'text', label: '标题', prop: 'project.title', width: '150'},
                        {type: 'text', label: '申请国家', prop: 'project.area', width: '180'},
                        {type: 'text', label: '订单号', prop: 'order.serial', width: '120'},
                        {type: 'text', label: '申请号', prop: 'application_number', width: '120'},
                        {type: 'text', label: '申请日', prop: 'application_date', width: '100'},
                        {type: 'text-btn', label: '官费', prop: 'official_fee', width: '150',click:this.checkFeeDetail},
                        {type: 'text-btn', label: '代理费', prop: 'service_fee', width: '150',click:this.checkFeeDetail},
                        {type: 'text', label: '费用策略', prop: 'policy', width: '150'},
                        {type: 'text', label: '官费票据', prop: 'official_voucher', width: '150'},
                        {type: 'text', label: '代理费票据', prop: 'serfice_voucher', width: '150'},
                    ],
                },
                feeDetailOption:{
                    'name': 'feeDetailList',
                    'url': "",
                    'height': 396,
                    'highlightCurrentRow': true,
                    'is_search': false,
                    'is_footer':true,
                    // 'rowClick': this.handleRowClick,
                    'header_btn': [
                        // {type: 'add'},
                    ],
                    'columns': [
                        // {type: 'selection'},
                        {type: 'text', label: '费用名称', prop: 'fee_code.name', min_width: '178'},
                        {type: 'text', label: '费用类型', prop: 'fee_code.fee_type', width: '120'},
                        {type: 'text', label: '金额', prop: 'amount', width: '150'},
                        {type: 'text', label: '币别', prop: 'currency', width: '180'},
                        {type: 'text', label: '汇率', prop: 'roe', width: '120'},
                        {type: 'text', label: '人民币', prop: 'rmb_amount', width: '120'},
                        {type: 'text', label: '费用状态', prop: 'status', width: '100'},
                        {type: 'text', label: '备注', prop: 'remark', width: '150'},
                    ],
                },
                /*tableData: [
                    {
                        customer:{
                            name:"红坚果",
                            id:1,
                        },
                        project:{
                            serial:"BF14521",
                            title:"测试的",
                            area:"CN",
                        },
                        order:{
                            serial:"155414144",
                        },
                        id:1,
                        application_number:"201810315848541",
                        application_date:"2018-10-31",
                        official_fee:325412,
                        service_fee:1214214,
                        policy:"",
                        official_voucher:"",
                        serfice_voucher:"",
                    },
                    {
                        customer:{
                            name:"腾讯视频",
                            id:2,
                        },
                        project:{
                            serial:"BF11231",
                            title:"测试的哦",
                            area:"CN",
                        },
                        order:{
                            serial:"6453654",
                        },
                        id:2,
                        application_number:"201810315848541",
                        application_date:"2018-10-31",
                        official_fee:325412,
                        service_fee:1214214,
                        policy:"",
                        official_voucher:"",
                        serfice_voucher:"",
                    }
                ],*/
                tableData:[],
                /*feesDetail:[
                    {
                        fee_code:{
                            name:"钱",
                            fee_type:"官费"
                        },
                        amount:20000,
                        currency:"$",
                        roe:0.89,
                        rmb_amount:30000,
                        status:"待审核",
                        remark:"备注了",
                    }
                ],  //费用明细*/
                feesDetail:[],
                title:"官费明细",   // 弹窗title
                dialogFormVisible:false,
            }
        },
        props:{
            type:{
                type:String,
                default(){
                    return ""
                }
            },
            data:Array,
        },
        created(){
            if(!this.type){
                Array.shift(this.tableOption.columns);
            }else {
                this.tableOption.is_pagination = false;
                this.tableOption.is_footer = true;
                this.tableOption.footer_btn = [
                    {
                        type:"verify"
                    }
                ]
            }
        },
        methods: {
            refreshTableData(option) {
            },
            checkFeeDetail(row,e,col){
                this.dialogFormVisible = true;
                col.label === "官费"? this.title="官费明细":this.title="代理费明细";
                if(col.label === "官费"){
                    this.feesDetail = row.official_fee.list;
                }else {
                    this.feesDetail = row.agency_fee.list;
                }
            },
            getRowData(data){
                this.$emit("getRowData",data);
            },
        },
        components: {
            TableComponent,
        }
    }
</script>

<style scoped>

</style>