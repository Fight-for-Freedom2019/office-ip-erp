<!-- 新增案件阶段代码 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-form-item label="案件类型" prop="project_type">
                <static-select type="project_type" v-model="form.project_type"></static-select>
            </el-form-item>

            <el-form-item label="文件类型名称" prop="name">
                <el-input type="text" placeholder="请输入文件类型名称" v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="排序" prop="sort">
                <el-input type="text" placeholder="请输入上文件类型排序" v-model="form.sort"></el-input>
            </el-form-item>

            <el-form-item label="备注" prop="behavior">
                <el-input type="text" placeholder="请输入备注" v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import RemoteSelect from "@/components/form/RemoteSelect";
    import StaticSelect from "@/components/form/StaticSelect";

    export default {
        name: "ProjectStageAdd",
        data() {
            return {
                URL: "/project_stages",
                form: {
                    project_type: "专利",
                    name: "",
                    sort: "",
                    remark: "",
                },
                rules: {
                    project_type: [
                        {required: true, message: "请选择案件类型", trigger: "blur"}
                    ],
                    name: [
                        {required: true, message: "请输入案件阶段名称", trigger: "blur"}
                    ],
                    sort: [
                        {required: false, message: "请输入排序", trigger: "blur"},
                    ],
                    remark: [
                        {required: false, message: "请输入备注", trigger: "blur"}
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
                val?this.$tool.coverObj(this.form,val):"";
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