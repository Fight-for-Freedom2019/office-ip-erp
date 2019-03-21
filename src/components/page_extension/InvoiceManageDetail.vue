<!-- 发票管理详情 -->
<template>
  <app-shrink :visible.sync="dialogVisible" :modal="false" :title="title">
    <span slot="header" style="float: right;">
      <app-button-loading :func="save" v-if="mode === 'add'" ref="loadingBtn" text="申请开票"></app-button-loading>
      <app-button-loading :func="save" v-if="mode === 'edit'" ref="loadingBtn" text="保存"></app-button-loading>
    </span>

    <el-form label-width="75px" :model="form" :rules="rules" ref="form" class="InvoiceManageDetail" style="margin-top: 10px;" v-loading="loadingVisible" :element-loading-text="loadingText">
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户" prop="customer">
            <jump-select type="customer" v-model="form.customer" :disabled="this.mode === 'edit'"></jump-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="24">
          <el-form-item label="账单" prop="invoice">
            <jump-select
              type="bill"
              :para="para"
              v-model="form.invoice"
              :disabled="this.mode === 'edit'"
              multiple
            ></jump-select>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row >
        <el-col :span="24">
          <el-form-item label="抬头" prop="invoice_target" v-if="this.mode === 'add'">
            <remote-select
              type="invoice_target"
              v-model="form.invoice_target"
              :para="para"
              addType="invoice_target"
            ></remote-select>
          </el-form-item>
          
        </el-col>
        <!-- <el-form-item label="税务票号" prop="tax_no">
          <el-input type="text" v-model="form.tax_no" placeholder="请输入税务票号"></el-input>
        </el-form-item> -->
        <!-- <el-col :span="12">
                        <el-form-item label="金额" prop="amount">
                            <el-input type="number" v-model="form.amount" placeholder="请输入金额"></el-input>
                        </el-form-item>
        </el-col>-->
      </el-row>
      
      <el-form-item label="发票类型" prop="voucher_type">
        <static-select type="voucher_type" v-model="form.voucher_type"></static-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态" prop="status" v-if="this.mode === 'edit'">
            <static-select type="voucher_status" v-model="form.status"></static-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开票日期" prop="date" v-if="this.mode === 'edit'">
            <el-date-picker type="date" v-model="form.date"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
                    <el-col :span="12">

                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="申请国家" prop="citizenship">
                            <static-select v-model="form.citizenship" type="area"></static-select>
                        </el-form-item>
                    </el-col>
      </el-row>-->
      <el-form-item label="备注" prop="remark">
        <el-input type="text" v-model="form.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-form-item label="附件" prop>
            <up-load v-model="form.attachments" :fileList="attachments"></up-load>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="开票信息" v-if="this.mode === 'edit'">
           <app-table :columns="columns" :data="tableData" :show-header="false"></app-table>
        </el-form-item>
        <el-form-item label="原始凭证" v-if="this.mode === 'edit'">
           <template v-if="this.target != null && this.target.file != null">
             <el-button type="text" @click="showFile" style="padding:0px">{{this.target.file.name}}</el-button>
           </template>
           <template v-else>
             <span>暂未上传</span>
           </template>
        </el-form-item>
      </el-row>
      <el-row>
          <el-form-item label="费用明细" prop="fee">
            <el-button type="text" @click="selectFee">选择费用</el-button>
            <table-component key="table-add" :tableOption="tableOption" :data="fees" ref="table" v-if="this.mode === 'add'" ></table-component>
            <table-component key="table-edit" :tableOption="tableOptionEdit" :data="fees" ref="table" v-else></table-component>
          </el-form-item>
      </el-row>
      
      
      <voucher-fee-select :tableOption="invoiceFeeListOption" @onFeesSelected="onFeesSelected" ref="select" ></voucher-fee-select>
      <common-detail ref="project"></common-detail>
      <order-detail ref="order"></order-detail>
      <payment-manage-detail ref="invoiceDetail" @update="update"></payment-manage-detail>
    </el-form>

    <!-- <el-dialog title="发票明细" :visible.sync="dialogFormVisible" :modal="false">
            <table-component :tableOption="feeDetailOption" :data="feesDetail"></table-component>
    </el-dialog>-->
    <!-- 这里需要props是因为要修改表单内容 -->
  </app-shrink>
</template>

<script>
import JumpSelect from "@/components/form/JumpSelect";
import UpLoad from "@/components/form/Upload";
import StaticSelect from "@/components/form/StaticSelect";
import VoucherFeeSelect from "@/components/page_extension/VoucherFeeSelect";
import TableComponent from "@/components/common/TableComponent";
import AppShrink from "@/components/common/AppShrink";
import AppTable from "@/components/common/AppTable";
import OrderDetail from "@/components/page/crm/orders/OrderDetail";
import CommonDetail from "@/components/page_extension/Common_detail";

export default {
    name: "InvoiceManageDetail",
    data() {
        return {
            URL: "/vouchers",
            rules: {
                customer: [{ required: true, message: "请选择客户" }],
                // invoice: [{ required: true, message: "请选择账单" }],
                invoice_target: [
                    { required: true, message: "请选择抬头", trigger: "blur" }
                ],
                // received_date: [
                //     { required: true, message: "请选择回款日期", trigger: "blur" }
                // ]
            },
            form: {
                customer: "",
                // customer_name: "",
                invoice_target: "",
                // invoice: "",
                // title: "",
                // received_date: "",
                // amount: "",
                status: "",
                attachments: [],
                // tax_no: ""
                voucher_type: 1,
                remark: '',
                date: '',
            },
            attachments: [],
            para: {
                user: null,
                customer: null,
            },
            target: '',
            bill: {
                // 账单JumpSelect的type
                URL: "/invoices",
                DATA_KEY: "invoice",
                PLACEHOLDER: "请选择账单",
                PARAMS: { is_debit: 1 }
            },
            dialogFormVisible: false,
            dialogVisible: false,
            loadingVisible: false,
            loadingText: "发票数据加载中...",
            title: "",
            mode: "add",
            tableOption: {
                name: "PaymentCostDetailList",
                url: "",
                height: "voucher_edit",
                is_pagination: false,
                highlightCurrentRow: true,
                is_search: false,
                show_summary: true,
                // 'rowClick': this.handleRowClick,
                header_btn: [
                    // {type: 'add'},
                ],
                columns: [
                    // {type: 'text', label: '客户', prop: 'customer.name', min_width: '178'},
                    { type: "text", label: "费用名称", prop: "feecode", render_simple: 'name', min_width: "100" },
                    { type: "text", label: "金额", prop: "rmb_amount_currency", width: "120" },
                    {
                        type: "text-btn",
                        label: "案号",
                        prop: "project.serial",
                        width: "160",
                        click: this.showDetail,
                        render_text_btn: row => {
                            return row.project ? row.project.serial : "";
                        }
                    },
                    { type: "text", label: "标题", prop: "project.title", min_width: "150" },
                    {
                        type: "text-btn",
                        label: "订单号",
                        prop: "order.serial",
                        width: "120",
                        click: this.showDetail,
                        render_text_btn: row => {
                            return row.order ? row.order.serial : "";
                        }
                    },
                    // {type: 'text', label: '申请国家', prop: 'area', width: '180'},
                    // { type: "text", label: "申请号", prop: "application_number", width: "120" },
                    // { type: "text", label: "申请日", prop: "application_date", width: "100" },

                    // {type: 'text', label: '费用策略', prop: 'policy', width: '150'},
                    // {type: 'array', label: '官费票据', prop: 'official_voucher', width: '150'},
                    // {type: 'array', label: '代理费票据', prop: 'service_voucher', width: '150'},
                    { type: "action", width: "60", align: "center", btns: [{ type: "delete", click: this.removeFee }] }
                ],
                sumFunc: this.sumFunc
            },
            tableOptionEdit: {
                name: "PaymentCostDetailList",
                url: "",
                height: 340,
                is_pagination: false,
                highlightCurrentRow: true,
                is_search: false,
                show_summary: true,
                // 'rowClick': this.handleRowClick,
                header_btn: [
                    // {type: 'add'},
                ],
                columns: [
                    // {type: 'text', label: '客户', prop: 'customer.name', min_width: '178'},
                    { type: "text", label: "费用名称", prop: "feecode", render_simple: 'name', width: "100" },
                    { type: "text", label: "金额", prop: "rmb_amount_currency", width: "100" },

                    {
                        type: "text-btn",
                        label: "案号",
                        prop: "project.serial",
                        width: "178",
                        click: this.showDetail,
                        render_text_btn: row => {
                            return row.project ? row.project.serial : "";
                        }
                    },
                    { type: "text", label: "标题", prop: "project.title", min_width: "150" },
                    { type: "text-btn", label: "账单号", prop: "invoice", render_simple: "serial", width: "130", render_text_btn: (row) => { return row.invoice != null ? row.invoice.serial : "" }, click: this.handleInvoiceDetail},
                  {
                        type: "text-btn",
                        label: "订单号",
                        prop: "order.serial",
                        width: "120",
                        click: this.showDetail,
                        render_text_btn: row => {
                            return row.order ? row.order.serial : "";
                        }
                    },
                    // {type: 'text', label: '申请国家', prop: 'area', width: '180'},
                    // { type: "text", label: "申请号", prop: "application_number", width: "120" },
                    // { type: "text", label: "申请日", prop: "application_date", width: "100" }
                    // {type: 'text', label: '费用策略', prop: 'policy', width: '150'},
                    // {type: 'array', label: '官费票据', prop: 'official_voucher', width: '150'},
                    // {type: 'array', label: '代理费票据', prop: 'service_voucher', width: '150'},
                ],
                sumFunc: this.sumFunc
            },
            invoiceFeeListOption: {
                name: "PaymentCostDetailList",
                url: "",
                height: 250,
                highlightCurrentRow: true,
                is_search: false,
                is_pagination: false,
                // 'rowClick': this.handleRowClick,
                header_btn: [
                    // {type: 'add'},
                ],
                columns: [
                    { type: "selection" },
                    { type: "text", label: "费用名称", prop: "feecode", render_simple: 'name', width: "100" },
                    { type: "text", label: "金额", prop: "rmb_amount_currency", width: "100" },
                    { type: "text", label: "订单号", prop: "order.serial", width: "120" },
                    { type: "text", label: "案号", prop: "serial", width: "120" },
                    { type: "text", label: "标题", prop: "title", min_width: "150" },
                ]
            },
            feeDetailOption: {
                name: "feeDetailList",
                url: "",
                height: 387,
                highlightCurrentRow: true,
                is_search: false,
                // 'rowClick': this.handleRowClick,
                header_btn: [
                    // {type: 'add'},
                ],
                columns: [
                    // {type: 'selection'},
                    { type: "text", label: "案号/订单号", prop: "fee_code.name", min_width: "150" },
                    { type: "text", label: "案件名称", prop: "fee_code.fee_type", width: "130" },
                    { type: "text", label: "官费", prop: "amount", width: "130" },
                    { type: "text", label: "代理费", prop: "currency", width: "130" },
                    { type: "text", label: "小计", prop: "roe", width: "130" }
                ]
            },
            columns: [
                { type: 'text', label: '字段', prop: 'field', width: '180' },
                { type: 'text-copy', label: '值', prop: 'value', min_width: '180' },
            ],
            fees: [],
            feesDetail: [], //费用明细
            invoiceFees: []
        };
    },
    props: {
        rowData: {
            type: Object,
            default() {
                return {};
            }
        },
        invoice: Object
    },
    computed: {
        extendParam: function () {
            return this.$route.meta.params
        },
        tableData: function () {
            return [
                { field: '抬头', value: this.target ? this.target.name : '' },
                { field: '纳税人识别号', value: this.target ? this.target.identity : '' },
                { field: '开户行', value: this.target ? this.target.bank : '' },
                { field: '银行账号', value: this.target ? this.target.account : '' },
                { field: '地址', value: this.target ? this.target.address : '' },
                { field: '联系电话', value: this.target ? this.target.phone_number : '' },
            ]
        }
    },
    methods: {
        sumFunc: param => {
            const { columns, data } = param;
            const sums = [];
            const fields = [
                "rmb_amount_currency",
            ];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = "总计";
                    return;
                }
                if (fields.indexOf(column.property) >= 0) {
                    const values = data.map(item =>
                        Number(item[column.property].replace(/,/g, ""))
                    );
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        //将结果拆分为小数与整数
                        const digits = sums[index]
                            .toFixed(2)
                            .toString()
                            .split(".");
                        let number;
                        let decimal;
                        if (digits.length > 1) {
                            number = digits[0].toString();
                            decimal = digits[1];
                        } else {
                            number = sums[index].toString();
                            decimal = "00";
                        }
                        sums[index] =
                            number.replace(/\B(?=(\d{3})+$)/g, ",") + "." + decimal;
                    }
                } else {
                    sums[index] = "";
                }
            });

            return sums;
        },
        showFile() {
            window.open(this.target.file.viewUrl);
        },
        save() {
            // type是父组件传来的,表示是add还是edit,id表示修改的某一行数据的id
            this.$refs["form"].validate(valid => {
                if (valid) {
                    let url;
                    let message = "";
                    let fun = "";
                    if (this.mode === "add") {
                        url = this.URL;
                        message = "添加";
                        fun = "refresh";
                    } else {
                        url = `${this.URL}/${this.id}`;
                        message = "编辑";
                        fun = "update";
                    }
                    let data = this.form;
                    Object.assign(data, this.extendParam);
                    let fees = [];
                    this.fees.forEach(item => {
                        fees.push(item.id);
                    });
                    data.fees = fees;
                    const success = _ => {
                        this.$message({ type: "success", message: _.info });
                        this.$emit(fun);
                        this.dialogVisible = false;
                    };
                    this.mode === "add"
                        ? this.$axiosPost({ url, data, success })
                        : this.$axiosPut({ url, data, success });
                } else {
                    this.$message({ type: "warning", message: "请填写必选项!" });
                }
            });
        },
        selectFee() {
            const l = this.form.customer - 0;
            if (l > 0) {
                this.$refs.select.show(this.form.customer);
            } else {
                this.$message({ 'message': '请先选择客户！', type: 'warning' });
            }
        },
        onFeesSelected(data) {
            const _this = this;
            const l = data.length;
            if (l > 0) {
                data = data.filter(_ => {
                    let flag = true;
                    _this.fees.forEach(item => {
                        if (_.id == item.id) {
                            flag = false;
                        }
                    })
                    return flag;
                })
                if (data.length == 0) {
                    this.$message({ message: '您选择的费用已经添加，无须重复添加！', type: 'warning' });
                    return;
                }
                data.forEach(item => {
                    _this.fees.push(item);
                })
                const ll = data.length;
                if (l > ll) {
                    this.$message({ message: '部分费用重复，已忽略！', type: 'warning' });
                    return;
                }
            }
        },
        showDetail(row) {
            if (row.order) {
                this.$refs.order.show(row.order.id, 'edit');
            } else {
                switch (row.project.project_type.id) {
                    case '专利': this.$refs.project.show(row.project.id, 'patent'); break;
                    case '商标': this.$refs.project.show(row.project.id, 'trademark'); break;
                    case '版权': this.$refs.project.show(row.project.id, 'copyright'); break;
                }
            }
        },
        closeDialog(name) {
            this[name] = false;
        },
        getIds() {
            let ids = [];
            this.tableData.map(function (item) {
                ids.push(item.id);
            });
            return ids;
        },
        removeFee(row) {
            // 移除添加的费用
            const _this = this;
            _this.fees.map(function (item, index) {
                if (item.id === row.id) {
                    _this.fees.splice(index, 1);
                }
            });
        },

        coverObj(val) {
            val ? this.$tool.coverObj(this.form, val, { obj: ["status"] }) : "";
        },
        load() {
            if (this.id === 0) return;
            const url = `/vouchers/${this.id}`;
            this.loadingVisible = true;
            const success = _ => {
                const d = _.data;
                this.coverObj(d);
                this.fees = d.fees;
                this.attachments = d.attachments;
                this.title = this.mode === "add" ? "开票申请" : "发票详情>" + d.serial;
                this.target = d.invoice_target;
            };
            const complete = () => {
                this.loadingVisible = false;
            };
            this.$axiosGet({ url, success, complete });
        },
        show(id, mode, invoice) {
            this.mode = mode;
            this.fees = [];
            this.attachments = [];
            this.form.attachments = [];
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                this.id = id;

                this.title = this.mode === "add" ? "开票申请" : "";
                if (invoice !== undefined) {
                    this.form.customer = invoice.user;
                    this.form.invoice = { id: invoice.id, name: invoice.serial };
                }
                this.load();
            });
        },
        close() {
            this.dialogVisible = false;
        },
        handleInvoiceDetail(row){
            this.$refs.invoiceDetail.show(row.invoice.id, "request", row);
        },
        update(){
            this.$emit("update");
        },
    },
    watch: {
        "form.customer": function (val, oldVal) {
            this.para.user = val;
            this.para.customer = val;
        },
        rowData: function (val, oldVal) {
            this.coverObj(val);
            this.attachments = [...this.form.attachments];
        },
        invoice: function (val) {
            this.form.customer = val.user;
        }
    },
    mounted() {
        this.coverObj(this.rowData);
    },
    components: {
        JumpSelect,
        UpLoad,
        StaticSelect,
        VoucherFeeSelect,
        TableComponent,
        AppShrink,
        OrderDetail,
        CommonDetail,
        AppTable,
        PaymentManageDetail: () => import("@/components/page_extension/PaymentManageDetail"),
    }
};
</script>

<style scoped>
</style>