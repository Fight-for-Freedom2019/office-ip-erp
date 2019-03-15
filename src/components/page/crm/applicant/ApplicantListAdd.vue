<template>
  <div class="main" style="margin-top:10px;">
    <app-shrink :visible.sync="is_show" :title="title">
      <span slot="header" style="float: right;">
        <!--<el-button type="primary" @click="saveAdd" v-if="formType == 'add'" size="small">新建</el-button>-->
          <app-button-loading :func="save" param="add" v-if="type == 'add'" ref="loadingBtn"></app-button-loading>
        <el-button type="primary" @click="save('edit')" v-if="type == 'edit'" size="small">保存</el-button>
      </span>
      <div>
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
          <el-form-item label="所属客户" prop="customer">
            <remote-select type="customer" v-model="form.customer"></remote-select>
          </el-form-item>

          <el-form-item label="申请人名称" prop="name">
            <el-input v-model="form.name" placeholder="请填写申请人名称（必填）"></el-input>
          </el-form-item>

          <el-form-item label="申请人类型" prop="type">
            <static-select type="applicant_type" v-model="form.type"></static-select>
          </el-form-item>

          <el-form-item label="证件号码" prop="identity">
            <el-input v-model="form.identity" placeholder="请填写申请人证件号码（可选）"></el-input>
          </el-form-item>

          <el-row>
            <el-col :span="8">
              <el-form-item label="申请人国籍" prop="citizenship">
                <!-- <el-input v-model="form.citizenship" ></el-input> -->
                <static-select v-model="form.citizenship" type="area"></static-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="住所地" prop="residence">
                <static-select v-model="form.residence" type="area"></static-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请人城市" prop="province_city">
                <city :value="form.province_city" @input="chooseAddress"></city>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="邮编" prop="postcode">
                <el-input v-model="form.postcode" placeholder="请填写邮编（可选）"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱" prop="email_address">
                <el-input v-model="form.email_address" placeholder="请填写邮箱（可选）"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话" prop="phone_number">
                <el-input v-model="form.phone_number" placeholder="请填写电话（可选）"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="详细地址" prop="address">
            <el-input v-model="form.address" placeholder="请填写申请人详细地址（可选，不用重复省市）"></el-input>
          </el-form-item>

          <el-row>
            <el-col :span="8">
              <el-form-item label="默认申请人" prop="is_default">
                <el-switch
                    style="display: block; margin-top:9px;"
                    v-model="form.is_default"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="费减备案" prop="is_fee_discount">
                <el-switch
                    style="display: block; margin-top:9px;"
                    v-model="form.is_fee_discount"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </el-col>
            
            <el-col :span="8">
              <el-form-item label="备案期限" prop="is_default">
                <el-date-picker type="date" v-model="form.fee_discount_deadline"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="英文姓名" prop="english_name">
            <el-input v-model="form.english_name" placeholder="请填写申请人英文姓名（可选）"></el-input>
          </el-form-item>

          <el-form-item label="英文地址" prop="english_address">
            <el-input v-model="form.english_address" placeholder="请填写申请人英文地址（可选）"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </app-shrink>
  </div>
</template>

<script>
import StaticSelect from "@/components/form/StaticSelect";
import AppButtonLoading from "@/components/common/AppButtonLoading";

// import RemoteSelect from "@/components/form/RemoteSelect";
import City from "@/components/form/City";
import AppShrink from "@/components/common/AppShrink";
import AppSwitch from "@/components/form/AppSwitch";
import isRequest from "../mixins/is_request"
import { mapGetters } from 'vuex'
const URL = "/applicants";

export default {
    name: "ApplicantListAdd",
    mixins: [isRequest(URL)],
    props: {
        applicant: {
            type: Object,
            default() {
                return {};
            }
        },
        title: {
            type: String,
            default() {
                return "新增"
            },
        },
        type: {
            type: String,
            default() {
                return "add"
            },
        },
    },
    computed: {
        ...mapGetters(['detail_customer']),
    },
    data() {
        return {
            form: {
                customer: "",
                type: "",
                name: "",
                identity: "",
                citizenship: "",
                address: "",
                postcode: "",
                residence: "",
                is_fee_discount: false,
                fee_discount_deadline: "",
                is_default: false,
                english_name: "",
                english_address: "",
                email_address: "",
                phone_number: "",
                province_city: [],
                domicile: ""
            },
            formType: "add",
            rules: {
                customer: {
                    required: true,
                    message: "请选择申请人所属客户",
                    trigger: "change"
                },
                name: {
                    required: true,
                    message: "请填写申请人名称",
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
                    pattern: /^[0-9\-\s]{5,30}$/,
                    message: "手机号码或者座机号码格式错误",
                    trigger: "blur"
                },
                english_name: [
                    {
                        pattern: /^[a-zA-Z][\.a-zA-Z\s]*?[a-zA-Z]+$/,
                        message: "英文名称应为英文字符和空格",
                        trigger: "blur"
                    }
                ],
                english_address: {
                    pattern: /^[a-zA-Z][\.a-zA-Z\s,0-9]*?[a-zA-Z]+$/,
                    message: "英文地址为英文字符、数字和空格",
                    trigger: "blur"
                }
            }
        };
    },
    methods: {
        save(type) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    const data = this.submitForm();
                    if (type === "add") {
                        this.$axiosPost({
                            url: URL,
                            data,
                            success: (d) => {
                                this.$message({ type: "success", message: "添加申请人成功" });
                                this.$emit("refresh");
                                this.$emit('onItemAdded', d.data);
                            }
                        });
                    } else {
                        let url = "/applicants/" + this.applicant.id;
                        data.id = this.applicant.id;
                        this.$axiosPut({
                            url,
                            data,
                            success: () => {
                                this.$message({ type: "success", message: "编辑申请人成功" });
                                this.$emit("update");
                            }
                        });
                    }
                } else {
                    this.$message({ type: "warning", message: "请正确填写" });
                }
            });
        },
        submitForm() {
            const o = {};
            for (let k in this.form) {
                const d = this.form[k];
                if (k == "province_city") {
                    o.province_code = d[0] ? d[0] : "";
                    o.city_code = d[1] ? d[1] : "";
                } else {
                    o[k] = d;
                }
            }

            return o;
        },
        chooseAddress(i) {
            this.form.province_city = [i[0], i[1]];
        },
        coverObj(val) {
            if (val) {
                this.$tool.coverObj(this.form, val);
            }
        },
    },
    watch: {
        applicant: function (val, oldVal) {
            console.log('here')
            this.$nextTick(() => {
                !this.is_request ? this.coverObj(val) : "";
            })
        },
        is_show: {
            handler(v) {
                this.$nextTick(_ => {
                    if (!v) return
                    this.clear(); //填充前清空
                    this.$nextTick(_ => {
                        if (this.detail_customer != undefined) {
                            const len = this.$tool.getObjLength(this.detail_customer);
                            if (len > 0 && !/crm/.test(this.path)) {
                                //  填充默认客户并且crm模块不用填充
                                this.$set(this.form, 'customer', this.detail_customer)
                            }
                        }
                    })
                })
            },
            immediate: true
        }
    },
    components: {
        StaticSelect,
        // RemoteSelect,
        RemoteSelect: () => import('@/components/form/RemoteSelect'),
        City,
        AppSwitch,
        AppShrink,
        AppButtonLoading
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>