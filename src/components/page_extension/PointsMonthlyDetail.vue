<!-- 点数月报详情 -->
<template>
  <div>
    <app-shrink :visible.sync="visible" title="点数月报详情">
      <el-form :model="form" class="form-information">
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
      </el-form> 
      <app-table :data="tableData" :columns="columns" height="700"  ref="table"></app-table>   
    </app-shrink>
  </div>
</template>
<script>
const  URL = '/bonus_reports';
export default {
  name: 'pointsMonthlyDetail',
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
         { type: "text", label: "案号", prop: "serial", min_width: "150" },
          { type: "text", label: "标题", prop: "title", min_width: "200" },
          {
            type: "text",
            label: "案件类型",
            prop: "project_type",
            render_simple: "name",
            width: "90",
          },
          {
            type: "text",
            label: "案件子类型",
            prop: "subtype",
            render_simple: "name",
            width: "110",
          },
          {
            type: "text",
            label: "国家/地区",
            prop: "area",
            render_simple: "name",
            width: "100",
          },
          {
            type: "text",
            label: "管制事项",
            prop: "process",
            render_simple: "name",
            width: "120",
          },
          {
            type: "array",
            label: "案件标签",
            prop: "project_tags",
            min_width: "120",
            render: _ => _.map(_ => _.name)
          },
          {
            type: "array",
            label: "管制事项标签",
            prop: "process_tags",
            min_width: "120",
            render: _ => _.map(_ => _.name)
          },
          {
            type: "text",
            label: "点数类型",
            prop: "bonus_type",
            render_simple: "name",
            width: "110",
          },
          { type: "text", label: "点数", prop: "points", width: "80" },
          {
            type: "text",
            label: "用户",
            prop: "user",
            render_simple: "name",
            width: "80",
          },
          {
            type: "text",
            label: "状态",
            prop: "status",
            render_simple: "name",
            width: "80",
          },
      ],
      tableData: [],
    }
  },
  methods: {
    show(type,id) {
      this.visible = true;
      this.getDetail(id)
    },
    getDetail (id) {
      const url = `${URL}/${id}`;
      const success = _=>{
        const data = _.bonus_report;
        this.tableData = data.detail;
        this.$nextTick(()=>{
          this.$tool.coverObj(this.form, data,);
          this.form.user = data.user.name ?data.user.name:data.user;
        })
      };
      this.$axiosGet({url, success});
    }    
  },
}
</script>
<style lang="scss" scoped>
</style>