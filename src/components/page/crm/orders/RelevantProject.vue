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
                    'height': 450,
                    'is_search': false,
                    'is_pagination': false,
                    'columns': [
                        {type: 'text', label: '案件类型', prop: 'project_type',render_simple:'name', min_width: '120'},
                        {type: 'text', label: '子类型', prop: 'subtype',render_simple:'name', min_width: '120'},
                        {type: 'text', label: '案号', prop: 'serial', min_width: '120'},
                        {type: 'text', label: '标题', prop: 'title', min_width: '120'},
                        {type: 'text', label: '立案日', prop: 'creation_time', min_width: '110'},
                        // {type: 'text', label: '申请日', prop: 'application_date', width: '145'},
                        // {type: 'text', label: '申请号', prop: 'application_number', width: '145'},
                        {type: 'text', label: '当前状态', prop: 'project_stage', min_width: '110',render_simple:"name"},
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