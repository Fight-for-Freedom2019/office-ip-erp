<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :modal="false" class="dialog-small">
        <el-form label-width="100px" ref="form" :model="form" :rules="rules">

            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="form.name" placeholder="请填写发明人姓名（必填）"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="尊称" prop="title">
                        <el-input v-model="form.title" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="国籍" prop="citizenship">
                        <static-select type="area" v-model="form.citizenship"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮件地址" prop="email_address">
                        <el-input v-model="form.email_address" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="英文名" prop="first_name">
                        <el-input v-model="form.first_name" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="英文姓" prop="last_name">
                        <el-input v-model="form.last_name" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="电话号码" prop="phone_number">
                <el-input v-model="form.phone_number" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="证件号码" prop="identity">
                <el-input v-model="form.identity" placeholder=""></el-input>
            </el-form-item>

            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="form.remark" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="是否公开姓名" prop="is_publish_name">
                <app-switch :type="switch_type" v-model="form.is_publish_name" @input="getIsPublishName"></app-switch>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px;">
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


    const URL = '/customers'
    export default {
        name: 'InventorPop',
        mixins: [PopMixins],
        props: ['customer', 'presentId'],
        data() {
            return {
                cityInfo: '',
                switch_type: "is_boolean",
                form: {
                    customer:{},
                    customer_id:"",
                    name: "",
                    type: "",
                    email_address: "",
                    phone_number: "",
                    identity: "",
                    first_name: "",
                    last_name: "",
                    citizenship:"",
                    is_publish_name: true,
                },
                'rules': {
                    'name': [{required: true, message: '发明名称不能为空', trigger: 'blur'},
                        {min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                    ],
                    'identity': [{required: true, message: '证件号码不能为空', trigger: 'blur'},
                        {min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                    ],
                    'citizenship':{
                        required:true,
                        message:"请选择国籍"
                    },
                    'email_address': [
                        {
                            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
                            message: '邮件地址格式不正确',
                            trigger: 'blur'
                        }],
                    'phone_number': {pattern: /^1[345678]\d{9}$/, message: '手机号码或者座机号码格式错误', trigger: 'blur'},
                }
            }
        },
        computed: {
            //cityName 为选择的省市区名称
            // cityName() {
            //   const names = [];
            //   this.cityInfo.province && names.push(this.cityInfo.province.name + ' ')
            //   this.cityInfo.city     && names.push(this.cityInfo.city.name + ' ')
            //   this.cityInfo.block    && names.push(this.cityInfo.block.name + ' ')
            //   return names.join('')
            // }
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
                this.$refs['form'].validate((valid)=>{
                    if(valid){
                        const url = `${URL}/${this.customer.id}/inventors`;
                        const data = Object.assign({}, this.form);
                        delete data.customer;
                        const success = _ => {
                            this.dialogVisible = false;
                            this.refresh();
                            this.$message({message: '添加成功！', type: 'success'})
                        };
                        this.$axiosPost({url, data, success});
                    }else {
                        this.$message({type: 'warning', message: '请正确填写'});
                    }
                })

            },
            edit() {
                this.$refs['form'].validate((valid)=>{
                    if(valid){
                        const url = `${URL}/${this.customer.id}/inventors/${this.presentId}`;
                        const data = Object.assign({}, this.form);
                        delete data.customer;
                        const success = _ => {
                            this.dialogVisible = false;
                            this.update();
                            this.$message({message: '编辑成功！', type: 'success'})
                        }
                        this.$axiosPut({url, data, success});
                    }else {
                        this.$message({type: 'warning', message: '请正确填写'});
                    }
                });

            },
            cancel() {
                this.dialogVisible = false;
            },
            getIsPublishName(val) {
                this.form.is_publish_name = val;
            },
        },
        components: {
            StaticSelect,
            AppSwitch
        },
        REMINDER_TEXT: '',
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>