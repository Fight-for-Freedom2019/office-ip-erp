<!-- 请款管理详情面板 -->
<template>
    <div class="PaymentRequestMsg">
        <el-form label-width="75px" ref="form" v-model="form" label-position="left" class="form-information">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="请款对象">
                        <remote-select type="customer" v-model="form.creator_user"></remote-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="创建人"><span class="form-item-text">{{form.creator_user.name}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="创建时间"><span class="form-item-text">{{form.creation_time}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="请款单状态"><span class="form-item-text">{{form.status}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="金额"><span class="form-item-text">{{form.amount}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="币别"><span class="form-item-text">{{form.currency}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="汇率"><span class="form-item-text">{{form.roe}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="人民币金额"><span class="form-item-text">{{form.rmb_amount}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="请款时间"><span class="form-item-text">{{form.request_time}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="回款期限"><span class="form-item-text">{{form.deadline}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="回款时间"><span class="form-item-text">{{form.payment_time}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="回款金额"><span class="form-item-text">{{form.received_amount}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item class="break-form" label="快递" prop="remark">
                <el-input v-model="rowData.remark"></el-input>
            </el-form-item>
            <el-form-item class="break-form" label="备注" prop="remark">
                <el-input type="textarea" :rows="2" v-model="rowData.remark"></el-input>
            </el-form-item>
            <el-form-item class="break-form" label="附件">
                <up-load></up-load>
            </el-form-item>
        </el-form>
        <payment-request-detail></payment-request-detail>
    </div>
</template>

<script>
    import RemoteSelect from "@/components/form/RemoteSelect";
    import UpLoad from "@/components/form/Upload";
    import PaymentRequestDetail from '@/components/page_extension/PaymentRequestDetail'
    export default {
        name: "PaymentRequestMsg",
        data(){
            return {
                form:{}
            }
        },
        props: {
            rowData: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        created(){
            this.form = this.$tool.deepCopy(this.rowData);
        },
        watch:{
            rowData:function (val,oldVal) {
                this.$tool.coverObj(this.form,val);
            }
        },
        components:{
            RemoteSelect,
            UpLoad,
            PaymentRequestDetail,
        },
    }
</script>

<style scoped>
    .form-item-text {
        display: inline-block;
        max-width: 120px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .PaymentRequestMsg .el-form-item {
        height: 36px;
    }
    #app .form-information .break-form {
        margin-top: 22px;
        border-bottom: none;
    }

    #app .form-information .break-form .el-form-item__label {
        font-size: 14px;
        color: #606266;
    }

</style>
<style>
    #app .PaymentRequestMsg .break-form textarea {
        height: auto;
    }
</style>