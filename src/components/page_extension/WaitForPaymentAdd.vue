<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="选择客户" prop="customer">
                        <remote-select type="customer" :pageType="type" v-model="form.customer"></remote-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="选择案件" prop="project">
                        <jump-select type="project" :pageType="type" v-model="form.project"></jump-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="币别" prop="currency">
                        <static-select type="currency" v-model="form.currency"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="汇率" prop="roe">
                        <el-input type="text" placeholder="请输入汇率" v-model="form.roe"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="金额" prop="amount">
                        <el-input type="text" v-model="form.amount" placeholder="请输入金额"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="国家" prop="citizenship">
                        <static-select type="area" v-model="form.citizenship"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="付款时间" prop="payment_time">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="请选择时间" v-model="form.payment_time"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="最后期限" prop="deadline">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="请选择时间" v-model="form.deadline"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="官方绝限" prop="due_time">
                        <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="请选择时间" v-model="form.due_time"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="费用状态" prop="fee_code_id">
                        <static-select type="fee_status" v-model="form.status"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" placeholder="请填写备注" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import RemoteSelect from "@/components/form/RemoteSelect";
    import JumpSelect from "@/components/form/JumpSelect";
    import StaticSelect from "@/components/form/StaticSelect";
    import FeeStatus from "@/components/form/FeeStatus";

    export default {
        name: "WaitForPaymentAdd",
        data() {
            return {
                URL: "/fees",
                form: {
                    customer: "",
                    invoice: "",
                    project: "",
                    currency: "",
                    roe: "",
                    amount: "",
                    citizenship: "",
                    payment_time: "",
                    deadline: "",
                    due_time: "",
                    status: "",
                    order_id: "",
                },
                rules: {
                    customer: [
                        {required: true, message: "请选择客户", trigger: "blur"}
                    ],
                    roe:[
                        {required:true,message:"汇率不能为空!", trigger: "blur"}
                    ],
                    due_time:[
                        {required:true,message:"官方绝限不能为空!", trigger: "blur"}
                    ],
                    project:[
                        {required:true,message:"请选择案件", trigger: "blur"}
                    ],
                },
                type: "add",
            }
        },
        props:{
            rowData:{
                type:Object,
            }
        },
        methods: {
            save(type,id) {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let url;
                        let message;
                        let fun;
                        let data = {
                            "project_id": this.form.project,
                            "user_id": this.form.customer,
                            "invoice_id": this.form.invoice.id,
                            "remark": this.form.remark,
                            "status": this.form.status,
                            "payment_time": this.form.payment_time,
                            "amount": this.form.amount,
                            "currency": this.form.currency,
                            "roe": this.form.roe,
                            "fee_code_id": this.form.fee_code_id,
                            "deadline": this.form.deadline,
                            "order_id": this.form.order_id,
                            "is_debit": 1,
                            "due_time": this.form.due_time,
                        };
                        if (type === "add"){
                            url = this.URL;
                            message = "创建";
                            fun = "update";
                        } else {
                            url = `${this.URL}/${id}`;
                            message = "修改";
                            fun = "refresh";
                        }

                        let success = _ => {
                            this.$message({type: "success", message: `${message}费用成功!`});
                            this.$emit(fun);
                        };
                        type === "add" ? this.$axiosPost({url, data, success}):this.$axiosPut({url, data, success});
                    }

                })

            }
        },
        watch:{
            rowData:function (val,oldVal) {
                this.$tool.coverObj(this.form,val);
            }
        },
        created(){
            this.$tool.coverObj(this.form,this.rowData);
        },
        components: {
            RemoteSelect,
            JumpSelect,
            StaticSelect,
            FeeStatus
        }
    }
</script>

<style scoped>

</style>