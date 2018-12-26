<!-- 跟催记录 -->
<template>
    <div class="RemindersRecord">
        <table-component :tableOption="tableOption" :data="tableData" ref="table"
                         @refreshTableData="refreshTableData"></table-component>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" :modal="false" size="small" width="600px">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="客户" prop="customer">
                    <jump-select type="customer" v-model="form.customer"></jump-select>
                </el-form-item>
                <el-form-item label="跟催方式" prop="remind_type">
                    <static-select type="customer_reminder_type" v-model="form.remind_type"></static-select>
                </el-form-item>
                <el-form-item label="跟催时间" prop="remind_date">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择时间"
                                    v-model="form.remind_date"></el-date-picker>
                </el-form-item>
                <el-form-item label="跟催结果" prop="result">
                    <el-input type="textarea" v-model="form.result"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="save">保存</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>


</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import StaticSelect from '@/components/form/StaticSelect'
    import JumpSelect from '@/components/form/JumpSelect'
    import RemoteSelect from '@/components/form/RemoteSelect'
    import Config from '@/const/selectConfig'

    const config = new Map(Config);

    export default {
        name: "RemindersRecord",
        props: {
            data: Array,
            id: [Number, String],
            invoice:Object,
        },
        data() {
            return {
                tableOption: {
                    'name': 'RemindersRecordList',
                    'url': "",
                    'is_pagination': false,
                    'height': 356,
                    'highlightCurrentRow': true,
                    'is_search': false,
                    // 'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                    ],
                    'columns': [
                        // {type: 'selection'},
                        {type: 'text', label: '客户', prop: 'customer.name', width: '200'},
                        {type: 'text', label: '跟催时间', prop: 'remind_date', width: '120'},
                        {
                            type: 'text', label: '跟催方式', prop: 'remind_type', width: '120', render: (h, item) => {
                                let name;
                                config.get("customer_reminder_type").options.map(function (o) {
                                    if(o.id === item){
                                        name = o.name;
                                    }
                                });
                                return h("span",name);
                            }
                        },
                        {type: 'text', label: '跟催结果', prop: 'result', min_width: '180'},
                    ],
                },
                form: {
                    customer: "",
                    remind_type: "",
                    remind_date: "",
                    result: "",
                    model: "invoice",
                },
                rules: {
                    customer: [
                        {required: true, message: "请选择客户"},
                    ],
                    remind_type: [
                        {required: true, message: "请选择跟催方式", trigger: "blur"},
                    ],
                    remind_date: [
                        {required: true, message: "请选择跟催日期", trigger: "blur"},
                    ]
                },
                tableData: [],
                title: "新增跟催记录",   // 弹窗title
                dialogFormVisible: false,
            }
        },
        methods: {
            refreshTableData(option) {
                const url = `/invoices/${this.id}/reminders`;
                const success = _ => {
                    this.tableData = _.data;
                };
                this.$axiosGet({url, data: option, success})
            },
            save() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        const data = Object.assign({}, this.form);
                        data.model_id = this.id;
                        const url = "/reminders";
                        const success = _ => {
                            this.$message({type: "success", message: "添加成功!"});
                            this.refreshTableData();
                            this.cancel();
                        };
                        this.$axiosPost({url, data, success});
                    } else {
                        this.$message({type: "warning", message: "请正确填写"})
                    }
                })

            },
            refreshData() {
                this.tableData = this.$tool.deepCopy(this.data);
            },
            add() {
                this.dialogFormVisible = true;
            },
            cancel() {
                this.dialogFormVisible = false;
                this.clear();
            },
            clear() {
                this.$refs.form.resetFields();
            },
        },
        watch: {
            data: function (val) {
                this.tableData = val;
            },
            invoice: function(val) {
                this.form.customer = val.user;
            }
        },
        components: {
            TableComponent,
            StaticSelect,
            RemoteSelect,
            JumpSelect
        }
    }
</script>

<style scoped>

</style>