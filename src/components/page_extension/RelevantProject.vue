<!-- 订单详情 相关案件 -->
<template>
    <div class="main RelevantProject">
        <template>
            <table-component :tableOption="tableOption" :data="data" ref="table"></table-component>
        </template>
    </div>
</template>

<script>
    import TableComponent from '@/components/common/TableComponent'

    export default {
        name: "RelevantProject",
        data(){
            return {
                tableOption: {
                    'name': 'RelevantProjectList',
                    'height': 515,
                    'is_search': false,
                    'is_pagination': false,
                    'columns': [
                        {type: 'text', label: '案件类型', prop: 'category', width: '150'},
                        {type: 'text', label: '子类型', prop: 'subtype', width: '170'},
                        {type: 'text', label: '案号', prop: 'serial', width: '145'},
                        {type: 'text', label: '标题', prop: 'title', width: '145'},
                        {type: 'text', label: '立案时间', prop: 'creation_time', width: '145'},
                        {type: 'text', label: '申请日', prop: 'application_date', width: '145'},
                        {type: 'text', label: '申请号', prop: 'application_number', width: '145'},
                        {type: 'text', label: '当前状态', prop: 'project_stage', width: '145',render_simple:"name"},
                    ]
                },
            }
        },
        props:{
            data:{
                type:Array,
                default(){
                    return []
                }
            },
        },
        components:{
            TableComponent
        }
    }
</script>

<style scoped>

</style>