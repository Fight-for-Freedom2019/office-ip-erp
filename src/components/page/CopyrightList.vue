<template>
  <div class="main">
    <table-component :tableOption="tableOption" :data="tableData" :refreshTableData="refreshTableData" ref="table"></table-component>
    
      <common-detail
        :title="currentRow.title"
        ref="copyright_detail"
        type="copyright" 
        :id="currentRow.id"
        @editSuccess="refresh">
      </common-detail>
      <detail-shrink ref="copyrightAdd" page-type="add" @addSuccess="refresh()"></detail-shrink>
  </div>
</template>

<script>
import TableComponent from '@/components/common/TableComponent'
import Strainer from '@/components/page_extension/CopyrightList_strainer'
import AppShrink from '@/components/common/AppShrink'
import DetailShrink from '@/components/page_extension/DetailShrink'
import CommonDetail from '@/components/page_extension/Common_detail'

import {mapGetters} from 'vuex'

const URL = '/copyrights';

export default {
  name: 'copyrightList',
  data () {
    return {
      currentRow: '',
      shrinkVisible: false,
      tableOption: {
        'name': 'copyrightList',
        'url': URL,
        'height': 'default',
        'highlightCurrentRow': true, 
        'rowClick': this.handleRowClick,
        // 'is_filter': true,
        'is_list_filter': true,
        'is_view': true,
        'list_type': 'copyright',
        'treeFilter': 'copyright',
        'import_type': 'copyright',
        // 'upload_type': 'copyright',
        'header_btn': [
          { type: 'add', click: this.add, map_if: '/copyright/draftbox', btn_if: '/draftbox' },
          { type: 'delete' },
          { type: 'export2' },
          // { type: 'import' },
          // { type: 'batch_upload' },
          { type: 'control', label: '字段' },
        ],
        'columns': [
          { type: 'selection' },
          { type: 'text', label: '案号', prop: 'serial', width: '200', render_header: true,  },
          { type: 'text', label: '标题', prop: 'title', width: '160', render_header: true,},
          { type: 'text', label: '版权类型', prop: 'subtype', render_simple: 'name', width: '160', render_header: true, },
          { type: 'text', label: '受理号', prop: 'application_number', width: '160', render_header: true, },
          { type: 'text', label: '受理日', prop: 'application_date', width: '100', render_header: true, },
          { type: 'text', label: '下证日', prop: 'issue_date', width: '100', render_header: true, },
          { type: 'text', label: '客户', prop: 'customer', render_simple: 'name', width: '178', render_header: true, },
          { type: 'text', label: '客户案号', prop: 'customer_serial', width: '198', render_header: true, },
          { type: 'array', label: '申请人', prop: 'applicants', render: _=>_.map(_=>_.name), width: '198' },
          { type: 'text', label: '联系人', prop: 'contact', render_simple: 'name', width: '145', render_header: true, },
          { type: 'text', label: '案件状态', prop: 'project_stage', render_simple: 'name', width: '145', render_header: true,},
          { type: 'text', label: '承办部门', prop: 'organization_unit', render_simple: 'name', width: '145', render_header:true,},
          { type: 'text', label: '代理人', prop: 'agent', render_simple: 'name', width: '140', render_header: true, },
          { type: 'text', label: '销售', prop: 'sales', render_simple: 'name', width: '140', render_header: true, },
          { type: 'text', label: '订单号', prop: 'order', render_simple: 'serial',  width: '160', render_header:true, },
          { type: 'text', label: '备注', prop: 'remark', width: '178', render_header: true,},
        ] 
      },
      tableData: [],
      filter: {},
    };
  },
  computed: {
    ...mapGetters([
      'menusMap',
    ]),
    defaultParams () {
      const params = this.$route.meta.params;
      return params ? params : {};
    },
    custom () {
      const custom = this.$route.meta.custom;
      return custom !== undefined ? custom : false;
    }
  },
  methods: {
    add () {
      this.$refs.copyrightAdd.show(null,'copyright');
    },
    refreshTableData (option) {
      const url = URL;
      const data = Object.assign({}, option, this.defaultParams);
      const success = d=>{
        if(data['format'] == 'excel') {
          window.location.href = d.copyrights.downloadUrl;
        }else {
          this.tableData = d.copyrights;  
        }      
      };
      return this.$axiosGet({url, data, success});
    },
    refresh () {
      this.$refs.table.refresh();
    },
    deleteSingle ({ title, id }) {
      this.$confirm(`删除后不可恢复，确认删除‘${title}’吗？`)
        .then(()=>{
          const url=`${URL}/${id}`;
          const success = _=>{this.$refs.table.update()};
          this.$axiosDelete({url, success});    
        })
        .catch(()=>{});
    },
    detail ({id}) {
      const path = `/copyright/list/detail/${id}`; 
      this.$router.push( path );
    },
    handleRowClick (row) {
      if( this.menusMap && this.menusMap.get('/copyright/read') ) {
        this.currentRow = row;
        this.$refs.copyright_detail.show(row.id, 'copyright');
        // if(!this.shrinkVisible) this.shrinkVisible = true;
      }
    },
    close () {
      this.$refs.table.setCurrentRow();
    }
  },
  mounted () {
      this.refresh();
  },
  components: { 
    TableComponent, 
    AppShrink, 
    CommonDetail,
    DetailShrink, 
  }
}
</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>
