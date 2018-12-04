<!-- 新增文件类型代码 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="160px" :model="form" :rules="rules" ref="form">
            <el-form-item label="案件类型" prop="project_type">
                <static-select type="project_type" v-model="form.project_type"></static-select>
            </el-form-item>

            <el-form-item label="文件类型" prop="category">
                <static-select type="file_type_category" v-model="form.category"></static-select>
            </el-form-item>

            <el-form-item label="文件类型名称" prop="name">
                <el-input type="text" placeholder="请输入文件类型名称" v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="文件类型简称" prop="abbr">
                <el-input type="text" placeholder="请输入文件类型简称" v-model="form.abbr"></el-input>
            </el-form-item>

            <el-form-item label="上传后案件阶段" prop="project_stage">
                <static-select type="project_stage" v-model="form.project_stage"></static-select>
            </el-form-item>

            <el-form-item label="上传触发管制事项" prop="process_definition">
                <static-select type="process_definition" v-model="form.process_definition"></static-select>
            </el-form-item>

            <el-form-item label="上传时填写字段" prop="fields" v-if="form.category == 1">
                <el-input type="text" placeholder="请输入字段" v-model="form.fields"></el-input>
            </el-form-item>

            <el-form-item label="上传时执行逻辑" prop="behavior">
                <el-input type="text" placeholder="请输入上传文件时执行的逻辑" v-model="form.behavior"></el-input>
            </el-form-item>

            <el-form-item label="排序" prop="sort">
                <el-input type="text" placeholder="请输入上文件类型排序" v-model="form.sort"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import RemoteSelect from "@/components/form/RemoteSelect";
    import StaticSelect from "@/components/form/StaticSelect";

    export default {
        name: "FileTypeAdd",
        data() {
            return {
                URL: "/file_types",
                form: {
                    project_type: '专利',
                    category: 1,
                    name: "",
                    abbr: "",
                    project_stage: "",
                    fields: "",
                    behavior: "",
                    sort: "",
                    process_definition:'',
                },
                rules: {
                    project_type: [
                        {required: true, message: "请选择案件类型", trigger: "blur"}
                    ],
                    category: [
                        {required: true, message: "请选择文件类型", trigger: "blur"}
                    ],
                    name: [
                        {required: true, message: "请输入文件类型名称", trigger: "blur"}
                    ],
                    abbr: [
                        {required: false, message: "请输入文件类型简称", trigger: "blur"}
                    ],
                    project_stage: [
                        {required: false, message: "请选择案件阶段", trigger: "blur"}
                    ],
                    process_definition: [
                        {required: false, message: "请选择触发的管制事项", trigger: "blur"}
                    ],
                    fields: [
                        {required: false, message: "请输入表单字段", trigger: "blur"}
                    ],
                    behavior: [
                        {required: false, message: "请输入上传文件时执行的逻辑", trigger: "blur"}
                    ],
                    sort: [
                        {required: false, message: "请输入排序", trigger: "blur"},
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
                val?this.$tool.coverObj(this.form,val,{obj:['project_type','project_stage','category']}):"";
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