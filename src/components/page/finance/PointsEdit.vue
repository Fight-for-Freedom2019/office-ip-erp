<!-- 新增提成规则类型 -->
<template>
    <app-shrink :visible.sync="isPanelVisible" :modal="false" :title="title">
      <span slot="header" style="float: right;">
        <!--<el-button type="primary" size="small" v-if="mode === 'add'" @click="save('add')">新建</el-button>-->
        <app-button-loading :func="save" v-if="mode === 'add'" ref="loadingBtn"></app-button-loading>
        <el-button type="primary" size="small" v-if="mode === 'edit'" @click="save('edit')" ref="saveBtn">保存</el-button>
      </span>
      <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-form-item label="相关案件" prop="project" v-if="this.mode == 'add'">
                <jump-select type="专利" v-model="form.project" @change="onProjectChange"></jump-select>
            </el-form-item>
            <el-form-item label="用户" prop="user" v-if="this.mode == 'add'">
                <jump-select type="user" v-model="form.user"></jump-select>
            </el-form-item>

            <el-form-item label="点数类型" prop="bonus_type" v-if="this.mode == 'add'">
                <static-select type="bonus_type" v-model="form.bonus_type"></static-select>
            </el-form-item>

            <el-form-item label="管制事项" prop="process" v-if="this.mode == 'add'">
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

            <el-form-item label="流程节点" prop="task" v-if="this.mode == 'add'">
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

            <el-form-item label="点数" prop="points">
                <el-input type="text" placeholder="请输入点数" v-model="form.points"></el-input>
            </el-form-item>

            <el-form-item label="状态" prop="status">
                <static-select type="bonus_status" placeholder="请选择点数状态" v-model="form.status"></static-select>
            </el-form-item>

            <el-form-item label="发放日期" prop="issue_date">
                <el-date-picker type="date" placeholder="请选择发放日期" v-model="form.issue_date"></el-date-picker>
            </el-form-item>

            <el-form-item label="备注" prop="remark">
                <el-input type="text" placeholder="请输入备注" v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
      </div>
    </app-shrink>
</template>

<script>
import RemoteSelect from "@/components/form/RemoteSelect";
import JumpSelect from "@/components/form/JumpSelect";
import StaticSelect from "@/components/form/StaticSelect";
import AppSwitch from "@/components/form/AppSwitch";
import { mapActions } from 'vuex'

export default {
    name: "PointsEdit",
    data() {
        return {
            URL: "/bonuses",
            form: {
                project: "",
                user: "",
                bonus_type: "",
                points: "",
                process: '',
                task: '',
                remark: "",
                status: "",
                issue_date: "",
            },
            rules: {
                project: [
                    { required: true, message: "请选择案件", trigger: "blur" }
                ],
                bonus_type: [
                    { required: true, message: "请选择点数类型", trigger: "blur" }
                ],
                user: [
                    { required: true, message: "请选择用户", trigger: "blur" }
                ],
                points: [
                    { required: true, message: "请输入点数", trigger: "blur" }
                ],
            },
            flowsData: '',
            mode: 'edit',
            title: '',
            isPanelVisible: false,
            id: 0,
        }
    },
    props: {
        data: Object,
        type: String,
    },
    created() {

    },
    mounted() {

    },
    watch: {
        data: function (val, oldVal) {
            this.coverObj(val);
        },
    },
    computed: {

        processOptions() {
            return this.flowsData;
        },
        actionOptions() {
            let arr = [];
            const f = this.form.process;
            if (!this.flowsData && !f) {
                return [];
            } else {
                for (let i = 0; i < this.flowsData.length; i++) {
                    if (this.flowsData[i].id == f) {
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
                const data = { project: this.form.project, listOnly: 1 };
                this.$axiosGet({
                    url: '/processes',
                    data,
                    success: _ => {
                        this.flowsData = _.processes.data;
                    }
                });
            }
        },
        show(mode, id) {
            this.mode = mode;
            this.title = this.mode == 'add' ? '新增点数' : '编辑点数';
            this.isPanelVisible = true;
            if (this.mode == 'add') {
                this.$nextTick(() => {
                    console.log(this.$refs.form)
                    this.$refs.form.resetFields();
                })
            } else {
                var t = typeof id;
                if (t == 'object') {
                    this.coverObj(id);
                    this.id = id.id;
                } else {
                    this.id = id;
                    this.loading = true;
                    this.getDetail(id);
                }
            }
        },
        getDetail(id) {
            const url = `${URL}/${id}`;
            const success = _ => {
                const data = _.bonus_report;
                this.tableData = data.detail;
                this.$nextTick(() => {
                    this.$tool.coverObj(this.form, data, );
                    this.form.user = data.user.name ? data.user.name : data.user;
                })
                this.loading = false;
            };
            this.$axiosGet({ url, success });
        },
        save(type) {
            this.submitForm(type, this.id);
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
                        this.$message({ type: "success", message: `${msg}成功!` });
                        this.$emit(fun);
                    };
                    type === "add" ? this.$axiosPost({ url, data, success }) : this.$axiosPut({ url, data, success })
                } else {
                    this.$message({ type: "warning", message: "请正确填写" });
                }
            })
        },
        clear() {
            this.$refs.form.resetFields();
        },
        coverObj(val) {
            val ? this.$tool.coverObj(this.form, val, {                obj: [
                    'customer', 'project_type', 'project_subtype', 'bonus_type', 'timing', 'process_definition', 'process_action', 'area', 'project_tags', 'process_tags', 'status'
                ]            }) : "";
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