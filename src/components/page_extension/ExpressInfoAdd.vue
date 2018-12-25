<!-- 新增快递信息 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="选择客户" prop="customer">
                        <remote-select :pageType="type" type="customer" v-model="form.customer"></remote-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收件人" prop="user">
                        <jump-select type="user" v-model="form.user"></jump-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="联系信息" prop="contact">
                        <el-input type="text" placeholder="请输入联系信息" v-model="form.contact"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="快递公司" prop="carrier">
                        <el-input type="text" placeholder="请输入纳税人识别号" v-model="form.carrier"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="快递单号" prop="serial">
                        <el-input type="text" v-model="form.serial" placeholder="请输入快递单号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="寄件时间" prop="date">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择寄件时间" v-model="form.date"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="签收时间" prop="receipt_date">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择签收时间" v-model="form.receipt_date"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" placeholder="请填写备注" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import RemoteSelect from "@/components/form/RemoteSelect";
    import JumpSelect from "@/components/form/JumpSelect";
    import StaticSelect from "@/components/form/StaticSelect";
    export default {
        name: "ExpressInfoAdd",
        data(){
            return {
                URL:"/expresses",
                form:{
                    customer:"",
                    user:"",
                    contact:"",
                    carrier:"",
                    serial:"",
                    date:"",
                    receipt_date:"",
                    remark:"",
                },
                rules:{
                    identity:[
                        {required:true,message:"请输入纳税人识别号",trigger:"blur"}
                    ],
                    phone_number:[
                        {required:true,message:"请输入联系电话",trigger:"blur"}
                    ],
                    bank:[
                        {required:true,message:"请输入开户行",trigger:"blur"}
                    ],
                    account:[
                        {required:true,message:"请输入银行账户",trigger:"blur"}
                    ],
                    name:[
                        {required:true,message:"请输入单位名称",trigger:"blur"}
                    ],
                    target_type:[
                        {required:true,message:"请选择主体类型",trigger:"blur"}
                    ]
                },
            }
        },
        props:{
            data:Object,
            type:String,
        },
        mounted(){
            this.coverObj(this.data);
        },
        watch:{
            data:function (val,oldVal) {
                this.coverObj(val);
            }
        },
        methods:{
            submitForm(type,id){
                this.$refs['form'].validate((valid)=>{
                    if(valid){
                        let url;
                        let data;
                        let msg;
                        let fun;
                        if(type === "add"){
                            url = this.URL;
                            data = this.form;
                            msg = "创建";
                            fun = "refresh"
                        }else {
                            url = `${this.URL}/${id}`;
                            data = this.form;
                            msg = "修改";
                            fun = "update"
                        }
                        const success = _ => {
                            this.$message({type:"success",message:`${msg}成功!`});
                            this.$emit(fun);
                        };
                        data.customer_id = data.customer;
                        type === "add" ? this.$axiosPost({url,data,success}) : this.$axiosPut({url,data,success})
                    }else {
                        this.$message({type:"warning",message:"请正确填写"});
                    }
                })
            },
            coverObj(val){
                val?this.$tool.coverObj(this.form,val):"";
            },
            clear(){
                this.$refs.form.resetFields();
            },
        },
        components:{
            RemoteSelect,
            JumpSelect,
            StaticSelect,
        }
    }
</script>

<style scoped>

</style>