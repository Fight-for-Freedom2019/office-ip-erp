<!-- 流程节点管理 -->
<template>
    <div class="FlowActionsDetail">
        <table-component :tableOption="tableOption" :data="tableData" @getRowData="getRowData"></table-component>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" :modal="false">
            <el-form label-width="100px" :model="form" :rules="rules" ref="form">
                <el-form-item label="当前节点" prop="process_action">
                    <static-select type="actions" placeholder="请选择流程节点" v-model="form.process_action"></static-select>
                </el-form-item>
                <el-form-item label="审核通过节点" prop="pass_process_action">
                    <static-select type="actions" placeholder="请选择审核通过节点" v-model="form.pass_process_action"></static-select>
                </el-form-item>
                <el-form-item label="退回修改节点" prop="amendment_process_action">
                    <static-select type="actions" placeholder="请选择退回修改节点" v-model="form.amendment_process_action"></static-select>
                </el-form-item>
                <el-form-item label="驳回节点" prop="closed_process_action">
                    <static-select type="actions" placeholder="请选择驳回节点" v-model="form.closed_process_action"></static-select>
                </el-form-item>
                <el-form-item label="完成后新流程" prop="new_process_flow">
                    <static-select type="flows" placeholder="请选择完成后新流程" v-model="form.new_process_flow"></static-select>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input type="text" placeholder="请输入排序" v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 0px;">
                    <el-button type="primary" @click="save" :loading="loading">{{ '保存' }}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>


<script>
    import TableComponent from '@/components/common/TableComponent'
    import StaticSelect from "@/components/form/StaticSelect";
    import AppSwitch from "@/components/form/AppSwitch";
    import Config from '@/const/selectConfig'
    import { mapGetters,mapActions } from 'vuex'

    const config = new Map(Config);
    export default {
        name: "FlowActionsDetail",
        data() {
            return {
                tableOption: {
                    'name': 'FlowActionsDetailList',
                    'url': "",
                    'height': "flowActions",
                    'highlightCurrentRow': true,
                    'is_search': false,
                    'is_pagination': false,
                    // 'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click:this.add},
                    ],
                    'columns': [
                        // {type: 'selection'},
                        {type: 'text', label: '当前节点', prop: 'process_action',render_simple:'name', min_width: '110'},
                        {type: 'text', label: '审核通过节点', prop: 'pass_process_action',render_simple:'name', min_width: '110'},
                        {type: 'text', label: '退回修改节点', prop: 'amendment_process_action',render_simple:'name', min_width: '110'},
                        {type: 'text', label: '驳回节点', prop: 'closed_process_action',render_simple:'name', min_width: '110'},
                        {type: 'text', label: '完成后新流程', prop: 'new_process_flow',render_simple:'name', min_width: '110'},
                        {type: 'text', label: '排序', prop: 'sort', min_width: '120'},
                        {
                            type: 'action',
                            label: '操作',
                            btns: [
                                {type: 'edit', click: this.edit},
                                {type: 'delete', click: this.delete},
                            ],
                        }
                    ],
                },
                title: '新增流程节点',
                tableData: [],
                dialogFormVisible: false,
                url: '/flow_actions',
                rules: {
                    field:{required:true,message:'请选择流程节点'},
                },
                form: {
                    process_action: '',
                    pass_process_action: '',
                    amendment_process_action:'',
                    closed_process_action: '',
                    new_process_flow: '',
                    sort: '',
                },
                loading:false,
                type: 'add',
                row: '',
            }
        },
        props: {
            data: Array,
            id: Number,
        },
        created() {
            this.refreshTableData();
            this.refreshAction();
            this.refreshFlows();
        },
        methods: {
            ...mapActions([
                'refreshAction',
                'refreshFlows'
            ]),
            save() {
                this.loading = true;
                const complete = _ => {
                    this.loading = false;
                }
                if (this.type == 'add') {
                    const success = _ => {
                        this.refreshTableData();
                        this.loading = false;
                        this.dialogFormVisible = false;
                    };
                    const data = Object.assign({}, this.form);
                    data.process_flow_id = this.id;
                    this.$axiosPost({
                        url: this.url,
                        data: data,
                        success: success,
                        complete: complete,
                    })
                } else {
                    const success = _ => {
                        this.refreshTableData();
                        this.loading = false;
                        this.dialogFormVisible = false;
                    };
                    const data = Object.assign({}, this.form);
                    this.$axiosPut({
                        url: this.url + '/' + this.row.id,
                        data: data,
                        success: success,
                        complete: complete,
                    })
                }
            },
            edit(row) {
                this.$tool.coverObj(this.form,row,{obj:['process_action','pass_process_action','amendment_process_action','closed_process_action','new_process_flow']})
                this.row = row;
                this.title = "编辑流程节点>" + row.process_action.name;
                this.type = "edit";
                this.dialogFormVisible = true;
            },
            delete(row) {
                const success = _ => {
                    this.refreshTableData()
                };

                this.$axiosDelete({
                    url: this.url + '/' + row.id,
                    data: {},
                    success,
                })
            },
            add() {
                this.title = "流程新增节点";
                this.type = "add";
                this.dialogFormVisible = true;
                this.$nextTick(()=>{
                    this.$refs.form.resetFields();
                })
            },
            refreshTableData(option) {
                const success = _ => {
                    this.tableData = _.data;
                };
                const data = Object.assign({}, option);
                this.$axiosGet({
                    url: this.url + '?listRows=100000&process_flow=' + this.id,
                    data: data,
                    success,
                })
            },
            getRowData(data) {
                this.$emit("getRowData", data);
            },
        },
        components: {
            TableComponent,
            StaticSelect,
            AppSwitch,
        }
    }
</script>

<style scoped>

</style>