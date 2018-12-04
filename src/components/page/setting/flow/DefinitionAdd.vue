<!-- 新增费用类型 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-form-item label="案件类型" prop="project_type">
                <static-select type="project_type" v-model="form.project_type"></static-select>
            </el-form-item>
            <el-form-item label="管制事项名称" prop="name">
                <el-input type="text" placeholder="请输入管制事项名称" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="默认流程" prop="default_flow">
                <static-select type="flows" v-model="form.default_flow"></static-select>
            </el-form-item>
            <el-form-item label="管制事项描述" prop="description">
                <el-input type="text" placeholder="请输入管制事项描述" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="默认期限" prop="default_period">
                <el-input type="text" placeholder="请输入默认期限" v-model="form.default_period"></el-input>
            </el-form-item>
            <el-form-item label="是否法限" prop="is_deadline">
                <app-switch type="is" placeholder="请选择是否有法限" v-model="form.is_deadline"></app-switch>
            </el-form-item>
            <el-form-item label="案件阶段" prop="project_stage">
                <static-select type="project_stage_patent" v-model="form.project_stage"></static-select>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input type="text" placeholder="请输入排序" v-model="form.sort"></el-input>
            </el-form-item>
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
                URL: "/definitions",
                form: {
                    project_type: "专利",
                    name: "",
                    description: "",
                    default_period: "",
                    is_deadline: "",
                    default_flow: "",
                    sort: "",
                    project_stage:'',
                },
                rules: {
                    project_type: [
                        {required: true, message: "请选择案件类型", trigger: "blur"}
                    ],
                    name: [
                        {required: true, message: "请输入费用名称", trigger: "blur"}
                    ],
                    default_flow: [
                        {required: true, message: "请选择默认流程", trigger: "blur"}
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
            AppSwitch,
        },
    }
</script>

<style scoped>

</style>