<template>
    <div class="main">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title" size="small">
            <span slot="header" style="float: right;">
                <!-- <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button> -->
                <el-button type="primary" size="small"  @click="save('edit')">保存</el-button>
            </span>
            <el-form :model="form" label-width="80px" style="margin-top: 15px;" ref="form">
                <el-form-item label="配置项值" prop="value" :rules="{required: true, message: '请输入配置项值', trigger: 'blur'}">
                    <el-input v-model="form.value" placeholder="请输入配置项值"></el-input>
                </el-form-item>
            </el-form>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "System",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/configs",
                tableOption: {
                    'name': 'systemList',
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '配置项名称、配置项值',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        // {type: 'add', click: this.add},
                        // {type: 'delete'},
                        {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: 'ID', prop: 'id', width: '120'},
                        {type: 'text', label: '配置项名称', prop: 'name',},
                        {type: 'text', label: '配置项值', prop: 'value',},
                        {type: 'text', label: '配置项描述', prop: 'description',},
                        {type: 'action', label: '操作', width: '80', btns: [
                         {type: 'edit', click: this.editShrink, }
                        ]},
                    ],
                },
                compileType: "add",
                isPanelVisible: false,
                tableData: [],
                rowID:null,
                rowData:null,
                title:"",
                form: {
                 value: '',
                }
            }
        },
        methods: {
            async checkForm() {
                return new Promise((resolve) => {
                    this.$refs['form'].validate((valid)=>{
                        if(valid) {
                            resolve(true);
                        }else {
                            resolve(false);
                        }
                    })
                });
            },
            refreshTableData(option) {
                const success = _ => {
                    this.compileType === "add" ? this.closeVisible("isPanelVisible") : "";
                    this.tableData = _.config;
                };
                const data = Object.assign({}, option);
                this.$axiosGet({
                    url: this.URL,
                    data: data,
                    success,
                })
            },
            handleRowClick(row) {
                this.rowData = row;
                this.rowID = row.id;
                this.compileType = "edit";
              
                
            },
            editShrink (row) {
                this.form.value = row.value;
                this.title = `编辑配置项>${row.name}`   
                this.openVisible("isPanelVisible");
            },
            add() {
                this.rowData = {};
                this.title = "新增服务";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.ServiceAdd?this.$refs.ServiceAdd.clear():"";
            },
            async save(type) {
               const flag = await this.checkForm(); 
               if(flag) {
                   const url = `${this.URL}/${this.rowID}`;
                   const value = this.form.value;
                   const data = {value};
                   const success= _=>{
                      this.$message({type: 'success', message: _.info});  
                   };
                   this.$axiosPut({url, data, success});
               }
            },
        },
        components: {
            TableComponent,
            AppShrink,
        },
    }
</script>

<style scoped>

</style>