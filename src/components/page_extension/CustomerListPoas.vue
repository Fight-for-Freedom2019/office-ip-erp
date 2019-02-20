<template>
  <div>
    <table-component :data="tableData" :tableOption="option" ref="table"
                     @refreshTableData='refreshTableData'></table-component>
    <pop @refresh="refresh" @update="update" ref="pop" :URL="URL" :customer="customer" :contractsID="contractsID"
         :popType="popType"></pop>
  </div>
</template>
<script>
  import TableComponent from '@/components/common/TableComponent'
  import Pop from '@/components/page_extension/PoasListPop'
  import AppTable from '@/components/common/AppTable'
  import {mapGetters} from 'vuex'

  export default {
    name: 'CustomerListPoas',
    props: ['customer', 'itemData','URL'],
    data() {
      return {
        option: {
          URL: this.url,
          is_search: true,
          header_btn: [
            {type: 'add', click: this.addPop},
          ],
          columns: [
            {
              type: 'text',
              prop: 'file.name',
              label: '文件名',
            },
            {type: 'text', prop: 'file.ext', label: '文件类型'},
            {type: 'text', prop: 'file.size', label: '文件大小'},
            {
              type: 'action',
              width: '180',
              align: 'left',
              btns: [
                {type: 'download', click: (o)=>{window.open(o.file.downloadUrl)}},
                {type: 'view', click: (o)=>{window.open(o.file.viewUrl)}},
                {type: 'edit', click: this.editPop},
                {type: 'delete', click: this.clientDelete},
              ]

            },
          ],
          is_pagination: true,
          is_border: true,
          height: "customerList",
        },
        popType: "add",
        tableData: [],
        contractsID: null,
      };
    },
    computed: {
      ...mapGetters([
        'caseMap',
      ]),
      url(){
        return this.URL;
      },
    },
    methods: {
      addPop() {
        this.popType = "add";
        this.$refs.pop.show();
      },
      refresh() {
        this.$refs.table.refresh();
      },
      update() {
        this.$refs.table.update();
      },
      refreshTableData(option) {
        const success = _ => {
          this.tableData = _.data.data;
        }
        let data = {customer_id:this.customer.id};
        Object.assign(data,option);
        this.$axiosGet({
          url: `/poas`,
          data: Object.assign({}, data),
          success,
        })
      },
      clientDelete({id}) {
        const url = `/poas/${id}`;
        this.$confirm(
          '此操作将永久删除该信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
          const success = _ => {
            this.refreshTableData();
            this.$message({message: '删除成功', type: 'success'})
          };

          this.$axiosDelete({url, success});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
      },
      editPop(row) {
        this.popType = "edit";
        let copy = this.$tool.deepCopy(row);
        this.contractsID = copy.id;
        this.$refs.pop.show("edit", copy);
      },
    },
    watch: {
      itemData(val, oldVal) {
        this.tableData = val;
      }
    },
    components: {
      TableComponent,
      Pop,
      AppTable,
    },

  }
</script>