<template>
  <el-col :span="12" style="padding:0px 2px 2px 0px;">
    <el-card style="position: relative;" :style="{height:height}">
      <p slot="header" style="color: #888; margin: 0px;">{{ option.title }}</p>
      <div :id="option.id"  ref="chart">
        
      </div>
    </el-card>
  </el-col>
</template>
<script>

const config = {
    '待办提醒': {
        title: '待办提醒',
        name: 'MyTask'
    },
    '本月点数': {
        title: '本月点数',
        name: 'MyPoints'
    },
    '点数统计': {
        title: '点数统计',
        name: 'PointsReport'
    },
    '案件指标': {
        title: '案件指标',
        name: 'KPI'
    },
}

import { mapGetters } from 'vuex'

var echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')  //柱状图
require('echarts/lib/component/tooltip'); //提示框
require('echarts/lib/component/title'); //标题

export default {
    name: 'Chart',
    data() {
        return {
            config: '',
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
        title() {
            return this.config.title;
        }
    },
    mounted() {
        this.config = config[this.type];
        this.initChart();
        console.log('here')
    },
    methods: {
        initChart() {
            var option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };
            this.chart = echarts.init(document.getElementById(this.option.id));
            this.chart.setOption(option);
        }
    },
    components: {
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
