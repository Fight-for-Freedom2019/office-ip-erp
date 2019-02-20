<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :modal="false" class="dialog-small">
    <el-form label-width="100px" ref="form" :model="form" :rules="rules">


      <el-form-item label="委托书编号" prop="number">
        <el-input v-model="form.number" placeholder="请输入委托书编号"></el-input>
      </el-form-item>
      <el-form-item label="附件" prop="file">
        <upload v-model="form.file" :file-list="file" :limit="limit"></upload><!-- TODO 合同上传 -->
      </el-form-item>
      <el-form-item style="margin-bottom: 0;">
        <el-button type="primary" @click="add" v-if="popType === 'add'" :disabled="btn_disabled">添加</el-button>
        <el-button type="primary" @click="edit" v-if="popType === 'edit'" :disabled="btn_disabled">编辑
        </el-button>
        <el-button type="button" @click="cancel" :disabled="btn_disabled">取消</el-button>
      </el-form-item>

    </el-form>
  </el-dialog>
</template>

<script>
  import PopMixins from '@/mixins/pop-mixins'
  import StaticSelect from '@/components/form/StaticSelect'
  import AppSwitch from "@/components/form/AppSwitch";
  import Config from "@/const/selectConfig";
  import RemoteSelect from "@/components/form/RemoteSelect";
  import Upload from '@/components/form/Upload'

  const map = new Map(Config);

  const URL = '/customers'
  export default {
    name: 'PoasListPop',
    mixins: [PopMixins],
    props: {
      customer: Object,
      contracts: {
        type: Object,
        default() {
          return {};
        }
      },
      popType: {
        type: String,
        default() {
          return "add"
        }
      },
      contractsID:Number,
      URL:String,
    },
    computed:{
      title:function () {
        return this.popType === "add"?"新增":"修改"
      }
    },
    data() {
      return {
        id:"",
        limit:1,
        switch_type: {
          onColor: '#13ce66',
          offColor: '#ff4949',
          onText: '生效中',
          offText: '已失效',
          onValue: 1,
          offValue: 0,
        },
        form: {
          number: "",
          file:[],
        },
        file:[],
        'rules': {
          number:[
            {required:true,message:"请输入总委托书编号",target:"blur"}
          ],
          file:[
            {required:true,message:"请上传附件",target:"blur",type:"array"}
          ]
        }
      }
    },
    methods: {

      // submitForm () {
      // 	return Object.assign({}, this.form, {customer_id: this.customerId});
      // },
      refresh() {
        this.$emit('refresh');
      },
      update() {
        this.$emit('update');
      },
      add() {
        this.$refs.form.validate((valid)=>{
          if (valid) {
            const url = `/poas`;
            const data = Object.assign({}, this.form);
            data.file = this.form.file[0];
            data.customer = this.customer.id;
            const success = _ => {
              this.dialogVisible = false;
              this.refresh();
              this.$message({message: '添加成功！', type: 'success'})
            }
            this.$axiosPost({url, data, success});
          } else {
            this.$message({message: '请正确填写!', type: 'warning'})
          }
        })
      },
      getStatus(val) {
        this.form.status = val;
      },
      edit() {
        this.$refs.form.validate((valid)=>{
          if(valid) {
            const url = `/poas/${this.id}`;
            const data = Object.assign({}, this.form);
            data.file = this.form.file[0];
            data.customer = this.customer.id;
            const success = _ => {
              this.dialogVisible = false;
              this.update();
              this.$message({message: '编辑成功！', type: 'success'})
            }
            this.$axiosPut({url, data, success});
          }else {
            this.$message({message: '请正确填写!', type: 'warning'})
          }
        })
      },
      show ( type='add', data ) {
        this.file = [];
        this.dialogVisible = true;
        this.$refs.form?this.$refs.form.resetFields():"";
        if(data){
          this.file.push(data.file);
          data.file = [data.file.id];
          this.id = data.id
        }
        this.coverObj(data);

      },
      cancel() {
        this.dialogVisible = false;
      },
      coverObj(val){
        val?this.$tool.coverObj(this.form,val):""
        console.log(this.form);
      }
    },
    // created() {
    //     this.$tool.coverObj(this.form,this.contracts)
    // },
    watch: {
      contracts: function (val, oldVal) {
        this.coverObj(this.form,val);
        // console.log("form",this.form)
      },
    },
    components: {
      StaticSelect,
      AppSwitch,
      RemoteSelect,
      Upload
    },
    REMINDER_TEXT: '合同',
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
