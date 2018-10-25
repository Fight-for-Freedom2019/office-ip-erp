<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" :modal="false" class="dialog-small">
        <el-form label-width="100px" ref="form" :model="form" :rules="rules">

            <el-form-item label="联系人" prop="type">
                <remote-select type="contacts" :pageType="popType" v-model="form.contact"></remote-select>
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
                                v-model="form.signing_date"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="届满日期" prop="expire_date">
                        <el-date-picker
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
                <app-switch :type="switch_type" v-model="form.status" @input="getStatus"></app-switch>
            </el-form-item>
            <el-form-item label="附件" prop="is_publish_name">
                <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;">
                <el-button type="primary" @click="add" v-if="popType === 'add'" :disabled="btn_disabled">添加</el-button>
                <el-button type="primary" @click="edit" v-if="popType === 'edit'" :disabled="btn_disabled">编辑
                </el-button>
                <el-button type="button" @click="cancel" :disabled="btn_disabled">取消</el-button>
            </el-form-item>

        </el-form>
    </el-dialog>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import PopMixins from '@/mixins/pop-mixins'
    import StaticSelect from '@/components/form/StaticSelect'
    import AppSwitch from "@/components/form/AppSwitch";
    import Config from "@/const/selectConfig";
    import RemoteSelect from "@/components/form/RemoteSelect";

    const map = new Map(Config);

    const URL = '/customers'
    export default {
        name: 'ContractListPop',
        mixins: [PopMixins],
        props: {
            customer: Object,
            contracts: {
                type: Object,
                default() {
                    return {};
                }
            },
            popType: {
                type: String,
                default() {
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
                    offText: '已失败',
                    onValue: 1,
                    offValue: 0,
                },
                form: {
                    name: "",
                    type: "",
                    signing_date: "",
                    expire_date: "",
                    status: 0,
                    serial: "",
                    contact_id: "",
                    customer_id: "",
                    remark: "",
                    contact: {
                        name: "",
                        id: ""
                    },
                    customer: {
                        name: "",
                        id: "",
                    },
                },
                'rules': {
                    'name': [{required: true, message: '申请人名称不能为空', trigger: 'blur'},
                        {min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                    ],
                    'type': {required: false, message: '申请人类型不能为空', trigger: 'change'},
                    'identity': [{required: false, message: '证件号码不能为空', trigger: 'blur'},
                        {min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                    ],
                    'postcode': [{required: false, message: '邮编不能为空', trigger: 'blur'},
                        {pattern: /^[\d]{4}|[\d]{6}]+$/, message: '邮编为4-6位数字', trigger: 'blur'}
                    ],
                    'email_address': [
                        {
                            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
                            message: '邮件地址格式不正确',
                            trigger: 'blur'
                        }],
                    'phone_number': {pattern: /^1[345678]\d{9}$/, message: '手机号码或者座机号码格式错误', trigger: 'blur'},
                    'address': [{required: false, message: '地址名称不能为空', trigger: 'blur'},
                        {min: 4, max: 255, message: '地址长度应在4-225个字符之间', trigger: 'blur'},
                        {pattern: /^[^~!@#$%^&*]+$/, message: '地址不能包含非法字符', trigger: 'blur'}],
                    'english_name': [
                        {pattern: /^[a-zA-Z]+$/, message: '英文名称应为英文字符', trigger: 'blur'}],
                    'english_address': {pattern: /^[a-zA-Z 0-9]+$/, message: '英文地址为英文字母、数字和空格', trigger: 'blur'},
                    'is_fee_discount': {required: false, message: '费减状态备案不能为空', trigger: 'change'},
                }
            }
        },
        methods: {

            // submitForm () {
            // 	return Object.assign({}, this.form, {customer_id: this.customerId});
            // },
            refresh() {
                this.$emit('refresh');
            },
            add() {
                //if (this.form.name !== '') {
                const url = `${URL}/${this.customer.id}/contracts`;
                const data = Object.assign({}, this.form);
                data.customer_id = this.customer.id;
                data.contact_id = data.contact;
                const success = _ => {
                    this.dialogVisible = false;
                    this.refresh();
                    this.$message({message: '添加成功！', type: 'success'})
                }
                this.$axiosPost({url, data, success});
                //} else {
                //     this.$message({type: 'warning', message: '必选项不能为空！'});
                //}
                // TODO 需要确认必选项

            },
            getStatus(val) {
                this.form.status = val;
            },
            edit() {
                const url = `${URL}/${this.customer.id}/contracts/${this.contracts.id}`;
                const data = Object.assign({}, this.form);
                data.customer_id = this.customer.id;
                data.contact_id = data.contact;
                map.get("contract_type").options.forEach((_) => {
                    if (_.name === data.type) {
                        data.type = _.id;
                    }
                });
                const success = _ => {
                    this.dialogVisible = false;
                    this.refresh();
                    this.$message({message: '编辑成功！', type: 'success'})
                }
                this.$axiosPut({url, data, success});
            },
            cancel() {
                this.dialogVisible = false;
            },
        },
        created() {
            this.form = Object.assign({}, this.contracts);
        },
        watch: {
            contracts: function (val, oldVal) {
                this.form = Object.assign({}, val);
            },
            popType: function (val, oldVal) {
                val === "add" ? this.form = {} : "";
            }
        },
        components: {
            StaticSelect,
            AppSwitch,
            RemoteSelect
        },
        REMINDER_TEXT: '合同',
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>