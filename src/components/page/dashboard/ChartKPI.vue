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
require('echarts/lib/chart/radar')  //雷达图
require('echarts/lib/component/tooltip'); //提示框
require('echarts/lib/component/title'); //标题

export default {
    name: 'ChartKPI',
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
            var option = {
                title: {
                    text: '多雷达图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'center',
                    data: ['某软件', '某主食手机', '某水果手机', '降水量', '蒸发量']
                },
                radar: [
                    {
                        indicator: [
                            { text: '品牌', max: 100 },
                            { text: '内容', max: 100 },
                            { text: '可用性', max: 100 },
                            { text: '功能', max: 100 }
                        ],
                        center: ['25%', '40%'],
                        radius: 80
                    },
                    {
                        indicator: [
                            { text: '外观', max: 100 },
                            { text: '拍照', max: 100 },
                            { text: '系统', max: 100 },
                            { text: '性能', max: 100 },
                            { text: '屏幕', max: 100 }
                        ],
                        radius: 80,
                        center: ['50%', '60%'],
                    },
                    {
                        indicator: (function () {
                            var res = [];
                            for (var i = 1; i <= 12; i++) {
                                res.push({ text: i + '月', max: 100 });
                            }
                            return res;
                        })(),
                        center: ['75%', '40%'],
                        radius: 80
                    }
                ],
                series: [
                    {
                        type: 'radar',
                        tooltip: {
                            trigger: 'item'
                        },
                        itemStyle: { normal: { areaStyle: { type: 'default' } } },
                        data: [
                            {
                                value: [60, 73, 85, 40],
                                name: '某软件'
                            }
                        ]
                    },
                    {
                        type: 'radar',
                        radarIndex: 1,
                        data: [
                            {
                                value: [85, 90, 90, 95, 95],
                                name: '某主食手机'
                            },
                            {
                                value: [95, 80, 95, 90, 93],
                                name: '某水果手机'
                            }
                        ]
                    },
                    {
                        type: 'radar',
                        radarIndex: 2,
                        itemStyle: { normal: { areaStyle: { type: 'default' } } },
                        data: [
                            {
                                name: '降水量',
                                value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
                            },
                            {
                                name: '蒸发量',
                                value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
                            }
                        ]
                    }
                ]
            };

            this.chart = echarts.init(document.getElementById(this.option.id));
            this.chart.setOption(option);
            this.chart.resize();
        }
    },
    components: {

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
