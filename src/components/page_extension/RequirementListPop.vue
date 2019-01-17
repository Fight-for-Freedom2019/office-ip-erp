<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" :modal="false" width="70%">
        <el-form label-width="100px" ref="form" :model="form" :rules="rules">

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
                        <static-select v-model="form.citizenship" type="area"></static-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="住所所在地" prop="residence">
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
                        <el-input v-model="form.email_address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电话" prop="phone_number">
                        <el-input v-model="form.phone_number"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="详细地址" prop="address">
                <el-input v-model="form.address" placeholder="请填写申请人详细地址（可选）"></el-input>
            </el-form-item>

            <el-row>
                <el-col :span="9">
                    <el-form-item label="是否费减备案" prop="is_fee_discount">
                        <el-switch
                                style="display: block; margin-top:9px;"
                                v-model="form.is_fee_discount"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label-width="120" label="是否默认申请人" prop="is_default">
                        <el-switch
                                style="display: block; margin-top:9px;"
                                v-model="form.is_default"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="5">

                </el-col>
            </el-row>


            <el-form-item label="英文姓名" prop="english_name">
                <el-input v-model="form.english_name" placeholder="请填写申请人英文姓名（可选）"></el-input>
            </el-form-item>

            <el-form-item label="英文地址" prop="english_address">
                <el-input v-model="form.english_address" placeholder="请填写申请人英文地址（可选）"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px;">
                <el-button type="primary" @click="add" v-if="type === 'add'" :disabled="btn_disabled">添加</el-button>
                <el-button type="primary" @click="edit" v-if="type === 'edit'" :disabled="btn_disabled">编辑</el-button>
                <el-button type="button" @click="cancel" :disabled="btn_disabled">取消</el-button>
            </el-form-item>

        </el-form>
    </el-dialog>
</template>

<script>
    import {mapGetters} from "vuex";
    import {mapActions} from "vuex";
    import PopMixins from "@/mixins/pop-mixins";
    import StaticSelect from "@/components/form/StaticSelect";
    import City from "@/components/form/City";

    const URL = "/customers";
    export default {
        name: "RequireListPop",
        mixins: [PopMixins],
        props: ["customer", "presentId"],
        data() {
            return {
                cityInfo: [],
                form: {
                    name: "",
                    type: "",
                    identity: "",
                    citizenship: "",
                    address: "",
                    district: [],
                    postcode: "",
                    is_fee_discount: false,
                    is_default: false,
                    english_name: "",
                    english_address: "",
                    email_address: "",
                    phone_number: "",
                    province_city: [],
                    residence: ""
                },
                rules: {
                    name: [
                        {required: true, message: "申请人名称不能为空", trigger: "blur"},
                        {min: 1, max: 50, message: "长度不超过50个字符", trigger: "blur"}
                    ],
                    // type: {
                    //   required: true,
                    //   message: "申请人类型不能为空",
                    //   trigger: "change"
                    // },
                    // identity: [
                    //   { required: true, message: "证件号码不能为空", trigger: "blur" },
                    //   { min: 1, max: 50, message: "长度不超过50个字符", trigger: "blur" }
                    // ],
                    postcode: [
                        // { required: true, message: "邮编不能为空", trigger: "blur" },
                        {
                            pattern: /^[\d]{4}|[\d]{6}]+$/,
                            message: "邮编为4-6位数字",
                            trigger: "blur"
                        }
                    ],
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
                    address: [
                        // { required: true, message: "地址名称不能为空", trigger: "blur" },
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
                            pattern: /^[a-zA-Z][\.a-zA-Z\s]*?[a-zA-Z]+$/,
                            message: "英文名称应为英文字符",
                            trigger: "blur"
                        }
                    ],
                    english_address: {
                        pattern: /^[a-zA-Z][\.a-zA-Z\s,0-9]*?[a-zA-Z]+$/,
                        message: "英文地址为英文字母、数字和空格",
                        trigger: "blur"
                    },
                    // is_fee_discount: {
                    //   required: true,
                    //   message: "费减状态备案不能为空",
                    //   trigger: "change"
                    // }
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
            }
        },
        methods: {
            // submitForm () {
            // 	return Object.assign({}, this.form, {customer_id: this.customerId});
            // },
            refresh() {
                this.$emit("refresh");
            },
            update() {
                this.$emit("update");
            },
            add() {
                this.$refs.form.validate((valid) => {
                    if(valid){
                        const url = `${URL}/${this.customer.id}/applicants`;
                        const data = Object.assign({}, this.submitForm());
                        const success = _ => {
                            this.dialogVisible = false;
                            this.refresh();
                        };
                        this.$axiosPost({url, data, success});
                    }else {
                        this.$message({type: "warning", message: "必选项不能为空！"});
                    }
                });
            },
            edit() {
                const url = `${URL}/${this.customer.id}/applicants/${this.presentId}`;
                const data = Object.assign({}, this.submitForm());
                const success = _ => {
                    this.dialogVisible = false;
                    this.update();
                    this.$message({message: "编辑成功！", type: "success"});
                };
                this.$axiosPut({url, data, success});
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
            cancel() {
                this.dialogVisible = false;
            },
            chooseAddress(i) {
                this.form.province_city = [i[0], i[1]];
            },
        },
        components: {
            StaticSelect,
            City
        },
        // URL: "/requirements",
        REMINDER_TEXT: ""
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>