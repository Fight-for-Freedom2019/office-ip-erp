<!-- 新增提成规则类型 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <template v-if="this.type == 'add'">
            <el-form-item label="相关案件" prop="project">
                <remote-select type="专利" v-model="form.project" @change="onProjectChange"></remote-select>
            </el-form-item>
            <el-form-item label="用户" prop="user">
                <remote-select type="user" v-model="form.user"></remote-select>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="提成类型" prop="bonus_type">
                        <static-select type="bonus_type" v-model="form.bonus_type"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="点数" prop="points">
                        <el-input type="text" placeholder="请输入点数" v-model="form.points"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="管制事项" prop="process">
                        <el-select v-model="form.process" placeholder="请选择管制事项">
                            <el-option
                                v-for="item in processOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="流程节点" prop="task">
                        <el-select v-model="form.task" placeholder="请选择流程节点">
                            <el-option
                                v-for="item in actionOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
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
            </template>
            <template v-else>
                <el-form-item label="点数" prop="points">
                    <el-input type="text" placeholder="请输入点数" v-model="form.points"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop="remark">
                    <el-input type="text" placeholder="请输入备注" v-model="form.remark"></el-input>
                </el-form-item>
            </template>
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
                URL: "/bonuses",
                form: {
                    project: "",
                    user: "",
                    bonus_type: "",
                    points: "",
                    process:'',
                    task:'',
                    remark: "",
                },
                rules: {
                    project: [
                        {required: true, message: "请选择案件", trigger: "blur"}
                    ],
                    bonus_type: [
                        {required: true, message: "请选择提成类型", trigger: "blur"}
                    ],
                    user: [
                        {required: true, message: "请选择用户", trigger: "blur"}
                    ],
                    points: [
                        {required: true, message: "请输入点数", trigger: "blur"}
                    ],
                },
                flowsData: '',
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
        computed : {

            processOptions () {
                return this.flowsData;
            },
            actionOptions () {
                let arr =[];
                const f = this.form.process;
                if( !this.flowsData && !f ) {
                    return [];
                } else {
                    for (let i = 0; i < this.flowsData.length; i++) {
                        if(this.flowsData[i].id == f ) {
                            return arr = this.flowsData[i].tasks;
                            break;
                        }
                    }
                }
            },
        },
        methods: {
            ...mapActions([
                'initializeSelectorCache',
            ]),
            onProjectChange() {
                this.loadFlowData();
            },
            async loadFlowData() {
                if (this.form.project) {
                    const data = {project:this.form.project,listOnly:1};
                    this.$axiosGet({
                        url: '/processes',
                        data,
                        success: _ =>{
                            this.flowsData = _.processes.data;
                            console.log('flow data:');
                            console.log(this.flowsData);
                        }
                    });
                }
            },
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