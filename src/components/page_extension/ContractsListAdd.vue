<!-- 合同列表新增 -->
<!-- ContractsListAdd -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-form-item label="客户" prop="customer">
                <remote-select type="customer" :pageType="type" v-model="form.customer"></remote-select>
            </el-form-item>

            <el-form-item label="联系人" prop="type">
                <remote-select type="contacts" :pageType="type" v-model="form.contact"></remote-select>
            </el-form-item>

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
            <el-form-item label="状态" prop="status">
                <app-switch :type="switch_type" simple="true" v-model="form.is_effective" @input="getStatus"></app-switch>
            </el-form-item>
            <el-form-item label="附件" prop="contract_file">
                <upload v-model="form.contract_file" :file-list="contract_file"></upload>
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
                    is_effective : 1,
                    serial: "",
                    contact_id: "",
                    customer_id: "",
                    remark:"",
                    contract_file:[],
                    contact: {
                        name:"",
                        id:""
                    },
                    customer: {
                        name:"",
                        id:"",
                    },
                },
                contract_file:[],
                rules: {
                    customer: {
                        required: true,
                        message: "请选择客户",
                        trigger: "change"
                    },
                    email_address: [
                        {
                            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
                            message: "邮件地址格式不正确",
                            trigger: "blur"
                        }
                    ],
                    phone_number: {
                        pattern: /^1[345678]\d{9}$/,
                        message: "手机号码或者座机号码格式错误",
                        trigger: "blur"
                    }
                }
            };
        },
        methods: {
            async save(type) {
                const data = this.form;
                data.customer_id = data.customer;
                data.contact_id = data.contact;     // 在获取remote-select数据时把id保存在了contact和customer这两个字段上，实际上后端需要的是contact_id和customer_id
                if(data.customer_id === null && data.customer === null){this.$message({type: "warn", message: "必选项不能为空"});return;}
                let response;
                if (type === "add") {
                    response = await this.$axiosPost({
                        url: URL,
                        data,
                        success: () => {
                            this.$message({type: "success", message: "添加合同成功"});
                            this.$emit("editSuccess");
                        }
                    });
                } else {
                    let url = "/contracts/" + this.contracts.id;
                    data.id = this.contracts.id;
                    response = await this.$axiosPut({
                        url,
                        data,
                        success: () => {
                            this.$message({type: "success", message: "编辑合同成功"});
                            this.$emit("editSuccess");
                        }
                    });
                }
                return response;
            },
            getStatus(val) {
                this.form.is_effective  = val;
            },
            coverObj(val) {
                if (val) {
                    this.$tool.coverObj(this.form, val);
                }
            }
        },
        created() {
            this.coverObj(this.contracts);
            // if (this.type !== "add"){
            //     this.form = Object.assign({},this.contracts);
            // }
        },
        watch: {
            contracts: function (val, oldVal) {
                this.coverObj(val);
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