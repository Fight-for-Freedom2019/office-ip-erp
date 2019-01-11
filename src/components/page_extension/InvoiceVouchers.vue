<!-- 账单发票 -->
<template>
    <div class="InvoiceVouchers">
        <table-component :tableOption="tableOption" :data="tableData" ref="table"
                         @refreshTableData="refreshTableData"></table-component>
        <invoice-manage-detail ref="voucher" :invoice="invoice" @update="update" @refresh="refresh"></invoice-manage-detail>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import JumpSelect from '@/components/form/JumpSelect'
    import InvoiceManageDetail from '@/components/page_extension/InvoiceManageDetail'

    export default {
        name: "InvoiceVouchers",
        data() {
            return {
                tableOption: {
                    'name': 'InvoiceVouchersList',
                    'url': "",
                    'height': 356,
                    'is_pagination':false,
                    'highlightCurrentRow': true,
                    'is_search': false,
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add',click:this.applyVoucher},
                    ],
                    'columns': [
                        // {type: 'selection'},
                        {type: 'text', label: '发票号', prop: 'serial', width: '120',render_header:true},
                        {type: 'text', label: '客户/供应商', prop: 'customer', width: '150',render_simple:"name",render_header:true},
                        // {type: 'text', label: '关联账单', prop: 'invoice',render_simple:"serial", width: '120',render_header:true},
                        {type: 'text', label: '发票抬头', prop: 'invoice_target',render_simple:"name", min_width: '150',render_header:true},
                        {type: 'text', label: '金额', prop: 'amount', width: '100', render_header:true},
                        {type: 'text', label: '状态', prop: 'status',render_simple:"name", min_width: '120',render_header:true},
                        {type: 'text', label: '税务票号', prop: 'tax_no', min_width: '120',render_header:true},
                        {type: 'text', label: '备注', prop: 'remark', width: '120',render_header:true},
                    ],
                },
                URL:"/received_payments",
                form:{
                    payment_account: "",
                    amount: "",
                    received_date: "",
                    remark: "",
                },
                rules:{
                    payment_account:[
                        {required:true,message:"请选择回款账户"},
                    ],
                    amount:[
                        {required:true,message:"请输入回款金额",trigger:"blur"},
                    ],
                    received_date:[
                        {required:true,message:"请选择回款日期",trigger:"blur"},
                    ]
                },
                tableData: [],
                title:"新增账单发票",   // 弹窗title
                dialogFormVisible:false,
            }
        },
        props:{
            data:Array,
            id: {
                type: [String, Number],
                default() {
                    return ""
                },
            },
            invoice:Object,
        },
        methods: {
            refreshTableData(option) {
                const url = `/vouchers`;
                const data = {invoice:this.id};
                const success = _ =>{
                    this.tableData = _.data;
                };
                this.$axiosGet({url,data,success})
            },
            handleRowClick(row) {
                this.$refs.voucher.show(row.id,'edit',this.invoice);
            },
            applyVoucher(){
                this.$refs.voucher.show(0,'add',this.invoice);
            },
            closeDialog(){
                this.dialogFormVisible = false;
                this.clear();
            },
            refreshData(){
                this.tableData = this.$tool.deepCopy(this.data);
            },
            submitForm(){
                this.$refs['form'].validate((valid)=>{
                    if(valid){
                        let url = this.URL;
                        let data = Object.assign({},this.form);
                        data.invoice = this.id;
                        const success = _ =>{
                            this.$message({type:"success",message:"添加账单发票成功"});
                            this.dialogFormVisible = false;
                            this.refreshTableData();
                            this.clear();
                            this.$emit('received');
                        };
                        this.$axiosPost({url,data,success});
                    }else {
                        this.$message({type:"warning",message:"请正确填写"});
                    }
                })
            },
            clear(){
                this.$refs.form.resetFields();
            },
            refresh() {
                this.refreshTableData();
            },
            update() {
                this.refreshTableData();
            }
        },
        watch:{
            data:function (val,oldVal) {
                this.tableData = val;
            }
        },
        components: {
            TableComponent,
            JumpSelect,
            InvoiceManageDetail,
        },
    }
</script>

<style scoped>

</style>