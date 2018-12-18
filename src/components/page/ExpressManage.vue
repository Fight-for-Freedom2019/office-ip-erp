<!-- 快递管理 -->
<template>
    <div class="ExpressManage">
        <table-component :tableOption="tableOption" :data="tableData1.array" ref="table" @update="update" @refresh="refresh"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;" v-if="showConfig.add">
                <el-button type="primary" size="small" v-if="compileType === 'add'" @click="save('add')">新建</el-button>
                <el-button type="primary" size="small" v-if="compileType === 'edit'"
                           @click="save('edit')">保存</el-button>
            </span>
            <express-info-add ref="expressAdd" v-if="showConfig.add" :data="rowData"></express-info-add>
            <relevant-contract v-else-if="showConfig.contract" :data="contracts"></relevant-contract>
        </app-shrink>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import ExpressInfoAdd from '@/components/page_extension/ExpressInfoAdd'
    import RelevantContract from '@/components/page/crm/orders/RelevantContract'
    import TableMixins from '@/mixins/table-mixins'

    const config = [    // 需要与tableOption的columns中的label定义的一致
        ["相关合同",{key:"contract"}],
        ["相关账单",{key:"invoice"}],
        ["相关邮件",{key:"mail"}],
        ["新增",{key:"add"}],
    ];
    const map = new Map(config);
    export default {
        name: "ExpressManage",
        mixins:[TableMixins],
        data(){
            return {
                showConfig:{
                    mail:false,
                    invoice:false,
                    contract:false,
                    add:true,
                },
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
                        {type: 'text', label: '客户', prop: 'customer', render_simple:"name",min_width: '178'},
                        {type: 'text', label: '收件人', prop: 'user', render_simple:"name",width: '150'},
                        {type: 'text', label: '相关邮件', prop: 'mail.subject', width: '150'},
                        {type: 'text', label: '相关账单', prop: 'invoice.serial', width: '100'},
                        {type: 'text-btn', label: '相关合同', prop: 'contract.serial', width: '150',custom_text:"相关合同",click:this.show},
                        {type: 'text', label: '联系信息', prop: 'contact', width: '120'},
                        {type: 'text', label: '快递公司', prop: 'carrier', width: '180'},
                        {type: 'text', label: '快递单号', prop: 'serial', width: '120'},
                        {type: 'text', label: '寄件时间', prop: 'date', width: '100'},
                        {type: 'text', label: '签收时间', prop: 'receipt_date', width: '100'},
                        {type: 'text', label: '备注', prop: 'remark', width: '150'},
                    ],
                },
                tableData:[],
                tableData1:this.$mock.mock({
                    "array|3-9":[
                        {
                            "customer":{
                                "name":"@cname()",
                            },
                            "user":{
                                "name":"@cname()",
                            },
                            "mail":{
                                "subject|2-6":[

                                ]
                            },
                            "invoice":{
                                "serial|2-6":[

                                ]
                            },
                            "contract":{
                                "serial|2-6":[

                                ]
                            },
                            "contact|13631454214-18652125845":17662325425,
                            "carrier":"@ctitle()",
                            "serial|15646435641-453453485445":15646435434,
                            "date":"@date",
                            "receipt_date":"@date",
                            "remark":"@ctitle()",
                        }
                    ]
                }),
                isPanelVisible:false,
                title:"",
                compileType:"add",
                URL:"/expresses",
                contracts:[],
                rowData:null,
            }
        },
        methods:{
            refreshTableData(option) {
                const success = _ => {
                    this.isPanelVisible = false;
                    this.tableData = _.data;
                };
                const data = Object.assign({}, option);
                this.$axiosGet({
                    url: this.URL,
                    data: data,
                    success,
                })
            },
            handleRowClick(row){
                this.openVisible("isPanelVisible");
                this.setHide("add");
                this.title = "修改";
                this.rowData = row;
            },
            add(){
                this.setHide("add");
                this.title = "新增";
                this.rowData = null;
                this.openVisible("isPanelVisible");
                this.$refs.expressAdd?this.$refs.expressAdd.clear():"";
            },
            save(){},
            setHide(key){
                for(let key in this.showConfig){
                    if(this.showConfig.hasOwnProperty(key)){
                        this.showConfig[key] = false;
                    }
                }
                this.showConfig[key] = true
            },
            show(r,e,c){
                this.setHide(map.get(c.label).key);
                this.title = c.label;
                this.isPanelVisible = true;
            }
        },
        components:{
            TableComponent,
            AppShrink,
            ExpressInfoAdd,
            RelevantContract,
        }
    }
</script>

<style scoped>

</style>