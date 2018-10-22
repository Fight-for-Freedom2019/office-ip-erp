<!-- 添加联系人表单 -->
<template>
	<div class="main" style="margin-top:10px;">	
		<el-form label-width="120px" :model="form" :rules="rules" ref="form">
			<el-form-item label="姓名" prop="name">
				<el-input v-model="form.name"  placeholder="请填写联系人姓名（必填）"></el-input>
			</el-form-item>
			
			<el-form-item label="类型" prop="type">
				<static-select type="contacts_type" v-model="form.type"></static-select>
			</el-form-item>

			<el-form-item label="邮箱" prop="identity">
				<el-input v-model="form.email_address" placeholder=""></el-input>
			</el-form-item>
            <el-form-item label="电话" prop="phone_number">
                <el-input v-model="form.phone_number" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="证件号码" prop="identity">
                <el-input v-model="form.identity" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="英文名" prop="first_name">
                <el-input v-model="form.first_name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="英文姓" prop="last_name">
                <el-input v-model="form.last_name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="是否公开姓名" prop="is_publish_name">
                <app-switch :type="switch_type" v-model="form.is_publish_name" @input="getIsPublishName"></app-switch>
            </el-form-item>
		</el-form>
	</div>
</template>

<script>
import StaticSelect from "@/components/form/StaticSelect";
import AppSwitch from "@/components/form/AppSwitch";
const URL = "/api/contacts";

export default {
  name: "ContactsListAdd",
  props: {
    contacts: {
      type: Object,
      default() {
        return {};
      }
    },
    type: String
  },
  data() {
    return {
      switch_type:"is",
      form: {
        name: "",
        type: "",
        email_address: "",
        phone_number: "",
        identity: "",
        first_name: "",
        last_name: "",
        is_publish_name: "",    // TODO 前端传参是布尔值，后端返回为字符串，统一为布尔值方便显示
      },
      formType: "add",
      rules: {
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
        phone_number: {
          pattern: /^1[345678]\d{9}$/,
          message: "手机号码或者座机号码格式错误",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    async save(type) {
	  const data = this.form;
	  let response;
      if (type === "add") {
        response = await this.$axiosPost({
          url:URL,
          data,
          success: () => {
            this.$message({ type: "success", message: "添加申请人成功" });
            this.$emit("editSuccess");
          }
        });
      } else {
        let url = "/api/contacts/" + this.contacts.id;
        data.id = this.contacts.id;
        response = await this.$axiosPut({
          url,
          data,
          success: () => {
            this.$message({ type: "success", message: "编辑申请人成功" });
            this.$emit("editSuccess");
          }
        });
      }
      return response;
    },
    getIsPublishName(val){
       this.form.is_publish_name = val;
    },
    coverObj(val) {
      if (val) {
        this.$tool.coverObj(this.form, val, {
          obj: ["consultant"],
          skip: []
        });
      }
    }
  },
  created() {
    this.coverObj(this.contacts);
  },
  watch: {
      contacts: function(val, oldVal) {
	  this.coverObj(val);
	},
	type:function(val,oldVal){
		if(val === "add"){
			this.form = {}
		}else {
			this.form = this.$tool.deepCopy(this.contacts);
		}
	}
  },
  components: {
    StaticSelect,
    AppSwitch,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>