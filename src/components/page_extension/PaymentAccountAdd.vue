<!-- 新增开票信息 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="账户类型" prop="account_type">
                        <static-select type="account_type" v-model="form.account_type"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账户简称" prop="abbr">
                        <el-input type="text" placeholder="请输入账户简称" v-model="form.abbr"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="开户行" prop="bank">
                        <el-input type="text" placeholder="请输入开户行" v-model="form.bank"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收款人" prop="receipt">
                        <el-input type="text" placeholder="请输入收款人" v-model="form.receipt"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="收款账号" prop="account">
                        <el-input type="text" v-model="form.account" placeholder="请输入收款账号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="排序" prop="sort">
                        <el-input type="text" placeholder="请输入排序" v-model.number="form.sort"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="付款信息" prop="payment_info">
                        <el-input type="textarea" placeholder="请输入付款信息" v-model="form.payment_info"></el-input>
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

    export default {
        name: "PaymentAccountAdd",
        data() {
            return {
                URL: "/payment_accounts",
                form: {
                    account_type: "",
                    abbr: "",
                    bank: "",
                    receipt: "",
                    account: "",
                    sort: "",
                    payment_info: "",
                },
                rules: {
                    account_type: [
                        {required: true, message: "请选择账户类型", trigger: "blur"}
                    ],
                    abbr: [
                        {required: true, message: "请输入账户简称", trigger: "blur"}
                    ],
                    bank: [
                        {required: false, message: "请输入开户行", trigger: "blur"}
                    ],
                    receipt: [
                        {required: true, message: "请输入收款人", trigger: "blur"}
                    ],
                    account: [
                        {required: true, message: "请输入收款账号", trigger: "blur"}
                    ],
                    sort: [
                        {required: true, message: "请输入排序", trigger: "blur"},
                        {type: "number", message: "请输入数字", trigger: "blur"},
                    ]
                },
            }
        },
        props: {
            data: Object,
            type: String,
        },
        mounted() {
            this.coverObj(this.data);
        },
        watch: {
            data: function (val, oldVal) {
                this.coverObj(val);
            },
            "form.account_type": function (val, oldVal) {
                val === 1 ? this.rules.bank[0].required = true : this.rules.bank[0].required = false;
            }
        },
        methods: {
            submitForm(type, id) {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let url;
                        let data;
                        let msg;
                        let fun;
                        if (type === "add") {
                            url = this.URL;
                            data = this.form;
                            msg = "创建";
                            fun = "refresh"
                        } else {
                            url = `${this.URL}/${id}`;
                            data = this.form;
                            msg = "修改";
                            fun = "update"
                        }
                        const success = _ => {
                            this.$message({type: "success", message: `${msg}成功!`});
                            this.$emit(fun);
                        };
                        type === "add" ? this.$axiosPost({url, data, success}) : this.$axiosPut({url, data, success})
                    } else {
                        this.$message({type: "warning", message: "请正确填写"});
                    }
                })
            },
            clear(){
                this.$refs.form.resetFields();
            },
            coverObj(val){
                val?this.$tool.coverObj(this.form,val):"";
            },
        },
        components: {
            RemoteSelect,
            JumpSelect,
            StaticSelect,
        },
    }
</script>

<style scoped>

</style>