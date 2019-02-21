<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right">
    <el-form-item label="新承办人" prop="user">
      <remote-select type="user" v-model="form.user" pageType="add"></remote-select>
    </el-form-item>
    <el-form-item label="同时更新案件" prop="update_field">
      <static-select type="update_field" v-model="form.update_field" pageType="add"></static-select>
    </el-form-item>
    <template v-if="form.update_field !== 'no'">
      <el-form-item :label="label" prop="placeholder">
        <remote-select type="user" v-model="form.placeholder" pageType="add" multiple></remote-select>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
  const updateOption = [
    ["no","不更新"],
    ["agent","代理人"],
    ["assigner","派案人"],
    ["final_reviewer","复核人"],
    ["first_reviewer","初审人"],
  ];
  export default {
    name: "BatchCaseOut",
    data(){
      return {
        form:{
          user:"",
          update_field:"no",
          placeholder:"",
        },
        label:"",
        updateMap:new Map(updateOption),
        rules:{
          user:[
            {required:true,message:"请选择新承办人"},
          ],
          placeholder:[
            {required:true,},
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
            let data = this.handleData();
            const success = _ =>{
              this.$message({type:"success",message:"操作成功!"});
              this.clear();
              this.$emit("hide");
              this.$emit("update");
            }
            this.$axiosPost({url:"/tasks/transfer",data,success});
          }else {
            this.$message({type:"warning",message:"请选择必选项!"})
          }
        })
      },
      handleData(){
        let data = Object.assign({},this.form);
        if(data.update_field !== "no") {
          data.update_field = {[data.update_field]:data.placeholder[0]}
        }else {
          data.update_field = {};
        }
        delete data.placeholder;
        return data;
      },
    },
    watch:{
      "form.update_field":function (val) {
        this.label = this.updateMap.get(val);
        this.rules.placeholder[0].message = `请选择新的${this.label}`;
      }
    }
  }
</script>

<style scoped>

</style>