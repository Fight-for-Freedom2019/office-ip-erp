<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" :modal="false" class="dialog-small">
        <el-form label-width="100px" ref="form" :model="form" :rules="rules">

            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请填写联系人姓名（必填）"></el-input>
            </el-form-item>

            <el-form-item label="类型" prop="contact_type">
                <static-select type="contacts_type" v-model="form.contact_type"></static-select>
            </el-form-item>

            <el-form-item label="邮箱" prop="identity">
                <el-input v-model="form.email_address" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone_number">
                <el-input v-model="form.phone_number" placeholder=""></el-input>
            </el-form-item>
            <template v-if="!isDefaultContacts">
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
            </template>

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
    import Config from "@/const/selectConfig";
    const map = new Map(Config);

    const URL = '/customers'
    export default {
        name: 'RequireListPop',
        mixins: [PopMixins],
        props: ['customer', 'contact_id','isDefaultContacts'],
        data() {
            return {
                switch_type:"is_boolean",
                cityInfo: '',
                form: {
                    name: "",
                    contact_type: "",
                    email_address: "",
                    phone_number: "",
                    identity: "",
                    first_name: "",
                    last_name: "",
                    is_publish_name: 0,
                },
                'rules': {
                    'name': [{required: true, message: '联系人名称不能为空', trigger: 'blur'},
                        {min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                    ],
                    'contact_type': {required: true, message: '联系人类型不能为空', trigger: 'change'},
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
            update() {
                this.$emit('update');
            },
            add() {
                if(this.isDefaultContacts){
                    this.$emit('getDefaultContacts',this.form);     // 因为新增客户时会用到这个组件来新建默认联系人，所以先判断是否是isDefaultContacts
                    this.dialogVisible = false;
                    return
                }
                if (this.form.name !== ''&&this.form.contact_type!=="") {
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
                const url = `${URL}/${this.customer.id}/contacts/${this.contact_id}`;
                const data = Object.assign({}, this.form);
                console.log("提交的data",data);
                if (data.name === '' || data.contact_type==="") {
                    this.$message({type: 'warning', message: '必选项不能为空！'});
                    return
                }
                map.get("contacts_type").options.forEach((_) => {
                    if (_.name === data.contact_type) {
                        data.contact_type = _.id;
                    }
                });
                const success = _ => {
                    this.dialogVisible = false;
                    this.$emit("update");
                    this.$message({message: '编辑成功！', type: 'success'})
                }
                this.$axiosPut({url, data, success});
            },
            cancel() {
                this.dialogVisible = false;
            },
        },
        watch:{
            // form:function (val,oldVal) {
            //     console.log("每次都会经过这吗?")
            //     val.is_publish_name = val.is_publish_name=== "是"?1:0;
            // }
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