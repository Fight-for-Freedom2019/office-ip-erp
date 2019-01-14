<!-- 新增类服务类型 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="国家" prop="area">
                        <static-select type="area" v-model="form.area"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="案件类型" prop="project_type">
                        <static-select type="project_type" v-model="form.project_type"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="服务名称" prop="name">
                        <el-input type="text" placeholder="请输入服务名称" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="单价" prop="service_fee">
                        <el-input type="text" placeholder="请输入单价" v-model="form.service_fee"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="默认管制事项" prop="process_definition">
                      <remote-select type="definitions" v-model="form.process_definition"></remote-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
        
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" placeholder="请输入备注" v-model="form.remark"></el-input>
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
        name: "ServiceAdd",
        data() {
            return {
                URL: "/services",
                form: {
                    area: '',
                    project_type: '',
                    name: '',
                    service_fee: '',
                    process_definition: '',
                    remark:'',
                },
                rules: {
                    area: [
                        {required: true, message: "请选择国家", trigger: "change"}
                    ],
                    project_type: [
                        {required: true, message: "请选择案件类型", trigger: "change"}
                    ],
                    name: [
                        {required: true, message: "请输入服务名称", trigger: "blur"}
                    ],
                    service_fee: [
                        {required: true, message: "请输入单价", trigger: "blur"}
                    ],
                    process_definition: [
                        {required: true, message: "请选择默认管制事项", trigger: "change"}
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