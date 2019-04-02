<template>
  <div class="main" style="margin-top:10px;">
    <template v-if="popType == 'add'">
      <app-shrink :visible.sync="isCustomerAddPanelVisible" :modal="true" :title="title">
        <span slot="header" style="float: right;">
          <!--<el-button type="primary" @click="add" size="small" ref="btn">新建</el-button>-->
          <app-button-loading :func="add" ref="loadingBtn"></app-button-loading>
        </span>
        <el-form
          label-width="120px"
          ref="form"
          :model="form"
          :rules="rules"
          style="margin-top:10px;"
        >
          <el-form-item :label="label" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="客户代码" prop="code">
                                        <el-input v-model="form.code" ></el-input>
          </el-form-item>-->
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email_address">
                <el-input v-model="form.email_address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话" prop="phone_number">
                <el-input v-model="form.phone_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属销售" prop="sales">
                <jump-select type="user" v-model="form.sales"></jump-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属顾问" prop="consultant">
                <jump-select type="user" v-model="form.consultant"></jump-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="地区">
                <provincial-linkage :value="cityInfo" class="select-city" @input="chooseAddress"></provincial-linkage>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址" prop="address">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="客户代码" prop="abbr">
            <el-input v-model="form.abbr"></el-input>
          </el-form-item>
          <el-form-item label="案件人员授权" prop="users">
            <remote-select type="user" v-model="form.users" multiple></remote-select>
          </el-form-item>
          <el-form-item label="默认联系人" prop="contact">
            <remote-select
              :pageType="popType"
              v-if="popType ==='edit'"
              type="contacts"
              v-model="form.contact"
            ></remote-select>
            <div v-else>
              <el-tag closable v-if="contact" @close="handleClose()">{{contact?contact.name:""}}</el-tag>
              <el-button type="text" @click="createDefaultContact">添加</el-button>
            </div>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="监控年费" prop="is_annual_fee">
                <app-switch type="is" v-model="form.is_annual_fee"></app-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收取年费服务费" prop="is_annual_service_fee">
                <app-switch type="is" v-model="form.is_annual_service_fee" multiple></app-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </app-shrink>
    </template>
    <template v-else>
      <div style="margin-top:10px;">
        <el-form label-width="120px" ref="form" :model="form" :rules="rules">
          <el-form-item :label="label" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="客户代码" prop="code">
                                        <el-input v-model="form.code" ></el-input>
          </el-form-item>-->
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email_address">
                <el-input v-model="form.email_address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话" prop="phone_number">
                <el-input v-model="form.phone_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属销售" prop="sales">
                <jump-select type="user" v-model="form.sales"></jump-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属顾问" prop="consultant">
                <jump-select type="user" v-model="form.consultant"></jump-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="地区">
                <provincial-linkage :value="cityInfo" class="select-city" @input="chooseAddress"></provincial-linkage>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址" prop="address">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="客户代码" prop="abbr">
            <el-input v-model="form.abbr"></el-input>
          </el-form-item>
          <el-form-item label="案件人员授权" prop="users">
            <remote-select type="user" v-model="form.users" multiple></remote-select>
          </el-form-item>
          <el-form-item label="默认联系人" prop="contact">
            <remote-select
              :pageType="popType"
              v-if="popType ==='edit'"
              type="contacts"
              v-model="form.contact"
            ></remote-select>
            <div v-else>
              <el-tag closable v-if="contact" @close="handleClose()">{{contact?contact.name:""}}</el-tag>
              <el-button type="text" @click="createDefaultContact">添加</el-button>
            </div>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="监控年费" prop="is_annual_fee">
                <app-switch type="is" v-model="form.is_annual_fee"></app-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年费服务费" prop="is_annual_service_fee">
                <app-switch type="is" v-model="form.is_annual_service_fee" multiple></app-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import PopMixins from "@/mixins/pop-mixins";
import StaticSelect from "@/components/form/StaticSelect";
import JumpSelect from "@/components/form/JumpSelect";
// import RemoteSelect from "@/components/form/RemoteSelect";
import ProvincialLinkage from "@/components/form/City";
import LinkmanPop from "@/components/form/LinkmanPop";
// import AppShrink from "@/components/common/AppShrink";
import isRequest from "../page/crm/mixins/is_request";
import AppSwitch from "@/components/form/AppSwitch";

export default {
  name: "CustomerListAdd",
  mixins: [PopMixins, isRequest("/customers")],
  props: {
    customer: {
      type: Object,
      default() {
        return {};
      }
    },
    row: {
      type: Object,
      default() {
        return {};
      }
    },
    popType: {
      type: String,
      default() {
        return "add";
      }
    },
    URL: {
      type: String,
      default() {
        return "/customers";
      }
    },
    is_suppliers: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      cityInfo: [],
      isCustomerAddPanelVisible: false,
      form: {
        name: "",
        email_address: "",
        phone_number: "",
        address: "",
        province_code: "",
        city_code: "",
        consultant: "",
        sales: "",
        contact: null,
        abbr: "",
        users: [],
        is_annual_fee: 1,
        is_annual_service_fee: 1
      },
      contact: null, // 新增的默认联系人数据
      rules: {
        name: [
          { required: true, message: "客户名称不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "长度不超过50个字符", trigger: "blur" }
        ],
        type: {
          required: true,
          message: "申请人类型不能为空",
          trigger: "change"
        },
        identity: [
          { required: true, message: "证件号码不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "长度不超过50个字符", trigger: "blur" }
        ],
        postcode: [
          { required: true, message: "邮编不能为空", trigger: "blur" },
          {
            pattern: /^[\d]{4}|[\d]{6}]+$/,
            message: "邮编为4-6位数字",
            trigger: "blur"
          }
        ],
        email_address: [
          {
            pattern: /^[A-Za-z0-9]+([._\\-]*[A-Za-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            message: "邮件地址格式不正确",
            trigger: "blur"
          }
        ],
        phone_number: {
          pattern: /^1[345678]\d{9}$/,
          message: "手机号码或者座机号码格式错误",
          trigger: "blur"
        },
        address: [
          { required: false, message: "地址名称不能为空", trigger: "blur" },
          {
            min: 4,
            max: 255,
            message: "地址长度应在4-225个字符之间",
            trigger: "blur"
          },
          {
            pattern: /^[^~!@#$%^&*]+$/,
            message: "地址不能包含非法字符",
            trigger: "blur"
          }
        ],
        english_name: [
          {
            pattern: /^[a-zA-Z]+$/,
            message: "英文名称应为英文字符",
            trigger: "blur"
          }
        ],
        english_address: {
          pattern: /^[a-zA-Z 0-9]+$/,
          message: "英文地址为英文字母、数字和空格",
          trigger: "blur"
        },
        is_fee_discount: {
          required: true,
          message: "费减状态备案不能为空",
          trigger: "change"
        }
      }
    };
  },
  computed: {
    //cityName 为选择的省市区名称
    cityName() {
      const names = [];
      this.cityInfo.province && names.push(this.cityInfo.province.name + " ");
      this.cityInfo.city && names.push(this.cityInfo.city.name + " ");
      this.cityInfo.block && names.push(this.cityInfo.block.name + " ");
      return names.join("");
    },
    title() {
      return this.is_suppliers?"新建供应商":"新建客户"
    },
    label() {
      return this.is_suppliers?"供应商名称":"客户名称"
    },
    ...mapGetters(["areaMap", "cityMap", "provinceMap"])
  },
  methods: {
    handleClose() {
      this.contact = null;
    },
    // submitForm () {
    // 	return Object.assign({}, this.form, {customer_id: this.customerId});
    // },
    refresh() {
      this.$emit("refresh");
    },
    show() {
      this.isCustomerAddPanelVisible = true;
    },
    add() {
      if (this.form.name !== "") {
        const url = this.URL;
        this.form.contact = this.contact;
        const data = Object.assign({}, this.form);
        this.is_suppliers ? this.deleteField(data) : "";
        const success = _ => {
          this.dialogVisible = false;
          this.refresh();
          this.$emit("onItemAdded", _.data);
          this.$message({ message: "添加成功！", type: "success" });
        };
        this.$axiosPost({ url, data, success });
      } else {
        this.$message({ type: "warning", message: "必选项不能为空！" });
      }
    },
    getDefaultContacts(val) {
      this.contact = val;
      this.is_suppliers ? this.deleteField(this.contact) : "";
      console.log("this.contact", this.contact);
    },
    deleteField(obj) {
      delete obj.first_name;
      delete obj.last_name;
      delete obj.identity;
    },
    edit() {
      const url = `${this.URL}/${this.customer.id}`;
      const data = Object.assign({}, this.form);
      this.is_suppliers ? this.deleteField(data) : "";
      const success = _ => {
        this.dialogVisible = false;
        this.refresh();
        this.$emit("saved");
        this.$message({ message: "编辑成功！", type: "success" });
      };
      this.$axiosPut({ url, data, success });
    },
    cancel() {
      this.dialogVisible = false;
    },
    // 新建客户时可以新建联系人
    createDefaultContact() {
      this.$refs.pop.show();
    },
    chooseAddress(info) {
      this.form.province_code = info[0];
      this.form.city_code = info[1];
    },
    coverObj(val) {
      if (val) {
        this.cityInfo = [val.province_code - 0, val.city_code];
        this.$tool.coverObj(this.form, val);
      }
    }
  },
  components: {
    StaticSelect,
    ProvincialLinkage,
    // RemoteSelect,
    RemoteSelect: () => import("@/components/form/RemoteSelect"),
    LinkmanPop,
    JumpSelect,
    // AppShrink
    AppSwitch
  },
  watch: {
    customer: function(val, oldVal) {
      this.coverObj(val);
    }
  },
  created() {
    this.coverObj(this.customer);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
