<!-- 编辑用户系数 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">

            <el-form-item label="中文案系数" prop="cn_ratio">
                <el-input type="text" v-model="form.cn_ratio"></el-input>
            </el-form-item>

            <el-form-item label="涉外案系数" prop="foreign_ratio">
                <el-input type="text" v-model="form.foreign_ratio"></el-input>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import RemoteSelect from "@/components/form/RemoteSelect";
    import StaticSelect from "@/components/form/StaticSelect";
    import AppSwitch from "@/components/form/AppSwitch";

    export default {
        name: "UserRatioAdd",
        data() {
            return {
                URL: "/users",
                form: {
                    cn_ratio: "",
                    foreign_ratio: "",
                },
                rules: {
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