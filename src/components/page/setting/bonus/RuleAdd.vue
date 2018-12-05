<!-- 新增提成规则类型 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-form-item label="规则名称" prop="name">
                <el-input type="text" placeholder="请输入规则名称" v-model="form.name"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="案件类型" prop="project_type">
                        <static-select type="project_type" v-model="form.project_type"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="案件子类型" prop="project_subtype">
                        <static-select type="subtype" v-model="form.project_subtype"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="国家/地区" prop="area">
                        <static-select type="country" v-model="form.area"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="管制事项" prop="process_definition">
                        <static-select type="process_definition" v-model="form.process_definition"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="提成类型" prop="bonus_type">
                        <static-select type="bonus_type" v-model="form.bonus_type"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="生成时机" prop="timing">
                        <static-select type="bonus_timing" v-model="form.timing"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="点数" prop="points">
                        <el-input type="text" placeholder="请输入点数" v-model="form.points"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="客户" prop="customer">
                <remote-select type="customer" v-model="form.customer"></remote-select>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="案件标签" prop="project_tags">
                        <static-select type="tags" v-model="form.project_tags" multiple></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="管制事项标签" prop="process_tags">
                        <static-select type="tags" v-model="form.process_tags" multiple></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="优先级" prop="priority">
                        <el-input type="text" placeholder="请输入优先级" v-model="form.priority"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="流程节点" prop="process_action">
                        <static-select type="actions" v-model="form.process_action"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="text" placeholder="请输入备注" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否折扣" prop="is_discount">
                        <app-switch type="is" v-model="form.is_discount"></app-switch>
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
    import {mapActions} from 'vuex'

    export default {
        name: "RuleAdd",
        data() {
            return {
                URL: "/bonus_rules",
                form: {
                    name: "",
                    customer: "",
                    project_type: "",
                    project_subtype: "",
                    bonus_type: "",
                    area: "",
                    points: "",
                    project_tags: "",
                    process_tags:'',
                    process_definition:'',
                    process_action:'',
                    timing:'',
                    priority:'',
                    is_discount:1,
                    remark:'',
                },
                rules: {
                    name: [
                        {required: true, message: "请输入提成规则名称", trigger: "blur"}
                    ],
                    project_type: [
                        {required: true, message: "请选择案件类型", trigger: "blur"}
                    ],
                    project_subtype: [
                        {required: true, message: "请选择案件子类型", trigger: "blur"}
                    ],
                    area: [
                        {required: true, message: "请选择案件国家/地区", trigger: "blur"}
                    ],
                    process_definition: [
                        {required: true, message: "请选择管制事项", trigger: "blur"}
                    ],
                    bonus_type: [
                        {required: true, message: "请选择提成类型", trigger: "blur"}
                    ],
                    timing: [
                        {required: true, message: "请选择生成时机", trigger: "blur"}
                    ],
                    points: [
                        {required: true, message: "请输入点数", trigger: "blur"}
                    ],
                },
            }
        },
        props: {
            data: Object,
            type: String,
        },
        created() {
            
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
            ...mapActions([
                'initializeSelectorCache',
            ]),
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
                val?this.$tool.coverObj(this.form,val,{obj:[
                    'customer','project_type','project_subtype','bonus_type','timing','process_definition','process_action','area','project_tags','process_tags',
                ]}):"";
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