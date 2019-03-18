<!-- 新增开票信息 -->
<template>
  <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
    <span slot="header" style="float: right;">
        <app-button-loading :func="save" ref="loadingBtn"></app-button-loading>
        <el-button type="primary" size="small" v-if="mode === 'edit'"
                    @click="save('edit')">保存</el-button>
    </span>
    <div class="main" style="margin-top:10px;">
      <el-form label-width="120px" :model="form" :rules="rules" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="选择客户" prop="customer">
              <jump-select :pageType="type" type="customer" v-model="form.customer"></jump-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主体类型" prop="target_type">
              <static-select type="target_type" v-model="form.target_type"></static-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称/姓名" prop="name">
              <el-input type="text" placeholder="请输入单位名称" v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人识别号" prop="identity">
              <el-input type="text" placeholder="请输入纳税人识别号" v-model="form.identity"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="注册地址" prop="address">
              <el-input type="text" v-model="form.address" placeholder="请输入注册地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone_number">
              <el-input type="text" placeholder="请输入联系电话" v-model="form.phone_number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户行" prop="bank">
              <el-input type="text" placeholder="请输入开户行" v-model="form.bank"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行账户" prop="account">
              <el-input type="text" placeholder="请输入银行账户" v-model="form.account"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" placeholder="请填写备注" v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="24">
          <el-form-item label="附件" prop>
            <up-load v-model="form.attachments" :fileList="attachments" :limit="1"></up-load>
          </el-form-item>
        </el-col>
      </el-row>
      </el-form>
    </div>
  </app-shrink>
</template>

<script>
import RemoteSelect from "@/components/form/RemoteSelect";
import JumpSelect from "@/components/form/JumpSelect";
import StaticSelect from "@/components/form/StaticSelect";
import UpLoad from "@/components/form/Upload";

export default {
    name: "BillingInfoAdd",
    data() {
        var checkIdentity = (rule, value, callback) => {
            if (this.form.target_type == 1 && value == "") {
                callback(new Error("单位请输入纳税人识别号"));
            }
            callback();
        };
        return {
            URL: "/invoice_targets",
            form: {
                customer: "",
                target_type: "",
                name: "",
                identity: "",
                address: "",
                phone_number: "",
                bank: "",
                account: "",
                remark: "",
                attachments: [],
            },
            attachments: [],
            title: '',
            isPanelVisible: false,
            mode: 'add',
            rules: {
                identity: [{ trigger: "blur", validator: checkIdentity }],
                // phone_number:[
                //     {required:true,message:"请输入联系电话",trigger:"blur"}
                // ],
                // bank:[
                //     {required:true,message:"请输入开户行",trigger:"blur"}
                // ],
                // account:[
                //     {required:true,message:"请输入银行账户",trigger:"blur"}
                // ],
                name: [{ required: true, message: "请输入单位名称", trigger: "blur" }],
                target_type: [
                    { required: true, message: "请选择主体类型", trigger: "blur" }
                ]
            }
        };
    },
    props: {
        data: {
            type: Object,
            default() {
                return {};
            }
        },
        type: String
    },
    created() {
        if (this.data && Object.keys(this.data).length !== 0) {
            this.coverObj(this.data);
        }
    },
    watch: {
        data: function (val, oldVal) {
            this.coverObj(val);
        }
    },
    methods: {
        coverObj(val) {
            this.$tool.coverObj(this.form, val);
            if (val.file) {
                this.form.attachments = this.attachments = [val.file];
            } else {
                this.form.attachments = this.attachments = [];
            }
        },
        show(mode) {
            this.mode = mode;
            this.isPanelVisible = true;
            if (mode == 'edit') {
                this.title = `开票信息>${this.data.customer.name}`
            } else {
                this.title = "新增开票信息>";
            }
        },
        save(type) {
            this.submitForm(type, this.data.id);
        },
        submitForm(type, id) {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    let url;
                    let data = this.form;
                    if (this.form.attachments.length > 0) {
                        data.file_id = this.form.attachments[0];
                    } else {
                        data.file_id = 0;
                    }
                    let msg;
                    let fun;
                    if (type === "add") {
                        url = this.URL;
                        msg = "创建";
                        fun = "refresh";
                    } else {
                        url = `${this.URL}/${id}`;
                        msg = "修改";
                        fun = "update";
                    }
                    const success = _ => {
                        this.$message({ type: "success", message: `${msg}成功!` });
                        this.$emit(fun);
                        if (type == 'add') {
                            this.$emit("onItemAdded", _.data);
                        }
                        this.isPanelVisible = false;
                    };
                    data.customer_id = data.customer;
                    type === "add"
                        ? this.$axiosPost({ url, data, success })
                        : this.$axiosPut({ url, data, success });
                } else {
                    this.$message({ type: "warning", message: "请正确填写" });
                }
            });
        }
    },
    components: {
        RemoteSelect,
        JumpSelect,
        StaticSelect,
        UpLoad
    }
};
</script>

<style scoped>
</style>