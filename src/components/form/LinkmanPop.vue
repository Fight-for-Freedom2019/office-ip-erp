<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" :modal="false" class="dialog-small">
        <el-form label-width="100px" ref="form" :model="form" :rules="rules">

            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请填写联系人姓名（必填）"></el-input>
            </el-form-item>

            <el-form-item label="类型" prop="type">
                <static-select type="contacts_type" v-model="form.type"></static-select>
            </el-form-item>

            <el-form-item label="邮箱" prop="identity">
                <el-input v-model="form.email_address" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone_number">
                <el-input v-model="form.phone_number" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="证件号码" prop="identity">
                <el-input v-model="form.identity" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="英文名" prop="first_name">
                <el-input v-model="form.first_name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="英文姓" prop="last_name">
                <el-input v-model="form.last_name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="是否公开姓名" prop="is_publish_name">
                <app-switch :type="switch_type" v-model="form.is_publish_name" @input="getIsPublishName"></app-switch>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;">
                <el-button type="primary" @click="add" v-if="type === 'add'" :disabled="btn_disabled">添加</el-button>
                <el-button type="primary" @click="edit" v-if="type === 'edit'" :disabled="btn_disabled">编辑</el-button>
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

    const URL = '/api/customers'
    export default {
        name: 'RequireListPop',
        mixins: [PopMixins],
        props: ['customer', 'presentId'],
        data() {
            return {
                switch_type:"is",
                cityInfo: '',
                form: {
                    name: "",
                    type: "",
                    email_address: "",
                    phone_number: "",
                    identity: "",
                    first_name: "",
                    last_name: "",
                    is_publish_name: "",    // TODO 前端传参是布尔值，后端返回为字符串，统一为布尔值方便显示
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
                if (this.form.name !== '') {
                    const url = `${URL}/${this.customer.id}/contacts`;
                    const data = Object.assign({}, this.form);
                    const success = _ => {
                        this.dialogVisible = false;
                        this.refresh();
                        this.$message({message: '添加成功！', type: 'success'})
                    }
                    this.$axiosPost({url, data, success});
                } else {
                    this.$message({type: 'warning', message: '必选项不能为空！'});
                }

            },
            getIsPublishName(val){
                this.form.is_publish_name = val;
            },
            edit() {
                const url = `${URL}/${this.customer.id}/contacts/${this.presentId}`;
                const data = Object.assign({}, this.form);
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
        components: {
            StaticSelect,
            AppSwitch
        },
        REMINDER_TEXT: '联系人',
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>