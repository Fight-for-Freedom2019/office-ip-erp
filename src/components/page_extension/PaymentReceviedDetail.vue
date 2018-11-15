<!-- 回款管理详情 -->
<template>
    <div class="PaymentReceviedDetail" style="margin-top: 10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="账单" prop="invoice">
                        <jump-select type="bill" v-model="form.invoice"></jump-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="回款账户" prop="payment_account">
                        <jump-select type="payment_accounts" v-model="form.payment_account"></jump-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="回款金额" prop="amount">
                        <el-input type="number" v-model="form.amount" placeholder="请输入回款金额"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="回款日期" prop="received_date">
                        <el-date-picker value-format="yyyy-MM-dd" v-model="form.received_date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
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
                URL:"/received_payments",
                rules:{
                    invoice:[
                        {required:true,message:"请选择所属账单",trigger:"blur"},
                    ],
                    payment_account:[
                        {required:true,message:"请选择回款账户",trigger:"blur"},
                    ],
                    amount:[
                        {required:true,message:"请输入回款金额",trigger:"blur"},
                    ],
                    received_date:[
                        {required:true,message:"请选择回款日期",trigger:"blur"},
                    ]
                },
                form:{
                    payment_account: "",
                    amount: "",
                    creator_user_id: "",
                    creator_user_user: "",
                    id: "",
                    invoice: "",
                    received_date: "",
                    remark: "",
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
            submitForm(type,id){   // type是父组件传来的,表示是add还是edit,id表示修改的某一行数据的id
                this.$refs['form'].validate((valid)=>{
                    if(valid){
                        let url;
                        let message = "";
                        let fun="";
                        let data = this.form;
                        if(type === "add"){
                            url = this.URL;
                            message = "添加";
                            fun = "refresh";
                        }else {
                            url = `${this.URL}/${id}`;
                            message = "修改";
                            fun = "update";
                        }
                        const success = _ =>{
                            this.$message({type:"success",message:`${message}回款记录成功`});
                            this.$emit(fun);
                        };
                        type === "add" ? this.$axiosPost({url,data,success}):this.$axiosPut({url,data,success});
                    }else {
                        this.$message({type:"warning",message:"请正确填写"});
                    }
                })
            },
            clear(){
                this.$refs.form.resetFields();
            },
            coverObj(val){
                val?this.$tool.coverObj(this.form,val,{obj:["invoice","payment_account"]}):"";
            }
        },

        watch:{
            rowData:function (val,oldVal) {
                this.coverObj(val);
            }
        },
        mounted(){
            this.coverObj(this.rowData);
        },
        components: {
            JumpSelect,
        }
    }
</script>

<style scoped>

</style>