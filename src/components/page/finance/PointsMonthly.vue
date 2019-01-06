<!-- 收款账户 -->
<template>
    <div class="BonusReport">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <rule-add :type="compileType" :data = "rowData" ref="RuleAdd" @update="update" @refresh="refresh"></rule-add>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import RuleAdd from '@/components/page/setting/bonus/RuleAdd'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"
    import { mapActions } from 'vuex'

    const config = new Map(Config);

    export default {
        name: "BonusReport",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/bonus_reports",
                tableOption: {
                    'name': 'BonusReportList',
                    'url': "/bonus_reports",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': false,
                    'list_type': 'serial',
                    'search_placeholder': '用户名称、月份',
                    // 'rowClick': this.handleRowClick,
                    'header_btn': [
                        // {type: 'add', click: this.add},
                        // {type: 'delete'},
                        // {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '用户', prop: 'user',render_simple:'name', min_width: '150'},
                        {type: 'text', label: '月份', prop: 'month', min_width: '100'},
                        {type: 'text', label: '点数', prop: 'points', min_width: '100'},
                        {type: 'text', label: '绩效点数', prop: 'points_bonus', min_width: '100'},
                        {type: 'text', label: '总点数', prop: 'sum', min_width: '100'},
                        {type: 'text', label: '月度排名', prop: 'rank', min_width: '100'},
                        {type: 'text', label: '备注', prop: 'remark', min_width: '100'},
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
                this.title = `编辑提成规则>${row.name}`
                
            },
            add() {
                this.rowData = {};
                this.title = "新增提成规则";
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
            RuleAdd,
        },
    }
</script>

<style scoped>

</style>