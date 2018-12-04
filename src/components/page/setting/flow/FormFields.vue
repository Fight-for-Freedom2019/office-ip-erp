<!-- 请款管理 费用明细 -->
<template>
    <div class="FormFieldsDetail">
        <table-component :tableOption="tableOption" :data="tableData" @getRowData="getRowData"></table-component>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" :modal="false">
            <el-form label-width="100px" :model="form" :rules="rules" ref="form">
                <el-form-item label="字段" prop="field">
                    <static-select type="form_field" placeholder="请选择字段" v-model="form.field"></static-select>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input type="text" placeholder="请输入排序" v-model="form.sort"></el-input>
                </el-form-item>
                <el-form-item label="是否必填" prop="is_required">
                    <app-switch type="is" placeholder="请选择是否必填" v-model="form.is_required"></app-switch>
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

    const config = new Map(Config);
    export default {
        name: "FormFieldsDetail",
        data() {
            return {
                tableOption: {
                    'name': 'FormFieldsDetailList',
                    'url': "",
                    'height': "default6",
                    'highlightCurrentRow': true,
                    'is_search': false,
                    'is_pagination': false,
                    // 'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click:this.add},
                    ],
                    'columns': [
                        // {type: 'selection'},
                        {type: 'text', label: '字段标签', prop: 'name', min_width: '110'},
                        {type: 'text', label: '字段名称', prop: 'key', min_width: '110'},
                        {type: 'text', label: '占位符', prop: 'placeholder', min_width: '110'},
                        {type: 'text', label: '字段类型', prop: 'field_type', render_simple:'name', min_width: '120'},
                        {type: 'text', label: '是否必填', prop: 'is_required', min_width: '120', render: (h, item) => h('span', item ? '是' : '否')},
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
                title: '新增字段',
                tableData: [],
                dialogFormVisible: false,
                url: '/forms/:id/fields',
                rules: {
                    field:{required:true,message:'请选择字段'},
                },
                form: {
                    field: '',
                    sort: '',
                    is_required:'',
                    id: '',
                },
                loading:false,
                type: 'add',
            }
        },
        props: {
            data: Array,
            id: Number,
        },
        created() {
            this.refreshTableData()
        },
        methods: {
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
                    this.$axiosPost({
                        url: this.url.replace(':id',this.id),
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
                        url: this.url.replace(':id',this.id),
                        data: data,
                        success: success,
                        complete: complete,
                    })
                }
            },
            edit(field) {
                this.form.field = field.field_type;
                this.form.sort = field.sort;
                this.form.id = field.id;
                this.title = "编辑表单字段>" + field.name;
                this.type = "edit";
                this.dialogFormVisible = true;
            },
            delete(field) {
                const success = _ => {
                    this.refreshTableData()
                };

                const data = Object.assign({}, {field_id:field.id});
                this.$axiosDelete({
                    url: this.url.replace(':id',this.id),
                    data: data,
                    success,
                })
            },
            add() {
                this.form.field = "";
                this.form.sort = "";
                this.form.id = "";
                this.form.is_required = false;
                this.title = "表单新增字段";
                this.type = "add";
                this.dialogFormVisible = true;
            },
            refreshTableData(option) {
                const success = _ => {
                    this.tableData = _.data;
                };
                const data = Object.assign({}, option);
                this.$axiosGet({
                    url: this.url.replace(':id',this.id),
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