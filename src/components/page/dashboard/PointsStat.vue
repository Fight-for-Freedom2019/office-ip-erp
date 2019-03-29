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
require('echarts/lib/chart/pie')  //饼图
require('echarts/lib/component/tooltip'); //提示框
require('echarts/lib/component/title'); //标题
require('echarts/lib/component/toolbox'); //标题
require('echarts/lib/component/legend'); //标题
require('echarts/lib/component/timeline'); //时间线
require('echarts/lib/component/grid'); //时间线


export default {
    name: 'PointsStat',
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
                baseOption: {
                    timeline: {
                        // y: 0,
                        axisType: 'category',
                        // realtime: false,
                        // loop: false,
                        autoPlay: false,
                        currentIndex: 12,
                        playInterval: 1000,
                        // controlStyle: {
                        //     position: 'left'
                        // },
                        left: 20,
                        right: 20,
                        data: [],
                        label: {
                            formatter: function (s) {
                                return (new Date(s)).getFullYear();
                            }
                        }
                    },
                    title: {
                        subtext: '数据由红坚果统计'
                    },
                    tooltip: {
                    },
                    legend: {},
                    calculable: true,
                    grid: {
                        top: 80,
                        bottom: 100,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                                label: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.value.replace('\n', '');
                                    }
                                }
                            }
                        }
                    },
                    xAxis: [
                        {
                            'type': 'category',
                            'axisLabel': { 'interval': 0 },
                            'data': [],
                            splitLine: { show: false }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '点数'
                        }
                    ],
                    series: []
                },
                options: []
            };
            this.chart = echarts.init(document.getElementById(this.option.id));
            this.chart.showLoading();
            const url = '/charts/pointsStat';
            const success = _ => {
                const d = _.data;
                option.baseOption.timeline.data = d.timeline;
                option.baseOption.legend = d.legend;
                option.baseOption.xAxis[0].data = d.xAxis.map((item, index) => {
                    return index % 2 == 1 ? "\n" + item : item;
                });
                option.baseOption.series = d.series;
                option.options = d.options;
                this.chart.setOption(option);
                this.chart.hideLoading();
                console.log(option);
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
