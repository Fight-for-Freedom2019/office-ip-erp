<!-- 新增流程节点类型 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="字段名称" prop="name">
                        <el-input type="text" placeholder="请输入字段标签" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="字段key" prop="key">
                        <el-input type="text" placeholder="请输入字段key" v-model="form.key"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="字段类型" prop="field_type">
                        <static-select type="field_type" placeholder="请输入字段类型" v-model="form.field_type"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="占位符" prop="placeholder">
                        <el-input type="text" placeholder="请输入占位符" v-model="form.placeholder"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row>
                <el-col :span="24">
                    <el-form-item label="验证规则" prop="rules">
                        <el-input type="text" placeholder="请输入验证规则" v-model="form.rules"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->
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
                URL: "/fields",
                form: {
                    name: "",
                    key: "",
                    field_type: "",
                    placeholder: "",
                    // rules: "",
                },
                rules: {
                    name: {required: true, message: "请输入字段标签", trigger: "blur"},
                    key: {required: true, message: "请输入字段名称", trigger: "blur"},
                    field_type: {required: true, message: "请输入字段类型", trigger: "blur"},
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
                val?this.$tool.coverObj(this.form,val,{obj:['field_type']}):"";
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