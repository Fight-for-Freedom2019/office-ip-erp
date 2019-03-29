<template>
  
  <el-col :span="12" style="padding:0px 2px 2px 0px;">
    <el-card style="position: relative;" :style="{height:height}">
        <p slot="header" style="color: #888; margin: 0px;">{{ option.title }} </p>
        <app-table :columns="columns" :data="data" :loading="loading" :height="height2" ></app-table>
    </el-card>
  </el-col>
</template>

<script>
import { mapGetters } from 'vuex'
import AppTable from '@/components/common/AppTable'

var moment = require('moment');

export default {
    name: 'ChartMyTask',
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
                { type: 'text', label: '管制事项', prop: 'process_definition.name', min_width: '145' },
                { type: 'text', label: '管控期限', prop: 'internal_deadline', min_width: '100' },
                { type: 'text', label: '官方绝限', prop: 'deadline', min_width: '100' },
            ],
            data: [],
            loading: false,
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
        mode() {
            return this.option.id.indexOf('Deadline') >= 0 ? 'deadline' : 'internal_deadline';
        },
        scope() {
            if (this.option.id.indexOf('All') >= 0) {
                return 'all';
            } else if (this.option.id.indexOf('Dept') >= 0) {
                return 'dept';
            } else {
                return 'my';
            }
        },
    },
    mounted() {
        this.load();
    },
    methods: {
        load() {
            var date = moment().add(3, 'days').format('YYYY-MM-DD');
            const url = '/processes?scope=' + this.scope + '&' + this.mode + '=,' + date;
            const success = _ => {
                this.data = _.processes.data;
            };
            const complete = _ => {
                this.loading = false;
            };

            this.loading = true;
            this.$axiosGet({ url, success, complete });
        },
        showDetail() {

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
