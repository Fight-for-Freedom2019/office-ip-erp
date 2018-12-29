<!-- 合同列表新增 -->
<!-- ContractsListAdd -->
<template>
    <div class="main" >
        <app-shrink :visible.sync="dialogVisible"  :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" @click="save(mode)" size="small">保存</el-button>
            </span>
            
            <el-form label-width="120px" :model="form" :rules="rules" ref="form"  v-loading="loadingVisible" :element-loading-text="loadingText" style="margin-top:10px;">
                <el-form-item label="客户" prop="customer">
                    <remote-select type="customer" :pageType="customerType" v-model="form.customer"></remote-select>
                </el-form-item>

                <el-form-item label="合同正文" prop="attachments">
                    <upload v-model="form.attachments" :file-list="attachments"></upload>
                </el-form-item>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="联系人" prop="contact">
                            <remote-select type="contacts" :pageType="contactType" v-model="form.contact" :para="customerParam"></remote-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="相关订单" prop="order">
                            <remote-select type="orders" :pageType="orderType"  v-model="form.order" :para="customerParam"></remote-select>
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
                <el-form-item label="状态" prop="status" v-if="this.mode === 'edit'">
                    <static-select type="contract_status" v-model="form.status" placeholder=""></static-select>
                </el-form-item>
                

            </el-form>
        </app-shrink>
    </div>
</template>

<script>
    import StaticSelect from "@/components/form/StaticSelect";
    import AppSwitch from "@/components/form/AppSwitch";
    import RemoteSelect from "@/components/form/RemoteSelect";
    import Upload from '@/components/form/Upload';
    import AppShrink from '@/components/common/AppShrink'

    const URL = "/contracts";

    export default {
        name: "ContractsListAdd",
        props: {
            order: {
                type: Object,
                default() {
                    return {};
                }
            },
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
                    remark:"",
                    attachments:[],
                    contact: '',
                    customer: '',
                    order: '',
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
                },
                id:0,
                mode:'edit',
                dialogVisible: false,
                title:'',
                loadingVisible:false,
                loadingText:'合同数据加载中...',
            };
        },
        methods: {
            save(type) {
                this.$refs['form'].validate((valid)=>{
                    if(valid){
                        const data = Object.assign({},this.form);
                        if (type === "add") {
                            this.$axiosPost({
                                url: URL,
                                data,
                                success: (_) => {
                                    this.$message({type: "success", message: _.info});
                                    this.$emit("refresh");
                                    this.dialogVisible = false;
                                }
                            });
                        } else {
                            data.attachments = this.form.attachments.map((item)=>item.id);  // 更新至于要附件的id
                            let url = "/contracts/" + this.id;
                            data.id = this.id;
                            this.$axiosPut({
                                url,
                                data,
                                success: (_) => {
                                    this.$message({type: "success", message: _.info});
                                    this.$emit("update");
                                    this.dialogVisible = false;
                                }
                            });
                        }
                    } else {
                        this.$message({type: 'warning', message: '请正确填写'});
                    }
                })
                
            },
            getStatus(val) {
                this.form.status  = val;
            },
            coverObj(val) {
                if (val) {
                    this.$tool.coverObj(this.form, val, {obj: ['type','status']});
                    this.attachments = val.attachments;
                }
            },
            clear(){
                this.form = {
                    type: "",
                    signing_date: "",
                    expire_date: "",
                    status : 1,
                    serial: "",
                    remark:"",
                    attachments:[],
                    contact: '',
                    customer: '',
                    order: '',
                }
                this.attachments = [];
                // this.$refs.form.resetFields();
            },
            load(id) {
                this.loadingVisible = true;
                const url = `/contracts/${id}`;
                const success = _ => {
                    const data = _.data[0];
                    this.coverObj(data);
                    this.title = this.mode =='edit' ? '合同详情>' + data.serial : '';
                };
                const complete = () => {
                    this.loadingVisible = false;
                    this.$emit('loaded');
                };
                this.$axiosGet({url, success, complete});
            },
            show(id,mode,contract) {
                this.mode = mode;
                if (mode == 'add') {
                    this.title = '新建合同';
                }
                if (!this.dialogVisible) {
                    this.dialogVisible = true;
                }
                console.log(contract);
                //如果有传递合同数据，优先以合同数据显示
                if (contract !== undefined) {
                    this.id = contract.id;
                    this.coverObj(contract);
                    this.title = '合同详情>' + contract.serial;
                    return;
                }else {
                    this.clear();
                }
                //根据ID加载显示数据
                this.id = id;
                if (id > 0) {
                    this.load(id);
                }
            },
        },
        computed: {
            customerType () {
                return this.form.customer ? 'edit' : 'add';
            },
            contactType () {
                return this.form.contact ? 'edit' : 'add';
            },
            orderType () {
                return this.form.order ? 'edit' : 'add';
            },
            customerParam () {
                return this.form.customer ? {customer:this.form.customer} : {};
            },
        },
        watch: {
            order: function (val, oldVal) {
                this.form.customer = val.customer;
                this.form.order = val;
                this.form.contact = val.contact;
                this.form.type = 2;
            },
        },
        components: {
            StaticSelect,
            AppSwitch,
            RemoteSelect,
            Upload,
            AppShrink,
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>