<template>
    <div class="PaymentRequestDetail">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="费用清单" name="first">
                <payment-cost-detail></payment-cost-detail>
            </el-tab-pane>
            <el-tab-pane label="回款记录" name="reminders">回款记录</el-tab-pane>
            <el-tab-pane label="跟催记录" name="received_payments">跟催记录</el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>
    import PaymentCostDetail from '@/components/page_extension/PaymentCostDetail'
    export default {
        name: "PaymentRequestDetail",
        data(){
            return {
                activeName:"first",
            }
        },
        methods:{
            handleClick(){},
        },
        components :{
            PaymentCostDetail
        }
    }
</script>

<style scoped>
.PaymentRequestDetail {
    margin-top: 10px;
}
</style>