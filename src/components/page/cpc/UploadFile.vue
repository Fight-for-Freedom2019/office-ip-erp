<template>
    <div>
        <el-form :model="form">
            <el-form-item>
                <!-- api/files?action=parseNotices -->
                <el-upload
                        list-type="picture"
                        action="http://localhost:8086/upload/upload_file.php"
                        :on-preview="handleFileCardPreview"
                        :on-success="handleFileUploadSuccess"
                        :before-upload="handleFileUploadBefore"
                        :on-error="handleFileUploadError"
                        :file-list="fileList"
                        multiple
                        :on-remove="handleRemoveFile">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">{{tip}}</div>
                </el-upload>


            </el-form-item>
            <template v-if="isSave">
                <el-form-item>
                    <el-button type="primary" @click="saveCpcFile">保存</el-button>
                </el-form-item>
            </template>
        </el-form>
        <el-dialog :visible.sync="showFileTypeList" title="选择文件类型" :modal="false" :close-on-click-modal="false"
                   :before-close="beforeClose">
            <el-form :model="fileTypeForm" ref="fileTypeForm" :rules="rule">
                <el-form-item prop="fileType" label="类型">
                    <el-select value-key="id" v-model="fileTypeForm.fileType">
                        <el-option v-for="item in fileTypeListCopy"
                                   :value="item.value"
                                   :label="item.label"
                                   :key="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-button typeof="primary" @click="selectFileType">保存</el-button>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UploadFile",
        data() {
            return {
                form: {},
                fileCount: 0,
                fileSuccessCount: 0,
                showFileTypeList: false,
                file: "",
                fileTypeForm: {
                    fileType: "",
                },
                rule: {
                    fileType: [
                        {required: true, message: "请选择类型", trigger: 'blur'}
                    ]
                },
                revampType: "add",
                fileTypeList: [
                    // design
                    {value: 130001, label: "主视图"}, {value: 130001, label: "后视图"}, {
                        value: 130001,
                        label: "左视图"
                    }, {value: 130001, label: "右视图"}, {value: 130001, label: "俯视图"}, {
                        value: 130001,
                        label: "仰视图"
                    }, {value: 130001, label: "立体图"}, {value: 130001, label: "使用状态参考图"}, {value: 130002, label: "简要说明"},


                    {value: 100042, label: "修改对照页"}, {value: 100001, label: "权利要求书"}, {
                        value: 100002,
                        label: "说明书"
                    }, {value: 100003, label: "说明书附图"}, {value: 100004, label: "说明书摘要"}, {value: 100005, label: "摘要附图"},


                    {value: 100108, label: "其他证明文件"}, {value: 100103, label: "不丧失新颖性证明"}, {
                        value: 100104,
                        label: "著录项目变更理由证明"
                    },
                    // 1 or 2
                    {value: 100119, label: "国内优先权在先申请文件副本"}, {value: 100125, label: "原文"},
                    // 1
                    {value: 100121, label: "实质审查参考资料"},
                    // 1 or 4
                    {value: 100120, label: "生物材料保藏证明"}, {value: 100111, label: "生物材料存活证明"}, {
                        value: 100112,
                        label: "优先权转让证明"
                    }, {value: 100113, label: "优先权转让证明中文本"}, {value: 100114, label: "经证明的在先申请文件副本"}, {
                        value: 100115,
                        label: "经证明的在先申请文件副本首页译文"
                    }, {value: 100117, label: "核苷酸或氨基酸序列表计算机可读载体"}, {value: 100118, label: "原案申请副本"}, {
                        value: 100121,
                        label: "实质审查参考资料"
                    }, {value: 100122, label: "申请权转让证明"},
                    // 4 or 5
                    {value: 150101, label: "国际申请进入中国国家阶段声明（PCT）"}, {
                        value: 150123,
                        label: "按照条约第19条修改的声明或说明"
                    }, {value: 150127, label: "按照条约第19条修改的权利要求书"}, {
                        value: 150125,
                        label: "按照条约第34条修改的声明或说明"
                    }, {value: 150128, label: "按照条约第34条修改的说明书摘要"}, {
                        value: 150129,
                        label: "按照条约第34条修改的说明书摘要附图"
                    }, {value: 150130, label: "按照条约第34条修改的权利要求书"}, {
                        value: 150131,
                        label: "按照条约第34条修改的说明书"
                    }, {value: 150132, label: "按照条约第34条修改的说明书附图"}, {
                        value: 150133,
                        label: "按照条约第34条修改的核苷酸或氨基酸序列表"
                    }, {value: 150134, label: "按照条约第28或41条修改的声明或说明"}, {
                        value: 150135,
                        label: "按照条约第28或41条修改的说明书摘要"
                    }, {value: 150136, label: "按照条约第28或41条修改的说明书摘要附图"}, {
                        value: 150137,
                        label: "按照条约第28或41条修改的权利要求书"
                    }, {value: 150138, label: "按照条约第28或41条修改的说明书"}, {
                        value: 150139,
                        label: "按照条约第28或41条修改的说明书附图"
                    }, {value: 150140, label: "按照条约第28或41条修改的核苷酸或氨基酸序列表"},
                    // table100104
                    {value: "变更发明人国籍的声明", label: "变更发明人国籍的声明"}, {
                        value: "身份证明文件复印件",
                        label: "身份证明文件复印件"
                    }, {value: "变更发明人声明（姓名书写错误）", label: "变更发明人声明（姓名书写错误）"}, {
                        value: "变更发明人声明（更改中文译名）",
                        label: "变更发明人声明（更改中文译名）"
                    }, {value: "变更发明人声明（错报或漏报发明人）", label: "变更发明人声明（错报或漏报发明人）"}, {
                        value: "其他证明文件（发明人）",
                        label: "其他证明文件（发明人）"
                    }, {value: "变更申请人声明（个人更名）", label: "变更申请人声明（个人更名）"}, {
                        value: "户籍管理部门出具的证明",
                        label: "户籍管理部门出具的证明"
                    }, {value: "工商管理部门出具的企业更名证明", label: "工商管理部门出具的企业更名证明"}, {
                        value: "事业单位或社会团体更名的证明文件",
                        label: "事业单位或社会团体更名的证明文件"
                    }, {value: "上级主管部门签发的证明文件", label: "上级主管部门签发的证明文件"}, {
                        value: "关于改正译名错误的声明",
                        label: "关于改正译名错误的声明"
                    }, {value: "专利（申请）权转移证明", label: "专利（申请）权转移证明"}, {
                        value: "商务部门出具的技术出口证明",
                        label: "商务部门出具的技术出口证明"
                    }, {value: "双方当事人签字或者盖章的赠与合同", label: "双方当事人签字或者盖章的赠与合同"}, {
                        value: "继承人合法地位的公证书",
                        label: "继承人合法地位的公证书"
                    }, {value: "有关公司合并或分立的证明文件", label: "有关公司合并或分立的证明文件"}, {
                        value: "企业注销的证明文件",
                        label: "企业注销的证明文件"
                    }, {value: "破产清算的详细财产分配情况证明", label: "破产清算的详细财产分配情况证明"}, {
                        value: "企业组织形式改变的证明文件",
                        label: "企业组织形式改变的证明文件"
                    }, {value: "改变企业组织形式的批示", label: "改变企业组织形式的批示"}, {
                        value: "加盖变更后企业公章的企业营业执照复印件",
                        label: "加盖变更后企业公章的企业营业执照复印件"
                    }, {value: "其他证明文件（申请人）", label: "其他证明文件（申请人）"}, {
                        value: "变更申请人国籍的声明",
                        label: "变更申请人国籍的声明"
                    }, {value: "身份证明文件的公证文件", label: "身份证明文件的公证文件"}, {value: "解除/辞去委托证明", label: "解除/辞去委托证明"},

                ],
                fileList: [],
                submitFileList: [],
            }
        },
        computed: {
            fileTypeListCopy: function () {
                let options = [];
                if (this.type === "design") {
                    options = [
                        {value: 130001, label: "主视图"}, {value: 130001, label: "后视图"}, {
                            value: 130001,
                            label: "左视图"
                        }, {value: 130001, label: "右视图"}, {value: 130001, label: "俯视图"}, {
                            value: 130001,
                            label: "仰视图"
                        }, {value: 130001, label: "立体图"}, {value: 130001, label: "使用状态参考图"}, {
                            value: 130002,
                            label: "简要说明"
                        }, {value: 100108, label: "其他证明文件"}, {value: 100103, label: "不丧失新颖性证明"}, {
                            value: 100104,
                            label: "著录项目变更理由证明"
                        },
                    ];
                    if (this.patent_type === 1 || this.patent_type === 2) {
                        options = options.concat([{value: 100119, label: "国内优先权在先申请文件副本"}, {
                            value: 100125,
                            label: "原文"
                        }])
                    }
                    if (this.patent_type === 1) {
                        options = options.concat([{value: 100121, label: "实质审查参考资料"}]);
                    }
                    if (this.patent_type === 1 || this.patent_type === 4) {
                        options = options.concat([{value: 100120, label: "生物材料保藏证明"}, {value: 100111, label: "生物材料存活证明"}, {
                            value: 100112,
                            label: "优先权转让证明"
                        }, {value: 100113, label: "优先权转让证明中文本"}, {value: 100114, label: "经证明的在先申请文件副本"}, {
                            value: 100115,
                            label: "经证明的在先申请文件副本首页译文"
                        }, {value: 100117, label: "核苷酸或氨基酸序列表计算机可读载体"}, {value: 100118, label: "原案申请副本"}, {
                            value: 100121,
                            label: "实质审查参考资料"
                        }, {value: 100122, label: "申请权转让证明"}]);
                    }
                    if (this.patent_type === 1 || this.patent_type === 5) {
                        options = options.concat([{value: 150101, label: "国际申请进入中国国家阶段声明（PCT）"}, {
                            value: 150123,
                            label: "按照条约第19条修改的声明或说明"
                        }, {value: 150127, label: "按照条约第19条修改的权利要求书"}, {
                            value: 150125,
                            label: "按照条约第34条修改的声明或说明"
                        }, {value: 150128, label: "按照条约第34条修改的说明书摘要"}, {
                            value: 150129,
                            label: "按照条约第34条修改的说明书摘要附图"
                        }, {value: 150130, label: "按照条约第34条修改的权利要求书"}, {
                            value: 150131,
                            label: "按照条约第34条修改的说明书"
                        }, {value: 150132, label: "按照条约第34条修改的说明书附图"}, {
                            value: 150133,
                            label: "按照条约第34条修改的核苷酸或氨基酸序列表"
                        }, {value: 150134, label: "按照条约第28或41条修改的声明或说明"}, {
                            value: 150135,
                            label: "按照条约第28或41条修改的说明书摘要"
                        }, {value: 150136, label: "按照条约第28或41条修改的说明书摘要附图"}, {
                            value: 150137,
                            label: "按照条约第28或41条修改的权利要求书"
                        }, {value: 150138, label: "按照条约第28或41条修改的说明书"}, {
                            value: 150139,
                            label: "按照条约第28或41条修改的说明书附图"
                        }, {value: 150140, label: "按照条约第28或41条修改的核苷酸或氨基酸序列表"}])
                    }
                }else if(this.type === "table100104"){
                    options = [{value: "变更发明人国籍的声明", label: "变更发明人国籍的声明"}, {
                        value: "身份证明文件复印件",
                        label: "身份证明文件复印件"
                    }, {value: "变更发明人声明（姓名书写错误）", label: "变更发明人声明（姓名书写错误）"}, {
                        value: "变更发明人声明（更改中文译名）",
                        label: "变更发明人声明（更改中文译名）"
                    }, {value: "变更发明人声明（错报或漏报发明人）", label: "变更发明人声明（错报或漏报发明人）"}, {
                        value: "其他证明文件（发明人）",
                        label: "其他证明文件（发明人）"
                    }, {value: "变更申请人声明（个人更名）", label: "变更申请人声明（个人更名）"}, {
                        value: "户籍管理部门出具的证明",
                        label: "户籍管理部门出具的证明"
                    }, {value: "工商管理部门出具的企业更名证明", label: "工商管理部门出具的企业更名证明"}, {
                        value: "事业单位或社会团体更名的证明文件",
                        label: "事业单位或社会团体更名的证明文件"
                    }, {value: "上级主管部门签发的证明文件", label: "上级主管部门签发的证明文件"}, {
                        value: "关于改正译名错误的声明",
                        label: "关于改正译名错误的声明"
                    }, {value: "专利（申请）权转移证明", label: "专利（申请）权转移证明"}, {
                        value: "商务部门出具的技术出口证明",
                        label: "商务部门出具的技术出口证明"
                    }, {value: "双方当事人签字或者盖章的赠与合同", label: "双方当事人签字或者盖章的赠与合同"}, {
                        value: "继承人合法地位的公证书",
                        label: "继承人合法地位的公证书"
                    }, {value: "有关公司合并或分立的证明文件", label: "有关公司合并或分立的证明文件"}, {
                        value: "企业注销的证明文件",
                        label: "企业注销的证明文件"
                    }, {value: "破产清算的详细财产分配情况证明", label: "破产清算的详细财产分配情况证明"}, {
                        value: "企业组织形式改变的证明文件",
                        label: "企业组织形式改变的证明文件"
                    }, {value: "改变企业组织形式的批示", label: "改变企业组织形式的批示"}, {
                        value: "加盖变更后企业公章的企业营业执照复印件",
                        label: "加盖变更后企业公章的企业营业执照复印件"
                    }, {value: "其他证明文件（申请人）", label: "其他证明文件（申请人）"}, {
                        value: "变更申请人国籍的声明",
                        label: "变更申请人国籍的声明"
                    }, {value: "身份证明文件的公证文件", label: "身份证明文件的公证文件"}, {value: "解除/辞去委托证明", label: "解除/辞去委托证明"}];
                }
                return options
            }
        },
        props: {
            type: {
                type: String,
                default() {
                    return "design"
                },
            },
            patent_type: {
                type: Number,
                default(){
                    return 1
                },
            },
            tip: {
                type: String,
                default() {
                    return "点击上面按钮上传文件及附件（PDF、JPG、ZIP、WORD等）"
                },
            },
            isSave: {
                type: Boolean,
                default() {
                    return true
                }
            },
        },
        methods: {
            handleFileUploadBefore(file) {
                // console.log("before",file);
                this.fileCount++;
            },
            handleFileUploadError() {
                this.fileSuccessCount++;    // 失败的也要纳入总数
            },
            beforeClose(done) {
                this.$refs.fileTypeForm.validate((valid) => {
                    if (valid) {
                        done();
                    } else {
                        !this.isSave ? this.saveCpcFile() : ""
                    }
                })

            },
            handleFileUploadSuccess(r, f, fl) {
                if (this.fileCount > 1) {
                    f.multiple = true;
                }
                this.fileSuccessCount++;
                this.fileTypeForm.fileType = "";
                this.revampType = "add";
                this.file = f;
                this.fileList = fl;
                if (this.fileSuccessCount === this.fileCount) {
                    this.showFileTypeList = true;
                    this.fileSuccessCount = 0;
                    this.fileCount = 0;
                }
                // this.selectFileType(file);
            },
            selectFileType() {
                this.$refs.fileTypeForm.validate((valid) => {
                    if (valid) {
                        let target = this.fileTypeList.filter((item) => item.value === this.fileTypeForm.fileType);
                        //console.log(target);
                        this.fileList.forEach((item) => {
                            item.type = !item.type ? "" : item.type;
                            //console.log("this.file", this.file);
                            if (item.uid === this.file.uid || item.multiple) {
                                item.target = target[0] ? target[0].value : "";
                                let label = target[0] ? target[0].label : "";
                                let reg = /——\[.*?\]/;
                                if (this.revampType === "add") {
                                    item.name += label ? `——[${label}]` : "";
                                } else {
                                    reg.test(item.name) ? item.name = item.name.replace(reg, `——[${label}]`) : item.name += label ? `——[${label}]` : ""
                                }
                                item.type = label;
                            }
                            item.multiple ? delete item.multiple : "";
                        })
                        this.showFileTypeList = false;
                    } else {
                        this.$message({type: "warning", message: "请选择类型"})
                    }
                })
                !this.isSave ? this.saveCpcFile() : ""
            },
            handleFileCardPreview(file) {
                this.showFileTypeList = true;
                this.file = file;
                this.revampType = "edit";
            },
            handleRemoveFile(file, fileList) {
                console.log("remove", file);
                this.fileList = fileList;
                const success = (_) => {
                    this.$message({type: "success", message: "删除成功!"});
                };
                !this.isSave ? this.saveCpcFile() : ""
                // let id = 5869;
                //let id = file.response.data.file.id;
                //this.$axiosDelete({url:`/files/${id}`,data:{},success});
            },
            saveCpcFile() {
                let bool = false;
                let temp = [];
                console.log("fileList", this.fileList);
                this.fileList.some((item) => {
                    if (item.type === "" || !item.type) {
                        this.$message({type: "warning", message: `文件—${item.name}没有选择类型!  请点击文件名添加类型`});
                        bool = true;
                        return true;
                    }
                    temp.push({name: item.type, response: item.response, target: item.target});
                })
                if (!bool) {
                    this.$emit("getFileList", temp);
                    this.isSave ? this.fileList = [] : "";
                }
            },
        },
    }
</script>

<style scoped>

</style>