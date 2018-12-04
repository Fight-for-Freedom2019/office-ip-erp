<!-- 订单详情,与请/付款管理的template结构类似,字段不同 -->
<template>
    <div class="OrderManageDetail" v-loading="loadingVisible" :element-loading-text="loadingText">
        <el-form label-width="75px" ref="form" v-model="form" label-position="left" class="form-information">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="客户">
                        <span class="form-item-text">{{form.customer?form.customer.name:""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="客户联系人"><span
                            class="form-item-text">{{form.contact?form.contact.name:""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="创建人"><span class="form-item-text">{{form.creation_user}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="创建时间"><span class="form-item-text">{{form.creation_time}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="所属销售"><span class="form-item-text">{{form.sales?form.sales.name:""}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="订单金额"><span class="form-item-text">{{form.amount}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="交付期限"><span class="form-item-text">{{form.delivery_date}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="订单状态">
                        <static-select class="custom-input" type="order_status" v-model="form.status"></static-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item class="break-form" label="备注" prop="remark">
                <el-input type="textarea" v-model="form.remark" resize="none"></el-input>
            </el-form-item>
            <el-form-item class="break-form upload-from" label="附件">
                <up-load></up-load>
            </el-form-item>
        </el-form>
        <div class="OrderManageRelevant">
            <el-tabs v-model="activeName">
                <el-tab-pane label="订单明细" name="first">
                    <!--<order-detail :data="orders?orders.services:[]" :id="id"></order-detail>-->
                    <order-detail :data="order_service" :id="id"></order-detail>
                </el-tab-pane>
                <el-tab-pane label="相关合同" name="reminders">
                    <relevant-contract ref="reminders" :data="contracts" :status="form.status"
                                       :id="id"></relevant-contract>
                </el-tab-pane>
                <el-tab-pane label="相关账单" name="received_payments">
                    <relevant-project ref="received" :id="id" :data="invoices"></relevant-project>
                </el-tab-pane>
                <el-tab-pane label="相关案件" name="case">
                    <relevant-project ref="received" :id="id" :data="projects"></relevant-project>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import RemoteSelect from "@/components/form/RemoteSelect";
    import StaticSelect from "@/components/form/StaticSelect";
    import UpLoad from "@/components/form/Upload";
    import OrderDetail from '@/components/page_extension/OrderDetail'
    import RelevantContract from '@/components/page_extension/RelevantContract'
    import RelevantProject from '@/components/page_extension/RelevantProject'

    export default {
        name: "OrderManageDetail",
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
                    creation_user: "",
                    services: [
                        {service: {id: "", name: ""}, unit_price: "", amount: "", sum: "",}
                    ],
                },
                express: [],
                loadingVisible: false,
                loadingText: "加载订单详情中...",
                URL: "/orders",
                invoices: [],
                projects: [],
                contracts: [],
                order_service: [],
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
            },
            type: {      // 是付款还是请款
                type: String,
            }
        },
        methods: {
            submitCommon(id, suffix, hint) {
                this.$confirm(`是否${hint}`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = `/orders/${id}${suffix}`;
                    const success = _ => {
                        this.$emit("update");
                        this.$message({type: "success", message: "操作成功"});
                    };
                    const error = _ => {
                        this.$message({type: "warning", message: _.info});
                    };
                    this.$axiosPost({url, success, error});
                })
            },
            save(id) {
                let data = {
                    express_id: 1,
                    remark: this.form.remark,
                    status: this.form.status,
                    deadline: this.form.deadline,
                };  // TODO 这里的参数文档中没定义好
                let url = `/order/${id}`;
                const success = _ => {
                    this.$message({type: "success", message: "操作成功!"});
                    this.$emit("update");
                };
                this.$axiosPut({url, data, success});
            },
            getDetail(id) {
                this.openLoading();
                const url = `${this.URL}/${id}`;
                const success = _ => {
                    const target = _.data.data[0];
                    const contracts = target.contract;
                    const order_service = target.order_service;
                    const projects = target.projects;
                    const invoices = target.invoices;
                    this.form = this.$tool.deepCopy(target);
                    this.order_service = order_service ? order_service : [];
                    this.contracts = contracts ? contracts : [];
                    this.projects = projects ? projects : [];
                    this.invoices = invoices ? invoices : [];
                    this.closeLoading();
                };
                const complete = () => {
                    this.closeLoading();
                };
                this.$axiosGet({url, success, complete});
            },
            changeState() {      // 改变状态的方法，有点繁琐
                this.form.status = 10;
            },
            openLoading() {
                this.loadingVisible = true;
            },
            closeLoading() {
                this.loadingVisible = false;
            },
        },
        created() {
            this.getDetail(this.id);
        },
        watch: {
            id: function (val, oldVal) {
                this.getDetail(val);
            }
        },
        components: {
            RemoteSelect,
            UpLoad,
            OrderDetail,
            RelevantContract,
            RelevantProject,
            StaticSelect,
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

    #app .form-information .break-form .el-form-item__label {
        font-size: 14px;
        color: #606266;
    }

    .OrderManageRelevant {
        margin-top: 10px;
    }

</style>
<style>
    #app .OrderManageDetail .break-form textarea {
        height: auto;
    }

    #app .OrderManageDetail .upload-from {
        height: auto;
    }

    .OrderManageDetail .custom-input .el-input__inner, .OrderManageDetail .custom-picker-input .el-input__inner {
        height: 28px;
        line-height: 28px;
        font-size: 12px;
    }

    .OrderManageDetail .custom-picker-input .el-input__inner {
        padding: 0 14px;
    }

    .OrderManageDetail .custom-input .el-input__icon, .OrderManageDetail .custom-picker-input .el-input__icon {
        line-height: 28px;
    }

    .OrderManageDetail .custom-picker-input .el-input__prefix {
        display: none;
    }
</style>