<!-- TaskCommon中所有批量操作 -->
<template>
  <div>
    <template v-if="operationType === 'sendCase'|| 'caseOut'">
      <app-shrink :visible.sync="visible" :title="title">
      <span slot="header" style="float: right;">
        <app-button-loading :func="save" ref="loadingBtn" text="保存"></app-button-loading>
      </span>
        <template v-if="operationType === 'sendCase'">
          <batch-send-case ref="sendCase" :ids="ids" @hide="hide" @update="update"></batch-send-case>
        </template>
        <template v-if="operationType === 'caseOut'">
          <batch-case-out ref="caseOut" :ids="ids" @hide="hide" @update="update"></batch-case-out>
        </template>
      </app-shrink>
    </template>
    <template v-if="operationType === 'notice'">
      <mail-add ref="mailAdd"></mail-add>
    </template>
    <template v-if="operationType === 'fulfilTask'|| 'remind'">
      <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="80px">
          <el-form-item prop="remark" label="备注">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveRemark">保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>
  </div>
</template>

<script>
  import BatchSendCase from "@/components/page_extension/BatchSendCase";
  import BatchCaseOut from "@/components/page_extension/BatchCaseOut";
  import MailAdd from "@/components/page/MailAdd";

  const constType = [
    ["sendCase", "批量派案"],
    ["caseOut", "转出"],
    ["notice", "立案通知"],
    ["fulfilTask", "完成任务"],
    ["remind", "限期提醒"],
  ];
  export default {
    name: "BatchTaskCommon",
    data() {
      return {
        visible: false,
        constTypeMap: new Map(constType),
        dialogFormVisible:false,
        form:{
          remark:""
        },
        rules:{
          /*remark:[
            {required:true,message:"请填写备注"}
          ]*/
        },
      }
    },
    props: {
      ids: {
        type: Array,
        default() {
          return []
        },
      },
      operationType: {
        type: String,
        default() {
          return ""
        },
      },
    },
    computed: {
      title: function () {
        return this.constTypeMap.get(this.operationType);
      },
      url:function () {
        if(this.operationType === "fulfilTask") {
          return "/tasks/close"
        }else if(this.operationType === "remind") {
          return "/tasks/remind"
        }
      }
    },
    methods: {
      show() {
        if(this.operationType === "notice") {
          this.visible = false;
          const id = this.ids.join(",");
          this.$refs.mailAdd.showBatch("立案通知",id,"/mail/tasks");
        }else if(this.operationType === "fulfilTask" || this.operationType === "remind"){
          this.dialogFormVisible = true;
          this.visible = false;
        }else {
          this.visible = true;
          this.$refs[this.operationType]?this.$refs[this.operationType].clear():"";
        }
      },
      hide() {
        this.visible = false;
      },
      update() {
        this.$emit("update");
      },
      save() {
        this.$refs[this.operationType].save();
      },
      clear(){
        this.$refs.form.resetFields();
      },
      saveRemark(){
        this.$refs.form.validate((valid)=>{
          if(valid){
            this.form.ids = this.ids;
            const success = _ =>{
              this.$message({type:"success",message:"操作成功!"});
              this.clear();
              this.cancel();
              this.$emit("update");
              this.dialogFormVisible = false;
            }
            this.$axiosPost({url:this.url,data:this.form,success});
          }
        })
      },
      cancel(){
        this.dialogFormVisible = false;
        this.clear();
      },
    },
    components: {
      BatchCaseOut,
      BatchSendCase,
      MailAdd
    }
  }
</script>

<style scoped>

</style>