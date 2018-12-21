<!-- 详情面板 -->
<template>
    <div class="Panel">
        <app-shrink :visible.sync="isApplicationEditor" :title="title" size="full-screen">
            <div slot="header" style="float: right;" class="editor-header justify-between">
                <div class="btn-group">
                    <el-button type="primary" @click="saveData" size="small">保存</el-button>
                </div>
            </div>
            <div class="editor-primary" :style="`height:${innerHeight-87}px`" v-loading="loading"
                 element-loading-text="表单加载中">
                <div class="editor-append">
                    <div class="editor-append-handle" :style="`height:${innerHeight/2-80}px;overflow-y: auto`">
                        <div class="append-form-header justify-between">
                            <span>申请表格</span>
                            <el-button type="text" size="mini" icon="el-icon-plus" @click="addForm">新增
                            </el-button>
                        </div>
                        <div class="append-form-list">
                            <!--添加的表格名称列表-->
                            <ul class="form-list">
                                <li class="form-list-item justify-between" :ref="`index_${index}`" :data-id="item.id"
                                    :class="{'gray-bg':formType === item.id}"
                                    v-on:mouseleave="changeStyle(index,false)"
                                    v-on:mouseenter="changeStyle(index,true)" v-for="(item,index) in formList"
                                    :title="item.name"
                                    @click="openForm(item.id,index)">
                                    <span class="form-item-name">{{item.name}}</span>
                                    <el-button @click.stop="removeForm(index,item.id)"
                                               :class="{'show-remove':isShowRemoveBtn && index === isShowIndex}"
                                               type="text"
                                               size="mini" icon="el-icon-close"></el-button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="editor-attachment">
                        <!--文件及附件-->
                        <div class="append-form-header justify-between">
                            <span>文件及附件</span>
                            <span>
                                <el-button type="text" size="mini" icon="el-icon-sort" @click="turnArchives">转档
                            </el-button>
                                 <el-button type="text" size="mini" icon="el-icon-upload" @click="Upload">上传
                            </el-button>
                            </span>
                        </div>
                        <div class="append-form-list">
                            <ul class="form-list">
                                <!--<li class="form-list-item justify-between"></li>-->
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="editor-content">
                    <!--表单主体部分-->
                    <div ref="fc" id="form-create"></div>
                </div>
                <div class="editor-other">
                    <el-tabs v-model="tabpanel" @tab-click="handleTab" :style="`height:${innerHeight/2-123}px`">
                        <el-tab-pane label="申请文件" name="application_doc"></el-tab-pane>
                        <el-tab-pane label="官文" name="official_doc"></el-tab-pane>
                        <el-tab-pane label="邮件" name="mail"></el-tab-pane>
                    </el-tabs>
                    <div class="task-content" :style="`height:${innerHeight/2}px`">
                        <!-- 文件内容 -->
                    </div>
                </div>
            </div>
            <el-dialog title="添加表格" :visible.sync="showAppendForm" :modal="false">
                <div>
                    <h4>常用表格(可多选)</h4>
                </div>
                <ul class="common-use">
                    <li class="common-use-item" v-for="(item,index) in common_use">
                        <el-button :type="item.showIcon?'primary':''" @click="choiceCommon(item.id,index)">{{item.name}}<i :class="{'el-icon-check':item.showIcon}" class="el-icon--right"></i></el-button>
                    </li>
                </ul>
                <el-form>
                    <el-form-item label="请选择">
                        <el-select v-model="formTypeCollection" multiple filterable>
                            <el-option v-for="item in selectOptions"
                                       :key="item.value"
                                       :disabled="item.disabled"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="renderForm">确定</el-button>
                        <el-button @click="()=>{showAppendForm = false}">取消</el-button>
                    </el-form-item>
                </el-form>

            </el-dialog>
        </app-shrink>
    </div>
</template>

<script>
    import AppShrink from '@/components/common/AppShrink'
    import formConfig from '@/formConfig/main'
    import {handlePlaceholder, handleSingle} from '@/formConfig/handle/handle'
    import Vue from 'vue'
    import {mapGetters} from 'vuex'

    export default {
        name: 'CpcEditor',
        data() {
            return {
                title: "CPC电子申请编辑器（PI20180006-一种左乙拉西坦药物组合物及其制备方法；补正）",
                isApplicationEditor: false,
                tabpanel: "application_doc",
                showAppendForm: false,
                formList: [],
                isShowRemoveBtn: true,
                isShowIndex: 1000,
                loading: false,
                $f: null,
                instance_arr: [],
                model: {},
                current: '',
                formType: '',
                formTypeCollection: [],
                rules: [],
                vm_collection: new Map(),
                allData: {},
                submitData: new Map(),
                isValidate: false,
                data: {},
                save_type: "add",
                task_id: "",
                common_use:[
                    {id:100007,name:"专利代理委托书",showIcon:false},
                    {id:100006,name:"补正书",showIcon:false},
                    {id:100012,name:"意见陈述书",showIcon:false},
                    {id:100016,name:"著录项目变更申报书",showIcon:false},
                    {id:100104,name:"著录项目变更理由证明",showIcon:false},
                    {id:100701,name:"专利权评价报告请求书",showIcon:false},
                    {id:100027,name:"向外国申请专利保密审查请求书",showIcon:false},
                    // {id:10000432,name:"办理文件副本请求书",showIcon:false},
                    {id:100013,name:"撤回专利申请声明",showIcon:false},
                ],
                options_collection:new Map(),
                option_action:[
                    {url:'/contacts',data_key:"data",map_key:"contact"},
                    {url:'/inventors',data_key:"data",map_key:"inventors"},
                    {url:'/applicants',data_key:"data",map_key:"applicants"},
                    {url:'/users?role_name=Agent&listOnly=1',data_key:"data",map_key:"agents"},
                    {url:'/contracts',data_key:"data",map_key:"poa"},
                ],
                cpc_id: "",
                count: 0,
            }
        },
        props: {
            taskID: {
                type: Number,
            }
        },
        computed: {
            ...mapGetters([
                'innerHeight',
            ]),
            selectOptions: function () {
                return [...formConfig.entries()].map((item) => {
                    let idList = this.formList.map((item) => {
                        return item.id;
                    })
                    let bool = idList.indexOf(item[0]) !== -1 ? true : false;
                    return {value: item[0], label: item[1].name, disabled: bool}
                })
            },
            vm_collection_id: function () {
                let temp = this.count
                return [...this.vm_collection.keys()]
            }
        },

        mounted() {
            this.getOptions();
        },
        methods: {
            choiceCommon(id,index){
                let bool = this.common_use[index].showIcon;
                let mark = this.common_use[index].id;
                // this.common_use[index].showIcon = bool ? false:true;
                let arr = this.formList.filter((item)=>{
                    return item.id === mark
                });
                if(bool && arr.length === 0){
                    this.common_use[index].showIcon = false;
                    let i = this.formTypeCollection.indexOf(id);
                    this.formTypeCollection.splice(i,1);
                }else if(!bool && arr.length === 0){
                    this.common_use[index].showIcon = true;
                    //this.formList.push({id:mark,name:this.common_use[index].name});
                    this.formTypeCollection.push(mark);
                }
            },
            // 获取所有的远程select option
            getOptions(){
                this.option_action.forEach((i)=>{
                    const success = _ => {
                        let data = _.data[i.data_key].map((item) => {
                            return {value: item.id, label: item.name?item.name:item.serial}
                        })
                        this.options_collection.set(i.map_key,data);
                        console.log(this.options_collection);
                    }
                    this.$axiosGet({
                        url: i.url,
                        data: Object.assign({}),
                        success,
                    })
                })

            },
            openForm(id, index, isRemove = false) {
                if (id === this.formType) return
                this.$f.validate(this.successValidate(isRemove), this.errorValidate);
                if (!this.isValidate) return
                //this.loading = true
                this.current = index
                let target = formConfig.get(id)
                this.rules = handlePlaceholder(target.obj.rule)
                this.formType = id
                this.mergeRule(this.rules)
                this.paddingData(this.rules);
                this.createForm()

            },
            changeStyle(index, isShow) {
                this.isShowRemoveBtn = isShow
                this.isShowIndex = index
            },
            removeForm(index, id) {
                this.$confirm('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.handleRemove(index, id)
                })
            },
            // 移除表单
            handleRemove(index, id) {
                if (id === this.formType) {
                    let el
                    let prev_id
                    if (index === 0 && this.formList.length === 1) {
                        this.$f.destroy()
                        this.$f = null
                    } else if (index === 0 && this.formList.length > 1) {
                        el = this.$refs[`index_${index + 1}`]
                        prev_id = Number(el[0].attributes['data-id'].value)
                        this.openForm(prev_id, index + 1, true)
                    } else if (index !== 0 && this.formList.length > 1) {
                        el = this.$refs[`index_${index - 1}`]
                        prev_id = Number(el[0].attributes['data-id'].value)
                        this.openForm(prev_id, index - 1, true)
                    }
                }

                this.submitData.delete(id)
                this.formList.splice(index, 1)
                this.vm_collection_id.forEach((item) => {
                    if (String(item).indexOf(id) !== -1) {
                        this.vm_collection.delete(item)
                    }
                })
                // console.log('this.vm_collection', this.vm_collection)
                this.count++
            },

            // 合成规则
            mergeRule(source) {
                this.setOptions(source)
                source.map((item, index) => {
                    if (item._vm) {
                        this.setVmCollection(item._vm)
                    } else if (item.custom) {
                        source[index] = this.makeMarker(item)
                    } else if (item.request) {
                        //this.setSelectData(item, index)
                    }
                })
            },

            // 处理upload组件的url
            handleUploadUrl(url) {
                return `${url}/test`
            },


            setOptions(source) {
                source.forEach((item) => {
                    if (item.type && item.type === 'select') {
                        if(!item.options){
                            let data = this.options_collection.get(item.field);
                            if(data){
                                this.$set(item, "options", data);
                            }else {
                                this.$set(item, "options", []);

                            }
                        }
                        // !item.options ? this.$set(item, "options", []) : ''
                    }
                })

            },

            setVmCollection(vm) {
                // 一个规则里面有多个自定义组件的时候要个vm加后缀
                if (this.vm_collection.has(this.formType)) {
                    this.vm_collection.set(`${this.formType}_${++this.count}`, vm)
                } else {
                    this.vm_collection.set(this.formType, vm)
                }
                this.count++
            },

            // 生成自定义组件
            makeMarker(source) {
                const vm = new Vue(source.vm)
                vm._parentVue = this;
                if (source.field === "__upload") {
                    // 集中处理upload组件的url
                    vm.action = this.handleUploadUrl(vm.action);
                }
                this.setVmCollection(vm)
                return this.$formCreate.maker.createTmp(source.template, vm, source.field, source.label, source.col)
            },

            // 设置select打开下拉框事件，因为渲染函数on事件不支持修饰符，所以现在需要频繁请求，解决方法是使用缓存
            // 现改为打开cpc表单之前获取所有的select option数据
            setSelectData(item) {
                let func = (bool) => {
                    bool ? this.querySelectData(item.url, item.DATA_KEY).then((d) => {
                        item.options = d
                    }) : ""
                }
                if (item.event) {
                    item.event['visible-change'] = func
                } else {
                    item.event = {}
                    item.event['visible-change'] = func
                }

            },

            // 获取select框数据
            // TODO url要在这里做个处理
            querySelectData(url, key) {
                return new Promise((resolve, reject) => {
                    const success = _ => {
                        console.log("联系人", _)
                        let data = _.data[key].map((item) => {
                            return {value: {id: item.id, label: item.name}, label: item.name}
                        })
                        resolve(data)
                    }
                    this.$axiosGet({
                        url: url,
                        data: Object.assign({}),
                        success,
                    })
                })
            },

            addForm() {
                this.formTypeCollection = [];
                this.showAppendForm = true
                this.$f ? this.$f.submit() : ''
            },

            renderForm() {
                this.showAppendForm = false
                // 直接执行setTimeout中的代码会有阻塞...
                setTimeout(() => {
                    this.formTypeCollection.filter((item) => {
                        return JSON.stringify(this.formList).indexOf(item) === -1
                    }).forEach((item) => {
                        this.formList.push({id: item, name: formConfig.get(item).name})
                        this.formType = item
                        this.loadFormData()
                    })
                    this.loading = false;
                    // console.timeEnd("耗时")
                }, 50)
            },

            // 点击确定时加载表单生成规则
            loadFormData() {
                let target = formConfig.get(this.formType)
                this.rules = handlePlaceholder(target.obj.rule)
                this.paddingData(this.rules);
                this.mergeRule(this.rules)
                this.createForm()
                this.$f.submit()
            },

            // TODO 数据填充可能会有问题
            // 填充数据
            paddingData(rules) {
                let data = this.data[`table${this.formType}`];
                if (!data) return
                rules.forEach((rule) => {
                    //console.log("rule",rule);
                    if ((rule.rule && rule.rule._vm) || rule.vm) {
                        let temp = rule.vm ? rule.vm.data.extendData : rule.rule._vm.extendData;
                        for (let extendKey in temp) {
                            if (temp.hasOwnProperty(extendKey)) {
                                data[extendKey] ? temp[extendKey] = data[extendKey] : "";
                            }
                        }
                    } else {
                        data[rule.field] ? rule.value = data[rule.field] : ""
                    }
                })
            },

            createForm() {
                let _this = this
                const root = this.$refs.fc
                root.innerHTML = ''
                // console.log(this.rules);
                this.$f = this.$formCreate(
                    this.rules,
                    {
                        el: root,
                        resetBtn: false,
                        submitBtn: false,
                        mounted: () => {
                            //_this.loading = false
                        },
                        onSubmit: function (formData) {
                            // TODO 每次加载带自定义组件的表单时，数据才会双向绑定
                            if (_this.submitData.size === 0) {
                                _this.allData = {};
                                [..._this.vm_collection.values()].map((item) => {
                                    Object.assign(_this.allData, item.extendData)

                                })
                                Object.assign(_this.allData, formData)
                                //console.log(_this.allData)
                                _this.submitData.set(_this.formType, _this.allData)
                            } else {
                                _this.vm_collection_id.forEach((item) => {
                                    if (String(item).indexOf(_this.formType) !== -1) {
                                        if (!_this.submitData.get(_this.formType)) {
                                            _this.submitData.set(_this.formType, Object.assign(_this.vm_collection.get(item).extendData, formData))
                                        } else {
                                            Object.assign(_this.submitData.get(_this.formType), _this.vm_collection.get(item).extendData, formData)
                                        }
                                    } else {
                                        _this.submitData.set(_this.formType, formData)
                                    }
                                })
                                _this.vm_collection_id.length === 0 ? _this.submitData.set(_this.formType, formData) : ""
                            }
                        }
                    })

            },
            saveData() {
                this.$f.validate(this.successValidate, this.errorValidate)
                console.log(this.submitData);
                let data = {};
                data.tables = this.handleSubmit(this.submitData);
                this.save_type === "add" ? data.task_id = this.task_id : "";
                const success = (_) => {
                    this.$message({type: "success", message: "保存成功!"})
                }
                this.save_type === "add" ? this.$axiosPost({
                    url: "/taskCpcs",
                    data,
                    success
                }) : this.$axiosPut({url: `/taskCpcs/${this.cpc_id}`, data, success});
            },
            handleSubmit(data) {
                let obj = {};
                data.forEach((value, key) => {
                    obj[`table${key}`] = value;
                });
                return obj
            },
            successValidate(bool = false) {
                !bool ? this.$f.submit() : ""
                this.isValidate = true
            },
            errorValidate() {
                this.$message({type: "warning", message: "请正确填写!"})
                this.isValidate = false
            },
            handleTab() {
            },
            showApplicationEditor(id) {
                this.loading = true
                this.task_id = id;
                this.isApplicationEditor = true;
                this.getData(id);
            },
            turnArchives() {
            },
            Upload() {
            },
            getData() {
                // console.time("耗时")
                this.formTypeCollection = [];
                this.formList = [];
                const success = (_) => {
                    this.data = _.data.data[0].tables;
                    if (_.data.data[0].id) {
                        this.save_type = "edit";
                    }
                    this.cpc_id = _.data.data[0].id;
                    for (let key in this.data) {
                        if (this.data.hasOwnProperty(key)) {
                            if (key.indexOf('table') !== -1) {
                                this.formTypeCollection.push(Number(key.replace(/[^0-9]/ig, "")));
                            }
                        }
                    }
                    this.renderForm();
                }
                this.$axiosGet({url: "/taskCpcs", data: {id: this.task_id}, success})
            },
        },
        watch: {
            formList:function (val,oldVal) {
                this.common_use.forEach((item)=>{
                    let arr = val.filter((i)=>{
                        return i.id === item.id;
                    });
                    item.showIcon = arr.length !== 0?true:false;
                })
            }
        },
        components: {
            AppShrink,
        },
    }
</script>

<style scoped>
    .editor-header {
        height: 36px;
        background-color: #fff;
        padding: 0 6px;
    }

    .editor-header .title {

    }

    .editor-header .btn-group {

    }

    .editor-primary {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        margin-top: 4px;
    }

    .editor-append {
        width: 240px;
    }

    .editor-content {
        flex: 1;
        width: 100%;
        overflow-y: auto;
        margin-left: 10px;
    }

    .editor-other {
        width: 360px;
        margin-left: 10px;
    }

    .append-form-header {
        height: 36px;
        background-color: #eee;
        font-size: 14px;
        padding: 0 4px;
    }

    /*    .append-form-list {
            min-height: 200px;
        }*/

    .append-form-list .form-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .append-form-list .form-list-item {
        list-style-type: none;
        font-size: 14px;
        padding: 6px 6px;
        cursor: pointer;
        height: 28px;
        color: #606266;
    }

    .append-form-list .form-list-item:hover {
        color: #409EFF;
        background-color: #efefef;
    }

    .gray-bg {
        background-color: #f3f3f3;
    }

    .append-form-list .form-list-item button {
        display: none;
    }

    .append-form-list .form-list-item .show-remove {
        display: block;
    }

    .justify-between {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .form-list .form-item-name {
        white-space: nowrap;
        overflow: hidden;
        width: 210px;
    }
    .common-use {
        /*height: 80px;*/
        margin-bottom: 20px;
        display: flex;
        flex-flow: row wrap;
    }
    .common-use-item {
        margin-left: 10px;
        margin-top: 10px;
    }
</style>
<style>
    .rd_class .el-input {
        width: 160px;
    }

    .rd_class .el-input .el-input__inner {
        height: 30px;
        width: 160px;
    }

    .custom-checkbox .el-checkbox {
        display: inherit;
    }

    .custom-checkbox .el-checkbox + .el-checkbox {
        margin-left: 0;
        white-space: inherit;
    }

    .custom-checkbox .el-checkbox__label {
        display: initial;
    }

    .form-create .el-date-editor.el-input {
        width: auto;
    }

    .custom-none {
        display: none;
    }

    .form-create .placeholder {
        height: 36px;
        display: block;
    }
</style>