<!-- 批量派案 -->
<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
    <el-form-item label="代理人" prop="agent">
      <remote-select type="agent" v-model="form.agent" pageType="add"></remote-select>
    </el-form-item>
    <el-form-item label="初核人" prop="first_reviewer">
      <remote-select type="user" v-model="form.first_reviewer" pageType="add"></remote-select>
    </el-form-item>
    <el-form-item label="复核人" prop="final_reviewer">
      <remote-select type="user" v-model="form.final_reviewer" pageType="add" add-type="user"></remote-select>
    </el-form-item>
    <el-form-item label="对外代理人" prop="representative">
      <remote-select type="user" v-model="form.representative" pageType="add" add-type="user"></remote-select>
    </el-form-item>
    <el-form-item label="点数" prop="points">
      <el-input type="text" placeholder="请输入点数" v-model.number="form.points"></el-input>
      <span>注意此点数是原始点数，实际点数需要计算成熟度</span>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input type="text" placeholder="请输入备注" v-model="form.remark"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>

  export default {
    name: "BatchSendCase",
    data() {
      return {
        form: {
          agent: "",
          first_reviewer: "",
          final_reviewer: "",
          representative: "",
          points: "",
          remark: "",
        },
        rules: {
          agent: [
            {required: true,message:"请选择代理人"}
          ],
        },
      }
    },
    props: {
      ids: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      clear(){
        this.$refs.form.resetFields();
      },
      save(){
        this.$refs.form.validate((valid)=>{
          if(valid){
            this.form.ids = this.ids;
            const success = _ =>{
              this.$message({type:"success",message:"操作成功!"});
              this.clear();
              this.$emit("hide");
              this.$emit("update");
            }
            this.$axiosPost({url:"/tasks/assign",data:this.form,success});
          }else {
            this.$message({type:"warning",message:"请选择必选项!"})
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>