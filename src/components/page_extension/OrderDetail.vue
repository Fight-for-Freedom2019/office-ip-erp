<!-- 订单管理 订单明细 -->
<template>
  <div class="OrderDetail">
    <table-component :tableOption="tableOption" :data="data" @getRowData="getRowData"></table-component>
  </div>
</template>


<script>
import TableComponent from "@/components/common/TableComponent";
import Config from "@/const/selectConfig";

const config = new Map(Config);
export default {
  name: "OrderDetail",
  data() {
    return {
      tableOption: {
        name: "OrderDetailList",
        url: "",
        height: 525,
        highlightCurrentRow: true,
        is_search: false,
        is_pagination: false,
        // 'rowClick': this.handleRowClick,
        header_btn: [
          // {type: 'add'},
        ],
        columns: [
          {
            type: "text",
            label: "服务项目",
            prop: "service",
            render_simple: "name",
            min_width: "178"
          },
          { type: "text", label: "单价", prop: "service_fee", width: "120" },
          {
            type: "text",
            label: "预收官费",
            prop: "collected_official_fee",
            width: "120"
          },
          { type: "text", label: "数量", prop: "amount", width: "150" },
          { type: "text", label: "小计", prop: "sum", width: "180" }
          /* 不支持删除
                        *{
                            type: 'action',
                            align:"center",
                            btns: [
                                { type: 'delete',click:this.handleDelete},
                            ],
                        }*/
        ]
      },
      tableData: []
    };
  },
  props: {
    type: {
      type: String,
      default() {
        return "";
      }
    },
    data: Array
  },
  methods: {
    handleDelete(row) {
      this.$confirm("是否删除订单明细?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteDetail(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // TODO 删除接口还没有
    deleteDetail(id) {
      this.$message({
        type: "success",
        message: "删除成功!"
      });
    },
    getRowData(data) {
      this.$emit("getRowData", data);
    }
  },
  components: {
    TableComponent
  }
};
</script>

<style scoped>
</style>