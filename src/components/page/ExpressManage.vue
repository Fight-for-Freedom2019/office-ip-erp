<!-- 快递管理 -->
<template>
    <div class="ExpressManage">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import TableMixins from '@/mixins/table-mixins'
    export default {
        name: "ExpressManage",
        mixins:[TableMixins],
        data(){
            return {
                tableOption: {
                    'name': 'ExpressManageList',
                    'url': "/expresses",
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'is_list_filter': true,
                    'list_type': 'serial',
                    'search_placeholder': '客户名称、联系人',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add', click: this.add},
                        {type: 'delete'},
                        {type: 'export'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '客户', prop: 'customer.name', min_width: '178'},
                        {type: 'text', label: '收件人', prop: 'user.name', width: '150'},
                        {type: 'text', label: '相关邮件', prop: 'mail.subject', width: '150'},
                        {type: 'text', label: '相关账单', prop: 'invoice.serial', width: '100'},
                        {type: 'text', label: '相关合同', prop: 'contract.serial', width: '150'},
                        {type: 'text', label: '联系信息', prop: 'contact', width: '120'},
                        {type: 'text', label: '快递公司', prop: 'carrier', width: '180'},
                        {type: 'text', label: '快递单号', prop: 'serial', width: '120'},
                        {type: 'text', label: '寄件时间', prop: 'date', width: '100'},
                        {type: 'text', label: '签收时间', prop: 'receipt_date', width: '100'},
                        {type: 'text', label: '备注', prop: 'remark', width: '150'},
                    ],
                },
                tableData:[],
                isPanelVisible:false,
                title:"",
                compileType:"",
            }
        },
        methods:{
            refreshTableData(option) {
                // const success = _ => {
                //     this.isPanelVisible = false;
                //     this.tableData = _.data;
                // };
                // const data = Object.assign({}, option, DefaultParam);
                // this.$axiosGet({
                //     url: URL,
                //     data: data,
                //     success,
                // })
            },
            handleRowClick(){},
            add(){
                this.openVisible("isPanelVisible");
            },
            save(){},
        },
        components:{
            TableComponent,
            AppShrink
        }
    }
</script>

<style scoped>

</style>