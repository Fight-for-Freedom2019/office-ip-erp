<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="选择案件" prop="customer">
                        <jump-select type="project" :pageType="type" v-model="form.customer"></jump-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="选择请款单" prop="invoice">
                        <jump-select type="bill" :pageType="type" v-model="form.invoice"></jump-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="币别" prop="currency">
                        <el-input type="text" v-model="form.currency"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="汇率" prop="roe">
                        <el-input type="text" v-model="form.roe"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="最后期限" prop="deadline">
                        <el-input type="text" v-model="form.deadline"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="请选择订单" prop="order">
                        <el-input type="text" v-model="form.order"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="费用状态" prop="status">
                        <el-input type="text" v-model="form.status"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="付款时间" prop="payment_time">
                        <el-input type="text" v-model="form.invoice.payment_time"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import RemoteSelect from "@/components/form/RemoteSelect";
    import JumpSelect from "@/components/form/JumpSelect";

    export default {
        name: "WaitForPaymentAdd",
        data(){
            return {
                form:{
                    customer:{
                        id:1,
                        name:"静态案件"
                    },
                    invoice:{
                        id:1,
                        name:"静态请款单",
                        payment_time:"2018-11-12"
                    }
                },
                rules:{},
                type:"add"
            }
        },
        components:{
            RemoteSelect,
            JumpSelect
        }
    }
</script>

<style scoped>

</style>