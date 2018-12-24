<!-- 新增订单 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-form-item label="客户" prop="customer">
                <remote-select type="customer" v-model="form.customer" @change="handleCustomerChange"></remote-select>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="联系人" prop="contact">
                        <jump-select type="contacts" v-model="form.contact" :para="param"></jump-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="销售" prop="sales">
                        <jump-select type="user" v-model="form.sales"></jump-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="交付日期" prop="delivery_date">
                        <el-date-picker value-format="yyyy-MM-dd" v-model="form.delivery_date"
                                        placeholder="请选择交付日期"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="服务项目" prop="services">
                        <el-button type="text" @click="add">新增</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <table-component :tableOption="tableOption" :data="tableData" ref="table"></table-component>
        <el-dialog :visible.sync="visibleAdd" title="新增服务项目" :modal="false" width="600px">
            <el-form ref="servicesForm" :model="servicesForm" label-position="right" label-width="120px"
                     :rules="servicesRules">
                <el-form-item label="服务项目" prop="temp">
                    <jump-select type="services" ref="jumpSelect" v-model="servicesForm.temp"></jump-select>
                </el-form-item>
                <el-form-item label="单价" prop="unit_price">
                    <el-input type="text" v-model.number="servicesForm.unit_price"></el-input>
                </el-form-item>
                <el-form-item label="预收官费" prop="collected_official_fee">
                    <el-input type="text" v-model.number="servicesForm.collected_official_fee"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="amount">
                    <el-input type="text" v-model.number="servicesForm.amount"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveServices">保存</el-button>
                    <el-button @click="()=>{visibleAdd = false}">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import StaticSelect from "@/components/form/StaticSelect";
    import RemoteSelect from "@/components/form/RemoteSelect";
    import JumpSelect from "@/components/form/JumpSelect";
    import TableComponent from '@/components/common/TableComponent'

    export default {
        name: "OrderAdd",
        data() {
            return {
                form: {
                    customer: "",
                    contact: "",
                    sales: "",
                    delivery_date: "",
                    remark: "",
                },
                rules: {
                    customer: [
                        {required: true, message: "请选择客户", trigger: "blur"},
                    ],
                    contact: [
                        {required: true, message: "请选择联系人", trigger: "blur"},
                    ],
                    sales: [
                        {required: true, message: "请选择销售", trigger: "blur"},
                    ],
                    delivery_date: [
                        {required: true, message: "请选择交付日期", trigger: "blur"},
                    ],
                },
                servicesForm: {
                    service: {
                        id: "",
                        name: ""
                    },
                    unit_price: "",
                    collected_official_fee: "",
                    amount: "",
                    temp: "",
                    sum: "",
                },
                servicesRules: {
                    temp: [
                        {required: true, message: "请选择服务项目", trigger: "blur"}
                    ],
                    unit_price: [
                        {required: true, message: "请输入单价", trigger: "blur"},
                        {type: "number", message: "请输入数字", trigger: "blur"}
                    ],
                    amount: [
                        {required: true, message: "请输入数量", trigger: "blur"},
                        {type: "number", message: "请输入数字", trigger: "blur"}
                    ]
                },
                visibleAdd: false,
                tableData: [],
                tableOption: {
                    'height': 390,
                    'is_search': false,
                    'is_pagination': false,
                    'show_summary': true,
                    'columns': [
                        {
                            type: 'text',
                            label: '服务项目',
                            prop: 'service',
                            render_simple: "name",
                            min_width: '178',
                            render_header: true
                        },
                        {type: 'text', label: '单价', prop: 'unit_price', width: '120'},
                        {type: 'text', label: '预收官费', prop: 'collected_official_fee', width: '120'},
                        {type: 'text', label: '数量', prop: 'amount', width: '150'},
                        {type: 'text', label: '小计', prop: 'sum', width: '180'},
                        {
                            type: 'action',
                            align: "center",
                            btns: [
                                {type: 'delete', click: this.removeItem},
                            ],
                        }
                    ],
                },
                /* 因为服务项目可能是从后端获取的
                ** 也可能是从前端静态添加
                ** 所以自定义一个唯一标识，以便删除
                * */
                mark: 0,
                URL: "/orders",
                param:{},
            }
        },
        props: {
            data: {
                type: Array,
                default() {
                    return [];
                },
            }
        },
        methods: {
            handleCustomerChange() {
                const customer = this.form.customer;
                this.param = {customer};
            },
            getService() {      // 获取格式化的service数据
                let arr = [];
                this.tableData.forEach((item) => {
                    let obj = {
                        id: item.service.id,
                        amount: item.amount,
                        unit_price: item.unit_price,
                        collected_official_fee: item.collected_official_fee,
                    };
                    arr.push(obj);
                });
                return arr;
            },
            save() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.form.services = this.getService();
                        if (this.form.services.length == 0) {
                            this.$message({type: 'alert',message: '服务项目不能为空！'});
                        }
                        const success = _ => {
                            this.$emit("refresh");
                            this.$emit("closeVisible","visibleOrderAdd");
                            this.$message({type: "success", message: _.info});
                        };
                        this.$axiosPost({url: this.URL, data: this.form, success})
                    }
                });
            },
            saveServices() {    // 保存新建的服务项目，静态的
                this.$refs.servicesForm.validate((valid) => {
                    if (valid) {
                        this.servicesForm.service = {
                            id: this.servicesForm.temp,
                            name: this.getName()
                        };
                        const unit_price = this.servicesForm.unit_price;
                        const collected_official_fee = this.servicesForm.collected_official_fee;
                        const amount = this.servicesForm.amount;
                        this.servicesForm.sum = unit_price * amount + collected_official_fee * amount;
                        this.servicesForm.mark = this.mark;
                        this.mark++;
                        this.tableData.push(Object.assign({}, this.servicesForm));
                        this.visibleAdd = false;
                    } else {
                        this.$message({type: "warning", message: "请正确填写"});
                    }
                });

            },
            add() {
                this.visibleAdd = true;
                this.clear("servicesForm");
            },
            getName() {
                let target = this.$refs.jumpSelect.getSelected();
                return target[0].name;
            },
            clear(form) {
                this.$refs[form] ? this.$refs[form].resetFields() : "";
            },
            removeItem(r) {
                let d = this.tableData;
                d.forEach((item, index) => {
                    if (item.mark === r.mark) {
                        d.splice(index, 1);
                    }
                })
            },
            fillTable() {
                const d = this.data;    // TODO 这里的data不是最终数据应该是data.services,但是接口没给出,后期需要更改
                if (d.length !== 0) {
                    d.forEach((item) => {
                        item.mark = this.mark;
                        this.tableData.push(item);
                        this.mark++;
                    })
                }
            },
        },
        components: {
            StaticSelect,
            RemoteSelect,
            JumpSelect,
            TableComponent
        },
    }
</script>

<style scoped>

</style>