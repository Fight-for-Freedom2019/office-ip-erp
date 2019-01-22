<template>
  <div>
    <app-shrink :visible.sync="dialogVisible" :title="title" size="small">
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="用户组" prop="roles">
          <jump-select type="roles" v-model="form.roles" multiple></jump-select>
        </el-form-item>
        <el-form-item label="所属部门" prop="organization_units">
          <static-select type="branch" v-model="form.organization_units" multiple></static-select>
        </el-form-item>
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="form.user_name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email_address">
          <el-input v-model="form.email_address" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone_number">
          <el-input v-model="form.phone_number" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="导师" prop="mentor">
          <jump-select type="user" v-model="form.mentor" placeholder="请选择导师"></jump-select>
        </el-form-item>
        <el-form-item label="POP服务器" prop="pop_server">
          <el-input v-model="form.pop_server" placeholder="请输入POP服务器地址"></el-input>
        </el-form-item>
        <el-form-item label="POP端口" prop="pop_port">
          <el-input v-model="form.pop_port" placeholder="请输入POP端口"></el-input>
        </el-form-item>
        <el-form-item label="SMTP服务器" prop="smtp_server">
          <el-input v-model="form.smtp_server" placeholder="请输入SMTP服务器地址"></el-input>
        </el-form-item>
        <el-form-item label="SMTP端口" prop="smtp_port">
          <el-input v-model="form.smtp_port" placeholder="请输入SMTP端口"></el-input>
        </el-form-item>
        <el-form-item label="是否使用SSL" prop="is_ssl">
          <app-switch v-model="form.is_ssl" type="is_boolean"></app-switch>
        </el-form-item>
        <el-form-item label="是否激活" prop="is_active" v-if="type=='edit'">
          <app-switch v-model="form.is_active" type="is_boolean"></app-switch>
        </el-form-item>
        <el-form-item label="固定薪" prop="is_fixed_salary" v-if="type=='edit'">
          <app-switch v-model="form.is_fixed_salary" type="is_boolean"></app-switch>
        </el-form-item>
      </el-form>
      <template>
        <span slot="header" style="float: right;">
          <el-button
            v-if="type == 'add'"
            type="primary"
            size="small"
            :disabled="btn_disabled"
            @click="add"
          >添加</el-button>
          <el-button
            v-if="type == 'edit'"
            type="primary"
            size="small"
            :disabled="btn_disabled"
            @click="edit"
          >保存</el-button>
        </span>
      </template>
    </app-shrink>
  </div>
</template>
<script>
import AppShrink from "@/components/common/AppShrink";
import RemoteSelect from "@/components/form/RemoteSelect";
import JumpSelect from "@/components/form/JumpSelect";
import StaticSelect from "@/components/form/StaticSelect";
import AppSwitch from "@/components/form/AppSwitch";
import PopMixins from "@/mixins/pop-mixins";
export default {
  URL: "/users",
  REMINDER_TEXT: "用户",
  name: "usermanageedit",
  mixins: [PopMixins],
  data() {
    return {
      form: {
        roles: [],
        organization_units: [],
        user_name: "",
        password: "",
        name: "",
        email_address: "",
        phone_number: "",
        pop_server: "",
        pop_port: "",
        smtp_server: "",
        smtp_port: "",
        is_ssl: false,
        is_active: false,
        is_fixed_salary: false,
        mentor: ""
      },
      rules: {
        roles: {
          type: "array",
          required: false,
          message: "请输入用户组",
          trigger: "change"
        },
        organization_units: {
          type: "array",
          required: false,
          message: "请输入部门",
          trigger: "change"
        },
        user_name: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        email_address: [
          {
            pattern: /^[A-Za-z0-9]+([._\\-]*[A-Za-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            message: "邮件地址格式不正确",
            trigger: "blur",
            required: false
          }
        ]
      }
    };
  },
  methods: {
    setForm(d) {
      this.$tool.coverObj(this.form, d);
      if (d.organization_units) {
        this.form.organization_units = d.organization_units.map(_ => _.id);
      }
    }
  },
  created() {},
  components: {
    AppShrink,
    RemoteSelect,
    StaticSelect,
    JumpSelect,
    AppSwitch
  }
};
</script>
<style lang="scss" scoped>
</style>