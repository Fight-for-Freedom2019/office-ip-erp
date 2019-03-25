<!-- 回款记录 + 支付记录 -->
<template>
  <div class="ReceivedRecord">
    <table-component
      :tableOption="tableOption"
      :data="tableData"
      ref="table"
      @refreshTableData="refreshTableData"
    ></table-component>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :modal="false"
      size="small"
      width="600px"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <!--<el-form-item label="回款确认用户" prop="creator">-->
        <!--<jump-select type="user" v-model="form.creator"></jump-select>-->
        <!--</el-form-item>-->
        <el-form-item :label="mode === 'pay'? '支付账户':'回款账户'" prop="payment_account">
          <jump-select type="payment_accounts" v-model="form.payment_account"></jump-select>
        </el-form-item>
        <el-form-item :label="mode === 'pay'? '支付时间':'回款时间'" prop="received_date">
          <el-date-picker
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择时间"
            v-model="form.received_date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="mode === 'pay'? '支付金额':'回款金额'" prop="amount">
          <el-input number v-model="form.amount" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <app-button-loading :func="submitForm" ref="loadingBtn" text="保存"></app-button-loading>
          <el-button size="small" @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TableComponent from "@/components/common/TableComponent";
import JumpSelect from "@/components/form/JumpSelect";

export default {
  name: "ReceivedRecord",
  data() {
    let type = "回款";
    if(this.mode === "pay") {
      type = "支付";
    }
    let data = {
      tableOption: {
        name: "ReceivedRecordList",
        url: "",
        height: 356,
        is_pagination: false,
        highlightCurrentRow: true,
        is_search: false,
        // 'rowClick': this.handleRowClick,
        header_btn: [{ type: "add", click: this.addRecord }],
        columns: [
          // {type: 'selection'},
          {
            type: "text",
            label: `${type}账户`,
            prop: "payment_account.abbr",
            width: "120"
          },
          { type: "text", label: `${type}金额`, prop: "amount", width: "120" },
          {
            type: "text",
            label: `${type}时间`,
            prop: "received_date",
            width: "120"
          },
          {
            type: "text",
            label: `${type}确认用户`,
            prop: "creator_user.name",
            width: "150"
          },
          { type: "text", label: "备注", prop: "remark", min_width: "180" },
          {
            type: "action",
            fixed: false,
            width: "178",
            btns: [
              {
                type: "edit",
                click: this.handleEdit,
              },
              {
                type: "delete",
                click: this.handleDelete,
              },
            ]
          },
        ]
      },
      URL: "/received_payments",
      form: {
        payment_account: "",
        amount: "",
        received_date: "",
        remark: ""
      },
      rules: {
        payment_account: [{ required: true, message: `请选择${type}账户` }],
        amount: [
          { required: true, message: `请输入${type}金额`, trigger: "blur" }
        ],
        received_date: [
          { required: true, message: `请选择${type}日期`, trigger: "blur" }
        ]
      },
      tableData: [],
      title: `新增${type}记录`, // 弹窗title
      dialogFormVisible: false,
      reqType:"add",
      rowId:"",
    }
    return {
      ...data
    };
  },

  props: {
    data: Array,
    id: {
      type: [String, Number],
      default() {
        return "";
      }
    },
    mode:{
      type:String,
    },
  },
  methods: {
    refreshTableData(option) {
      const url = `/invoices/${this.id}/received_payments`;
      const success = _ => {
        this.tableData = _.data;
        this.$emit("update");
      };
      this.$axiosGet({ url, data: option, success });
    },
    addRecord() {
      this.reqType = "add";
      this.dialogFormVisible = true;
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.clear();
    },
    refreshData() {
      this.tableData = this.$tool.deepCopy(this.data);
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let url = this.URL;
          let data = Object.assign({}, this.form);
          data.invoice = this.id;
          const success = _ => {
            this.$message({ type: "success", message: "添加成功" });
            this.dialogFormVisible = false;
            this.refreshTableData();
            this.clear();
            this.$emit("received");
          };
          this.reqType === "add" ? this.$axiosPost({ url, data, success }):this.$axiosPut({ url:`${url}/${this.rowId}`, data, success });
        } else {
          this.$message({ type: "warning", message: "请正确填写" });
        }
      });
    },
    clear() {
      this.$refs.form.resetFields();
    },
    handleEdit(row){
      this.reqType = "edit";
      this.rowId = row.id;
      this.dialogFormVisible = true;
      this.$tool.coverObj(this.form,row);
    },
    handleDelete(row){
      const url = `${this.URL}?id[]=${row.id}`;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const success = ()=>{
          this.refreshTableData();
          this.$emit("received");
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
        this.$axiosDelete({url,success})
      })
    },
  },
  watch: {
    data: function(val, oldVal) {
      this.tableData = val;
    }
  },
  components: {
    TableComponent,
    JumpSelect
  }
};
</script>

<style scoped>
</style>