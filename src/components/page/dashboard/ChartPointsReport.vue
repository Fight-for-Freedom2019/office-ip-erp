<template>
    
    <el-col :span="12" style="padding:0px 2px 2px 0px;">
        <el-card style="position: relative;" :style="{height:height}">
            <p slot="header" style="color: #888; margin: 0px;">{{ option.title }} </p>
            <div :id="option.id"  ref="chart" :style="{width:'100%',height:height2}"> </div>
        </el-card>
    </el-col>
</template>
<script>


import { mapGetters } from 'vuex'

var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')  //柱状图
require('echarts/lib/chart/line')  //线状图
require('echarts/lib/component/tooltip'); //提示框
require('echarts/lib/component/title'); //标题
require('echarts/lib/component/toolbox'); //标题
require('echarts/lib/component/legend'); //标题

export default {
    name: 'ChartPointsReport',
    data() {
        return {
            chart: null
        }
    },
    props: {
        option: Object
    },
    computed: {
        ...mapGetters([
            'innerHeight',
        ]),
        height() {
            return ((this.innerHeight - 30) / 2) + 'px';
        },
        height2() {
            return (((this.innerHeight - 30) / 2) - 70) + 'px';
        },
    },
    mounted() {
        this.initChart();
    },
    methods: {
        initChart() {
            var option = option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['月总点数', '排名']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['201804', '201805', '201806', '201807', '201808', '201809', '201810', '201811', '201812', '201901', '201902', '201903'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '点数',
                        min: 0,
                        max: 40,
                        interval: 5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '排名',
                        min: 0,
                        max: 30,
                        interval: 5,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: '月总点数',
                        type: 'bar',
                        barMaxWidth: 30,
                        data: [5, 20, 36, 10, 10, 20, 10, 20, 16, 19, 20, 31]
                    },
                    {
                        name: '排名',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [1, 2, 3, 4, 5, 6, 7, 5, 3, 2, 1, 2]
                    }
                ]
            };
            this.chart = echarts.init(document.getElementById(this.option.id));
            this.chart.showLoading();

            const url = '/charts/pointsReport';

            const success = _ => {
                const d = _.data;
                option.xAxis[0].data = d.xAxis;
                option.yAxis[0].max = d.maxPoints;
                option.yAxis[0].interval = d.pointsInterval;
                option.yAxis[1].max = d.maxRank;
                option.yAxis[1].interval = d.rankInterval;
                option.series[0].data = d.points;
                option.series[1].data = d.ranks;
                this.chart.setOption(option);
                this.chart.hideLoading();
            };

            this.loading = true;
            this.$axiosGet({ url, success });
        }
    },
    components: {

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
