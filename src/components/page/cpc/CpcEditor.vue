<!-- 详情面板 -->
<template>
  <div class="Panel">
    <app-shrink :visible.sync="isApplicationEditor" :title="title" size="full-screen">
      <div slot="header" style="float: right;" class="editor-header justify-between">
        <div class="btn-group">
          <el-button type="primary" @click="saveData" size="small">保存</el-button>
        </div>
      </div>
      <div
        class="editor-primary"
        :style="`height:${innerHeight-87}px`"
        v-loading="loading"
        element-loading-text="表单加载中"
      >
        <div class="editor-append">
          <div
            class="editor-append-handle"
            :style="`height:${innerHeight/2-80}px;overflow-y: auto`"
          >
            <div class="append-form-header justify-between">
              <span>申请表格</span>
              <el-button type="text" size="mini" icon="el-icon-plus" @click="addForm">新增</el-button>
            </div>
            <div class="append-form-list">
              <!--添加的表格名称列表-->
              <ul class="form-list">
                <li
                  class="form-list-item justify-between"
                  :ref="`index_${index}`"
                  :data-id="item.id"
                  :class="{'gray-bg':formType === item.id}"
                  v-on:mouseleave="changeStyle(index,false)"
                  v-on:mouseenter="changeStyle(index,true)"
                  v-for="(item,index) in formList"
                  :title="item.name"
                  @click="openForm(item.id,index)"
                >
                  <span class="form-item-name">{{item.name}}</span>
                  <el-button
                    @click.stop="removeForm(index,item.id)"
                    :class="{'show-remove':isShowRemoveBtn && index === isShowIndex}"
                    type="text"
                    size="mini"
                    icon="el-icon-close"
                  ></el-button>
                </li>
              </ul>
            </div>
          </div>
          <div class="editor-attachment">
            <!--文件及附件-->
            <div class="append-form-header justify-between">
              <span>文件及附件</span>
              <span>
                <el-button type="text" size="mini" icon="el-icon-sort" @click="turnArchives">转档</el-button>
                <el-button type="text" size="mini" icon="el-icon-upload" @click="Upload">上传</el-button>
              </span>
            </div>
            <div class="append-form-list">
              <ul class="form-list">
                <li
                  class="form-list-item justify-between"
                  v-on:mouseleave="changeStyle(index,false,'file')"
                  v-on:mouseenter="changeStyle(index,true,'file')"
                  v-for="(item,index) in submitFileList"
                  @click="viewFile(item.viewUrl)"
                  :title="item.name"
                >
                  <span class="form-item-name">{{item.name}}</span>
                  <el-button
                    @click.stop="removeFile(index,item.fid)"
                    :class="{'show-remove':isShowFileRemoveBtn && index === isShowFileIndex}"
                    type="text"
                    size="mini"
                    icon="el-icon-close"
                  ></el-button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="editor-content">
          <!--表单主体部分-->
          <div ref="fc" id="form-create"></div>
        </div>
        <div class="editor-other">
          <el-tabs
            v-model="tabpanel"
            @tab-click="handleTab"
            :style="`height:${innerHeight/2-123}px`"
          >
            <el-tab-pane label="申请文件" name="application_doc">
              <ul class="attachmentsList">
                <li v-for="item in amendments" @click="({viewUrl})=>{window.open(viewUrl)}">{{item.name}}</li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="官文" name="official_doc">
              <ul class="noticesList">
                <li v-for="item in notices" @click="({viewUrl})=>{window.open(viewUrl)}">{{item.name}}</li>
              </ul>
            </el-tab-pane>
            <!-- <el-tab-pane label="邮件" name="mail"></el-tab-pane> -->
          </el-tabs>
          <div class="task-content" :style="`height:${innerHeight/2}px`">
            <!-- 文件内容 -->
          </div>
        </div>
      </div>
      <!-- 添加表格 start -->
      <el-dialog title="添加表格" :visible.sync="showAppendForm" :modal="false">
        <div>
          <h4>常用表格(可多选)</h4>
        </div>
        <ul class="common-use">
          <li class="common-use-item" v-for="(item,index) in common_use">
            <el-button :type="item.showIcon?'primary':''" @click="choiceCommon(item.id,index)">
              {{item.name}}
              <i :class="{'el-icon-check':item.showIcon}" class="el-icon--right"></i>
            </el-button>
          </li>
        </ul>
        <el-form>
          <el-form-item label="请选择">
            <el-select v-model="formTypeCollection" multiple filterable>
              <el-option
                v-for="item in selectOptions"
                :key="item.value"
                :disabled="item.disabled"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="renderForm">确定</el-button>
            <el-button @click="()=>{showAppendForm = false}">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 添加表格 end -->
      <!-- 添加文件 start -->
      <el-dialog title="CPC电子编辑器上传文件" :visible.sync="showAppendFile" :modal="false">
        <upload-file @getFileList="getFileList"></upload-file>
      </el-dialog>
      <!-- 添加文件 end -->
      <!-- 转档 start -->
      <el-dialog :visible.sync="showTurnArchives" :modal="false" top="8vh">
        <div slot="title" class="el-dialog__title">
          <span>电子申请编辑器说明书转档</span>
          <a href="/static/templates/patent_template.dotx" target="_blank">(说明书撰写模板下载)</a>
        </div>
        <turn-archives
          @hide="hideTurnArchives"
          :otherFormMap="otherFormMap"
          :amendments="amendments"
          @getTurnArchives="getTurnArchives"
        ></turn-archives>
        <!--@turnArchivesFile="turnArchivesFile"-->
      </el-dialog>
      <!-- 转档 end -->
    </app-shrink>
  </div>
</template>

<script>
import AppShrink from "@/components/common/AppShrink";
import TurnArchives from "@/components/page/cpc/TurnArchives";
import UploadFile from "@/components/page/cpc/UploadFile";
import formConfig from "@/formConfig/main";
import cloneDeep from "lodash/cloneDeep";
import { handlePlaceholder, handleSingle } from "@/formConfig/handle/handle";
import Vue from "vue";
import { mapGetters } from "vuex";

const otherForm = [
  ["100000", "说明书全文"],
  ["100001", "权利要求书"],
  ["100002", "说明书"],
  ["100003", "说明书附图"],
  ["100004", "说明书摘要"],
  ["100005", "摘要附图"],
  ["100042", "修改对照页"],
  ["100108", "其他证明文件"],
  ["100125", "原文"]
];
export default {
  name: "CpcEditor",
  data() {
    return {
      // title: "CPC电子申请编辑器",
      isApplicationEditor: false,
      tabpanel: "application_doc",
      showAppendForm: false,
      showAppendFile: false,
      showTurnArchives: false,
      formList: [],
      isShowRemoveBtn: true,
      isShowFileRemoveBtn: true,
      isShowIndex: 1000,
      isShowFileIndex: 1000,
      loading: false,
      $f: null,
      instance_arr: [],
      model: {},
      current: "",
      formType: "",
      otherFormMap: new Map(otherForm),
      turnArchivesForm: {},
      submitFileList: [],
      formTypeCollection: [],
      rules: [],
      vm_collection: new Map(),
      allData: {},
      submitData: new Map(),
      isValidate: false,
      fileListVisible: false,
      fileListUrl: "",
      fileType: "",
      data: {},
      save_type: "add",
      task_id: "",
      options_collection: new Map(),
      cpc_id: "",
      count: 0,
      form: {},
      amendments: [], // 右侧申请文件
      notices: [], // 右侧官文
      saveRules:new Map(),  // 将规则保存起来
      copy_form: [
        100104,
        1001042,
        1001043,
        1001044,
        1001045,
        1001046,
        1001047,
        1001048,
        1001049,
        10010410
      ],
      common_use: [
        { id: 100007, name: "专利代理委托书", showIcon: false },
        { id: 100006, name: "补正书", showIcon: false },
        { id: 100012, name: "意见陈述书", showIcon: false },
        { id: 100016, name: "著录项目变更申报书", showIcon: false },
        { id: 100104, name: "著录项目变更理由证明", showIcon: false },
        { id: 100701, name: "专利权评价报告请求书", showIcon: false },
        { id: 100027, name: "向外国申请专利保密审查请求书", showIcon: false },
        // {id:10000432,name:"办理文件副本请求书",showIcon:false},
        { id: 100013, name: "撤回专利申请声明", showIcon: false }
      ],
      option_action: [
        {
          url: "/contacts?listRows=1000000",
          data_key: "data",
          map_key: "contact"
        },
        {
          url: "/inventors?listRows=1000000",
          data_key: "data",
          map_key: "inventors"
        },
        {
          url: "/applicants?listRows=1000000",
          data_key: "data",
          map_key: "applicants"
        },
        {
          url: "/agents?listRows=1000000",
          data_key: "data",
          map_key: "agents"
        },
        {
          url: "/contracts?listRows=1000000",
          data_key: "data",
          map_key: "poa"
        },
        {
          url: "/agencies?listRows=1000000",
          data_key: "data",
          map_key: "agency"
        }
      ],
      verifyConfig: {
        patent_number: [
          {
            pattern: /20[0-1]\d{9}\.?(\d|X|x)/,
            message: "请填写正确的申请号或专利号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    taskID: {
      type: Number
    },
    process: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    ...mapGetters(["innerHeight", "getHashMaps"]),
    auth() {
      return { Authorization: window.localStorage.getItem("token") };
    },
    title:function(){
      let title = "";
      if(this.process.serial) {
        title = this.process.serial;
      }else if(this.process.project.serial){
        title = this.process.project.serial;
      }
      return `CPC电子申请编辑器(${title})`
    },
    selectOptions: function() {
      return [...formConfig.entries()].map(item => {
        let idList = this.formList.map(item => {
          return item.id;
        });
        let bool = idList.indexOf(item[0]) !== -1 ? true : false;
        if (item[0] === 100104) bool = false;
        return { value: item[0], label: item[1].name, disabled: bool };
      });
    },
    vm_collection_id: function() {
      let temp = this.count;
      return [...this.vm_collection.keys()];
    }
  },

  mounted() {
    let target = this.getHashMaps.get("cpc_tables");
    let attachments = [];
    target.options.forEach(item => {
      if (item.name) {
        attachments.push({ value: item.id, label: item.name.WENJIANMC });
      }
    });
    this.options_collection.set("attachments", attachments);
    this.getOptions();
  },
  methods: {
    /*****文件相关 start*****/
    getFileList(result) {
      result.forEach(item => {
        this.detectorRepeat(item.id);
        this.submitFileList.push(item);
      });
      // this.submitFileList = this.submitFileList.concat(result);
      this.showAppendFile = false;
    },
    getTurnArchives(result) {
      let arr = [];
      result.forEach(item => {
        if (item.code !== "100000") {
          let obj = {};
          obj.name = item.filename + "." + item.ext;
          obj.viewUrl = item.viewUrl;
          obj.target = parseInt(item.code);
          obj.fid = item.id;
          obj.ext = item.ext;
          this.detectorRepeat(obj.target);
          this.submitFileList.push(obj);
        }
      });
      this.submitFileList = this.submitFileList.concat(arr);
      this.showTurnArchives = false;
    },
    /*turnArchivesFile(file){
      this.$emit("turnArchivesFile",file);
    },*/
    detectorRepeat(id) {
      this.submitFileList.forEach((item, index) => {
        if (item.target == id) {
          this.submitFileList.splice(index, 1);
          // this.submitFileList.push(o);
        }
      });
    },
    viewFile(url) {
      // https://zhiquan.hongjianguo.com
      window.open(url);
    },
    removeFile(index, id) {
      this.$confirm("是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.submitFileList.splice(index, 1);
      });
    },
    /*****文件相关 end*****/
    choiceCommon(id, index) {
      let bool = this.common_use[index].showIcon;
      let mark = this.common_use[index].id;
      // this.common_use[index].showIcon = bool ? false:true;
      let arr = this.formList.filter(item => {
        return item.id === mark;
      });
      if (bool && arr.length === 0) {
        this.common_use[index].showIcon = false;
        let i = this.formTypeCollection.indexOf(id);
        this.formTypeCollection.splice(i, 1);
      } else if (!bool && arr.length === 0) {
        this.common_use[index].showIcon = true;
        //this.formList.push({id:mark,name:this.common_use[index].name});
        this.formTypeCollection.push(mark);
      }
    },
    // 获取所有的远程select option
    getOptions() {
      this.option_action.forEach(i => {
        const success = _ => {
          let data = _.data[i.data_key].map(item => {
            return {
              value: item.id,
              label: item.name ? item.name : item.serial
            };
          });
          this.options_collection.set(i.map_key, data);
        };
        this.$axiosGet({
          url: i.url,
          data: Object.assign({}),
          success
        });
      });
    },
    openForm(id, index, isRemove = false) {
      if (id === this.formType) return;
      window.$fc_citations_info = null;
      this.$f
        ? this.$f.validate(this.successValidate(isRemove), this.errorValidate)
        : "";
      if (!this.isValidate) return;
      this.loading = true;
      this.current = index;
      let target = null;
      let rule = null;
      if (String(id).length > 6) {
        rule = this.saveRules.get(id);
        this.triggerEvent(rule);
      } else {
        rule = this.saveRules.get(id);  // 从缓存中拿生成规则，这样绑定的数据就不会丢失
        if(!rule) {   // 100027和110401可以通过点击CheckBox生成，如果缓存中没有的话就要重新获取，并生成规则
          rule = handlePlaceholder(cloneDeep(formConfig.get(id)).obj.rule);
          this.mergeRule(rule);
        }
        id === 100104 ? this.triggerEvent(rule) : "";
      }
      this.rules = rule;
      this.formType = id;
      this.createForm();
    },
    // 只针对table100104以及它的复制品
    triggerEvent(rule) {
      if (rule[3].value !== "") {
        rule[3].event.change(rule[3].value);
      }
    },
    changeStyle(index, isShow, type) {
      if (type === "file") {
        this.isShowFileIndex = index;
        this.isShowFileRemoveBtn = isShow;
      } else {
        this.isShowRemoveBtn = isShow;
        this.isShowIndex = index;
      }
    },
    removeForm(index, id) {
      this.$confirm("是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.handleRemove(index, id);
      });
    },
    // 移除表单
    handleRemove(index, id) {
      this.saveRules.delete(id);
      if (id === this.formType) {
        let el;
        let prev_id;
        if (index === 0 && this.formList.length === 1) {
          this.$f.destroy();
          this.$f = null;
        } else if (index === 0 && this.formList.length > 1) {
          el = this.$refs[`index_${index + 1}`];
          prev_id = Number(el[0].attributes["data-id"].value);
          this.openForm(prev_id, index + 1, true);
        } else if (index !== 0 && this.formList.length > 1) {
          el = this.$refs[`index_${index - 1}`];
          prev_id = Number(el[0].attributes["data-id"].value);
          this.openForm(prev_id, index - 1, true);
        }
      }

      if (String(id).length > 6) {
        this.copy_form.push(id);
      }

      this.submitData.delete(id);
      this.formList.splice(index, 1);
      this.vm_collection_id.forEach(item => {
        if (String(item).indexOf(id) !== -1) {
          this.vm_collection.delete(item);
        }
      });
      // console.log('this.vm_collection', this.vm_collection)
      this.count++;
    },

    // 合成规则
    mergeRule(source) {
      this.setOptions(source);
      source.map((item, index) => {
        if (item._vm) {
          this.setVmCollection(item._vm);
        } else if (item.custom) {
          source[index] = this.makeMarker(item);
        } else if (item.request) {
          //this.setSelectData(item, index)
        }
      });
    },

    // 处理upload组件的url
    handleUploadUrl(url) {
      return `${url}/test`;
    },

    // 验证 patent_number
    verifyValue(item) {
      let rule = this.verifyConfig[item.field];
      if (rule) {
        item.validate = rule;
      }
    },
    setOptions(source) {
      source.forEach(item => {
        this.verifyValue(item); // 添加验证规则
        if (item.type && item.type === "select") {
          if (!item.options) {
            let data = this.options_collection.get(item.field);
            if (data) {
              this.setProps(item);
              this.$set(item, "options", data);
            } else {
              this.$set(item, "options", []);
            }
          }
          // !item.options ? this.$set(item, "options", []) : ''
        }
      });
    },
    // 添加多选、可搜索
    setProps(o) {
      const obj = {
        multiple: true,
        filterable: true
      };

      !o.props ? (o.props = {}) : "";
      Object.assign(o.props, obj);
    },

    setVmCollection(vm) {
      // 一个规则里面有多个自定义组件的时候要个vm加后缀
      if (this.vm_collection.has(this.formType)) {
        this.vm_collection.set(`${this.formType}_${++this.count}`, vm);
      } else {
        this.vm_collection.set(this.formType, vm);
      }
      this.count++;
    },

    // 生成自定义组件
    makeMarker(source) {
      const vm = new Vue(source.vm);
      vm._parentVue = this;
      if (source.field === "__upload") {
        // 集中处理upload组件的url
        vm.action = this.handleUploadUrl(vm.action);
      }
      this.setVmCollection(vm);
      return this.$formCreate.maker.createTmp(
        source.template,
        vm,
        source.field,
        source.label,
        source.col
      );
    },

    // 设置select打开下拉框事件，因为渲染函数on事件不支持修饰符，所以现在需要频繁请求，解决方法是使用缓存
    // 现改为打开cpc表单之前获取所有的select option数据
    setSelectData(item) {
      let func = bool => {
        bool
          ? this.querySelectData(item.url, item.DATA_KEY).then(d => {
              item.options = d;
            })
          : "";
      };
      if (item.event) {
        item.event["visible-change"] = func;
      } else {
        item.event = {};
        item.event["visible-change"] = func;
      }
    },

    // 获取select框数据
    // TODO url要在这里做个处理
    querySelectData(url, key) {
      return new Promise((resolve, reject) => {
        const success = _ => {
          console.log("联系人", _);
          let data = _.data[key].map(item => {
            return {
              value: { id: item.id, label: item.name },
              label: item.name
            };
          });
          resolve(data);
        };
        this.$axiosGet({
          url: url,
          data: Object.assign({}),
          success
        });
      });
    },

    addForm() {
      this.formTypeCollection = [];
      this.showAppendForm = true;
      this.$f ? this.$f.submit() : "";
    },

    renderForm() {
      this.showAppendForm = false;
      // 直接执行setTimeout中的代码会有阻塞...
      setTimeout(() => {
        let temp = this.formTypeCollection.filter(item => {
          return (
            JSON.stringify(this.formList).indexOf(item) === -1 ||
            item === 100104
          );
        });
        temp.forEach((item, index) => {
          if (item === 100104) {
            temp.splice(index, 1, this.copy_form.shift());
          }
        });
        temp.forEach(item => {
          let name = "";
          if (String(item).length > 6) {
            name = "著录项目变更理由证明";
          } else {
            name = formConfig.get(item).name;
          }
          this.formList.push({ id: item, name: name });
          this.formType = item;
          this.loadFormData();
        });
        this.loading = false;
        // console.timeEnd("耗时")
      }, 50);
    },

    // 点击确定时加载表单生成规则
    loadFormData() {
      let target = null;
      let rule = null;
      if (String(this.formType).length > 6) {
        target = cloneDeep(formConfig.get(100104));
        rule = target.obj[`rule_${this.formType}`];
      } else {
        target = cloneDeep(formConfig.get(this.formType));
        rule = target.obj.rule;
      }

      this.rules = handlePlaceholder(rule);
      this.saveRules.set(this.formType,this.rules);
      this.paddingData(this.rules);
      this.mergeRule(this.rules);
      this.createForm();
      this.$f.submit();
    },

    // TODO 数据填充可能会有问题
    // 填充数据
    paddingData(rules) {
      let data = this.data[`table${this.formType}`];
      if (!data) return;
      rules.forEach(rule => {
        //console.log("rule",rule);
        if ((rule.rule && rule.rule._vm) || rule.vm) {
          let temp = rule.vm
            ? rule.vm.data.extendData
            : rule.rule._vm.extendData;
          for (let extendKey in temp) {
            if (temp.hasOwnProperty(extendKey)) {
              data[extendKey] ? (temp[extendKey] = data[extendKey]) : "";
            }
          }
        } else if (rule._vm) {
          let temp = rule._vm.extendData;
          for (let extendKey in temp) {
            if (temp.hasOwnProperty(extendKey)) {
              data[extendKey] ? (temp[extendKey] = data[extendKey]) : "";
            }
          }
        } else {
          data[rule.field] ? (rule.value = data[rule.field]) : "";
        }
      });
    },

    createForm() {
      let _this = this;
      const root = this.$refs.fc;
      root.innerHTML = "";
      // console.log(this.rules);
      this.$f = this.$formCreate(this.rules, {
        el: root,
        resetBtn: false,
        submitBtn: false,
        mounted: () => {
          _this.loading = false;
        },
        onSubmit: function(formData) {
          // TODO 每次加载带自定义组件的表单时，数据才会双向绑定
          if (_this.submitData.size === 0) {
            _this.allData = {};
            [..._this.vm_collection.values()].map(item => {
              Object.assign(_this.allData, item.extendData);
            });
            Object.assign(_this.allData, formData);
            //console.log(_this.allData)
            _this.submitData.set(_this.formType, _this.allData);
          } else {
            _this.vm_collection_id.forEach(item => {
              if (String(item).indexOf(_this.formType) !== -1) {
                if (!_this.submitData.get(_this.formType)) {
                  _this.submitData.set(
                    _this.formType,
                    Object.assign(
                      _this.vm_collection.get(item).extendData,
                      formData
                    )
                  );
                } else {
                  Object.assign(
                    _this.submitData.get(_this.formType),
                    _this.vm_collection.get(item).extendData,
                    formData
                  );
                }
              } else {
                _this.submitData.set(_this.formType, formData);
              }
            });
            _this.vm_collection_id.length === 0
              ? _this.submitData.set(_this.formType, formData)
              : "";
          }
          console.log(_this.submitData);
        }
      });
    },
    saveData() {
      this.$f ? this.$f.validate(this.successValidate, this.errorValidate) : "";
      // console.log(this.submitData);
      // if (!this.isValidate && this.$f !== null) return;
      let data = {};
      data.tables = this.handleSubmit(this.submitData);
      Object.assign(data.tables, this.handleSubmitFile());
      this.save_type === "add" ? (data.task_id = this.task_id) : "";
      const success = _ => {
        this.$message({ type: "success", message: "保存成功!" });
      };
      this.save_type === "add"
        ? this.$axiosPost({
            url: "/taskCpcs",
            data,
            success
          })
        : this.$axiosPut({ url: `/taskCpcs/${this.cpc_id}`, data, success });
    },
    handleSubmit(data) {
      let obj = {};
      data.forEach((value, key) => {
        obj[`table${key}`] = value;
      });
      return obj;
    },
    handleSubmitFile() {
      let obj = {};
      this.submitFileList.forEach(item => {
        obj[`table${item.target}`] = {};
        obj[`table${item.target}`].files = [item];
      });
      return obj;
    },
    successValidate(bool = false) {
      !bool ? this.$f.submit() : "";
      this.isValidate = true;
    },
    errorValidate() {
      this.$message({ type: "warning", message: "请正确填写!" });
      this.isValidate = false;
    },
    handleTab() {},
    showApplicationEditor(id) {
      this.loading = true;
      this.task_id = id;
      this.isApplicationEditor = true;
      this.getData(id);
    },
    turnArchives() {
      this.showTurnArchives = true;
    },
    hideTurnArchives() {
      this.showTurnArchives = false;
    },
    Upload() {
      this.showAppendFile = true;
    },
    getData() {
      // console.time("耗时")
      this.$nextTick(() => {
        const root = this.$refs.fc;
        root.innerHTML = "";
      });
      this.formTypeCollection = [];
      this.formList = [];
      this.submitFileList = [];
      this.submitData.clear();
      const success = _ => {
        this.data = _.data.tables;
        if (_.data.id) {
          this.save_type = "edit";
        } else {
          this.save_type = "add";
        }
        this.cpc_id = _.data.id;
        for (let key in this.data) {
          if (this.data.hasOwnProperty(key)) {
            if (key.indexOf("table") !== -1) {
              let id = Number(key.replace(/[^0-9]/gi, ""));
              let index = this.copy_form.indexOf(id);
              if (index !== -1 && id !== 100104) {
                this.copy_form.splice(index, 1);
              }
              if (!this.otherFormMap.get(id + "")) {  //  || id === 100108
                // 转档返回的code是字符串，所以otherFormMap中的key为字符串
                this.formTypeCollection.push(id);
              } else {
                // console.log(this.data[key]);
                this.submitFileList.push(this.data[key].files[0]);
              }
              /*if(id === 100108) {
                console.log("this.data",this.data[key]);
                // this.data[key].files[0].name = "其它证明文件";
                this.data[key].files.length !== 0 ?this.submitFileList.push(this.data[key].files[0]):"";
              }*/
            }
          }
        }
        this.renderForm();
      };
      this.$axiosGet({ url: `/taskCpcs/${this.task_id}`, data: {}, success });
    },
    getProject() {
      const success = _ => {
        // console.log(_);
        this.amendments = _.patent.amendments;
        this.notices = _.patent.notices;
      };
      this.$axiosGet({ url: `/patents/${this.process.project.id}`, success });
    }
  },
  watch: {
    formList: function(val, oldVal) {
      this.common_use.forEach(item => {
        let arr = val.filter(i => {
          return i.id === item.id;
        });
        item.showIcon = arr.length !== 0 ? true : false;
      });
    },
    process: {
      handler: function(val) {
        val.project.id ? this.getProject() : "";
      },
      immediate: true
    }
  },
  components: {
    AppShrink,
    TurnArchives,
    UploadFile
  }
};
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
  color: #409eff;
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

.form-create .custom-component .el-date-editor.el-input {
  width: auto;
}

.custom-none {
  display: none;
}

.form-create .placeholder {
  height: 36px;
  display: block;
}

.form-create .el-checkbox {
  white-space: inherit;
}

.form-create .el-checkbox .el-input__prefix .el-input__icon,
.form-create .el-checkbox .el-input__suffix .el-input__icon {
  line-height: 30px;
}

.form-create .label-padding .el-form-item__label {
  padding-left: 10px;
}

.form-create .separate-bottom {
  margin-bottom: 20px;
  position: relative;
}

.form-create .separate-bottom:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #d8d8d8;
  left: 0;
  bottom: 0;
}

.form-create .font-bold {
  font-weight: bold;
}
</style>