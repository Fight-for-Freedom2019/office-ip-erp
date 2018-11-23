<!-- 订单管理 相关合同 -->
<template>
    <div class="main RelevantContract">
        <template v-if="status === 4">
            <el-form>
                <el-form-item label="请上传文件:">
                    <up-load></up-load>
                </el-form-item>
            </el-form>

        </template>
        <template v-else>
            <table-component :tableOption="tableOption" :data="data" ref="table"></table-component>
        </template>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'
    import UpLoad from "@/components/form/Upload";

    export default {
        name: "RelevantContract",
        data() {
            return {
                tableData: [],
                tableOption: {
                    'name': 'RelevantContractList',
                    'height': 515,
                    'is_search': false,
                    'is_pagination': false,
                    'columns': [
                        {type: 'text', label: '客户', prop: 'customer', width: '150', render_simple: "name"},
                        {type: 'text', label: '联系人', prop: 'contact', width: '170', render_simple: "name"},
                        {type: 'text', label: '合同编号', prop: 'serial', width: '145'},
                        {type: 'text', label: '合同类型', prop: 'type', width: '145'},
                        {
                            type: 'text', label: '状态', prop: 'is_effective', width: '123', render: (h, item) => {
                                item = item === 1 ? "生效中" : "已失效";
                                return h("span", item);
                            },
                            render_header: true
                        },
                        {type: 'text', label: '签订日期', prop: 'signing_date', width: '175'},
                        {type: 'text', label: '届满日期', prop: 'expire_date', width: '175'},
                        {type: 'text', label: '备注', prop: 'remark'},
                    ]
                },
            }
        },
        props: {
            status: {
                type: Number,
                default() {
                    return 0
                },
            },
            data:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components: {
            TableComponent,
            UpLoad
        },
    }
</script>

<style scoped>
    .update-text {
        display: inline-block;
    }
</style>
<style>
    #app .RelevantContract .app-upload .el-upload {
        display: inline-block;
        position: static;
    }
</style>