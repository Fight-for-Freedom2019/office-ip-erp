<!-- 添加合两只 -->
<template>
  <div>
    <app-shrink :visible.sync="is_show" :modal="false" :title="title">
        <span slot="header" style="float: right;">
            <!--<el-button type="primary" @click="save" size="small">{{type==='add'?'新建':'保存'}}</el-button>-->
            <app-button-loading :func="save" v-if="type === 'add'" ref="loadingBtn"></app-button-loading>
            <el-button type="primary" size="small" v-if="type !== 'add'" @click="save">保存</el-button>

        </span>
      <div class="main" style="margin-top:10px;" v-loading="loadingVisible" :element-loading-text="loadingText">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
          <el-form-item label="所属客户" prop="customer">
            <remote-select type="customer" :pageType="type" v-model="form.customer"></remote-select>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入联系人姓名（必填）"></el-input>
          </el-form-item>
          <el-form-item label="尊称" prop="title">
            <el-input v-model="form.title" placeholder="请输入联系人尊称"></el-input>
          </el-form-item>

          <el-form-item label="类型" prop="contact_type">
            <static-select type="contacts_type" v-model="form.contact_type"></static-select>
          </el-form-item>

          <el-form-item label="邮件地址 " prop="email_address">
            <el-input v-model="form.email_address" placeholder="请输入邮件地址"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone_number">
            <el-input v-model="form.phone_number" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
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
  import RemoteSelect from "@/components/form/RemoteSelect";
  import AppShrink from '@/components/common/AppShrink'
  import isRequest from "../mixins/is_request"
  import {mapGetters} from 'vuex'

  const URL = "/contacts";
  const map = new Map(Config);
  export default {
    name: "ContactsListAdd",
    mixins:[isRequest(URL)],
    props: {
      contacts: {
        type: Object,
        default() {
          return {};
        }
      },
      title:{
        type:String,
        default(){
          return "新增"
        },
      },
      type: {
        type:String,
        default(){
          return "add"
        },
      }
    },
    computed: {
      ...mapGetters(['getCustomers']),
    },    
    data() {
      return {
        switch_type: "is",
        form: {
          customer_id: "",
          customer: "",
          name: "",
          title: "",
          contact_type: "",
          email_address: "",
          phone_number: "",
          address: "",
          remark: "",
        },
        rules: {
          customer: {
            required: true,
            message: "请选择联系人所属客户",
            trigger: "change",
          },
          name: {
            required: true,
            message: "请填写联系人姓名",
            trigger: "blur"
          },
          email_address: [
            {
              pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
              message: "邮件地址格式不正确",
              trigger: "blur"
            }
          ],
          phone_number: {
            pattern: /^1[345678]\d{9}$/,
            message: "手机号码或者座机号码格式错误",
            trigger: "blur"
          },
          contact_type: [
            {
              required: true, message: "请选择联系人", trigger: "blur"
            }
          ],
        },
        loadingVisible: false,
        loadingText: '联系人数据加载中',
      };
    },
    methods: {
      save() {
        const data = this.form;
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.type === "add") {
              this.$axiosPost({
                url: URL,
                data,
                success: (d) => {
                  this.hide();
                  this.$message({type: "success", message: "添加成功"});
                  this.$emit("refresh");
                  this.$emit('onItemAdded', d.data);
                }
              });
            } else {
              // 由于后端返回的是联系人类型的字符串,修改时需要将其转换成Number类型，不然后端报错，新增时不需要修改
              map.get("contacts_type").options.forEach((_) => {
                if (_.name === data.contact_type) {
                  data.contact_type = _.id;
                }
              });
              let url = "/contacts/" + this.contacts.id;
              data.id = this.contacts.id;
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
            this.$message({type: 'warning', message: '请正确填写！'});
          }
        })

      },
      getIsPublishName(val) {
        this.form.is_publish_name = val;
      },
      coverObj(val) {
        if (val) {
          this.$tool.coverObj(this.form, val);
        }
      },
    },
    watch: {
      contacts: function (val, oldVal) {
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
      AppShrink,
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>