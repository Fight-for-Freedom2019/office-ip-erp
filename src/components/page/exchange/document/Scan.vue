<template>
  <div title="文档扫描">
    <el-form label-width="100px" :model="form" ref="form">
      <el-form-item label="申请号" prop="application_number">
        <el-input v-model="form.application_number" placeholder="请用扫描抢扫描通知书上的二维码" @input.native="input" @blur="blur" ref="application_number"></el-input>
      </el-form-item>
      <el-form-item label="案件信息" >
           <app-table :columns="columns" :data="tableData" :show-header="false" v-loading="loading" element-loading-text="案件数据加载中..."></app-table>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import AppTable from "@/components/common/AppTable";

export default {
    name: 'Scan',
    mixins: [],
    props: {
    },
    data() {
        return {
            form: {
                application_number: '',
                scan: 1
            },
            columns: [
                { type: 'text', label: '字段', prop: 'field', width: '180' },
                { type: 'text', label: '值', prop: 'value', min_width: '180' },
            ],
            patent: '',
            loading: false,
        }
    },
    computed: {
        ...mapGetters([
            'menusMap',
        ]),
        tableData: function () {
            return [
                { field: '分所', value: this.patent ? this.patent.tenancy.tenancy_name : '' },
                { field: '案号', value: this.patent ? this.patent.serial : '' },
                { field: '标题', value: this.patent ? this.patent.title : '' },
                { field: '申请日', value: this.patent ? this.patent.application_date : '' },
                { field: '申请号', value: this.patent ? this.patent.application_number : '' },
                { field: '客户', value: this.patent ? this.patent.customer.name : '' },
                { field: '客户案号', value: this.patent ? this.patent.customer_serial : '' },
            ]
        }
    },
    watch: {
    },
    mounted() {
        this.$refs.application_number.focus();
    },
    methods: {
        ...mapActions([
        ]),

        input(e) {
            const val = e.target.value;
            if (val.length != 13) {
                this.patent = '';
                return;
            }
            this.loading = true;
            const url = '/patents?scan=1&application_number=' + val;
            const data = {};
            const success = _ => {
                this.loading = false;
                const d = _.patents.data;
                if (d.length > 0) {
                    this.patent = d[0];
                } else {
                    this.patent = '';
                }
                this.$refs.form.resetFields();
                this.form.application_number = '';
            };
            this.$axiosGet({ url, data, success });
        },
        blur() {
            this.$refs.application_number.focus();
        }
    },
    created() {
    },
    watch: {

    },
    components: {
        AppTable
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-table {
    font-size:16px;
  }
</style>