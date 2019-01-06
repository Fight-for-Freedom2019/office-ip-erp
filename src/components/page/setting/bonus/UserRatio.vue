<!-- 收款账户 -->
<template>
    <div class="UserRatio">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <user-ratio-add :type="compileType" :data = "rowData" ref="UserRatioAdd" @update="update" @refresh="refresh"></user-ratio-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import UserRatioAdd from '@/components/page/setting/bonus/UserRatioAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "UserRatio",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/users",
                tableOption: {
                    'name': 'UserRatioList',
                    'url': "/users",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '用户名',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        // {type: 'add', click: this.add},
                        // {type: 'delete'},
                        // {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        // {type: 'selection'},
                        {type: 'text', label: '用户名称', prop: 'name', min_width: '100'},
                        {type: 'text', label: '中文案系数', prop: 'cn_ratio', min_width: '120'},
                        {type: 'text', label: '涉外案系数', prop: 'foreign_ratio', min_width: '100'},
                    ],
                },
                compileType: "add",
                isPanelVisible: false,
                tableData: [],
                rowID:null,
                rowData:null,
                title:"",
            }
        },
        methods: {
            refreshTableData(option) {
                const success = _ => {
                    this.compileType === "add" ? this.closeVisible("isPanelVisible") : "";
                    this.tableData = _.data;
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
                this.openVisible("isPanelVisible");
                this.compileType = "edit";
                this.title = `编辑用户系数>${row.name}`
                
            },
            add() {
                this.rowData = {};
                this.title = "新增用户系数";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.UserRatioAdd?this.$refs.UserRatioAdd.clear():"";
            },
            save(type) {
                this.$refs.UserRatioAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            UserRatioAdd,
        },
    }
</script>

<style scoped>

</style>