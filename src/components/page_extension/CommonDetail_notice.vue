<template>
  <div class="main">
    <!--     <div class="attachments" v-if="type=='patent'">
      <span><el-tag>交底书：</el-tag>
      <el-upload
        :action="attachments_upload_url"
        :on-success="handleAttachSuccess"
        :show-file-list="false"
        style="display: inline-block;"
      >
        <el-button type="primary" size="small">上传</el-button>
      </el-upload>  
      <app-table :columns="columns2" :data="tableData2" style="margin-top: 15px;"></app-table>    
      </span>
    </div>-->
    <div class="notice">
      <span>
        <el-upload
          :action="notice_upload_url"
          :on-success="handleSuccess"
          :before-upload="handleBeforeUpload"
          :headers="auth"
          :show-file-list="false"
          style="display: inline-block;"
        >
          <el-button type="primary" size="small">通知书上传</el-button>
        </el-upload>
      </span>
      <span style="margin-left: 6px;" v-if="type=='patent'">
        <el-upload
          :action="patentNoice_upload_url"
          :show-file-list="false"
          :headers="auth"
          :on-success="handlePatentSuccess"
          style="display: inline-block;"
        >
          <el-button type="primary" size="small">CPC通知书上传</el-button>
        </el-upload>
      </span>
      
      <span style="display: inline-block;float: right;">
        
        <search-input
          v-model="searchValue"
          @click="search"
          placeholder="搜索通知书名称"
          input-style="width:250px;margin-bottom:10px;"
        ></search-input>
      </span>
      <el-dropdown  @command="handleNoticeQuickFilter" trigger="click" menu-align="start" style="margin-right: 10px; float:right;">
        <el-button >{{ `快捷筛选` }}<i class="el-icon-caret-bottom el-icon--right" style="font-size: 12px;"></i> </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="">所有</el-dropdown-item>
          <el-dropdown-item command="审查意见">审查意见</el-dropdown-item>
          <el-dropdown-item command="补正">补正</el-dropdown-item>
          <el-dropdown-item command="回执">电子申请回执</el-dropdown-item>
          <el-dropdown-item command="费">费用</el-dropdown-item>
          <el-dropdown-item command="登">办登</el-dropdown-item>
          <el-dropdown-item command="复审">复审</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <app-table
        :columns="columns"
        :data="detailNoticesSearch"
        style="margin-top: 10px;"
        :border="true"
        height="default6"
      ></app-table>
    </div>
    <div class="documents" style="margin-top: 15px;">
      <div class="header_btn" style="height:36px;line-height: 36px;">
        <span style="display:inline-block;">
          <!-- position: relative;top:-10px; -->
          <el-upload
            :action="upload_url"
            :on-success="handleSuccess"
            :headers="auth"
            :before-upload="handleBeforeUploads"
            :show-file-list="false"
          >
            <el-button type="primary" size="small">其他文档上传</el-button>
          </el-upload>
        </span>
        <span
          style="display:inline-block;height:28px;line-height: 28px;margin-left:15px;width:180px;"
        >
          <!-- 拖拽上传功能接口不完善暂时隐藏 -->
          <!--   <el-upload
            drag
            :action="upload_url"
            :headers="auth"
            :on-success="handleDragSuccess"
            multiple
            :show-file-list="false"
            style="width:180px;"
            >
            <div class="el-upload__text upload-width"></em>其他文件可拖拽上传</div>
          </el-upload>-->
        </span>
        <span style="float: right;">
          <search-input v-model="searchValue2" placeholder="搜索文件名称、文件类型" input-style="width:250px;"></search-input>
        </span>
        <el-dropdown  @command="handleNoticeQuickFilter2" trigger="click" menu-align="start" style="margin-right: 10px; float:right;">
          <el-button >{{ `快捷筛选` }}<i class="el-icon-caret-bottom el-icon--right" style="font-size: 12px;"></i> </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="">所有</el-dropdown-item>
            <el-dropdown-item command="审查意见">审查意见</el-dropdown-item>
            <el-dropdown-item command="补正">补正</el-dropdown-item>
            <el-dropdown-item command="回执">电子申请回执</el-dropdown-item>
            <el-dropdown-item command="费">费用</el-dropdown-item>
            <el-dropdown-item command="登">办登</el-dropdown-item>
            <el-dropdown-item command="复审">复审</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- <div style="clear: both;"></div> -->
      <documents style="margin-top: 10px;" :search-value="searchValue2" ref="documents"></documents>
    </div>
    <el-dialog
      :title="this.isNotice?'通知书上传':'其他文档上传'"
      :visible.sync="dialogVisible"
      class="dialog-medium"
      :modal="false"
    >
      <documents-upload
        :type="types"
        :file-type="fileType"
        :tableDatas="tableDatas"
        :files="file"
        @dialogVisible="val=>{dialogVisible=val}"
        @uploadSuccess="refreshDetailData"
        ref="docupload"
      ></documents-upload>
    </el-dialog>
    <el-dialog
      title="CPC通知书上传"
      :visible.sync="dialogPatentVisible"
      class="dialog-small"
      :modal="false"
    >
      <el-form :model="patentForm" ref="patentForm" label-width="110px" class="patent_notice">
        <el-form-item label="内部案号">
          <span>{{ detail_serial }}</span>
        </el-form-item>
        <el-form-item label="事务所案号">
          <span>{{ patentForm.agency_serial }}</span>
        </el-form-item>
        <el-form-item label="案件名称">
          <span>{{ title }}</span>
        </el-form-item>
        <el-form-item label="申请号">
          <span>{{ patentForm.apn }}</span>
        </el-form-item>
        <el-form-item label="通知书名称">
          <span>{{ patentForm.code }}</span>
        </el-form-item>
        <el-form-item label="发文日">
          <span>{{ patentForm.mail_date }}</span>
        </el-form-item>
        <el-form-item label="发文序列号">
          <span>{{ patentForm.notice_serial }}</span>
        </el-form-item>
        <el-form-item label="申请日">
          <span>{{ patentForm.apd }}</span>
        </el-form-item>
        <el-form-item label="费用">
          <span>
            <el-tag
              v-if="patentForm.fees.length!==0"
              v-for="(item,i) in patentForm.fees"
              :key="i"
              style="margin-left:5px;"
            >{{ `${item.name}：${item.fee}` }}</el-tag>
            <span v-if="patentForm.fees.length==0">无</span>
          </span>
        </el-form-item>
        <el-form-item style="margin-bottom: 0px;">
          <el-button
            type="primary"
            @click="importData"
            :loading="loading"
          >{{loading?'上传中...':'确认上传'}}</el-button>
          <el-button @click="clearAll">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import AppTable from "@/components/common/AppTable";
import Documents from "@/components/page_extension/CommonDetail_documents";
import DocumentsUpload from "@/components/common/DocumentsUpload";
import SearchInput from "@/components/common/SearchInput";

import { mapActions } from "vuex";
import { mapGetters } from "vuex";
const config = [
    [
        "patent",
        {
            action: "parseFiles",
            type: "patent",
            url: "/patents/documents"
        }
    ],
    [
        "trademark",
        {
            action: "parseFiles",
            type: "trademark",
            url: "/trademarks/documents"
        }
    ],
    [
        "copyright",
        {
            action: "parseFiles",
            type: "copyright",
            url: "/copyrights/documents"
        }
    ],
    [
        "patent_notice",
        {
            action: "parseNotices",
            type: "patent"
        }
    ],
    [
        "copyright_notice",
        {
            action: "parseNotices",
            type: "copyright"
        }
    ],
    [
        "trademark_notice",
        {
            action: "parseNotices",
            type: "trademark"
        }
    ]
];
const map = new Map(config);
export default {
    name: "commonDeatailNotice",
    data() {
        return {
            dialogVisible: false,
            dialogPatentVisible: false,
            noticeType: "",
            searchValue: "",
            searchValue2: "",
            loading: false,
            isNotice: false,
            tableDatas: [],
            fileType: "",
            file: [],
            patentForm: {
                agency_serial: "",
                application_date: "",
                application_number: "",
                code: "",
                mail_date: "",
                notice_serial: "",
                fees: []
            },
            columns: [
                { type: "text", label: "通知书类型", prop: "filename", render_key: "file_type", render_simple: "name", min_width: "150" },
                { type: "text", label: "文件名称", prop: "name", render_key: "file", render_simple: "name", min_width: "170" },
                { type: "text", label: "发文日", prop: "mail_date", min_width: "80" },
                { type: "text", label: "官方绝限", prop: "legal_deadline", min_width: "80" },
                { type: "text", label: "发文序列号", prop: "mail_serial", width: "160" },
                {
                    type: "action",
                    fixed: false,
                    width: "145",
                    btns: [
                        {
                            type: "download",
                            click: ({ file }) => {
                                window.open(file.downloadUrl);
                            }
                        },
                        {
                            type: "view",
                            click: ({ file }) => {
                                window.open(file.viewUrl);
                            }
                        },
                        { type: "delete", click: this.handleDelete }
                    ]
                }
            ],
            tableData2: [],
            tableData3: []
        };
    },
    props: ["type"],
    computed: {
        ...mapGetters([
            "detailBase",
            "detailNotices",
            "detail_serial",
            "title",
            "detailId"
        ]),
        auth() {
            return { Authorization: window.localStorage.getItem("token") };
        },
        detailNoticesSearch() {
            if (this.searchValue === "") {
                return this.detailNotices;
            } else {
                return this.search(this.searchValue);
            }
        },
        notice_upload_url() {
            this.noticeType = this.type;
            this.noticeType += "_notice";
            const config = map.get(this.noticeType);
            const action = config.action;
            let url = "/api/files";
            if (action != "") {
                url += `?action=${action}`;
            }
            return url;
        },
        patentNoice_upload_url() {
            let url = "/files?action=parseCpc";
            return url;
        },
        upload_url() {
            const config = map.get(this.type);
            const action = config.action;
            let url = "/files";
            if (action != "") {
                url += `?action=${action}`;
            }

            return url;
        },
        attachments_upload_url() {
            let url = "/files";
            return url;
        },
        /*    tableData () { 
          return this.$store.getters.detailNotices; 
        },*/
        types() {
            return this.isNotice ? this.noticeType : this.type;
        }
    },
    created() { },
    methods: {
        ...mapActions(["refreshDetailData"]),
        handleBeforeUpload(a) {
            this.isNotice = true;
        },
        handleNoticeQuickFilter(command) {
            this.searchValue = command;
        },
        handleNoticeQuickFilter2(command) {
            this.searchValue2 = command;
        },
        doLayout() {
            this.$refs.documents.$refs.table.$refs.table.doLayout();
        },
        handleBeforeUploads(a) {
            this.isNotice = false;
        },
        handleSuccess(a, b, c) {
            if (a.status) {
                this.$nextTick(_ => {
                    this.clear();
                    const l = this.tableDatas.length;
                    const lists = [];
                    // a.data.list.forEach((_, key)=>{
                    //   _.mail_date = '';
                    //   _.legal_deadline = '';
                    //   _.application_date = '';
                    //   _.issue_date = '';
                    //   _.application_number = '';
                    //   _.pct_search_result = '';
                    //   _.pct_search_date = '';
                    //   lists.push(this.$tool.deepCopy(_));
                    // });
                    this.tableDatas.push(...a.data.list);
                    this.file.push(a.data.file);
                    lists.forEach((v, k) => {
                        this.tableDatas.splice(k + l, 1, v);
                    });
                    this.dialogVisible = true;
                    this.$nextTick(_ => {
                        this.$refs.docupload.show();
                    });
                });
            } else {
                this.$message({ message: a.info, type: "warning" });
            }
        },
        handleDragSuccess(a) {
            if (a.status) {
                this.$nextTick(_ => {
                    this.clear();
                    // const l = this.tableDatas.length;
                    const lists = [];
                    a.data.list.forEach((_, key) => {
                        _.time = "";
                        _.type = 830;
                        _.project = this.detailId;
                        lists.push(this.$tool.deepCopy(_));
                    });
                    // this.tableDatas.push(...a.data.list);
                    // this.file.push(a.data.file);
                    //   lists.forEach((v,k)=>{
                    //     this.tableDatas.splice(k+l,1,v);
                    //   })
                    this.$nextTick(_ => {
                        const config = map.get(this.type);
                        const url = config.url;
                        const success = _ => {
                            this.$message({ type: "success", message: "上传成功" });
                            this.refreshDetailData();
                        };
                        const data = { file: a.data.file, list: lists };
                        this.$axiosPost({ url, data, success });
                    });
                });
            } else {
                this.$message({ message: a.info, type: "warning" });
            }
        },
        handlePatentSuccess(a, b, c) {
            if (a.status) {
                this.dialogPatentVisible = true;
                this.tableData3.push(a.data.list[0]);
                const d = a.data.list[0];
                for (let k in this.patentForm) {
                    if (k == "code") {
                        this.patentForm[k] = d[k]["name"];
                    } else {
                        this.patentForm[k] = d[k];
                    }
                }
            } else {
                this.$message({ message: a.info, type: "warning" });
            }
        },
        handleAttachSuccess(p, f, list) {
            if (p.status) {
                const id = p.data.file.id;
                let copy;
                if (this.multiple) {
                    copy = [...this.value];
                    copy.push(id);
                } else {
                    copy = id;
                }

                f.id = id;
                f.downloadUrl = p.data.file.downloadUrl;
                this.$emit("uploadSuccess", p, f, list);
                this.refreshDetailData();
                this.$nextTick(_ => {
                    this.tableData2 = this.detailBase.attachments;
                });
                this.$emit("input", copy);
            } else {
                this.$message({ message: p.info, type: "warning" });
            }
        },
        handleDelete({ id, file }) {
            const url = `notices?id=${id}`;
            const success = _ => {
                this.$message({ message: `删除${file.name}成功！`, type: "success" });
                this.refreshDetailData();
            };

            this.$confirm(`删除后不可恢复，确认删除‘${file.name}’？`, "删除确认", {
                type: "warning"
            })
                .then(_ => {
                    this.$axiosDelete({ url, success });
                })
                .catch(_ => { });
        },
        importData() {
            const url = "/cpc_notices";

            if (this.tableData3.length == 0) {
                this.$message({ message: "上传数据不能为空", type: "warning" });
                return false;
            }
            // if(this.title){
            //   this.tableData3[0].project = {id:this.detailId,name:this.title};
            // }
            // if(this.detail_serial) {
            //   this.tableData3[0].serial = this.detail_serial;
            // }

            let data = this.tableData3[0];
            data.project = this.detailId;
            data = { list: [data] };

            const success = _ => {
                this.tableData3 = [];
                this.refreshDetailData();
                this.dialogPatentVisible = false;
            };
            const complete = _ => {
                this.loading = false;
            };
            this.loading = true;
            this.$axiosPost({ url, data, success, complete });
        },
        search(keyword) {
            let newArr = [];
            if (keyword) {
                this.detailNotices.filter((val, i, arr) => {
                    for (let k in arr[i]) {
                        let n = arr[i][k];
                        if (n instanceof Object) {
                            for (let m in n) {
                                if (
                                    typeof n[m] == "string" &&
                                    n[m].indexOf(keyword) != -1 &&
                                    m === "name"
                                ) {
                                    newArr.push(arr[i]);
                                }
                            }
                        } else if (typeof (n) == 'string') {
                            if (n.indexOf(keyword) != -1) {
                                newArr.push(arr[i]);
                            }
                        }
                    }
                });
                return this.$tool.rmDuplicate(newArr);
            }
        },
        clearAll() {
            this.tableData3 = [];
            this.$refs["patentForm"].resetFields();
            this.dialogPatentVisible = false;
        },
        clear() {
            this.tableDatas = [];
            this.file = [];
        }
    },
    watch: {
        types: function (val) {
            if (val) {
                return val;
            }
        }
    },
    components: {
        AppTable,
        Documents,
        DocumentsUpload,
        SearchInput
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>