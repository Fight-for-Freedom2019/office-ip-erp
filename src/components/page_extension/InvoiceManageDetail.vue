<!-- 发票管理详情 -->
<template>
    <div class="InvoiceManageDetail" style="margin-top: 10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="客户" prop="customer">
                        <jump-select type="customer" v-model="form.customer"></jump-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账单" prop="invoice">
                        <jump-select :type="bill" :para="para" v-model="form.invoice"></jump-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="抬头" prop="invoice_target">
                        <jump-select :type="title" v-model="form.invoice_target"></jump-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="金额" prop="amount">
                        <el-input type="number" v-model="form.amount" placeholder="请输入金额"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">

                </el-col>
                <el-col :span="12">
                    <el-form-item label="申请国家" prop="citizenship">
                        <static-select v-model="form.citizenship" type="area"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="12" v-if="compileType === 'edit'">
                    <el-form-item label="扫描件" prop="">
                        <up-load v-model="form.attachments" :fileList="attachments"></up-load>
                    </el-form-item>
                </el-col>


            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="费用" prop="fee">
                        <el-button type="text" @click="selectFee">选择费用</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <table-component :tableOption="tableOption" :data="tableData" ref="table"></table-component>
        <el-dialog title="选择费用" :visible.sync="dialogFormVisible" :modal="false">
            <payment-cost-detail :data="detail" type="other" @getRowData="getRowData"></payment-cost-detail>
        </el-dialog>
    </div>
</template>

<script>
    import JumpSelect from "@/components/form/JumpSelect";
    import UpLoad from "@/components/form/Upload";
    import StaticSelect from "@/components/form/StaticSelect";
    import PaymentCostDetail from "@/components/page_extension/PaymentCostDetail";
    import TableComponent from '@/components/common/TableComponent'

    export default {
        name: "InvoiceManageDetail",
        data() {
            return {
                URL: "/vouchers",
                rules: {
                    customer: [
                        {required: true, message: "请选择客户"},
                    ],
                    invoice: [
                        {required: true, message: "请选择账单"},
                    ],
                    invoice_target: [
                        {required: true, message: "请选择抬头", trigger: "blur"},
                    ],
                    received_date: [
                        {required: true, message: "请选择回款日期", trigger: "blur"},
                    ]
                },
                form: {
                    customer: "",
                    customer_name: "",
                    customer_id: "",
                    invoice_target_id: "",
                    invoice_target: "",
                    invoice: "",
                    title: "",
                    received_date: "",
                    amount: "",
                    status: "",
                    attachments:[],
                },
                attachments:[],
                para:{
                    customer:null,
                },
                bill: {      // 账单JumpSelect的type
                    URL: '/invoices',
                    DATA_KEY: 'invoice',
                    PLACEHOLDER: '请选择账单',
                    PARAMS: {is_debit: 1},
                },
                title: {      // 抬头JumpSelect的type
                    URL: '/invoice_targets',
                    DATA_KEY: 'data',
                    PLACEHOLDER: '请选择抬头',
                    PARAMS: {},
                },
                dialogFormVisible: false,
                tableOption: {
                    'name': 'PaymentCostDetailList',
                    'url': "",
                    'height': 360,
                    'is_pagination': false,
                    'highlightCurrentRow': true,
                    'is_search': false,
                    // 'rowClick': this.handleRowClick,
                    'header_btn': [
                        // {type: 'add'},
                    ],
                    'columns': [
                        {type: 'text', label: '客户', prop: 'customer.name', min_width: '178'},
                        {type: 'text', label: '案号', prop: 'serial', width: '120'},
                        {type: 'text', label: '标题', prop: 'title', width: '150'},
                        {type: 'text', label: '申请国家', prop: 'area', width: '180'},
                        {type: 'text', label: '订单号', prop: 'order.serial', width: '120'},
                        {type: 'text', label: '申请号', prop: 'application_number', width: '120'},
                        {type: 'text', label: '申请日', prop: 'application_date', width: '100'},
                        {type: 'text', label: '官费', prop: 'officail_fee.sum', width: '150',},
                        {type: 'text', label: '代理费', prop: 'service_fee.sum', width: '150',},
                        {type: 'text', label: '费用策略', prop: 'policy', width: '150'},
                        {type: 'array', label: '官费票据', prop: 'official_voucher', width: '150'},
                        {type: 'array', label: '代理费票据', prop: 'service_voucher', width: '150'},
                        {
                            type: "action", btns: [
                                {type: 'delete', click: this.removeFee},
                            ]
                        }
                    ],
                },
                tableData: [],
                detail: [],
            }
        },
        props: {
            rowData: {
                type: Object,
                default() {
                    return {}
                }
            },
            compileType: String,
        },
        methods: {
            submitForm(type, id) {   // type是父组件传来的,表示是add还是edit,id表示修改的某一行数据的id
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        let url;
                        let message = "";
                        let fun = "";
                        if (type === "add") {
                            url = this.URL;
                            message = "添加";
                            fun = "refresh";
                        } else {
                            url = `${this.URL}/${id}`;
                            message = "编辑";
                            fun = "update";
                        }
                        let data = this.form;
                        const success = _ => {
                            this.$message({type: "success", message: `${message}成功`});
                            this.$emit(fun);
                        };
                        type === "add" ? this.$axiosPost({url, data, success}) : this.$axiosPut({url, data, success});
                    } else {
                        this.$message({type: "warning", message: "请填写必选项!"});
                    }
                })
            },
            selectFee() {
                if (this.form.invoice === "") {
                    this.$message({type: "warning", message: "请选择账单!"});
                    return;
                }
                this.dialogFormVisible = true;
                let url = `/invoices/${this.form.invoice}`;
                let success = _ => {
                    this.detail = _.data.data[0].fee_list;
                };
                this.$axiosGet({url, success});
            },
            getRowData(data) {
                const _this = this;
                this.closeDialog("dialogFormVisible");
                if (data.length !== 0) {
                    data.map(function (item) {
                        _this.tableData.push(item);
                    })
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
            removeFee(row) {    // 移除添加的费用
                const _this = this;
                _this.tableData.map(function (item, index) {
                    if (item.id === row.id) {
                        _this.tableData.splice(index, 1);
                    }
                })
            },
            clear() {
                this.$refs.form.resetFields();
            },
            coverObj(val) {
                val ? this.$tool.coverObj(this.form, val) : "";
            },

        },
        watch: {
            'form.customer': function (val, oldVal) {
                this.para.customer = val;
            },
            rowData: function (val, oldVal) {
                this.coverObj(val);
                this.attachments = [...this.form.attachments];
            },
        },
        mounted() {
            this.coverObj(this.rowData);
        },
        components: {
            JumpSelect,
            UpLoad,
            StaticSelect,
            PaymentCostDetail,
            TableComponent,
        }
    }
</script>

<style scoped>

</style>