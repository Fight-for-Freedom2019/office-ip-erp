<!-- 跟催记录 -->
<template>
    <div class="RemindersRecord">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" :modal="false" size="mini">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="跟催方式" prop="remind_type">
                    <el-input type="text" v-model="form.remind_type"></el-input>
                </el-form-item>
                <el-form-item label="跟催时间" prop="remind_date">
                    <el-date-picker type="date" placeholder="请选择时间" v-model="form.remind_date"></el-date-picker>
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

    export default {
        name: "RemindersRecord",
        props:{
            data:Array,
        },
        data() {
            return {
                tableOption: {
                    'name': 'RemindersRecordList',
                    'url': "",
                    'height': 356,
                    'highlightCurrentRow': true,
                    'is_search': false,
                    // 'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add',click:this.addRecord},
                    ],
                    'columns': [
                        // {type: 'selection'},
                        {type: 'text', label: '跟催时间', prop: 'remind_date', width: '178'},
                        {type: 'text', label: '跟催人', prop: 'creator_user.name', width: '120'},
                        {type: 'text', label: '跟催类型', prop: 'remind_type', width: '150'},
                        {type: 'text', label: '跟催结果', prop: 'result', min_width: '180'},
                    ],
                },
                form:{
                    remind_type:"文明方式",
                    remind_date:"2018-11-01",
                    result:"催款成功!"
                },
                tableData: [],
                title:"新增跟催记录",   // 弹窗title
                dialogFormVisible:false,
            }
        },
        methods: {
            refreshTableData(option) {
            },
            addRecord(){
                this.dialogFormVisible = true;
            },
            update(){
                this.$refs.table.update();
            },
            refresh(){
                this.$refs.table.refresh();
            },
            save(){
                const data = this.form;
                const url = "";
                const success = _ => {
                    this.$message({type:"success",messages:"添加成功!"});
                    this.update();
                };
                this.$axiosPost({url,data,success});
            },
            cancel() {
                this.dialogFormVisible = false;
            },
        },
        components: {
            TableComponent,
        }
    }
</script>

<style scoped>

</style>