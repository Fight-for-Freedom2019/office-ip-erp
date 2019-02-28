<template>
  <div class="main">
    <app-shrink :visible.sync="isPanelVisible" :modal="false" :title="title">
      <span slot="header" style="float: right;">
        <app-button-loading :func="submitForm" ref="loadingBtn" text="保存"></app-button-loading>
      </span>
      <el-form
          label-width="100px"
          :model="form"
          :rules="rules"
          ref="form"
          style="margin-top:10px;"
          v-loading="loading"
          element-loading-text="转案申请详情加载中">
        <el-form-item label="承办人" prop="user">
          <remote-select type="user" v-model="form.user" :pageType="mode"></remote-select>
        </el-form-item>
        <el-form-item label="附件" prop="attachments">
          <upload v-model="form.attachments" :file-list="attachments"></upload>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>

    </app-shrink>
  </div>
</template>

<script>
  export default {
    name: "TaskCommonTransferCase",
    data(){
      return {
        URL:"/process_assigns",
        isPanelVisible:false,
        loading:false,
        title:"转案申请",
        form:{
          attachments:[],
          remark:"",
          user:"",
        },
        rules:{},
        attachments:[],
        mode:"add",
        id:"",
      }
    },
    props:{
      row:{
        type:Object,
        default(){
          return {}
        },
      },
    },
    methods:{
      show(mode, id){
        this.mode = mode;
        this.isPanelVisible = true;
        this.clear();
        if (mode === "edit") {
          this.loading = true;
          this.title = "转案申请详情";
          const url = this.URL + "/" + id;
          const success = _ =>{
            this.coverObj(_.data);
            this.id = _.data.id;
            this.loading = false;
            this.attachments = _.data.attachments;
          }
          const complete = _ => {
            this.loading = false;
          };
          this.$axiosGet({ url, success, complete });
        }
      },
      submitForm(){
        this.$refs.form.validate((valid)=>{
          if(valid) {
            if (this.mode === "add") {
              let data = Object.assign({},{process_id:this.row.id},this.form);
              const success = _ => {
                this.$message({type:"success",message:"转案成功!"})
              }
              this.$axiosPost({url:"/process_assigns",data,success})
            }else {
              let data = Object.assign({},this.form);
              const success = _ => {
                this.$message({type:"success",message:"转案成功!"})
              }
              this.$axiosPut({url:`/process_assigns/${this.id}`,data,success})
            }
          }
        })
      },
      clear(){
        this.$refs.form?this.$refs.form.resetFields():"";
      },
      coverObj(val) {
        val ? this.$tool.coverObj(this.form, val, { obj: [] }) : "";
      },
    },
  }
</script>

<style scoped>

</style>