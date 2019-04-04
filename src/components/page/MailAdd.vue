<template>
  <div class="main">
    <app-shrink :visible.sync="dialogVisible" :modal="false" :title="title">
      <el-form
        :model="form"
        ref="form"
        label-width="80px"
        v-loading="loadingVisible"
        :element-loading-text="loadingText"
        style="margin-top:10px;"
        :rules="rules"
      >
        <el-form-item label="标题" prop="subject">
          <el-input v-model="form.subject" placeholder="请输入邮件标题"></el-input>
        </el-form-item>
        <el-form-item label="收件人" prop="recipient">
          <jump-select type="email" v-model="form.recipient" ref="recipient" multiple></jump-select>
        </el-form-item>
        <el-form-item label="抄送" prop="cc">
          <jump-select type="email" v-model="form.cc" ref="cc" multiple></jump-select>
        </el-form-item>
        <el-form-item label="密送" prop="bcc">
          <jump-select type="email" v-model="form.bcc" ref="bcc" multiple></jump-select>
        </el-form-item>
        <el-form-item label="附件" prop="attachments">
          <upload v-model="form.attachments" :file-list="attachments" @uploadBefore="uploadBefore" @uploadSuccess="uploadSuccess"></upload>
        </el-form-item>
        <el-form-item label="正文" prop="body">
          <tinymce-editor :api-key="api_key" v-model="form.body" :init="editorInit"></tinymce-editor>
          <!--<quill-editor
						v-html="form.body"
			ref="myQuillEditor"
			:options="editorOption"
			@blur="onEditorBlur($event)"
			@focus="onEditorFocus($event)"
			@ready="onEditorReady($event)"	
			>
          </quill-editor>-->
        </el-form-item>
      </el-form>
      <span slot="header" style="float: right;">
        <el-button
          type="primary"
          icon="message"
          size="small"
          @click="send"
          :disabled="btn_disabled"
        >发送</el-button>
      </span>
    </app-shrink>
  </div>
</template>

<script>
import AxiosMixins from "@/mixins/axios-mixins";
import Upload from "@/components/form/Upload";
import RemoteSelect from "@/components/form/RemoteSelect";
import JumpSelect from "@/components/form/JumpSelect";
import AppShrink from "@/components/common/AppShrink";
import TinymceEditor from "@tinymce/tinymce-vue";
import Tinymce from "@/mixins/tinymce";
const URL = "/mails";
const sceneMap = new Map([
  ["立案通知", 1],
  ["传客户看稿确认", 2],
  ["IPR审核", 3],
  ["递交文件", 4],
  ["官文", 5],
  ["纸本文件", 6],
  ["报表", 7],
  ["年费通知", 8],
  ["账单", 9],
  ["商务/合同", 10],
  ["其它", 11],
  ["发明人补充材料", 12],
  ["检索报告", 13],
  ["普通官文", 19],
  ["审查意见通知书", 14],
  ["复审", 15],
  ["办理登记", 16],
  ["权利要求确认", 22],
  ["复审评估", 23],
  ["委外处理", 25],
]);
export default {
  name: "mailAdd",
  props: ["data"],
  mixins: [AxiosMixins, Tinymce],
  data() {
    return {
      form: {
        subject: "",
        recipient: [],
        cc: [],
        bcc: [],
        body: "",
        attachments: []
      },
      attachments: [],
      editorOption: {
        modules: {
          //  toolbar: [
          //   	[{ 'header': [] }],
          //    [{ 'size': [] }],
          //    ['bold', 'italic'],
          //    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          //    ['image']
          //  ],
          // history: {
          //   delay: 1000,
          //   maxStack: 50,
          //   userOnly: false
          // },
          // imageImport: true,
          // imageResize: {
          //   displaySize: true
          // }
        }
      },
      btn_disabled: false,
      dialogVisible: false,
      loadingVisible: false,
      process_id:null,
      mail_scene: null,
      loadingText: "邮件内容加载中",
      title: "发送邮件",
      id: 0,
      mail_type: 0,
      rules: {
        subject: [
          { required: true, message: "请输入邮件标题", trigger: "blur" }
        ],
        recipient: [{  required: true, trigger: "change", message: '请选择收件人或输入邮箱地址', type: 'array'  },
          { pattern: /^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6}\,))*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/, message: '请输入正确的邮箱地址' }
        ]
      }
    };
  },
  methods: {
    uploadSuccess(){
      this.btn_disabled = false;
    },
    uploadBefore(){
      this.btn_disabled = true;
    },
    setForm({ id }) {
      const url = `${URL}/${id}`;
      const success = _ => {
        const mail = _.mail;
        this.$tool.coverObj(this.form, mail, {
          obj: ["cc", "bcc", "recipient", "attachments"]
        });
        this.attachments = _.attachments ? _.attachments : [];
      };
      this.$axiosGet({ url, success });
    },
    formCheck() {
      return new Promise(resolve => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    },
    async send() {
      const flag = await this.formCheck();
      if (flag) {
        const url = URL;

        const data = Object.assign({}, this.form, this.getMailForm());
        data.model_id = this.id;
        data.mail_scene = this.mail_scene;
        this.process_id?data.process_id = this.process_id:"";
        const success = _ => {
          this.$message({ message: "发送成功", type: "success" });
          this.$emit("refresh");
          this.dialogVisible = false;
        };
        const complete = _ => {
          this.btn_disabled = false;
        };
        this.btn_disabled = true;
        this.$axiosPost({ url, data, success, complete });
      }
    },
    async save() {
      const flag = await this.formCheck();
      if (flag) {
        const data = Object.assign({}, this.form, this.getMailForm());

        const success = _ => {
          this.$message({ message: "保存成功", type: "success" });
          this.$emit("refresh");
          this.$router.push("/news/mailList");
        };
        const complete = _ => {
          this.btn_disabled = false;
        };

        this.btn_disabled = true;
        if (this.type == "add") {
          const url = URL;
          this.axiosPost({ url, data, success, complete });
        } else {
          const url = `${URL}/ ${this.id}`;
          this.$axiosPut({ url, data, success, complete });
        }
      }
    },
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorReady() {},
    loadTemplateMail({scene, id, arg = [],url = '/messagetemplates/scenemail'}) {
      this.title = "发送" + scene + "邮件";
      const mail_scene = sceneMap.get(scene);
      this.mail_scene = mail_scene;
      console.log(this.mail_scene);
      const data = { id, mail_scene };
      arg.length !== 0?Object.assign(data,...arg):"";
      // const url = `/messagetemplates/scenemail`;
      const success = _ => {
        const mail = _.data;
        this.$tool.coverObj(this.form, mail, { obj: ["attachments"] });
        this.form.subject = mail.subject;
        this.attachments = _.data.attachments ? _.data.attachments : [];
        this.loadingVisible = false;
      };
      this.$axiosGet({ url, data, success });
    },

    loadMail(id) {
      this.title = "邮件详情";
      const url = `/mails/` + id;
      const success = _ => {
        const mail = _.mail;
        this.mail_scene = mail.mail_scene;
        this.attachments = mail.attachments ? mail.attachments : [];
        this.$tool.coverObj(this.form, mail, { obj: ["attachments"] });
        this.loadingVisible = false;
      };
      this.$axiosGet({ url, success });
    },
    showCommon(scene,id,field,value){
      this.loadingVisible = true;
      this.id = id;
      this.dialogVisible = true;
      this.loadTemplateMail({scene,id,arg:[{[field]:value}]})
    },
    showByProcess(scene, id, process_id, type){
      this.loadingVisible = true;
      this.id = id;
      this.dialogVisible = true;
      this.process_id = process_id;
      this.loadTemplateMail({scene,id,arg:[{process_id:process_id}, {type}]})
    },
    showBatch(scene, id, url){
      this.loadingVisible = true;
      this.id = id;
      this.dialogVisible = true;
      this.loadTemplateMail({scene, id, url});
    },
    show(scene, id) {
      this.id = id;
      this.dialogVisible = true;
      if (scene == "add") {
        this.$refs['form'].resetFields();
        return;
      }
      this.loadingVisible = true;
      if (scene === "view") {
        this.loadMail(id);
      } else {
        this.loadTemplateMail({scene, id});
      }
    },
    getMailForm() {
      const mail_arr = ["recipient", "cc", "bcc"];
      const mail_form = {};

      mail_arr.forEach(_ => {
        let selected = this.$refs[_].getSelected();
        selected = selected.map(d=>{
        	if( !d['value'] ) {
        		return {id: d['id'], name: d['name']};
        	}else {
        		return d;
        	}
        })

        mail_form[_] = selected;
      });

      return mail_form;
    }
  },
  computed: {
    type() {
      return this.$route.meta.type;
    },
    from() {
      const email = this.$store.getters.getUser.email;

      return { from: { label: email, value: email } };
    }
  },
  watch: {
    data(v) {
      this.$tool.coverObj(this.form, v, {
        obj: ["cc", "recipient", "bcc", "attachments"]
      });
      this.attachments = v.attachments ? v.attachments : [];
    },
  },
  components: {
    Upload,
    RemoteSelect,
    AppShrink,
    TinymceEditor,
    JumpSelect
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>