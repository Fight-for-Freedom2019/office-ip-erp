<!-- 供应商管理 -->
<template>
  <div class="SuppliersList">
    <table-component :tableOption="tableOption" :data="tableData" ref="table"
                     @refreshTableData="refreshTableData"></table-component>

    <!-- 新建客户 -->
    <app-shrink :visible.sync="isCustomerAddPanelVisible" :modal='true' title="新建客户">
          <span slot="header" style="float: right;">
            <el-button type="primary" @click="saveAdd" size="small">新建</el-button>
          </span>
      <customer-list-add ref="customerAdd" :URL="URL" @refresh="addSuccess" popType="add"></customer-list-add>
    </app-shrink>

    <!-- 客户详情面板 -->
    <customer-list-detail
      :title="currentRow.name"
      :visible.sync="isDetailPanelVisible"
      type="customer"
      :id="currentRow.id"
      :row="currentRow"
      ref="detail"
      :URL="URL"
      @editSuccess="refresh">
    </customer-list-detail>

  </div>
</template>

<script>
  import TableComponent from '@/components/common/TableComponent'
  import AppShrink from '@/components/common/AppShrink'
  import CustomerListDetail from '@/components/page_extension/CustomerListDetail'
  import CustomerListAdd from '@/components/page_extension/CustomerListAdd'
  import CustomerList from '@/components/page/CustomerList'
  import {mapGetters} from 'vuex'
    export default {
        name: "Suppliers",
        mixins: [CustomerList],
        data() {
            return {
              URL:"/suppliers",
              is_suppliers:true,
            }
        },
        methods: {
        },
        components: {
          TableComponent,
          AppShrink,
          CustomerListAdd,
          CustomerListDetail,
        },
    }
</script>

<style scoped>

</style>
