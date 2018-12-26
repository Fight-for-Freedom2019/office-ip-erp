<!-- 账单邮件 -->
<template>
    <div class="InvoiceMails">
        <table-component :tableOption="tableOption" :data="tableData" ref="table"
                         @refreshTableData="refreshTableData"></table-component>
        <mail-edit ref="mail" @refresh="refresh"></mail-edit>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import JumpSelect from '@/components/form/JumpSelect'
    import MailEdit from '@/components/page/MailAdd'

    export default {
        name: "InvoiceMails",
        data() {
            return {
                tableOption: {
                    'name': 'InvoiceMailsList',
                    'url': "",
                    'height': 356,
                    'is_pagination':false,
                    'highlightCurrentRow': true,
                    'is_search': false,
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        // {type: 'add',click:this.addRecord},
                    ],
                    'columns': [
                        // {type: 'selection'},
                        {type: 'text', label: '发件人', prop: 'sender',render_simple:'name', width: '200'},
                        {type: 'text', label: '发送时间', prop: 'sent_time', width: '120'},
                        {type: 'text', label: '标题', prop: 'subject', min_width: '200'},
                    ],
                },
                URL:"/mails",

                tableData: [],

            }
        },
        props:{
            data:Array,
            id: {
                type: [String, Number],
                default() {
                    return ""
                },
            }
        },
        methods: {
            refreshTableData(option) {
                const url = this.URL;
                const data = {model:'Invoice',model_id:this.id};
                const success = _ =>{
                    this.tableData = _.data;
                };
                this.$axiosGet({url,data,success})
            },
            handleRowClick(row) {
                this.$refs.mail.show('view',row.id)
            },
            refreshData(){
                this.tableData = this.$tool.deepCopy(this.data);
            },
            refresh() {
                console.log('event refresh');
            }
        },
        watch:{
            data:function (val,oldVal) {
                this.tableData = val;
            }
        },
        components: {
            TableComponent,
            JumpSelect,
            MailEdit,
        },
    }
</script>

<style scoped>

</style>