<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" :modal="false" class="dialog-small">
        <el-form label-width="100px" ref="form" :model="form" :rules="rules">

            <el-form-item label="类型" prop="type">
                <static-select type="remark_type" v-model="form.type"></static-select>
            </el-form-item>

            <el-form-item label="备注" prop="content">
                <el-input type="textarea" v-model="form.content" placeholder=""></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;">
                <el-button type="primary" @click="add" v-if="popType === 'add'" :disabled="btn_disabled">添加</el-button>
                <el-button type="primary" @click="edit" v-if="popType === 'edit'" :disabled="btn_disabled">编辑</el-button>
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

    export default {
        name: 'ContractListPop',
        mixins: [PopMixins],
        props: {
            customer: Object,
            popType: {
                type:String,
                default(){
                    return "add"
                }
            },
            remarkID:Number,
            URL:String,
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
                    content:"",
                    type: "",
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
            update() {
                this.$emit('update');
            },
            show ( type='add', data ) {
                this.type = type;
                this.dialogVisible = true;
                this.$nextTick(_=>{
                    this.$refs.form.resetFields();
                    this.coverObj(data);
                });
            },
            add() {
                //if (this.form.name !== '') {
                const url = `${this.URL}/${this.customer.id}/remarks`;
                const data = Object.assign({}, this.form);
                data.customer_id = this.customer.id;
                const success = _ => {
                    this.dialogVisible = false;
                    this.refresh();
                    this.$message({message: '添加成功！', type: 'success'})
                }
                this.$axiosPost({url, data, success});
                //} else {
                //     this.$message({type: 'warning', message: '必选项不能为空！'});
                //}

            },
            getIsPublishName(val){
                this.form.is_publish_name = val;
            },
            edit() {
                const url = `${this.URL}/${this.customer.id}/remarks/${this.remarkID}`;
                const data = Object.assign({}, this.form);
                data.customer_id = this.customer.id;
                map.get("remark_type").options.forEach((_) => {
                    if (_.name === data.type) {
                        data.type = _.id;
                    }
                });
                const success = _ => {
                    this.dialogVisible = false;
                    this.update();
                    this.$message({message: '编辑成功！', type: 'success'})
                }
                this.$axiosPut({url, data, success});
            },
            cancel() {
                this.dialogVisible = false;
            },
            coverObj(val) {
                if (val) {
                    this.$tool.coverObj(this.form, val, {
                        obj: ["type"],
                        skip: []
                    });
                }
            }
        },
        components: {
            StaticSelect,
            AppSwitch,
            RemoteSelect
        },
        REMINDER_TEXT: '客户备注',
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
