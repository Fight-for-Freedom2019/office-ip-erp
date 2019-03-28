<template>
  <div class="main" v-loading="loading" element-loading-text="图表数据加载中" :style="{height:height}">
      <chart v-for="chart in charts" :option="chart" v-bind:key="chart.id"></chart>
      <el-button type="info" icon="el-icon-my-setting" circle style="position:absolute;left:10px;bottom:10px;" @click="showChartSelect"></el-button>
      <chart-select ref="selector" @selected="selected" :options="options" :selected="charts"></chart-select>
      <el-dialog
        title="请选择要显示首页上的图表"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>您没有选择任何图表，点击【确定】按钮选择要显示在首页上的图表，以后您也可以通过点击屏幕左下角的【齿轮】按钮重新选择图表</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="showChartSelect">确 定</el-button>
        </span>
        </el-dialog>
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
            centerDialogVisible: false,
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
            this.charts = _.data.charts;
            this.options = _.data.options;
        };
        const complete = _ => {
            this.loading = false;
        };

        this.loading = true;
        this.$axiosGet({ url, success, complete });
    },
    watch: {
        charts(val) {
            if (this.charts.length == 0) {
                this.showTips();
            }
        }
    },
    methods: {
        selected(charts) {
            this.charts = charts
        },
        showChartSelect() {
            if (this.centerDialogVisible) {
                this.centerDialogVisible = false;
            }
            this.$refs.selector.show();
        },
        showTips() {
            this.centerDialogVisible = true;
        }
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
