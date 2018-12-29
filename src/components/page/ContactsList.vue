<!-- 联系人管理 -->
<template>
    <div class="main">
        <table-component :tableOption="option" :data="tableData" @refresh="refresh" @update="update" @refreshTableData="refreshTableData"
                         ref="table"></table-component>
        <!-- 新建联系人 -->
        <!--<app-shrink :visible.sync="isContactsAddPanelVisible" :modal='formType === "add"' :title="this.appPanelTitle">
      <span slot="header" style="float: right;">
        <el-button type="primary" @click="saveAdd" v-if="formType === 'add'" size="small">新建</el-button>
        <el-button type="primary" @click="saveAdd" v-if="formType === 'edit'" size="small">保存</el-button>
      </span>
            <contacts-list-add ref="contactsAdd" :type='formType' :contacts='contacts' @refresh="refresh" @update="update"></contacts-list-add>
        </app-shrink>-->
        <contacts-list-add ref="contactsAdd" :type='formType' :contacts='contacts' @refresh="refresh" @update="update"></contacts-list-add>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import ContactsListAdd from '@/components/page_extension/ContactsListAdd'
    import AppShrink from '@/components/common/AppShrink'
    import Config from "@/const/selectConfig";
    import TableMixins from '@/mixins/table-mixins'


    const map = new Map(Config);

    const URL = '/contacts'
    export default {
        name: 'contactsList',
        mixins:[TableMixins],
        data() {
            return {
                isContactsAddPanelVisible: false,
                appPanelTitle: '新建联系人',
                formType: 'add',
                contacts: {},
                option: {
                    'name': 'contactsList',
                    'url': URL,
                    'rowClick': this.handleRowClick,
                    'height': 'default',
                    'is_list_filter': true,
                    'list_type': 'contacts',
                    'treeFilter':'contacts',
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
                        {type: 'text', label: '类型', prop: 'contact_type', width: '100', render: (h, item) => {
                                let options = map.get("contacts_type").options;
                                let name = "";
                                options.map(function (o) {
                                    o.id === item ? name = o.name:"";
                                });
                                return h("span",name);
                            },
                            render_header:true
                        },
                        {type: 'text', label: '邮件地址', prop: 'email_address', width: '145',render_header:true},
                        {type: 'text', label: '电话号码', prop: 'phone_number',width: '145',render_header:true},
                        {type: 'text', label: '地址', prop: 'address', width: '240',render_header:true},
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
                this.contacts = {};
                this.$refs.contactsAdd.show(0,this.formType);
            },
            deleteSingle({id, name}) {
                this.$confirm(`删除后不可恢复，确认删除联系人‘${name}’？`)
                    .then(_ => {
                        const url = `${URL}/${id}`;
                        const success = _ => {
                            this.$message({message: '删除联系人成功', type: 'success'});
                            this.update();
                        };

                        this.$axiosDelete({url, success});
                    })
                    .catch(_ => {
                    });
            },
            handleRowClick (row) {
                this.formType = 'edit';
                this.contacts = row;
                this.$refs.contactsAdd.show(row.id,this.formType);
            },
            refreshTableData(option) {
                const url = URL;
                const data = Object.assign({}, option);
                const success = _ => {
                    this.tableData = _.data;
                    this.formType === "add" ? this.isContactsAddPanelVisible = false : "";
                };

                this.$axiosGet({url, data, success});
            },
            saveAdd (row) {
                let copy = this.$tool.deepCopy(row);
                copy.contact_type === 1 || copy.contact_type=== "未知身份" ? copy.contact_type = "" : "";  // 因为定义的类型里面没有1
                this.contacts = copy;
                copy.customer === null?copy.customer={name:"",id:""}:"";
                this.formType = 'edit';
                this.appPanelTitle = '编辑联系人>' + copy.name;
                this.isContactsAddPanelVisible = true;
            },
            handlePopRefresh(key) {
                this.refresh();
            }
        },
        components: {
            TableComponent, ContactsListAdd, AppShrink
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>