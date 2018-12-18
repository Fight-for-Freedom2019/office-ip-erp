<!-- 合同列表新增 -->
<!-- ContractsListAdd -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-form-item label="客户" prop="customer">
                <remote-select type="customer" :pageType="type" v-model="form.customer"></remote-select>
            </el-form-item>

            <el-form-item label="合同正文" prop="attachments">
                <upload v-model="form.attachments" :file-list="attachments"></upload>
            </el-form-item>

            <el-row>
                <el-col :span="12">
                     <el-form-item label="联系人" prop="contact">
                        <remote-select type="contacts" :pageType="type" v-model="form.contact"></remote-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="相关订单" prop="order">
                        <remote-select type="orders" :pageType="type"  v-model="form.order"></remote-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="合同编号" prop="serial">
                        <el-input v-model="form.serial" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="合同类型" prop="type">
                        <static-select type="contract_type" v-model="form.type" placeholder=""></static-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="签订日期" prop="signing_date">
                        <el-date-picker
                                value-format="yyyy-MM-dd"
                                v-model="form.signing_date"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="届满日期" prop="expire_date">
                        <el-date-picker
                                value-format="yyyy-MM-dd"
                                v-model="form.expire_date"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>



            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="form.remark" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status" v-if="this.type === 'edit'">
                <static-select type="contract_status" v-model="form.status" placeholder=""></static-select>
            </el-form-item>
            

        </el-form>
    </div>
</template>

<script>
    import StaticSelect from "@/components/form/StaticSelect";
    import AppSwitch from "@/components/form/AppSwitch";
    import RemoteSelect from "@/components/form/RemoteSelect";
    import Upload from '@/components/form/Upload'

    const URL = "/contracts";

    export default {
        name: "ContractsListAdd",
        props: {
            contracts: {
                type: Object,
                default() {
                    return {};
                }
            },
            order: {
                type: Object,
                default() {
                    return {};
                }
            },
            type: {
                type:String,
                default(){
                    return "add"
                }
            }
        },
        data() {
            return {
                switch_type: {
                    onColor: '#13ce66',
                    offColor: '#ff4949',
                    onText: '生效中',
                    offText: '已失效',
                    onValue: 1,
                    offValue: 0,
                },
                form: {
                    type: "",
                    signing_date: "",
                    expire_date: "",
                    status : 1,
                    serial: "",
                    contact_id: "",
                    customer_id: "",
                    remark:"",
                    attachments:[],
                    contact: {
                        name:"",
                        id:""
                    },
                    customer: {
                        name:"",
                        id:"",
                    },
                    order: {
                        name:"",
                        id:"",
                    },
                },
                attachments:[],
                rules: {
                    customer: {
                        required: true,
                        message: "请选择客户",
                        trigger: "change"
                    },
                    attachments: {
                        required: true,
                        message: "请上传合同文本",
                        trigger: "change"
                    }
                }
            };
        },
        methods: {
            save(type) {
                this.$refs['form'].validate((valid)=>{
                    if(valid){
                        const data = this.form;
                        if (type === "add") {
                            this.$axiosPost({
                                url: URL,
                                data,
                                success: () => {
                                    this.$message({type: "success", message: "添加合同成功"});
                                    this.$emit("refresh");
                                }
                            });
                        } else {
                            let url = "/contracts/" + this.contracts.id;
                            data.id = this.contracts.id;
                            this.$axiosPut({
                                url,
                                data,
                                success: () => {
                                    this.$message({type: "success", message: "编辑合同成功"});
                                    this.$emit("update");
                                }
                            });
                        }
                    } else {
                        this.$message({type: 'warning', message: '请正确填写'});
                        return;
                    }
                })
                
            },
            getStatus(val) {
                this.form.status  = val;
            },
            coverObj(val) {
                if (val) {
                    this.$tool.coverObj(this.form, val, {obj: ['type']});
                    this.attachments = [...this.form.attachments];
                }
            },
            clear(){
                this.$refs.form.resetFields();
            },
        },
        mounted() {
            this.coverObj(this.contracts);
            if (this.order.customer !== undefined) {
                this.form.customer = this.order.customer;
                this.form.order = this.order;
                this.form.type = 2;
            }
        },
        watch: {
            contracts: function (val, oldVal) {
                this.coverObj(val);
            },
            order: function (val, oldVal) {
                this.form.customer = val.customer.id;
                this.form.order = val.id;
                this.form.type = 2;
            },
            type: function (val, oldVal) {
                if (val === "add") {
                    this.form = {}
                } else {
                    this.form = Object.assign({},this.contracts);
                }
            }
        },
        components: {
            StaticSelect,
            AppSwitch,
            RemoteSelect,
            Upload
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>