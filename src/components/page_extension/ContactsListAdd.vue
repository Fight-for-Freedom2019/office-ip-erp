<!-- 添加联系人表单 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-form-item label="所属客户" prop="customer">
                <remote-select type="customer" :pageType="type" v-model="form.customer"></remote-select>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请填写联系人姓名（必填）"></el-input>
            </el-form-item>
            <el-form-item label="尊称" prop="title">
                <el-input v-model="form.title" placeholder=""></el-input>
            </el-form-item>

            <el-form-item label="类型" prop="type">
                <static-select type="contacts_type" v-model="form.contact_type"></static-select>
            </el-form-item>

            <el-form-item label="邮件地址 " prop="email_address">
                <el-input v-model="form.email_address" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone_number">
                <el-input v-model="form.phone_number" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark" placeholder=""></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import StaticSelect from "@/components/form/StaticSelect";
    import AppSwitch from "@/components/form/AppSwitch";
    import Config from "@/const/selectConfig";
    import RemoteSelect from "@/components/form/RemoteSelect";

    const URL = "/contacts";
    const map = new Map(Config);
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
                switch_type: "is",
                form: {
                    customer_id:"",
                    customer:"",
                    name: "",
                    title:"",
                    contact_type: "",
                    email_address: "",
                    phone_number: "",
                    address: "",
                    remark:"",
                },
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
                data.customer_id = data.customer;
                let response;
                if (type === "add") {
                    response = await this.$axiosPost({
                        url: URL,
                        data,
                        success: () => {
                            this.$message({type: "success", message: "添加申请人成功"});
                            this.$emit("editSuccess");
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
                    response = await this.$axiosPut({
                        url,
                        data,
                        success: () => {
                            this.$message({type: "success", message: "编辑申请人成功"});
                            this.$emit("editSuccess");
                        }
                    });
                }
                return response;
            },
            getIsPublishName(val) {
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
            contacts: function (val, oldVal) {
                this.coverObj(val);
            },
            type: function (val, oldVal) {
                if (val === "add") {
                    this.form = {}
                } else {
                    this.form = this.$tool.deepCopy(this.contacts);
                }
            }
        },
        components: {
            StaticSelect,
            AppSwitch,
            RemoteSelect,
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>