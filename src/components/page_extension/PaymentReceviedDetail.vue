<template>
    <div class="PaymentReceviedDetail" style="margin-top: 10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属账单" prop="invoices">
                        <jump-select type="bill" v-model="rowData.invoices"></jump-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="回款账户" prop="account">
                        <jump-select type="bill" v-model="rowData.invoices"></jump-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="回款金额" prop="amount">
                        <el-input v-model="form.amount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="回款日期" prop="received_date">
                        <el-date-picker v-model="form.received_date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import JumpSelect from "@/components/form/JumpSelect";

    export default {
        name: "PaymentReceviedDetail",
        data() {
            return {
                rules:{
                    invoice_id:[
                        {required:true,message:"请选择所属账单"},
                    ],
                    account_id:[
                        {required:true,message:"请选择回款账户"},
                    ],
                    amount:[
                        {required:true,message:"请输入回款金额",trigger:"blur"},
                        // {type:"number",message:"回款金额必须为数字",trigger:"blur"}
                    ],
                    received_date:[
                        {required:true,message:"请选择回款日期",trigger:"blur"},
                    ]
                },
                form:{
                    invoices:{
                        name:"测试",
                        id:1
                    },
                    account:{
                        name:"回款账户",
                        id:1
                    },
                    received_date:""
                }
            }
        },
        props: {
            rowData: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods:{
            submitForm(){
                this.$refs['form'].validate((valid)=>{
                    if(valid){
                        console.log("验证成功")
                    }
                })
            }
        },
        components: {
            JumpSelect,
        }
    }
</script>

<style scoped>

</style>