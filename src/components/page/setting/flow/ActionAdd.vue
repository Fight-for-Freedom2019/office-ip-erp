<!-- 新增流程节点类型 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="流程节点名称" prop="name">
                        <el-input type="text" placeholder="请输入流程节点名称" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="创建阶段" prop="creation_process_stage">
                        <static-select type="process_stage" v-model="form.creation_process_stage"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="完成阶段" prop="completion_process_stage">
                        <static-select type="process_stage" v-model="form.completion_process_stage"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="创建邮件模板" prop="creation_template">
                        <static-select type="mail_template" v-model="form.creation_template"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="完成邮件模板" prop="completion_template">
                        <static-select type="mail_template" v-model="form.completion_template"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="节点创建逻辑" prop="creation_logic">
                        <el-input type="text" placeholder="请输入节点创建逻辑" v-model="form.creation_logic"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="节点完成逻辑" prop="completion_logic">
                        <el-input type="text" placeholder="请输入节点完成逻辑" v-model="form.completion_logic"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="节点通过逻辑" prop="pass_logic">
                        <el-input type="text" placeholder="请输入节点审核通过逻辑" v-model="form.pass_logic"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="节点驳回逻辑" prop="rejection_logic">
                        <el-input type="text" placeholder="请输入节点审核驳回逻辑" v-model="form.rejection_logic"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="自动完成节点" prop="is_auto_complete">
                        <app-switch type="status" placeholder="" v-model="form.is_auto_complete"></app-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="审核节点" prop="is_review_action">
                        <app-switch type="status" placeholder="" v-model="form.is_review_action"></app-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="表单" prop="form">
                        <static-select type="form" v-model="form.form"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="排序" prop="sort">
                        <el-input type="text" placeholder="请输入排序" v-model="form.sort"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
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
        name: "ActionAdd",
        data() {
            return {
                URL: "/actions",
                form: {
                    name: "",
                    creation_process_stage: '',
                    completion_process_stage: '',
                    creation_template: "",
                    completion_template: "",
                    creation_logic: "",
                    completion_logic:'',
                    pass_logic:'',
                    rejection_logic:'',
                    is_auto_complete:'',
                    is_review_action:'',
                    form:'',
                    sort:'',
                    remark:'',
                },
                rules: {
                    name: [
                        {required: true, message: "请输入流程节点名称", trigger: "blur"}
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
                val?this.$tool.coverObj(this.form,val,{obj:['creation_template','completion_template','creation_process_stage','completion_process_stage']}):"";
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