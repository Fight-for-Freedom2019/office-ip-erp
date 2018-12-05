<!-- 收款账户 -->
<template>
    <div class="Points">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <points-edit :type="compileType" :data = "rowData" ref="RuleAdd" @update="update" @refresh="refresh"></points-edit>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import PointsEdit from '@/components/page/finance/PointsEdit'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"
    import { mapActions } from 'vuex'

    const config = new Map(Config);

    export default {
        name: "Points",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/bonuses",
                tableOption: {
                    'name': 'PointsList',
                    'url': "/bonuses",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '案号、关键字',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '案号', prop: 'serial', min_width: '150'},
                        {type: 'text', label: '标题', prop: 'title', min_width: '150'},
                        {type: 'text', label: '案件类型', prop: 'project_type',render_simple:'name', width: '100'},
                        {type: 'text', label: '案件子类型', prop: 'subtype',render_simple:'name', width: '120'},
                        {type: 'text', label: '国家/地区', prop: 'area',render_simple:'name', width: '100'},
                        {type: 'text', label: '申请日', prop: 'application_date', width: '100'},
                        {type: 'text', label: '申请号', prop: 'application_number', width: '100'},
                        {type: 'text', label: '管制事项', prop: 'process',render_simple:'name', width: '120'},
                        {type: 'text', label: '流程节点', prop: 'task',render_simple:'name', width: '120'},
                        {type: 'text', label: '提成类型', prop: 'bonus_type',render_simple:'name', width: '100'},
                        {type: 'text', label: '点数', prop: 'points', width: '100'},
                        {type: 'array', label: '案件标签', prop: 'project_tags', min_width: '150',render: _=>_.map(_=>_.name), },
                        {type: 'array', label: '管制事项标签', prop: 'process_tags', min_width: '150',render: _=>_.map(_=>_.name),},
                        {type: 'text', label: '提成类型', prop: 'bonus_type',render_simple:'name', width: '100'},
                        {type: 'text', label: '生成时机', prop: 'timing',render_simple:'name', width: '120'},
                        {type: 'text', label: '用户', prop: 'user',render_simple:'name', width: '100'},
                        {type: 'text', label: '最后修改用户', prop: 'last_modifier_user',render_simple:'name', width: '100'},
                        {type: 'text', label: '最后修改时间', prop: 'last_modification_time', width: '100'},
                        {type: 'text', label: '状态', prop: 'status',render_simple:'name', width: '120'},
                        {type: 'text', label: '备注', prop: 'remark', width: '100'},
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
        created() {
            this.refreshTags();
        },
        methods: {
            ...mapActions([
            // 'refreshExtends', //extend-field
            'refreshTags', //product
            ]),
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
                this.title = `编辑点数>${row.serial}-${row.title}-${row.process.name}`
                
            },
            add() {
                this.rowData = {};
                this.title = "新增点数";
                this.compileType = "add";
                this.openVisible("isPanelVisible");
                this.$refs.RuleAdd?this.$refs.RuleAdd.clear():"";
            },
            save(type) {
                this.$refs.RuleAdd.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            PointsEdit,
        },
    }
</script>

<style scoped>

</style>