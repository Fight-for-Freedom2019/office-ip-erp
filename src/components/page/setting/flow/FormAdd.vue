<!-- 新增流程节点类型 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="表单名称" prop="name">
                        <el-input type="text" placeholder="请输入表单名称" v-model="form.name"></el-input>
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

        <div class="PaymentRequestDetail"  v-if="this.type == 'edit'">
            <form-fields :id="id"></form-fields>
        </div>
    </div>
    
</template>

<script>
    import RemoteSelect from "@/components/form/RemoteSelect";
    import StaticSelect from "@/components/form/StaticSelect";
    import FormFields from "@/components/page/setting/flow/FormFields";
    import AppSwitch from "@/components/form/AppSwitch";

    export default {
        name: "ActionAdd",
        data() {
            return {
                URL: "/forms",
                form: {
                    name: "",
                    remark:'',
                },
                rules: {
                    name: [
                        {required: true, message: "请输入表单名称", trigger: "blur"}
                    ],
                },
            }
        },
        props: {
            data: Object,
            type: String,
            id: Number,
        },
        mounted() {
            this.coverObj(this.data);
        },
        created() {
            
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
            FormFields,
        },
    }
</script>

<style scoped>

</style>