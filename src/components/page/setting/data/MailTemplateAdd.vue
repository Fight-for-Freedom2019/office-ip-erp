<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-form-item label="是否默认模板" prop="is_default">
                <app-switch v-model="form.is_default" type="is"></app-switch>
            </el-form-item> 
            <el-form-item label="所属客户" prop="customer">
                <remote-select type="customer" v-model="form.customer"></remote-select>
            </el-form-item>
            <el-form-item label="模板类型" prop="template_type">
                <static-select type="message_template_type" v-model="form.template_type"></static-select>
            </el-form-item>
            <el-form-item label="子类型" prop="subtype" v-if="form.template_type == 1">
                <static-select type="message_template_subtype" v-model="form.subtype"></static-select>
            </el-form-item>
            <el-form-item label="场景" prop="scene">
                <static-select type="message_template_scene" v-model="form.scene"></static-select>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input placeholder="请输入标题" v-model="form.title"></el-input>
            </el-form-item>         
            <el-form-item label="收件人" prop="to">
                <remote-select :type="receiver" v-model="form.to.users" multiple>
                    <static-select type="receiverType" v-model="form.to.type"></static-select>
                </remote-select>
            </el-form-item>
            <el-form-item label="抄送" prop="cc">
                <remote-select :type="receiver_cc" v-model="form.cc.users" multiple>
                    <static-select type="receiverType" v-model="form.cc.type"></static-select>
                </remote-select>
            </el-form-item>            
            <!-- <el-form-item label="密送" prop="bcc">
                <remote-select :type="receiver_bcc" v-model="form.bcc.users" multiple>
                    <static-select type="receiverType" v-model="form.bcc.type"></static-select>
                </remote-select>
            </el-form-item> -->
            <el-form-item label="邮件正文" prop="body">
                <quill-editor 
                    v-model="form.body"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"    
                >
                </quill-editor>
            </el-form-item> 
        </el-form>
    </div>
</template>

<script>
import RemoteSelect from "@/components/form/RemoteSelect";
import StaticSelect from "@/components/form/StaticSelect";
import AppSwitch from "@/components/form/AppSwitch";

export default {
    name: "ServiceAdd",
    data() {
        return {
            URL: "/message_templates",
            receiver: 'user',
            receiver_cc: 'user',
            receiver_bcc: 'user',
            form: {
                is_default: 0,
                customer: '',
                template_type: '',
                subtype: '',
                scene: '',
                title: '',
                to: {
                   type: 2,
                   users: [], 
                },
                cc: {
                    type: 2,
                    users: [],
                },
                // bcc: {
                //     type: 2,
                //     users: [],
                // },
                body: '',
            },
            editorOption:{},
            rules: {
                template_type: [
                    {required: true, message: "模板类型不能为空", trigger: "change"}
                ],
                to: [
                    {type: 'object', required: true,trigger: 'change', fields: {
                        users: {type: 'array', required: true, message: '收件人不能为空', trigger: 'change'},
                    }}
                ],           
                title: [
                    {required: true, message: "标题不能为空", trigger: "blur"}
                ],
                customer: [
                    {required: true, message: "客户不能为空", trigger: "change"}
                ],
                subtype: [
                    {required: true, message: "模板子类型不能为空", trigger: "change"}
                ],
                scene: [
                    {required: false, message: "场景不能为空", trigger: "change"}
                ]
            },
        }
    },
    props: {
        data: Object,
        type: String,
    },
    mounted() {
        this.coverObj(this.data);
    },
    methods: {
        submitForm(type, id) {
            if(this.form.is_default) {
                this.rules.customer[0].required = false;
                this.$refs['form'].clearValidate('customer');

            }else {
                this.rules.customer[0].required = true;
            }
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let url;
                    let data;
                    let msg;
                    let fun;
                    if (type === "add") {
                        url = this.URL;
                        data = this.form;
                        msg = "创建";
                        fun = "refresh"
                    } else {
                        url = `${this.URL}/${id}`;
                        data = this.form;
                        msg = "修改";
                        fun = "update"
                    }
                    const success = _ => {
                        this.$message({type: "success", message: `${msg}成功!`});
                        this.$emit(fun);
                    };
                    type === "add" ? this.$axiosPost({url, data, success}) : this.$axiosPut({url, data, success})
                } else {
                    this.$message({type: "warning", message: "请正确填写"});
                }
            })
        },
        clear(){
            this.$refs.form.resetFields();
        },
        coverObj(val){
            val?this.$tool.coverObj(this.form, val, {obj:['template_type','subtype','scene'],skip: ['to','cc']}):"";
            if(val['to'].type !== undefined) {
                this.form.to.type = val['to']['type']['id'];
                const to_value = val['to']['users']
                this.form.to.users = to_value;
            }    
            if(val['cc'].type !== undefined) {
                this.form.cc.type = val['cc']['type']['id'];
                 const cc_value = val['cc']['users']
                this.form.cc.users = cc_value;
            }     
            // if(val['bcc']) {
            //     this.form.bcc.type = val['bcc']['type']['id'];
            //     const bcc_value = val['bcc']['users']
            //     this.form.bcc.users = bcc_value;
            // }
        },
        onEditorBlur () {

        },
        onEditorFocus () {

        },
        onEditorReady () {

        },
    },
    watch: {
        data: function (val, oldVal) {
            this.coverObj(val);
        },
        'form.is_default': {
            handler (val) {
                this.rules.customer[0].required = !this.rules.customer[0].required
            },
        },
        'form.subtype': {
            handler (val) {
                if(val == 2) {
                    this.rules.scene[0].required = true; 
                }else {
                    this.rules.scene[0].required = false;
                    this.$refs['form'].clearValidate('scene');
                }
            },
        },
        'form.to.type': {
            handler(val) {
                if(val === 1 ) {
                    this.receiver = 'mail_roles';
                }else if(val === 2){
                    this.receiver = 'user';
                }else {
                    this.receiver = 'contacts';
                }
            },
            immediate: true,
            deep: true,
        },        
        'form.cc.type': {
            handler(val) {
                if(val === 1 ) {
                    this.receiver_cc = 'mail_roles';
                }else if(val === 2){
                    this.receiver_cc = 'user';
                }else {
                    this.receiver_cc = 'contacts';
                }
            },
            immediate: true,
            deep: true,
        },        
        'form.bcc.type': {
            handler(val) {
                if(val === 1 ) {
                    this.receiver_bcc = 'mail_roles';
                }else if(val === 2){
                    this.receiver_bcc = 'user';
                }else {
                    this.receiver_bcc = 'contacts';
                }
            },
            immediate: true,
            deep: true,
        },
    },
    components: {
        RemoteSelect,
        StaticSelect,
        AppSwitch,
    },
}
</script>

<style scoped>

</style>