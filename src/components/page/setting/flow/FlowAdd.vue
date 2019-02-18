<!-- 新增费用类型 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="流程名称" prop="name">
                        <el-input type="text" placeholder="请输入流程名称" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="流程描述" prop="description">
                        <el-input type="text" placeholder="请输入流程描述" v-model="form.description"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="案件类型" prop="project_type">
                        <static-select type="project_type" v-model="form.project_type"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="排序" prop="sort">
                        <el-input type="text" placeholder="请输入排序" v-model="form.sort"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div v-if="this.type == 'edit'">
            <flow-action-detail :id="data.id"></flow-action-detail>
        </div>
    </div>
</template>

<script>
    import RemoteSelect from "@/components/form/RemoteSelect";
    import StaticSelect from "@/components/form/StaticSelect";
    import AppSwitch from "@/components/form/AppSwitch";
    import FlowActionDetail from "@/components/page/setting/flow/FlowActions";

    export default {
        name: "FlowActions",
        data() {
            return {
                URL: "/flows",
                form: {
                    project_type: "专利",
                    subtype: 1,
                    fee_type: 3,
                    name: "",
                    currency: "",
                    amount: "",
                    sort: "",
                    status:'',
                    alias:'',
                    remark:'',
                },
                rules: {
                    name: [
                        {required: true, message: "请输入费用名称", trigger: "blur"}
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
            FlowActionDetail,
        },
    }
</script>

<style scoped>

</style>