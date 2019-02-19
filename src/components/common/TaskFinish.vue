<template>
  <div>
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">任务详情
          <el-button
            size="mini"
            type="text"
            style="margin-left: 10px;"
            v-if="ifMore"
            @click.stop="dropDetial"
          >更多...</el-button>
        </template>
        <el-form label-width="80px" label-position="left" class="form-information">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="节点名称" style="height:40px;">
                <span
                  class="form-item-text"
                  style="display:inline-block;max-width: 120px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;"
                  :title="actionName"
                >{{ actionName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="节点期限">
                <span
                  class="form-item-text"
                >{{ processData.task != undefined ? processData.task.deadline : '' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="管控期限">
                <span class="form-item-text">{{ row.internal_deadline }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="官方绝限">
                <span class="form-item-text">{{ row.legal_deadline }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="承办人" style="height:40px;">
                <span
                  class="form-item-text"
                  style="display:inline-block;max-width: 120px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;"
                  :title="userName"
                >{{ userName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="IPR">
                <span class="form-item-text">{{ iprName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="代理人" style="height:36px;">
                <span
                  class="form-item-text"
                  style="display:inline-block;max-width: 120px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;"
                  :title="agentName"
                >{{ agentName }}</span>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
            <el-form-item label="代理人助理" style="height:36px;"><span class="form-item-text" style="display:inline-block;max-width: 120px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" :title="assistantName">{{ assistantName }}</span></el-form-item>
            </el-col>-->
            <el-col :span="6">
              <el-form-item label="客户案号" style="height:36px;">
                <span
                  class="form-item-text"
                  style="display:inline-block;max-width: 120px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;"
                  :title="customerSerial"
                >{{ customerSerial }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="备注">
                <span class="form-item-text">{{ row.task.remark }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请日">
                <span class="form-item-text">{{ row.application_date }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请号">
                <span class="form-item-text">{{ row.application_number }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="附件">
            <app-table
              v-if="processData.task.attachments.length > 0"
              :columns="columns"
              border
              ref="table"
              max-height="222"
              :data="processData.task.attachments"
            ></app-table>
            <!-- <span v-if="processData.task.attachments.length == 0">无附件</span> -->
            <upload
              :value="supplement"
              @input="handleUpload"
              :show-file-list="false"
              style="height: 40px;"
            ></upload>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="任务处理" name="2">
        <app-form
          :source="sourceForm"
          :map="detailMap"
          :rules="appFormRules"
          :labelWidth="`100px`"
          @formData="handleForm"
          :opinion="review_opinion"
          :process="row"
          :row="row"
          :data="data"
          ref="appForm"
        >
          <el-form-item label="审核意见" v-if="is_review">
            <app-radio
              v-model="review_opinion"
              v-for="item in checkArr"
              :value="item.value"
              :key="item.value"
              :label="item.label"
              @change="checkRadio"
            >{{ item.label }}</app-radio>
          </el-form-item>
          <el-form-item label="节点描述" v-if="tips">
            <span style="display:inline-block;line-height:40px;">{{ tips }}</span>
            <span style="display:inline-block;line-height:40px;font-weight: bold;">{{ userTips }}</span>
          </el-form-item>
          <el-form-item label="承办人" v-if="next.length != 0">
            <remote-select type="user" v-model="user_id"></remote-select>
          </el-form-item>
          <template slot="app-button">
            <el-form-item style="margin-bottom: 0px;" v-if="isShowSubmitBtn">
              <el-button
                type="primary"
                @click="submitFunc"
                :disabled="btn_disabled"
                :loading="btn_disabled"
              >{{ btn_disabled ? '提交中...' : '提交' }}</el-button>
            </el-form-item>
          </template>
        </app-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import axiosMixins from "@/mixins/axios-mixins";
import Upload from "@/components/form/Upload";
import RemoteSelect from "@/components/form/RemoteSelect";
import StaticSelect from "@/components/form/StaticSelect";
import AppSwitch from "@/components/form/AppSwitch";
import AppTable from "@/components/common/AppTable";
import AppRadio from "@/components/form/AppRadio";
import AppForm from "@/components/form/AppForm";
import { map as formMap } from "@/const/formConfig";

import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

const URL = `/tasks`;
const pointMap = new Map([
  ["pass", { value: "pass", label: "通过" }],
  ["amend", { value: "amend", label: "退回修改" }],
  ["reject", { value: "reject", label: "拒绝" }]
]);
export default {
  name: "taskFinish",
  props: {
    id: {
      type: Number
    },
    row: {
      type: Object,
      default() {
        return {};
      }
    },
    process: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      sourceForm: [],
      detailMap: {},
      task_id: "",
      supplement: [],
      next: [],
      opinion_type: "pass",
      isShowPatentMailBtn: false,
      tips: "",
      activeName: ["1", "2"],
      data: {},
      review_opinion: "pass",
      appFormRules: {},
      description: "",
      tasksData: "",
      user_id: '',
      form: {},
      columns: [
        { type: "text", label: "附件名称", prop: "name", overflow: false },
        { type: "text", label: "附件格式", prop: "ext", width: "80" },
        { type: "text", label: "附件大小 ", prop: "size", width: "80" },
        {
          type: "action",
          label: "详情",
          fixed: false,
          width: "175",
          btns: [
            {
              type: "view",
              click: ({ viewUrl }) => {
                window.open(viewUrl);
              }
            },
            {
              type: "download",
              click: ({ downloadUrl }) => {
                window.open(downloadUrl);
              }
            }
          ]
        }
      ],
      loading: false,
      btn_disabled: false,
      attachments: [],
      confirmValidator: {
        required: true,
        validator: (a, b, c) => {
          if (b) {
            c();
          } else {
            c("必需确认送件信息完整");
          }
        }
      }
    };
  },
  created() {
    this.refreshData();
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(["refreshUser", "refreshProcessDetail", "offShrinkLoading"]),
    show() {
      console.log("finish panel shown " + this.row.id);
      // this.refreshData();
    },
    handleUpload(val) {
      this.supplement = val;
      const url = `/tasks/${this.taskId}/files`;
      let list_attachments = [];
      if (this.processData.task.attachments) {
        list_attachments = this.$tool.splitObj(
          this.processData.task.attachments,
          "id"
        );
      }
      const attachments = [...this.supplement, ...list_attachments];
      const data = { attachments };
      const success = _ => {
        this.$message({ type: "success", message: "上传附件成功" });
        this.refreshProcessDetail({ id: this.id });
      };
      this.$axiosPut({ url, data, success });
    },

    refreshData() {
      const list = [
        "cpc_editor",
        "order_detail",
        "payment_request_detail",
        "outgo_payment_detail",
        "voucher_detail",
        "contract_detail",
        "patent_add",
        "patent",
        "postpone",
        "bonus_report"
      ];
      const arr = [];
      const map = {};
      const url = `${URL}/${this.taskId}/form`;
      // this.$refs.appForm.$refs.form.clearValidate();
      const success = d => {
        const response = d.data;
        this.data = response;
        if (response.review_opinion && response.review_opinion.length != 0) {
          this.review_opinion = response.review_opinion[0];
        }
        //提示信息
        this.next = response.next;
        this.tips = response.remark;
        this.appFormRules = {};
        if (response.forms && response.forms.length != 0) {
          let mailscene = "";
          response.forms.forEach(_ => {
            let staticConfig = formMap.get(_.field_type.id);
            if (_.is_required) {
              this.$set(this.appFormRules, _.key, staticConfig.rules);
            }
            const obj = Object.assign({}, staticConfig, _);
            //发送邮件
            if (_.key == "patent_mail") {
              mailscene = "patent";
            }
            arr.push(obj);
            if (list.indexOf(_.field_type.id) != -1) {
              map[_.field_type.id] = true;
            }
            this.detailMap = map;
          });
          this.$emit("showmailbtn", mailscene);
          this.sourceForm = arr;
        }
        this.$refs.appForm.initializeForm();
      };
      const complete = _ => {
        // this.loading = false;
        this.offShrinkLoading();
      };
      this.$axiosGet({ url, success, complete });
    },
    submitFunc() {
      this.$refs.appForm.$refs.form.validate(_ => {
        if (_) {
          this.btn_disabled = true;
          const url = `${URL}/${this.taskId}/nexttask`;
          const reviewObj = this.is_review
            ? { review_opinion: this.review_opinion,}
            : {};
          const user_id = this.next && this.next.length != 0 ? { user_id : this.user_id } : {};
          const data = Object.assign({}, reviewObj, this.form, user_id);
          const success = () => {
            // this.$message({ type: "success", message: "完成任务成功" });
            this.$alert("完成任务成功", {
              showConfirmButton: false,
              showClose: false,
              type: "success"
            });
            setTimeout(() => {
              //3s后调用messageBox实例的方法自动关闭
              this.$msgbox.close();
            }, 3000);
            this.refreshUser();
            this.$emit("submitSuccess", data);
          };

          const complete = _ => {
            this.btn_disabled = false;
          };
          this.$axiosPost({ url, data, success, complete });
        } else {
          this.$message({ message: "请正确填写任务完成字段", type: "warning" });
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    handleMore(type) {
      this.$emit("more", type);
    },
    clear() {
      this.$refs.form.resetFields();
    },
    proposalFinish({ remark, attachments }) {
      this.form.remark = remark;
      this.form.attachments = attachments.map(_ => _.id);
      this.hide_r_a = true;
    },
    dropDetial() {
      if (this.row.category == 1) {
        this.$emit("more", "patent");
      }
      if (this.row.category == 3) {
        this.$emit("more", "copyright");
      }
    },
    handleForm(val) {
      this.form = val;
    },
    checkRadio(val) {
      this.opinion_type = val;
    },
    refreshDetail() {
      // this.loading = true;
    }
  },
  watch: {
    // id: {
    //   handler (val) {
    //     this.refreshProcessDetail({id: val})
    //   },
    //   immediate: true,
    // },
    review_opinion (val) {
      this.opinion_type = val;
    },
    userId (val) {
      this.user_id = val;
    },
    taskId: {
      handler(val) {
        // this.loading = true;
        if (val) {
          this.refreshData();
        }
      }
      // immediate: true,
    }
  },
  computed: {
    ...mapGetters(["menusMap"]),
    taskId() {
      return this.process.task.id;
    },
    processData() {
      return this.process;
    },
    userId: {
      get () {
        const nl = this.$tool.getObjLength(this.next);
        if(this.next && this.next.length != 0 && nl > 0) {
          const o = this.is_review ? this.next[this.opinion_type] : this.next['pass'];
          return this.user_id = o.user;
        }
      },
      set(v) {
        return this.user_id = v;
      }
    },
    userTips() {
      if (this.next.length == 0) {
        return "";
      }
      const o = this.next[this.opinion_type];
      if (o == undefined) {
        return "";
      }
      return "下一节点：" + o.action.name;
    },
    isShowSubmitBtn() {
      if (
        this.userid &&
        this.row.task &&
        this.userid != this.row.task.user.id &&
        this.menusMap &&
        !this.menusMap.get("/task/btn/save")
      ) {
        return false;
      } else {
        return true;
      }
    },
    actionName() {
      return this.processData.task &&
        this.processData.task.process_action != null
        ? this.processData.task.process_action.name
        : "";
    },
    assistantName() {
      return this.processData.assistant != null
        ? this.processData.assistant.name
        : "";
    },
    userName() {
      return this.processData.task.user != null
        ? this.processData.task.user.name
        : "";
    },
    agentName() {
      return this.processData.agent != null ? this.processData.user.name : "";
    },
    customerSerial() {
      return this.processData.project != null
        ? this.processData.project.customer_serial
        : "";
    },
    iprName() {
      return this.processData.ipr != null ? this.processData.ipr.name : "";
    },
    ifMore() {
      if (this.row && this.row.category == 1) {
        return this.menusMap && this.menusMap.get("/patent/read");
      } else if (this.row && this.row.category == 3) {
        return this.menusMap && this.menusMap.get("/copyright/read");
      } else {
        return false;
      }
    },
    is_review() {
      const ol = this.$tool.getObjLength(this.data);
      const nl = this.$tool.getObjLength(this.data.next);
      return ol && nl > 1 ? true : false;
    },
    pointData() {
      const ol = this.$tool.getObjLength(this.data);
      return ol && this.data.review_opinion ? this.data.review_opinion : [];
    },
    checkArr() {
      let arr = [];
      this.pointData.filter(v => {
        const d = pointMap.get(v);
        arr.push(d);
      });
      return arr;
    }
  },
  components: {
    Upload,
    RemoteSelect,
    StaticSelect,
    AppSwitch,
    AppTable,
    AppRadio,
    AppForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
