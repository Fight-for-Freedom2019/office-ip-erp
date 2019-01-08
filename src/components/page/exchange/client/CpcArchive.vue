<!-- CPC案卷包 -->
<template>
    <div class="CpcArchive">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title" size="middle">
            <span slot="header" style="float: right;">
                <!--<el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>-->
                <app-button-loading :func="save" v-if="compileType === 'add'" ref="loadingBtn"></app-button-loading>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <cpc-archive-edit :type="compileType" :data="rowData" ref="CpcArchiveEdit" @update="update" @refresh="refresh"></cpc-archive-edit>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import CpcArchiveEdit from '@/components/page/exchange/client/CpcArchiveEdit'
    import TableMixins from '@/mixins/table-mixins'
    import Config from "@/const/selectConfig"

    const config = new Map(Config);

    export default {
        name: "CpcArchive",
        mixins: [TableMixins],
        data() {
            return {
                URL: "/cpc_archives",
                tableOption: {
                    'name': 'CpcArchiveList',
                    'url': "/cpc_archives",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': true,
                    'list_type': 'cpc_archive',
                    'treeFilter': 'cpc_archive',
                    'search_placeholder': '案号、标题、发文序列号',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        // {type: 'add', click: this.add},
                        // {type: 'delete'},
                        // {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '案号', prop: 'serial',min_width: '120'},
                        {type: 'text', label: '标题', prop: 'title',min_width: '120'},
                        {type: 'text', label: '管制事项', prop: 'process_definition',render_simple:'name',render_header: true, min_width: '100'},
                        {type: 'text', label: '流程节点', prop: 'process_action',render_simple:'name', min_width: '100'},
                        {type: 'text', label: '送件状态', prop: 'filing_status',render_simple:'name',render_header: true, min_width: '110'},
                        {type: 'text', label: '送件时间', prop: 'filed_time',render_header: true, min_width: '135'},
                        {type: 'text', label: '官方绝限', prop: 'legal_deadline',render_header: true, min_width: '135'},
                        {type: 'text', label: '递交期限', prop: 'filing_deadline',render_header: true, min_width: '135'},
                        {type: 'text', label: 'CPC账号', prop: 'cpc_user',min_width: '120'},
                        {type: 'text', label: '案卷包', prop: 'file', min_width: '100',render:(h,item,row)=>{
                            if (row.file == null) return;
                            return h('a',{ attrs:{
                                target:'_blank',
                                href:'/files/' + row.file.id
                            }}, `下载`)
                        }},
                        {type: 'text', label: '备注', prop: 'remark',render_header: true, min_width: '100'},
                        // { 
                        //     type: 'action', 
                        //     label: '详情',
                        //     btns: [
                        //         {type: 'view', click: ({viewUrl})=>{window.open(viewUrl)}},
                        //     ],
                        // }
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
                this.title = `编辑CPC通知书>${row.serial}-${row.title}`
            },
            // add() {
            //     this.rowData = {};
            //     this.title = "新增文件类型";
            //     this.compileType = "add";
            //     this.openVisible("isPanelVisible");
            //     this.$refs.CpcArchiveEdit?this.$refs.CpcArchiveEdit.clear():"";
            // },
            save(type) {
                this.$refs.CpcArchiveEdit.submitForm(type,this.rowID)
            },
        },
        components: {
            TableComponent,
            AppShrink,
            CpcArchiveEdit,
        },
    }
</script>

<style scoped>

</style>