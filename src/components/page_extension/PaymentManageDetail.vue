<!-- 请款管理详情面板 -->
<template>
  <div class="PaymentRequestDetail">
    <app-shrink :visible.sync="dialogVisible" :modal="false" :title="title">
      <span slot="header" style="float: right;">
        <app-button-loading :func="save" ref="loadingBtn" text="保存"></app-button-loading>
        <!-- <el-button type="danger" size="small" @click="deleteInvoice">删除</el-button> -->
        <!--<el-button type="primary" size="small" v-if="showSendMailBtn" @click="sendmail">发送邮件</el-button>-->
        <el-dropdown
          style="margin-left: 10px"
          size="small"
          v-if="showSendMailBtn"
          @command="sendmail"
        >
          <el-button type size="small">
            发送邮件
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">后付款</el-dropdown-item>
            <el-dropdown-item command="2">预付款</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          size="small"
          v-if="status === 'audit'"
          @click="submitCommon('/submit','提交审核')"
        >提交审核</el-button>
        <el-dropdown style="margin-left: 10px" size="small" @command="uploadFile">
          <el-button size="small">
            下载
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="excel">账单详情</el-dropdown-item>
            <el-dropdown-item command="excel_cn" v-if="mode == 'pay'">国知局CN专利缴费单</el-dropdown-item>
            <el-dropdown-item command="excel_pct_national" v-if="mode == 'pay'">国知局PCT首次进入中国国家阶段缴费单</el-dropdown-item>
            <el-dropdown-item command="excel_pct" v-if="mode == 'pay'">国知局PCT国际阶段查询缴费单</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-button type="primary" size="small" v-if="status === 'upload'" @click="submitCommon(rowID,'/add_to_payment_plan','提交付款')">提交付款</el-button> -->
        <!-- <el-button type="primary" size="small" v-if="status === 'confirm'" @click="confirm">确认付款</el-button> -->
        <!--<el-button type="" size="small">退回修改</el-button>-->
      </span>
      <div v-loading="loadingVisible" :element-loading-text="loadingText">
        <el-form
          label-width="75px"
          ref="form"
          v-model="form"
          label-position="left"
          class="form-information"
        >
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="收款对象" class="text-overflow" v-if="mode==='pay'">
                <span class="form-item-text">{{rowData.user?rowData.user.name:""}}</span>
                <!-- 有些from项不用提交，直接使用rowData数据，因为经过coverObj方法的from没办法保留name -->
              </el-form-item>
              <el-form-item label="请款对象" class="text-overflow" v-else>
                <span class="form-item-text">{{rowData.user?rowData.user.name:""}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="负责人">
                <span class="form-item-text">{{rowData.pic?rowData.pic.name:""}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建时间">
                <span class="form-item-text">{{form.creation_time}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="付款状态" v-if="mode==='pay'">
                <static-select type="invoice_status_fee" class="custom-input" v-model="form.status"></static-select>
              </el-form-item>
              <el-form-item label="请款单状态" v-else>
                <static-select type="invoice_status" class="custom-input" v-model="form.status"></static-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="金额">
                <el-input class="custom-picker-input" v-model="form.amount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="币别">
                <static-select type="currency" size="small" v-model="form.currency"></static-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="汇率">
                <el-input class="custom-picker-input" v-model="form.roe"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="人民币金额">
                <el-input class="custom-picker-input" v-model="form.rmb_amount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="请款时间" v-if="mode!=='pay'">
                <el-date-picker placeholder="请选择请款时间" class="custom-picker-input" value-format="yyyy-MM-dd" v-model="form.request_time" ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="支付期限" v-if="mode==='pay'">
                <el-date-picker
                  placeholder="请选择支付期限"
                  class="custom-picker-input"
                  value-format="yyyy-MM-dd"
                  v-model="form.deadline"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="回款期限" v-else>
                <el-date-picker
                  placeholder="请选择回款期限"
                  class="custom-picker-input"
                  value-format="yyyy-MM-dd"
                  v-model="form.deadline"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="支付时间" v-if="mode==='pay'">
                <el-date-picker placeholder="请选择支付时间" class="custom-picker-input" value-format="yyyy-MM-dd" v-model="form.payment_time" ></el-date-picker>
              </el-form-item>
              <el-form-item label="回款时间" v-else>
                <!--<span class="form-item-text">{{form.payment_time}}</span>-->
                <el-date-picker
                  placeholder="请选择回款时间"
                  class="custom-picker-input"
                  value-format="yyyy-MM-dd"
                  v-model="form.payment_time"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="支付金额" v-if="mode==='pay'">
                <el-input class="form-item-text" v-model="form.received_amount" ></el-input>
              </el-form-item>
              <el-form-item label="回款金额" v-else>
                <el-input class="custom-picker-input" v-model="form.received_amount" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-form-item class="break-form upload-from" label="快递" prop="express">
              <up-load v-model="form.express" :fileList="express"></up-load>
          </el-form-item>-->
          <el-form-item label="备注" prop="remark">
            <el-input type="text" v-model="form.remark" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="附件">
            <up-load v-model="form.attachments" :file-list="attachments"></up-load>
          </el-form-item>
        </el-form>
        <div class="PaymentRequestDetail">
          <el-tabs v-model="activeName">
            <el-tab-pane label="费用清单" name="first" v-if="order">
              <payment-cost-detail-order :data="costDetail" :id="id"></payment-cost-detail-order>
            </el-tab-pane>
            <el-tab-pane label="费用清单" name="first" v-if="!order">
              <payment-cost-detail :data="costDetail" :id="id" @reload="reload"></payment-cost-detail>
            </el-tab-pane>
            <el-tab-pane label="跟催记录" name="reminders">
              <reminders-record ref="reminders" :data="remindersData" :invoice="invoice" :id="id"></reminders-record>
            </el-tab-pane>
            <el-tab-pane label="支付记录" name="payments" v-if="mode==='pay'">
              <received-record ref="payments" :id="id" :invoice="invoice" :data="receivedData"></received-record>
            </el-tab-pane>
            <el-tab-pane label="回款记录" name="received_payments" v-else>
              <received-record
                ref="receivedPayments"
                :id="id"
                :data="receivedData"
                :invoice="invoice"
                @received="received"
              ></received-record>
            </el-tab-pane>
            <el-tab-pane label="发票" name="vouchers">
              <invoice-vouchers :data="vouchers" ref="vouchers" :invoice="invoice" :id="id"></invoice-vouchers>
            </el-tab-pane>
            <el-tab-pane label="邮件" name="mails">
              <invoice-mails :data="mails" ref="mails" :invoice="invoice" :id="id"></invoice-mails>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </app-shrink>
    <el-dialog title="确认付款" :inline="true" :visible.sync="paymentDialog" width="40%">
      <el-form :rules="rules" v-model="form" label-width="100px" label-position="left" ref="form">
        <el-form-item label="付款时间" prop="date">
          <el-date-picker value-format="yyyy-MM-dd" v-model="form.date"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmPayment">确认</el-button>
          <el-button @click="()=>{paymentDialog = false}">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <mail-add ref="mail" @refresh="refreshMail"></mail-add>
  </div>
</template>

<script>
import RemoteSelect from "@/components/form/RemoteSelect";
import StaticSelect from "@/components/form/StaticSelect";
import UpLoad from "@/components/form/Upload";
import PaymentCostDetail from "@/components/page_extension/PaymentCostDetail";
import PaymentCostDetailOrder from "@/components/page_extension/PaymentCostDetailOrder";
import RemindersRecord from "@/components/page_extension/RemindersRecord";
import ReceivedRecord from "@/components/page_extension/ReceivedRecord";
import InvoiceMails from "@/components/page_extension/InvoiceMails";
import InvoiceVouchers from "@/components/page_extension/InvoiceVouchers";
import AppShrink from "@/components/common/AppShrink";
import MailAdd from "@/components/page/MailAdd";

const status = [[0, "audit"], [8, "remind"], [11, "upload"], [12, "confirm"]];
const statusMap = new Map(status);

export default {
    name: "PaymentRequestDetail",
    data() {
        return {
            activeName: "first",
            form: {
                creator_user: {
                    name: ""
                },
                pic: {
                    name: ""
                },
                user: {
                    name: ""
                },
                creation_time: "",
                status: "",
                amount: "",
                currency: "",
                roe: "",
                rmb_amount: "",
                request_time: "",
                deadline: "",
                payment_time: "",
                received_amount: "",
                remark: "",
                express: [],
                attachments: []
            },
            attachments: [],
            express: [],
            costDetail: [],
            remindersData: [],
            receivedData: [],
            vouchers: [],
            mails: [],
            loadingVisible: false,
            loadingText: "加载账单详情中...",
            id: 0,
            mode: "request",
            title: "",
            status: "",
            dialogVisible: false,
            paymentDialog: false,
            rowData: {},
            rules: {
                date: [{ required: true, message: "请选择付款时间", trigger: "blur" }]
            },
            showSendMailBtn: true,
            invoice: {}
        };
    },
    props: {
        type: {
            // 是付款还是请款
            type: String
        }
    },
    computed: {
        order() {
            let order = false;
            this.costDetail.forEach(_ => {
                if (_.order != undefined && _.order.id) {
                    order = true;
                }
            });
            return order;
        }
    },
    methods: {
        refreshMail() {
            this.$refs.mails.refreshTableData();
        },
        reload() {
            this.getDetail(this.id);
            this.$emit('update');
        },
        submitCommon(suffix, hint) {
            this.$confirm(`是否${hint}`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                const id = this.id;
                let url = `/invoices/${id}${suffix}`;
                const success = _ => {
                    this.$emit("update");
                    this.$message({ type: "success", message: "操作成功" });
                    this.getDetail(id);
                };
                const error = _ => {
                    this.$message({ type: "warning", message: _.info });
                };
                this.$axiosPost({ url, success, error });
            });
        },
        save() {
            let data = Object.assign({},this.form);
            let url = `/invoices/${this.id}`;
            const success = _ => {
                this.$message({ type: "success", message: "操作成功!" });
                this.$emit("update");
            };
            this.$axiosPut({ url, data, success });
        },
        getDetail(id) {
            const url = `/invoices/${id}`;
            this.openLoading();
            this.attachments = [];
            const success = _ => {
                const d = _.data;
                this.receivedData = d.received_payments;
                this.remindersData = d.reminders;
                this.costDetail = d.fees ? d.fees : [];
                this.vouchers = d.vouchers ? d.vouchers : [];
                this.mails = d.mails ? d.mails : [];
                this.rowData = d;
                this.form.received_amount = this.getAllReceived(this.receivedData);
                this.attachments = d.attachments;
                this.title =
                    (this.mode === "pay" ? "付款单" : "请款单") + "详情>" + d.serial;
                this.status = statusMap.get(d.status.id); // 之前status是个Object，现在变成了一个Number类型
                this.invoice = d;
            };
            const complete = () => {
                this.closeLoading();
            };
            this.$axiosGet({ url, success, complete });
        },
        changeState() {
            // 改变状态的方法，有点繁琐
            this.form.status = 10;
        },
        coverObj(val) {
            val ? this.$tool.coverObj(this.form, val, { obj: ["status"] }) : "";
        },
        getAllReceived(data) {
            this.setPaymentTime(data);
            // 获取回款总额
            let sum = 0;
            data.map(function (item) {
                sum += item.amount ? item.amount : 0;
            });
            return sum;
        },
        // 将回款记录中的第一条的回款时间设置为上面的回款时间
        setPaymentTime(data) {
            this.$nextTick(() => {
                data.length !== 0
                    ? (this.form.payment_time = data[0].received_date)
                    : "";
            });
        },
        openLoading() {
            this.loadingVisible = true;
        },
        closeLoading() {
            this.loadingVisible = false;
        },
        show(id, mode, data) {
            this.dialogVisible = true;
            this.mode = mode;
            if (data != undefined) {
                this.rowData = data;
                this.id = data.id;
            }
            this.id = id;
            this.getDetail(id);
        },
        close() {
            this.dialogVisible = false;
        },
        deleteInvoice() {
            return;
        },
        received() {
            this.getDetail(this.id);
        },
        sendmail(fee_policy) {
            this.$refs.mail.showCommon("账单", this.id, "fee_policy", fee_policy);
        },
        uploadFile(type) {
            const token = window.localStorage.getItem("token");
            console.log(token);
            window.open(`invoices/${this.id}?format=${type}&token=${token}`);
        },
        confirm() {
            this.paymentDialog = true;
        },
        confirmPayment() {
            this.$refs.form.validate(valid => {
                if (valid) {
                }
            });
        }
    },
    created() { },
    mounted() { },
    watch: {
        rowData: function (val, oldVal) {
            this.coverObj(val);
            if (this.form.express || this.form.express.length !== 0) {
                this.form.express.map(_ => {
                    _.name = _.serial;
                });
                this.express = [...this.form.express];
            }
        }
    },
    components: {
        RemoteSelect,
        UpLoad,
        PaymentCostDetail,
        PaymentCostDetailOrder,
        RemindersRecord,
        ReceivedRecord,
        StaticSelect,
        AppShrink,
        MailAdd,
        InvoiceMails,
        InvoiceVouchers
    }
};
</script>
<style>
.PaymentRequestDetail .custom-input .el-input__inner,
.PaymentRequestDetail .custom-picker-input .el-input__inner {
  height: 28px;
  line-height: 28px;
  font-size: 12px;
}

.PaymentRequestDetail .custom-picker-input .el-input__inner {
  padding: 0 14px;
}

.PaymentRequestDetail .custom-input .el-input__icon,
.PaymentRequestDetail .custom-picker-input .el-input__icon {
  line-height: 28px;
}

.PaymentRequestDetail .custom-picker-input .el-input__prefix {
  display: none;
}
.PaymentRequestDetail .text-overflow {
  max-width: 255px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
