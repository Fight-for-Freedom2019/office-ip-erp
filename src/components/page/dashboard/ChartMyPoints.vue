<template>
  <el-col :span="12" style="padding:0px 2px 2px 0px;">
    <el-card style="position: relative;" :style="{height:height}">
        <p slot="header" style="color: #888; margin: 0px;">{{ option.title }}</p>
        <app-table 
            :columns="columns" 
            :data="data" 
            :height="height2" 
            :showSummary="true"
            :sumFunc="sumFunc">
        </app-table>
    </el-card>
  </el-col>
  
</template>

<script>
import { mapGetters } from 'vuex'
import AppTable from '@/components/common/AppTable'

var moment = require('moment');

export default {
    name: 'ChartMyPoints',
    data() {
        return {
            columns: [
                {
                    type: "text-btn",
                    label: "案号",
                    prop: "project.serial",
                    width: "160",
                    click: this.showDetail,
                    render_text_btn: row => {
                        return row.project ? row.project.serial : "";
                    }
                },
                { type: 'text', label: '标题', prop: 'title', min_width: '145' },
                { type: 'text', label: '管制事项', prop: 'process', render_simple: 'name', min_width: '145' },
                { type: 'text', label: '点数', prop: 'points', min_width: '145' },
                { type: 'text', label: '发放日期', prop: 'issue_date', min_width: '145' },
            ],
            data: [],
        }
    },
    props: {
        option: Object,
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
        this.load();
    },
    methods: {
        load() {
            var month = moment().format('YYYYMM');
            const url = '/bonuses?month=' + month;

            const success = _ => {
                this.data = _.data.data;
            };
            const complete = _ => {
                this.loading = false;
            };

            this.loading = true;
            this.$axiosGet({ url, success, complete });
        },
        sumFunc: param => {
            const { columns, data } = param;
            const sums = [];

            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = "总计";
                    return;
                }

                if (column.property == 'points') {
                    const values = data.map(item => Number(item[column.property]));
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0).toFixed(4);
                } else {
                    sums[index] = "N/A";
                }
            });

            return sums;
        }
    },
    components: {
        AppTable
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
