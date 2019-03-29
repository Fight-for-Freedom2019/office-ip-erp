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
    name: 'NewCaseFee',
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
                    text: this.option.id == 'ReceivedPayments' ? '回款统计' : '立案代理费'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: []
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: []
            };
            this.chart = echarts.init(document.getElementById(this.option.id));
            this.chart.showLoading();
            const url = '/charts/newCaseFee?type=' + this.option.id;
            const success = _ => {
                const d = _.data;
                option.legend = d.legend;
                option.xAxis.data = d.xAxis;
                option.series = d.series;
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
