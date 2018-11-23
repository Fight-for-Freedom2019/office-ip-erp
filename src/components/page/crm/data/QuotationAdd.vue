<!-- 新增报价代码 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="160px" :model="form" :rules="rules" ref="form">
            <el-form-item label="报价对象" prop="user">
                <remote-select type="users" v-model="form.user"></remote-select>
            </el-form-item>

            <el-form-item label="服务项目" prop="service">
                <static-select type="services" v-model="form.service"></static-select>
            </el-form-item>

            <el-form-item label="报价" prop="price">
                <el-input type="text" placeholder="请输入报价" v-model="form.price"></el-input>
            </el-form-item>

            <el-form-item label="备注" prop="remark">
                <el-input type="text" placeholder="请输入备注" v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import RemoteSelect from "@/components/form/RemoteSelect";
    import StaticSelect from "@/components/form/StaticSelect";

    export default {
        name: "QuotationAdd",
        data() {
            return {
                URL: "/quotations",
                form: {
                    user: "",
                    service: "",
                    price: "",
                    remark: "",
                },
                rules: {
                    user: [
                        {required: true, message: "请选择报价对象", trigger: "blur"}
                    ],
                    service: [
                        {required: true, message: "请选择服务项目", trigger: "blur"}
                    ],
                    price: [
                        {required: true, message: "请输入报价", trigger: "blur"}
                    ],
                    remark: [
                        {required: false, message: "备注", trigger: "blur"}
                    ],
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
                val?this.$tool.coverObj(this.form,val,{obj:['user','service']}):"";
            },
        },
        components: {
            RemoteSelect,
            StaticSelect,
        },
    }
</script>

<style scoped>

</style>