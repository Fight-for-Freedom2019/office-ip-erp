<!-- 联系人管理 -->
<template>
  <div class="main">
  	<table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData" ref="table"></table-component>
  	<!-- 新建联系人 -->
    <app-shrink :visible.sync="isContactsAddPanelVisible" :modal='false' :title="this.appPanelTitle">
      <span slot="header" style="float: right;">
        <el-button type="primary" @click="saveAdd" v-if="formType === 'add'" size="small">新建</el-button>
        <el-button type="primary" @click="saveAdd" v-if="formType === 'edit'" size="small">保存</el-button>
      </span>
      <contacts-list-add ref="contactsAdd" :type='formType' :contacts='contacts' @editSuccess="refreshTableData" @addSuccess="refreshTableData"></contacts-list-add>
    </app-shrink>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import ContactsListAdd from '@/components/page_extension/ContactsListAdd'
import AxiosMixins from '@/mixins/axios-mixins'
import AppShrink from '@/components/common/AppShrink'

const URL = '/api/contacts'

export default {
  name: 'contactsList',
  mixins: [ AxiosMixins ],
  data () {
		return {
          isContactsAddPanelVisible: false,
          appPanelTitle: '新建联系人',
          formType: 'add',
          contacts:{},
		  option: {
            'name': 'contactsList',
            'url': URL,
            'rowClick': this.handleRowClick,
            'height': 'default',
                'header_btn': [
                    { type: 'add', click: this.addPop },
                    { type: 'delete' },     // TODO 删除联系人接口报错
                    { type: 'control' },
                ],
                'columns': [
                    { type: 'selection' },
                    { type: 'text', label: '姓名', prop: 'name', sortable: true, width: '150' },
                    { type: 'text', label: '类型', prop: 'type', sortable: true, width: '240' },
                    { type: 'text', label: '邮箱', prop: 'email_address', width: '145' },
                    { type: 'text', label: '电话', prop: 'phone_number'},
                    { type: 'text', label: '证件号码', prop: 'identity', width:'123'},
                    { type: 'text', label: '是否公开姓名', prop: 'is_publish_name', sortable: true, width: '175' },
                    { type: 'text', label: '英文名', prop: 'first_name', min_width: '200' }, 
                    { type: 'text', label: '英文姓', prop: 'last_name',width: '200' },
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
  	addPop () {
        this.formType = 'add';
        this.appPanelTitle =  '新建联系人';
        this.applicant = {};
        this.isContactsAddPanelVisible = true;
  	},
  	editPop (col) {
  		this.$refs.pop.show('edit', col);
  	},
  	deleteSingle ({id, name}) {
  		this.$confirm(`删除后不可恢复，确认删除联系人‘${name}’？`)
        .then(_=>{
          const url = `${URL}/${id}`;
          const success = _=>{
            this.$message({message: '删除联系人成功', type: 'success'});
            this.update();
          };

          this.axiosDelete({url, success});
        })
        .catch(_=>{});
  	},
    saveAdd () {
      this.$refs.contactsAdd.save(this.formType);
    },
  	refreshTableData (option) {
      const url = URL;
      const data = Object.assign({}, option);
      const success = _=>{this.tableData = _.data };

      this.axiosGet({url, data, success});
      },
    handleRowClick (row) {
        this.contacts = row;
        this.formType = 'edit';
        this.appPanelTitle =  '编辑联系人>' + row.name;
        this.isContactsAddPanelVisible = true;
    },
    refresh () {
      this.$refs.table.refresh();
    },
    update () {
      this.$refs.table.update();
    },
    handlePopRefresh (key) {
      this.refresh();
    }
  },
  mounted () {
    this.refresh();
  },
  components: { TableComponent, ContactsListAdd, AppShrink }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>