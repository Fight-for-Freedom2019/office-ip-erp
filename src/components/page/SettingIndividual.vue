<template>
  <div id="main">
    <el-form
      v-loading="loading"
      element-loading-text="加载个人信息中..."
      :model="form"
      label-width="100px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机" prop="phone_number">
            <el-input v-model="form.phone_number" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱地址" prop="email_address">
            <el-input v-model="form.email_address" placeholder="请输入邮箱地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="邮箱密码" prop="email_password">
            <el-input type="password" v-model="form.email_password" placeholder="请输入邮箱密码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="POP服务器" prop="pop_server">
            <el-input v-model="form.pop_server" placeholder="请输入POP服务器地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="POP端口" prop="pop_port">
            <el-input v-model="form.pop_port" placeholder="请输入POP端口"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="SMTP服务器" prop="smtp_server">
            <el-input v-model="form.smtp_server" placeholder="请输入SMTP服务器地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="SMTP端口" prop="smtp_port">
            <el-input v-model="form.smtp_port" placeholder="请输入SMTP端口"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否使用SSL" prop="is_ssl">
            <!-- 	<el-checkbox label="连接使用SSL (若POP端口为110不需要勾选，若POP端口为995必须勾选)" v-model="form.is_ssl" :true-label="1" :false-label="0"></el-checkbox> -->
            <app-switch v-model="form.is_ssl" type="is"></app-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-form-item label="邮件通知" prop="message_subscribe">
				<el-checkbox label="是否订阅邮件通知" v-model="form.message_subscribe" :true-label="1" :false-label="0"></el-checkbox>
      </el-form-item>-->
      <el-form-item label="邮件签名" prop="signature">
        <!--<quill-editor
          v-model="form.signature"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        ></quill-editor>-->
        <tinymce-editor
          :api-key="api_key"
          v-model="form.signature"
          :init="editorInit"
          :height="600"
        ></tinymce-editor>
      </el-form-item>
      <el-form-item>
        <el-button @click="save" type="primary" :disabled="btn_disabled">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AppTag from "@/components/common/AppTag";
import RemoteSelect from "@/components/form/RemoteSelect";
import EditPassword from "@/components/form/EditPassword";
import AppSwitch from "@/components/form/AppSwitch";
import TinymceEditor from "@tinymce/tinymce-vue";
import Tinymce from "@/mixins/tinymce";
const URL = "/users";

export default {
  name: "settingIndividual",
  mixins: [Tinymce],
  data() {
    return {
      form: {
        name: "",
        phone_number: "",
        message_subscribe: 0,
        email_address: "",
        email_password: "",
        pop_server: "",
        pop_port: "",
        smtp_server: "",
        smtp_port: "",
        is_ssl: 0,
        signature: ""
      },
      editorOption: {},
      loading: true,
      btn_disabled: false
    };
  },
  computed: {
    id() {
      const user = this.$store.getters.getUser;
      if (user) return user.id;
    }
  },
  methods: {
    refreshForm() {
      if (this.id) {
        const url = `${URL}/${this.id}/config`;
        const success = _ => {
          for (let k in this.form) {
            const d = _.data[k];
            this.form[k] = d;
          }
          this.form.is_ssl = _.data["is_ssl"] ? 1 : 0;
        };
        const complete = _ => {
          window.setTimeout(_ => {
            this.loading = false;
          }, 300);
        };

        this.$axiosGet({ url, success, complete });
      }
    },
    onEditorBlur(editor) {},
    onEditorFocus(editor) {},
    onEditorReady(editor) {},
    async save() {
      // if(this.checkForm()) return;
      await this.checkFormFields();
      const url = `${URL}/${this.id}/config`;
      const success = _ => {
        this.$message({ message: "保存成功", type: "success" });
        this.$store.dispatch("refreshUser");
        // this.$refs.psd.clearEditPsd();
      };
      const data = this.form;
      const complete = _ => {
        this.btn_disabled = false;
      };

      this.btn_disabled = true;
      await this.$axiosPut({ url, data, success, complete });
    },
    checkForm() {
      return this.$refs.psd.check();
    },
    async checkFormFields() {
      return new Promise(reject => {
        let message = "";
        const mobile = this.form.phone_number;
        let mobileReg = /(^[0-9]{3,4}\-[0-9]{7,8})$|(^[0-9]{3,4}\-[0-9]{7,8})(-\d{1,6}?$)|^1[3|4|5|7|8|9][0-9]{9}$/;
        if (mobile !== "" && !mobileReg.test(mobile)) {
          message = "手机格式错误！";
        }
        if (message) {
          this.$message({ type: "warning", message });
        } else {
          reject();
        }
      });
    }
  },
  watch: {
    id() {
      this.refreshForm();
    }
  },
  mounted() {
    this.refreshForm();
  },
  components: {
    RemoteSelect,
    EditPassword,
    AppSwitch,
    TinymceEditor
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
