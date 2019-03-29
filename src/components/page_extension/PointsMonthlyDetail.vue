<!-- 点数月报详情 -->
<template>
  <div>
    <app-shrink :visible.sync="visible" title="点数月报详情">
      <el-form :model="form" class="form-information"  v-loading="loading" element-loading-text="数据加载中">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户" class="form-item-text">{{ form.user }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="月份" class="form-item-text">{{ form.month }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总点数" class="form-item-text">{{ form.points }}</el-form-item>
          </el-col>
        </el-row>    
        <el-row>
          <el-col :span="8">
            <el-form-item label="月度排名" class="form-item-text">{{ form.rank }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注" class="form-item-text">{{ form.remark }}</el-form-item>
          </el-col>
        </el-row>    
        <app-table :data="tableData" :columns="columns" height="700" ref="table"></app-table>   
      </el-form> 
    </app-shrink>
    <points-edit ref="PointsEdit" @update="update"></points-edit>
  </div>
</template>
<script>
const URL = '/bonus_reports';

import PointsEdit from "@/components/page/finance/PointsEdit";

export default {
    name: 'PointsMonthlyDetail',
    data() {
        return {
            visible: false,
            form: {
                user: '',
                month: '',
                points: '',
                rank: '',
                remark: '',
            },
            columns: [
                { type: "text", label: "客户", prop: "customer", render_simple:"name",min_width: "200" },
                { type: "text", label: "案号", prop: "serial", min_width: "150" },
                { type: "text", label: "标题", prop: "title", min_width: "200" },
                { type: "text", label: "案件类型", prop: "project_type", render_simple: "name", width: "90", },
                { type: "text", label: "案件子类型", prop: "subtype", render_simple: "name", width: "110", },
                { type: "text", label: "国家/地区", prop: "area", render_simple: "name", width: "100", },
                { type: "text", label: "管制事项", prop: "process", render_simple: "name", width: "120", },
                { type: "text", label: "点数", prop: "points", width: "80" },
                { type: "array", label: "案件标签", prop: "project_tags", min_width: "120", render: _ => _.map(_ => _.name) },
                { type: "array", label: "管制事项标签", prop: "process_tags", min_width: "120", render: _ => _.map(_ => _.name) },
                { type: "text", label: "点数类型", prop: "bonus_type", render_simple: "name", width: "110", },
                { type: "text", label: "用户", prop: "user", render_simple: "name", width: "80", },
                { type: "text", label: "状态", prop: "status", render_simple: "name", width: "80", },
                { type: "action", width: "100", fixed: "right", btns: [{ type: "edit", click: this.handleEdit }, { type: "delete", click: this.handleDelete }] },
            ],
            tableData: [],
            id: 0,
            loading: false,
            mode: 'edit',
        }
    },
    methods: {
        show(mode, id) {
            this.mode = mode;
            this.id = id;
            this.visible = true;
            this.getDetail(id)
        },
        update() {
            this.getDetail(this.id);
            this.$emit('update');
        },
        handleEdit(row) {
            console.log(row);
            this.$refs.PointsEdit.show('edit', row)
        },
        handleDelete({ id }) {
            const url = `/bonuses/${id}`;
            const success = _ => {
                this.show('edit', this.id)
                this.$emit("update");
            };
            this.$axiosDelete({ url, success });
        },
        getDetail(id) {
            this.loading = true;
            const url = `${URL}/${id}`;
            const success = _ => {
                const data = _.bonus_report;
                this.tableData = data.detail;
                this.$nextTick(() => {
                    this.$tool.coverObj(this.form, data, );
                    this.form.user = data.user.name ? data.user.name : data.user;
                })
                this.loading = false;
            };
            this.$axiosGet({ url, success });
        }
    },
    components: {
        PointsEdit
    }
}
</script>
<style lang="scss" scoped>
</style>