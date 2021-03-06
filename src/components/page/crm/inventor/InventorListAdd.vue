<!-- 添加发明人表单 -->
<template>
  <div>
    <app-shrink :visible.sync="is_show" :title="title">
      <span slot="header" style="float: right;">
        <!--<el-button type="primary" @click="saveAdd" v-if="formType === 'add'" size="small">新建</el-button>-->
          <app-button-loading :func="save" param="add" v-if="type === 'add'" ref="loadingBtn"></app-button-loading>
        <el-button type="primary" @click="save('edit')" v-if="type === 'edit'" size="small">保存</el-button>
      </span>
      <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
          <el-form-item label="所属客户" prop="customer">
            <remote-select type="customer" :page-type="type" v-model="form.customer"></remote-select>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入发明人姓名（必填）"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="尊称" prop="title">
                <el-input v-model="form.title" placeholder="请输入发明人尊称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="国籍" prop="citizenship">
                <static-select type="area" v-model="form.citizenship" placeholder="请选择发明人国籍"></static-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮件地址" prop="email_address">
                <el-input v-model="form.email_address" placeholder="请输入邮件地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="英文名" prop="first_name">
                <el-input v-model="form.first_name" placeholder="请输入英文名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="英文姓" prop="last_name">
                <el-input v-model="form.last_name" placeholder="请输入英文姓"></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-form-item label="电话号码" prop="phone_number">
            <el-input v-model="form.phone_number" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="证件号码" prop="identity">
            <el-input v-model="form.identity" placeholder="请输入证件号码"></el-input>
          </el-form-item>

          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark" placeholder="请填写备注"></el-input>
          </el-form-item>
          <el-form-item label="是否公开姓名" prop="is_publish_name">
            <app-switch :type="switch_type" v-model="form.is_publish_name" @input="getIsPublishName"></app-switch>
          </el-form-item>

        </el-form>
      </div>
    </app-shrink>
  </div>

</template>

<script>
  import StaticSelect from "@/components/form/StaticSelect";
  import AppSwitch from "@/components/form/AppSwitch";
  import Config from "@/const/selectConfig";
  // import RemoteSelect from "@/components/form/RemoteSelect";
  import JumpSelect from "@/components/form/JumpSelect";
  import AppShrink from "@/components/common/AppShrink";
  import isRequest from "../mixins/is_request"
  import {mapGetters} from 'vuex'

  const URL = "/inventors";
  const map = new Map(Config);
  export default {
    name: "InventorListAdd",
    mixins:[isRequest(URL)],
    props: {
      inventors: {
        type: Object,
        default() {
          return {};
        }
      },
      title:{
        type:String,
        default(){
          return "新增"
        }
      },
      type: {
        type:String,
        default(){
          return "add"
        },
      }
    },
    data() {
      return {
        is_show:false,
        switch_type: "is_boolean",
        form: {
          customer: "",
          customer_id: "",
          title: "",
          name: "",
          type: "",
          email_address: "",
          phone_number: "",
          identity: "",
          first_name: "",
          last_name: "",
          citizenship: "",
          is_publish_name: true,
        },
        formType: "add",
        rules: {
          customer: {
            required: true,
            message: "请选择发明人所属客户",
            trigger: "change",
          },
          name: {
            required: true,
            message: "请填写联系人姓名",
            trigger: "change"
          },
          email_address: [
            {
              pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
              message: "邮件地址格式不正确",
              trigger: "blur"
            }
          ],
          citizenship: {
            required: true,
            message: "请选择国籍",
          },
          phone_number: {
            pattern: /^1[345678]\d{9}$/,
            message: "手机号码或者座机号码格式错误",
            trigger: "blur"
          }
        }
      };
    },
    computed: {
      ...mapGetters(['getCustomers']),
    },
    methods: {
      save(type) {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            const data = Object.assign({}, this.form);
            data.customer_id = data.customer;
            if (type === "add") {
              this.$axiosPost({
                url: URL,
                data,
                success: (d) => {
                  this.$message({type: "success", message: "添加成功"});
                  this.$emit("refresh");
                  this.$emit('onItemAdded', d.data);
                }
              });
            } else {
              // 由于后端返回的是联系人类型的字符串,修改时需要将其转换成Number类型，不然后端报错，新增时不需要修改
              map.get("contacts_type").options.forEach((_) => {
                _.name === data.type ? data.type = _.id : "";
              });
              let url = "/inventors/" + this.inventors.id;
              data.id = this.inventors.id;
              this.$axiosPut({
                url,
                data,
                success: () => {
                  this.$message({type: "success", message: "编辑成功"});
                  this.$emit("update");
                }
              });
            }
          } else {
            this.$message({type: 'warning', message: '请正确填写'});
          }
        })

      },
      getIsPublishName(val) {
        this.form.is_publish_name = val;
      },
      coverObj(val) {
        val ? this.$tool.coverObj(this.form, val) : "";
      },
    },
    watch: {
      inventors: function (val, oldVal) {
        this.$nextTick(()=>{
          !this.is_request?this.coverObj(val):"";
        })
      },
      is_show: {
        handler(v) {
          this.$nextTick(_ => {
            if(!v || this.type =='edit') return
            this.clear(); //填充前清空
            this.$nextTick(_ => {
              if(this.getCustomers!=undefined && this.getCustomers.length && !/crm/.test(this.path)) {
                const obj = {id: this.getCustomers[0].id, name: this.getCustomers[0].name}
                //  填充默认客户并且crm模块不用填充
                this.$set(this.form, 'customer', obj)
              }
            })
          })
        },
        immediate: true
      }
    },
    components: {
      StaticSelect,
      AppSwitch,
      // RemoteSelect,
      RemoteSelect: () => import('@/components/form/RemoteSelect'),
      JumpSelect,
      AppShrink
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>