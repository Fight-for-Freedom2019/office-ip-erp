<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
    <el-form-item label="新承办人" prop="user">
      <remote-select type="user" v-model="form.user" pageType="add"></remote-select>
    </el-form-item>
    <el-form-item label="同时更新案件" prop="update_field">
      <static-select type="update_field" v-model="form.update_field" pageType="add"></static-select>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "BatchCaseOut",
    data(){
      return {
        form:{
          user:"",
          update_field:"",
        },
        rules:{
          user:[
            {required:true,message:"请选择新承办人"}
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
    methods:{
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
            this.$axiosPost({url:"/tasks/transfer",data:this.form,success});
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