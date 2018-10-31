<!-- 请款管理 费用明细 -->
<template>
    <div class="PaymentCostDetail">
        <table-component :tableOption="tableOption" :data="tableData" ref="table"
                         @refreshTableData="refreshTableData"></table-component>
    </div>

</template>

<script>
    import TableComponent from '@/components/common/TableComponent'

    export default {
        name: "PaymentCostDetail",
        data() {
            return {
                tableData: [],
                tableOption: {
                    'name': 'PaymentCostDetailList',
                    'url': "",
                    'height': 'default7',
                    'highlightCurrentRow': true,
                    'is_search': false,
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add'},
                    ],
                    'columns': [
                        // {type: 'selection'},
                        {type: 'text', label: '客户', prop: 'customer.name', min_width: '178'},
                        {type: 'text', label: '案号', prop: 'project.serial', width: '120'},
                        {type: 'text', label: '标题', prop: 'project.title', width: '150'},
                        {type: 'text', label: '申请国家', prop: 'project.area', width: '180'},
                        {type: 'text', label: '订单号', prop: 'order.serial', width: '120'},
                        {type: 'text', label: '申请号', prop: 'application_number', width: '120'},
                        {type: 'text', label: '申请日', prop: 'application_date', width: '100'},
                        {type: 'text', label: '官费', prop: 'official_fee', width: '150'},
                        {type: 'text', label: '代理费', prop: 'service_fee', width: '150'},
                        {type: 'text', label: '费用策略', prop: 'policy', width: '150'},
                        {type: 'text', label: '官费票据', prop: 'official_voucher', width: '150'},
                        {type: 'text', label: '代理费票据', prop: 'serfice_voucher', width: '150'},
                    ],
                },
            }
        },
        methods: {
            handleRowClick() {
            },
            refreshTableData(option) {
            },
        },
        components: {
            TableComponent,
        }
    }
</script>

<style scoped>

</style>