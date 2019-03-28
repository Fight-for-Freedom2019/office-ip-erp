<template>
  <div class="main" v-loading="loading" element-loading-text="图表数据加载中" :style="{height:height}">
      <chart v-for="chart in charts" :option="chart" v-bind:key="chart.id"></chart>
      <el-button type="info" icon="el-icon-my-setting" circle style="position:absolute;left:10px;bottom:10px;" @click="showChartSelect"></el-button>
      <chart-select ref="selector" @selected="selected" :options="options" :selected="charts"></chart-select>
  </div>
</template>
<script>

import Chart from '@/components/page/dashboard/Chart'
import ChartSelect from '@/components/page/dashboard/ChartSelect'

import { mapGetters } from 'vuex'
export default {
    name: 'Dashboard',
    data() {
        return {
            config: '',
            charts: [],
            options: [],
            loading: false,
        }
    },
    computed: {
        ...mapGetters(['innerHeight']),
        height() {
            return (this.innerHeight - 40) + 'px';
        }
    },
    mounted() {
        const url = '/charts';
        const success = _ => {
            let j = 1;
            this.charts = _.data.charts.map(chart => {
                chart.id = 'chart' + j;
                j++;
                return chart;
            });
            this.options = _.data.options;
        };
        const complete = _ => {
            this.loading = false;
        };

        this.loading = true;
        this.$axiosGet({ url, success, complete });
    },
    methods: {
        selected(charts) {
            this.charts = charts
        },
        showChartSelect() {
            this.$refs.selector.show();
        },
    },
    components: {
        Chart,
        ChartSelect
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
