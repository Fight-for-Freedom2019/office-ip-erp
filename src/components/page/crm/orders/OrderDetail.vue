<!-- 订单详情,与请/付款管理的template结构类似,字段不同 -->
<template>
  <div class="OrderDetail">
    <app-shrink :visible.sync="dialogVisible" :title="title">
      <span slot="header" style="float: right;">
        <app-button-loading :func="save" ref="loadingBtn" text="保存"></app-button-loading>
        <el-button type="danger" size="small" @click="deleteOrder" v-if="status === 'audit'">删除</el-button>
        <el-button
          type="primary"
          size="small"
          v-if="status === 'audit'"
          @click="submitCommon(id,'/submit','提交审核')"
        >提交审核</el-button>
      </span>
      <div v-loading="loadingVisible" :element-loading-text="loadingText">
        <el-form
          label-width="75px"
          ref="form"
          v-model="form"
          label-position="left"
          class="form-information"
        >
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="客户">
                <span class="form-item-text">{{form.customer?form.customer.name:""}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户联系人">
                <span class="form-item-text">{{form.contact?form.contact.name:""}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建人">
                <span class="form-item-text">{{form.creator_user.name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建时间">
                <span class="form-item-text">{{form.creation_time}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="所属销售">
                <span class="form-item-text">{{form.sales?form.sales.name:""}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单金额">
                <span class="form-item-text">{{form.amount}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="交付期限">
                <span class="form-item-text">{{form.delivery_date}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单状态">
                <static-select
                  class="custom-input"
                  type="order_status"
                  v-model="form.status"
                  :disabled="true"
                ></static-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="break-form" label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark" resize="none"></el-input>
          </el-form-item>
          <el-form-item class="break-form upload-form" label="附件">
            <up-load v-model="form.attachments" :file-list="form.attachments"></up-load>
          </el-form-item>
        </el-form>
        <div class="OrderManageRelevant">
          <el-tabs v-model="activeName">
            <el-tab-pane label="订单明细" name="first">
              <order-detail-service :data="order_service" :id="id"></order-detail-service>
            </el-tab-pane>
            <el-tab-pane label="相关合同" name="reminders">
              <order-detail-contract
                ref="reminders"
                :data="contracts"
                :status="form.status"
                :id="id"
                :order="this.order"
                @refresh="refresh"
              ></order-detail-contract>
            </el-tab-pane>
            <el-tab-pane label="相关账单" name="received_payments">
              <order-detail-invoice ref="received" :id="id" :data="invoices"></order-detail-invoice>
            </el-tab-pane>
            <el-tab-pane label="相关案件" name="case">
              <order-detail-project ref="received" :id="id" :data="projects"></order-detail-project>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </app-shrink>
  </div>
</template>

<script>
import RemoteSelect from "@/components/form/RemoteSelect";
import StaticSelect from "@/components/form/StaticSelect";
import UpLoad from "@/components/form/Upload";
import OrderDetailService from "@/components/page/crm/orders/OrderDetailServie";
import OrderDetailInvoice from "@/components/page/crm/orders/RelevantInvoice";
import OrderDetailContract from "@/components/page/crm/orders/RelevantContract";
import OrderDetailProject from "@/components/page/crm/orders/RelevantProject";
import FeeManage from "@/mixins/fee-manage";
import AppShrink from "@/components/common/AppShrink";

const status = [
  [1, "audit"],
  [3, "audit"],
  [8, "remind"],
  [11, "upload"],
  [12, "confirm"]
];
const URL = "/orders";
const statusMap = new Map(status);

export default {
  name: "OrderDetail",
  mixins: [],
  data() {
    return {
      activeName: "first",
      form: {
        customer: {
          name: ""
        },
        contact: {
          name: ""
        },
        sales: "",
        delivery_date: "",
        status: null,
        amount: "",
        remark: "",
        creation_time: "",
        creator_user: {
          name: ""
        },
        services: [
          { service: { id: "", name: "" }, service_fee: "", amount: "", sum: "" }
        ],
        attachments: []
      },
      express: [],
      loadingVisible: true,
      loadingText: "订单详情加载中...",
      URL: "/orders",
      invoices: [],
      projects: [],
      contracts: [],
      order_service: [],
      attachments: [],
      status: "audit",
      title: "",
      id: 0,
      mode: "edit",
      dialogVisible: false,
      order: {}
    };
  },
  methods: {
    deleteOrder() {
      let url = `/orders/${this.id}`;
      const success = _ => {
        this.$message({ type: "success", message: "删除订单成功!" });
        this.$emit("update");
        this.dialogVisible = false;
      };
      this.$axiosDelete({ url, data, success });
    },
    submitCommon(id, suffix, hint) {
      this.$confirm(`是否${hint}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let data = {
          remark: this.form.remark,
          attachments: this.form.attachments
        };
        let url = `/orders/${id}${suffix}`;
        const success = _ => {
          this.$emit("update");
          this.show(id, "edit");
          this.$message({ type: "success", message: "操作成功" });
        };
        const error = _ => {
          this.$message({ type: "warning", message: _.info });
        };
        this.$axiosPost({ url, data, success, error });
      });
    },
    save() {
      let data = {
        remark: this.form.remark,
        attachments: this.form.attachments
      }; // TODO 这里的参数文档中没定义好
      let url = `/orders/${this.id}`;
      const success = _ => {
        this.$message({ type: "success", message: "操作成功!" });
        this.$emit("update");
      };
      this.$axiosPut({ url, data, success });
    },
    show(id, mode) {
      console.log('here');
      this.id = id;
      this.mode = mode;
      this.openLoading();
      if (!this.dialogVisible) {
        this.dialogVisible = true;
      }
      const url = `${this.URL}/${id}`;
      const success = _ => {
        const target = _.data;
        this.order = target;
        const contracts = target.contracts;
        const order_service = target.order_services;
        const projects = target.projects;
        const invoices = target.invoices;
        this.$tool.coverObj(this.form, target, { obj: ["status"] });
        // this.attachments = target.attachments;
        this.order_service = order_service ? order_service : [];
        this.contracts = contracts ? contracts : [];
        this.projects = projects ? projects : [];
        this.invoices = invoices ? invoices : [];
        this.status = statusMap.get(target.status.id);
        this.title = this.mode == "edit" ? "订单详情>" + target.serial : "";
      };
      const complete = () => {
        this.closeLoading();
        this.$emit("loaded");
      };
      this.$axiosGet({ url, success, complete });
    },
    close () {
      this.dialogVisible = false;
    },
    refresh() {
      this.show(this.id, this.mode);
    },

    changeState() {
      // 改变状态的方法，有点繁琐
      this.form.status = 10;
    },
    openLoading() {
      this.loadingVisible = true;
    },
    closeLoading() {
      this.loadingVisible = false;
    }
  },
  created() {},
  watch: {},
  components: {
    RemoteSelect,
    UpLoad,
    OrderDetailService,
    OrderDetailProject,
    OrderDetailContract,
    OrderDetailInvoice,
    StaticSelect,
    AppShrink
  }
};
</script>

<style scoped>
.form-item-text {
  display: inline-block;
  max-width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

#app .form-information .break-form .el-form-item__label {
  font-size: 14px;
  color: #606266;
}

.OrderManageRelevant {
  margin-top: 10px;
}
</style>
<style>
#app .OrderDetail .break-form textarea {
  height: auto;
}

#app .OrderDetail .upload-form {
  height: auto;
}

.OrderDetail .custom-input .el-input__inner,
.OrderDetail .custom-picker-input .el-input__inner {
  height: 28px;
  line-height: 28px;
  font-size: 12px;
}

.OrderDetail .custom-picker-input .el-input__inner {
  padding: 0 14px;
}

.OrderDetail .custom-input .el-input__icon,
.OrderDetail .custom-picker-input .el-input__icon {
  line-height: 28px;
}

.OrderDetail .custom-picker-input .el-input__prefix {
  display: none;
}
</style>