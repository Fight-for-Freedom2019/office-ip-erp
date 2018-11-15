<!-- 请款管理详情面板 -->
<template>
    <div class="PaymentRequestMsg" v-loading="loadingVisible" :element-loading-text="loadingText">
        <el-form label-width="75px" ref="form" v-model="form" label-position="left" class="form-information">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="请款对象">
                        <span class="form-item-text">{{rowData.creator_user?rowData.creator_user.name:""}}</span><!-- 有些from项不用提交，直接使用rowData数据，因为经过coverObj方法的from没办法保留name -->
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="创建人"><span class="form-item-text">{{rowData.user?rowData.user.name:""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="创建时间"><span class="form-item-text">{{form.creation_time}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="请款单状态">
                        <static-select type="invoice_status" class="custom-input" v-model="form.status"></static-select>
                        <!--<span class="form-item-text">{{form.status}}</span>-->
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="金额"><span class="form-item-text">{{form.amount}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="币别"><span class="form-item-text">{{form.currency}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="汇率"><span class="form-item-text">{{form.roe}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="人民币金额"><span class="form-item-text">{{form.rmb_amount}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="请款时间"><span class="form-item-text">{{form.request_time}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="回款期限">
                        <el-date-picker placeholder="请选择回款期限" class="custom-picker-input" type="datetime"
                                        value-format="yyyy-MM-dd HH-mm-ss" v-model="form.deadline"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="回款时间"><span class="form-item-text">{{form.payment_time}}</span>
                        <!--<span class="form-item-text">{{form.payment_time}}</span>-->
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="回款金额"><span class="form-item-text">{{form.received_amount}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item class="break-form" label="快递" prop="express_id">
                <up-load></up-load>
            </el-form-item>
            <el-form-item class="break-form" label="备注" prop="remark">
                <el-input type="textarea" :rows="2" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item class="break-form" label="附件">
                <up-load></up-load>
            </el-form-item>
        </el-form>
        <div class="PaymentRequestDetail">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="费用清单" name="first">
                    <payment-cost-detail :data="costDetail" :id="id"></payment-cost-detail>
                </el-tab-pane>
                <el-tab-pane label="跟催记录" name="reminders">
                    <reminders-record ref="reminders" :data="remindersData" :id="id"></reminders-record>
                </el-tab-pane>
                <el-tab-pane label="回款记录" name="received_payments">
                    <received-record ref="received" :id="id" :data="receivedData"></received-record>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import RemoteSelect from "@/components/form/RemoteSelect";
    import StaticSelect from "@/components/form/StaticSelect";
    import UpLoad from "@/components/form/Upload";
    import PaymentCostDetail from '@/components/page_extension/PaymentCostDetail'
    import RemindersRecord from '@/components/page_extension/RemindersRecord'
    import ReceivedRecord from '@/components/page_extension/ReceivedRecord'

    export default {
        name: "PaymentRequestMsg",
        data() {
            return {
                activeName: "first",
                form: {
                    creator_user:{
                        name:""
                    },
                    user:{
                        name:"",
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
                },
                costDetail: [],
                remindersData: [],
                receivedData: [],
                loadingVisible:false,
                loadingText:"加载账单详情中...",
            }
        },
        props: {
            rowData: {
                type: Object,
                default() {
                    return {}
                }
            },
            id: {
                type: [String, Number],
                default() {
                    return ""
                },
            }
        },
        methods: {
            handleClick(tab) {
            },
            submitAudit(id) {
                this.$confirm('是否提交审核', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = `/inovices/${id}/submit`;
                    const success = _ => {
                        this.$message({type: "success", message: "操作成功"});
                    };
                    const error = _ => {
                        this.$message({type: "success", message: "操作失败"});
                    };
                    this.$axiosPost({url, success, error});
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            save(id) {
                let data = {
                    express_id: 1,
                    remark: this.form.remark,
                    status: this.form.status,
                    deadline: this.form.deadline,
                };  // TODO 参数为form表单中的快递信息、备注、附件
                let url = `/invoices/${id}`;
                const success = _ => {
                    this.$message({type: "success", message: "操作成功!"});
                    this.$emit("update");
                };
                this.$axiosPut({url, data, success});
            },
            getDetail(id) {
                const url = `/invoices/${id}`;
                const data = {
                    page: 1,
                    listRows: 20
                };
                const success = _ => {
                    console.log("账单的详情", _);
                    this.receivedData = _.data.data[0].received_payment;
                    this.remindersData = _.data.data[0].reminder;
                    this.costDetail = _.data.data[0].fee_list ? _.data.data[0].fee_list : [];
                    this.form.received_amount = this.getAllReceived(this.receivedData);
                    this.closeLoading();
                };
                const complete = () => {
                    this.closeLoading();
                };
                this.$axiosGet({url, data, success,complete});
            },
            coverObj(val) {
                val ? this.$tool.coverObj(this.form, val) : "";
            },
            getAllReceived(data) {  // 获取回款总额
                let sum = 0;
                data.map(function (item) {
                    sum += item.amount ? item.amount : 0;
                });
                return sum;
            },
            openLoading(){
                this.loadingVisible = true;
            },
            closeLoading(){
                this.loadingVisible = false;
            },
        },
        created() {
            this.getDetail(this.id);
            this.openLoading();
        },
        mounted() {
            this.coverObj(this.rowData);
        },
        watch: {
            rowData: function (val, oldVal) {
                this.coverObj(val);
            },
            id: function (val, oldVal) {
                this.getDetail(val);
            }
        },
        components: {
            RemoteSelect,
            UpLoad,
            PaymentCostDetail,
            RemindersRecord,
            ReceivedRecord,
            StaticSelect
        },
    }
</script>

<style scoped>
    .form-item-text {
        display: inline-block;
        max-width: 120px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .PaymentRequestMsg .el-form-item {
        height: 36px;
    }

    #app .form-information .break-form {
        margin-top: 22px;
        border-bottom: none;
    }

    #app .form-information .break-form .el-form-item__label {
        font-size: 14px;
        color: #606266;
    }

    .PaymentRequestDetail {
        margin-top: 10px;
    }

</style>
<style>
    #app .PaymentRequestMsg .break-form textarea {
        height: auto;
    }

    .PaymentRequestMsg .custom-input .el-input__inner, .PaymentRequestMsg .custom-picker-input .el-input__inner {
        height: 28px;
        line-height: 28px;
        font-size: 12px;
    }

    .PaymentRequestMsg .custom-picker-input .el-input__inner {
        padding: 0 14px;
    }

    .PaymentRequestMsg .custom-input .el-input__icon, .PaymentRequestMsg .custom-picker-input .el-input__icon {
        line-height: 28px;
    }

    .PaymentRequestMsg .custom-picker-input .el-input__prefix {
        display: none;
    }
</style>