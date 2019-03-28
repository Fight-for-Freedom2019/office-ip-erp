<template>
    <my-task v-if="option.id == 'MyTask'" :id="option.title" :option="option" ></my-task>
    <my-points v-else-if="option.id == 'MyPoints'" :id="option.title" :option="option" ></my-points>
    <points-report v-else-if="option.id == 'PointsReport'" :option="option" ></points-report>
    <kpi v-else-if="option.id == 'KPI'" :option="option" ></kpi>
    <memo v-else-if="option.id == 'Memo'" :option="option" ></memo>
</template>
<script>


import { mapGetters } from 'vuex'
import MyTask from '@/components/page/dashboard/ChartMyTask'
import MyPoints from '@/components/page/dashboard/ChartMyPoints'
import PointsReport from '@/components/page/dashboard/ChartPointsReport'
import kpi from '@/components/page/dashboard/ChartKPI'
import memo from '@/components/page/dashboard/Memo'

var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')  //柱状图
require('echarts/lib/component/tooltip'); //提示框
require('echarts/lib/component/title'); //标题

export default {
    name: 'Chart',
    data() {
        return {
        }
    },
    props: {
        option: Object
    },
    computed: {

    },
    mounted() {

    },
    methods: {

    },
    components: {
        MyTask,
        MyPoints,
        PointsReport,
        kpi,
        memo
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
