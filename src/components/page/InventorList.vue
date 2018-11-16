<!-- 发明人管理 -->
<template>
    <div class="main">
        <table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData"
                         ref="table"></table-component>
        <!-- 新建发明人 -->
        <app-shrink :visible.sync="isInventorsAddPanelVisible" :modal='formType === "add"' :title="this.appPanelTitle">
      <span slot="header" style="float: right;">
        <el-button type="primary" @click="saveAdd" v-if="formType === 'add'" size="small">新建</el-button>
        <el-button type="primary" @click="saveAdd" v-if="formType === 'edit'" size="small">保存</el-button>
      </span>
            <inventor-list-add ref="inventorsAdd" :type='formType' :inventors='inventors' @refresh="refresh" @update="update"></inventor-list-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import InventorListAdd from '@/components/page_extension/InventorListAdd'
    import AppShrink from '@/components/common/AppShrink'
    import TableMixins from '@/mixins/table-mixins'

    const URL = '/inventors'
    export default {
        name: 'InventorList',
        mixins:[TableMixins],
        data() {
            return {
                isInventorsAddPanelVisible: false,
                appPanelTitle: '新建发明人',
                formType: 'add',
                inventors: {},
                option: {
                    'name': 'inventorList',
                    'url': URL,
                    'rowClick': this.handleRowClick,
                    'height': 'default',
                    'is_list_filter': true,
                    'list_type': 'inventors',
                    'treeFilter':'inventors',
                    'header_btn': [
                        {type: 'add', click: this.addPop},
                        {type: 'delete'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '姓名', prop: 'name', width: '150',render_header:true},
                        {type: 'text', label: '尊称', prop: 'title', width: '150',render_header:true},
                        {type: 'text', label: '所属客户', prop: 'customer', width: '150',render_simple:"name",render_header:true},
                        {type: 'text', label: '国籍', prop: 'citizenship', sortable: true, width: '80',render_header:true},
                        {type: 'text', label: '邮箱', prop: 'email_address', width: '145',render_header:true},
                        {type: 'text', label: '电话号码', prop: 'phone_number', width: '120',render_header:true},
                        {type: 'text', label: '证件号码', prop: 'identity', width: '150',render_header:true},
                        {
                            type: 'text',
                            label: '是否公开姓名',
                            prop: 'is_publish_name',
                            width: '130',
                            render_text: (item) => {
                                return item ? "是" : "否"
                            },
                            render_header:true
                        },
                        {type: 'text', label: '英文名', prop: 'first_name', min_width: '120',render_header:true},
                        {type: 'text', label: '英文姓', prop: 'last_name', width: '120',render_header:true},
                        {type: 'text', label: '备注', prop: 'remark', width: '200',render_header:true},
                        // 	{
                        // 		type: 'action',
                        // width: '200',
                        // 		btns: [
                        // 			{ type: 'edit', click: this.editPop },
                        // 			{ type: 'delete', click: this.deleteSingle },
                        // 		]
                        // 	}
                    ]
                },
                tableData: [],
                filter: {},
            }
        },
        methods: {
            addPop() {
                this.formType = 'add';
                this.appPanelTitle = '新建发明人';
                this.isInventorsAddPanelVisible = true;
                this.$refs.inventorsAdd?this.$refs.inventorsAdd.clear():"";
            },
            editPop(col) {
                this.$refs.pop.show('edit', col);
            },
            deleteSingle({id, name}) {
                this.$confirm(`删除后不可恢复，确认删除发明人‘${name}’？`)
                    .then(_ => {
                        const url = `${URL}/${id}`;
                        const success = _ => {
                            this.$message({message: '删除联发明人成功', type: 'success'});
                            this.update();
                        };

                        this.$axiosDelete({url, success});
                    })
                    .catch(_ => {
                    });
            },
            saveAdd() {
                this.$refs.inventorsAdd.save(this.formType);
            },
            refreshTableData(option) {
                const url = URL;
                const data = Object.assign({}, option);
                const success = _ => {
                    this.tableData = _.data;
                    this.formType === "add" ? this.isInventorsAddPanelVisible = false : "";
                };

                this.$axiosGet({url, data, success});
            },
            handleRowClick(row) {
                let copy = this.$tool.deepCopy(row);
                this.inventors = copy;
                this.formType = 'edit';
                this.appPanelTitle = '编辑发明人>' + copy.name;
                this.isInventorsAddPanelVisible = true;
            },
            handlePopRefresh(key) {
                this.refresh();
            }
        },
        components: {TableComponent, InventorListAdd, AppShrink}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>