<!-- 新增费用代码 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="案件类型" prop="category">
                        <static-select type="category" v-model="form.category"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="子类型" prop="subtype">
                        <static-select type="subtype" v-model="form.subtype"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="费用类型" prop="fee_type">
                        <static-select type="fee_type" v-model="form.fee_type"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="费用名称" prop="name">
                        <el-input type="text" placeholder="请输入费用名称" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="货币" prop="currency">
                        <static-select type="currency" v-model="form.currency"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="金额" prop="amount">
                        <el-input type="text" placeholder="请输入金额" v-model="form.amount"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="排序" prop="sort">
                        <el-input type="text" placeholder="请输入排序" v-model="form.sort"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="状态" prop="status">
                        <static-select type="status" v-model="form.status"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="英文名" prop="alias">
                        <el-input type="text" placeholder="请输入英文名" v-model="form.alias"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="text" placeholder="请输入备注" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import RemoteSelect from "@/components/form/RemoteSelect";
    import StaticSelect from "@/components/form/StaticSelect";
    import AppSwitch from "@/components/form/AppSwitch";

    export default {
        name: "FeeCodeAdd",
        data() {
            return {
                URL: "/fee_codes",
                form: {
                    category: "",
                    subtype: "",
                    fee_type: "",
                    name: "",
                    currency: "",
                    amount: "",
                    sort: "",
                    status:'',
                    alias:'',
                    remark:'',
                },
                rules: {
                    category: [
                        {required: true, message: "请选择案件类型", trigger: "blur"}
                    ],
                    subtype: [
                        {required: true, message: "请选择案件子类型", trigger: "blur"}
                    ],
                    fee_type: [
                        {required: false, message: "请选择费用类型", trigger: "blur"}
                    ],
                    name: [
                        {required: true, message: "请输入费用名称", trigger: "blur"}
                    ],
                    currency: [
                        {required: true, message: "请选择货币", trigger: "blur"}
                    ],
                    amount: [
                        {required: true, message: "请输入金额", trigger: "blur"}
                    ],
                    sort: [
                        {required: true, message: "请输入排序", trigger: "blur"},
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
            StaticSelect,
            AppSwitch,
        },
    }
</script>

<style scoped>

</style>